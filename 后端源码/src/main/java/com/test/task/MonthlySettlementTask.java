package com.test.task;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.MonthlyStatementMapper;
import com.test.mapper.UserMapper;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.MonthlyStatement;
import com.test.model.User;
import com.test.service.MonthlyStatementService;
import com.test.utils.AliyunSmsUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class MonthlySettlementTask {

    @Autowired
    private MonthlySettlementEligibilityMapper monthlySettlementEligibilityMapper;

    @Autowired
    private MonthlyStatementMapper monthlyStatementMapper;
    
    @Autowired
    private AliyunSmsUtils aliyunSmsUtils;
    
    @Autowired
    private UserMapper userMapper;

    // 每月13号的0点0分0秒执行
    @Scheduled(cron = "0 0 0 13 * ?")
    public void processMonthlySettlement() {
        log.info("开始执行月结资格检查任务，当前时间：{}", LocalDateTime.now());
        
        try {
            // 获取当前日期
            LocalDate currentDate = LocalDate.now();
            
            // 1. 查询所有状态为正常(0)的月结资格记录
            LambdaQueryWrapper<MonthlySettlementEligibility> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(MonthlySettlementEligibility::getStatus, 0);
            List<MonthlySettlementEligibility> allEligibilities = monthlySettlementEligibilityMapper.selectList(queryWrapper);

            log.info("共找到正常状态的月结资格记录：{} 条", allEligibilities.size());

            // 2. 筛选出需要处理的月结资格
            List<MonthlySettlementEligibility> eligibilitiesToProcess = new ArrayList<>();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            for (MonthlySettlementEligibility eligibility : allEligibilities) {
                // 解析创建时间
                LocalDateTime createTime = LocalDateTime.parse(eligibility.getCreateTime(), formatter);
                LocalDate createDate = createTime.toLocalDate();
                
                // 获取结算周期 (0为月结，1为季结，2为半年结）
                Integer settlementCycle = eligibility.getSettlementCycle();
                
                boolean shouldProcess = false;
                
                if (settlementCycle == 0) {
                    // 月结：每月都处理
                    shouldProcess = true;
                } else if (settlementCycle == 1) {
                    // 季结：每3个月处理一次
                    Period period = Period.between(createDate, currentDate);
                    int totalMonths = period.getYears() * 12 + period.getMonths();
                    shouldProcess = totalMonths % 3 == 0;
                } else if (settlementCycle == 2) {
                    // 半年结：每6个月处理一次
                    Period period = Period.between(createDate, currentDate);
                    int totalMonths = period.getYears() * 12 + period.getMonths();
                    shouldProcess = totalMonths % 6 == 0;
                }
                
                if (shouldProcess) {
                    eligibilitiesToProcess.add(eligibility);
                }
            }
            
            log.info("本次需要处理的月结资格记录：{} 条", eligibilitiesToProcess.size());
            // 3. 处理筛选出的月结资格（这里简单打印出来，实际业务逻辑根据需求实现）
            for (MonthlySettlementEligibility eligibility : eligibilitiesToProcess) {
                log.info("处理月结资格：ID={}, 用户ID={}, 结算周期={}", 
                        eligibility.getMonthlySettlementEligibilityId(),
                        eligibility.getUserId(),
                        eligibility.getSettlementCycle() == 0 ? "月结" : 
                        (eligibility.getSettlementCycle() == 1 ? "季结" : "半年结"));
                // 这里添加你的处理逻辑，如更新数据、发送通知等
                try {
                    // 发送月结通知短信
                    // 假设我们需要查询用户的手机号，这里简化处理，实际中应该从数据库获取
                    QueryWrapper<MonthlyStatement> monthlyStatementQueryWrapper = new QueryWrapper<>();
                    monthlyStatementQueryWrapper.eq("monthly_settlement_eligibility_id", eligibility.getMonthlySettlementEligibilityId());
                    monthlyStatementQueryWrapper.eq("type",0);
                    monthlyStatementQueryWrapper.eq("is_user_pays",0);
                    List<MonthlyStatement > monthlyStatement = monthlyStatementMapper.selectList(monthlyStatementQueryWrapper);
                    if (!monthlyStatement.isEmpty()) {
                        String phoneNumber = getUserPhoneNumber(eligibility.getUserId());
                        if (phoneNumber != null && !phoneNumber.isEmpty()) {
                            aliyunSmsUtils.sendMonthlyStatementNotice(phoneNumber);
                            log.info("已向用户 {} 发送月结通知短信", eligibility.getUserId());
                        }
                    }

                } catch (Exception e) {
                    log.error("发送短信通知失败：{}", e.getMessage());
                }
            }
            log.info("月结资格检查任务执行完毕");
        } catch (Exception e) {
            log.error("月结资格检查任务执行异常", e);
        }
    }
    
    /**
     * 根据用户ID获取手机号
     */
    private String getUserPhoneNumber(String userId) {
        if (userId == null || userId.isEmpty()) {
            return null;
        }
        
        try {
            LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(User::getUserId, userId);
            queryWrapper.select(User::getPhone);
            
            User user = userMapper.selectOne(queryWrapper);
            return user != null ? user.getPhone() : null;
        } catch (Exception e) {
            log.error("查询用户手机号失败，userId: {}, 错误: {}", userId, e.getMessage());
            return null;
        }
    }
} 
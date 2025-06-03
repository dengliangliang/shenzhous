package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.MonthlyStatementMapper;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserMapper;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.MonthlyStatement;
import com.test.model.Order;
import com.test.model.Return.MonthlyBill;
import com.test.model.Return.MonthlyStatementReturn;
import com.test.model.User;
import com.test.service.MonthlyStatementService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class MonthlyStatementServiceImpl extends ServiceImpl<MonthlyStatementMapper, MonthlyStatement> implements MonthlyStatementService {

    @Autowired
    private MonthlyStatementMapper monthlyStatementMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MonthlySettlementEligibilityMapper monthlySettlementEligibilityMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Result<MonthlyStatement> addMonthlyStatement(MonthlyStatement monthlyStatement) {
        System.out.println(monthlyStatement);
        User user = userMapper.selectById(monthlyStatement.getUserId());
        if (ObjectUtils.isEmpty(user) || user.getIsDelete() == 1) {
            return Result.fail("新增账单失败，支付用户信息不存在");
        }
        MonthlySettlementEligibility m = monthlySettlementEligibilityMapper.selectById(monthlyStatement.getMonthlySettlementEligibilityId());
        if (ObjectUtils.isEmpty(m)) {
            return Result.fail("新增账单失败，该月结资格不存在");
        }
        Order order = orderMapper.selectById(monthlyStatement.getOrderId());
        if (ObjectUtils.isEmpty(order) || order.getIsDelete() == 1) {
            return Result.fail("新增账单失败，该账单不存在");
        }
        monthlyStatement.setMonthlyStatementId(getUUID());
        monthlyStatement.setCreateTime(getTime());
        monthlyStatement.setUpdateTime(getTime());
        monthlyStatementMapper.insert(monthlyStatement);

        return Result.success("新增账单成功", monthlyStatement);
    }

    @Override
    public Result<MonthlyStatement> getMonthlyStatementById(String id) {
        MonthlyStatement monthlyStatement = monthlyStatementMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlyStatement)) {
            return Result.fail("查询失败，账单信息不存在");
        }
        User user = userMapper.selectById(monthlyStatement.getUserId());
        if (ObjectUtils.isNotEmpty(user)) {
            monthlyStatement.setUserName(user.getUserName());
        }
        Order order = orderMapper.selectById(monthlyStatement.getOrderId());
        if (ObjectUtils.isNotEmpty(order)) {
            monthlyStatement.setOrder(order);
        }
        return Result.success("查询成功", monthlyStatement);
    }

    @Override
    public Result<MonthlyStatementReturn> pageMonthlyStatement(int pageNum, int pageSize, String monthlySettlementEligibilityId,
                                                               String userId, String startTime, String endTime, Integer type) {
        QueryWrapper<MonthlyStatement> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(monthlySettlementEligibilityId)) {
            queryWrapper.eq("monthly_settlement_eligibility_id", monthlySettlementEligibilityId);
        }
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        // 添加时间筛选条件
        if (StringUtils.isNotEmpty(startTime)) {
            queryWrapper.ge("create_time", startTime); // 大于等于开始时间
        }
        if (StringUtils.isNotEmpty(endTime)) {
            queryWrapper.le("create_time", endTime); // 小于等于结束时间
        }
        if (type != null) {
            queryWrapper.eq("type", type);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<MonthlyStatement> page = monthlyStatementMapper.selectPage(new Page<>(pageNum, pageSize), queryWrapper);
        List<MonthlyStatement> monthlyStatements = page.getRecords();
        MonthlyStatementReturn monthlyStatementReturn = new MonthlyStatementReturn();
        for (MonthlyStatement monthlyStatement : monthlyStatements) {
            User user = userMapper.selectById(monthlyStatement.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                monthlyStatement.setUserName(user.getUserName());
            }
        }
        monthlyStatementReturn.setPageSize(pageSize);
        monthlyStatementReturn.setCurrentPage(pageNum);
        monthlyStatementReturn.setDataList(monthlyStatements);
        monthlyStatementReturn.setTotalPages(page.getTotal());
        return Result.success("查询成功", monthlyStatementReturn);
    }

    @Override
    public Result<List<MonthlyStatement>> getMonthlyStatementList(String monthlySettlementEligibilityId, String userId) {
        QueryWrapper<MonthlyStatement> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(monthlySettlementEligibilityId)) {
            queryWrapper.eq("monthly_settlement_eligibility_id", monthlySettlementEligibilityId);
        }
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        queryWrapper.orderByDesc("create_time");
        List<MonthlyStatement> monthlyStatements = this.list(queryWrapper);
        for (MonthlyStatement monthlyStatement : monthlyStatements) {
            User user = userMapper.selectById(monthlyStatement.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                monthlyStatement.setUserName(user.getUserName());
            }
        }
        return Result.success("查询成功", monthlyStatements);
    }

    @Override
    public Result<String> batchesAddMonthlyStatement(List<MonthlyStatement> monthlyStatements) {
        for (MonthlyStatement monthlyStatement : monthlyStatements) {
            User user = userMapper.selectById(monthlyStatement.getUserId());
            if (ObjectUtils.isEmpty(user) || user.getIsDelete() == 1) {
                return Result.fail("新增账单失败，支付用户信息不存在");
            }
            MonthlySettlementEligibility m = monthlySettlementEligibilityMapper.selectById(monthlyStatement.getMonthlySettlementEligibilityId());
            if (ObjectUtils.isEmpty(m)) {
                return Result.fail("新增账单失败，该月结资格不存在");
            }
            Order order = orderMapper.selectById(monthlyStatement.getOrderId());
            if (ObjectUtils.isEmpty(order) || order.getIsDelete() == 1) {
                return Result.fail("新增账单失败，该账单不存在");
            }
            monthlyStatement.setMonthlyStatementId(getUUID());
            monthlyStatement.setCreateTime(getTime());
            monthlyStatement.setUpdateTime(getTime());
            monthlyStatementMapper.insert(monthlyStatement);
        }
        return Result.success("新增成功");
    }

    @Override
    public Result<MonthlyBill> getAllPrice(String id, String startTime, String endTime, String userId) {
        // 1. 构建查询条件
        QueryWrapper<MonthlyStatement> queryWrapper = new QueryWrapper<>();

        // 添加查询条件
        Optional.ofNullable(id).filter(StringUtils::isNotEmpty)
                .ifPresent(v -> queryWrapper.eq("monthly_settlement_eligibility_id", v));
        Optional.ofNullable(startTime).filter(StringUtils::isNotEmpty)
                .ifPresent(v -> queryWrapper.ge("create_time", v));
        Optional.ofNullable(endTime).filter(StringUtils::isNotEmpty)
                .ifPresent(v -> queryWrapper.le("create_time", v));
        Optional.ofNullable(userId).filter(StringUtils::isNotEmpty)
                .ifPresent(v -> queryWrapper.eq("user_id", v));

        // 2. 查询数据
        List<MonthlyStatement> monthlyStatements = monthlyStatementMapper.selectList(queryWrapper);
        if (monthlyStatements.isEmpty()) {
            return Result.success(new MonthlyBill());
        }

        // 3. 计算金额
        MonthlyBill monthlyBill = new MonthlyBill();
        // 初始化金额字段，避免空指针
        monthlyBill.setTreatSettlementAmount(BigDecimal.ZERO);
        monthlyBill.setAlreadySettlementAmount(BigDecimal.ZERO);
        monthlyBill.setMonth(BigDecimal.ZERO);
        monthlyBill.setNumber(monthlyStatements.size());

        // 4. 遍历计算各项金额
        for (MonthlyStatement ms : monthlyStatements) {
            BigDecimal amount = ms.getAmount().setScale(2, RoundingMode.HALF_UP);

            if (ms.getType() == 0) { // 付款类型
                if (ms.getIsUserPays() == 0) { // 待结算
                    monthlyBill.setTreatSettlementAmount(
                            monthlyBill.getTreatSettlementAmount().add(amount));
                } else { // 已结算
                    monthlyBill.setAlreadySettlementAmount(
                            monthlyBill.getAlreadySettlementAmount().add(amount));
                }
                // 付款增加月总额
                monthlyBill.setMonth(monthlyBill.getMonth().add(amount));

            } else if (ms.getType() == 1) { // 退款类型
                if (ms.getIsUserPays() == 0) { // 待结算的退款
                    monthlyBill.setTreatSettlementAmount(
                            monthlyBill.getTreatSettlementAmount().subtract(amount));
                } else { // 已结算的退款
                    // 根据业务需求决定是否减少已结算金额
                    // 如果已结算金额不应该因为退款而减少，则注释掉下面这行
                    // monthlyBill.setAlreadySettlementAmount(
                    //         monthlyBill.getAlreadySettlementAmount().subtract(amount));
                }
                // 退款减少月总额
                monthlyBill.setMonth(monthlyBill.getMonth().subtract(amount));
            }
        }

        // 5. 确保待结算金额不小于0
        if (monthlyBill.getTreatSettlementAmount().compareTo(BigDecimal.ZERO) < 0) {
            monthlyBill.setTreatSettlementAmount(BigDecimal.ZERO);
        }


        return Result.success(monthlyBill);
    }

    @Override
    public Result<String> payBills(String id, String startTime, String endTime) {
        // 1. 创建更新对象
        MonthlyStatement updateEntity = new MonthlyStatement();
        updateEntity.setIsUserPays(1);
        updateEntity.setUpdateTime(getTime());
        // 2. 构建查询条件
        QueryWrapper<MonthlyStatement> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(id)) {
            queryWrapper.eq("monthly_settlement_eligibility_id", id);
        }
        if (StringUtils.isNotEmpty(startTime)) {
            queryWrapper.ge("create_time", startTime);
        }
        if (StringUtils.isNotEmpty(endTime)) {
            queryWrapper.le("create_time", endTime);
        }

        // 3. 执行更新
        try {
            boolean isSuccess = this.update(updateEntity, queryWrapper);
            if (isSuccess) {
                System.out.println("数据更新成功！");
            } else {
                System.out.println("无符合条件的数据需更新。");
            }
            return Result.success("支付成功");
        } catch (Exception e) {
            System.err.println("更新失败: " + e.getMessage());
            e.printStackTrace();
            return Result.fail("支付失败");
        }

    }
}

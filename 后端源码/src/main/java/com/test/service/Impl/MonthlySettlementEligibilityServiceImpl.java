package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.MonthlyStatementMapper;
import com.test.mapper.UserMapper;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.MonthlyStatement;
import com.test.model.Return.MonthlySettlementEligibilityReturn;
import com.test.model.User;
import com.test.service.MonthlySettlementEligibilityService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;

@Service
public class MonthlySettlementEligibilityServiceImpl extends ServiceImpl<MonthlySettlementEligibilityMapper, MonthlySettlementEligibility> implements MonthlySettlementEligibilityService {

    @Autowired
    private MonthlySettlementEligibilityMapper monthlySettlementEligibilityMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MonthlyStatementMapper monthlyStatementMapper;

    @Override
    public Result<MonthlySettlementEligibility> getMonthlySettlementEligibilityById(String id) {
        MonthlySettlementEligibility monthlySettlementEligibility = monthlySettlementEligibilityMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlySettlementEligibility)) {
            return Result.fail("查询失败，该月结资格不存在");
        }
        User user = userMapper.selectById(monthlySettlementEligibility.getUserId());
        if (ObjectUtils.isNotEmpty(user)) {
            monthlySettlementEligibility.setUserName(user.getUserName());
        }
        return Result.success("查询成功",monthlySettlementEligibility);
    }

    @Override
    public Result<MonthlySettlementEligibilityReturn> pageMonthlySettlementEligibility(int pageNum, int pageSize, String userId, Integer settlementCycle) {
        QueryWrapper<MonthlySettlementEligibility> queryWrapper = new QueryWrapper<>();
        if (ObjectUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (settlementCycle != null) {
            queryWrapper.eq("settlement_cycle", settlementCycle);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<MonthlySettlementEligibility> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        List<MonthlySettlementEligibility> monthlySettlementEligibilityList = page.getRecords();
        MonthlySettlementEligibilityReturn monthlySettlementEligibilityReturn = new MonthlySettlementEligibilityReturn();
        for (MonthlySettlementEligibility monthlySettlementEligibility : monthlySettlementEligibilityList) {
            User user = userMapper.selectById(monthlySettlementEligibility.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                monthlySettlementEligibility.setUserName(user.getUserName());
            }
        }
        monthlySettlementEligibilityReturn.setPageSize(pageSize);
        monthlySettlementEligibilityReturn.setCurrentPage(pageNum);
        monthlySettlementEligibilityReturn.setTotalPages(page.getTotal());
        monthlySettlementEligibilityReturn.setDataList(page.getRecords());
        return Result.success("查询成功",monthlySettlementEligibilityReturn);
    }

    @Override
    public Result<List<MonthlySettlementEligibility>> getMonthlySettlementEligibilityList(String userId, Integer settlementCycle) {
        QueryWrapper<MonthlySettlementEligibility> queryWrapper = new QueryWrapper<>();
        if (ObjectUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (settlementCycle != null) {
            queryWrapper.eq("settlement_cycle", settlementCycle);
        }
        queryWrapper.orderByDesc("create_time");
        List<MonthlySettlementEligibility> monthlySettlementEligibilityList = this.list(queryWrapper);
        for (MonthlySettlementEligibility monthlySettlementEligibility : monthlySettlementEligibilityList) {
            User user = userMapper.selectById(monthlySettlementEligibility.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                monthlySettlementEligibility.setUserName(user.getUserName());
            }
        }
        return Result.success("查询成功",monthlySettlementEligibilityList);
    }

    @Override
    public Result<MonthlySettlementEligibility> logoffMonthlySettlementEligibilityById(String id) {
        MonthlySettlementEligibility monthlySettlementEligibility = monthlySettlementEligibilityMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlySettlementEligibility)) {
            return Result.fail("注销失败，该月结资格不存在");
        }
        QueryWrapper<MonthlyStatement> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("monthly_settlement_eligibility_id",id);
        queryWrapper.eq("is_user_pays",0);
        List<MonthlyStatement> list = monthlyStatementMapper.selectList(queryWrapper);
        if (list.size() > 0) {
            return Result.fail("该月结资格下还有账单未支付");
        }
        monthlySettlementEligibility.setStatus(1);
        this.updateById(monthlySettlementEligibility);
        return Result.success("注销成功",monthlySettlementEligibility);
    }

    @Override
    public Result<Integer> getIsEffective(String id,String code) {
        MonthlySettlementEligibility monthlySettlementEligibility = monthlySettlementEligibilityMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlySettlementEligibility)) {
            return Result.success(0);
        }else{
            if (monthlySettlementEligibility.getStatus()==1||!monthlySettlementEligibility.getPassword().equals(code)){
                return Result.success(0);
            }else{
                return Result.success(1);
            }
        }


    }

    @Override
    public Result<List<User>> getUser(String id) {
        MonthlySettlementEligibility monthlySettlementEligibility = monthlySettlementEligibilityMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlySettlementEligibility)) {
            return Result.fail("查询失败，该月结资格不存在");
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("monthly_settlement_eligibility_id",id);
        queryWrapper.eq("is_delete",0);
        List<User> list = userMapper.selectList(queryWrapper);

        return Result.success("查询成功",list);
    }

    @Override
    public Result<MonthlySettlementEligibility> updatePassword(String id, String oldPassword, String newPassword,String userId) {
        MonthlySettlementEligibility monthlySettlementEligibility = monthlySettlementEligibilityMapper.selectById(id);
        if (ObjectUtils.isEmpty(monthlySettlementEligibility)) {
            return Result.fail("修改失败，该月结资格不存在");
        }
        User user = userMapper.selectById(monthlySettlementEligibility.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("修改失败，当前用户不存在");
        }
        if (!monthlySettlementEligibility.getUserId().equals(userId)) {
            return Result.fail("修改失败，当前用户不是月结资格的主用户");
        }
        if (!monthlySettlementEligibility.getPassword().equals(oldPassword)) {
            return Result.fail("修改失败，月结密码不正确");
        }

        monthlySettlementEligibility.setPassword(newPassword);
        monthlySettlementEligibility.setUpdateTime(getTime());
        this.updateById(monthlySettlementEligibility);
        user.setMonthlySettlementEligibilityId(id);
        user.setCode(newPassword);
        user.setIsMonth(1);
        user.setUpdateTime(getTime());
        userMapper.updateById(user);
        return Result.success("修改成功",monthlySettlementEligibility);
    }
}

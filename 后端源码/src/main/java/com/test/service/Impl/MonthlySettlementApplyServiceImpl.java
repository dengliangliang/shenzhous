package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.MonthlySettlementApplyMapper;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.UserMapper;
import com.test.model.MonthlySettlementApply;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.Return.MonthlySettlementApplyReturn;
import com.test.model.User;
import com.test.service.MonthlySettlementApplyService;
import com.test.service.UserService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.InviteCodeGenerator.generateInviteCode;
import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class MonthlySettlementApplyServiceImpl extends ServiceImpl<MonthlySettlementApplyMapper, MonthlySettlementApply> implements MonthlySettlementApplyService {

    @Autowired
    private MonthlySettlementApplyMapper monthlySettlementApplyMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MonthlySettlementEligibilityMapper monthlySettlementEligibilityMapper;

    @Override
    public Result<MonthlySettlementApply> addMonthlySettlementApply(MonthlySettlementApply monthlySettlementApply) {
        User user = userMapper.selectById(monthlySettlementApply.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1){
            return Result.fail("提交申请失败，申请用户不存在");
        }
        QueryWrapper<MonthlySettlementApply> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", monthlySettlementApply.getUserId());
        queryWrapper.eq("apply_status", 0);
        MonthlySettlementApply m = monthlySettlementApplyMapper.selectOne(queryWrapper);
        if (ObjectUtils.isNotEmpty(m)){
            return Result.fail("提交申请失败，您还有相同的申请未被处理");
        }
        monthlySettlementApply.setApplyId(getUUID());
        monthlySettlementApply.setCreateTime(getTime());
        monthlySettlementApply.setUpdateTime(getTime());
        monthlySettlementApplyMapper.insert(monthlySettlementApply);
        return Result.success("提交申请成功",monthlySettlementApply);
    }

    @Override
    public Result<MonthlySettlementApply> cancelMonthlySettlementApply(String id) {
        MonthlySettlementApply m = monthlySettlementApplyMapper.selectById(id);
        if (ObjectUtils.isEmpty(m)){
            return Result.fail("取消申请失败，该申请记录不存在");
        }
        m.setApplyStatus(3);
        m.setUpdateTime(getTime());
        monthlySettlementApplyMapper.updateById(m);
        return Result.success("取消申请成功",m);
    }

    @Override
    public Result<String> passOrOverrule(String id, String pereviewerId, Integer type, String overrule) {
        MonthlySettlementApply m = monthlySettlementApplyMapper.selectById(id);
        if (ObjectUtils.isEmpty(m)){
            return Result.fail("修改申请状态失败，该申请记录不存在");
        }
        m.setApplyStatus(type);
        m.setUpdateTime(getTime());
        m.setPereviewerId(pereviewerId);
        if (StringUtils.isNotEmpty(overrule)){
            m.setRejectReason(overrule);
        }
        if (type==1){
            MonthlySettlementEligibility monthlySettlementEligibility = new MonthlySettlementEligibility();
            monthlySettlementEligibility.setMonthlySettlementEligibilityId(getUUID());
            monthlySettlementEligibility.setStartTime(getTime());
            monthlySettlementEligibility.setUserId(m.getUserId());
            monthlySettlementEligibility.setSettlementCycle(m.getSettlementCycle());
            monthlySettlementEligibility.setMinimumAmount(m.getMinimumAmount());
            monthlySettlementEligibility.setInvoiceRequirement(m.getInvoiceRequirement());
            monthlySettlementEligibility.setCreateTime(getTime());
            monthlySettlementEligibility.setUpdateTime(getTime());
            monthlySettlementEligibility.setPassword(generateInviteCode());
            monthlySettlementEligibility.setCycleNumber(15);
            if (m.getSettlementCycle()==0){
                monthlySettlementEligibility.setSettlementDate(1);
            }else if (m.getSettlementCycle()==1){
                monthlySettlementEligibility.setSettlementDate(3);
            }else if (m.getSettlementCycle()==2){
                monthlySettlementEligibility.setSettlementDate(6);
            }
            monthlySettlementEligibilityMapper.insert(monthlySettlementEligibility);
            User user = userMapper.selectById(m.getUserId());
            if (ObjectUtils.isNotEmpty(user)){
                user.setIsMonth(1);
                user.setMonthlySettlementEligibilityId(monthlySettlementEligibility.getMonthlySettlementEligibilityId());
                user.setCode(monthlySettlementEligibility.getPassword());
                userMapper.updateById(user);
            }
        }
        this.updateById(m);
        return Result.success("修改申请状态成功");
    }

    @Override
    public Result<MonthlySettlementApply> deleteMonthlySettlementApply(String id) {
        MonthlySettlementApply m = monthlySettlementApplyMapper.selectById(id);
        if (ObjectUtils.isEmpty(m)){
            return Result.fail("删除失败，该申请记录不存在");
        }
        this.monthlySettlementApplyMapper.deleteById(id);
        return Result.success("删除成功",m);
    }

    @Override
    public Result<MonthlySettlementApply> getMonthlySettlementApplyById(String id) {
        MonthlySettlementApply m = monthlySettlementApplyMapper.selectById(id);
        if (ObjectUtils.isEmpty(m)){
            return Result.fail("查询失败，该申请记录不存在");
        }
        User user = userMapper.selectById(m.getUserId());
        if (ObjectUtils.isNotEmpty(user)){
            m.setUserName(user.getUserName());
        }
        return Result.success("查询成功",m);
    }

    @Override
    public Result<MonthlySettlementApplyReturn> pageMonthlySettlementApply(int pageNum, int pageSize, String userId, Integer applyStatus) {
        QueryWrapper<MonthlySettlementApply> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(userId)){
            queryWrapper.eq("user_id", userId);
        }
        if (applyStatus!=null){
            queryWrapper.eq("apply_status", applyStatus);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<MonthlySettlementApply> page = this.page(new Page<>(pageNum,pageSize),queryWrapper);
        List<MonthlySettlementApply> list = page.getRecords();
        for (MonthlySettlementApply monthlySettlementApply : list) {
            User user = userMapper.selectById(monthlySettlementApply.getUserId());
            if (ObjectUtils.isNotEmpty(user)){
                monthlySettlementApply.setUserName(user.getUserName());
            }
        }
        MonthlySettlementApplyReturn monthlySettlementApplyReturn = new MonthlySettlementApplyReturn();
        monthlySettlementApplyReturn.setPageSize(pageSize);
        monthlySettlementApplyReturn.setCurrentPage(pageNum);
        monthlySettlementApplyReturn.setTotalPages(page.getPages());
        monthlySettlementApplyReturn.setDataList(page.getRecords());

        return Result.success("查询成功",monthlySettlementApplyReturn);
    }

    @Override
    public Result<List<MonthlySettlementApply>> getMonthlySettlementApplyList(String userId, Integer applyStatus) {
        QueryWrapper<MonthlySettlementApply> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(userId)){
            queryWrapper.eq("user_id", userId);
        }
        if (applyStatus!=null){
            queryWrapper.eq("apply_status", applyStatus);
        }
        queryWrapper.orderByDesc("create_time");
        List<MonthlySettlementApply> list = this.list(queryWrapper);
        for (MonthlySettlementApply monthlySettlementApply : list) {
            User user = userMapper.selectById(monthlySettlementApply.getUserId());
            if (ObjectUtils.isNotEmpty(user)){
                monthlySettlementApply.setUserName(user.getUserName());
            }
        }
        return Result.success("查询成功",list);
    }
}
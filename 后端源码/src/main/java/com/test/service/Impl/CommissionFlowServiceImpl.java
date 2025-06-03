package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.CommissionFlowMapper;
import com.test.mapper.MonthlySettlementEligibilityMapper;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserMapper;
import com.test.model.CommissionFlow;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.Order;
import com.test.model.Return.CommissionFlowReturn;
import com.test.model.User;
import com.test.service.CommissionFlowService;
import com.test.service.OrderService;
import com.test.service.UserService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class CommissionFlowServiceImpl extends ServiceImpl<CommissionFlowMapper, CommissionFlow> implements CommissionFlowService {

    @Autowired
    private CommissionFlowMapper commissionFlowMapper;



    @Autowired
    private UserMapper userMapper;


    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Result<CommissionFlowReturn> pageCommissionFlow(int pageNum, int pageSize, Integer flowType, String userId) {
        QueryWrapper<CommissionFlow> queryWrapper = new QueryWrapper<>();
        if (flowType != null) {
            queryWrapper.eq("flow_type", flowType);
        }
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<CommissionFlow> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        List<CommissionFlow> commissionFlows = page.getRecords();
        commissionFlows.forEach(commissionFlow -> {
            User user =  userMapper.selectById(commissionFlow.getUserId());
            if (ObjectUtils.isNotEmpty(user)){
                commissionFlow.setUserName(user.getUserName());
            }
        });
        CommissionFlowReturn commissionFlowReturn = new CommissionFlowReturn();
        commissionFlowReturn.setCurrentPage(pageNum);
        commissionFlowReturn.setPageSize(pageSize);
        commissionFlowReturn.setTotalPages(page.getTotal());
        commissionFlowReturn.setDataList(page.getRecords());
        return Result.success("查询成功",commissionFlowReturn);
    }

    @Override
    public Result<List<CommissionFlow>> getCommissionFlowList(Integer flowType, String userId) {
        QueryWrapper<CommissionFlow> queryWrapper = new QueryWrapper<>();
        if (flowType != null) {
            queryWrapper.eq("flow_type", flowType);
        }
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        queryWrapper.orderByDesc("create_time");
        List<CommissionFlow> commissionFlows = this.list(queryWrapper);
        commissionFlows.forEach(commissionFlow -> {
            User user =  userMapper.selectById(commissionFlow.getUserId());
            if (ObjectUtils.isNotEmpty(user)){
                commissionFlow.setUserName(user.getUserName());
            }
        });
        return Result.success("查询成功",commissionFlows);
    }

    @Override
    public Result<CommissionFlow> getCommissionFlowById(String id) {
        CommissionFlow commissionFlow = commissionFlowMapper.selectById(id);
        if (ObjectUtils.isEmpty(commissionFlow)){
            return Result.fail("查询失败，该佣金流动记录不存在");
        }
        User user =  userMapper.selectById(commissionFlow.getUserId());
        if (ObjectUtils.isNotEmpty(user)){
            commissionFlow.setUserName(user.getUserName());
        }
        Order order = orderMapper.selectById(commissionFlow.getOrderId());
        if (ObjectUtils.isNotEmpty(order)){
            commissionFlow.setOrder(order);
        }
        return Result.success("查询成功",commissionFlow);
    }

    @Override
    public Result<CommissionFlow> addCommissionFlow(CommissionFlow commissionFlow) {

        User user = userMapper.selectById(commissionFlow.getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("新增账单失败，支付用户信息不存在");
        }

        Order order = orderMapper.selectById(commissionFlow.getOrderId());
        if (ObjectUtils.isEmpty(order)||order.getIsDelete()==1) {
            return Result.fail("新增账单失败，该账单不存在");
        }
        commissionFlow.setFlowId(getUUID());
        commissionFlow.setCreateTime(getTime());
        commissionFlow.setUpdateTime(getTime());
        commissionFlowMapper.insert(commissionFlow);

        user.setMoney(commissionFlow.getBalance());
        userMapper.updateById(user);
        return Result.success(commissionFlow);
    }

    @Override
    public Result<String> batchesAddCommissionFlow(List<CommissionFlow> commissionFlows) {
        User user = userMapper.selectById(commissionFlows.get(0).getUserId());
        if (ObjectUtils.isEmpty(user)||user.getIsDelete()==1) {
            return Result.fail("新增账单失败，支付用户信息不存在");
        }
        for (CommissionFlow commissionFlow : commissionFlows) {
            Order order = orderMapper.selectById(commissionFlow.getOrderId());
            if (ObjectUtils.isEmpty(order)||order.getIsDelete()==1) {
                return Result.fail("新增账单失败，该账单不存在");
            }
            commissionFlow.setFlowId(getUUID());
            commissionFlow.setCreateTime(getTime());
            commissionFlow.setUpdateTime(getTime());
            commissionFlowMapper.insert(commissionFlow);
        }
        user.setMoney(commissionFlows.get(commissionFlows.size()-1).getBalance());
        userMapper.updateById(user);
        return Result.success("扣除佣金成功");
    }
}
package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.OrderMapper;
import com.test.mapper.PaymentFlowMapper;
import com.test.mapper.UserMapper;
import com.test.model.Order;
import com.test.model.PaymentFlow;
import com.test.model.Return.PaymentFlowReturn;
import com.test.model.User;
import com.test.service.PaymentFlowService;
import com.test.utils.Result;
import com.test.utils.TimeUtils;
import com.test.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

/**
 * 支付流水服务实现类
 */
@Service
public class PaymentFlowServiceImpl extends ServiceImpl<PaymentFlowMapper, PaymentFlow> implements PaymentFlowService {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private PaymentFlowMapper paymentFlowMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Result<PaymentFlow> addPaymentFlow(PaymentFlow paymentFlow) {
        try {
            paymentFlow.setFlowId(getUUID());
            paymentFlow.setCreateTime(getTime());
            paymentFlow.setUpdateTime(getTime());
            this.save(paymentFlow);
            return Result.success("新增成功",paymentFlow);
        } catch (Exception e) {
            return Result.fail("新增失败：" + e.getMessage());
        }
    }

    @Override
    public Result<PaymentFlow> deletePaymentFlow(String id) {
        PaymentFlow paymentFlow = paymentFlowMapper.selectById(id);
        if (ObjectUtils.isEmpty(paymentFlow)) {
            Result.fail("删除失败，该流水记录不存在");
        }
        this.removeById(id);
        return Result.success("删除成功",paymentFlow);
    }

    @Override
    public Result<PaymentFlow> getPaymentFlowById(String id) {
        PaymentFlow paymentFlow = paymentFlowMapper.selectById(id);
        if (ObjectUtils.isEmpty(paymentFlow)) {
            Result.fail("查询失败，该流水记录不存在");
        }
        User user = userMapper.selectById(paymentFlow.getUserId());
        if (ObjectUtils.isNotEmpty(user)){
            paymentFlow.setUserName(user.getUserName());
        }
        Order order = orderMapper.selectById(paymentFlow.getOrderId());
        if (ObjectUtils.isNotEmpty(order)){
            paymentFlow.setOrder(order);
        }
        return Result.success("查询成功",paymentFlow);
    }

    @Override
    public Result<PaymentFlowReturn> pagePaymentFlow(int pageNum, int pageSize, String userId, String orderId) {
        QueryWrapper<PaymentFlow> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotEmpty(orderId)) {
            queryWrapper.eq("order_id", orderId);
        }
        queryWrapper.orderByDesc("create_time");
        IPage<PaymentFlow> page = paymentFlowMapper.selectPage(new Page<>(pageNum, pageSize), queryWrapper);
        List<PaymentFlow> paymentFlows = page.getRecords();
        paymentFlows.forEach(paymentFlow -> {
            User user = userMapper.selectById(paymentFlow.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                paymentFlow.setUserName(user.getUserName());
            }
        });
        PaymentFlowReturn paymentFlowReturn = new PaymentFlowReturn();
        paymentFlowReturn.setCurrentPage(pageNum);
        paymentFlowReturn.setPageSize(pageSize);
        paymentFlowReturn.setTotalPages(page.getTotal());
        paymentFlowReturn.setDataList(paymentFlows);
        return Result.success("查询成功",paymentFlowReturn);
    }

    @Override
    public Result<List<PaymentFlow>> getPaymentFlowList(String userId, String orderId) {
        QueryWrapper<PaymentFlow> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(userId)) {
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotEmpty(orderId)) {
            queryWrapper.eq("order_id", orderId);
        }
        queryWrapper.orderByDesc("create_time");
        List<PaymentFlow> paymentFlows = this.list(queryWrapper);
        paymentFlows.forEach(paymentFlow -> {
            User user = userMapper.selectById(paymentFlow.getUserId());
            if (ObjectUtils.isNotEmpty(user)) {
                paymentFlow.setUserName(user.getUserName());
            }
        });
        return Result.success("查询成功",paymentFlows);
    }

    @Override
    public Result<String> batchesAddPaymentFlow(List<PaymentFlow> paymentFlows) {
        try {
            this.saveBatch(paymentFlows);
            return Result.success("批量新增成功");
        } catch (Exception e) {
            return Result.fail("批量新增失败：" + e.getMessage());
        }
    }

    @Override
    public PaymentFlow createPaymentFlow(String userId, String orderId, String merchantOrderId,
                                     String openid, String transactionId, BigDecimal amount,
                                     String description) {
        // 生成流水ID
        String flowId = "PAY" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
        
        // 创建当前时间
        String currentTime = LocalDateTime.now().format(FORMATTER);
        
        // 创建支付流水记录
        PaymentFlow paymentFlow = new PaymentFlow();
        paymentFlow.setFlowId(flowId);
        paymentFlow.setUserId(userId);
        paymentFlow.setOrderId(orderId);
        paymentFlow.setMerchantOrderId(merchantOrderId);
        paymentFlow.setOpenid(openid);
        paymentFlow.setTransactionId(transactionId);
        paymentFlow.setAmount(amount);
        paymentFlow.setDescription(description);
        paymentFlow.setRefundFlag(0); // 默认未退款
        paymentFlow.setCreateTime(currentTime);
        paymentFlow.setUpdateTime(currentTime);
        
        // 保存到数据库
        this.save(paymentFlow);
        
        return paymentFlow;
    }
    
    @Override
    public boolean updateRefundStatus(String merchantOrderId) {
        // 查询该商户订单号对应的支付流水
        LambdaQueryWrapper<PaymentFlow> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(PaymentFlow::getMerchantOrderId, merchantOrderId);
        PaymentFlow paymentFlow = baseMapper.selectOne(queryWrapper);
        
        if (paymentFlow != null) {
            // 更新退款状态为已退款
            paymentFlow.setRefundFlag(1);
            paymentFlow.setUpdateTime(TimeUtils.getTime());
            return baseMapper.updateById(paymentFlow) > 0;
        }
        
        return false;
    }



    @Override
    public PaymentFlow createRefundFlow(String userId, String orderId, String merchantOrderId, String openid,
                                     String transactionId, String refundId, BigDecimal amount, String description) {
        // 创建退款流水记录
        PaymentFlow refundFlow = new PaymentFlow();
        
        // 生成唯一流水ID
        String flowId = UUIDUtils.getUUID();
        refundFlow.setFlowId(flowId);
        refundFlow.setUserId(userId);
        refundFlow.setOrderId(orderId);
        refundFlow.setMerchantOrderId(merchantOrderId);
        refundFlow.setDescription(description);
        refundFlow.setOpenid(openid);
        refundFlow.setTransactionId(transactionId); // 原交易单号
        refundFlow.setAmount(amount); // 使用负数表示退款金额
        refundFlow.setRefundFlag(1); // 标记为退款流水
        refundFlow.setCreateTime(TimeUtils.getTime());
        refundFlow.setUpdateTime(TimeUtils.getTime());
        
        // 保存退款流水记录
        baseMapper.insert(refundFlow);
        
        return refundFlow;
    }
    
    @Override
    public List<PaymentFlow> list(LambdaQueryWrapper<PaymentFlow> queryWrapper) {
        return baseMapper.selectList(queryWrapper);
    }

}
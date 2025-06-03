package com.test.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.PaymentFlow;
import com.test.model.Return.PaymentFlowReturn;
import com.test.utils.Result;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

public interface PaymentFlowService extends IService<PaymentFlow> {
    Result<PaymentFlow> addPaymentFlow(PaymentFlow paymentFlow);

    Result<PaymentFlow> deletePaymentFlow(String id);

    Result<PaymentFlow> getPaymentFlowById(String id);

    Result<PaymentFlowReturn> pagePaymentFlow(int pageNum, int pageSize, String userId, String orderId);

    /**
     * 获取支付流水列表
     * @param userId 用户ID，可为null
     * @param orderId 订单ID，可为null
     * @return 支付流水列表
     */
    Result<List<PaymentFlow>> getPaymentFlowList(String userId, String orderId);

    /**
     * 获取支付流水列表（基于通用条件）
     * @param queryWrapper 查询条件
     * @return 支付流水列表
     */
    List<PaymentFlow> list(LambdaQueryWrapper<PaymentFlow> queryWrapper);

    Result<String> batchesAddPaymentFlow(List<PaymentFlow> paymentFlows);

    PaymentFlow createPaymentFlow(String userId, String orderId, String merchantOrderId,
                              String openid, String transactionId, BigDecimal amount,
                              String description);

    boolean updateRefundStatus(String merchantOrderId);


    /**
     * 创建退款流水记录
     * 
     * @param userId 用户ID
     * @param orderId 订单ID
     * @param merchantOrderId 商户订单号
     * @param openid 用户openId
     * @param transactionId 微信支付交易单号
     * @param refundId 微信退款单号
     * @param amount 退款金额
     * @param description 退款描述
     * @return 创建的退款流水记录
     */
    PaymentFlow createRefundFlow(String userId, String orderId, String merchantOrderId,
                               String openid, String transactionId, String refundId, 
                               BigDecimal amount, String description);


}
package com.test.controller;

import com.test.service.WxPayService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 微信支付控制器
 */
@RestController
@RequestMapping("/WxPay")
public class WxPayController {

    @Autowired
    private WxPayService wxPayService;

    /**
     * 创建微信支付订单
     * @param orderId 系统订单ID
     * @param openId 用户openId
     * @param amount 支付金额
     * @param description 商品描述
     * @return 支付参数
     */
    @PostMapping("/createOrder")
    public Result<Map<String, Object>> createOrder(
            @RequestParam String orderId,
            @RequestParam String openId,
            @RequestParam BigDecimal amount,
            @RequestParam String description) {
        return wxPayService.createWxPayOrder(orderId, openId, amount, description);
    }

    /**
     * 微信支付结果通知
     * @param notifyData 通知数据
     * @return 处理结果
     */
    @PostMapping("/notify")
    public String payNotify(@RequestBody String notifyData) {
        return wxPayService.handlePayNotify(notifyData);
    }

    /**
     * 查询订单状态
     * @param orderId 系统订单ID
     * @return 订单状态
     */
    @GetMapping("/queryOrder")
    public Result<Map<String, Object>> queryOrder(@RequestParam String orderId) {
        return wxPayService.queryOrder(orderId);
    }

    /**
     * 申请退款
     * @param orderId 系统订单ID
     * @param refundAmount 退款金额
     * @param reason 退款原因
     * @return 退款结果
     */
    @PostMapping("/refund")
    public Result<Map<String, Object>> refund(
            @RequestParam String orderId,
            @RequestParam BigDecimal refundAmount,
            @RequestParam String reason) {
        return wxPayService.refund(orderId, refundAmount, reason);
    }

    /**
     * 获取微信支付平台证书
     */
    @GetMapping("/getCertificates")
    public Result<Map<String, String>> getWxPayCertificates() {
        return wxPayService.getWxPayCertificates();
    }

    /**
     * 查询退款结果
     * 
     * @param outRefundNo 商户退款单号
     * @return 退款结果
     */
    @GetMapping("/queryRefund")
    public Result<Map<String, Object>> queryRefund(@RequestParam String outRefundNo) {
        return wxPayService.queryRefund(outRefundNo);
    }



}
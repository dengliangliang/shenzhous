package com.test.controller;

import com.test.utils.AliyunSmsUtils;
import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.alibaba.fastjson.JSON;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    @Autowired
    private AliyunSmsUtils aliyunSmsUtils;
    
    @Autowired
    private StringRedisTemplate redisTemplate;
    
    @Value("${aliyun.sms.templates.code}")
    private String codeTemplateId;
    
    // 验证码在Redis中的过期时间（分钟）
    private static final int CODE_EXPIRE_MINUTES = 5;
    // Redis中验证码的key前缀
    private static final String SMS_CODE_PREFIX = "sms:code:";

    /**
     * 发送验证码
     * @param phoneNumber 手机号码
     * @return 发送结果
     */
    @GetMapping("/sendCode")
    public Result<String> sendCode(@RequestParam String phoneNumber) {
        try {
            // 生成4位随机验证码
            String code = generateRandomCode(4);
            
            // 发送验证码
            SendSmsResponse response = aliyunSmsUtils.sendVerificationCode(phoneNumber, code);
            
            // 将验证码存入Redis，设置过期时间
            String redisKey = SMS_CODE_PREFIX + phoneNumber;
            redisTemplate.opsForValue().set(redisKey, code, CODE_EXPIRE_MINUTES, TimeUnit.MINUTES);
            
            return Result.success("发送成功");
        } catch (Exception e) {
            return Result.fail("验证码发送失败");
        }
    }

    /**
     * 生成指定位数的随机数字验证码
     * @param length 验证码长度
     * @return 随机验证码
     */
    private String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    // --- 针对特定业务场景的短信接口 ---

    /**
     * 发送【开票通知】
     * @param phoneNumber 管理员手机号
     * @return 发送结果
     */
    @GetMapping("/sendInvoice")
    public ResponseEntity<String> sendInvoice(@RequestParam String phoneNumber) {
        try {
            SendSmsResponse response = aliyunSmsUtils.sendInvoiceNotification(phoneNumber);
            return handleSmsResponse(response, "开票通知");
        } catch (Exception e) {
            return handleGenericException(e, "开票通知");
        }
    }

    /**
     * 发送【取件通知】
     * @param phoneNumber 客户手机号
     * @param station 站点名称
     * @param code 取件码
     * @return 发送结果
     */
    @GetMapping("/sendPickup")
    public ResponseEntity<String> sendPickup(
            @RequestParam String phoneNumber,
            @RequestParam String station,
            @RequestParam String code) {
        try {
            SendSmsResponse response = aliyunSmsUtils.sendPickupNotice(phoneNumber, station, code);
            return handleSmsResponse(response, "取件通知");
        } catch (Exception e) {
            return handleGenericException(e, "取件通知");
        }
    }

    /**
     * 发送【补差价通知】
     * @param phoneNumber 客户手机号
     * @param orderId 订单号
     * @return 发送结果
     */
    @GetMapping("/sendPriceDiff")
    public ResponseEntity<String> sendPriceDifference(
            @RequestParam String phoneNumber,
            @RequestParam String orderId) {
        try {
            SendSmsResponse response = aliyunSmsUtils.sendPriceDifferenceNotice(phoneNumber, orderId);
            return handleSmsResponse(response, "补差价通知");
        } catch (Exception e) {
            return handleGenericException(e, "补差价通知");
        }
    }

    /**
     * 发送【订单待付款通知】
     * @param phoneNumber 客户手机号
     * @param orderId 订单号
     * @return 发送结果
     */
    @GetMapping("/sendReminderPayment")
    public ResponseEntity<String> sendReminderPayment(
            @RequestParam String phoneNumber,
            @RequestParam String orderId) {
        try {
            SendSmsResponse response = aliyunSmsUtils.sendReminderPayment(phoneNumber, orderId);
            return handleSmsResponse(response, "提醒待付款通知");
        } catch (Exception e) {
            return handleGenericException(e, "提醒待付款通知");
        }
    }

    /**
     * 发送【月结通知】
     * @param phoneNumber 客户手机号
     * @return 发送结果
     */
    @GetMapping("/sendMonthly")
    public ResponseEntity<String> sendMonthlyStatement(@RequestParam String phoneNumber) {
        try {
            SendSmsResponse response = aliyunSmsUtils.sendMonthlyStatementNotice(phoneNumber);
            return handleSmsResponse(response, "月结通知");
        } catch (Exception e) {
            return handleGenericException(e, "月结通知");
        }
    }

    // --- 私有辅助方法，用于统一处理响应和异常 ---

    private ResponseEntity<String> handleSmsResponse(SendSmsResponse response, String smsType) {
        String responseStr = JSON.toJSONString(response);
        // 阿里云返回的 Code 是 "OK" 表示成功
        if (response != null && response.getBody() != null && "OK".equalsIgnoreCase(response.getBody().getCode())) {
            return ResponseEntity.ok(smsType + "短信发送成功! Response: " + responseStr);
        } else {
            String message = (response != null && response.getBody() != null) ? response.getBody().getMessage() : "未知错误";
            String code = (response != null && response.getBody() != null) ? response.getBody().getCode() : "未知错误码";
            System.err.println("发送" + smsType + "短信失败: " + message + ", Code: " + code + ", Response: " + responseStr);
            return ResponseEntity.badRequest().body(smsType + "短信发送失败: " + message + ", Response: " + responseStr);
        }
    }

    private ResponseEntity<String> handleGenericException(Exception e, String smsType) {
        System.err.println("调用" + smsType + "短信接口时发生异常: " + e.toString());
        return ResponseEntity.internalServerError().body("发送" + smsType + "短信时发生错误: " + e.getMessage());
    }
} 
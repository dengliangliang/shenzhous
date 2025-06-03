package com.test.utils;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.aliyun.teaopenapi.models.Config;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AliyunSmsUtils {

    @Value("${aliyun.sms.accessKeyId}")
    private String accessKeyId;

    @Value("${aliyun.sms.accessKeySecret}")
    private String accessKeySecret;

    @Value("${aliyun.sms.signName}")
    private String signName;

    @Value("${aliyun.sms.templates.code}")
    private String codeTemplateCode;

    @Value("${aliyun.sms.templates.invoice}")
    private String invoiceTemplateCode;

    @Value("${aliyun.sms.templates.pickup}")
    private String pickupTemplateCode;

    @Value("${aliyun.sms.templates.priceDiff}")
    private String priceDiffTemplateCode;

    @Value("${aliyun.sms.templates.payment}")
    private String reminderPaymentCode;

    @Value("${aliyun.sms.templates.monthly}")
    private String monthlyTemplateCode;

    /**
     * 创建阿里云短信客户端
     * @return Client
     * @throws Exception 如果创建客户端失败
     */
    private Client createClient() throws Exception {
        Config config = new Config()
                .setAccessKeyId(accessKeyId)
                .setAccessKeySecret(accessKeySecret);
        // 访问的域名
        config.endpoint = "dysmsapi.aliyuncs.com";
        return new Client(config);
    }

    /**
     * 发送短信的通用方法
     * @param phoneNumber 手机号
     * @param templateCode 模板CODE
     * @param templateParam 模板参数JSON字符串
     * @return SendSmsResponse
     * @throws Exception 如果API调用失败
     */
    public SendSmsResponse sendSms(String phoneNumber, String templateCode, String templateParam) throws Exception {
        Client client = createClient();
        
        SendSmsRequest request = new SendSmsRequest()
                .setPhoneNumbers(phoneNumber)
                .setSignName(signName)
                .setTemplateCode(templateCode);
                
        if (templateParam != null) {
            request.setTemplateParam(templateParam);
        }
        
        SendSmsResponse response = client.sendSms(request);
        
        // 打印响应结果
        System.out.println("短信发送结果: " + JSON.toJSONString(response));
        
        return response;
    }
    

    // --- 针对特定业务的发送方法 ---

    /**
     * 发送【开票通知】短信 (无参数)
     * @param phoneNumber 接收短信的管理员手机号
     * @return SendSmsResponse
     * @throws Exception API 异常
     */
    public SendSmsResponse sendInvoiceNotification(String phoneNumber) throws Exception {
        // 无参数模板，传 null 或空的 JSON 字符串
        return this.sendSms(phoneNumber, invoiceTemplateCode, "{}");
    }

    /**
     * 发送【取件通知】短信 (参数: station=站点, code=取件码)
     * @param phoneNumber 接收短信的客户手机号
     * @param stationName 站点名称
     * @param pickupCode 取件码
     * @return SendSmsResponse
     * @throws Exception API 异常
     */
    public SendSmsResponse sendPickupNotice(String phoneNumber, String stationName, String pickupCode) throws Exception {
        // 构建阿里云格式的模板参数JSON
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("station", stationName);
        paramMap.put("code", pickupCode);
        String templateParam = JSON.toJSONString(paramMap);
        
        return this.sendSms(phoneNumber, pickupTemplateCode, templateParam);
    }

    /**
     * 发送【补差价通知】短信 (参数: orderId=订单号)
     * @param phoneNumber 接收短信的客户手机号
     * @param orderId 订单号
     * @return SendSmsResponse
     * @throws Exception API 异常
     */
    public SendSmsResponse sendPriceDifferenceNotice(String phoneNumber, String orderId) throws Exception {
        // 构建阿里云格式的模板参数JSON
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("orderId", orderId);
        String templateParam = JSON.toJSONString(paramMap);
        
        return this.sendSms(phoneNumber, priceDiffTemplateCode, templateParam);
    }

    public SendSmsResponse sendReminderPayment(String phoneNumber, String orderId) throws Exception {
        // 构建阿里云格式的模板参数JSON
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("orderId", orderId);
        String templateParam = JSON.toJSONString(paramMap);

        return this.sendSms(phoneNumber, reminderPaymentCode, templateParam);
    }

    /**
     * 发送【月结通知】短信 (无参数)
     * @param phoneNumber 接收短信的客户手机号
     * @return SendSmsResponse
     * @throws Exception API 异常
     */
    public SendSmsResponse sendMonthlyStatementNotice(String phoneNumber) throws Exception {
        // 无参数模板，传 null 或空的 JSON 字符串
        return this.sendSms(phoneNumber, monthlyTemplateCode, "{}");
    }

    /**
     * 发送验证码短信
     * @param phoneNumber 接收短信的手机号
     * @param code 验证码
     * @return SendSmsResponse
     * @throws Exception API 异常
     */
    public SendSmsResponse sendVerificationCode(String phoneNumber, String code) throws Exception {
        // 构建阿里云格式的模板参数JSON
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("code", code);
        String templateParam = JSON.toJSONString(paramMap);
        
        return this.sendSms(phoneNumber, codeTemplateCode, templateParam);
    }
} 
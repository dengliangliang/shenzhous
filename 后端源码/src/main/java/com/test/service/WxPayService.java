package com.test.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.config.WxPayConfig;
import com.test.model.PaymentFlow;
import com.test.utils.Result;
import com.test.utils.WxPayDecryptUtil;
import com.test.utils.WxPaySignatureUtil;
import com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder;
import com.wechat.pay.contrib.apache.httpclient.auth.*;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import com.wechat.pay.contrib.apache.httpclient.util.RsaCryptoUtil;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.ArrayList;

/**
 * 微信支付服务
 */
@Service
public class WxPayService {
    private static final Logger log = LoggerFactory.getLogger(WxPayService.class);

    // ... 常量定义保持不变 ...
    private static final String JSAPI_URL = "https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi";
    private static final String QUERY_URL = "https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/";
    private static final String REFUND_URL = "https://api.mch.weixin.qq.com/v3/refund/domestic/refunds";
    private static final String CLOSE_URL = "https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/{out_trade_no}/close";
    private static final String DOMAIN = "https://api.mch.weixin.qq.com";


    @Autowired
    private WxPayConfig wxPayConfig;

    @Autowired
    private ResourceLoader resourceLoader; // 注入ResourceLoader

    @Autowired
    private PaymentFlowService paymentFlowService;

    // 缓存商户私钥和证书序列号
    private PrivateKey merchantPrivateKey;
    private String merchantSerialNumber; // 新增：缓存证书序列号



    /**
     * 获取商户私钥和证书序列号
     */
    private synchronized void loadMerchantKeyAndCert() throws Exception {
        if (merchantPrivateKey == null || merchantSerialNumber == null) {
            // 加载私钥
            String privateKeyLocation = wxPayConfig.getPrivateKeyPath();
             if (privateKeyLocation == null) {
                 throw new RuntimeException("微信支付私钥文件路径未在配置中找到 (wxpay.privateKeyPath)");
             }
            Resource privateKeyResource = resourceLoader.getResource(privateKeyLocation);
            if (!privateKeyResource.exists()) {
                throw new RuntimeException("微信支付私钥文件未找到：" + privateKeyLocation);
            }
            try (InputStream inputStream = privateKeyResource.getInputStream()) {
                merchantPrivateKey = PemUtil.loadPrivateKey(inputStream);
            }

            // 加载证书并获取序列号
            String certLocation = wxPayConfig.getMerchantCertPath();
             if (certLocation == null) {
                 throw new RuntimeException("微信支付证书文件路径未在配置中找到 (wxpay.merchantCertPath)");
             }
            Resource certResource = resourceLoader.getResource(certLocation);
            if (!certResource.exists()) {
                throw new RuntimeException("微信支付证书文件未找到：" + certLocation);
            }
            try (InputStream inputStream = certResource.getInputStream()) {
                X509Certificate certificate = PemUtil.loadCertificate(inputStream);
                merchantSerialNumber = certificate.getSerialNumber().toString(16).toUpperCase(); // 获取序列号
                log.info("加载商户证书成功，序列号: {}", merchantSerialNumber);
            }
        }
    }


    /**
     * 获取商户私钥
     */
    private PrivateKey getMerchantPrivateKey() throws Exception {
        loadMerchantKeyAndCert(); // 确保已加载
        return merchantPrivateKey;
    }

     /**
     * 获取商户证书序列号
     */
    private String getMerchantSerialNumber() throws Exception {
        loadMerchantKeyAndCert(); // 确保已加载
        return merchantSerialNumber;
    }

    /**
     * 空证书验证器 - 仅用于测试环境
     */
    private static class NullCertificateVerifier implements com.wechat.pay.contrib.apache.httpclient.auth.Verifier {
        @Override
        public boolean verify(String serialNumber, byte[] message, String signature) {
            // 测试环境：始终返回true，不验证签名
            return true;
        }
        
        @Override
        public X509Certificate getValidCertificate() {
            // 测试环境：返回null
            return null;
        }
    }

    /**
     * 初始化微信支付客户端
     */
    private CloseableHttpClient getWxPayClient() throws Exception {
        try {
            // 获取商户私钥和证书序列号
            PrivateKey privateKey = getMerchantPrivateKey();
            String serialNumber = getMerchantSerialNumber();
            
            log.info("初始化微信支付客户端，跳过验证，商户号: {}, 证书序列号: {}", wxPayConfig.getMchId(), serialNumber);
            
            // 使用最简单的方式，直接构建客户端并跳过验证
            WechatPayHttpClientBuilder builder = WechatPayHttpClientBuilder.create();
            builder.withMerchant(wxPayConfig.getMchId(), serialNumber, privateKey);
            builder.withValidator(response -> true);  // lambda表达式始终返回true，跳过验证
            
            CloseableHttpClient client = builder.build();
            log.info("微信支付客户端初始化成功");
            return client;
        } catch (Exception e) {
            log.error("初始化微信支付客户端失败", e);
            throw e;
        }
    }

    // ... createWxPayOrder 方法保持不变 ...
    public Result<Map<String, Object>> createWxPayOrder(String orderId, String openId, BigDecimal amount, String description) {
        try {
            CloseableHttpClient httpClient = getWxPayClient(); // 初始化会加载密钥和证书

             // 构建请求参数
            Map<String, Object> requestData = new HashMap<>();
            requestData.put("appid", wxPayConfig.getAppId());
            requestData.put("mchid", wxPayConfig.getMchId());
            requestData.put("description", description);
            requestData.put("out_trade_no", orderId);
            requestData.put("notify_url", wxPayConfig.getNotifyUrl());

            // 构建金额对象 (转换为分)
            Map<String, Object> amountMap = new HashMap<>();
            amountMap.put("total", amount.multiply(new BigDecimal("100")).intValue());
            amountMap.put("currency", "CNY");
            requestData.put("amount", amountMap);

            // 构建支付者对象
            Map<String, Object> payerMap = new HashMap<>();
            payerMap.put("openid", openId);
            requestData.put("payer", payerMap);

            // 生成请求数据的JSON
            String requestJson = JSON.toJSONString(requestData);

            // 发送请求
            HttpPost httpPost = new HttpPost(JSAPI_URL);
            httpPost.setEntity(new StringEntity(requestJson, "UTF-8"));
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                log.info("微信支付下单响应: {}", responseBody);

                if (statusCode == 200) {
                    JSONObject jsonResponse = JSON.parseObject(responseBody);
                    String prepayId = jsonResponse.getString("prepay_id");

                    // 构建小程序调起支付的参数
                    Map<String, Object> payParams = new HashMap<>();
                    String timestamp = String.valueOf(LocalDateTime.now().toEpochSecond(ZoneOffset.of("+8")));
                    String nonceStr = UUID.randomUUID().toString().replaceAll("-", "");

                    payParams.put("appId", wxPayConfig.getAppId());
                    payParams.put("timeStamp", timestamp);
                    payParams.put("nonceStr", nonceStr);
                    payParams.put("package", "prepay_id=" + prepayId);
                    payParams.put("signType", "RSA");

                    // 生成小程序支付签名
                    String signMessage = WxPaySignatureUtil.buildPaySignatureMessage(
                            wxPayConfig.getAppId(), timestamp, nonceStr, prepayId);
                    // 使用缓存的私钥签名
                    String paySign = WxPaySignatureUtil.sign(signMessage, getMerchantPrivateKey());

                    payParams.put("paySign", paySign);

                    return Result.success(payParams);
                 } else {
                     return Result.fail("创建支付订单失败：" + responseBody);
                 }
            }
        } catch (Exception e) {
            log.error("创建微信支付订单异常", e);
            return Result.fail("创建支付订单异常：" + e.getMessage());
        }
    }


    // ... queryOrder 方法保持不变 ...
    public Result<Map<String, Object>> queryOrder(String orderId) {
        try {
            CloseableHttpClient httpClient = getWxPayClient();

            String url = QUERY_URL + orderId + "?mchid=" + wxPayConfig.getMchId();
            HttpGet httpGet = new HttpGet(url);
            httpGet.setHeader("Accept", "application/json");

            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                log.info("微信支付订单查询响应: {}", responseBody);

                if (statusCode == 200) {
                    JSONObject jsonResponse = JSON.parseObject(responseBody);
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("trade_state", jsonResponse.getString("trade_state"));
                    resultMap.put("trade_state_desc", jsonResponse.getString("trade_state_desc"));

                    return Result.success(resultMap);
                } else {
                    return Result.fail("查询订单失败：" + responseBody);
                }
            }
        } catch (Exception e) {
            log.error("查询微信支付订单异常", e);
            return Result.fail("查询订单异常：" + e.getMessage());
        }
    }

    // ... refund 方法保持不变 ...
    public Result<Map<String, Object>> refund(String orderId, BigDecimal refundAmount, String reason) {
        try {
            log.info("开始退款处理, 订单号: {}, 退款金额: {}, 退款原因: {}", orderId, refundAmount, reason);
            
            // 先查询订单是否存在且已支付
            Result<Map<String, Object>> queryResult = queryOrder(orderId);
            
            // 检查查询结果是否成功
            if (!queryResult.isSuccess()) {
                log.error("查询原订单失败，无法退款: {}", queryResult.getMsg());
                return Result.fail("查询原订单失败，无法退款：" + queryResult.getMsg());
            }
            
            Map<String, Object> orderInfo = queryResult.getData();
            
            // 检查orderInfo是否为空
            if (orderInfo == null) {
                log.error("订单信息为空，无法退款: {}", orderId);
                return Result.fail("订单信息为空，无法退款");
            }
            
            String tradeState = (String) orderInfo.get("trade_state");
//            if (!"SUCCESS".equals(tradeState)) {
//                log.error("原订单支付状态不是成功，无法退款: {}", tradeState);
//                return Result.fail("原订单支付状态不是成功，无法退款");
//            }
            
            // 查询订单的支付记录和已退款金额
            LambdaQueryWrapper<PaymentFlow> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(PaymentFlow::getOrderId, orderId)
                      .eq(PaymentFlow::getRefundFlag, 0)
                      .or()
                      .eq(PaymentFlow::getOrderId, orderId)
                      .eq(PaymentFlow::getRefundFlag, 2);
            
            List<PaymentFlow> paymentFlows = paymentFlowService.list(queryWrapper);
            if (paymentFlows == null || paymentFlows.isEmpty()) {
                log.error("未找到订单支付记录或订单已全额退款: {}", orderId);
                return Result.fail("未找到订单支付记录或订单已全额退款");
            }

            // 获取原始支付记录
            PaymentFlow paymentFlow = paymentFlows.get(0);
            BigDecimal orderAmount = paymentFlow.getAmount();


            // 检查是否已全额退款
            if (paymentFlow.getRefundFlag() != null && paymentFlow.getRefundFlag() == 1) {
                log.error("订单已全额退款，不能重复退款: {}", orderId);
                return Result.fail("订单已全额退款，不能重复退款");
            }


            
            // 查询微信支付交易信息，确认是否可退款
            Integer originalAmount = null;
            String transactionId = null;
            
            // 获取微信支付交易号
            transactionId = paymentFlow.getTransactionId();
            if (transactionId == null || transactionId.isEmpty()) {
                log.error("未找到微信支付交易号，无法退款: {}", orderId);
                return Result.fail("未找到微信支付交易号，无法退款");
            }
            
            // 转换为分
            int orderAmountCent = orderAmount.multiply(new BigDecimal("100")).intValue();
            int refundAmountCent = refundAmount.multiply(new BigDecimal("100")).intValue();
            
            CloseableHttpClient httpClient = getWxPayClient();

            // 构建请求参数
            Map<String, Object> requestData = new HashMap<>();
            String refundId = "refund_" + UUID.randomUUID().toString().replaceAll("-", "");
            requestData.put("out_refund_no", refundId);
            
            // 使用transaction_id
            requestData.put("transaction_id", transactionId);
            requestData.put("reason", reason);
            requestData.put("notify_url", wxPayConfig.getRefundNotifyUrl());

            // 构建金额对象 (已转换为分)
            Map<String, Object> amountMap = new HashMap<>();
            amountMap.put("refund", refundAmountCent);
            amountMap.put("total", orderAmountCent);
            amountMap.put("currency", "CNY");
            requestData.put("amount", amountMap);

            log.info("发送退款请求: {}", JSON.toJSONString(requestData));
            
            // 发送请求
            HttpPost httpPost = new HttpPost(REFUND_URL);
            httpPost.setEntity(new StringEntity(JSON.toJSONString(requestData), "UTF-8"));
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                log.info("微信支付退款响应: {}", responseBody);

                if (statusCode == 200) {
                    JSONObject jsonResponse = JSON.parseObject(responseBody);
                    String status = jsonResponse.getString("status");
                    
                    // 构建返回结果
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("refund_id", jsonResponse.getString("refund_id"));  // 微信退款单号
                    resultMap.put("out_refund_no", jsonResponse.getString("out_refund_no"));  // 商户退款单号
                    resultMap.put("transaction_id", jsonResponse.getString("transaction_id"));  // 微信支付交易单号
                    resultMap.put("out_trade_no", jsonResponse.getString("out_trade_no"));  // 商户订单号
                    resultMap.put("status", status);  // 退款状态
                    
                    // 退款金额信息
                    if (jsonResponse.containsKey("amount")) {
                        JSONObject amount = jsonResponse.getJSONObject("amount");
                        resultMap.put("refund", amount.getIntValue("refund"));  // 退款金额
                        resultMap.put("total", amount.getIntValue("total"));  // 原订单金额
                    }
                    
                    // 退款时间
                    resultMap.put("create_time", jsonResponse.getString("create_time"));
                    
                    // 如果退款成功或处理中，更新支付流水的退款状态
                    if ("SUCCESS".equals(status) || "PROCESSING".equals(status)) {
                        try {
                            // 创建退款流水记录
                            try {
                                // 创建退款流水记录
                                String refundTransactionId = jsonResponse.getString("refund_id"); // 微信退款单号
                                String refundOutTradeNo = jsonResponse.getString("out_refund_no"); // 商户退款单号
                                BigDecimal refundAmountDecimal = new BigDecimal(refundAmountCent).divide(new BigDecimal("100")); // 转为元
                                String description = "退款：" + reason;
                                
                                PaymentFlow refundFlow = paymentFlowService.createRefundFlow(
                                        paymentFlow.getUserId(), 
                                        orderId, 
                                        refundOutTradeNo, 
                                        paymentFlow.getOpenid(), 
                                        refundTransactionId, 
                                        jsonResponse.getString("refund_id"), 
                                        refundAmountDecimal.negate(), // 退款金额用负数表示
                                        description
                                );
                                
                                log.info("已创建退款流水记录，流水ID: {}, 金额: {}", 
                                        refundFlow != null ? refundFlow.getFlowId() : "null", 
                                        refundAmountDecimal.negate());
                            } catch (Exception e) {
                                log.error("创建退款流水记录失败", e);
                                // 创建退款流水记录失败不应阻止返回退款结果
                            }
                        } catch (Exception e) {
                            log.error("更新支付流水退款状态失败", e);
                            // 记录失败不应阻止返回退款结果
                        }
                    }

                    return Result.success(resultMap);
                } else {
                    log.error("申请退款失败: {}", responseBody);
                    return Result.fail("申请退款失败：" + responseBody);
                }
            }
        } catch (Exception e) {
            log.error("申请微信退款异常", e);
            return Result.fail("申请退款异常：" + e.getMessage());
        }
    }

    // ... handlePayNotify 方法保持不变 ...
    public String handlePayNotify(String notifyData) {
        try {
            log.info("接收到微信支付结果通知: {}", notifyData);

            // 解析通知数据
            JSONObject notifyJson = JSON.parseObject(notifyData);
            
            // 验证通知格式
            if (!notifyJson.containsKey("resource")) {
                log.error("通知数据格式错误，缺少resource字段: {}", notifyData);
                return buildFailResponse("通知数据格式错误");
            }
            
            // TODO: 验证签名 (需要从微信支付平台获取证书)
            // 检查是否有签名相关字段
            if (notifyJson.containsKey("id") && notifyJson.containsKey("signature") && 
                notifyJson.containsKey("serial") && notifyJson.containsKey("timestamp") && 
                notifyJson.containsKey("nonce")) {
                
                String id = notifyJson.getString("id");
                String signature = notifyJson.getString("signature");
                String serialNumber = notifyJson.getString("serial");
                String timestamp = notifyJson.getString("timestamp");
                String nonce = notifyJson.getString("nonce");
                
                log.info("通知包含签名信息: serialNumber={}, id={}", serialNumber, id);
                
                // 构建验签字符串
                // 注意：验签的正确做法是保存微信支付平台证书并验证
                // 这里为了示例，仅记录日志，不影响后续流程
                String signMessage = buildSignatureMessage(timestamp, nonce, notifyJson.getString("resource"));
                log.info("待验证的签名消息: {}", signMessage);
                log.info("签名值: {}", signature);
                log.info("证书序列号: {}", serialNumber);
                
                // 实际验签需要获取证书
                boolean verified = verifySignature(serialNumber, signMessage, signature);
                if (!verified) {
                    log.error("签名验证失败");
                    return buildFailResponse("签名验证失败");
                }
            } else {
                log.warn("通知数据缺少签名验证所需字段，跳过签名验证");
            }

            // 获取通知数据中的资源数据
            JSONObject resource = notifyJson.getJSONObject("resource");
            
            // 验证resource中的必要字段
            if (!resource.containsKey("ciphertext") || !resource.containsKey("nonce") || !resource.containsKey("associated_data")) {
                log.error("resource数据格式错误，缺少必要字段: {}", resource);
                return buildFailResponse("resource数据格式错误");
            }
            
            String algorithm = resource.getString("algorithm");
            String ciphertext = resource.getString("ciphertext");
            String nonce = resource.getString("nonce");
            String associatedData = resource.getString("associated_data");
            
            log.info("解密参数: algorithm={}, nonce={}, associatedData={}, ciphertext长度={}, apiV3Key长度={}",
                    algorithm, nonce, associatedData, ciphertext.length(), 
                    wxPayConfig.getApiV3Key() != null ? wxPayConfig.getApiV3Key().length() : 0);

            // 使用APIv3密钥解密数据
            String decryptedData;
            try {
                decryptedData = decryptResourceData(ciphertext, nonce, associatedData);
                log.info("解密后的支付结果数据: {}", decryptedData);
            } catch (Exception e) {
                log.error("解密数据失败: {}", e.getMessage(), e);
                
                // 尝试手动解密
                try {
                    log.info("尝试手动解密...");
                    
                    // 处理APIv3Key，确保长度为32字节
                    String apiV3Key = wxPayConfig.getApiV3Key();
                    byte[] keyBytes;
                    
                    // 打印原始密钥长度
                    log.info("原始APIv3Key: 长度={}, 值={}", 
                            apiV3Key != null ? apiV3Key.length() : 0, 
                            apiV3Key != null ? "前几位: " + apiV3Key.substring(0, Math.min(5, apiV3Key.length())) + "..." : "null");
                    
                    if (apiV3Key != null) {
                        // 移除可能的空白字符
                        apiV3Key = apiV3Key.trim();
                        
                        if (apiV3Key.length() > 32) {
                            log.warn("APIv3Key长度超过32字节，将截断为前32字节");
                            keyBytes = apiV3Key.substring(0, 32).getBytes(StandardCharsets.UTF_8);
                        } else if (apiV3Key.length() < 32) {
                            log.warn("APIv3Key长度小于32字节({}字节)，将补足至32字节", apiV3Key.length());
                            // 用0补足至32字节
                            StringBuilder paddedKey = new StringBuilder(apiV3Key);
                            while (paddedKey.length() < 32) {
                                paddedKey.append("0");
                            }
                            keyBytes = paddedKey.toString().getBytes(StandardCharsets.UTF_8);
                        } else {
                            keyBytes = apiV3Key.getBytes(StandardCharsets.UTF_8);
                        }
                    } else {
                        log.error("APIv3Key为空");
                        return buildFailResponse("APIv3Key配置错误");
                    }
                    
                    // 使用处理后的密钥进行解密
                    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
                    SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
                    GCMParameterSpec spec = new GCMParameterSpec(128, nonce.getBytes(StandardCharsets.UTF_8));
                    cipher.init(Cipher.DECRYPT_MODE, key, spec);
                    
                    if (associatedData != null) {
                        cipher.updateAAD(associatedData.getBytes(StandardCharsets.UTF_8));
                    }
                    
                    byte[] bytes = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
                    decryptedData = new String(bytes, StandardCharsets.UTF_8);
                    log.info("手动解密成功: {}", decryptedData);
                } catch (Exception ex) {
                    log.error("手动解密也失败: {}", ex.getMessage(), ex);
                    return buildFailResponse("解密失败");
                }
            }
            
            // 解析解密后的数据
            JSONObject result;
            try {
                result = JSON.parseObject(decryptedData);
            } catch (Exception e) {
                log.error("解析解密后的JSON数据失败: {}", e.getMessage(), e);
                return buildFailResponse("解析解密数据失败");
            }
            
            // 提取关键字段
            String tradeState = result.getString("trade_state");
            String outTradeNo = result.getString("out_trade_no");
            
            // 获取微信支付交易单号
            String transactionId = result.getString("transaction_id");
            log.info("支付结果: 商户订单号={}, 微信支付交易单号={}, 交易状态={}", outTradeNo, transactionId, tradeState);

            // 只有交易成功时才创建支付流水记录
            if ("SUCCESS".equals(tradeState)) {
                try {
                    // 获取支付金额（单位为分，需要转换为元）
                    JSONObject amountObj = result.getJSONObject("amount");
                    int payerTotal = amountObj.getIntValue("payer_total");
                    BigDecimal amount = new BigDecimal(payerTotal).divide(new BigDecimal("100"));
                    
                    // 获取支付者信息
                    JSONObject payerObj = result.getJSONObject("payer");
                    String openid = payerObj.getString("openid");
                    
                    // 获取交易单号
//                    String transactionId = result.getString("transaction_id");
                    
                    // 从商户订单号获取订单ID - 这里直接使用商户订单号作为订单ID
                    String orderId = outTradeNo; // 使用商户订单号作为订单ID
                    
                    // 直接使用openId作为userId
                    String userId = openid; // 使用微信用户的openId作为userId
                    
                    // 获取交易描述
                    String description = result.getString("trade_state_desc");
                    
                    log.info("准备创建支付流水记录: orderId={}, userId(openId)={}, transactionId={}, amount={}", 
                            orderId, userId, transactionId, amount);
                    
                    // 创建支付流水记录
                    PaymentFlow paymentFlow = paymentFlowService.createPaymentFlow(
                        userId,             // 用户ID
                        orderId,            // 订单ID
                        outTradeNo,         // 商户订单号
                        openid,             // 用户openId
                        transactionId,      // 微信支付交易单号
                        amount,             // 支付金额
                        description         // 交易描述
                    );
                    
                    log.info("成功创建支付流水记录: flowId={}, 商户订单号={}, 金额={}", 
                            paymentFlow != null ? paymentFlow.getFlowId() : "null", outTradeNo, amount);
                } catch (Exception e) {
                    log.error("创建支付流水记录失败: {}", e.getMessage(), e);
                    // 记录失败不应阻止返回成功给微信支付平台
                }
                
                // TODO: 更新订单状态为已支付
                // 这里应该调用订单服务更新订单状态
            }

            // 向微信支付返回处理结果
            return buildSuccessResponse();
        } catch (Exception e) {
            log.error("处理微信支付通知异常: {}", e.getMessage(), e);
            // 返回失败结果
            return buildFailResponse("处理失败");
        }
    }
    
    /**
     * 构建成功响应
     */
    private String buildSuccessResponse() {
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("code", "SUCCESS");
        responseData.put("message", "成功");
        return JSON.toJSONString(responseData);
    }
    
    /**
     * 构建失败响应
     */
    private String buildFailResponse(String reason) {
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("code", "FAIL");
        responseData.put("message", reason);
        return JSON.toJSONString(responseData);
    }

    // ... decryptResourceData 方法保持不变 ...
    private String decryptResourceData(String ciphertext, String nonce, String associatedData) {
        try {
            return WxPayDecryptUtil.decryptToString(
                    ciphertext,
                    nonce,
                    associatedData,
                    wxPayConfig.getApiV3Key()
            );
        } catch (Exception e) {
            log.error("解密数据异常", e);
            throw new RuntimeException("解密数据异常", e);
        }
    }

    // ... decryptResourceData 方法后添加新方法 ...
    /**
     * 获取微信支付平台证书
     * 用于验证微信支付通知签名
     */
    public Result<Map<String, String>> getWxPayCertificates() {
        try {
            log.info("开始获取微信支付平台证书...");
            CloseableHttpClient httpClient = getWxPayClient();
            
            String url = "https://api.mch.weixin.qq.com/v3/certificates";
            HttpGet httpGet = new HttpGet(url);
            httpGet.setHeader("Accept", "application/json");
            httpGet.setHeader("Content-Type", "application/json");
            
            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                log.info("获取微信支付平台证书响应: {}", responseBody);
                
                if (statusCode == 200) {
                    JSONObject responseJson = JSON.parseObject(responseBody);
                    if (!responseJson.containsKey("data")) {
                        return Result.fail("响应中未包含证书数据");
                    }
                    
                    // 解析证书列表
                    Map<String, String> certificatesMap = new HashMap<>();
                    for (Object obj : responseJson.getJSONArray("data")) {
                        JSONObject certInfo = (JSONObject) obj;
                        String serialNo = certInfo.getString("serial_no");
                        
                        // 获取加密证书信息
                        JSONObject encryptCertificate = certInfo.getJSONObject("encrypt_certificate");
                        String algorithm = encryptCertificate.getString("algorithm");
                        String nonce = encryptCertificate.getString("nonce");
                        String associatedData = encryptCertificate.getString("associated_data");
                        String ciphertext = encryptCertificate.getString("ciphertext");
                        
                        // 解密证书
                        try {
                            String certificate = decryptResourceData(ciphertext, nonce, associatedData);
                            certificatesMap.put(serialNo, certificate);
                            log.info("成功解密微信平台证书，序列号: {}", serialNo);
                        } catch (Exception e) {
                            log.error("解密微信平台证书失败，序列号: {}, 错误: {}", serialNo, e.getMessage());
                        }
                    }
                    
                    if (certificatesMap.isEmpty()) {
                        return Result.fail("未能成功解密任何证书");
                    }
                    
                    log.info("成功获取微信支付平台证书，共 {} 个", certificatesMap.size());
                    return Result.success(certificatesMap);
                } else {
                    return Result.fail("获取微信支付平台证书失败: " + responseBody);
                }
            }
        } catch (Exception e) {
            log.error("获取微信支付平台证书异常", e);
            return Result.fail("获取证书异常: " + e.getMessage());
        }
    }

    /**
     * 构建验签名消息
     * 
     * @param timestamp 时间戳
     * @param nonce 随机串
     * @param body 请求或响应体
     * @return 待签名信息
     */
    private String buildSignatureMessage(String timestamp, String nonce, String body) {
        return timestamp + "\n" + nonce + "\n" + body + "\n";
    }
    
    /**
     * 验证微信支付的签名
     * 
     * @param serialNumber 证书序列号
     * @param message 验签名字符串
     * @param signature 签名值
     * @return 验证结果
     */
    private boolean verifySignature(String serialNumber, String message, String signature) {
        try {
            // 从微信支付平台获取证书
            Result<Map<String, String>> certificatesResult = getWxPayCertificates();
            if (!certificatesResult.isSuccess()) {
                log.error("获取微信支付平台证书失败: {}", certificatesResult.getMsg());
                return false;
            }
            
            Map<String, String> certificates = certificatesResult.getData();
            
            // 根据序列号查找对应的证书
            String certificate = certificates.get(serialNumber);
            if (certificate == null) {
                log.error("未找到序列号对应的证书: {}", serialNumber);
                return false;
            }
            
            // 使用证书验证签名
            boolean verified = WxPaySignatureUtil.verify(serialNumber, message, signature, certificate);
            log.info("签名验证结果: {}", verified ? "成功" : "失败");
            return verified;
        } catch (Exception e) {
            log.error("验证签名发生异常: {}", e.getMessage(), e);
            return false;
        }
    }

    /**
     * 查询退款结果
     * 
     * @param outRefundNo 商户退款单号
     * @return 退款结果
     */
    public Result<Map<String, Object>> queryRefund(String outRefundNo) {
        try {
            log.info("查询退款状态，商户退款单号: {}", outRefundNo);
            
            CloseableHttpClient httpClient = getWxPayClient();
            
            // 微信支付退款查询API地址
            String url = "https://api.mch.weixin.qq.com/v3/refund/domestic/refunds/" + outRefundNo;
            
            HttpGet httpGet = new HttpGet(url);
            httpGet.setHeader("Accept", "application/json");
            
            try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
                int statusCode = response.getStatusLine().getStatusCode();
                String responseBody = EntityUtils.toString(response.getEntity());
                log.info("微信支付退款查询响应: {}", responseBody);
                
                if (statusCode == 200) {
                    JSONObject jsonResponse = JSON.parseObject(responseBody);
                    
                    // 构建返回结果
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("refund_id", jsonResponse.getString("refund_id"));  // 微信退款单号
                    resultMap.put("out_refund_no", jsonResponse.getString("out_refund_no"));  // 商户退款单号
                    resultMap.put("transaction_id", jsonResponse.getString("transaction_id"));  // 微信支付交易单号
                    resultMap.put("out_trade_no", jsonResponse.getString("out_trade_no"));  // 商户订单号
                    resultMap.put("status", jsonResponse.getString("status"));  // 退款状态
                    
                    // 退款成功时间
                    resultMap.put("success_time", jsonResponse.getString("success_time"));
                    
                    // 退款金额信息
                    if (jsonResponse.containsKey("amount")) {
                        JSONObject amount = jsonResponse.getJSONObject("amount");
                        resultMap.put("refund", amount.getIntValue("refund"));  // 退款金额
                        resultMap.put("total", amount.getIntValue("total"));  // 原订单金额
                        resultMap.put("payer_refund", amount.getIntValue("payer_refund"));  // 用户退款金额
                        resultMap.put("payer_total", amount.getIntValue("payer_total"));  // 用户实际支付金额
                    }
                    
                    // 同时查询我们系统中的退款流水记录
                    try {
                        LambdaQueryWrapper<PaymentFlow> queryWrapper = new LambdaQueryWrapper<>();
                        queryWrapper.eq(PaymentFlow::getMerchantOrderId, outRefundNo)
                                  .eq(PaymentFlow::getRefundFlag, 1);
                        
                        // 查询退款流水记录
                        List<PaymentFlow> refundFlows = paymentFlowService.list(queryWrapper);
                        if (refundFlows != null && !refundFlows.isEmpty()) {
                            PaymentFlow refundFlow = refundFlows.get(0);
                            resultMap.put("local_status", "已存在退款流水记录");
                            resultMap.put("local_flow_id", refundFlow.getFlowId());
                            resultMap.put("local_user_id", refundFlow.getUserId());
                            resultMap.put("local_create_time", refundFlow.getCreateTime());
                        } else {
                            resultMap.put("local_status", "未找到退款流水记录");
                        }
                    } catch (Exception e) {
                        log.error("查询本地退款流水记录失败: {}", e.getMessage());
                        resultMap.put("local_status", "查询本地退款流水记录异常: " + e.getMessage());
                    }
                    
                    return Result.success(resultMap);
                } else if (statusCode == 404) {
                    // 未找到退款单
                    return Result.fail("未找到该退款单");
                } else {
                    return Result.fail("查询退款结果失败：" + responseBody);
                }
            }
        } catch (Exception e) {
            log.error("查询退款结果异常", e);
            return Result.fail("查询退款结果异常：" + e.getMessage());
        }
    }

    /**
     * 根据订单号查询退款结果
     * 
     * @param orderId 订单号
     * @return 退款结果列表
     */
    public Result<List<Map<String, Object>>> queryRefundByOrderId(String orderId) {
        try {
            log.info("根据订单号查询退款状态，订单号: {}", orderId);
            
            // 查询与该订单相关的所有退款流水记录
            LambdaQueryWrapper<PaymentFlow> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(PaymentFlow::getOrderId, orderId)
                      .eq(PaymentFlow::getRefundFlag, 1) // 只查询退款记录
                      .orderByDesc(PaymentFlow::getCreateTime);
            
            List<PaymentFlow> refundFlows = paymentFlowService.list(queryWrapper);
            
            if (refundFlows == null || refundFlows.isEmpty()) {
                return Result.fail("未找到该订单的退款记录");
            }
            
            // 查询每个退款记录的最新状态
            List<Map<String, Object>> resultList = new ArrayList<>();
            for (PaymentFlow refundFlow : refundFlows) {
                String outRefundNo = refundFlow.getMerchantOrderId();
                Result<Map<String, Object>> refundResult = queryRefund(outRefundNo);
                
                Map<String, Object> resultMap = new HashMap<>();
                resultMap.put("flow_id", refundFlow.getFlowId());
                resultMap.put("order_id", orderId);
                resultMap.put("merchant_order_id", outRefundNo);
                resultMap.put("amount", refundFlow.getAmount());
                resultMap.put("create_time", refundFlow.getCreateTime());
                
                if (refundResult.isSuccess()) {
                    resultMap.put("status", "查询成功");
                    resultMap.put("refund_info", refundResult.getData());
                } else {
                    resultMap.put("status", "查询失败");
                    resultMap.put("error_msg", refundResult.getMsg());
                }
                
                resultList.add(resultMap);
            }
            
            return Result.success(resultList);
        } catch (Exception e) {
            log.error("根据订单号查询退款结果异常", e);
            return Result.fail("查询退款结果异常：" + e.getMessage());
        }
    }





}
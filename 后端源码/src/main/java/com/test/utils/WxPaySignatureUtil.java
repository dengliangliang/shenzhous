package com.test.utils;

import com.wechat.pay.contrib.apache.httpclient.auth.Signer;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Base64;

public class WxPaySignatureUtil {
    private static final Logger log = LoggerFactory.getLogger(WxPaySignatureUtil.class);



    /**
     * 使用商户私钥对数据进行签名
     * @param message 签名原文
     * @param privateKeyPath 私钥文件路径
     * @return Base64编码的签名值
     */
    public static String sign(String message, String privateKeyPath) {
        try {
            // 加载商户私钥
            PrivateKey privateKey = PemUtil.loadPrivateKey(new FileInputStream(privateKeyPath));
            return sign(message, privateKey);
        } catch (Exception e) {
            log.error("签名失败", e);
            throw new RuntimeException("签名失败", e);
        }
    }

    /**
     * 使用商户私钥对数据进行签名
     * @param message 签名原文
     * @param privateKey 私钥对象
     * @return Base64编码的签名值
     */
    public static String sign(String message, PrivateKey privateKey) {
        try {
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initSign(privateKey);
            signature.update(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(signature.sign());
        } catch (Exception e) {
            log.error("签名失败", e);
            throw new RuntimeException("签名失败", e);
        }
    }

    /**
     * 构建微信支付API v3签名串
     * @param method HTTP请求方法
     * @param url 请求路径 (不包含域名)
     * @param timestamp 请求时间戳
     * @param nonceStr 随机字符串
     * @param body 请求报文主体(如有)
     * @return 签名串
     */
    public static String buildSignatureMessage(String method, String url, long timestamp, String nonceStr, String body) {
        return method + "\n"
                + url + "\n"
                + timestamp + "\n"
                + nonceStr + "\n"
                + (body == null ? "" : body) + "\n";
    }

    /**
     * 构建小程序支付签名串
     * @param appId 小程序ID
     * @param timestamp 时间戳
     * @param nonceStr 随机字符串
     * @param prepayId 预支付ID
     * @return 签名串
     */
    public static String buildPaySignatureMessage(String appId, String timestamp, String nonceStr, String prepayId) {
        return appId + "\n"
                + timestamp + "\n"
                + nonceStr + "\n"
                + "prepay_id=" + prepayId + "\n";
    }

    /**
     * 使用微信支付平台证书验证签名
     *
     * @param serialNumber 证书序列号
     * @param message 待验证的消息
     * @param signature 待验证的签名
     * @param certificate 微信支付平台证书内容
     * @return 验证结果
     */
    public static boolean verify(String serialNumber, String message, String signature, String certificate) {
        try {
            // 加载证书
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            X509Certificate cert = (X509Certificate) cf.generateCertificate(
                    new ByteArrayInputStream(certificate.getBytes(StandardCharsets.UTF_8)));
            
            // 获取公钥
            PublicKey publicKey = cert.getPublicKey();
            
            // 验证签名
            Signature sign = Signature.getInstance("SHA256withRSA");
            sign.initVerify(publicKey);
            sign.update(message.getBytes(StandardCharsets.UTF_8));
            
            return sign.verify(Base64.getDecoder().decode(signature));
        } catch (Exception e) {
            log.error("验证签名异常，证书序列号: {}, 错误: {}", serialNumber, e.getMessage());
            return false;
        }
    }
}
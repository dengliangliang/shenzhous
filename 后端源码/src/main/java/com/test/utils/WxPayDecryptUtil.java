package com.test.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * 微信支付API V3解密工具
 */
public class WxPayDecryptUtil {
    private static final Logger log = LoggerFactory.getLogger(WxPayDecryptUtil.class);

    /**
     * 使用APIv3密钥解密数据
     * @param ciphertext Base64编码的密文
     * @param nonce 加密使用的随机串
     * @param associatedData 附加数据
     * @param apiV3Key APIv3密钥
     * @return 解密后的明文
     */
    public static String decryptToString(String ciphertext, String nonce, String associatedData, String apiV3Key) {
        try {
            log.info("开始解密微信支付通知数据: nonce={}, associatedData={}, apiV3Key长度={}", 
                    nonce, associatedData, apiV3Key != null ? apiV3Key.length() : 0);
            
            if (apiV3Key == null) {
                throw new RuntimeException("APIv3Key为空");
            }
            
            // 移除可能的空白字符
            apiV3Key = apiV3Key.trim();
            
            // 确保密钥长度为32字节，过长则截断，过短则补足
            byte[] keyBytes;
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
            
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

            // 使用处理后的密钥字节
            SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
            GCMParameterSpec spec = new GCMParameterSpec(128, nonce.getBytes(StandardCharsets.UTF_8));

            // 初始化解密模式
            cipher.init(Cipher.DECRYPT_MODE, key, spec);

            // 如果有附加数据，设置附加数据
            if (associatedData != null) {
                cipher.updateAAD(associatedData.getBytes(StandardCharsets.UTF_8));
            }

            // 解密
            byte[] bytes = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
            String result = new String(bytes, StandardCharsets.UTF_8);
            
            log.info("解密微信支付通知数据成功");
            return result;
        } catch (Exception e) {
            log.error("解密微信支付通知数据失败: {}", e.getMessage(), e);
            
            // 打印关键信息以便调试
            try {
                log.error("解密失败详情 - nonce长度: {}, associatedData长度: {}, apiV3Key前6位: {}", 
                        nonce != null ? nonce.length() : 0,
                        associatedData != null ? associatedData.length() : 0,
                        apiV3Key != null && apiV3Key.length() > 6 ? apiV3Key.substring(0, Math.min(6, apiV3Key.length())) + "..." : "null或过短");
            } catch (Exception ex) {
                log.error("打印解密失败详情时出错", ex);
            }
            
            throw new RuntimeException("解密数据失败: " + e.getMessage(), e);
        }
    }
}
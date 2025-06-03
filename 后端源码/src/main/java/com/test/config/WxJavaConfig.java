package com.test.config;

import com.github.binarywang.wxpay.config.WxPayConfig;
import com.github.binarywang.wxpay.service.WxPayService;
import com.github.binarywang.wxpay.service.impl.WxPayServiceImpl;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.file.Files;

/**
 * WxJava配置类 - 目前临时禁用
 */
//@Configuration  // 暂时注释掉，避免与现有实现冲突
@Profile("wxjava") // 仅在激活wxjava配置文件时启用
public class WxJavaConfig {
    private static final Logger log = LoggerFactory.getLogger(WxJavaConfig.class);
    
    @Autowired
    private com.test.config.WxPayConfig wxPayProperties;
    
    @Autowired
    private ResourceLoader resourceLoader;
    
    @Bean(name = "wxJavaPayService") // 重命名Bean避免冲突
    public WxPayService wxPayService() {
        WxPayConfig payConfig = new WxPayConfig();
        payConfig.setAppId(wxPayProperties.getAppId());
        payConfig.setMchId(wxPayProperties.getMchId());
        payConfig.setMchKey(wxPayProperties.getApiV3Key());
        payConfig.setApiV3Key(wxPayProperties.getApiV3Key());
        payConfig.setNotifyUrl(wxPayProperties.getNotifyUrl());
        
        try {
            // 尝试直接设置文件路径
            try {
                Resource privateKeyResource = resourceLoader.getResource(wxPayProperties.getPrivateKeyPath());
                Resource certResource = resourceLoader.getResource(wxPayProperties.getMerchantCertPath());
                
                if (privateKeyResource.isFile() && certResource.isFile()) {
                    log.info("使用文件路径方式加载微信支付配置");
                    payConfig.setPrivateKeyPath(privateKeyResource.getFile().getAbsolutePath());
                    payConfig.setKeyPath(certResource.getFile().getAbsolutePath());
                } else {
                    throw new Exception("资源不是文件，尝试使用流方式加载");
                }
            } catch (Exception e) {
                log.info("尝试使用流方式加载微信支付配置: {}", e.getMessage());
                
                // 保存私钥为临时文件
                File tempPrivateKeyFile = File.createTempFile("wx_private_key_", ".pem");
                tempPrivateKeyFile.deleteOnExit();
                try (InputStream in = resourceLoader.getResource(wxPayProperties.getPrivateKeyPath()).getInputStream();
                     FileOutputStream out = new FileOutputStream(tempPrivateKeyFile)) {
                    IOUtils.copy(in, out);
                }
                
                // 保存证书为临时文件
                File tempCertFile = File.createTempFile("wx_cert_", ".pem");
                tempCertFile.deleteOnExit();
                try (InputStream in = resourceLoader.getResource(wxPayProperties.getMerchantCertPath()).getInputStream();
                     FileOutputStream out = new FileOutputStream(tempCertFile)) {
                    IOUtils.copy(in, out);
                }
                
                log.info("已将私钥和证书保存为临时文件");
                payConfig.setPrivateKeyPath(tempPrivateKeyFile.getAbsolutePath());
                payConfig.setKeyPath(tempCertFile.getAbsolutePath());
            }
            
            // 创建服务
            WxPayService wxPayService = new WxPayServiceImpl();
            wxPayService.setConfig(payConfig);
            
            log.info("微信支付服务配置完成: appId={}, mchId={}", wxPayProperties.getAppId(), wxPayProperties.getMchId());
            return wxPayService;
        } catch (Exception e) {
            log.error("初始化微信支付服务失败", e);
            throw new RuntimeException("初始化微信支付服务失败: " + e.getMessage(), e);
        }
    }
} 
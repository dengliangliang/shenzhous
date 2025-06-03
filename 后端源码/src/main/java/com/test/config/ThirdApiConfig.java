package com.test.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@ConfigurationProperties(prefix = "third-api")
public class ThirdApiConfig {
    private String baseUrl = "https://www.yida178.cn/prod-api/thirdApi/execute";
    private String username = "junkai";
    private String privateKey = "6yww2buhrf57xid9";
    // 可以从配置文件中读取的其他配置项
} 
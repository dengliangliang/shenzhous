package com.test.service;

import cn.hutool.crypto.SecureUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.test.config.ThirdApiConfig;
import com.test.model.Request.ExpressOrderRequest;
import com.test.model.Request.ThirdApiRequest;
import com.test.model.Response.ExpressOrderResponse;
import com.test.model.Response.ThirdApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
@Slf4j
public class ThirdApiService {

    @Autowired
    private ThirdApiConfig thirdApiConfig;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * 生成sign
     * @param timestamp
     * @return
     */
    private String generateSign(long timestamp) {
        Map<String, Object> map = new TreeMap<>();
        map.put("privateKey", thirdApiConfig.getPrivateKey());
        map.put("timestamp", String.valueOf(timestamp));
        map.put("username", thirdApiConfig.getUsername());

        return SecureUtil.md5(JSON.toJSONString(map)).toUpperCase();
    }

    public Object executeApi(String apiMethod, JSONObject businessParams) {
        // 构建请求JSON
        JSONObject requestBody = new JSONObject();
        long timestamp = System.currentTimeMillis();

        requestBody.put("username", thirdApiConfig.getUsername());
        requestBody.put("timestamp", timestamp);
        requestBody.put("sign", generateSign(timestamp));
        requestBody.put("apiMethod", apiMethod);
        requestBody.put("businessParams", businessParams);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));

        String jsonBody = requestBody.toJSONString();
        log.info("发送请求参数: {}", jsonBody);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
        ResponseEntity<JSONObject> response = restTemplate.exchange(
                thirdApiConfig.getBaseUrl(),
                HttpMethod.POST,
                entity,
                JSONObject.class
        );
        return response.getBody();
    }
} 
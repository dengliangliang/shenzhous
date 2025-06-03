package com.test.model.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ThirdApiRequest {
    private String username;
    private Long timestamp;
    private String sign;
    private String apiMethod;
    private Map<String, Object> businessParams;
} 
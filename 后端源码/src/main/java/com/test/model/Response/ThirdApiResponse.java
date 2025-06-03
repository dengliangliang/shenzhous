package com.test.model.Response;

import lombok.Data;

@Data
public class ThirdApiResponse<T> {
    /**
     * 响应码
     */
    private String code;
    
    /**
     * 响应信息
     */
    private String msg;
    
    /**
     * 响应数据
     */
    private T data;
    
    /**
     * 请求是否成功
     */
    private Boolean success;
} 
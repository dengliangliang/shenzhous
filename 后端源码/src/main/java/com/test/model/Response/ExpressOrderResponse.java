package com.test.model.Response;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ExpressOrderResponse {
    /**
     * 订单号
     */
    private String orderNo;
    
    /**
     * 运单号
     */
    private String waybillNo;
    
    /**
     * 快递费用
     */
    private BigDecimal expressAmount;
    
    /**
     * 保价费用
     */
    private BigDecimal insuranceAmount;
    
    /**
     * 总费用
     */
    private BigDecimal totalAmount;
} 
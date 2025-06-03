package com.test.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("payment_flow")
public class PaymentFlow {

    @TableId(type = IdType.INPUT)
    private String flowId;  // 支付流水id

    @TableField
    private String userId;  // 用户id

    @TableField(exist = false)
    private String userName;

    @TableField
    private String orderId;  // 订单id

    @TableField(exist = false)
    private Order order;

    @TableField
    private String merchantOrderId;  // 商户订单号

    @TableField
    private String description;  // 交易描述

    @TableField
    private String openid;  // 用户openId

    @TableField
    private String transactionId;  // 微信支付交易单号

    @TableField
    private BigDecimal amount;  // 实际支付金额（精确到分）

    @TableField
    private Integer refundFlag;  // 退款标记（0为未退款，1为已退款，2为部分退款）


    @TableField
    private String errorDescription;  // 错误描述

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
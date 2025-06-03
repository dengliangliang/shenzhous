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
@TableName("commission_flow")
public class CommissionFlow {

    @TableId(type = IdType.INPUT)
    private String flowId;  // 发票抬头id

    @TableField
    private String userId;  // 用户id

    @TableField(exist = false)
    private String userName;

    @TableField
    private String orderId;  // 订单id

    @TableField(exist = false)
    private Order order;

    @TableField
    private BigDecimal amount;  // 变动金额（正为获得，负为抵扣）

    @TableField
    private BigDecimal balance;  // 账户余额

    @TableField
    private Integer flowType;  // 类型（0为邀请返佣，1为快递费抵扣，2为快递取消返现）

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
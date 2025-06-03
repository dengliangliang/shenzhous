package com.test.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("monthly_statement")
public class MonthlyStatement {

    @TableId(value = "monthly_statement_id", type = IdType.INPUT)
    private String monthlyStatementId;  // 月结账单id

    @TableField("user_id")
    private String userId;  // 用户id

    @TableField(exist = false)
    private String userName;

    @TableField("monthly_settlement_eligibility_id")
    private String monthlySettlementEligibilityId;  // 月结资格id

    @TableField("order_id")
    private String orderId;  // 订单id

    @TableField(exist = false)
    private Order order;

    @TableField("type")
    private Integer type;  // 类型（0为支付，1为退款）

    @TableField("is_user_pays")
    private Integer isUserPays;  // 用户是否支付（0为否，1为是）

    @TableField("amount")
    private BigDecimal amount;  // 金额

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private String createTime;  // 创建时间

    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private String updateTime;  // 修改时间
}
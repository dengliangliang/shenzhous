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
@TableName("monthly_settlement_eligibility")
public class MonthlySettlementEligibility {

    @TableId(value = "monthly_settlement_eligibility_id", type = IdType.INPUT)
    private String monthlySettlementEligibilityId;  // 月结资格id

    @TableField("user_id")
    private String userId;  // 主用户id

    @TableField(exist = false)
    private String userName;  // 主用户名称

    @TableField("settlement_cycle")
    private Integer settlementCycle;  // 结算周期（0为月结，1为季结，2为半年结）

    @TableField("settlement_date")
    private Integer settlementDate;  // 结算日期

    @TableField("cycle_number")
    private Integer cycleNumber;  // 周期数

    @TableField("minimum_amount")
    private BigDecimal minimumAmount;  // 每月最低寄件量（元）

    @TableField("password")
    private String password;  // 密码

    @TableField("status")
    private Integer status; //状态（0为正常，1为已失效)

    @TableField(" trade_number")
    private Integer  tradeNumber; //已完成交易次数

    @TableField("start_time")
    private String startTime;  // 月结起始日期（数据库为 VARCHAR）


    @TableField("invoice_requirement")
    private Integer invoiceRequirement;  // 发票要求（0为增值税普通发票，1为增值税专用发票，2为其他）

    @TableField(value = "create_time")
    private String createTime;  // 创建时间

    @TableField(value = "update_time")
    private String updateTime;  // 修改时间
}
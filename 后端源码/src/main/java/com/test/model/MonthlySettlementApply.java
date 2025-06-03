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
@TableName("monthly_settlement_apply")
public class MonthlySettlementApply {

    @TableId(value = "apply_id", type = IdType.INPUT)
    private String applyId;  // 申请id

    @TableField("user_id")
    private String userId;  // 用户id

    @TableField(exist = false)
    private String userName;

    @TableField("account_type")
    private Integer accountType;  // 账户类型（0为企业账户，1为个人账户）

    @TableField("name")
    private String name;  // 联系人名称

    @TableField("phone")
    private String phone;  // 联系电话

    @TableField("address")
    private String address;  // 联系地址

    @TableField("email")
    private String email;  // 电子邮箱


    @TableField("minimum_amount")
    private BigDecimal minimumAmount;  // 每月最低寄件量（元）

    @TableField("remark")
    private String remark;  // 特殊要求

    @TableField("settlement_cycle")
    private Integer settlementCycle;  // 结算周期（0为月结，1为季结，2为半年结）

    @TableField("invoice_requirement")
    private Integer invoiceRequirement;  // 发票要求（0为增值税普通发票，1为增值税专用发票，2为其他）

    @TableField("id_card_portrait_photo")
    private String idCardPortraitPhoto;  // 身份证人像面照片

    @TableField("id_card_emblem_photo")
    private String idCardEmblemPhoto;  // 身份证国徽面照片

    @TableField("business_license")
    private String businessLicense;  // 企业营业执照

    @TableField("apply_status")
    private Integer applyStatus;  // 审核状态（0为审核中，1为审核通过，2为审核驳回）

    @TableField("reject_reason")
    private String rejectReason;  // 驳回理由

    @TableField("pereviewer_id")
    private String pereviewerId;  // 审核人id

    @TableField("pereviewer_time")
    private String pereviewerTime;  // 审核时间（数据库为 VARCHAR）

    @TableField(value = "create_time")
    private String createTime;  // 创建时间

    @TableField(value = "update_time")
    private String updateTime;  // 修改时间
}
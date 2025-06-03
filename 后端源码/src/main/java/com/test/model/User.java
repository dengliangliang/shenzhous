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
@TableName("user")
public class User {

    @TableId(value = "user_id", type = IdType.INPUT)
    private String userId;  // 用户id

    @TableField("user_name")
    private String userName;  // 姓名

    @TableField("password")
    private String password;  // 密码

    @TableField("phone")
    private String phone;  // 电话号码

    @TableField("identification")
    private String identification;  // 身份证号码

    @TableField("money")
    private BigDecimal money;  // 佣金金额

    @TableField("identity")
    private Integer identity;  // 身份（0为管理员，1为普通用户）

    @TableField("is_real")
    private Integer isReal;  // 是否实名（0为否，1为审核中，2为已实名）

    @TableField("open_id")  // 修正字段名映射（原数据库字段是 open_id）
    private String openId;  // 用户openId

    @TableField("my_code")
    private String myCode;  // 邀请码

    @TableField("get_money")
    private BigDecimal getMoney;  // 佣金金额


    @TableField("be_invited")
    private String beInvited;  // 被邀请

    @TableField("code")
    private String code;  // 月结资格密码

    @TableField("is_month")
    private Integer isMonth;  // 是否拥有月结资格（0为否，1为是）

    @TableField("monthly_settlement_eligibility_id")
    private String monthlySettlementEligibilityId;  // 月结资格id

    @TableField("is_get_money")
    private Integer isGetMoney;  // 是否可以获取金额

    @TableField("is_enable")
    private Integer isEnable;  // 是否可以获取金额

    @TableField("is_delete")
    private Integer isDelete;  // 是否可用（0为是，1为否）

    @TableField(value = "create_time")
    private String createTime;  // 创建时间（推荐用时间类型）

    @TableField(value = "update_time")
    private String updateTime;  // 修改时间（推荐用时间类型）

}
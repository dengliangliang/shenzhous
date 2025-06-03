package com.test.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("invoice_title")
public class InvoiceTitle {

    @TableId(type = IdType.INPUT)
    private String titleId;  // 发票抬头id

    @TableField
    private String userId;  // 用户id

    @TableField
    private String companiesName;  // 当type为0时为企业名称，为1时为抬头全称

    @TableField
    private String taxNumber;  // 企业税号

    @TableField
    private String companyAddress;  // 企业地址

    @TableField
    private String citycompanyTel;  // 企业电话

    @TableField
    private String bankAccount;  // 银行账户

    @TableField
    private String bankName;  // 开户行名称

    @TableField
    private Integer type;  // 类型（0为企业单位，1为个人/非企业单位）

    @TableField
    private Integer isDefault;  // 是否为默认抬头（0为否，1为是）

    @TableField
    private Integer isDelete;  // 是否可用（0为是，1为否）

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
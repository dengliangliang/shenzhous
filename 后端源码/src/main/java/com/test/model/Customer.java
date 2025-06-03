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
@TableName("customer")
public class Customer {

    @TableId(type = IdType.INPUT)
    private Integer customerId;  // 客服id

    @TableField
    private String wechatNumber;  // 微信号

    @TableField
    private String wechatImage;  // 微信二维码

    @TableField
    private String officialAccountImage;  // 微信公众号二维码

    @TableField
    private String serviceHours;  // 服务时间

    @TableField
    private String customerServiceHotline;  // 客服热线、

    @TableField
    private String email; //邮箱

    @TableField
    private String companyName; //公司名称
    @TableField
    private String companyAddress; //公司地址
    @TableField
    private String companyProfile; //公司简介
    @TableField
    private String invoicingContact; //开票联系人


    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
}

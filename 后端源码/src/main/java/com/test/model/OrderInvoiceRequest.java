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
@TableName("order_invoice_request")
public class OrderInvoiceRequest {

    @TableId(type = IdType.INPUT)
    private String orderInvoiceRequestId;  // 订单发票申请id

    @TableField
    private String userId;

    @TableField(exist = false)
    private String userName;

    @TableField
    private String orderId;  // 订单id

    @TableField(exist = false)
    private Order order;

    @TableField
    private String email;  // 电子邮箱

    @TableField
    private Integer invoiceType; //发票类型


    @TableField
    private String invoicePhoto;

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
    private Integer status;  // 状态（0为开票中，1为已开票，2为申请驳回）

    @TableField
    private String overrule;

    @TableField
    private String remark;  // 用户备注信息

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
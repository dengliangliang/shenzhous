package com.test.model.Request;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class ExpressOrderRequest {
    /**
     * 快递公司
     */
    private String deliveryType;
    
    /**
     * 产品类型
     */
    private String deliveryBusiness;
    
    /**
     * 寄件通道类型（默认kd）
     */
    private String customerType;
    
    /**
     * 商家订单号(字母、数字，字段长度1-30,请保证同一对接账户下唯一)
     */
    private String thirdNo;
    
    /**
     * 发件省
     */
    private String senderProvince;
    
    /**
     * 发件市
     */
    private String senderCity;
    
    /**
     * 发件区/县
     */
    private String senderDistrict;
    
    /**
     * 发件详细地址（不携带省市区）
     */
    private String senderAddress;
    
    /**
     * 发件人姓名
     */
    private String senderName;
    
    /**
     * 发件人电话
     */
    private String senderTel;
    
    /**
     * 发件人手机
     */
    private String senderMobile;
    
    /**
     * 得物地址id
     * 得物专线使用，customerType=poizon时必传，通过该id自动获取收件人信息
     */
    private Long poizonAddressId;
    
    /**
     * 收件省
     */
    private String receiveProvince;
    
    /**
     * 收件市
     */
    private String receiveCity;
    
    /**
     * 收件区
     */
    private String receiveDistrict;
    
    /**
     * 收件详细地址（不携带省市区）
     */
    private String receiveAddress;
    
    /**
     * 收件人姓名
     */
    private String receiveName;
    
    /**
     * 收件人电话
     */
    private String receiveTel;
    
    /**
     * 收件人手机
     */
    private String receiveMobile;
    
    /**
     * 托寄物名称
     */
    private String goods;
    
    /**
     * 包裹数
     */
    private Integer packageCount;
    
    /**
     * 重量(单位：kg，保留小数点后两位)
     */
    private BigDecimal weight;
    
    /**
     * 长/CM
     */
    private BigDecimal vloumLong;
    
    /**
     * 宽/CM
     */
    private BigDecimal vloumWidth;
    
    /**
     * 高/CM
     */
    private BigDecimal vloumHeight;
    
    /**
     * 保价金额 上限30w元
     */
    private BigDecimal guaranteeValueAmount;
    
    /**
     * 预约取件开始时间
     */
    private Date pickUpStartTime;
    
    /**
     * 预约取件结束时间
     */
    private Date pickUpEndTime;
    
    /**
     * 备注
     */
    private String remark;
    
    /**
     * 是否线上付（默认为Y）
     * Y（线上）
     * N（线下）
     * ALL（线上+线下）
     */
    private String onlinePay = "Y";
    
    /**
     * 支付方式
     * 10 -线下寄付
     * 20 -线下到付 
     * 30-线上支付
     */
    private Integer payMethod;
} 
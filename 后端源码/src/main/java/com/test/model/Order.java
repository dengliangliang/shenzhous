package com.test.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("`order`")  // 需要转义order关键字
public class Order {

    @TableId(value = "order_id", type = IdType.INPUT)
    private String orderId;  // 订单id

    @TableField("wechat_id")
    private String wechatId;  // 微信支付id

    @TableField("user_id")
    private String userId;  // 用户id

    @TableField("sender_name")
    private String senderName;  // 寄件人姓名

    @TableField("sender_phone")
    private String senderPhone;  // 寄件人电话

    // 寄件地址相关字段
    @TableField("sender_province")
    private String senderProvince;
    @TableField("sender_city")
    private String senderCity;
    @TableField("sender_district")
    private String senderDistrict;
    @TableField("sender_detail_address")
    private String senderDetailAddress;

    // 收件人信息
    @TableField("receiver_name")
    private String receiverName;
    @TableField("receiver_phone")
    private String receiverPhone;

    // 收件地址相关字段
    @TableField("receiver_province")
    private String receiverProvince;
    @TableField("receiver_city")
    private String receiverCity;
    @TableField("receiver_district")
    private String receiverDistrict;
    @TableField("receiver_detail_address")
    private String receiverDetailAddress;

    // 快递信息
    @TableField("express_code")
    private String expressCode;  // 快递公司编码
    @TableField("type_id")
    private String typeId;  // 快递类型id

    // 重量体积相关
    @TableField("goods")
    private String goods;
    @TableField("estimated_item_weight")
    private BigDecimal estimatedItemWeight;  // 预估重量
    @TableField("actual_weight")
    private BigDecimal actualWeight;  // 实际重量
    @TableField("`long`")  // 转义保留字
    private BigDecimal length;  // 长
    @TableField("width")
    private BigDecimal width;
    @TableField("height")
    private BigDecimal height;

    @TableField("deliveryBusiness")
    private String deliveryBusiness;

    // 时间相关字段（保持与用户实体类一致使用String）
    @TableField("pick_up_start_time")
    private String pickUpStartTime;
    @TableField("pick_up_end_time")
    private String pickUpEndTime;
    @TableField("shipping_time")
    private String shippingTime;
    @TableField("receiving_time")
    private String receivingTime;



    // 费用相关
    @TableField("guaran_tee_value_amount")
    private Double guaranteeValueAmount;  // 保价金额
    @TableField("insurance_fee")
    private BigDecimal insuranceFee;  // 保价费
    @TableField("payment_method")
    private Integer paymentMethod;  // 支付方式
    @TableField("commission_deduction_amount")
    private BigDecimal commissionDeductionAmount;
    @TableField("order_total_price")
    private BigDecimal orderTotalPrice;
    @TableField("amount_after_commission_deduction")
    private BigDecimal amountAfterCommissionDeduction;
    @TableField("order_price_difference")
    private BigDecimal orderPriceDifference;

    // 状态字段
    @TableField("shipping_status")
    private Integer shippingStatus;  // 运送状态
    @TableField("is_price_difference_paid")
    private Integer isPriceDifferencePaid;  // 是否补差价
    @TableField("order_status")
    private Integer orderStatus;  // 订单状态

    // 添加取件时间字段
    @TableField("pick_up_time")
    private String pickUpTime;  // 取件时间

    // 系统字段
    @TableField("is_delete")
    private Integer isDelete = 0;  // 是否删除
    @TableField("remark")
    private String remark;  // 备注

    // 时间字段（保持与用户实体类一致使用String）
    @TableField("create_time")
    private String createTime;  // 创建时间
    @TableField("update_time")
    private String updateTime;  // 更新时间

    @TableField(exist = false)
    private Long remainderTime; //订单剩余时间

    // 运单相关
    @TableField("order_no")
    private String orderNo;  // 易达订单号
    @TableField("delivery_id")
    private String deliveryId;  // 运单号
}
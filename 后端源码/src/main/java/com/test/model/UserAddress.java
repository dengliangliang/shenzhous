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
@TableName("user_address")
public class UserAddress {

    @TableId(type = IdType.INPUT)
    private String addressId;  // 地址id

    @TableField
    private String userId;  // 用户id

    @TableField
    private String contactName;  // 联系人姓名

    @TableField
    private String contactPhone;  // 联系人电话

    @TableField
    private String province;  // 省

    @TableField
    private String city;  // 市

    @TableField
    private String district;  // 区

    @TableField
    private String detailAddress;  // 详细地址

    @TableField
    private Integer type;  // 类型（0为寄件人地址，1为收货人地址）

    @TableField
    private Integer isDefault;  // 是否为默认地址（0为否，1为是）

    @TableField
    private Integer isDelete;  // 是否可用（0为是，1为否）

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
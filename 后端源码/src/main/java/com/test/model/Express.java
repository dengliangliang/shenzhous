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
@TableName("express")
public class Express {

    @TableId(type = IdType.INPUT)
    private String expressId;  // 快递id

    @TableField
    private String expressName;  // 快递名称

    @TableField
    private String deliveryType;  // 快递公司

    @TableField
    private BigDecimal profit;  // 利润

    @TableField
    private Integer isClose;  // 是否关闭（0为关闭，1为开启）

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
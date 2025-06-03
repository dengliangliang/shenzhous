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
@TableName("agreement")
public class Agreement {

    @TableId(type = IdType.INPUT)
    private String agreementId;  // 协议id

    @TableField
    private String context;  // 协议内容

    @TableField
    private String agreementType;  // 协议类型（0为隐私协议，1为快递协议，2为违禁品说明，3为用户协议）

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
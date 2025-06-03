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
@TableName("express_type")
public class ExpressType {

    @TableId(type = IdType.INPUT)
    private String typeId;  // 类型id

    @TableField
    private String typeName;  // 类型名称

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
} 
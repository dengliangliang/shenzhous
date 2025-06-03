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
@TableName("feedback")
public class Feedback {

    @TableId(type = IdType.AUTO)
    private String feedbackId;  // 反馈ID

    @TableField
    private String type;  // 反馈类型

    @TableField
    private String content;  // 反馈内容

    @TableField
    private String contact;  // 联系方式

    @TableField
    private String createTime;  // 创建时间
}
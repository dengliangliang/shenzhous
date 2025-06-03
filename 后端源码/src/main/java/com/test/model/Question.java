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
@TableName("question")
public class Question {

    @TableId(type = IdType.INPUT)
    private String questionId;  // 问题id

    @TableField
    private String question;  // 问题

    @TableField
    private String reply;  // 回答

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
}
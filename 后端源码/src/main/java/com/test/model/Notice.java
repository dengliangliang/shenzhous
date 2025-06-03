package com.test.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("notice")
public class Notice {

    @TableId(value = "notice_id", type = IdType.INPUT)
    private String noticeId;  // 公告id

    @TableField("title")
    private String title;  // 公告标题

    @TableField("content")
    private String content;  // 公告内容

    @TableField("type")
    private Integer type;  // 公告类型

    @TableField("is_delete")
    private Integer isDelete;  // 是否可用

    @TableField("create_time")
    private String createTime;  // 创建时间

    @TableField("update_time")
    private String updateTime;  // 修改时间
}
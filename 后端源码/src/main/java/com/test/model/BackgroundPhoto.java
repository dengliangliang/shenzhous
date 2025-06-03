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
@TableName("background_photo")
public class BackgroundPhoto {

    @TableId(type = IdType.INPUT)
    private String backgroundPhotoId;  // 主页背景图片id

    @TableField
    private String backgroundPhotoName;  // 图片名称

    @TableField
    private String backgroundPhotoUrl;  // 图片路径

    @TableField
    private String appId;  // 跳转appId

    @TableField
    private String path;  // 跳转路径

    @TableField
    private String createTime;  // 创建时间

    @TableField
    private String updateTime;  // 修改时间
}
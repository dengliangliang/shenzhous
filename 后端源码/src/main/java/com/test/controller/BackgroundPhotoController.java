package com.test.controller;

import com.test.model.BackgroundPhoto;
import com.test.model.Return.BackgroundPhotoReturn;
import com.test.service.BackgroundPhotoService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/BackgroundPhoto")
public class BackgroundPhotoController {

    @Autowired
    private BackgroundPhotoService backgroundPhotoService;

    /**
     * 获取所有背景图片
     */
    @GetMapping
    public Result<List<BackgroundPhoto>> getAllBackgroundPhotos() {
        return backgroundPhotoService.getAllBackgroundPhotos();
    }

    /**
     * 添加背景图片
     */
    @PostMapping
    public Result<String> addBackgroundPhoto(@RequestBody BackgroundPhoto backgroundPhoto) {
        return backgroundPhotoService.addBackgroundPhoto(backgroundPhoto);
    }

    /**
     * 修改背景图片
     */
    @PutMapping
    public Result<String> updateBackgroundPhoto(@RequestBody BackgroundPhoto backgroundPhoto) {
        return backgroundPhotoService.updateBackgroundPhoto(backgroundPhoto);
    }

    /**
     * 删除背景图片
     */
    @DeleteMapping("")
    public Result<String> deleteBackgroundPhoto(@RequestParam String photoId) {
        return backgroundPhotoService.deleteBackgroundPhoto(photoId);
    }

    /**
     * 分页获取背景图片
     */
    @GetMapping("/page")
    public Result<BackgroundPhotoReturn> pageBackgroundPhoto(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize) {
        return backgroundPhotoService.pageBackgroundPhoto(pageNum, pageSize);
    }
}
package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.BackgroundPhoto;
import com.test.model.Return.BackgroundPhotoReturn;
import com.test.utils.Result;

import java.util.List;

public interface BackgroundPhotoService extends IService<BackgroundPhoto> {

    Result<List<BackgroundPhoto>> getAllBackgroundPhotos();

    Result<String> addBackgroundPhoto(BackgroundPhoto backgroundPhoto);

    Result<String> updateBackgroundPhoto(BackgroundPhoto backgroundPhoto);

    Result<String> deleteBackgroundPhoto(String photoId);

    Result<BackgroundPhotoReturn> pageBackgroundPhoto(int pageNum, int pageSize);
}
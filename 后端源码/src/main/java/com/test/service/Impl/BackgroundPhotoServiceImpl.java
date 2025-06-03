package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.BackgroundPhotoMapper;
import com.test.model.BackgroundPhoto;
import com.test.model.Return.BackgroundPhotoReturn;
import com.test.service.BackgroundPhotoService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class BackgroundPhotoServiceImpl extends ServiceImpl<BackgroundPhotoMapper, BackgroundPhoto> implements BackgroundPhotoService {

    @Autowired
    private BackgroundPhotoMapper backgroundPhotoMapper;


    @Override
    public Result<List<BackgroundPhoto>> getAllBackgroundPhotos() {
        List<BackgroundPhoto> photos = backgroundPhotoMapper.selectList(new QueryWrapper<>());
        return Result.success("查询成功",photos);
    }

    @Override
    public Result<String> addBackgroundPhoto(BackgroundPhoto backgroundPhoto) {
        QueryWrapper<BackgroundPhoto> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("background_photo_name", backgroundPhoto.getBackgroundPhotoName());
        BackgroundPhoto exist = backgroundPhotoMapper.selectOne(queryWrapper);
        if (ObjectUtils.isNotEmpty(exist)) {
            return Result.fail("新增失败，该图片名称已存在");
        }
        backgroundPhoto.setCreateTime(getTime());
        backgroundPhoto.setUpdateTime(getTime());
        backgroundPhoto.setBackgroundPhotoId(getUUID());
        backgroundPhotoMapper.insert(backgroundPhoto);
        return Result.success("新增成功");
    }

    @Override
    public Result<String> updateBackgroundPhoto(BackgroundPhoto backgroundPhoto) {
        BackgroundPhoto exist = backgroundPhotoMapper.selectById(backgroundPhoto.getBackgroundPhotoId());
        if (ObjectUtils.isEmpty(exist)) {
            return Result.fail("修改失败，该图片不存在");
        }
        if (!exist.getBackgroundPhotoName().equals(backgroundPhoto.getBackgroundPhotoName())) {
            QueryWrapper<BackgroundPhoto> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("background_photo_name", backgroundPhoto.getBackgroundPhotoName());
            BackgroundPhoto exist2 = backgroundPhotoMapper.selectOne(queryWrapper);
            if (ObjectUtils.isNotEmpty(exist2)) {
                return Result.fail("修改失败，该图片名称已存在");
            }
        }
        backgroundPhoto.setUpdateTime(getTime());
        backgroundPhotoMapper.updateById(backgroundPhoto);
        return Result.success("修改成功");
    }

    @Override
    public Result<String> deleteBackgroundPhoto(String photoId) {
        BackgroundPhoto exist = backgroundPhotoMapper.selectById(photoId);
        if (ObjectUtils.isEmpty(exist)) {
            return Result.fail("删除失败，该图片不存在");
        }
        this.removeById(exist.getBackgroundPhotoId());
        return Result.success("删除成功");
    }

    @Override
    public Result<BackgroundPhotoReturn> pageBackgroundPhoto(int pageNum, int pageSize) {
        IPage<BackgroundPhoto> page = this.page(new Page<>(pageNum, pageSize), new QueryWrapper<>());
        BackgroundPhotoReturn backgroundPhotoReturn = new BackgroundPhotoReturn();
        backgroundPhotoReturn.setCurrentPage(pageNum);
        backgroundPhotoReturn.setPageSize(pageSize);
        backgroundPhotoReturn.setTotalPages(page.getTotal());
        backgroundPhotoReturn.setDataList(page.getRecords());
        return Result.success("查询成功",backgroundPhotoReturn);
    }
}
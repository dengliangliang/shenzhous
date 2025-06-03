package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.FeedbackMapper;
import com.test.model.Feedback;
import com.test.model.Return.FeedbackReturn;
import com.test.service.FeedbackService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class FeedbackServiceImpl extends ServiceImpl<FeedbackMapper, Feedback> implements FeedbackService {

    @Autowired
    private FeedbackMapper feedbackMapper;


    @Override
    public Result<List<Feedback>> getAllFeedbacks() {
        return Result.success("查询成功",this.list());
    }

    @Override
    public Result<String> addFeedback(Feedback feedback) {
        feedback.setFeedbackId(getUUID());
        feedback.setCreateTime(getTime());
        feedbackMapper.insert(feedback);
        return Result.success("反馈成功");
    }

    @Override
    public Result<String> deleteFeedback(String feedbackId) {
        Feedback feedback = feedbackMapper.selectById(feedbackId);
        if (ObjectUtils.isEmpty(feedback)) {
            return Result.fail("删除失败，该问题反馈已不存在");
        }
        feedbackMapper.deleteById(feedbackId);
        return Result.success("删除成功");
    }

    @Override
    public Result<FeedbackReturn> pageFeedback(int pageNum, int pageSize, String type) {
        QueryWrapper<Feedback> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotBlank(type)) {
            queryWrapper.eq("type", type);
        }
        IPage<Feedback> pages = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        FeedbackReturn feedbackReturn = new FeedbackReturn();
        feedbackReturn.setCurrentPage(pageNum);
        feedbackReturn.setPageSize(pageSize);
        feedbackReturn.setTotalPages(pages.getTotal());
        feedbackReturn.setDataList(pages.getRecords());
        return Result.success("查询成功",feedbackReturn);
    }



}
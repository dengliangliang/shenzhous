package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Feedback;
import com.test.model.Return.FeedbackReturn;
import com.test.utils.Result;

import java.util.List;

public interface FeedbackService extends IService<Feedback> {

    Result<List<Feedback>> getAllFeedbacks();

    Result<String> addFeedback(Feedback feedback);

    Result<String> deleteFeedback(String  feedbackId);

    Result<FeedbackReturn> pageFeedback(int pageNum, int pageSize, String type);


}
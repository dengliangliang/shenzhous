package com.test.controller;

import com.test.model.Feedback;
import com.test.model.Return.FeedbackReturn;
import com.test.service.FeedbackService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    /**
     * 获取所有反馈
     */
    @GetMapping
    public Result<List<Feedback>> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    /**
     * 添加反馈
     */
    @PostMapping
    public Result<String> addFeedback(@RequestBody Feedback feedback) {
        return feedbackService.addFeedback(feedback);
    }

    /**
     * 删除反馈
     */
    @DeleteMapping("")
    public Result<String> deleteFeedback(@RequestParam String feedbackId) {
        return feedbackService.deleteFeedback(feedbackId);
    }

    /**
     * 分页获取反馈
     */
    @GetMapping("/page")
    public Result<FeedbackReturn> pageFeedback(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String type) {
        return feedbackService.pageFeedback(pageNum, pageSize,type);
    }


}
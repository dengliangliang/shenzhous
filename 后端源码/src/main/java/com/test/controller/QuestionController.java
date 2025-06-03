package com.test.controller;

import com.test.model.Question;
import com.test.model.Return.QuestionReturn;
import com.test.service.QuestionService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    /**
     * 获取所有问题列表
     */
    @GetMapping
    public Result<List<Question>> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    /**
     * 添加问题
     */
    @PostMapping
    public Result<String> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    /**
     * 修改问题
     */
    @PutMapping
    public Result<String> updateQuestion(@RequestBody Question question) {
        return questionService.updateQuestion(question);
    }

    /**
     * 删除问题
     */
    @DeleteMapping("")
    public Result<String> deleteQuestion(@RequestParam String questionId) {
        return questionService.deleteQuestion(questionId);
    }

    /**
     * 分页获取问题
     */
    @GetMapping("/page")
    public Result<QuestionReturn> pageQuestion(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize) {
        return questionService.pageQuestion(pageNum, pageSize);
    }

}
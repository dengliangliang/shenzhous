package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Question;
import com.test.model.Return.QuestionReturn;
import com.test.utils.Result;

import java.util.List;

public interface QuestionService extends IService<Question> {

    Result<List<Question>> getAllQuestions();

    Result<String> addQuestion(Question question);

    Result<String> updateQuestion(Question question);

    Result<String> deleteQuestion(String questionId);

    Result<QuestionReturn> pageQuestion(int pageNum, int pageSize);
}
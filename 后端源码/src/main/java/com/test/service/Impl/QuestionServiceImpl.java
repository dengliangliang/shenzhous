package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.QuestionMapper;
import com.test.model.Question;
import com.test.model.Return.QuestionReturn;
import com.test.service.QuestionService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class QuestionServiceImpl extends ServiceImpl<QuestionMapper, Question> implements QuestionService {

    @Autowired
    private QuestionMapper questionMapper;


    @Override
    public Result<List<Question>> getAllQuestions() {
        return Result.success("查询成功",questionMapper.selectList(new QueryWrapper<>()));
    }

    @Override
    public Result<String> addQuestion(Question question) {
        question.setCreateTime(getTime());
        question.setUpdateTime(getTime());
        question.setQuestionId(getUUID());
        questionMapper.insert(question);
        return Result.success("新增成功");
    }

    @Override
    public Result<String> updateQuestion(Question question) {
        Question q = questionMapper.selectById(question.getQuestionId());
        if (ObjectUtils.isEmpty(q)){
            return Result.fail("修改失败，该常见问题不存在");
        }
        question.setUpdateTime(getTime());
        questionMapper.updateById(question);
        return Result.success("修改成功");
    }

    @Override
    public Result<String> deleteQuestion(String questionId) {
        Question q = questionMapper.selectById(questionId);
        if (ObjectUtils.isEmpty(q)){
            return Result.fail("修改失败，该常见问题不存在");
        }
        this.removeById(questionId);
        return Result.success("删除成功");
    }

    @Override
    public Result<QuestionReturn> pageQuestion(int pageNum, int pageSize) {
        IPage<Question> page = this.page(new Page<>(pageNum, pageSize));
        QuestionReturn questionReturn = new QuestionReturn();
        questionReturn.setCurrentPage(pageNum);
        questionReturn.setPageSize(pageSize);
        questionReturn.setTotalPages(page.getTotal());
        questionReturn.setDataList(page.getRecords());
        return Result.success("查询成功",questionReturn);
    }
}
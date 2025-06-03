package com.test.model.Return;

import com.test.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<Question> dataList;
}
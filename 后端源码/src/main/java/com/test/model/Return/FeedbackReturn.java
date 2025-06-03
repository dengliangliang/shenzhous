package com.test.model.Return;

import com.test.model.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<Feedback> dataList;
}
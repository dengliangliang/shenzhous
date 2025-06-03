package com.test.model.Return;

import com.test.model.MonthlyStatement;
import com.test.model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<Order> dataList;
}

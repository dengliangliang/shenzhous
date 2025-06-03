package com.test.model.Return;

import com.test.model.MonthlySettlementEligibility;
import com.test.model.MonthlyStatement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyStatementReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<MonthlyStatement> dataList;
}

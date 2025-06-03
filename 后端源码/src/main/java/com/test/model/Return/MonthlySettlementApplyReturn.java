package com.test.model.Return;

import com.test.model.ExpressType;
import com.test.model.MonthlySettlementApply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySettlementApplyReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<MonthlySettlementApply> dataList;
}


package com.test.model.Return;

import com.test.model.Agreement;
import com.test.model.CommissionFlow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgreementReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<Agreement> dataList;
}

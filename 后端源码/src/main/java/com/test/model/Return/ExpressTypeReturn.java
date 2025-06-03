package com.test.model.Return;

import com.test.model.CommissionFlow;
import com.test.model.ExpressType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpressTypeReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<ExpressType> dataList;
}

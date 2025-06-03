package com.test.model.Return;

import com.test.model.ExpressType;
import com.test.model.OrderInvoiceRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderInvoiceRequestReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<OrderInvoiceRequest> dataList;
}

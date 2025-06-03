package com.test.model.Return;

import com.test.model.PaymentFlow;
import com.test.model.UserAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentFlowReturn {
    private int pageSize;
    private int currentPage;
    private Long totalPages;
    private List<PaymentFlow> dataList;
}

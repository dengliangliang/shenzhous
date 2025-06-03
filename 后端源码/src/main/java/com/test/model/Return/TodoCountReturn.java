package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoCountReturn {
    private Integer realNameCount;       // 待审核实名数量
    private Integer invoiceCount;        // 待处理发票数量
    private Integer orderCount;          // 待处理订单数量
    private Integer monthlySettleCount;  // 待审核月结数量
    // getter、setter、构造方法等
}
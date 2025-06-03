package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpressDistributionReturn {
    private List<ExpressDistributionItem> items;
    private Integer total;           // 总订单数
}
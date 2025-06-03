package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyBill {
    private BigDecimal alreadySettlementAmount = BigDecimal.ZERO;
    private BigDecimal month = BigDecimal.ZERO;
    private BigDecimal treatSettlementAmount = BigDecimal.ZERO;
    private int number;
}

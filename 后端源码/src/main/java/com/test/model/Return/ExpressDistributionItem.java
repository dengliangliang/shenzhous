package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpressDistributionItem {
    private String expressName;      // 快递公司名称
    private Integer count;           // 配送数量
    private BigDecimal percentage;   // 占比
}
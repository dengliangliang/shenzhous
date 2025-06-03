package com.test.model.Return;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataReturn {
    private Integer todayOrders;        // 今日订单数
    private BigDecimal todayIncome;     // 今日流水
    private Integer monthlyUsers;        // 月结用户数
    private BigDecimal monthlyIncome;    // 本月收入
    private Integer difference;        // 待补差价数量
    // getter、setter、构造方法等
}
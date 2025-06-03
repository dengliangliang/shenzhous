package com.test.service;

import com.test.model.Return.DashboardDataReturn;
import com.test.model.Return.ExpressDistributionReturn;
import com.test.model.Return.OrderTrendReturn;
import com.test.model.Return.TodoCountReturn;
import com.test.utils.Result;

public interface DashboardService {
    Result<DashboardDataReturn> getDashboardData();

    Result<OrderTrendReturn> getOrderTrend();

    Result<ExpressDistributionReturn> getExpressDistribution(String type);

    Result<TodoCountReturn> getTodoCount();
}

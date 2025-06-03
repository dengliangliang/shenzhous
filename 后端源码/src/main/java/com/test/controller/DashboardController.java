package com.test.controller;

import com.test.model.Return.DashboardDataReturn;
import com.test.model.Return.OrderTrendReturn;
import com.test.model.Return.ExpressDistributionReturn;
import com.test.model.Return.TodoCountReturn;
import com.test.service.DashboardService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * 获取仪表盘概览数据
     * @return 今日订单数、今日流水、月结用户数、本月收入
     */
    @GetMapping("/overview")
    public Result<DashboardDataReturn> getDashboardData() {
        return dashboardService.getDashboardData();
    }

    /**
     * 获取近7天订单趋势
     * @return 每天的订单数和完成数
     */
    @GetMapping("/orderTrend")
    public Result<OrderTrendReturn> getOrderTrend() {
        return dashboardService.getOrderTrend();
    }

    /**
     * 获取快递公司配送占比
     * @param type 统计类型：week-本周，month-本月，quarter-本季度
     * @return 各快递公司的配送数量和占比
     */
    @GetMapping("/expressDistribution")
    public Result<ExpressDistributionReturn> getExpressDistribution(@RequestParam String type) {
        return dashboardService.getExpressDistribution(type);
    }

    /**
     * 获取待处理事项数量
     * @return 各类待处理事项的数量
     */
    @GetMapping("/todoCount")
    public Result<TodoCountReturn> getTodoCount() {
        return dashboardService.getTodoCount();
    }
}
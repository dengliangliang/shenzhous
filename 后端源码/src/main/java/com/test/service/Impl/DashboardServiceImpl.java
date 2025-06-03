package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.mapper.MonthlySettlementApplyMapper;
import com.test.mapper.OrderInvoiceRequestMapper;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserMapper;
import com.test.model.Order;
import com.test.model.Return.*;
import com.test.service.DashboardService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private OrderInvoiceRequestMapper orderInvoiceRequestMapper;
    @Autowired
    private MonthlySettlementApplyMapper monthlySettlementApplyMapper;

    @Override
    public Result<DashboardDataReturn> getDashboardData() {
        DashboardDataReturn data = new DashboardDataReturn();
        // 获取今天的开始和结束时间
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime tomorrow = today.plusDays(1);

        // 查询今日订单数
        data.setTodayOrders(orderMapper.countOrdersByTimeRange(today, tomorrow));

        // 查询今日流水
        data.setTodayIncome(orderMapper.sumIncomeByTimeRange(today, tomorrow));

        QueryWrapper<Order> queryWrapper = new QueryWrapper();
        queryWrapper.ne("order_price_difference",0.00);
        queryWrapper.eq("is_price_difference_paid",0);
        queryWrapper.eq("is_delete",0);
        List<Order> orders = orderMapper.selectList(queryWrapper);
        data.setDifference(orders.size());
        // 查询月结用户数
        data.setMonthlyUsers(userMapper.countMonthlyUsers());

        // 查询本月收入
        LocalDateTime monthStart = today.withDayOfMonth(1);
        data.setMonthlyIncome(orderMapper.sumIncomeByTimeRange(monthStart, tomorrow));

        return Result.success(data);
    }

    @Override
    public Result<OrderTrendReturn> getOrderTrend() {
        OrderTrendReturn data = new OrderTrendReturn();
        List<String> dateList = new ArrayList<>();
        List<Integer> orderCount = new ArrayList<>();
        List<Integer> finishCount = new ArrayList<>();

        // 获取近7天的数据
        LocalDateTime end = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        for (int i = 6; i >= 0; i--) {
            LocalDateTime start = end.minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime dayEnd = start.withHour(23).withMinute(59).withSecond(59);

            dateList.add(start.format(DateTimeFormatter.ofPattern("MM-dd")));
            orderCount.add(orderMapper.countOrdersByTimeRange(start, dayEnd));
            finishCount.add(orderMapper.countFinishedOrdersByTimeRange(start, dayEnd));
        }

        data.setDateList(dateList);
        data.setOrderCount(orderCount);
        data.setFinishCount(finishCount);

        return Result.success(data);
    }

    @Override
    public Result<ExpressDistributionReturn> getExpressDistribution(String type) {
        LocalDateTime start;
        LocalDateTime end = LocalDateTime.now();

        // 根据类型确定时间范围
        switch (type) {
            case "week":
                start = end.minusWeeks(1);
                break;
            case "month":
                start = end.withDayOfMonth(1);
                break;
            case "quarter":
                start = end.withDayOfMonth(1).minusMonths(2);
                break;
            default:
                return Result.fail("Invalid type");
        }

        try {
            // 查询各快递公司的配送数量
            List<ExpressDistributionItem> items = orderMapper.countOrdersByExpress(start, end);

            // 计算总数
            int total = items.stream().mapToInt(ExpressDistributionItem::getCount).sum();

            ExpressDistributionReturn result = new ExpressDistributionReturn();
            result.setItems(items);
            result.setTotal(total);

            return Result.success(result);
        } catch (Exception e) {
//            log.error("获取快递公司配送占比失败", e);
            return Result.fail("获取数据失败");
        }
    }
    @Override
    public Result<TodoCountReturn> getTodoCount() {
        TodoCountReturn data = new TodoCountReturn();

        // 查询待审核实名数量
        data.setRealNameCount(userMapper.countPendingRealName());

        // 查询待处理发票数量
        data.setInvoiceCount(orderInvoiceRequestMapper.countPendingInvoice());

        // 查询待处理订单数量
        data.setOrderCount(orderMapper.countPendingOrders());

        // 查询待审核月结数量
        data.setMonthlySettleCount(monthlySettlementApplyMapper.countPendingApply());

        return Result.success(data);
    }
}

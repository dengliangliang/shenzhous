package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.test.model.Order;
import com.test.model.Return.ExpressDistributionItem;
import com.test.model.Return.ExpressDistributionReturn;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Mapper
public interface OrderMapper extends BaseMapper<Order> {

    // 统计时间范围内的订单数
    Integer countOrdersByTimeRange(@Param("startTime") LocalDateTime startTime,
                                   @Param("endTime") LocalDateTime endTime);

    // 统计时间范围内的已完成订单数
    Integer countFinishedOrdersByTimeRange(@Param("startTime") LocalDateTime startTime,
                                           @Param("endTime") LocalDateTime endTime);

    // 统计时间范围内的收入总额
    BigDecimal sumIncomeByTimeRange(@Param("startTime") LocalDateTime startTime,
                                    @Param("endTime") LocalDateTime endTime);

    // 统计快递公司配送数量分布
    List<ExpressDistributionItem> countOrdersByExpress(@Param("startTime") LocalDateTime startTime,
                                                       @Param("endTime") LocalDateTime endTime);

    // 统计待处理订单数量
    Integer countPendingOrders();
}

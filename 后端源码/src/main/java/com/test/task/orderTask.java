package com.test.task;

import com.test.config.RedisUtils;
import com.test.model.Order;
import com.test.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.test.utils.TimeUtils.getTime;
@Slf4j
@Component
public class orderTask {

    @Autowired
    private RedisUtils redisUtils;

    // Redis订单缓存前缀
    private static final String ORDER_CACHE_PREFIX = "order:status:7:";
    // 缓存时间（毫秒）
    private static final long CACHE_TIMEOUT = 2 * 60 * 60 * 1000; // 2小时
    // 提前更新阈值（秒）
    private static final long UPDATE_THRESHOLD = 60; // 提前30秒更新状态

    @Autowired
    private OrderService orderService;
    /**
     * 定时任务，检查过期订单并更新状态
     * 每分钟执行一次
     */
    @Scheduled(fixedRate = 60000)
    public void checkExpiredOrders() {
        // 使用RedisUtils的scan方法获取所有匹配的key
        List<String> keys = redisUtils.scan(ORDER_CACHE_PREFIX + "*");
        log.info("检查订单缓存，找到{}个待处理订单", keys.size());

        for (String key : keys) {
            // 获取订单ID
            String orderId = key.substring(ORDER_CACHE_PREFIX.length());
            // 获取过期时间（秒）
            long expireTime = redisUtils.getExpire(key);
            
            // 如果剩余过期时间小于等于30秒，则提前更新订单状态
            if (expireTime >= 0 && expireTime <= UPDATE_THRESHOLD) {
                log.info("订单{}即将过期，剩余{}秒，提前更新状态", orderId, expireTime);
                // 检查订单状态是否仍为7
                Order order = orderService.getById(orderId);
                if (order != null && order.getOrderStatus() == 7) {
                    // 如果订单状态仍是7，更新为2
                    log.info("更新订单{}状态为2", orderId);
                    order.setOrderStatus(2);
                    order.setShippingStatus(10);
                    order.setUpdateTime(getTime());
                    orderService.updateById(order);
                    
                    // 删除Redis中的缓存，避免重复处理
                    redisUtils.del(key);
                }
            }
        }
    }
}

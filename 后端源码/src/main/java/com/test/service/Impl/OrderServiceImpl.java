package com.test.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.mapper.OrderMapper;
import com.test.mapper.UserAddressMapper;
import com.test.mapper.UserMapper;
import com.test.model.Order;
import com.test.model.Return.OrderReturn;
import com.test.model.User;
import com.test.model.UserAddress;
import com.test.service.OrderService;
import com.test.utils.Result;
import com.test.config.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static com.test.utils.TimeUtils.getTime;
import static com.test.utils.UUIDUtils.getUUID;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

    @Autowired
    private OrderMapper orderMapper;


    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserAddressMapper userAddressMapper;
    
    @Autowired
    private RedisUtils redisUtils;
    
    // Redis订单缓存前缀，与orderTask保持一致
    private static final String ORDER_CACHE_PREFIX = "order:status:7:";
    // 缓存时间（毫秒）
    private static final long CACHE_TIMEOUT = 2 * 60 * 60 * 1000 + 60; // 2小时

    @Override
    public Result<Order> addOrder(Order order) {
        User user = userMapper.selectById(order.getUserId());
        if (ObjectUtils.isEmpty(user)) {
            return Result.fail("新增订单失败，该用户不存在");
        }
        if (!StringUtils.isNotEmpty(order.getOrderId())){
            order.setOrderId(getUUID());
        }

        order.setCreateTime(getTime());
        order.setUpdateTime(getTime());
        
        // 如果是修改已有订单且状态变更为8，先尝试删除缓存
        if (StringUtils.isNotEmpty(order.getOrderId()) && order.getOrderStatus() != null && order.getOrderStatus() == 8) {
            String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
            redisUtils.del(cacheKey);
        }
        
        this.save(order);
        
        // 如果订单状态为7，将订单放入Redis缓存，设置过期时间为2小时
        if (order.getOrderStatus() != null && order.getOrderStatus() == 7) {
            String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
            // 将Order对象转为字符串存储
            String orderJson = com.alibaba.fastjson.JSON.toJSONString(order);
            redisUtils.set(cacheKey, orderJson, 2, TimeUnit.HOURS);
        }
        
        return Result.success("新增订单成功",order);
    }

    @Override
    public Result<Long> getRemainingCacheTime(String orderId) {
        String cacheKey = ORDER_CACHE_PREFIX + orderId;
        long expireTime = redisUtils.getExpire(cacheKey);
        
        if (expireTime <= 0) {
            return Result.fail("该订单不在缓存中或已过期");
        }
        
        // 转换为毫秒
        expireTime = expireTime * 1000;


        
        return Result.success("查询成功", expireTime);
    }

    @Override
    public Result<Order> deleteOrder(String id) {
        Order order = orderMapper.selectById(id);
        if (ObjectUtils.isEmpty(order)) {
            return Result.fail("删除失败，该订单不存在");
        }
        order.setUpdateTime(getTime());
        order.setIsDelete(1);
        orderMapper.updateById(order);

        String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
        // 将Order对象转为字符串存储
        String orderJson = com.alibaba.fastjson.JSON.toJSONString(order);
        redisUtils.set(cacheKey, orderJson, 2, TimeUnit.HOURS);
        return Result.success("删除成功",order);
    }

    @Override
    public Result<Order> getOrderById(String id) {
        Order order = orderMapper.selectById(id);
        if (ObjectUtils.isEmpty(order)) {
            return Result.fail("删除失败，该订单不存在");
        }
        if (order.getOrderStatus() != null && order.getOrderStatus() == 7) {
            String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
            long expireTime = redisUtils.getExpire(cacheKey);
            // 如果订单在缓存中存在，设置剩余时间
            if (expireTime > 0) {
                order.setRemainderTime(expireTime * 1000); // 转为毫秒
            } else {
                order.setRemainderTime(0L);
            }
        } else {
            order.setRemainderTime(0L);
        }
        return Result.success("查询成功",order);
    }

    @Override
    public Result<OrderReturn> pageOrder(int pageNum, int pageSize, Integer paymentMethod, Integer shippingStatus, Integer isPriceDifferencePaid,
                                         Integer orderStatus, String userId,String searchValue,String phone) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        if (paymentMethod != null) {
            queryWrapper.eq("payment_method", paymentMethod);
        }
        if (shippingStatus != null) {
            queryWrapper.eq("shipping_status", shippingStatus);
        }
        if (isPriceDifferencePaid != null) {
            queryWrapper.eq("is_price_difference_paid", isPriceDifferencePaid);
        }
        if (orderStatus != null) {
            queryWrapper.eq("order_status", orderStatus);
        }
        if (StringUtils.isNotEmpty(userId)){
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotEmpty(searchValue)){
            queryWrapper.like("order_no", searchValue);
        }
        if (StringUtils.isNotEmpty(phone)){
            queryWrapper.eq("receiver_phone", phone);
        }
        queryWrapper.eq("is_delete", 0);
        queryWrapper.orderByDesc("create_time");
        IPage<Order> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        System.out.println(page.getTotal());
        List<Order> orders = page.getRecords();
        
        // 当phone参数存在时，查询每个订单在缓存中的剩余时间
        for (Order order : orders) {
            // 只有订单状态为7的才需要查询剩余时间
            if (order.getOrderStatus() != null && order.getOrderStatus() == 7) {
                String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
                long expireTime = redisUtils.getExpire(cacheKey);
                // 如果订单在缓存中存在，设置剩余时间
                if (expireTime > 0) {
                    order.setRemainderTime(expireTime * 1000); // 转为毫秒
                } else {
                    order.setRemainderTime(0L);
                }
            } else {
                order.setRemainderTime(0L);
            }
        }
        
        OrderReturn orderReturn = new OrderReturn();
        orderReturn.setCurrentPage(pageNum);
        orderReturn.setPageSize(pageSize);
        orderReturn.setTotalPages(page.getTotal());
        orderReturn.setDataList(orders);
        return Result.success("查询成功",orderReturn);
    }

    @Override
    public Result<List<Order>> getOrderList(Integer paymentMethod, Integer shippingStatus, Integer isPriceDifferencePaid, Integer orderStatus, String userId,String searchValue) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        if (paymentMethod != null) {
            queryWrapper.eq("payment_method", paymentMethod);
        }
        if (shippingStatus != null) {
            queryWrapper.eq("shipping_status", shippingStatus);
        }
        if (isPriceDifferencePaid != null) {
            queryWrapper.eq("is_price_difference_paid", isPriceDifferencePaid);
        }
        if (orderStatus != null) {
            queryWrapper.eq("order_status", orderStatus);
        }
        if (StringUtils.isNotEmpty(userId)){
            queryWrapper.eq("user_id", userId);
        }
        if (StringUtils.isNotEmpty(searchValue)){
            queryWrapper.like("order_no", searchValue);
        }
        queryWrapper.eq("is_delete", 0);
        List<Order> orders = this.list(queryWrapper);
        return Result.success("查询成功",orders);
    }

    @Override
    public Result<Order> cancelOrder(String orderId) {
        Order order = orderMapper.selectById(orderId);
        if (ObjectUtils.isEmpty(order)) {
            return Result.fail("取消失败，该订单不存在");
        }
        order.setUpdateTime(getTime());
        order.setShippingStatus(10);
        order.setOrderStatus(3);
        orderMapper.updateById(order);


        return Result.success("取消成功",order);
    }

    @Override
    public Result<List<String>> batchesAddOrder(List<Order> orders) {
        List<String> orderIds = new ArrayList<>();
        for (Order order : orders) {
            User user = userMapper.selectById(order.getUserId());
            if (ObjectUtils.isEmpty(user)) {
                return Result.fail("新增订单失败，该用户不存在");
            }
            if (!StringUtils.isNotEmpty(order.getOrderId())){
                order.setOrderId(getUUID());
            }
            order.setCreateTime(getTime());
            order.setUpdateTime(getTime());

            // 如果是修改已有订单且状态变更为8，先尝试删除缓存
            if (StringUtils.isNotEmpty(order.getOrderId()) && order.getOrderStatus() != null && order.getOrderStatus() == 8) {
                String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
                redisUtils.del(cacheKey);
            }

            this.save(order);

            // 如果订单状态为7，将订单放入Redis缓存，设置过期时间为2小时
            if (order.getOrderStatus() != null && order.getOrderStatus() == 7) {
                String cacheKey = ORDER_CACHE_PREFIX + order.getOrderId();
                // 将Order对象转为字符串存储
                String orderJson = com.alibaba.fastjson.JSON.toJSONString(order);
                redisUtils.set(cacheKey, orderJson, 2, TimeUnit.HOURS);
            }
            orderIds.add(order.getOrderId());
        }
        return Result.success(orderIds);
    }

    @Override
    public Order getByOrderNo(String orderNo) {
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Order::getOrderNo, orderNo);
        return this.getOne(wrapper);
    }

    @Override
    public Result<Order> updateOrderStatus(String orderId, Integer status,Integer isPriceDifferencePaid,String wechatId,String orderNo,
                                           String deliverId) {
        Order order = orderMapper.selectById(orderId);
        if (ObjectUtils.isEmpty(order)) {
            return Result.fail("取消失败，该订单不存在");
        }

        if (isPriceDifferencePaid != null&&isPriceDifferencePaid==1) {
            order.setIsPriceDifferencePaid(1);
            order.setOrderPriceDifference(BigDecimal.ZERO);
        }
        if (StringUtils.isNotEmpty(wechatId)){
            order.setWechatId(wechatId);
        }
        order.setUpdateTime(getTime());
        order.setOrderStatus(status);
        if (StringUtils.isNotEmpty(orderNo)){
            order.setOrderNo(orderNo);
        }
        if (StringUtils.isNotEmpty(deliverId)){
            order.setDeliveryId(deliverId);
        }
        this.updateById(order);
        
        // 如果订单状态更新为8，删除Redis中的缓存
        if (status != null && status == 8) {
            String cacheKey = ORDER_CACHE_PREFIX + orderId;
            redisUtils.del(cacheKey);

        }
        
        return Result.success("修改成功",order);
    }

    @Override
    public Result<OrderReturn> getDone(int pageNum, int pageSize, String userId) {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .eq("user_id", userId)
                .eq("shipping_status", 3)
                .eq("is_price_difference_paid", 1)
                .in("order_status", 1, 4, 8)  // 替代多个 OR
                .eq("is_delete", 0)
                .orderByDesc("create_time");
        IPage<Order> page = this.page(new Page<>(pageNum, pageSize), queryWrapper);
        List<Order> orders = page.getRecords();
        OrderReturn orderReturn = new OrderReturn();
        orderReturn.setCurrentPage(pageNum);
        orderReturn.setPageSize(pageSize);
        orderReturn.setTotalPages(page.getTotal());
        orderReturn.setDataList(orders);
        return Result.success("查询成功",orderReturn);
    }
}
package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.Order;
import com.test.model.Return.OrderReturn;
import com.test.utils.Result;

import java.util.List;

public interface OrderService extends IService<Order> {
    Result<Order> addOrder(Order order);

    Result<Order> deleteOrder(String id);

    Result<Order> getOrderById(String id);

    Result<OrderReturn> pageOrder(int pageNum, int pageSize, Integer paymentMethod, Integer shippingStatus, Integer isPriceDifferencePaid, Integer orderStatus, String userId,String searchValue,String phone);

    Result<List<Order>> getOrderList(Integer paymentMethod, Integer shippingStatus, Integer isPriceDifferencePaid, Integer orderStatus, String userId,String searchValue);

    Result<Order> cancelOrder(String orderId);

    Result<List<String>> batchesAddOrder(List<Order> orders);

    // 根据易达订单号查询订单
    Order getByOrderNo(String orderNo);

    Result<Order> updateOrderStatus(String orderId, Integer status,Integer isPriceDifferencePaid,String wechatId,
                                    String orderNo,
                                    String deliverId);

    Result<OrderReturn> getDone(int pageNum, int pageSize, String userId);
    
    // 获取订单在缓存中的剩余时间
    Result<Long> getRemainingCacheTime(String orderId);
}
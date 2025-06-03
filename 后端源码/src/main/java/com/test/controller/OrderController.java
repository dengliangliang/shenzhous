package com.test.controller;

import com.test.model.Order;
import com.test.model.MonthlySettlementApply;
import com.test.model.Return.OrderReturn;
import com.test.service.OrderService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//快递订单模块
@RequestMapping("/Order")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    //新增发票抬头
    @PostMapping("")
    public Result<Order> addOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }

    //新增发票抬头
    @GetMapping("/getRemainingCacheTime")
    public Result<Long> getRemainingCacheTime(@RequestParam String orderId) {
        return orderService.getRemainingCacheTime(orderId);
    }

    @PostMapping("/batchesAdd")
    public Result<List<String>> batchesAddOrder(@RequestBody List<Order> orders) {
        return orderService.batchesAddOrder(orders);
    }

//    @PutMapping("")
//    public Result<Order> updateOrder(@RequestBody Order Order) {
//        return orderService.updateOrder(Order);
//    }

    @DeleteMapping("")
    public Result<Order> deleteOrder(@RequestParam String id) {
        return orderService.deleteOrder(id);
    }

    @PostMapping("/updateOrderStatus")
    public Result<Order> updateOrderStatus(@RequestParam String orderId,
                                           @RequestParam Integer status,
                                           @RequestParam(required = false) Integer isPriceDifferencePaid,
                                           @RequestParam(required = false) String wechatId,
                                           @RequestParam(required = false) String orderNo,
                                           @RequestParam(required = false) String deliverId) {
        return orderService.updateOrderStatus(orderId,status,isPriceDifferencePaid,wechatId,orderNo,deliverId);
    }

    @PostMapping("/cancel")
    public Result<Order> cancelOrder(@RequestParam String orderId) {
        return orderService.cancelOrder(orderId);
    }

    @GetMapping("")
    public Result<Order> getOrderById(@RequestParam String id) {
        return orderService.getOrderById(id);
    }


    @GetMapping("/page")
    public Result<OrderReturn> pageOrder(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) Integer paymentMethod,
            @RequestParam(required = false) Integer shippingStatus,
            @RequestParam(required = false) Integer isPriceDifferencePaid,
            @RequestParam(required = false) Integer orderStatus,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String searchValue,
            @RequestParam(required = false) String phone
    ) {
        return orderService.pageOrder(pageNum, pageSize, paymentMethod,shippingStatus,isPriceDifferencePaid,orderStatus,userId,searchValue,phone);
    }

    @GetMapping("/getDone")
    public Result<OrderReturn> getDone(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam String userId
    ) {
        return orderService.getDone(pageNum, pageSize, userId);
    }

    @GetMapping("/list")
    public Result<List<Order>> getOrderList(
            @RequestParam(required = false) Integer paymentMethod,
            @RequestParam(required = false) Integer shippingStatus,
            @RequestParam(required = false) Integer isPriceDifferencePaid,
            @RequestParam(required = false) Integer orderStatus,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String searchValue
    ) {
        return orderService.getOrderList(paymentMethod,shippingStatus,isPriceDifferencePaid,orderStatus,userId,searchValue);
    }

}

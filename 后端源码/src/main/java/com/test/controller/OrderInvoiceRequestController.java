package com.test.controller;

import com.test.model.OrderInvoiceRequest;
import com.test.model.OrderInvoiceRequest;
import com.test.model.Return.OrderInvoiceRequestReturn;
import com.test.service.OrderInvoiceRequestService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//订单发票申请模块
@RequestMapping("/OrderInvoiceRequest")
@RestController
public class OrderInvoiceRequestController {
    
    @Autowired
    private OrderInvoiceRequestService orderInvoiceRequestService;

    @PostMapping("")
    public Result<OrderInvoiceRequest> addOrderInvoiceRequest(@RequestBody OrderInvoiceRequest orderInvoiceRequest) {
        return orderInvoiceRequestService.addOrderInvoiceRequest(orderInvoiceRequest);
    }

    @PutMapping("")
    public Result<OrderInvoiceRequest> updateOrderInvoiceRequest(@RequestBody OrderInvoiceRequest orderInvoiceRequest) {
        return orderInvoiceRequestService.updateOrderInvoiceRequest(orderInvoiceRequest);
    }

    @PutMapping("passOrOverrule")
    public Result<String> passOrOverrule(
            @RequestParam String id,
            @RequestParam Integer type,
            @RequestParam(required = false) String overrule,
            @RequestParam(required = false) String invoicePhoto) {
        return orderInvoiceRequestService.passOrOverrule(id,type,overrule,invoicePhoto);
    }

    @DeleteMapping("")
    public Result<OrderInvoiceRequest> deleteOrderInvoiceRequest(@RequestParam String id) {
        return orderInvoiceRequestService.deleteOrderInvoiceRequest(id);
    }

    @GetMapping("")
    public Result<OrderInvoiceRequest> getOrderInvoiceRequestById(@RequestParam String id) {
        return orderInvoiceRequestService.getOrderInvoiceRequestById(id);
    }

    @GetMapping("/page")
    public Result<OrderInvoiceRequestReturn> pageOrderInvoiceRequest(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) Integer type
    ) {
        return orderInvoiceRequestService.pageOrderInvoiceRequest(pageNum, pageSize,userId,orderId,type);
    }

    @GetMapping("/list")
    public Result<List<OrderInvoiceRequest>> getOrderInvoiceRequestList( @RequestParam(required = false) String userId,
                                                                         @RequestParam(required = false) String orderId,
                                                                         @RequestParam(required = false) Integer type) {
        return orderInvoiceRequestService.getOrderInvoiceRequestList(userId,orderId,type);
    }
    
}

package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.OrderInvoiceRequest;
import com.test.model.Return.OrderInvoiceRequestReturn;
import com.test.utils.Result;

import java.util.List;

public interface OrderInvoiceRequestService extends IService<OrderInvoiceRequest> {
    Result<OrderInvoiceRequest> addOrderInvoiceRequest(OrderInvoiceRequest orderInvoiceRequest);

    Result<OrderInvoiceRequest> updateOrderInvoiceRequest(OrderInvoiceRequest orderInvoiceRequest);

    Result<OrderInvoiceRequest> deleteOrderInvoiceRequest(String id);

    Result<OrderInvoiceRequest> getOrderInvoiceRequestById(String id);

    Result<OrderInvoiceRequestReturn> pageOrderInvoiceRequest(int pageNum, int pageSize,String userId,String orderId,Integer type);

    Result<List<OrderInvoiceRequest>> getOrderInvoiceRequestList(String userId,String orderId,Integer type);

    Result<String> passOrOverrule(String id, Integer type, String overrule,String invoicePhoto);
}
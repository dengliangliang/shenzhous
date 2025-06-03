package com.test.controller;

import com.test.model.CommissionFlow;
import com.test.model.PaymentFlow;
import com.test.model.PaymentFlow;
import com.test.model.Return.PaymentFlowReturn;
import com.test.service.PaymentFlowService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//支付流水模块
@RequestMapping("/PaymentFlow")
@RestController
public class PaymentFlowController {
    
    @Autowired
    private PaymentFlowService paymentFlowService;

    
    @PostMapping("")
    public Result<PaymentFlow> addPaymentFlow(@RequestBody PaymentFlow paymentFlow) {
        return paymentFlowService.addPaymentFlow(paymentFlow);
    }

  
    @DeleteMapping("")
    public Result<PaymentFlow> deletePaymentFlow(@RequestParam String id) {
        return paymentFlowService.deletePaymentFlow(id);
    }

    @GetMapping("")
    public Result<PaymentFlow> getPaymentFlowById(@RequestParam String id) {
        return paymentFlowService.getPaymentFlowById(id);
    }

    @PostMapping("/batchesAdd")
    public Result<String> batchesAddPaymentFlow(@RequestBody List<PaymentFlow> paymentFlows ) {
        return paymentFlowService.batchesAddPaymentFlow(paymentFlows);
    }

    @GetMapping("/page")
    public Result<PaymentFlowReturn> pagePaymentFlow(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String orderId
    ) {
        return paymentFlowService.pagePaymentFlow(pageNum, pageSize,userId,orderId);
    }

    @GetMapping("/list")
    public Result<List<PaymentFlow>> getPaymentFlowList(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String orderId
    ) {
        return paymentFlowService.getPaymentFlowList(userId,orderId);
    }
    
}

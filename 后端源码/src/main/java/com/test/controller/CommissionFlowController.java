package com.test.controller;

import com.test.model.CommissionFlow;
import com.test.model.MonthlyStatement;
import com.test.model.Return.CommissionFlowReturn;
import com.test.model.Return.UserReturn;
import com.test.model.User;
import com.test.model.UserAddress;
import com.test.service.CommissionFlowService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//用户佣金金额流动模块
@RequestMapping("/CommissionFlow")
@RestController
public class CommissionFlowController {

    @Autowired
    private CommissionFlowService commissionFlowService;

    @PostMapping("")
    public Result<CommissionFlow> addCommissionFlow(@RequestBody CommissionFlow commissionFlow) {
        return commissionFlowService.addCommissionFlow(commissionFlow);
    }

    @GetMapping("")
    public Result<CommissionFlow> getCommissionFlowById(@RequestParam String id) {
        return commissionFlowService.getCommissionFlowById(id);
    }

    @PostMapping("/batchesAdd")
    public Result<String> batchesAddCommissionFlow(@RequestBody List<CommissionFlow> commissionFlows ) {
        return commissionFlowService.batchesAddCommissionFlow(commissionFlows);
    }


    @GetMapping("/page")
    public Result<CommissionFlowReturn> pageCommissionFlow(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) Integer flowType,
            @RequestParam(required = false) String userId
    ) {
        return commissionFlowService.pageCommissionFlow(pageNum, pageSize, flowType,userId);
    }

    @GetMapping("/list")
    public Result<List<CommissionFlow>> getCommissionFlowList(
            @RequestParam(required = false) Integer flowType,
            @RequestParam(required = false) String userId) {
        return commissionFlowService.getCommissionFlowList(flowType,userId);
    }

}

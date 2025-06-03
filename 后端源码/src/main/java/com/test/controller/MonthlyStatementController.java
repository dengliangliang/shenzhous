package com.test.controller;

import com.test.model.MonthlyStatement;
import com.test.model.Order;
import com.test.model.Return.MonthlyBill;
import com.test.model.Return.MonthlyStatementReturn;
import com.test.service.MonthlyStatementService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//用户月结账单模块
@RequestMapping("/MonthlyStatement")
@RestController
public class MonthlyStatementController {
    
    @Autowired
    private MonthlyStatementService monthlyStatementService;
    
    @PostMapping("")
    public Result<MonthlyStatement> addMonthlyStatement(@RequestBody MonthlyStatement monthlyStatement) {
        return monthlyStatementService.addMonthlyStatement(monthlyStatement);
    }
    

    @GetMapping("")
    public Result<MonthlyStatement> getMonthlyStatementById(@RequestParam String id) {
        return monthlyStatementService.getMonthlyStatementById(id);
    }

    @GetMapping("/getAllPrice")
    public Result<MonthlyBill> getAllPrice(@RequestParam String id,
                                           @RequestParam(required = false) String startTime,
                                           @RequestParam(required = false) String endTime,
                                           @RequestParam(required = false) String userId) {
        return monthlyStatementService.getAllPrice(id,startTime,endTime,userId);
    }

    @GetMapping("/payBills")
    public Result<String> payBills(@RequestParam String id,
                                           @RequestParam(required = false) String startTime,
                                           @RequestParam(required = false) String endTime
                                           ) {
        return monthlyStatementService.payBills(id,startTime,endTime);
    }

    @PostMapping("/batchesAdd")
    public Result<String> batchesAddMonthlyStatement(@RequestBody List<MonthlyStatement> monthlyStatements ) {
        return monthlyStatementService.batchesAddMonthlyStatement(monthlyStatements);
    }

    @GetMapping("/page")
    public Result<MonthlyStatementReturn> pageMonthlyStatement(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String monthlySettlementEligibilityId,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String startTime,
            @RequestParam(required = false) String endTime,
            @RequestParam(required = false) Integer type
    ) {
        return monthlyStatementService.pageMonthlyStatement(pageNum, pageSize, monthlySettlementEligibilityId,userId,startTime,endTime,type);
    }

    @GetMapping("/list")
    public Result<List<MonthlyStatement>> getMonthlyStatementList(
            @RequestParam(required = false) String monthlySettlementEligibilityId,
            @RequestParam(required = false) String userId
    ) {
        return monthlyStatementService.getMonthlyStatementList(monthlySettlementEligibilityId,userId);
    }

}

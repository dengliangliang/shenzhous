package com.test.controller;

import com.test.model.MonthlySettlementApply;
import com.test.model.Return.MonthlySettlementApplyReturn;
import com.test.service.MonthlySettlementApplyService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//用户月结资格申请模块
@RequestMapping("/MonthlySettlementApply")
@RestController
public class MonthlySettlementApplyController {

    @Autowired
    private MonthlySettlementApplyService monthlySettlementApplyService;

    @PostMapping("")
    public Result<MonthlySettlementApply> addMonthlySettlementApply(@RequestBody MonthlySettlementApply monthlySettlementApply) {
        return monthlySettlementApplyService.addMonthlySettlementApply(monthlySettlementApply);
    }

    @PutMapping("/cancel")
    public Result<MonthlySettlementApply> cancelMonthlySettlementApply(@RequestParam String id) {
        return monthlySettlementApplyService.cancelMonthlySettlementApply(id);
    }

    @PutMapping("/passOrOverrule")
    public Result<String> passOrOverrule(
            @RequestParam String id,
            @RequestParam String pereviewerId,
            @RequestParam Integer type,
            @RequestParam(required = false) String overrule) {
        return monthlySettlementApplyService.passOrOverrule(id,pereviewerId,type,overrule);
    }

    @DeleteMapping("")
    public Result<MonthlySettlementApply> deleteMonthlySettlementApply(@RequestParam String id) {
        return monthlySettlementApplyService.deleteMonthlySettlementApply(id);
    }

    @GetMapping("")
    public Result<MonthlySettlementApply> getMonthlySettlementApplyById(@RequestParam String id) {
        return monthlySettlementApplyService.getMonthlySettlementApplyById(id);
    }

    @GetMapping("/page")
    public Result<MonthlySettlementApplyReturn> pageMonthlySettlementApply(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer applyStatus
    ) {
        return monthlySettlementApplyService.pageMonthlySettlementApply(pageNum, pageSize,userId,applyStatus);
    }

    @GetMapping("/list")
    public Result<List<MonthlySettlementApply>> getMonthlySettlementApplyList(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer applyStatus
    ) {
        return monthlySettlementApplyService.getMonthlySettlementApplyList(userId,applyStatus);
    }
}

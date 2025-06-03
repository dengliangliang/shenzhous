package com.test.controller;

import com.test.model.MonthlySettlementEligibility;
import com.test.model.Return.MonthlySettlementEligibilityReturn;
import com.test.model.User;
import com.test.service.MonthlySettlementEligibilityService;
import com.test.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//用户月结资格模块
@RequestMapping("/MonthlySettlementEligibility")
@RestController
public class MonthlySettlementEligibilityController {

    @Autowired
    private MonthlySettlementEligibilityService monthlySettlementEligibilityService;

    @GetMapping("")
    public Result<MonthlySettlementEligibility> getMonthlySettlementEligibilityById(@RequestParam String id) {
        return monthlySettlementEligibilityService.getMonthlySettlementEligibilityById(id);
    }

    @GetMapping("/getUser")
    public Result<List<User>> getUser(@RequestParam String id) {
        return monthlySettlementEligibilityService.getUser(id);
    }

    @PutMapping("/logoff")
    public Result<MonthlySettlementEligibility> logoffMonthlySettlementEligibilityById(@RequestParam String id) {
        return monthlySettlementEligibilityService.logoffMonthlySettlementEligibilityById(id);
    }

    @GetMapping("/isEffective")
    public Result<Integer> isEffective(@RequestParam String id,@RequestParam String code) {
        return monthlySettlementEligibilityService.getIsEffective(id,code);
    }

    @PutMapping("/updatePassword")
    public Result<MonthlySettlementEligibility> updatePassword(@RequestParam String id,@RequestParam String oldPassword,@RequestParam String newPassword,@RequestParam String userId) {
        return monthlySettlementEligibilityService.updatePassword(id,oldPassword,newPassword,userId);
    }

    @GetMapping("/page")
    public Result<MonthlySettlementEligibilityReturn> pageMonthlySettlementEligibility(
            @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer settlementCycle
    ) {
        return monthlySettlementEligibilityService.pageMonthlySettlementEligibility(pageNum, pageSize,userId,settlementCycle);
    }

    @GetMapping("/list")
    public Result<List<MonthlySettlementEligibility>> getMonthlySettlementEligibilityList(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer settlementCycle
    ) {
        return monthlySettlementEligibilityService.getMonthlySettlementEligibilityList(userId,settlementCycle);
    }

}

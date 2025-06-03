package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.MonthlySettlementApply;
import com.test.model.Return.MonthlySettlementApplyReturn;
import com.test.utils.Result;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface MonthlySettlementApplyService extends IService<MonthlySettlementApply> {
    Result<MonthlySettlementApply> addMonthlySettlementApply(MonthlySettlementApply monthlySettlementApply);

    Result<MonthlySettlementApply> cancelMonthlySettlementApply(String id);

    Result<String> passOrOverrule(String id, String pereviewerId, Integer type, String overrule);

    Result<MonthlySettlementApply> deleteMonthlySettlementApply(String id);

    Result<MonthlySettlementApply> getMonthlySettlementApplyById(String id);

    Result<MonthlySettlementApplyReturn> pageMonthlySettlementApply(int pageNum, int pageSize, String userId, Integer applyStatus);

    Result<List<MonthlySettlementApply>> getMonthlySettlementApplyList(String userId, Integer applyStatus);
} 
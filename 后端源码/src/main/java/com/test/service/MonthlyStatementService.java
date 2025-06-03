package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.MonthlyStatement;
import com.test.model.Return.MonthlyBill;
import com.test.model.Return.MonthlyStatementReturn;
import com.test.utils.Result;

import java.util.List;

public interface MonthlyStatementService extends IService<MonthlyStatement> {
    Result<MonthlyStatement> addMonthlyStatement(MonthlyStatement monthlyStatement);

    Result<MonthlyStatement> getMonthlyStatementById(String id);

    Result<MonthlyStatementReturn> pageMonthlyStatement(int pageNum, int pageSize, String monthlySettlementEligibilityId, String userId,String startTime,String endTime,Integer type);

    Result<List<MonthlyStatement>> getMonthlyStatementList(String monthlySettlementEligibilityId, String userId);

    Result<String> batchesAddMonthlyStatement(List<MonthlyStatement> monthlyStatements);

    Result<MonthlyBill> getAllPrice(String id,String startTime,String endTime,String userId);

    Result<String> payBills(String id, String startTime, String endTime);
}

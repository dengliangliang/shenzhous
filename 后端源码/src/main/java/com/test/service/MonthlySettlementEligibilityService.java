package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.MonthlySettlementEligibility;
import com.test.model.Return.MonthlySettlementEligibilityReturn;
import com.test.model.User;
import com.test.utils.Result;

import java.util.List;

public interface MonthlySettlementEligibilityService extends IService<MonthlySettlementEligibility> {
    Result<MonthlySettlementEligibility> getMonthlySettlementEligibilityById(String id);

    Result<MonthlySettlementEligibilityReturn> pageMonthlySettlementEligibility(int pageNum, int pageSize, String userId, Integer settlementCycle);

    Result<List<MonthlySettlementEligibility>> getMonthlySettlementEligibilityList(String userId, Integer settlementCycle);

    Result<MonthlySettlementEligibility> logoffMonthlySettlementEligibilityById(String id);

    Result<Integer> getIsEffective(String id,String code);

    Result<List<User>> getUser(String id);

    Result<MonthlySettlementEligibility> updatePassword(String id, String oldPassword, String newPassword,String userId);
}

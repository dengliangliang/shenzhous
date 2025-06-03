package com.test.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.model.CommissionFlow;
import com.test.model.Return.CommissionFlowReturn;
import com.test.utils.Result;

import java.util.List;

public interface CommissionFlowService extends IService<CommissionFlow> {
    Result<CommissionFlowReturn> pageCommissionFlow(int pageNum, int pageSize, Integer flowType, String userId);

    Result<List<CommissionFlow>> getCommissionFlowList(Integer flowType, String userId);

    Result<CommissionFlow> getCommissionFlowById(String id);

    Result<CommissionFlow> addCommissionFlow(CommissionFlow commissionFlow);

    Result<String> batchesAddCommissionFlow(List<CommissionFlow> commissionFlows);
}
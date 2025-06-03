package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.test.model.MonthlySettlementApply;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MonthlySettlementApplyMapper extends BaseMapper<MonthlySettlementApply> {
    // 统计待审核月结申请数量
    Integer countPendingApply();
} 
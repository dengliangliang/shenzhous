package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.test.model.PaymentFlow;
import org.apache.ibatis.annotations.Mapper;

/**
 * 支付流水数据访问层
 */
@Mapper
public interface PaymentFlowMapper extends BaseMapper<PaymentFlow> {
    // 可以添加自定义查询方法
} 
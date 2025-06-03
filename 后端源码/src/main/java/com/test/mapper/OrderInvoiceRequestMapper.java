package com.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.test.model.OrderInvoiceRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderInvoiceRequestMapper extends BaseMapper<OrderInvoiceRequest> {

    // 统计待处理发票申请数量
    Integer countPendingInvoice();
} 
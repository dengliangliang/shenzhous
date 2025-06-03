import request from '../utils/request'

// 获取支付流水分页列表
export const pagePaymentFlow = query => {
    return request({
        url: '/PaymentFlow/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&userId='+query.userId+'&orderId='+query.orderId,
        method: 'get'
    })
}

// 获取支付流水列表
export const getPaymentFlowList = query => {
    return request({
        url: '/PaymentFlow/list?userId='+query.userId+'&orderId='+query.orderId,
        method: 'get'
    })
}

// 根据ID获取支付流水详情
export const getPaymentFlowById = query => {
    return request({
        url: '/PaymentFlow?id='+query,
        method: 'get'
    })
}

// 删除支付流水
export const deletePaymentFlow = query => {
    return request({
        url: '/PaymentFlow?id='+query,
        method: 'delete'
    })
} 
import request from '../utils/request'

// 获取订单分页列表
export const pageOrder = query => {
    return request({
        url: '/Order/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&paymentMethod='+query.paymentMethod+'&shippingStatus='+query.shippingStatus+'&isPriceDifferencePaid='+query.isPriceDifferencePaid+'&orderStatus='+query.orderStatus+'&userId='+query.userId,
        method: 'get'
    })
}

// 获取订单列表
export const getOrderList = query => {
    return request({
        url: '/Order/list?paymentMethod='+query.paymentMethod+'&shippingStatus='+query.shippingStatus+'&isPriceDifferencePaid='+query.isPriceDifferencePaid+'&orderStatus='+query.orderStatus+'&userId='+query.userId,
        method: 'get'
    })
}

// 根据ID获取订单详情
export const getOrderById = query => {
    return request({
        url: '/Order?id='+query,
        method: 'get'
    })
}

// 新增订单
export const addOrder = query => {
    return request({
        url: '/Order',
        method: 'post',
        data: query
    })
}

// 删除订单
export const deleteOrder = query => {
    return request({
        url: '/Order?id='+query,
        method: 'delete'
    })
} 
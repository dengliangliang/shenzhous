import request from '../utils/request'

// 获取订单发票申请分页列表
export const pageOrderInvoiceRequest = query => {
    return request({
        url: '/OrderInvoiceRequest/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&userId='+query.userId+'&type='+query.type,
        method: 'get'
    })
}

// 获取订单发票申请列表
export const getOrderInvoiceRequestList = query => {
    return request({
        url: '/OrderInvoiceRequest/list?userId='+query.userId+'&type='+query.type,
        method: 'get'
    })
}

// 根据ID获取订单发票申请详情
export const getOrderInvoiceRequestById = query => {
    return request({
        url: '/OrderInvoiceRequest?id='+query,
        method: 'get'
    })
}

// 通过或驳回申请
export const passOrOverrule = (id, type, overrule,invoicePhoto) => {
    return request({
        url: '/OrderInvoiceRequest/passOrOverrule?id='+id+'&type='+type+'&overrule='+overrule+'&invoicePhoto='+invoicePhoto,
        method: 'put'
    })
}

// 删除订单发票申请
export const deleteOrderInvoiceRequest = query => {
    return request({
        url: '/OrderInvoiceRequest?id='+query,
        method: 'delete'
    })
} 
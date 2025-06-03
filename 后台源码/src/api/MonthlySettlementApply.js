import request from '../utils/request'

// 获取月结申请分页列表
export const pageMonthlySettlementApply = query => {
    return request({
        url: '/MonthlySettlementApply/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&userId='+query.userId+'&applyStatus='+query.applyStatus,
        method: 'get'
    })
}

// 获取月结申请列表
export const getMonthlySettlementApplyList = query => {
    return request({
        url: '/MonthlySettlementApply/list?userId='+query.userId+'&applyStatus='+query.applyStatus,
        method: 'get'
    })
}

// 根据ID获取月结申请详情
export const getMonthlySettlementApplyById = query => {
    return request({
        url: '/MonthlySettlementApply?id='+query,
        method: 'get'
    })
}

// 新增月结申请
export const addMonthlySettlementApply = query => {
    return request({
        url: '/MonthlySettlementApply',
        method: 'post',
        data: query
    })
}

// 取消月结申请
export const cancelMonthlySettlementApply = query => {
    return request({
        url: '/MonthlySettlementApply/cancel?id='+query,
        method: 'put'
    })
}

// 审核月结申请
export const passOrOverrule = query => {
    return request({
        url: '/MonthlySettlementApply/passOrOverrule?id='+query.id+'&pereviewerId='+query.pereviewerId+'&type='+query.type+'&overrule='+query.overrule,
        method: 'put'
    })
}

// 删除月结申请
export const deleteMonthlySettlementApply = query => {
    return request({
        url: '/MonthlySettlementApply?id='+query,
        method: 'delete'
    })
} 
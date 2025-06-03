import request from '../utils/request'

// 获取月结账单分页列表
export const pageMonthlyStatement = query => {
    return request({
        url: '/MonthlyStatement/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&monthlySettlementEligibilityId='+query.monthlySettlementEligibilityId+'&userId='+query.userId+'&startTime='+query.startTime+'&endTime='+query.endTime+'&type='+query.type,
        method: 'get'
    })
}

// 获取月结账单列表
export const getMonthlyStatementList = query => {
    return request({
        url: '/MonthlyStatement/list?monthlySettlementEligibilityId='+query.monthlySettlementEligibilityId+'&userId='+query.userId,
        method: 'get'
    })
}

// 根据ID获取月结账单详情
export const getMonthlyStatementById = query => {
    return request({
        url: '/MonthlyStatement?id='+query,
        method: 'get'
    })
}

// 新增月结账单
export const addMonthlyStatement = query => {
    return request({
        url: '/MonthlyStatement',
        method: 'post',
        data: query
    })
}

// 新增月结账单
export const getAllPrice = query => {
    return request({
        url: '/MonthlyStatement/getAllPrice?id='+query.id+'&startTime='+query.startTime+'&endTime='+query.endTime+'&userId='+query.userId,
        method: 'get'
    })
}

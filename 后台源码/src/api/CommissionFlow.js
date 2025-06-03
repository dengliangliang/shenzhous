import request from '../utils/request'

// 获取佣金流水分页列表
export const pageCommissionFlow = query => {
    return request({
        url: '/CommissionFlow/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&flowType='+query.flowType+'&userId='+query.userId,
        method: 'get'
    })
}

// 获取佣金流水列表
export const getCommissionFlowList = query => {
    return request({
        url: '/CommissionFlow/list?flowType='+query.flowType+'&userId='+query.userId,
        method: 'get'
    })
}

// 根据ID获取佣金流水详情
export const getCommissionFlowById = query => {
    return request({
        url: '/CommissionFlow?id='+query,
        method: 'get'
    })
} 
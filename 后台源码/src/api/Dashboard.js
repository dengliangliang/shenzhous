import request from '../utils/request'

// 获取仪表盘概览数据
export const getDashboardData = () => {
    return request({
        url: '/Dashboard/overview',
        method: 'get'
    })
}

// 获取订单趋势数据
export const getOrderTrend = () => {
    return request({
        url: '/Dashboard/orderTrend',
        method: 'get'
    })
}

// 获取快递公司配送占比
export const getExpressDistribution = (type) => {
    return request({
        url: '/Dashboard/expressDistribution?type=' + type,
        method: 'get'
    })
}

// 获取待处理事项数量
export const getTodoCount = () => {
    return request({
        url: '/Dashboard/todoCount',
        method: 'get'
    })
}

// 获取最新系统公告
export const getLatestNotices = () => {
    return request({
        url: '/Notice/latest',
        method: 'get'
    })
}

// 添加系统公告
export const addNotice = (data) => {
    return request({
        url: '/Notice',
        method: 'post',
        data
    })
}

// 分页查询系统公告
export const pageNotice = (params) => {
    return request({
        url: '/Notice/page',
        method: 'get',
        params
    })
}

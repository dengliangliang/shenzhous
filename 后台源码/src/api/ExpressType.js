import request from '../utils/request'

// 获取寄件类型分页列表
export const pageExpressType = query => {
    return request({
        url: '/ExpressType/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&expressTypeName='+query.expressTypeName,
        method: 'get'
    })
}

// 获取寄件类型列表
export const getExpressTypeList = query => {
    return request({
        url: '/ExpressType/list?expressTypeName='+query.expressTypeName,
        method: 'get'
    })
}

// 根据ID获取寄件类型详情
export const getExpressTypeById = query => {
    return request({
        url: '/ExpressType?id='+query,
        method: 'get'
    })
}

// 新增寄件类型
export const addExpressType = query => {
    return request({
        url: '/ExpressType',
        method: 'post',
        data: query
    })
}

// 修改寄件类型
export const updateExpressType = query => {
    return request({
        url: '/ExpressType',
        method: 'put',
        data: query
    })
}

// 删除寄件类型
export const deleteExpressType = query => {
    return request({
        url: '/ExpressType?id='+query,
        method: 'delete'
    })
} 
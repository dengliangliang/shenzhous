import request from '../utils/request'

// 获取协议分页列表
export const pageAgreement = query => {
    return request({
        url: '/Agreement/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize,
        method: 'get'
    })
}

// 获取协议列表
export const getAgreementList = () => {
    return request({
        url: '/Agreement/list',
        method: 'get'
    })
}

// 根据类型获取协议详情
export const getAgreementById = query => {
    return request({
        url: '/Agreement?type='+query,
        method: 'get'
    })
}

// 新增协议
export const addAgreement = query => {
    return request({
        url: '/Agreement',
        method: 'post',
        data: query
    })
}

// 修改协议
export const updateAgreement = query => {
    return request({
        url: '/Agreement',
        method: 'put',
        data: query
    })
}

// 删除协议
export const deleteAgreement = query => {
    return request({
        url: '/Agreement?id='+query,
        method: 'delete'
    })
} 
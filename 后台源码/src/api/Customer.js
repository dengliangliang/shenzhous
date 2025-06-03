import request from '../utils/request'



// 根据类型获取协议详情
export const getCustomer = query => {
    return request({
        url: '/Customer',
        method: 'get'
    })
}



// 修改协议
export const updateCustomer = query => {
    return request({
        url: '/Customer',
        method: 'put',
        data: query
    })
}

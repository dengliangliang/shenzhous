import request from '../utils/request'

// 获取快递公司分页列表
export const pageExpress = query => {
    return request({
        url: '/Express/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&expressName='+query.expressName+'&deliveryType='+query.deliveryType,
        method: 'get'
    })
}

// 获取快递公司列表
export const getExpressList = query => {
    return request({
        url: '/Express/list?expressName='+query.expressName+'&deliveryType='+query.deliveryType,
        method: 'get'
    })
}

// 根据ID获取快递公司详情
export const getExpressById = query => {
    return request({
        url: '/Express?id='+query,
        method: 'get'
    })
}

// 修改快递公司利润
export const updateExpress = query => {
    return request({
        url: '/Express',
        method: 'put',
        data: query
    })
}

// 切换快递公司状态
export const toggleExpressStatus = query => {
    return request({
        url: '/Express',
        method: 'put',
        data: query
    })
} 

export const deliveryTrace=data=> {
  return request({
    url: '/YiDa/deliveryTrace',
    method: 'post',
    data
  })
}
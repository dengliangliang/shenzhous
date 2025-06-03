// 快递类型API
import request from '@/utils/request'

const BASE_URL = '/ExpressType'

export default {
  // 获取物品类型列表（将参数放在URL上）
  getExpressTypeList(expressTypeName = '') {
    return request({
      url: `${BASE_URL}/list${expressTypeName ? `?expressTypeName=${encodeURIComponent(expressTypeName)}` : ''}`,
      method: 'GET'
    })
  },
  
  // 分页获取物品类型（将参数放在URL上）
  getExpressTypePage(params) {
    const { pageNum = 0, pageSize = 5, expressTypeName = '' } = params;
    let url = `${BASE_URL}/page?pageNum=${pageNum}&pageSize=${pageSize}`;
    if (expressTypeName) {
      url += `&expressTypeName=${encodeURIComponent(expressTypeName)}`;
    }
    return request({
      url,
      method: 'GET'
    })
  },
  
  // 根据ID获取物品类型（将参数放在URL上）
  getExpressTypeById(id) {
    return request({
      url: `${BASE_URL}?id=${id}`,
      method: 'GET'
    })
  },
  
  // 新增物品类型
  addExpressType(data) {
    return request({
      url: `${BASE_URL}`,
      method: 'POST',
      data
    })
  },
  
  // 修改物品类型
  updateExpressType(data) {
    return request({
      url: `${BASE_URL}`,
      method: 'PUT',
      data
    })
  },
  
  // 删除物品类型（将参数放在URL上）
  deleteExpressType(id) {
    return request({
      url: `${BASE_URL}?id=${id}`,
      method: 'DELETE'
    })
  },

  // 获取物品类型列表 - 参数放在URL上
  getExpressTypes(params) {
    return request({
      url: `/api/express/types?pageSize=${params.pageSize || 10}&pageNum=${params.pageNum || 1}`,
      method: 'get'
    })
  }
} 
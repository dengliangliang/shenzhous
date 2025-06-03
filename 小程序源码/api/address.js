import request from '../utils/request'

export default {
  // 获取地址列表
  getAddressList(params) {
    const { userId, type, detailAddress } = params
    return request({
      url: `/UserAddress/list?userId=${userId}${type !== undefined ? `&type=${type}` : ''}${detailAddress ? `&detailAddress=${detailAddress}` : ''}`,
      method: 'get'
    })
  },

  // 获取分页地址列表
  getAddressPage(params) {
    const { pageNum = 1, pageSize = 10, userId, type, detailAddress } = params
    return request({
      url: `/UserAddress/page?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}${type !== undefined ? `&type=${type}` : ''}${detailAddress ? `&detailAddress=${detailAddress}` : ''}`,
      method: 'get'
    })
  },

  // 获取默认地址
  getDefaultAddress(userId) {
    return request({
      url: `/UserAddress/getDefault?id=${userId}`,
      method: 'get'
    })
  },

  // 获取单个地址详情
  getAddressById(id) {
    return request({
      url: `/UserAddress?id=${id}`,
      method: 'get'
    })
  },

  // 新增地址
  addAddress(data) {
    return request({
      url: '/UserAddress',
      method: 'post',
      data
    })
  },

  // 更新地址
  updateAddress(data) {
    return request({
      url: '/UserAddress',
      method: 'put',
      data
    })
  },

  // 删除地址
  deleteAddress(addressId) {
    return request({
      url: `/UserAddress?userAddressId=${addressId}`,
      method: 'delete'
    })
  }
} 
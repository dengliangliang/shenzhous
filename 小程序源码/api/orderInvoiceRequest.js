import request from '@/utils/request'

const orderInvoiceRequestApi = {
  /**
   * 获取发票抬头分页列表
   * @param {number} pageNum - 页码
   * @param {number} pageSize - 每页数量
   * @param {number} type - 类型(0:企业 1:个人)
   * @param {string} userId - 用户ID
   */
  getOrderInvoiceRequest({ pageNum = 1, pageSize = 10, type, userId,orderId }) {
    return request({
      url: `/OrderInvoiceRequest/page?pageNum=${pageNum}&pageSize=${pageSize}&type=${type}&userId=${userId}&orderId=${orderId}`,
      method: 'get'
    })
  },

  /**
   * 获取发票抬头列表
   * @param {number} type - 类型(0:企业 1:个人)
   * @param {string} userId - 用户ID
   */
  getOrderInvoiceRequestList({ type, userId }) {
    return request({
      url: `/OrderInvoiceRequest/list?type=${type}&userId=${userId}`,
      method: 'get'
    })
  },

  
  /**
   * 获取单个发票抬头
   * @param {string} id - 发票抬头ID
   */
  getOrderInvoiceRequestById(id) {
    return request({
      url: `/OrderInvoiceRequest?id=${id}`,
      method: 'get'
    })
  },

  /**
   * 新增发票抬头
   * @param {Object} invoice - 发票抬头信息
   */
  addOrderInvoiceRequest(data) {
    return request({
      url: '/OrderInvoiceRequest',
      method: 'post',
      data
    })
  },

  /**
   * 更新发票抬头
   * @param {Object} invoice - 发票抬头信息
   */
  updateOrderInvoiceRequest(data) {
    return request({
      url: '/OrderInvoiceRequest',
      method: 'put',
      data
    })
  },

  /**
   * 删除发票抬头
   * @param {string} id - 发票抬头ID
   */
  deleteOrderInvoiceRequest(id) {
    return request({
      url: `/OrderInvoiceRequest?id=${id}`,
      method: 'delete'
    })
  },
  
  
  
}

export default orderInvoiceRequestApi
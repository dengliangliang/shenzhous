import request from '@/utils/request'

const invoiceApi = {
  /**
   * 获取发票抬头分页列表
   * @param {number} pageNum - 页码
   * @param {number} pageSize - 每页数量
   * @param {number} type - 类型(0:企业 1:个人)
   * @param {string} userId - 用户ID
   */
  getInvoicePage({ pageNum = 1, pageSize = 10, type, userId }) {
    return request({
      url: `/InvoiceTitle/page?pageNum=${pageNum}&pageSize=${pageSize}&type=${type}&userId=${userId}`,
      method: 'get'
    })
  },

  /**
   * 获取发票抬头列表
   * @param {number} type - 类型(0:企业 1:个人)
   * @param {string} userId - 用户ID
   */
  getInvoiceList({ type, userId }) {
    return request({
      url: `/InvoiceTitle/list?type=${type}&userId=${userId}`,
      method: 'get'
    })
  },

  /**
   * 获取默认发票抬头
   * @param {string} id - 用户ID
   * @param {number} type - 类型(0:企业 1:个人)
   */
  getDefaultInvoice({ id, type }) {
    return request({
      url: `/InvoiceTitle/getDefault?id=${id}&type=${type}`,
      method: 'get'
    })
  },

  /**
   * 获取单个发票抬头
   * @param {string} id - 发票抬头ID
   */
  getInvoiceById(id) {
    return request({
      url: `/InvoiceTitle?id=${id}`,
      method: 'get'
    })
  },

  /**
   * 新增发票抬头
   * @param {Object} invoice - 发票抬头信息
   */
  addInvoice(invoice) {
    return request({
      url: '/InvoiceTitle',
      method: 'post',
      data: invoice
    })
  },

  /**
   * 更新发票抬头
   * @param {Object} invoice - 发票抬头信息
   */
  updateInvoice(invoice) {
    return request({
      url: '/InvoiceTitle',
      method: 'put',
      data: invoice
    })
  },

  /**
   * 删除发票抬头
   * @param {string} id - 发票抬头ID
   */
  deleteInvoice(id) {
    return request({
      url: `/InvoiceTitle?id=${id}`,
      method: 'delete'
    })
  },

  /**
   * 获取订单发票申请记录
   * @param {Object} params - 查询参数
   * @param {string} params.userId - 用户ID
   * @param {string} params.orderId - 订单ID
   */
  getOrderInvoiceRequest({ userId, orderId }) {
    return request({
      url: `/OrderInvoiceRequest/list?userId=${userId}&orderId=${orderId}`,
      method: 'get'
    })
  },

  /**
   * 提交发票申请
   * @param {Object} data - 申请数据
   */
  addOrderInvoiceRequest(data) {
    return request({
      url: '/OrderInvoiceRequest',
      method: 'post',
      data
    })
  }
}

export default invoiceApi 
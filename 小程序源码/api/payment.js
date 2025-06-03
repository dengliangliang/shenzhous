// 微信支付相关API
import request from '@/utils/request' // 假设你已经有一个请求封装

export default {
  /**
   * 创建微信支付订单
   * @param {Object} data 订单数据
   * @returns {Promise} 支付参数
   */
  createOrder(data) {
    return request({
      url: '/PaymentFlow',
      method: 'POST',
      data
    })
  },
  
  /**
   * 查询订单支付状态
   * @param {String} orderId 订单ID
   * @returns {Promise} 订单状态
   */
  queryOrderStatus(orderId) {
    return request({
      url: `/PaymentFlow/${orderId}`,
      method: 'GET'
    })
  },
  
  batchesAdd(data) {
    return request({
      url: '/PaymentFlow/batchesAdd',
      method: 'post',
      data
    })
  },
  
  /**
   * 创建退款流水记录
   * @param {Object} data 退款数据
   * @returns {Promise} 退款记录结果
   */
  createRefund(data) {
    return request({
      url: '/PaymentFlow/refund',
      method: 'POST',
      data
    })
  },
}
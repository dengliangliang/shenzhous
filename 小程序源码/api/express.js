import request from '../utils/request'

export default {
 
  queryExpressOptions(data) {
    return request({
      url: '/YiDa/smartPreOrder',
      method: 'post',
      data
    })
  },

  // 创建快递订单
  createExpress(data) {
    return request({
      url: '/YiDa/createOrder',
      method: 'post',
      data
    })
  },
  
  cancelExpress(data) {
    return request({
      url: '/YiDa/cancelOrder',
      method: 'post',
      data
    })
  },

  deliveryTrace(data) {
    return request({
      url: '/YiDa/deliveryTrace',
      method: 'post',
      data
    })
  },
  
  getExpressList(){
	  return request({
	    url: '/Express/list',
	    method: 'get'
	  })
  }

  // 查询快递选项 (可选功能，如果API支持)
//  queryExpressOptions(params) {
//     return request({
//       url: '/YiDa/queryExpressOptions',
//       method: 'post',
//       data: params
//     })
//   } 
} 
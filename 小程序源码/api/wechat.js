import request from '../utils/request'

export default {
 createPayOrder(openId,orderId,amount,description) {
   return new Promise((resolve, reject) => {
     uni.showLoading({
       title: '处理中...',
       mask: true
     });
     
     uni.request({
       url: "https://shenzhoupost.cn/shenzhoupost" + '/WxPay/createOrder',
       method: 'POST',
       header: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': uni.getStorageSync('token')
       },
       data: {
         orderId:orderId,
         openId,
         amount,
         description
       },
       success: (res) => {
         uni.hideLoading();
         console.log('支付订单创建结果:', res);
         resolve(res.data);
       },
       fail: (err) => {
         uni.hideLoading();
         console.error('支付订单创建失败:', err);
         reject(err);
       }
     });
   });
 },
 
 // 调起微信支付
 callWxPay(payParams, orderId) {
   return new Promise((resolve, reject) => {
     uni.showLoading({
       title: '拉起支付...',
       mask: true
     });
     
     uni.requestPayment({
       ...payParams,
       success: (res) => {
         uni.hideLoading();
         console.log('支付成功', res);
         
         // 支付成功后查询订单状态
         this.queryOrderStatus(orderId)
           .then(result => {
             if (result.success) {
               resolve({
                 success: true,
                 message: '支付成功'
               });
             } else {
               // 订单状态不是成功
               resolve({
                 success: false,
                 message: result.message || '支付状态异常'
               });
             }
           })
           .catch(err => {
             // 查询状态失败但支付可能已成功
             resolve({
               success: true,
               message: '支付可能已成功，请稍后查询订单状态'
             });
           });
       },
       fail: (err) => {
         uni.hideLoading();
         console.log('支付失败', err);
         
         if (err.errMsg === 'requestPayment:fail cancel') {
           reject({
             success: false,
             message: '用户取消支付',
             canceled: true
           });
         } else {
           reject({
             success: false,
             message: err.errMsg || '支付失败',
             canceled: false
           });
         }
       }
     });
   });
 },
 
 // 查询订单状态
 queryOrderStatus(orderId) {
   return new Promise((resolve, reject) => {
     uni.showLoading({
       title: '验证支付结果...',
       mask: true
     });
     
     uni.request({
       url: "https://shenzhoupost.cn/shenzhoupost" + `/WxPay/queryOrder`,
       method: 'GET',
       header: {
         'Authorization': uni.getStorageSync('token')
       },
       data: {
         orderId: orderId
       },
       success: (res) => {
         uni.hideLoading();
         console.log('订单状态查询结果:', res.data);
         if (res.data.code === 200 && res.data.data) {
           const state = res.data.data.trade_state;
           if (state === 'SUCCESS') {
             resolve({
               success: true,
               message: '支付成功',
               state: state
             });
           } else if (state === 'NOTPAY' || state === 'USERPAYING') {
             resolve({
               success: false,
               message: '支付处理中，请稍候',
               state: state
             });
           } else {
             resolve({
               success: false,
               message: res.data.data.trade_state_desc || '支付异常',
               state: state
             });
           }
         } else {
           reject({
             success: false,
             message: '查询支付结果失败'
           });
         }
       },
       fail: (err) => {
         uni.hideLoading();
         console.error('查询订单状态失败', err);
         reject({
           success: false,
           message: '查询支付结果失败'
         });
       }
     });
   });
 },
 
 // 完整支付流程(创建订单+支付+查询结果)
 async processPayment(openId, orderId, amount, description) {
   try {
     // 1. 创建支付订单
     const payOrderRes = await this.createPayOrder(openId, orderId, amount, description);
     if (payOrderRes.code !== 200 || !payOrderRes.data) {
       return {
         success: false,
         message: payOrderRes.message || '创建支付订单失败'
       };
     }
     
     // 2. 调起支付并等待结果
     const payResult = await this.callWxPay(payOrderRes.data, orderId);
     return payResult;
   } catch (error) {
     console.error('支付流程异常:', error);
     return {
       success: false,
       message: error.message || '支付过程发生异常',
       canceled: error.canceled || false
     };
   }
 },
 
 // 申请退款
 applyRefund(orderId, refundAmount, reason) {
   return new Promise((resolve, reject) => {
     uni.showLoading({
       title: '申请退款中...',
       mask: true
     });
     
     uni.request({
       url: "https://shenzhoupost.cn/shenzhoupost" + '/WxPay/refund',
       method: 'POST',
       header: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': uni.getStorageSync('token')
       },
       data: {
         orderId: orderId,
         refundAmount: refundAmount,
         reason: reason
       },
       success: (res) => {
         uni.hideLoading();
         console.log('退款申请结果:', res.data);
         if (res.data.code === 200) {
           resolve({
             success: true,
             message: '退款申请成功',
             data: res.data.data
           });
         } else {
           resolve({
             success: false,
             message: res.data.message || '退款申请失败',
             data: res.data.data
           });
         }
       },
       fail: (err) => {
         uni.hideLoading();
         console.error('退款申请失败:', err);
         reject({
           success: false,
           message: '退款申请失败，请稍后重试'
         });
       }
     });
   });
 },
 
 // 查询退款状态
 queryRefundStatus(orderId, refundId) {
   return new Promise((resolve, reject) => {
     uni.showLoading({
       title: '查询退款状态...',
       mask: true
     });
     
     const params = { orderId };
     if (refundId) {
       params.refundId = refundId;
     }
     
     uni.request({
       url: "https://shenzhoupost.cn/shenzhoupost" + '/WxPay/queryRefund',
       method: 'GET',
       header: {
         'Authorization': uni.getStorageSync('token')
       },
       data: params,
       success: (res) => {
         uni.hideLoading();
         console.log('退款状态查询结果:', res.data);
         if (res.data.code === 200 && res.data.data) {
           const refundStatus = res.data.data.status;
           if (refundStatus === 'SUCCESS') {
             resolve({
               success: true,
               message: '退款成功',
               status: refundStatus,
               data: res.data.data
             });
           } else if (refundStatus === 'PROCESSING') {
             resolve({
               success: false,
               message: '退款处理中',
               status: refundStatus,
               data: res.data.data
             });
           } else if (refundStatus === 'ABNORMAL') {
             resolve({
               success: false,
               message: '退款异常',
               status: refundStatus,
               data: res.data.data
             });
           } else {
             resolve({
               success: false,
               message: res.data.data.status_desc || '退款状态异常',
               status: refundStatus,
               data: res.data.data
             });
           }
         } else {
           reject({
             success: false,
             message: '查询退款状态失败'
           });
         }
       },
       fail: (err) => {
         uni.hideLoading();
         console.error('查询退款状态失败:', err);
         reject({
           success: false,
           message: '查询退款状态失败，请稍后重试'
         });
       }
     });
   });
 }
} 
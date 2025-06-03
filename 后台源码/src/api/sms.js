import request from '../utils/request'

//提醒补差价
export const sendPriceDiff = query => {
    return request({
        url: '/api/sms/sendPriceDiff?phoneNumber='+query.phoneNumber+'&orderId='+query.orderId,
        method: 'get'
    })
}

//提醒订单待付款
export const sendReminderPayment = query => {
    return request({
        url: '/api/sms/sendReminderPayment?phoneNumber='+query.phoneNumber+'&orderId='+query.orderId,
        method: 'get'
    })
}

//提醒月结账单信息
export const sendMonthly = query => {
    return request({
        url: '/api/sms/sendMonthly?phoneNumber='+query.phoneNumber,
        method: 'get'
    })
}
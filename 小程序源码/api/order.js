import request from '../utils/request'

export default {
	// 分页获取订单列表
	getOrderPage(params) {
		const {
			pageNum = 1, pageSize = 10, userId, orderStatus, paymentMethod, shippingStatus, isPriceDifferencePaid,
				searchValue, phone
		} = params
		return request({
			url: `/Order/page?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}&orderStatus=${orderStatus}&searchValue=${searchValue}&paymentMethod=${paymentMethod}&shippingStatus=${shippingStatus}&isPriceDifferencePaid=${isPriceDifferencePaid}&phone=${phone}`,
			method: 'get'
		})
	},

	getDone(params) {
		const {
			pageNum = 1, pageSize = 10, userId
		} = params
		return request({
			url: `/Order/getDone?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`,
			method: 'get'
		})
	},

	// 获取订单详情
	getOrderById(orderId) {
		return request({
			url: `/Order?id=${orderId}`,
			method: 'get'
		})
	},

	// 创建订单
	createOrder(data) {
		return request({
			url: '/Order',
			method: 'post',
			data
		})
	},

	// 删除订单
	deleteOrder(orderId) {
		return request({
			url: `/Order?id=${orderId}`,
			method: 'delete'
		})
	},

	// 支付订单
	payOrder(orderId) {
		return request({
			url: `/Order/pay?orderId=${orderId}`,
			method: 'post'
		})
	},

	// 取消订单
	cancelOrder(orderId) {
		return request({
			url: `/Order/cancel?orderId=${orderId}`,
			method: 'post'
		})
	},

	// 确认收货
	confirmOrder(orderId) {
		return request({
			url: `/Order/confirm?orderId=${orderId}`,
			method: 'post'
		})
	},

	// 支付差价
	payPriceDifference(orderId) {
		return request({
			url: `/Order/payDifference?orderId=${orderId}`,
			method: 'post'
		})
	},

	// 更新订单差价
	updatePriceDifference(orderId, priceDifference) {
		return request({
			url: `/Order/updateDifference`,
			method: 'post',
			data: {
				orderId,
				priceDifference
			}
		})
	},

	// 更新订单差价
	updateOrderStatus(orderId, status, isPriceDifferencePaid, wechatId, orderNo, deliverId) {
		return request({
			url: `/Order/updateOrderStatus?orderId=` + orderId + '&status=' + status +
				"&isPriceDifferencePaid=" + isPriceDifferencePaid + '&wechatId=' + wechatId +
				"&orderNo=" + orderNo + '&deliverId=' + deliverId,
			method: 'post'

		})
	},

	batchesAdd(data) {
		return request({
			url: '/Order/batchesAdd',
			method: 'post',
			data
		})
	},
}
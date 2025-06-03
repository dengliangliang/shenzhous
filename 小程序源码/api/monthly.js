import request from '@/utils/request'

const monthlyApi = {
	/**
	 * 获取月结资格分页列表
	 * @param {Object} params
	 * @param {number} params.pageNum - 页码
	 * @param {number} params.pageSize - 每页数量
	 * @param {string} params.userId - 用户ID
	 * @param {number} params.settlementCycle - 结算周期(0:月结 1:季结 2:半年结)
	 */
	getEligibilityPage({
		pageNum = 1,
		pageSize = 10,
		userId,
		settlementCycle
	}) {
		const url =
			`/MonthlySettlementEligibility/page?pageNum=${pageNum}&pageSize=${pageSize}${userId ? `&userId=${userId}` : ''}${settlementCycle !== undefined ? `&settlementCycle=${settlementCycle}` : ''}`
		return request({
			url,
			method: 'get'
		})
	},

	/**
	 * 获取月结资格列表
	 * @param {Object} params
	 * @param {string} params.userId - 用户ID
	 * @param {number} params.settlementCycle - 结算周期(0:月结 1:季结 2:半年结)
	 */
	getEligibilityList({
		userId,
		settlementCycle
	}) {
		const url =
			`/MonthlySettlementEligibility/list${userId ? `?userId=${userId}` : ''}${settlementCycle !== undefined ? `${userId ? '&' : '?'}settlementCycle=${settlementCycle}` : ''}`
		return request({
			url,
			method: 'get'
		})
	},

	/**
	 * 获取单个月结资格
	 * @param {string} id - 月结资格ID
	 */
	getEligibilityById(id) {
		return request({
			url: `/MonthlySettlementEligibility?id=${id}`,
			method: 'get'
		})
	},

	/**
	 * 获取月结申请分页列表
	 * @param {Object} params
	 * @param {number} params.pageNum - 页码
	 * @param {number} params.pageSize - 每页数量
	 * @param {string} params.userId - 用户ID
	 * @param {number} params.applyStatus - 申请状态(0:审核中 1:已通过 2:已驳回)
	 */
	getApplyPage({
		pageNum = 1,
		pageSize = 10,
		userId,
		applyStatus
	}) {
		const url =
			`/MonthlySettlementApply/page?pageNum=${pageNum}&pageSize=${pageSize}${userId ? `&userId=${userId}` : ''}${applyStatus !== undefined ? `&applyStatus=${applyStatus}` : ''}`
		return request({
			url,
			method: 'get'
		})
	},

	/**
	 * 获取月结申请列表
	 * @param {Object} params
	 * @param {string} params.userId - 用户ID
	 * @param {number} params.applyStatus - 申请状态(0:审核中 1:已通过 2:已驳回)
	 */
	getApplyList({
		userId,
		applyStatus
	}) {
		const url =
			`/MonthlySettlementApply/list${userId ? `?userId=${userId}` : ''}${applyStatus !== undefined ? `${userId ? '&' : '?'}applyStatus=${applyStatus}` : ''}`
		return request({
			url,
			method: 'get'
		})
	},

	/**
	 * 获取单个月结申请
	 * @param {string} id - 申请ID
	 */
	getApplyById(id) {
		return request({
			url: `/MonthlySettlementApply?id=${id}`,
			method: 'get'
		})
	},

	/**
	 * 提交月结申请
	 * @param {Object} apply - 申请信息
	 * @param {string} apply.userId - 用户ID
	 * @param {number} apply.accountType - 账户类型(0:企业 1:个人)
	 * @param {string} apply.name - 联系人
	 * @param {string} apply.phone - 联系电话
	 * @param {string} apply.address - 联系地址
	 * @param {string} apply.email - 电子邮箱
	 * @param {string} apply.startTime - 月结起始日期
	 * @param {string} apply.endTime - 月结截止日期
	 * @param {number} apply.minimumAmount - 每月最低寄件量
	 * @param {string} apply.remark - 特殊要求
	 * @param {number} apply.settlementCycle - 结算周期(0:月结 1:季结 2:半年结)
	 * @param {number} apply.invoiceRequirement - 发票要求(0:增值税普通发票 1:增值税专用发票 2:其他)
	 * @param {string} apply.idCardPortraitPhoto - 身份证人像面照片
	 * @param {string} apply.idCardEmblemPhoto - 身份证国徽面照片
	 * @param {string} apply.businessLicense - 营业执照(企业账户必填)
	 */
	addApply(apply) {
		return request({
			url: '/MonthlySettlementApply',
			method: 'post',
			data: apply
		})
	},

	/**
	 * 取消月结申请
	 * @param {string} id - 申请ID
	 */
	cancelApply(id) {
		return request({
			url: `/MonthlySettlementApply/cancel?id=${id}`,
			method: 'put'
		})
	},

	/**
	 * 删除月结申请
	 * @param {string} id - 申请ID
	 */
	deleteApply(id) {
		return request({
			url: `/MonthlySettlementApply?id=${id}`,
			method: 'delete'
		})
	},

	/**
	 * 注销月结资格
	 * @param {string} id - 月结资格ID
	 */
	logoffEligibility(id) {
		return request({
			url: `/MonthlySettlementEligibility/logoff?id=${id}`,
			method: 'put'
		})
	},

	/**
	 * 检查月结资格是否有效
	 * @param {string} id - 月结资格ID
	 * @returns {Promise<number>} 0-无效 1-有效
	 */
	checkEffective(id, code) {
		return request({
			url: `/MonthlySettlementEligibility/isEffective?id=${id}&code=${code}`,
			method: 'get'
		})
	},
	getUser(id) {
		return request({
			url: `/MonthlySettlementEligibility/getUser?id=${id}`,
			method: 'GET'
		})
	},
	// api/monthly.js
	updatePassword(id, oldPassword, newPassword, userId) {
		return request({
			url: `/MonthlySettlementEligibility/updatePassword?id=${id}&oldPassword=${oldPassword}&newPassword=${newPassword}&userId=${userId}`,
			method: 'PUT'
		})
	},

	/**
	 * 获取月结资格的用户列表
	 * @param {string} id - 月结资格ID
	 */
	getEligibilityUsers(id) {
		return request({
			url: `/MonthlySettlementEligibility/getUsers?id=${id}`,
			method: 'GET'
		})
	},
	
	batchesAdd(data) {
	  return request({
	    url: '/MonthlyStatement/batchesAdd',
	    method: 'post',
	    data
	  })
	},
}

export default monthlyApi
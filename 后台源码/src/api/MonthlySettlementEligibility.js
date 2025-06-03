import request from '../utils/request'

// 获取月结资格分页列表
export const pageMonthlySettlementEligibility = query => {
	return request({
		url: '/MonthlySettlementEligibility/page?pageNum=' + query.pageIndex + '&pageSize=' + query
			.pageSize + '&userId=' + query.userId + '&settlementCycle=' + query.settlementCycle,
		method: 'get'
	})
}

// 获取月结资格列表
export const getMonthlySettlementEligibilityList = query => {
	return request({
		url: '/MonthlySettlementEligibility/list?userId=' + query.userId + '&settlementCycle=' + query
			.settlementCycle,
		method: 'get'
	})
}

// 根据ID获取月结资格详情
export const getMonthlySettlementEligibilityById = query => {
	return request({
		url: '/MonthlySettlementEligibility?id=' + query,
		method: 'get'
	})
}

export const logoffEligibility= id => {
	return request({
		url: `/MonthlySettlementEligibility/logoff?id=${id}`,
		method: 'put'
	})
}
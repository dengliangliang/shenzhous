import request from '../utils/request';


export const pageUser = query => {
	// console.log(query)
	return request({
		url: '/User/page?pageNum=' + query.pageIndex + '&pageSize=' + query.pageSize + "&identity=" + query
			.identity + '&isReal=' + query.isReal + '&userName=' + query.userName,
		method: 'get'

	});
};

export const getUserList = query => {
	// console.log(query)
	return request({
		url: '/User/list?identity=' + query.identity + '&isReal=' + query.isReal + '&userName=' + query
			.userName,
		method: 'get'
	});
};

export const getUserById = query => {
	// console.log(query)
	return request({
		url: '/User?userId=' + query,
		method: 'get'
	});
};

export const addUser = query => {
	// console.log(query)
	return request({
		url: '/User',
		method: 'post',
		data: query
	});
};


export const updateUser = query => {
	// console.log(query)
	return request({
		url: '/User',
		method: 'put',
		data: query
	});
};
// 修改全部用户佣金
export const setGetMoney = params => {
	return request({
		url: `/User/setGetMoney?money=${params}`,
		method: 'put'
	})
};
export const updateUserPassword = query => {
	// console.log(query)
	return request({
		url: '/User/updatePassword?userId=' + query.userId + '&oldPassword=' + query.oldPassword +
			'&newPassword=' + query.newPassword,
		method: 'put'
	});
};

export const changeNewPassword = query => {
	// console.log(query)
	return request({
		url: '/User/updateNewPassword?userId=' + query.userId + '&newPassword=' + query.newPassword,
		method: 'put'
	});
};


export const deleteUser = query => {
	return request({
		url: '/User?userId=' + query,
		method: 'delete'
	});
};

/**
 * 导出用户信息Excel表格
 * @param {Object} query - 查询参数
 * @param {number} query.identity - 用户身份（0为管理员，1为普通用户）
 * @param {string} [query.isReal] - 实名状态（可选）
 * @param {string} [query.userName] - 用户名（可选）
 * @returns {Promise<Blob>} - 返回Excel文件的Blob对象
 */
export const exportUsers = query => {
	return request({
		url: '/User/export',
		method: 'get',
		params: {
			identity: 1,
			isReal: query.isReal || '',
			userName: query.userName || ''
		},
		responseType: 'blob' // 指定响应类型为blob
	});
};
import request from '../utils/request'
import { baseUrl } from '../config/env'

// 用户相关接口
export default {
  // 注册
  register(data) {
    console.log('调用注册API，参数:', data)
    return request({
      url: '/UserLogin/register',
      method: 'post',
      data
    })
  },

  // 登录
  login(query) {
    const phone = encodeURI(query.phone)
    const password = encodeURI(query.password)
	const code = encodeURI(query.wxCode)

    return request({
      url: `/UserLogin/login?phone=${phone}&password=${password}&wxCode=${code}`,
      method: 'post'
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request.get('/user/info')
  },
  
  // 忘记密码
  forgotPassword(data) {
	  return request({
	    url: '/UserLogin/forgotPassword?phone=' + data.phone+'&newPassword='+data.newPassword+'&code='+data.code,
	    method: 'put'
	  })
    
  },
  
  // 获取验证码
  sendCode(data) {
  	  return request({
  	    url: '/api/sms/sendCode?phoneNumber=' + data.phone,
  	    method: 'get'
  	  })
    
  },
  // 获取验证码
  isRealByPhone(data) {
  	  return request({
  	    url: '/User/isRealByPhone?phone=' + data,
  	    method: 'get'
  	  })
    
  },
  

  // 修改密码
  changePassword({ oldPassword, newPassword }) {
    return request.put('/user/password', {
      oldPassword,
      newPassword
    })
  },
  


  // 退出登录
  logout() {
    return request.post('/UserLogin/logout')
  },

  // 新增用户
  addUser(data) {
    return request({
      url: '/User',
      method: 'post',
      data
    })
  },

  // 修改普通用户信息
  updateRegularUser(data) {
    return request({
      url: '/User/updateRegularUser',
      method: 'put',
      data
    })
  },

  // 修改密码
  updatePassword(params) {
    const { userId, oldPassword, newPassword } = params
    return request({
      url: `/User/updatePassword?userId=${userId}&oldPassword=${encodeURI(oldPassword)}&newPassword=${encodeURI(newPassword)}`,
      method: 'put'
    })
  },
  
  


  // 删除用户
  deleteUser(userId) {
    return request({
      url: '/User?userId=' + userId,
      method: 'delete'
    })
  },

  // 根据ID获取用户信息
  getUserById(userId) {
    return request({
      url: '/User?userId=' + userId,
      method: 'get'
    })
  },
 

  /**
   * 输入月结资格密码
   * @param {string} userId - 用户ID
   * @param {string} code - 月结资格密码
   */
  inputCode(userId, code) {
    return request({
      url: `/User/inputCode?userId=${userId}&code=${code}`,
      method: 'put'
    })
  },

  /**
   * 更新用户信息
   * @param {Object} user - 用户信息
   */
  updateUser(user) {
    return request({
      url: '/User',
      method: 'put',
      data: user
    })
  },
  
  authentication(userId, userName,identification,phone) {
    return request({
      url: `/User/authentication?userId=${userId}&userName=${userName}&identification=${identification}&phone=${phone}`,
      method: 'post'
    })
  },
  
  /**
   * 获取微信小程序码
   * @param {Object} params - 参数对象
   * @param {string} params.page - 小程序页面路径，默认是pages/index/index
   * @param {string} params.scene - 小程序参数，用于传递参数给小程序页面
   * @returns {Promise} 返回包含小程序码的Promise
   */
  getWxacode(params) {
    return request({
      url: '/User/wxacode',
      method: 'get',
      params,
      responseType: 'blob' // 指定响应类型为blob，用于处理图片数据
    })
  }
}

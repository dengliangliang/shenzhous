import request from '../utils/request'

export default {
  
  // 获取协议
  getAgreement(params) {
    // const { agreementType } = params
    const { pageNum = 1, pageSize = 10, agreementType } = params
    return request({
      url: `/Agreement/page?pageNum=${pageNum}&pageSize=${pageSize}&agreementType=${agreementType}`,
      // url: `/agreement/get?agreementType=${agreementType}`,
      method: 'get'
    })
  },

  // 获取隐私协议
  getPrivacyAgreement() {
    return this.getAgreement({ agreementType: 0 })
  },

  // 获取快递协议
  getExpressAgreement() {
    return this.getAgreement({ agreementType: 1 })
  },

  // 获取违禁品说明
  getProhibitedItems() {
    return this.getAgreement({ agreementType: 2 })
  },

  // 获取用户协议
  getUserAgreement() {
    return this.getAgreement({ agreementType: 3 })
  },
  
  // 获取月结服务
  getMonthlyService() {
    return this.getAgreement({ agreementType: 4 })
  }
} 
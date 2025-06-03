import request from '@/utils/request'

const commissionFlowApi = {
  /**
   * 获取单个佣金流动详情
   * @param {String} id - 佣金流动ID
   */
  getCommissionFlowById(id) {
    return request({
      url: `/CommissionFlow?id=${id}`,
      method: 'get'
    })
  },
  
  addCommissionFlow(data) {
    return request({
      url: `/CommissionFlow`,
      method: 'post',
	  data
    })
  },

  /**
   * 分页获取佣金流动
   * @param {Number} pageNum - 页码
   * @param {Number} pageSize - 每页数量
   * @param {Number} flowType - 流动类型
   * @param {String} userId - 用户ID
   */
  pageCommissionFlow({ pageNum = 1, pageSize = 5, flowType, userId }) {
    return request({
      url: `/CommissionFlow/page?pageNum=${pageNum}&pageSize=${pageSize}${flowType !== undefined ? `&flowType=${flowType}` : ''}${userId ? `&userId=${userId}` : ''}`,
      method: 'get'
    })
  },

  /**
   * 获取佣金流动列表
   * @param {Number} flowType - 流动类型
   * @param {String} userId - 用户ID
   */
  getCommissionFlowList({ flowType, userId }) {
    return request({
      url: `/CommissionFlow/list${flowType !== undefined ? `?flowType=${flowType}` : ''}${userId ? `${flowType !== undefined ? '&' : '?'}userId=${userId}` : ''}`,
      method: 'get'
    })
  },
  batchesAdd(data) {
    return request({
      url: '/CommissionFlow/batchesAdd',
      method: 'post',
      data
    })
  },
}

export default commissionFlowApi 
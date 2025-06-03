import request from '@/utils/request'

// 月结账单相关接口
export default {
  /**
   * 创建月结账单
   * @param {Object} data - 月结账单数据
   */
  createStatement(data) {
    return request({
      url: '/MonthlyStatement',
      method: 'POST',
      data
    })
  },
  
  /**
   * 获取单个月结账单详情
   * @param {String} id - 月结账单ID
   */
  getStatementById(id) {
    return request({
      url: `/MonthlyStatement?id=${id}`,
      method: 'GET'
    })
  },
  
  /**
   * 分页获取月结账单
   * @param {Number} pageNum - 页码
   * @param {Number} pageSize - 每页数量
   * @param {String} monthlySettlementEligibilityId - 月结资格ID
   * @param {String} userId - 用户ID
   * @param {String} startTime - 开始时间
   * @param {String} endTime - 结束时间
   * @param {Number} type - 类型
   */
  pageStatement(pageNum, pageSize, monthlySettlementEligibilityId, userId, startTime, endTime, type) {
    let url = `/MonthlyStatement/page?pageNum=${pageNum}&pageSize=${pageSize}`;
    
    if (monthlySettlementEligibilityId) {
      url += `&monthlySettlementEligibilityId=${monthlySettlementEligibilityId}`;
    }
    
    if (userId) {
      url += `&userId=${userId}`;
    }
    
    if (startTime) {
      url += `&startTime=${startTime}`;
    }
    
    if (endTime) {
      url += `&endTime=${endTime}`;
    }
    
    if (type !== undefined && type !== null) {
      url += `&type=${type}`;
    }
    
    return request({
      url,
      method: 'GET'
    })
  },

  getAllPrice(id,startTime, endTime,userId) {
    let url = `/MonthlyStatement/getAllPrice?id=${id}`;
    
    if (userId) {
      url += `&userId=${userId}`;
    }
    
    if (startTime) {
      url += `&startTime=${startTime}`;
    }
    
    if (endTime) {
      url += `&endTime=${endTime}`;
    }
    
    return request({
      url,
      method: 'GET'
    })
  },
  
  payBills(id,startTime, endTime) {
    let url = `/MonthlyStatement/payBills?id=${id}`;
    
    if (startTime) {
      url += `&startTime=${startTime}`;
    }
    
    if (endTime) {
      url += `&endTime=${endTime}`;
    }
    
    return request({
      url,
      method: 'GET'
    })
  },
  
  /**
   * 获取月结账单列表
   * @param {String} monthlySettlementEligibilityId - 月结资格ID
   * @param {String} userId - 用户ID
   */
  getStatementList(monthlySettlementEligibilityId, userId) {
    let url = '/MonthlyStatement/list?';
    
    if (monthlySettlementEligibilityId) {
      url += `monthlySettlementEligibilityId=${monthlySettlementEligibilityId}&`;
    }
    
    if (userId) {
      url += `userId=${userId}`;
    }
    
    // 移除末尾多余的 & 或 ?
    if (url.endsWith('&') || url.endsWith('?')) {
      url = url.slice(0, -1);
    }
    
    return request({
      url,
      method: 'GET'
    })
  },
  
  /**
   * 创建月结账单支付订单
   * @param {Object} data - 支付相关数据
   * @param {String} data.monthlySettlementEligibilityId - 月结资格ID
   * @param {Number} data.amount - 支付金额
   * @param {Array} data.statementIds - 需要结算的账单ID列表
   */
  createMonthlyPayment(data) {
    return request({
      url: '/MonthlyStatement/payment',
      method: 'POST',
      data
    })
  }
} 
import request from '@/utils/request'

const postalApi = {
  /**
   * 获取省市区数据
   */
  getProvinceCity() {
    return request({
      url: '/Postal/getProvinceCity',
      method: 'get'
    })
  },

  /**
   * 查询邮政编码
   * @param {Object} params 查询参数
   * @param {number} params.pid - 省份ID
   * @param {number} params.cid - 城市ID
   * @param {number} [params.did] - 区县ID（可选）
   * @param {string} [params.q] - 搜索关键词（可选）
   * @param {number} [params.pageNum=1] - 页码
   * @param {number} [params.pageSize=20] - 每页条数
   */
  getPostal(params) {
    const { pid, cid, did = '', q = '', pageNum = 1, pageSize = 20 } = params
    return request({
      url: `/Postal/getPostal?pid=${pid}&cid=${cid}&did=${did}&q=${q}&pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'get'
    })
  }
}

export default postalApi 
import request from '../utils/request'

// 公告相关接口
export default {
  // 获取公告列表
  getNoticeList() {
    return request({
      url: '/Notice/list',
      method: 'get'
    })
  },

  // 获取最新公告
  getLatestNotices() {
    return request({
      url: '/Notice/latest',
      method: 'get'
    })
  },

  // 分页获取公告
  pageNotice(pageNum = 1, pageSize = 10, type) {
    let url = `/Notice/page?pageNum=${pageNum}&pageSize=${pageSize}`
    if (type !== undefined) {
      url += `&type=${type}`
    }
    return request({
      url,
      method: 'get'
    })
  },

  // 添加公告
  addNotice(notice) {
    return request({
      url: '/Notice',
      method: 'post',
      data: notice
    })
  },

  // 修改公告
  updateNotice(notice) {
    return request({
      url: '/Notice',
      method: 'put',
      data: notice
    })
  },

  // 删除公告
  deleteNotice(noticeId) {
    return request({
      url: `/Notice/${noticeId}`,
      method: 'delete'
    })
  }
} 
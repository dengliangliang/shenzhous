import request from '../utils/request'

// 获取公告列表
export const getNoticeList = () => {
    return request({
        url: '/Notice/list',
        method: 'get'
    })
}

// 获取最新公告
export const getLatestNotices = () => {
    return request({
        url: '/Notice/latest',
        method: 'get'
    })
}

// 分页查询公告
export const pageNotice = (params) => {
    return request({
        url: '/Notice/page',
        method: 'get',
        params
    })
}

// 添加公告
export const addNotice = (data) => {
    return request({
        url: '/Notice',
        method: 'post',
        data
    })
}

// 修改公告
export const updateNotice = (data) => {
    return request({
        url: '/Notice',
        method: 'put',
        data
    })
}

// 删除公告
export const deleteNotice = (noticeId) => {
    return request({
        url: `/Notice/${noticeId}`,
        method: 'delete'
    })
} 
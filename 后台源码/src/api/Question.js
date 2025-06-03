import request from '../utils/request'


export const pageQuestion = query => {
    return request({
        url: '/Question/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize,
        method: 'get'
    })
}


export const getQuestionList = () => {
    return request({
        url: '/Question',
        method: 'get'
    })
}


// 新增协议
export const addQuestion = query => {
    return request({
        url: '/Question',
        method: 'post',
        data: query
    })
}


export const updateQuestion = query => {
    return request({
        url: '/Question',
        method: 'put',
        data: query
    })
}


export const deleteQuestion = query => {
    return request({
        url: '/Question?questionId='+query,
        method: 'delete'
    })
} 
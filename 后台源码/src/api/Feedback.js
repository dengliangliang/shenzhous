import request from '../utils/request'


export const pageFeedback = query => {
    return request({
        url: '/Feedback/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize+'&type='+query.type,
        method: 'get'
    })
}

export const getFeedbackList = () => {
    return request({
        url: '/Feedback',
        method: 'get'
    })
}



export const addFeedback = query => {
    return request({
        url: '/Feedback',
        method: 'post',
        data: query
    })
}



export const deleteFeedback = query => {
    return request({
        url: '/Feedback?feedbackId='+query,
        method: 'delete'
    })
} 
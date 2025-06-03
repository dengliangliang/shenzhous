import request from '../utils/request'


export const pageBackgroundPhoto = query => {
    return request({
        url: '/BackgroundPhoto/page?pageNum='+query.pageIndex+'&pageSize='+query.pageSize,
        method: 'get'
    })
}


export const getBackgroundPhotoList = () => {
    return request({
        url: '/BackgroundPhoto',
        method: 'get'
    })
}



export const addBackgroundPhoto = query => {
    return request({
        url: '/BackgroundPhoto',
        method: 'post',
        data: query
    })
}

export const updateBackgroundPhoto = query => {
    return request({
        url: '/BackgroundPhoto',
        method: 'put',
        data: query
    })
}


export const deleteBackgroundPhoto = query => {
    return request({
        url: '/BackgroundPhoto?photoId='+query,
        method: 'delete'
    })
} 
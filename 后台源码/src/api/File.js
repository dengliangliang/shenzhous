import request from '../utils/request';

export const deleteFile = query => {
    return request({
        url: '/File/deleteFile?filePath='+query,
        method: 'delete'
    });
};



export const orderFileUpload = query => {
    return request({
        url: '/File/orderFileUpload',
        method: 'post',
		data:query
    });
};


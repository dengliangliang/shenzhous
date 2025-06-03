import request from '../utils/request';

// 第一种写法
export const fetchData = query => {
    return request({
        url: '/userTest/test01',
        method: 'get',
        params: { query }
    });
};


// 第二种写法

//登录注册接口
export const login =  (data) => request.post('/user/Login', data)
// 获取单个用户接口
export const getUserById = (params) => request.get(`/API/userALL/oneUserById/${params}`, params)
// 查询所有用户接口
export const userAll = (params)=> request.get(`API/userALL/userAll`,params)

export const getArticle = (data) => request.get('/API/Article/getAll', data)

export const getVideos = (params)=> request.get(`API/Video/getVideoAll`,params)

export const getPosts = (params)=> request.get(`API/Post/getAll`,params)

export const deleteUser = (params) => request.get(`/API/userALL/deleteUser/${params}`, params)

export const updateUser =  (data) => request.post('/API/userALL/updateUser', data)
import request from '../utils/request';



export const login = query => {
	console.log(query)
    return request({
        url: '/UserLogin/login?phone='+query.username+"&password="+query.password,
        method: 'post'
    });
};

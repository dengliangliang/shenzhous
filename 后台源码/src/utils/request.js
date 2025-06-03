import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';  // 确保正确引入 Vuex store
import router, {
	routes
} from '@/router';
const service = axios.create({
	baseURL :'https://shenzhoupost.cn/shenzhoupost',
	// baseURL: 'http://localhost:8092',
	timeout: 500000
});

service.interceptors.request.use(
	config => {
		const token = localStorage.getItem('ms_token');
		// console.log(token)
		if (token) {
			// 将 token 添加到请求头中
			config.headers['Authorization'] = `${token}`;
		}
		
		// let url = '';
		// if (config.url && typeof config.url === 'string') {
		//     const parts = config.url.split("/");
		//     // 确保 parts[2] 存在
		//     if (parts[2]) {
		//         const path = parts[2].split("?")[0];
		//         url = path ? path : '';
		//     }
		// 	if(url==='getNewMessage'||url==='getUnread'){
		// 		return config;
		// 	}else{
				
		// 		store.commit('incrementRequest'); // 开始请求，增加计数
		// 		return config;
		// 	}
		// } else {
		//    store.commit('incrementRequest'); // 开始请求，增加计数
		//    return config;
		// }

		store.commit('incrementRequest'); // 开始请求，增加计数
		return config;
	},
	error => {
		store.commit('decrementRequest'); // 请求错误，减少计数
		console.log(error);
		return Promise.reject();
	}
);

service.interceptors.response.use(
response => {
    // 对响应数据做点什么
    if (response.status === 200) {
	  store.commit('decrementRequest'); // 请求成功，减少计数
      
      // 检查是否是blob类型的响应（文件下载）
      if (response.config.responseType === 'blob') {
        return response.data; // 直接返回blob数据
      }
      
      return response.data; // 只返回数据部分
    }
  },
  error => {
    store.commit('decrementRequest'); // 响应错误，减少计数
    const { response } = error;
    if (response) {
      // 服务器至少返回了状态码
      switch (response.status) {
        case 400:
          Message.error('请求错误 (400)');
          break;
        case 401:
          Message.error('未授权，请重新登录 (401)');
		  router.replace({ name: 'login' });
          break;
        case 403:
          Message.error('拒绝访问 (403)');
          break;
        case 404:
          Message.error('请求出错 (404)');
          break;
        case 408:
          Message.error('请求超时 (408)');
          break;
        case 500:
          Message.error('服务器错误 (500)');
          break;
        case 501:
          Message.error('服务未实现 (501)');
          break;
        case 502:
          Message.error('网络错误 (502)');
          break;
        case 503:
          Message.error('服务不可用 (503)');
          break;
        case 504:
          Message.error('网络超时 (504)');
          break;
        case 505:
          Message.error('HTTP版本不受支持 (505)');
          break;
        default:
          Message.error(`连接出错(${response.status})!`);
      }
    } else {
      // 服务器连状态码都没有返回
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常');
      } else {
        Message.error('请求失败，请检查网络是否已连接');
      }
    }
    return Promise.reject(error);
  }
);

export default service;

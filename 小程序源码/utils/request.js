import { baseUrl } from '@/config/env.js'

// 请求配置
const requestConfig = {
  // 基础URL
  baseUrl: baseUrl,
  // 请求头
  header: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 请求超时时间
  timeout: 500000,
  // 数据类型
  dataType: 'json'
}

// 请求拦截器
const requestInterceptor = (config) => {
  // 获取token
  const token = uni.getStorageSync('token')

  if (token) {
    config.header['Authorization'] = token
  }
  // console.log(config.url.split('/'))
  // if (config.url.split('/')[4]) {
  //   let u1 = config.url.split('/')[4]
  //   if (u1 == 'Message') {
  //     let u2 = config.url.split('/')[5].split('?')[0]
  //     if (!u2 == 'getNewMessage') {
  //       uni.showLoading({
  //         title: '加载中...',
  //         mask: true
  //       })
  //     }
  //   } else {
  //     uni.showLoading({
  //       title: '加载中...',
  //       mask: true
  //     })
  //   }
  // }
  // 这里可以添加loading

  return config
}

// 响应拦截器
const responseInterceptor = (response) => {
  // 隐藏loading
  uni.hideLoading()

  // 这里可以对响应数据做统一处理
  const { statusCode, data } = response

  // 如果是HTTP状态码正常
  if (statusCode === 200) {
    // 处理业务状态码
    if (data.code === 200 || data.code === 0) {
      // 请求成功
      return data.data
    } else if (data.code === 500) {
      console.log(data)
      // 业务错误，显示后端返回的错误信息
      uni.showToast({
        title: data.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
      return Promise.reject(data)
    } else {
      // 其他状态码
      handleError(data)
      return Promise.reject(data)
    }
  } else {
    // HTTP错误
    handleError(response)
    return Promise.reject(response)
  }
}

// 错误处理
const handleError = (error) => {
  // 隐藏loading
  uni.hideLoading()
  console.log(error)
  let message = ''

  // HTTP错误处理
  switch (error.statusCode) {
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请登录'
      // 跳转登录页
      uni.navigateTo({
        url: '/pages/login/login'
      })
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求地址出错'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      message = '网络异常，请稍后重试'
  }

  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

// 将对象转换为 form-data 格式的字符串
const objectToFormData = (obj) => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

// 请求函数
const request = (options = {}) => {
  // 判断是否是完整的URL
  const isFullUrl = options.url.startsWith('http://') || options.url.startsWith('https://')
  
  // 处理 form-data 格式
  if (options.isFormData && options.data) {
    options.data = objectToFormData(options.data)
  }
  
  // 合并请求配置
  const config = {
    ...requestConfig,
    ...options,
    // 如果是完整URL就直接使用，否则加上baseUrl
    url: isFullUrl ? options.url : requestConfig.baseUrl + options.url
  }

  // 请求拦截
  const newConfig = requestInterceptor(config)

  // 检查responseType参数，对于blob类型的响应做特殊处理
  if (config.responseType === 'blob') {
    return new Promise((resolve, reject) => {
      uni.request({
        url: config.url,
        method: config.method || 'get',
        data: config.data,
        params: config.params,
        header: newConfig.header,
        responseType: 'arraybuffer', // uni-app支持arraybuffer
        success: (response) => {
          if (response.statusCode === 200) {
            // 平台兼容性处理
            // #ifdef H5
            // 浏览器环境中可以使用Blob
            const blob = new Blob([response.data], { 
              type: response.header['Content-Type'] || 'image/png' 
            });
            resolve(blob);
            // #endif
            
            // #ifdef MP-WEIXIN
            // 微信小程序不支持Blob，直接返回ArrayBuffer，后续用FileSystem API处理
            resolve({
              data: response.data,
              type: response.header['Content-Type'] || 'image/png',
              _isArrayBuffer: true
            });
            // #endif
            
            // #ifdef APP-PLUS || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
            // 其他平台尝试处理ArrayBuffer
            try {
              if (typeof Blob !== 'undefined') {
                const blob = new Blob([response.data], { 
                  type: response.header['Content-Type'] || 'image/png' 
                });
                resolve(blob);
              } else {
                // 如果不支持Blob，返回包含必要信息的对象
                resolve({
                  data: response.data,
                  type: response.header['Content-Type'] || 'image/png',
                  _isArrayBuffer: true
                });
              }
            } catch (e) {
              console.error('平台不支持Blob:', e);
              // 返回简单对象
              resolve({
                data: response.data,
                type: response.header['Content-Type'] || 'image/png',
                _isArrayBuffer: true
              });
            }
            // #endif
          } else {
            reject(response);
          }
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }

  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...newConfig,
      success: (response) => {
        resolve(responseInterceptor(response))
      },
      fail: (error) => {
        handleError(error)
        reject(error)
      }
    })
  })
}

// 直接导出 request 函数
export default request

// 将对象转换为URL参数字符串
export const objectToUrlParams = (obj) => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
} 
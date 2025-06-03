// 环境配置
const env = process.env.NODE_ENV

// 直接导出基础URL
// export const baseUrl = 'https://localhost:8092'  // 你的实际API地址
export const baseUrl = 'https://shenzhoupost.cn/shenzhoupost'  // 你的实际API地址

// 新增基础路径配置
export const BASE_PATH = '/PortSteward/'
export const fullBaseUrl = `${baseUrl}/`
export const photoBaseUrl = 'https://shenzhoupost.cn'
// 其他配置（如果需要的话）
export const config = {
  development: {
    // 其他开发环境配置...
  },
  production: {
    // 其他生产环境配置...
  }
}[env || 'development'] 
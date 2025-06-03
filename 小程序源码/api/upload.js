import request from '../utils/request'

const uploadApi = {
  /**
   * 上传文件
   * @param {Object} file - 文件对象
   * @param {string} name - 文件名称
   * @returns {Promise<string>} 返回文件URL
   */
  uploadFile({ file, name }) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: `https://shenzhoupost.cn/shenzhoupost/File/orderFileUpload`, // 确保这里使用完整的URL
        filePath: file,
        name: 'file', // 后端接收文件的字段名
        formData: {
          name: name // 其他表单数据
        },
        success: (uploadRes) => {
          // 处理响应数据
          let responseData = uploadRes.data
          try {
            responseData = JSON.parse(responseData)
          } catch (e) {
            console.log('响应不是JSON格式', e)
          }
          resolve(responseData)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}

export default uploadApi

import request from '../utils/request'

export default {

  getList() {
    return request({
      url: `/BackgroundPhoto`,
      method: 'get'
    })
  }

}
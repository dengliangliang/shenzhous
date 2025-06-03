import request from '../utils/request'


export default {

  getCustomer() {
    return request({
      url: `/Customer`,
      method: 'get'
    })
  }

}


import request from '../utils/request'

export default {

  addFeedback(data) {
    return request({
      url: `/Feedback`,
      method: 'post',
	  data
    })
  }

}
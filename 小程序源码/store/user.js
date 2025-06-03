import userApi from '@/api/user'
// 用户状态管理

export default {
  namespaced: true,
  
  state: {
    userInfo: null,
    token: uni.getStorageSync('token') || ''
  },
  
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', userInfo)
    },
    
    setToken(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    
    clearUserInfo(state) {
      state.userInfo = null
      state.token = ''
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }
  },
  
  getters: {
    getUserInfo: state => state.userInfo,
    isLogin: state => !!state.userInfo && !!state.userInfo.userId
  },

  actions: {
    // 更新用户信息
    async updateUserInfo({ commit, state }) {
      try {
        const res = await userApi.getUserById(state.userInfo.userId)
        if (res) {
			uni.removeStorageSync('userInfo')
			state.userInfo = res
			uni.setStorageSync('userInfo', res)
        
          return res
        }
      } catch (e) {
        console.error('更新用户信息失败:', e)
        throw e
      }
    }
  }
}

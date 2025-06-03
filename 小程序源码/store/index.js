import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      if (userInfo.openId) {
        state.openId = userInfo.openId;
      }
    }
  }
}) 
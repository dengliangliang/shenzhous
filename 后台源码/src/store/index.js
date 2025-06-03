import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    baseUrl:'http://localhost:8081',
	activeRequests: 0,
	identity: null,
}

const getters = {
	isLoading: state => state.activeRequests > 0
}

const mutations = {
	incrementRequest(state) {
		state.activeRequests++;
	},
	decrementRequest(state) {
		if (state.activeRequests > 0) {
			state.activeRequests--;
		}
	},
	setIdentity(state, identity) {
	      state.identity = identity;
	    },
}


const actions = {
	// 从 localStorage 恢复权限字段
	initializeIdentity({
		commit
	}) {
		const identity = localStorage.getItem('identity');
		if (identity) {
			commit('setIdentity', identity);
		}
	},
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {

	}
})
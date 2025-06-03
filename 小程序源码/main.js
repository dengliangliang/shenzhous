import Vue from 'vue'
import App from './App'
import store from './store'
import './uni.promisify.adaptor'

// #ifndef VUE3
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

Vue.component('uni-icons', uniIcons)
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif
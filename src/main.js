import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS
import Moment from 'moment'
import Vue from 'vue'
import 'vue2-animate/src/vue2-animate.less'
import './assets/less/custom-theme.less'
import './assets/sass/screen.scss'
import './assets/themes/theme.scss'
import App from './App'
import router from './router'
import store from './vuex/store'
import Config from './assets/config/arguments.config'

const _ = require('lodash')
const load = require('load-script')

load('../static/nim/NIM_Web_SDK_v4.0.0.js', (err, script) => {
  if (err) {
    console.log('LOAD NIM ERR:', err)
  } else {
    console.log('LOAD NIM SUCCESS:', script.src)
  }
})

const currentEnv = Config.dev
Moment.locale('zh-CN')
_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,
  currentEnv,
})
axios.defaults.baseURL = 'https://api.github.com'
Vue.config.devtools = currentEnv.testingMode
Vue.use(iView)
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})
router.afterEach(() => {
  iView.LoadingBar.finish()
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})

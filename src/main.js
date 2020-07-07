import Vue from 'vue'
import App from './App.vue'
// import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入通用样式文件
import './styles/common.less'
import './styles/iconfont.less'
// 引入配置好的路由文件
import router from './router'
// 把通用头部注册为全局组件
import hmHeader from './components/hmHeader.vue'
import hmlogo from './components/hmlogo.vue'
import hmnavbar from './components/hmnavbar.vue'
import hmpost from './components/hmpost.vue'
// 引入库
import axios from 'axios'
import moment from 'moment'
import './vant'
import { Toast } from 'vant'

// 挂载在vue的原型上，加上$，用的时候就要写this.$axios
Vue.prototype.$axios = axios
// 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 给axios配置请求拦截器
axios.interceptors.request.use(function(config) {
  // 浏览器发送的ajax请求的所有的配置信息
  console.log('我拦截到了请求', config)
  // 给所有的请求都添加token
  const token = localStorage.getItem('token')
  if (token) {
    // 如果有token就给请求头添加token
    config.headers.Authorization = token
  }
  return config
})

// axios的响应拦截器
axios.interceptors.response.use(function(response) {
  console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 此情况一定是token失效导致的，在所有的响应里进行处理
    // 返回失败的信息
    Toast.fail(message)
    // 跳转到登录页面
    // router.push('/login')
    // 删除过期的token和用户id
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return response
})

// 注册为全局组件
Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmlogo)
Vue.component('hm-navbar', hmnavbar)
Vue.component('hmpost', hmpost)

// 定义全局过滤器
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// 给vue的原型添加一个方法，用于处理图片的地址
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

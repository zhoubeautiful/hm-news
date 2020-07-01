import Vue from 'vue'
import App from './App.vue'
// 需要显示在页面上的都要导入
import { Button, Field } from 'vant'
// import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入通用样式文件
import './styles/common.less'
import './styles/iconfont.less'

// 引入配置好的路由文件
import router from './router'

// 全局导入vant
// Vue.use(Vant)
Vue.use(Button)
Vue.use(Field)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

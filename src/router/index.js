import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import user from '../views/user.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: login, name: 'login' },
    { path: '/register', component: register, name: 'register' },
    { path: '/user', component: user, name: 'user' }
  ]
})

// 全局的导航守卫（路由的钩子函数 beforeEach afterEach）
// to: 到哪儿去
// from: 从哪儿来
// next(): 代表放行
// 保存所有需要登录才能访问的页面
const pages = ['/user', '/user-edit']
router.beforeEach(function(to, from, next) {
  // 获取到token
  const token = localStorage.getItem('token')
  // 如果pages里面包含
  if (pages.includes(to.path)) {
    // 去pages里面的页面：如果有token，那么放行，没有token就返回登录页面，其他的页面放行（首页）
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router

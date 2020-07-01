import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    { path: '/register', component: register }
  ]
})

export default router

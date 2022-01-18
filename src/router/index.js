// 引入Vue
import Vue from "vue";
// 引入Vue-Router
import VueRouter from "vue-router";
// 应用vue-router插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

// 重写push和replace方法，用来解决参数相同时跳转同一个路由会报错的bug

let originPush = VueRouter.prototype.push
let originRelace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originRelace.call(this, location, resolve, reject)
  } else {
    originRelace.call(this, location, () => { }, () => { })
  }
}

// 创建路由规则
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showFooter: true
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      showFooter: true
    }
  }
]

// 创建路由器对象，并对外暴露
export default new VueRouter({
  routes,
  // 滚动行为，用来控制路由跳转之后的滚动条处在哪个位置
  scrollBehavior(to, from, savedPosition) {
    // 滚动条处在顶部
    return { y: 0 }
  }
})
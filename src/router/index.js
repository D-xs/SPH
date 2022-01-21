// 引入Vue
import Vue from "vue"
// 引入Vue-Router
import VueRouter from "vue-router"
// 应用vue-router插件
Vue.use(VueRouter)
// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import store from "@/store"

// 重写push和replace方法，用来解决参数相同时跳转同一个路由会报错的bug

let originPush = VueRouter.prototype.push
let originRelace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originRelace.call(this, location, resolve, reject)
  } else {
    originRelace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 创建路由规则
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      showFooter: true,
    },
  },
]

// 创建路由器对象，并对外暴露
const router = new VueRouter({
  routes,
  // 滚动行为，用来控制路由跳转之后的滚动条处在哪个位置
  scrollBehavior(to, from, savedPosition) {
    // 滚动条处在顶部
    return { y: 0 }
  },
})


// 添加全局前置路由导航守卫
router.beforeEach(async (to, from, next) => {
  // 判断用户是否登录
  // 先获取token
  let token = store.state.user.token
  // 获取用户的登录信息
  let userInfo = store.state.user.userInfo
  // 如果有token，表示用户已经登录过, 则不能跳转到登录页面
  if (token) {
    // 如果登录状态下, 访问登录页，则跳转到首页
    if (to.path === "/login") {
      next("/home")
    } else {
      // 登录了，去其他页面
      // 判断有没有仓库中用户信息，如果没有，则派发action，获取用户信息
      if (!userInfo.name) {
        try {
          // 获取成功
          await store.dispatch("user/getUserInfo")
          // 放行
          next()
        } catch (error) {
          // 获取失败，token过期, 派发action，退出登录，清除浏览器本地存储的token，
          await store.dispatch("user/userLogout")
          // 退出成功，跳转到登录页
          next("/login")
        }
      } else {
        // 如果有userInfo，则放行
        next()
      }
    }
  } else {
    // 如果没有登录，想要去购物车，则需要让用户先登录再去购物车
    // 待完成
    next()
  }
})
export default router

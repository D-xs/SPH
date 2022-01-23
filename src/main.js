import Vue from "vue"
// 引入图片懒加载插件
import VueLazyload from "vue-lazyload"
import App from "./App.vue"
// 引入swiper样式
import "swiper/css/swiper.min.css"
// 引入路由器对象
import router from "@/router"
// 引入Store对象
import store from "@/store"
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
// 引入mockServe.js文件，使其执行，让mock的数据可以得到返回
import "./mock/mockServe"
// 引入所有的接口请求函数
import * as API from "@/api"
// 引入element-ui
import "@/utils/element"
// 引入图片懒加载预装载图
import pg from "@/assets/images/1.webp"
// 引入表单校验插件
import "@/plugins/validate"
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 将三级联动菜单栏注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 将轮播图组件注册为全局组件
Vue.component(Carousel.name, Carousel)
// 将分页器注册为全局组件
Vue.component(Pagination.name, Pagination)

// 应用图片懒加载插件
Vue.use(VueLazyload, {
  loading: pg,
})
new Vue({
  render: (h) => h(App),
  // 注册路由器，ES6属性简写形式，==》 'router': router
  /*
     注册之后：所有的组件实例对象上都有两个属性
      $route: 当前路由的信息
      $router: 路由器对象（唯一的，只有一个）
  */
  router,
  // 注册store对象
  /*
     注册之后: 所有组件实例对象上都有一个属性
      $store:
        dispatch f(): 用于派发actions
        commit f(): 用于修改state
  */
  store,
  // 安装全局事件总线
  beforeCreate() {
    // 安装全局事件总线，$bus就是当前应用的vm
    ;(Vue.prototype.$bus = this),
      // 将所有的接口请求函数，挂载到Vue原型对象上
      (Vue.prototype.$API = API)
  },
}).$mount("#app")

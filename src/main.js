import Vue from 'vue'
import App from './App.vue'
// 引入swiper样式
import "swiper/css/swiper.min.css"
// 引入路由器对象
import router from '@/router'
// 引入Store对象
import store from '@/store'
import TypeNav from '@/components/TypeNav'
// 引入mockServe.js文件，使其执行，让mock的数据可以得到返回
import './mock/mockServe'
import { reqCategoryList } from '@/api'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 将三级联动菜单栏注册为全局组件
Vue.component(TypeNav.name, TypeNav)
reqCategoryList()
new Vue({
  render: h => h(App),
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
  store
}).$mount('#app')
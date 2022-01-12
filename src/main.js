import Vue from 'vue'
import App from './App.vue'
// 引入路由器对象
import router from '@/router'
import TypeNav from '@/pages/Home/TypeNav'
// 关闭Vue的生产提示
Vue.config.productionTip = false
// 将三级联动菜单栏注册为全局组件
Vue.component(TypeNav.name, TypeNav)
new Vue({
  render: h => h(App),
  // 注册路由器，ES6属性简写形式，==》 'router': router
  /*
     注册之后：所有的组件实例对象上都有两个属性
      $route: 当前路由的信息
      $router: 路由器对象（唯一的，只有一个）
  */
  router
}).$mount('#app')

// 引入Vue
import Vue from "vue";
// 引入Vuex
import Vuex from 'vuex';
// 应用Vuex插件
Vue.use(Vuex)
// 引入各个小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";

// 创建并暴露Store实例对象
export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart
  }
})
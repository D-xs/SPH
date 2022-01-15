// state: 存储数据的对象
const state = {

}

// mutations: 修改状态的对象
const mutations = {

}

// actions: 处理aciton，书写自己的业务逻辑，一般在此发送异步请求
const actions = {

}

// getters: 用于简化state当中的数据，可以当做计算属性
const getters = {

}

export default {
  // 开启模块的命名空间，使在其他组件中可以通过 mapState mapActions mapMutations mapGetters 这些api
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
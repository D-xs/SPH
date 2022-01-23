import { reqSearchInfo } from "@/api"

// state: 存储数据的对象
const state = {
  searchList: {},
}

// mutations: 修改状态的对象
const mutations = {
  GET_SEARCH_INFO(state, value) {
    state.searchList = value
  },
}

// actions: 处理aciton，书写自己的业务逻辑，一般在此发送异步请求
const actions = {
  async getSearchInfo({ commit }, params = {}) {
    const result = await reqSearchInfo(params)
    if (result.code === 200) {
      commit("GET_SEARCH_INFO", result.data)
    }
  },
}

// getters: 用于简化state当中的数据，可以当做计算属性
const getters = {
  attrsList(state) {
    // 防止请求错误，遍历undefined报错，返回一个数组
    return state.searchList.attrsList || []
  },
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  pageNo(state) {
    return state.searchList.pageNo
  },
  pageSize(state) {
    return state.searchList.pageSize
  },
  total(state) {
    return state.searchList.total
  },
  totalPages(state) {
    return state.searchList.totalPages
  },
}

export default {
  // 开启模块的命名空间，使在其他组件中可以通过 mapState mapActions mapMutations mapGetters 这些api
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

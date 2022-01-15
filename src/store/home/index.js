import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
// state: 存储数据的对象
const state = {
  // 三级联动数据
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor组件数据
  floorList: []
}

// mutations: 修改状态的对象
const mutations = {
  GET_CATEGORY_LIST(state, value) {
    state.categoryList = value
  },
  GET_BANNER_LIST(state, value) {
    state.bannerList = value
  },
  GET_FLOOR_LIST(state, value) {
    state.floorList = value
  }
}

// actions: 处理aciton，书写自己的业务逻辑，一般在此发送异步请求
const actions = {
  // 获取三级联动数据
  async getCategoryList({commit}) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('GET_CATEGORY_LIST', result.data.slice(0, 16))
    }
  },
  // 获取轮播图数据
  async getBannerList({commit}) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('GET_BANNER_LIST', result.data)
    }
  },
  // 获取Floor组件数据
  async getFloorList({commit}) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('GET_FLOOR_LIST', result.data)
    }
  }
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
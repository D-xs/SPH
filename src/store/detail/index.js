import { reqGoodsInfo } from "@/api"

const state = {
  goodsInfo: {}
}

const mutations = {
  GET_GOODS_INFO(state, value) {
    state.goodsInfo = value
  }
}

const actions = {
  async getGoodsInfo({ commit }, skuid) {
    const result = await reqGoodsInfo(skuid)
    if (result.code === 200) {
      commit('GET_GOODS_INFO', result.data)
    }
  }
}

const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
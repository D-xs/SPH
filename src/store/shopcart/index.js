import { reqShopCartList } from "../../api"

const state = {
  cartList: []
}

const mutations = {
  GET_SHOP_CART_LIST(state, value) {
    state.cartList = value
  }
}

const actions = {
  async getShopCartList({commit}) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit("GET_SHOP_CART_LIST", result.data)
    }
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
import { reqOrderList, reqUserAddressInfo } from "../../api"

const state = {
  userAddressInfo: [],
  orderInfo: {},
}

const mutations = {
  GET_USER_ADDRESS_INFO(state, value) {
    state.userAddressInfo = value
  },
  GET_ORDER_LIST(state, value) {
    state.orderInfo = value
  },
}

const actions = {
  // 获取用户地址信息
  async getUserAddressInfo({ commit }) {
    const result = await reqUserAddressInfo()
    if (result.code === 200) {
      commit("GET_USER_ADDRESS_INFO", result.data)
    }
  },
  // 获取商品清单
  async getOrderList({ commit }) {
    const result = await reqOrderList()
    if (result.code === 200) {
      commit("GET_ORDER_LIST", result.data)
    }
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

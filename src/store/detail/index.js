import { reqGoodsInfo } from "@/api"
import { reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
  goodsInfo: {},
  uuid: getUUID(),
}

const mutations = {
  GET_GOODS_INFO(state, value) {
    state.goodsInfo = value
  },
}

const actions = {
  // 获取产品信息的action
  async getGoodsInfo({ commit }, skuid) {
    const result = await reqGoodsInfo(skuid)
    if (result.code === 200) {
      commit("GET_GOODS_INFO", result.data)
    }
  },
  // 将商品添加到购物车中
  // 添加成功后，服务器返回一个code为200的响应对象
  // 不需要将数据添加到仓库当中
  addOrUpdateShopCart(_, { skuId, skuNum }) {
    return new Promise(async (resolve, reject) => {
      const result = await reqAddOrUpdateShopCart(skuId, skuNum)
      if (result.code === 200) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  },
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
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

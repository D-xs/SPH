import {
  reqDeleteCartBySkuId,
  reqShopCartList,
  reqUpdateCheckState,
} from "../../api"

const state = {
  cartList: [],
}

const mutations = {
  GET_SHOP_CART_LIST(state, value) {
    state.cartList = value
  },
}

const actions = {
  // 获取购物车当中的商品列表
  async getShopCartList({ commit }) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit("GET_SHOP_CART_LIST", result.data)
    }
  },
  // 删除购物车当中指定的商品
  deleteCartBySkuId(_, skuId) {
    return new Promise(async (resolve, reject) => {
      const result = await reqDeleteCartBySkuId(skuId)
      if (result.code === 200) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  },
  // 更新某个商品的选中状态
  updateCartCheckState(_, { skuId, isChecked }) {
    return new Promise(async (resolve, reject) => {
      const result = await reqUpdateCheckState(skuId, isChecked)
      if (result.code === 200) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  },
  // 删除所有选中的商品
  deleteAllCheckedCart({ dispatch }, checkedCartList) {
    // 将每一个商品都发送一个删除请求，存储到promise数组中，然后通过Promise.all来确定是否都删除完成
    const promiseArr = []
    // 循环遍历checkedCartList，开启一个异步任务，存放到promiseArr数组当中
    checkedCartList.forEach((item) => {
      promiseArr.push(dispatch("deleteCartBySkuId", item.skuId))
    })
    Promise.all(promiseArr)
      .then((resolved) => {
        // 如果都成功，则重新发送请求，获取购物车列表数据
        dispatch("getShopCartList")
      })
      .catch((error) => {
        // 如果有一个删除商品失败，则重新发请求，不改变原来购物车列表当中的商品和数量
        checkedCartList.forEach((item) => {
          dispatch("addOrUpdateShopCart", { skuId: item.skuId, skuNum: 0 })
        })
      })
  },
  // 更新所有商品列表中的商品的状态
  updateAllCartChecked({ dispatch, getters }, isChecked) {
    const promiseArr = []
    // 循环遍历getters.cartList.cartInfoList，开启一个异步任务，存放到promiseArr数组当中
    // 如果全选所有商品，则过滤出未选中的商品，遍历发请求
    getters.cartList.cartInfoList.forEach((item) => {
      promiseArr.push(
        dispatch("updateCartCheckState", { skuId: item.skuId, isChecked })
      )
    })
    Promise.all(promiseArr)
      .then((resolved) => {
        // 如果都成功，则重新发送请求，获取购物车列表数据
        dispatch("getShopCartList")
      })
      .catch((error) => {
        alert("全选/全不选商品失败")
      })
  },
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

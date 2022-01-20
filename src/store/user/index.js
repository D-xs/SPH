import { reqPhoneCode, reqUserLogin, reqUserRegister } from "../../api"

// 登录与注册的模块
const state = {
  code: "",
  token: ""
}

const mutations = {
  GET_PHONE_CODE(state, code) {
    state.code = code
  },
  USER_LOGIN(state, token) {
    state.token = token
  }
}

const actions = {
  // 获取短信验证码，
  // 正常情况：发送之后，用户输入
  // 这里的情况：在响应对象当中（省钱）, 需要将验证码存储到仓库当中
  async getPhoneCode({commit}, phone) {
    const result = await reqPhoneCode(phone)
    if (result.code === 200) {
      commit("GET_PHONE_CODE", result.data)
      return true
    } else {
      console.log(result.data);
      return Promise.reject(false)
    }
  },
  // 用户注册的action
  async userRegister(_, data) {
    const result = await reqUserRegister(data)
    if (result.code === 200) {
      // 如果注册成功
      return true
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 用户登录的action
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      // 如果登录成功，将服务器返回的token存储到仓库
      commit("USER_LOGIN", result.data.token)
      console.log(result);
      return true
    } else {
      return Promise.reject(new Error("fail"))
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
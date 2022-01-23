import {
  reqLogout,
  reqPhoneCode,
  reqUserInfo,
  reqUserLogin,
  reqUserRegister,
} from "../../api"
import { getToken, setToken, removeToken } from "../../utils/token"

// 登录与注册的模块
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
}

const mutations = {
  GET_PHONE_CODE(state, code) {
    state.code = code
  },
  USER_LOGIN(state, token) {
    state.token = token
  },
  USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ""
    state.userInfo = {}
    removeToken()
  },
}

const actions = {
  // 获取短信验证码，
  // 正常情况：发送之后，用户输入
  // 这里的情况：在响应对象当中（省钱）, 需要将验证码存储到仓库当中
  async getPhoneCode({ commit }, phone) {
    const result = await reqPhoneCode(phone)
    if (result.code === 200) {
      commit("GET_PHONE_CODE", result.data)
      return true
    } else {
      console.log(result.data)
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
      // 成功之后, 将token存储到浏览器本地存储
      setToken(result.data.token)
      // 如果登录成功，将服务器返回的token存储到仓库
      commit("USER_LOGIN", result.data.token)
      return true
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit("USER_INFO", result.data)
      return true
    } else {
      return Promise.reject(new Error("获取用户信息失败"))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      // 退出成功
      // 清除仓库当中的数据，以及浏览器的本地存储
      commit("CLEAR")
      return true
    } else {
      return Promise.reject(new Error("退出失败"))
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

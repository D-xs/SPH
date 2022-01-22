// 统一进行API接口管理
import requests from "./request"
import mockRequest from "./mockRequest"

// 三级联动接口
// /api/product/getBaseCategoryList   get  无参数
export const reqCategoryList = () => {
  // 发送请求, 返回结果为Promise对象
  return requests({
    url: "product/getBaseCategoryList",
    method: "get",
  })
}

// 获取search搜索页数据
// /api/list  post 带参数 至少为一个 {}
export const reqSearchInfo = (params) => {
  // 发送请求, 返回结果为Promise对象
  return requests({
    url: "/list",
    method: "post",
    data: params,
  })
}

// 获取商品详情信息
export const reqGoodsInfo = (skuId) => {
  // 发送请求, 返回结果为Promise对象
  return requests({
    url: `/item/${skuId}`,
    method: "get",
  })
}

// 将商品添加到购物车中（或者修改购物车中商品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  })
}

// 获取购物车的商品列表
export const reqShopCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  })
}

// 根据skuId删除购物车中指定的商品
export const reqDeleteCartBySkuId = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  })
}

// 修改购物车中某个商品的选中状态
export const reqUpdateCheckState = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  })
}

// 发送手机验证码接口
// /api/user/passport/sendCode/{phone}
export const reqPhoneCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  })
}

// 注册用户接口
export const reqUserRegister = (data) => {
  return requests({
    url: `/user/passport/register`,
    method: "post",
    data,
  })
}

// 用户登录接口
export const reqUserLogin = (data) => {
  return requests({
    url: `user/passport/login`,
    method: "post",
    data,
  })
}

// 根据token获取用户信息
export const reqUserInfo = () => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
  })
}

// 退出登录接口
export const reqLogout = () => {
  return requests({
    url: `/user/passport/logout`,
    method: "get",
  })
}

// 获取用户地址信息
export const reqUserAddressInfo = () => {
  return requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get"
  })
}

// 获取商品清单
export const reqOrderList = () => {
  return requests({
    url: "/order/auth/trade",
    method: "get"
  })
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data
  })
}

// 获取支付信息
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  })
}

// 获取支付状态API接口
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  })
}
// ***************************************************************************************** 以下是mockjs的接口
// 获取首页Floor组件数据
export const reqFloorList = () => {
  return mockRequest({
    url: "/floor",
    method: "get",
  })
}

// 获取首页轮播图数据
export const reqBannerList = () => {
  return mockRequest({
    url: "/banner",
    method: "get",
  })
}

// 统一进行API接口管理
import requests from "./request";
import mockRequest from "./mockRequest";

// 三级联动接口
// /api/product/getBaseCategoryList   get  无参数
export const reqCategoryList = () => {
  // 发送请求, 返回结果为Promise对象
  return requests({
    url: 'product/getBaseCategoryList',
    method: 'get'
  })
}

// 获取search搜索页数据
// /api/list  post 带参数 至少为一个 {}
export const reqSearchInfo = (params) => {
  // 发送请求, 返回结果为Promise对象
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取首页Floor组件数据
export const reqFloorList = () => {
  return mockRequest({
    url: '/floor',
    method: 'get'
  })
}

// 获取首页轮播图数据
export const reqBannerList = () => {
  return mockRequest({
    url: '/banner',
    method: 'get'
  })
}


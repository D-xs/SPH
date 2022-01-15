// 引入mockjs模块
import Mock from "mockjs"
// 引入对应的JSON文件, json格式的文件可以直接引入，不需对外暴露
// webpack默认对外暴露的模块：图片、json
import banner from './banner.json'
import floor from './floor.json'

// mock数据：参数1：请求地址url;  参数2： 请求数据

// 1.模拟首页大的轮播图数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner
})

// 2.模拟首页Floor数据
Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})
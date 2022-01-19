// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入获取UUID的函数
import { getUUID } from "@/utils/uuid_token";
// 1.利用aixos对象的create方法，创建一个axios实例(传入一个配置对象)
// 2.request就是axios,我们自己可以配置
const requests = axios.create({
  // 发请求的基础路径
  baseURL: '/api',
  // 代表请求超时的时间(如果5秒钟之内没有响应，则取消该次请求)
  timeout: 5000
})

// 配置请求拦截器,发请求之前，请求拦截器中回调会先执行，执行完成后，再发真正的请求。
// 注意：后添加的请求拦截器先执行
requests.interceptors.request.use((config) => {
  // config：配置对象，对象里面有一个header属性很重要
  // 进度条开始
  nprogress.start()
  // 给请求消息的请求头添加一个 userTempId字段，用于标识游客身份
  config.headers.userTempId = getUUID()
  return config
})

// 配置响应拦截器，当响应回来之后，在调用我们传入的成功回调之前，先调用响应拦截器中的回调
requests.interceptors.response.use((response) => {
  // 成功的回调函数，当响应成功时，响应拦截器可以检测到
  // 进度条结束
  nprogress.done()
  return response.data
}, (error) => {
  // 失败的回调函数，响应失败后，终止promise链
  return Promise.reject(new Error('fair' + error.message))
})

export default requests

// 生成一个随机字符串，且每次执行不会发生变化，游客身份持久存储
import { v4 as uuidv4 } from "uuid"
export const getUUID = () => {
  const uuid = localStorage.getItem("uuid_token")
  // 如果本地存储存在uuid，则直接返回
  if (uuid) {
    return uuid
  } else {
    // 如果没有就生成uuid，存储到本地存储，返回uuid
    const uuid = uuidv4()
    localStorage.setItem("uuid_token", uuid)
    return uuid
  }
}

// import {request} from "src/utils/request"

// export const getCaptcha = () => {
//   return request({
//     url: '/res/captcha',
//     method: 'get',
//   })
// }

// export type LoginParamsType = {
//   loginId: string
//   loginPwd: string
//   captcha: string
//   remember: 7
// };

// export function login(data:LoginParamsType) {
//   return request({
//     url: '/api/admin/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(){
//   return request({
//     url:"/api/admin/whoami",
//     method:'get'
//   })
// }

import { $http } from "src/utils/request"

export type LoginParamsType = {
  username: string
  password: string
}

export function login(data: LoginParamsType) {
  return $http.post<{ token: string }>("auth/login", data)
}

export function getInfo() {
  return $http.get("")
}

import { IUserListQuery } from "src/types/userlist"
import { $http } from "src/utils/request"

// 用户列表

/**
 * 获取用户列表数据
 * @param page
 * @param size
 * @returns
 */
export async function getUserList(params: Partial<IUserListQuery>) {
  return $http.get("/user/", {
    params: {
      page: params.page,
      size: params.size,
      nickname: params.nickname
    }
  })
}

/**
 * 修改用户列表数据
 * @param data
 * @returns
 */
export function editUserList(data) {
  return $http.post("user/updateInfo", data)
}

//  用户列表详情

/**
 * 获取用户信息
 * @param params
 * @returns
 */
export function getUserInfo(id) {
  return $http.get("/user/info", { params: { id } })
}

export function updateUserName(data) {
  return $http.post("user/updateName", data)
}

export function updateUserMobile(data) {
  return $http.post("user/updateMobile", data)
}

/**
 * 获取用户数据订单数据
 * @param params
 * @returns
 */
export function getUserDataInfo(id) {
  return $http.get("/user/datainfo", { params: { id } })
}

/**
 * 获取订单数据
 * @param params
 * @returns
 */
export function getUserOrderList(id) {
  return $http.get("/user/order", { params: { id } })
}

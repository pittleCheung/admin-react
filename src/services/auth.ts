//
import { $http } from "src/utils/request"

// 修改密码
// export function setAdmin(data) {
//   return $http.put("/api/admin", data)
// }

// 获取管理员用户列表
export function getAdminList(params: ICommonPaging) {
  return $http.get("/admin", {
    params
  })
}

// 获取管理员用户详情
export function getAdminDetail(data) {
  return $http.post("/admin/adminDetail", data)
}

//  修噶管理员用户密码
export function updateAdminDetail(data) {
  return $http.post("/admin/adminSave", data)
}

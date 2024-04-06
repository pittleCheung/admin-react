import { $http } from "src/utils/request"

// 获取显示设置
export function getShowSet() {
  return $http.get("/admin/showset")
}

// 修改显示设置
export function updateShowSet(data) {
  return $http.post("/admin/showsetStore", data)
}

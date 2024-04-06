import { $http } from "src/utils/request"

// 获取所有公告
export function getAnnounceList() {
  return $http.get("/notice")
}

// 删除一条公告
export function delOneAnnounce(data) {
  return $http.post("/notice/destory", data)
}

// 添加一条公告
export function addOneAnnounce(data) {
  return $http.post("/notice/add", data)
}

// 更新一条公告
export function updateOneAnnounce(data) {
  return $http.post("/notice/update", data)
}

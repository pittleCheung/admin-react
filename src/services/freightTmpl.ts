import { $http } from "src/utils/request"

// 获取显示设置
export function getFeightTmpl(params: ICommonPaging) {
  return $http.get("/shipper/freight", {
    params
  })
}

import { $http } from "src/utils/request"

// 获取快递设置信息
export function getExpressInfo() {
  return $http.get("/shipper")
}

// 更新快递设置信息
export function updateExpressInfo(data) {
  return $http.post("/admin/storeShipperSettings", data)
}

// 获取所有的地区
export function getAllRegion() {
  return $http.get("/order/getAllRegion")
}

//快递信息
interface IShipperInfo {
  id: number
  name: string
  code: string
  sort_order: number
  MonthCode: string
  CustomerName: string
  enabled: number
}

/**
 * @description 获取某个快递信息
 * @param id
 * @returns
 */
export function getShipperInfoById(id: number) {
  return $http.get<IShipperInfo>("/shipper/info", {
    params: {
      id
    }
  })
}

/**
 * @description 保存快递数据
 * @param data
 * @returns
 */
export function storeShipper(data: IShipperInfo) {
  return $http.post<string>("/shipper/store", data)
}

//快递公司列表数据
/**
 * @description 获取快递列表数据
 * @param data
 * @returns
 */
export function getShipperList(data: Partial<IShipperInfo> = {}) {
  return $http.get<any>("/shipper/list", {
    params: { ...data }
  })
}

/**
 * @description 删除快递数据
 * @param data
 * @returns
 */
export function deleteShipper(id: number) {
  return $http.post<string>("/shipper/destory", {
    id
  })
}

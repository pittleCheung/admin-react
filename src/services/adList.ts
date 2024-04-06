import { $http } from "src/utils/request"

type AdInfo = {
  id: string
  image_url: string // 广告图片
  link_type: number // 商品类型
  goods_id: string // 商品id
  link: string // 广告链接
  sort_order: number // 排序
  end_time: string // 结束时间
  enabled: number // 广告启用
}

/**
 * @description 获取广告列表
 * @param data
 * @returns
 */
export function getAdList(params: ICommonPaging) {
  return $http.get("/ad", {
    params
  })
}

/**
 * @description 更新广告状态
 * @param data
 * @returns
 */
export const updateEnableStatus = (params) => {
  return $http.get("ad/saleStatus", {
    params
  })
}

/**
 * @description 更新广告排序
 * @param data
 * @returns
 */
export function updateAdSort(data) {
  return $http.post("/ad/updateSort", data)
}

/**
 * @description 获取广告详情信息
 * @param id
 * @returns
 */
export function getAdInfo(id: string) {
  return $http.get<AdInfo>("/ad/info", {
    params: {
      id
    }
  })
}

/**
 * @description 删除广告
 * @param id
 */
export function deleteAd(id: number) {
  return $http.post("/ad/destory", { id })
}

/**
 * @description 获取关联商品数据
 * @returns
 */
export function getAllRelate() {
  return $http.get("/ad/getallrelate")
}

/**
 * @description 添加\编辑广告信息
 * @param data
 * @returns
 */
export function storeAdInfo(data: AdInfo) {
  return $http.post<AdInfo>("/ad/store", data)
}

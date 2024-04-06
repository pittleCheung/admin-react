import { $http } from "src/utils/request"

// 商品列表结果
type GoodsListResult = {
  count: number
  currentPage: number
  data: GoodsData[]
  pageSize: number
  totalPages: number
}

// 商品查询条件
interface IGoodsQuery {
  page: number
  size: number
  name?: string
}

// 商品数据
type GoodsData = {
  id: number
  category_id: number
  //是否上架
  is_on_sale: string | number | boolean
  name: string
  goods_number: number
  //销量
  sell_volume: number
  keywords: string
  retail_price: string
  min_retail_price: number
  cost_price: string
  min_cost_price: number
  goods_brief: string
  goods_desc: string
  sort_order: number
  // 是否首页显示
  is_index: true
  is_new: number | boolean
  goods_unit: string
  https_pic_url: string
  list_pic_url: string
  freight_template_id: number
  freight_type: number
  is_delete: number
  has_gallery: number
  has_done: number
  category_name: string
  product: any[]
}

/**
 * @description 获取全部商品
 * @returns
 */
export function getGoodsAll(data: IGoodsQuery) {
  return $http.get<GoodsListResult>("/goods", {
    params: {
      page: data.page,
      size: data.size,
      name: data.name
    }
  })
}

/**
 * @description 获取出售商品
 * @param data
 * @returns
 */
export function getGoodsOnSale(data: IGoodsQuery) {
  return $http.get<GoodsListResult>("/goods/onsale", {
    params: {
      page: data.page,
      size: data.size
    }
  })
}

/**
 * @description 获取已售完商品
 * @param data
 * @returns
 */
export function getGoodsOut(data: IGoodsQuery) {
  return $http.get<GoodsListResult>("/goods/out", {
    params: {
      page: data.page,
      size: data.size
    }
  })
}

/**
 * @description 获取已下架商品
 * @param data
 * @returns
 */
export function getGoodsDrop(data: IGoodsQuery) {
  return $http.get<GoodsListResult>("/goods/drop", {
    params: {
      page: data.page,
      size: data.size
    }
  })
}

/**
 * @description 删除商品
 * @param
 * @returns
 */
export function deleteGoods(id: number) {
  return $http.post<string>("/goods/destory", { id })
}

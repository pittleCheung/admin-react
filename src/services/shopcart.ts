import { IShopCartQuery } from "src/types/shopcart"
import { $http } from "src/utils/request"

// 获取购物车列表
export function getShopCart(params: Partial<IShopCartQuery>) {
  return $http.get("/shopcart", {
    params: {
      page: params.page,
      size: params.size,
      name: params.name
    }
  })
}

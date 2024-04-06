interface AntPagerData<T = any> {
  current: number
  pageSize: number
  total: number
  rows: T[]
}

interface ICommonPaging {
  /**
   * 当前页
   */
  page: number

  /**
   * 分页大小
   */
  size: number
}

interface IPageData<T = any> extends ICommonPaging {
  /**
   * 总数据
   */
  total?: number

  /**
   * 处理后的统一数组
   */
  list?: T[]

  /**
   * 分页对象
   */
  paging?: Omit<AntPagerData, "rows">
}

/**
 * 后端返回数据格式
 */
interface IResponseData<T extends any | IPageData<P> = any, P = any> {
  errno: number
  data: T
  msg: string
}

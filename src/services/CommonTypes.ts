// 响应错误消息
export interface IResponseError {
  err: string
  data: null
}

// 正常响应
export interface IResponseData<T> {
  err: ""
  data: T
}

// 分页结果
export interface IResponsePageData<T> {
  err: ""
  total: number
  data: T[]
}

// 查询条件
export interface ISearchCondition {
  page: number
  limit: number
  key: string
}

export type ISearchConditionPartial = Partial<ISearchCondition>

export enum SwitchType {
  isHot = "isHot",
  isComing = "isComing",
  isClassic = "isClassic"
}

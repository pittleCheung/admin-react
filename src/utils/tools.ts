// export const debounce = function (handler: any, delay: number | undefined){
//   delay = delay || 300;
//   let timer:any = null;
//   return (...args:any[]) =>{
//     clearTimeout(timer);
//     timer = setTimeout(() =>{
//       // @ts-ignore
//       handler.apply(this, args);
//     }, delay);
//   }
// }

// import { IBlogListQuery } from 'src/types/bloglist'

// 错误写法 箭头函数特性
// 1不能作为构造函数，不能使用new
// 2不能使用argumetns,取而代之用rest参数...解决
// 3不绑定this，会捕获其定义时所在的this指向作为自己的this。由于在vue中自动绑定 this 上下文到实例中，因此不能使用箭头函数来定义一个周期方法。箭头函数的this永远指向上下文的this，call、apply、bind也无法改变
// 4箭头函数没有原型对象
// export const debounce = function (handler: any, delay: number | undefined){
//   delay = delay || 300;
//   let timer:any = null;
//   return (...args:any[]) =>{
//     clearTimeout(timer);
//     timer = setTimeout(function(){
//       handler.apply(this, args);  //
//     }, delay);
//   }
// }

export const debounce = function (handler: any, delay: number | undefined) {
  delay = delay || 300
  let timer: any = null
  return () => {
    // const self = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      handler.apply(globalThis, arguments)
    }, delay)
  }
}

// 时间格式化
export const parseTime = (time: any) => {
  if (typeof time === "string") {
    time = parseInt(time)
  }
  const format = "{y}-{d}-{m} {h}:{i}:{s}"
  const date = new Date(time)
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1, //月是从0开始算的
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds()
  }
  // console.log(formatObj);
  const strTime = format.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = "0" + value
    }
    return value
  })
  return strTime
}

type XExtends<T, K extends keyof any = string, V = any> = T & { [P in K]: V }

export const initPagerData = <K extends string, T = any>(key: K) => {
  const list = { [key]: [] } as unknown as { [P in K]: T[] }
  const data: XExtends<IPageData<T>, K, T[]> = {
    size: 10,
    page: 1,
    totalPages: 0,
    data: [],
    ...list
  }
  return data
}
/**
 *
 * @param key
 * @param data
 * @param query  如果后端没有给我们传递current pageSize 这时候我们需要从onChange中获取当前current
 * @returns
 */
export const data2PageData = <T, K extends string>(
  key: K,
  data = initPagerData(key),
  query?: Partial<ICommonPaging>
) => {
  data.paging = {
    current:
      query?.page || data?.[key]?.["currentPage"] || data?.["currentPage"] || 1,
    pageSize:
      query?.size || data?.[key]?.["pageSize"] || data["pageSize"] || 10,
    total: data?.[key]?.["count"] || data?.["count"] || 0
  }
  if (data?.[key]) {
    data.list = data?.[key]?.["data"]
  } else if (data?.["data"]) {
    data.list = data["data"]
  } else {
    data.list = data as any
  }
  // data.list = data?.[key]?.["data"]
  //   ? data?.[key]?.["data"]
  //   : data?.["data"]
  //   ? data["data"]
  //   : (data as any) // 统一成list
  delete data[key]
  return data
}

export const paging2Params = (
  paging: Omit<AntPagerData<any>, "rows">
): ICommonPaging => {
  return {
    page: paging.current,
    size: paging.pageSize
  }
}

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import { message } from "antd"
import { storage } from "./auth"

console.log(import.meta.env, "import.meta.env.TYPE")

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // baseURL: "http://127.0.0.1:8360/admin/",
  // baseURL:
  //   import.meta.env.MODE === "development"
  //     ? "http://127.0.0.1:8360/admin/"
  //     : "https://www.qile.club:8688/admin",
  baseURL: import.meta.env.VITE_SERVE,
  timeout: 5000 // request timeout
})

const errHelper = (error) => {
  console.log(error, "error")
  if (error.response) {
    const { data, status, config } = error.response
    if (status === 403) {
      message.error("Forbidden")
    } else if (status === 401) {
      storage.clear(true)
      location.hash = "/login"
      // AuthService.getAuthServiceInstance().login()
    } else if (data?.code !== 0 && data?.msg) {
      message.error(data?.msg || data?.message)
    }
  }
  return Promise.reject(error.response)
}

// request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers["X-Hioshop-Token"] = token
    }
    return config
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    const res = response.data

    // if(res.code == 401){
    //   storage.clear(true)
    //   location.hash = '/login'
    // }
    //登录的的时候服务器会传authentication字段
    if (response.headers["X-Hioshop-Token"]) {
      //响应头里面如果有这个字段 我们需要将这个字段存储到localstorage 之后请求都需要将这个token 带到服务器
      localStorage.token = response.headers["X-Hioshop-Token"]
    }

    return res //响应放行
  },
  (error) => {
    console.log("err" + error) // for debug
    message.error(error.message, 2)
    return Promise.reject(error)
  }
)

class Http {
  // request
  private request<T>(config: AxiosRequestConfig) {
    return new Promise<T>((resolve, reject) => {
      service
        .request<any, IResponseData<T>>(config)
        .then((res) => {
          console.log(res, "xxx")
          if (res.errno === 0 || typeof res === "string") {
            resolve(res.data)
          } else if (res.errno == 401) {
            storage.clear(true)
            location.hash = "/login"
          } else {
            reject(res)
          }
        })
        .catch(reject)
    })
  }

  /**
   * get请求
   * ```
   * get<T>('/api') // => Promise<T>
   * get<T>('/api', { params: { id: 123 } }) // => Promise<T>
   * ```
   * @param url 请求url
   * @param config AxiosRequestConfig
   */
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>(Object.assign({ url }, config))
  }

  /**
   * post请求
   * ```
   * post<T>('/api') // => Promise<T>
   * post<T>('/api', { id: 123, name: 'James' }, {...}) // => Promise<T>
   * ```
   * @param url 请求url
   * @param data json格式对象
   * @param config AxiosRequestConfig
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>(Object.assign({ url, method: "post", data }, config))
  }

  delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>(
      Object.assign({ url, method: "delete", data }, config)
    )
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>(Object.assign({ url, method: "put", data }, config))
  }
}

export const $http = new Http()

// export default service

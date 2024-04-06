// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// import Cookies from 'js-cookie'

// const TokenKey = 'adminToken'

// export function getToken() {
//   return localStorage.getItem(TokenKey)
// }

// export function setToken(token) {
//   return localStorage.setItem(TokenKey, token)
// }

// export function removeToken() {
//   return localStorage.removeItem(TokenKey)
// }

import { EXCLUDE_STORAGE_KEYS, LANG } from "src/config"

/**
 * storage
 * 包含获取、设置、删除、清空方法
 * get(key: stirng): string
 * set(key: string, val: string): void
 * del(key: stirng): void
 * clear(): void
 */
export const storage = {
  get(key: string) {
    return localStorage.getItem(key) || ""
  },

  set(key: string, val: string) {
    localStorage.setItem(key, val)
  },

  multiSet(keyVals: string[][]) {
    keyVals.forEach((item) => {
      localStorage.setItem(item[0], item[1])
    })
  },

  del(key: string) {
    localStorage.removeItem(key)
  },

  multiDel(keys: string[]) {
    keys.forEach((key) => {
      localStorage.removeItem(key)
    })
  },

  clear(exclude?: boolean) {
    if (exclude) {
      Object.keys(localStorage).forEach((key) => {
        if (!EXCLUDE_STORAGE_KEYS.includes(key)) {
          this.del(key)
        }
      })
    } else {
      localStorage.clear()
    }
  }
}

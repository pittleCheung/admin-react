// import CryptoJS from 'crypto-js'//

// export function Decrypt(word,key){
//   var decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   }).toString(CryptoJS.enc.Utf8);
//   return JSON.parse(decrypt);
// }

import CryptoJS from "crypto-js" //

export function Decrypt(word: any, key: any) {
  const decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
  return JSON.parse(decrypt)
}

function orderBy(arr: any[], item: any, flag: any) {
  if (flag) {
    //降序
    arr.sort(
      (a, b) => new Date(b[item]).getTime() - new Date(a[item]).getTime()
    )
  } else {
    arr.sort(
      (a, b) => new Date(a[item]).getTime() - new Date(b[item]).getTime()
    )
  }
}

export function groupBy(item: any, arr: any) {
  arr = arr.filter((i: any) => i) // 筛选非空
  orderBy(arr, item, null) // 排序
  const set = new Set()
  let arrByDate: string | any[] = []
  // 去重
  for (let k = 0; k < arr.length; k++) {
    set.add(arr[k][item].slice(0, 10))
    arrByDate = Array.from(set)
  }
  // 分组
  // eslint-disable-next-line prefer-const
  let [newArr, itemArr]: any = [[], []]
  for (let i = 0; i < arrByDate.length; i++) {
    itemArr = []
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][item].slice(0, 10) === arrByDate[i]) {
        itemArr.push(arr[j])
      }
    }
    newArr.push(itemArr)
  }
  return newArr
}

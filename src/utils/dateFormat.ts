// Date.prototype.format = function(format) {
//   var date = {
//          "M+": this.getMonth() + 1,
//          "d+": this.getDate(),
//          "h+": this.getHours(),
//          "m+": this.getMinutes(),
//          "s+": this.getSeconds(),
//          "q+": Math.floor((this.getMonth() + 3) / 3),
//          "S+": this.getMilliseconds()
//   };
//   if (/(y+)/i.test(format)) {
//          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   for (var k in date) {
//          if (new RegExp("(" + k + ")").test(format)) {
//                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
//                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
//          }
//   }
//   return format;
// }

export function jsonDateFormat(jsonDt, format) {
  const timestamp = jsonDt.replace(/\/Date\((\d+)\)\//, "$1")
  const date = new Date(Number(timestamp))

  const dtObj = {
    "M+": date.getMonth() + 1, //月
    "d+": date.getDate(), //日
    "h+": date.getHours(), //时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds() //秒
  } //因为年份是4位数，所以单独拿出来处理

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  } //遍历dtObj
  for (const k in dtObj) {
    //dtObj的属性名作为正则进行匹配
    if (new RegExp("(" + k + ")").test(format)) {
      //月，日，时，分，秒 小于10时前面补 0
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? dtObj[k]
          : ("00" + dtObj[k]).substr(("" + dtObj[k]).length)
      )
    }
  }

  return format
}

// 调用
// jsonDateFormat("/Date(1448864369815)/","yyyy-MM-dd hh:mm:ss");

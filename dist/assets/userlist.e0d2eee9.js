import{$ as t}from"./index.0ce2eb6d.js";async function s(e){return t.get("/user/",{params:{page:e.page,size:e.size,nickname:e.nickname}})}function n(e){return t.post("user/updateInfo",e)}function a(e){return t.get("/user/info",{params:{id:e}})}function u(e){return t.post("user/updateName",e)}function o(e){return t.post("user/updateMobile",e)}function i(e){return t.get("/user/datainfo",{params:{id:e}})}function p(e){return t.get("/user/order",{params:{id:e}})}export{o as a,a as b,p as c,i as d,n as e,s as g,u};

import{$ as l,u as S,r as g,ba as T,b4 as h,g as p,j as s,aS as F,b2 as c,I as A,S as _,T as y}from"./index.0ce2eb6d.js";import{d as a,p as r}from"./tools.decfb751.js";import{T as w}from"./index.8096eeca.js";import{T as v}from"./Table.8b57651f.js";import{I as G}from"./index.043d2106.js";import{S as f}from"./index.667d1cc1.js";import"./index.08278916.js";function Q(o){return l.get("/goods",{params:{page:o.page,size:o.size,name:o.name}})}function O(o){return l.get("/goods/onsale",{params:{page:o.page,size:o.size}})}function j(o){return l.get("/goods/out",{params:{page:o.page,size:o.size}})}function P(o){return l.get("/goods/drop",{params:{page:o.page,size:o.size}})}function K(o){return l.post("/goods/destory",{id:o})}const U=()=>{const o=S(),[n,d]=g.exports.useState(a("goodsList")),[m]=T(),[i,b]=g.exports.useState("1");h.useMessage();const C=e=>{b(e),u({page:1,size:10},e)},D=[{key:"1",label:"\u5168\u90E8\u5546\u54C1"},{key:"2",label:"\u51FA\u552E\u4E2D"},{key:"3",label:"\u5DF2\u552E\u5B8C"},{key:"4",label:"\u5DF2\u4E0B\u67B6"}],x=(e=r(n.paging))=>{Q(e).then(t=>{console.log(a("goodsList",t),e,t),d(a("goodsList",t))})},z=[{title:"ID",dataIndex:"id",render:e=>s("a",{children:e})},{title:"\u5546\u54C1\u56FE\u7247",render:e=>s(G,{width:200,src:e.https_pic_url,style:{width:"50px",height:"50px"}})},{title:"\u5546\u54C1\u540D\u79F0",dataIndex:"name"},{title:"\u6392\u5E8F",dataIndex:"sort_order",render:e=>s("a",{children:e})},{title:"\u9500\u91CF",dataIndex:"sell_volume"},{title:"\u5E93\u5B58",dataIndex:"sell_volume"},{title:"\u9996\u9875\u663E\u793A\u72B6\u6001",render:(e,t)=>s(f,{checked:e.is_index})},{title:"\u4E0A\u67B6\u72B6\u6001",render:(e,t)=>s(f,{checked:e.is_on_sale})},{title:"\u64CD\u4F5C",render:(e,t)=>p(_,{children:[s(y,{placement:"top",title:"\u7F16\u8F91",children:s("a",{onClick:()=>I(t),style:{cursor:"pointer"},children:"\u7F16\u8F91"})}),s(y,{placement:"top",title:"\u5220\u9664",children:s("a",{onClick:()=>E(t.id),style:{cursor:"pointer"},children:"\u5220\u9664"})})]})}],E=async e=>{await K(e),h.success("\u5220\u9664\u6210\u529F"),u({page:1,size:10},i)},I=e=>{o("/goods/goodList/edit/"+e.id)};g.exports.useEffect(()=>{u({page:1,size:10},i)},[i]);const u=(e=r(n.paging),t)=>{switch(t){case"1":x(e);break;case"2":B(e);break;case"3":L(e);break;case"4":k(e);break}},k=(e=r(n.paging))=>{O(e).then(t=>{console.log(a("goodsList",t),e,t),d(a("goodsList",t))})},B=(e=r(n.paging))=>{j(e).then(t=>{console.log(a("goodsList",t),e,t),d(a("goodsList",t))})},L=(e=r(n.paging))=>{P(e).then(t=>{console.log(a("goodsList",t),e,t),d(a("goodsList",t))})};return p("div",{children:[s(F,{type:"primary",children:"\u6DFB\u52A0\u5546\u54C1"}),s(w,{defaultActiveKey:"1",items:D,onChange:C}),p(c,{wrapperCol:{span:22.5},layout:"inline",labelAlign:"left",style:{marginTop:"20px"},disabled:i!=="1",form:m,onFinish:e=>{const t=m.getFieldsValue();console.log(t,"target"),u({...t,page:1,size:10},i)},children:[s(c.Item,{label:"\u5546\u54C1\u540D\u79F0",name:"name",children:s(A,{placeholder:"\u8F93\u5165\u641C\u7D22\u7684\u5546\u54C1\u540D\u79F0"})}),s(c.Item,{children:s(F,{type:"primary",htmlType:"submit",children:"\u641C\u7D22"})})]}),s(v,{columns:z,pagination:{...n.paging,onChange:(e,t)=>u({page:e,size:t},i)},dataSource:n.list,rowKey:e=>e.id})]})};export{U as default};
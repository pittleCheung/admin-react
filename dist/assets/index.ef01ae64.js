import{r as d,b4 as o,u as E,g as u,F as y,j as a,aS as C,S as D,T as c}from"./index.0ce2eb6d.js";import{g as I,d as S,u as w}from"./adList.e138721f.js";import{d as i,p as L}from"./tools.decfb751.js";import{T as b}from"./Table.8b57651f.js";import{I as k}from"./index.043d2106.js";import{S as T}from"./index.667d1cc1.js";import"./index.08278916.js";const K=()=>{const[n,l]=d.exports.useState(i("AdList")),[p,g]=o.useMessage(),r=E(),m=async(e,t)=>{await w({id:t.id,status:e}),p.success("\u4FEE\u6539\u6210\u529F"),s()},h=[{title:"ID",dataIndex:"id",render:e=>a("a",{children:e})},{title:"\u5E7F\u544A",render:e=>a(k,{width:200,src:e.image_url,style:{width:"50px",height:"50px"}})},{title:"\u5173\u8054\u5546\u54C1",dataIndex:"goods_id",render:e=>a("a",{children:e})},{title:"\u7ED3\u675F\u65F6\u95F4",dataIndex:"end_time",render:e=>a("a",{children:e})},{title:"\u6392\u5E8F",dataIndex:"sort_order",render:e=>a("a",{children:e})},{title:"\u5F00\u542F\u72B6\u6001",render:(e,t)=>a(T,{onChange:f=>m(f,t),checked:e.enabled})},{title:"\u64CD\u4F5C",render:(e,t)=>u(D,{children:[a(c,{placement:"top",title:"\u7F16\u8F91",children:a("a",{onClick:()=>x(t),style:{cursor:"pointer"},children:"\u7F16\u8F91"})}),a(c,{placement:"top",title:"\u5220\u9664",children:a("a",{onClick:()=>A(t),style:{cursor:"pointer"},children:"\u5220\u9664"})})]})}],s=(e=L(n.paging))=>{I(e).then(t=>{console.log(i("AdList",t),e,t),l(i("AdList",t))})};d.exports.useEffect(()=>{s()},[]);const F=()=>{r("/settings/adList/add")},x=e=>{r("/settings/adList/"+e.id)},A=async e=>{await S(e.id),o.success("\u5220\u9664\u6210\u529F"),s()};return u(y,{children:[a(C,{type:"primary",onClick:F,children:"\u6DFB\u52A0\u5E7F\u544A"}),g,a(b,{columns:h,pagination:{...n.paging,onChange:(e,t)=>s({page:e,size:t})},dataSource:n.list,rowKey:e=>e.id})]})};export{K as default};
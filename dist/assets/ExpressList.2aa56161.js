import{u as F,r as d,g as n,j as t,az as f,aS as o,S as E,T as u,b4 as C}from"./index.0ce2eb6d.js";import{c as y,d as D}from"./expressSetting.325eb581.js";import{d as c,p as S}from"./tools.decfb751.js";import{T as k}from"./Table.8b57651f.js";import{S as I}from"./index.667d1cc1.js";import"./index.08278916.js";const T=()=>{const i=F(),[s,l]=d.exports.useState(c("expressList")),r=(e=S(s.paging))=>{console.log(e,"query",s),y(e).then(a=>{l(c("expressList",a))})},p=()=>{i("/expressAdd")},g=()=>{i(-1)},m=e=>{i("/ExpressEdit/"+e.id)},x=async e=>{await D(e.id),C.success("\u5220\u9664\u6210\u529F"),r()},h=[{title:"ID",dataIndex:"id",render:e=>t("a",{children:e})},{title:"\u540D\u5B57",dataIndex:"name"},{title:"\u4EE3\u53F7",dataIndex:"code"},{title:"\u6392\u5E8F",dataIndex:"sort_order"},{title:"\u4F7F\u7528",render:e=>t(I,{checked:e.enabled===1,disabled:!0})},{title:"\u64CD\u4F5C",render:(e,a)=>n(E,{children:[t(u,{placement:"top",title:"\u7F16\u8F91",children:t(o,{onClick:()=>m(a),children:"\u7F16\u8F91"})}),t(u,{placement:"top",title:"\u5220\u9664",children:t(o,{danger:!0,onClick:()=>x(a),children:"\u5220\u9664"})})]})}];return d.exports.useEffect(()=>{r()},[]),n("div",{children:[n("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n("div",{style:{cursor:"pointer"},onClick:g,children:[t(f,{}),t("span",{children:" \u8FD4\u56DE\u5217\u8868"})]}),t(o,{onClick:p,type:"primary",children:"\u6DFB\u52A0\u5FEB\u9012\u516C\u53F8"})]}),t(k,{columns:h,pagination:{...s.paging,onChange:(e,a)=>{console.log(s,"xxx"),r({page:e,size:a})}},dataSource:s.list,rowKey:e=>e.id})]})};export{T as default};
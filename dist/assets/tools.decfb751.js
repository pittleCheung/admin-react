const p=s=>{const e={[s]:[]};return{size:10,page:1,totalPages:0,data:[],...e}},l=(s,e=p(s),i)=>{var n,g,c,o;return e.paging={current:(i==null?void 0:i.page)||((n=e==null?void 0:e[s])==null?void 0:n.currentPage)||(e==null?void 0:e.currentPage)||1,pageSize:(i==null?void 0:i.size)||((g=e==null?void 0:e[s])==null?void 0:g.pageSize)||e.pageSize||10,total:((c=e==null?void 0:e[s])==null?void 0:c.count)||(e==null?void 0:e.count)||0},e!=null&&e[s]?e.list=(o=e==null?void 0:e[s])==null?void 0:o.data:e!=null&&e.data?e.list=e.data:e.list=e,delete e[s],e},r=s=>({page:s.current,size:s.pageSize});export{l as d,r as p};

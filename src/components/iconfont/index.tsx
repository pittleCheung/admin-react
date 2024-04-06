import { createFromIconfontCN } from "@ant-design/icons"
// import iconfont from '../../assets/iconfont/iconfont'

// console.log(new URL('../../assets/iconfont/iconfont', import.meta.url))

const IconFont = createFromIconfontCN({
  // scriptUrl: iconfont, //<IconFont type="icon-blogliuyanban" />
  scriptUrl: new URL("../../assets/iconfont/iconfont", import.meta.url) as any,
  extraCommonProps: {}
})
export default IconFont

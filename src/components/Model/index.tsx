import React from "react"
import "./index.css"

export default function Model(props) {
  const defaultProps = {
    //默认属性
    bg: "rgba(0,0,0,.5)"
  }
  const datas = Object.assign({}, defaultProps, props)

  return (
    <div
      onClick={(e: any) => {
        if (e.target.className === "model") {
          datas.onClose()
        }
      }}
      className="model"
      style={{
        background: datas.bg
      }}
    >
      <div className="model-center">{datas.children}</div>
    </div>
  )
}

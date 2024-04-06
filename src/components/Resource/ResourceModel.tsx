import { CheckOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  Button,
  Col,
  Modal,
  Row,
  Image,
  message,
  Popconfirm,
  Upload,
  Spin,
  UploadProps,
  UploadFile
} from "antd"
import { it } from "node:test"
import React, { useEffect, useState } from "react"
import { ossdel, osslist, ossupload } from "src/utils/oss"

/**
 *
 * todolist
 * 1. 创建文件夹,展示文件的的形式
 */

const ResourceModel = ({ src, open, onOk, onCancel }: any) => {
  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")
  const [hovered, setHovered] = useState<string>("")

  const onQuery = async () => {
    setLoading(true)
    const res = await osslist()
    setList(res.objects)
    setLoading(false)
  }

  useEffect(() => {
    onQuery()
  }, [])

  // 同步选中当前的图片
  useEffect(() => {
    setUrl(src ? src : "")
  }, [src])

  const onSelectPic = (pic: string) => {
    setUrl(pic === url ? "" : pic)
  }
  const onSelectOk = () => {
    onOk(url)
  }
  const onHovered = (url: string) => {
    setHovered(url)
  }

  const onDelItem = async (e, name: string) => {
    await ossdel(name)
    setList(list.filter((i) => i.name !== name))
    message.success("删除成功")
    e.stopPropagation()
  }

  // beforeUpload 限制用户上传的图片格式和大小。
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const customRequest = async (fileOption: any) => {
    const file = fileOption.file
    await ossupload(file.name, file)
    onQuery()
  }

  const props: UploadProps = {
    // beforeUpload,
    customRequest,
    defaultFileList: [],
    showUploadList: false
  }

  return (
    <>
      <Modal
        title="资源中心"
        centered
        open={open}
        onCancel={onCancel}
        width={"80%"}
        style={{ overflow: "hidden" }}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Upload {...props}>
              <Button>上传</Button>
            </Upload>
            <Button onClick={onSelectOk}>确定</Button>
          </div>
        }
      >
        <Spin spinning={loading}>
          <div style={{ overflowY: "scroll", height: "70vh" }}>
            <Row gutter={[16, 16]}>
              {list
                .filter((i) => !i.name.includes("/."))
                .map((item, i) => (
                  <Col span={3} key={i}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        position: "relative"
                      }}
                      // className={url === item.url ? "active" : ""}
                      onClick={() => onSelectPic(item.url)}
                      onMouseEnter={() => onHovered(item.url)}
                    >
                      <div style={{ position: "relative" }}>
                        <img width={100} height={100} src={item.url} />
                        <div
                          style={
                            url === item.url
                              ? {
                                  background: "rgba(0, 0, 0, 0.4)",
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  right: 0,
                                  bottom: 0
                                }
                              : {}
                          }
                        ></div>
                      </div>
                      <div>{item.name}</div>
                      <CheckOutlined
                        style={{
                          display: url === item.url ? "block" : "none",
                          position: "absolute",
                          transform: "translate(-50%,-50%)",
                          top: "50%",
                          left: "50%",
                          color: "#fff",
                          fontSize: "32px",
                          zIndex: 100
                        }}
                      />
                      <Popconfirm
                        title="确定要删除吗?"
                        onConfirm={(e) => onDelItem(e, item.name)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined
                          style={{
                            position: "absolute",
                            right: 20,
                            bottom: 20,
                            padding: "10px",
                            cursor: "pointer",
                            display: hovered === item.url ? "block" : "none"
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                      {/* <DeleteOutlined
                      style={{
                        position: "absolute",
                        right: 30,
                        bottom: 30,
                        cursor: "pointer",
                        display: hovered === item.url ? "block" : "none"
                      }}
                      onClick={(e) => onDelItem(e, item.name)}
                    /> */}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Spin>
      </Modal>
    </>
  )
}

// <form id="uploadForm" action="/upload" method="post">
//   <input type="file" name="fileInput" id="fileInput" accept="*/*" />
// </form>

export default ResourceModel

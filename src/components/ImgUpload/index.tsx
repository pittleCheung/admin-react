import React, { useState } from "react"
import { message, Modal, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { UploadFile } from "antd/lib/upload/interface"
import { IResponseData, IResponseError } from "../../services/CommonTypes"

interface IImgUploadProps {
  value?: string
  onChange?: (imgUrl: string) => void
}

const ImgUpload: React.FC<IImgUploadProps> = (props) => {
  const [fileList, setFileList] = useState({})
  const [visible, setVisible] = useState(false)

  const getUploadContent = () => {
    if (props.value) {
      return null
    } else {
      return (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>点击上传</div>
        </div>
      )
    }
  }

  const getFileList = (): UploadFile[] => {
    if (props.value) {
      return [
        {
          uid: props.value,
          name: props.value,
          url: props.value
        }
      ]
    }
    return []
  }

  /**
   * 
   * @param p 
   * action: "/api/upload"
     data: {}
     file: File {uid: 'rc-upload-1654246853211-7', name: '005530-16478817309a37.jpg', lastModified: 1650617639722, lastModifiedDate: Fri Apr 22 2022 16:53:59 GMT+0800 (中国标准时间), webkitRelativePath: '', …}
     filename: "imgfile"
     headers: {}
     method: "post"
     onError: ƒ onError(err, ret)
     onProgress: ƒ onProgress(e)
     onSuccess: ƒ onSuccess(ret, xhr)
     withCredentials: false
   */
  const onRequest = async (p: any) => {
    const formData = new FormData()
    formData.append(p.filename, p.file)
    console.log(headers())
    const request = new Request(p.action, {
      method: "post",
      body: formData,
      headers: {
        ...headers()
      }
    })
    const resp: IResponseData<string> | IResponseError = await fetch(
      request
    ).then((resp) => resp.json())
    if (resp.err) {
      message.error("上传失败！")
    } else {
      //触发回调
      if (props.onChange) {
        props.onChange(resp.data!)
      }
    }
  }

  const handleChange = ({ fileList }) => setFileList({ fileList })

  const headers = () => {
    const token = localStorage.getItem("adminToken")
    return {
      Authorization: "Bearer " + token //从本地添加token
    }
  }

  return (
    <div>
      <Upload
        action="/api/upload"
        name="file"
        accept=".jpg,.png,.gif"
        listType="picture-card"
        customRequest={onRequest}
        onRemove={() => {
          if (props.onChange) {
            props.onChange("")
          }
        }}
        onPreview={() => {
          setVisible(true)
        }}
        fileList={getFileList()}
        // onChange={handleChange}
      >
        {/* {fileList.length >= 8 ? null : uploadButton} */}
        {getUploadContent()}
      </Upload>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        footer={null}
      >
        <img alt="" style={{ width: "100%" }} src={props.value} />
      </Modal>
    </div>
  )
}

export default ImgUpload

// 父组件引用
// import React, { useState } from 'react';
// import ImgUpload  from '../../components/ImgUpload';
// function AddMovie() {
//   const [img,setImg] = useState("")
//   return (
//     <div>
//         <ImgUpload value={img} onChange={(newVal) => {
//            setImg(newVal)
//         }}/>
//     </div>
//   );
// }

// export default AddMovie;

import { PlusOutlined } from "@ant-design/icons"
import {
  Upload,
  Form,
  Radio,
  DatePicker,
  Input,
  Button,
  Space,
  Switch,
  InputNumber,
  Modal,
  Table,
  Image,
  message
} from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getAdInfo, getAllRelate, storeAdInfo } from "src/services/adList"
import locale from "antd/es/date-picker/locale/zh_CN"
import ImgUpload from "src/components/ImgUpload"
import dayjs from "dayjs"
import Model from "src/components/Model"
import { data2PageData } from "src/utils/tools"
import { ColumnsType } from "antd/es/table"
import { text } from "stream/consumers"
import Resource from "src/components/Resource"

interface DataType {
  id: number
  list_pic_url: string
  name: string
}
const AdListAddorEdit = () => {
  const { id } = useParams()
  const [open, setOpen] = useState<boolean>(false)
  const navigator = useNavigate()
  const [form] = Form.useForm()
  const [adInfo, setAdInfo] = useState()
  const [link, setLink] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [pageData, setPageData] = useState<DataType[]>([])

  // console.log(id)
  useEffect(() => {
    if (id) {
      getAdInfo(id).then((res) => {
        // setAdInfo(res)
        form.setFieldsValue({
          ...res,
          end_time: dayjs(res.end_time)
        })
        setType(res.link_type)
      })
    }
  }, [id, form])

  const onSelectType = (e) => {
    const type = e.target.value
    setType(type)
  }
  const onBack = () => {
    navigator(-1)
  }

  const onSure = async () => {
    //
    console.log(form.getFieldsValue())
    const values = form.getFieldsValue()
    console.log(values, "xxx")
    const res = await storeAdInfo({
      ...values,
      enabled: values.enabled ? 1 : 0
    })
    message.success("修改成功")
    onBack()
  }

  const onRelate = async () => {
    //
    setOpen(true)
    const res = await getAllRelate()
    setPageData(res)
    console.log(res, "res")
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "商品图片",
      render: (text) => (
        <Image
          width={200}
          src={text.list_pic_url}
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      render: (t, r) => (
        <Button onClick={() => onSelectRelate(r.id)}>选择</Button>
      )
    }
  ]

  const onSelectRelate = (id: number) => {
    form.setFieldsValue({
      goods_id: id
    })
    setOpen(false)
  }

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        // initialValues={{
        //   link_type: 0
        // }}
        form={form}
        preserve={false}
        onFinish={onSure}
      >
        <Form.Item name="id"></Form.Item>
        <Form.Item
          label="广告图片"
          name="image_url"
          rules={[
            {
              required: true,
              message: "请选择一张图片"
            }
          ]}
        >
          <Resource />
        </Form.Item>

        <Form.Item label="商品类型" name="link_type">
          <Radio.Group onChange={onSelectType}>
            <Radio value={0}> 商品id </Radio>
            <Radio value={1}> 链接 </Radio>
          </Radio.Group>
        </Form.Item>

        <div style={{ display: type === 0 ? "block" : "none" }}>
          <Form.Item label="商品id" name="goods_id">
            <Input />
          </Form.Item>
          <Form.Item style={{ marginLeft: "100px" }}>
            <Button
              type="primary"
              style={{ marginTop: "10px" }}
              onClick={onRelate}
            >
              添加关联商品
            </Button>
          </Form.Item>
        </div>

        <Form.Item
          label="广告链接"
          name="link"
          style={{ display: type === 1 ? "block" : "none" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="end_time"
          label="结束时间"
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "请选择结束时间"
            }
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />
        </Form.Item>

        <Form.Item name="sort_order" label="排序">
          <InputNumber min={1} max={1000} defaultValue={1} />
        </Form.Item>

        <Form.Item label="广告启用" name="enabled">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button onClick={onBack}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal
        open={open}
        title="Title"
        width={"60%"}
        style={{ height: "80vh" }}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Table
          pagination={{
            pageSize: 5
          }}
          columns={columns}
          dataSource={pageData}
          rowKey={(record) => record.id}
        ></Table>
      </Modal>
    </div>
  )
}

export default AdListAddorEdit

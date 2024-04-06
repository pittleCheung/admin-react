import { Button, Cascader, Form, Input, Switch, Tooltip, message } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
  getAllRegion,
  getExpressInfo,
  updateExpressInfo
} from "src/services/expressSetting"
interface DataType {
  id: number
  name: string
  code: string
  CustomerName: string
  MonthCode: string
}

const index = () => {
  const [form] = Form.useForm()
  const [region, setRegion] = useState([])
  const [dataSource, setDataSource] = useState([])
  const navigator = useNavigate()

  const onExpress = (r) => {
    //
    navigator("/expressList")
  }

  const onFinish = () => {
    form.validateFields().then(async (res) => {
      res.autoDelivery ? (res.autoDelivery = 1) : (res.autoDelivery = 0)
      const data = await updateExpressInfo(res)
      message.success("修改成功")
    })
  }

  const onQuery = () => {
    getExpressInfo().then((res) => {
      console.log(res.set)
      form.setFieldsValue(res.set)
      setDataSource(res.info)
    })

    getAllRegion().then((res) => {
      setRegion(res)
    })
  }

  useEffect(() => {
    onQuery()
  }, [])

  const columns: ColumnsType<DataType> = [
    {
      title: "名字",
      dataIndex: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "代号",
      dataIndex: "code",
      render: (text) => <a>{text}</a>
    },
    {
      title: "客户编号",
      dataIndex: "CustomerName",
      render: (text) => <a>{text}</a>
    },
    {
      title: "月结账号",
      dataIndex: "MonthCode",
      render: (text) => <a>{text}</a>
    },
    {
      title: "操作",
      render: (t, r) => (
        <Tooltip placement="top" title={"编辑"}>
          <a onClick={() => onEdit(r)} style={{ cursor: "pointer" }}>
            编辑
          </a>
        </Tooltip>
      )
    }
  ]

  const onEdit = (r) => {
    //
    navigator("/expressEdit/" + r.id)
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <Button onClick={onExpress} type="primary">
          快递公司列表
        </Button>
      </div>

      <Form
        form={form}
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="id"></Form.Item>
        <Form.Item
          label="打印后自动发货"
          name="autoDelivery"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="寄件人"
          name="Name"
          rules={[{ required: true, message: "请输入非代理发货时的寄件人" }]}
        >
          <Input placeholder="请输入非代理发货时的寄件人" />
        </Form.Item>
        <Form.Item
          label="电话"
          name="Tel"
          rules={[{ required: true, message: "请输入电话" }]}
        >
          <Input placeholder="请输入电话" />
        </Form.Item>
        <Form.Item
          label="省份"
          name="ProvinceName"
          rules={[{ required: true, message: "请选择地区" }]}
        >
          <Cascader options={region} />
        </Form.Item>
        <Form.Item
          label="地址"
          name="Address"
          rules={[{ required: true, message: "请输入具体地址" }]}
        >
          <Input placeholder="请输入具体地址" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            保存
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
      />
    </div>
  )
}

export default index

import React, { useEffect } from "react"
import { Button, Form, Input, InputNumber, Space, message } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { getShipperInfoById, storeShipper } from "src/services/expressSetting"
import { useNavigate, useParams } from "react-router"

const ExpressEdit = () => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const navigator = useNavigate()

  const onQuery = async (id) => {
    const res = await getShipperInfoById(id)
    form.setFieldsValue({
      ...res
    })
  }

  useEffect(() => {
    if (id) {
      onQuery(id)
    }
  }, [id])

  const onBack = () => {
    navigator(-1)
  }

  const onFinish = () => {
    form.validateFields().then(async (res) => {
      const data = await storeShipper(res)
      message.success("修改成功")
      onBack()
    })
  }

  return (
    <div>
      <Form
        form={form}
        labelCol={{
          span: 3
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        onFinish={onFinish}
      >
        <div style={{ marginBottom: 20, cursor: "pointer" }} onClick={onBack}>
          <LeftOutlined />
          <span> 返回列表</span>
        </div>
        <Form.Item name="id" noStyle></Form.Item>
        <Form.Item
          label="名字"
          name="name"
          rules={[{ required: true, message: "请输入快递公司名字" }]}
        >
          <Input placeholder="请输入非代理发货时的寄件人" />
        </Form.Item>
        <Form.Item
          label="代号"
          name="MonthCode"
          rules={[{ required: true, message: "请输入快递公司名字" }]}
        >
          <Input placeholder="请输入非代理发货时的寄件人" />
        </Form.Item>
        <Form.Item label="客户编号" name="CustomerName">
          <Input placeholder="请输入非代理发货时的寄件人" />
          <div>打印电子面单，需要填写</div>
        </Form.Item>
        <Form.Item label="排序" name="sort_order">
          <InputNumber />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              确定保存
            </Button>
            <Button onClick={onBack}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ExpressEdit

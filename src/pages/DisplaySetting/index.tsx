import { Button, Form, Radio, Space, message } from "antd"
import React, { useEffect, useState } from "react"
import { getShowSet, updateShowSet } from "src/services/displaysetting"

const index = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }
  const onFinish = async (values: any) => {
    await updateShowSet(values)
    messageApi.open({
      type: "success",
      content: "修改成功"
    })
  }
  const onReset = () => {
    form.resetFields()
  }

  useEffect(() => {
    getShowSet().then((res) => form.setFieldsValue(res))
  }, [])
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {contextHolder}
      <Form.Item name="banner" label="广告">
        <Radio.Group>
          <Radio value={1}>显示</Radio>
          <Radio value={0}>不显示</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="notice" label="公告">
        <Radio.Group>
          <Radio value={1}>显示</Radio>
          <Radio value={0}>不显示</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="channel" label="广告下的图标">
        <Radio.Group>
          <Radio value={1}>显示</Radio>
          <Radio value={0}>不显示</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="index_banner_img" label="首页分类图片或文字">
        <Radio.Group>
          <Radio value={1}>图片</Radio>
          <Radio value={0}>文字</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            确认保存
          </Button>
          <Button onClick={onReset}>取消</Button>
          {/* <Button htmlType="reset">取消</Button> */}
        </Space>
      </Form.Item>
    </Form>
  )
}

export default index

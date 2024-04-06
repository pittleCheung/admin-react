import { Button, Form, Input, Space, Switch } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getAdminDetail, updateAdminDetail } from "src/services/auth"

const index = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const navigator = useNavigate()
  const [userData, setUserData] = useState<any>({})

  useEffect(() => {
    getAdminDetail({ id }).then((res) => {
      setUserData(res)
      console.log(res, "res")
      form.setFieldsValue(res)
    })
  }, [id])

  const onSure = () => {
    //
    const values = form.getFieldsValue()
    console.log(values, "values")
    updateAdminDetail({
      change: values.change,
      user: {
        ...userData,
        username: values.username,
        newpassword: values.newpassword
      }
    })
  }
  const onBack = () => {
    navigator("/administrator")
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 }
    },
    wrapperCol: {
      xs: { span: 4 },
      sm: { span: 4 }
    }
  }
  return (
    <div>
      <Form form={form} preserve={false} onFinish={onSure} {...formItemLayout}>
        <Form.Item name="username" label="管理员用户名">
          <Input />
        </Form.Item>
        <Form.Item
          name="change"
          valuePropName="checked"
          label={"新密码"}
          rules={[{ required: true }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues: any, currentValues) =>
            prevValues.change !== currentValues.change
          }
        >
          {/* <Input.Password /> */}
          {({ getFieldValue }) =>
            getFieldValue("change") === true ? (
              <Form.Item name="newpassword">
                <Input.Password />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
            <Button onClick={onBack}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default index

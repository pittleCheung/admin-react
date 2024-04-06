import React, { useEffect, useState } from "react"
import { Form, Button, Input, message, Checkbox } from "antd"
import {
  UserOutlined,
  LockOutlined,
  UnorderedListOutlined
} from "@ant-design/icons"
import styles from "./index.module.less"
import { login, LoginParamsType, getInfo } from "src/services/login"
import { useLocation, useNavigate, useParams } from "react-router"
import IconFont from "src/components/iconfont"
import classNames from "classnames"
import { storage } from "src/utils/auth"
import { useAppStore } from "src/store"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logged, updateLogged } = useAppStore()
  const onFinish = (values: LoginParamsType) => {
    const loginForm = { ...values }
    login(loginForm)
      .then((data) => {
        if (data) {
          message.success("登录成功", 2)
          storage.set("token", data.token)
          navigate("/")
        } else {
          message.error("账号密码错误", 2)
        }
      })
      .catch((error) => {
        console.log(error, "----")
        message.error(error.errmsg, 2)
      })
  }

  useEffect(() => {
    // 如果当前token有效 登录页直接跳首页
    getInfo()
      .then((res) => {
        if (res) {
          navigate("/")
          console.log(res, "res")
        }
      })
      .catch((err) => {
        console.log(err, "getinfo==========>")
      })
  }, [location.pathname])

  return (
    <div
      className="loginWrapper"
      style={{
        backgroundColor: "#2d3a4b",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div className={styles.formContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>电商小程序后台管理系统</h3>
        </div>
        <Form
          className="login-form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入管理员账号" }]}
          >
            <Input
              autoComplete="off"
              prefix={<UserOutlined className={styles.siteFormItemIcon} />}
              placeholder="请输入管理员账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入管理员密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.siteFormItemIcon} />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

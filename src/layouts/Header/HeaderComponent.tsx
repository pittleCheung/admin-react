import React, { MouseEventHandler } from "react"
import { Menu, Row, Dropdown, Space, MenuProps, Modal, Breadcrumb } from "antd"
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined"
import { NavLink, useNavigate } from "react-router-dom"
import { storage } from "src/utils/auth"
import person from "src/assets/personal.gif"
import { routesConfig } from "src/routes/pageRoutes"

import styles from "./header.module.less"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"

interface IHeaderProps {
  collapsed: boolean
  toggle: MouseEventHandler
  selectedKeys: Array<string>
}

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

function HeaderComponent(props: IHeaderProps) {
  // const menuJSX = (
  //   <Menu>
  //     <Menu.Item key="center">个人中心</Menu.Item>
  //     <Menu.Item key="login_out">退出</Menu.Item>
  //   </Menu>
  // );

  // const menuJSX: MenuProps["items"] = [
  //   getItem("个人中心", "center", "center"),
  //   getItem("退出", "login_out", "login_out")
  // ]

  const navigate = useNavigate()

  const onLogout = () => {
    Modal.confirm({
      title: "退出登录",
      content: "确认退出登录?",
      okText: "确定",
      okType: "primary",
      okButtonProps: { danger: true },
      cancelText: "取消",
      onOk() {
        // logoutAccount().finally(() => {
        //   storage.clear(true)
        //   location.hash = '/login'
        // })

        storage.clear(true)
        navigate("/login")
      }
    })
  }

  const onPersonal = () => {
    navigate("/")
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={onPersonal}>个人中心</a>
    },
    {
      key: "2",
      label: <a onClick={onLogout}>退出</a>
    }
  ]

  const onBreadcreamb = (routesConfig: any, element: any) => {
    return routesConfig.map((ele: any) => {
      if (ele.hideMenu) return
      if (ele.children) {
        // 如果有children
        return onBreadcreamb(ele.children, ele)
      } else {
        // console.log(props.selectedKeys[0], 'xxx', ele.key)
        if (props.selectedKeys[0] == ele.key) {
          return (
            <Breadcrumb key={ele.key}>
              <Breadcrumb.Item key={element["label"]}>
                {element["label"]}
              </Breadcrumb.Item>
              <Breadcrumb.Item key={ele["label"]}>
                {ele["label"]}
              </Breadcrumb.Item>
            </Breadcrumb>
          )
        }
      }
    })
  }

  const style = ""

  return (
    <Row justify="space-between">
      <div className={styles.collapsed}>
        <div>
          {React.createElement(
            props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: props.toggle
            }
          )}
        </div>
        {/* <div className={styles.breadcrumb}>{onBreadcreamb(routesConfig)}</div> */}
        <div className={styles.breadcrumb}>
          {onBreadcreamb(routesConfig, routesConfig)}
        </div>
      </div>

      <div className="flex-right">
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space>
            <img src={person} alt="" className={styles.person} />
            <DownOutlined className={styles.smallDrop} />
          </Space>
        </Dropdown>
      </div>
    </Row>
  )
}

export default HeaderComponent

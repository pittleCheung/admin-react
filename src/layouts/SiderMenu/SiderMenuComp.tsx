import React from "react"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Menu, Row, Dropdown, Space, MenuProps } from "antd"
import person from "src/assets/personal.gif"
import styles from "./siderMenu.module.less"
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined"
import { NavLink } from "react-router-dom"
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined"
import VideoCameraOutlined from "@ant-design/icons/lib/icons/VideoCameraOutlined"
import { routesConfig } from "src/routes/pageRoutes"

interface ISiderProps {
  collapsed: boolean
  selectedKeys: string[]
}

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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

function SiderMenu(props: ISiderProps) {
  // const blackList = ['404',"个人中心"]

  const onMenu = (routesConfig: any[]): any => {
    return routesConfig.map((item) => {
      if (item.children) {
        return getItem(item.label, item.key, item.icon, onMenu(item.children))
      } else {
        // 加一层拦截
        // if(blackList.includes(item.label)){
        //     // 隐藏blackList里面的Item
        // }else{
        //   return getItem(<NavLink to={item.key}>{item.label}</NavLink>, item.key, item.icon)
        // }

        if (item.hideMenu) {
          // 隐藏blackList里面的Item
        } else {
          return getItem(
            <NavLink to={item.path}>{item.label}</NavLink>,
            item.key,
            item.icon
          )
        }
      }
    })
  }

  const onOpenChange = () => {
    console.log("onOpenChange")
  }

  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log(item, key, keyPath, selectedKeys, domEvent)
  }

  // console.log(props.selectedKeys, 'selectedKeys----');

  // 递归查找
  const fn = (data, value) => {
    let res = []
    const dfs = (arr, temp = []) => {
      for (const node of arr) {
        if (node.children) {
          dfs(node.children, temp.concat(node.key))
        } else {
          if (node.key === value) {
            res = temp
            return
          }
        }
      }
    }
    dfs(data)
    return res
  }

  // console.log(fn(routesConfig,props.selectedKeys[0]),'--------fn')

  return (
    <div>
      <div className="logo">
        {props.collapsed ? (
          <HomeOutlined />
        ) : (
          <NavLink to="/">电商后台管理</NavLink>
        )}
      </div>
      <Menu
        className="menu"
        theme="dark"
        mode="inline"
        selectedKeys={props.selectedKeys}
        defaultOpenKeys={fn(routesConfig, props.selectedKeys[0])}
        // openKeys={props.selectedKeys}
        items={onMenu(routesConfig)}
        onSelect={onSelect}
      ></Menu>
    </div>
  )
}

export default SiderMenu

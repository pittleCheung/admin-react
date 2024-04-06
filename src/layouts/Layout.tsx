import React, { useEffect, useState } from "react"
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useRoutes
} from "react-router-dom"
import { Layout, Menu, Spin } from "antd"
import HeaderComponent from "./Header/HeaderComponent"
import {
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined
} from "@ant-design/icons"
import "./Layout.less"
import { routesConfig } from "src/routes/pageRoutes"
import SiderMenu from "./SiderMenu/SiderMenuComp"
// import { useAppDispatch, useAppSelector } from 'src/store'
// import { $getCurrentInfo } from 'src/store/features/globalSlice'
import { useAppStore } from "src/store"
import { getInfo } from "src/services/login"
import { storage } from "src/utils/auth"
const { Suspense } = React

const { Header, Footer, Sider, Content } = Layout

const _Layout: React.FC = function () {
  const [collapsed, setCollapsed] = useState(false)
  const params = useParams()
  // console.log(params)
  const location = useLocation()
  const navigator = useNavigate()
  const element = useRoutes(routesConfig)
  // const dispatch = useAppDispatch()
  // const { logged } = useAppSelector((state) => state.global)
  const { logged, updateLogged } = useAppStore()

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const selectedKeys = [location.pathname]

  // useEffect(() => {
  //   !logged && dispatch($getCurrentInfo())
  // }, [location.pathname])

  // console.log(logged, 'logged----', selectedKeys)

  useEffect(() => {
    const token = storage.get("token") || ""
    if (!token) {
      navigator("/login")
    } else {
      !logged &&
        getInfo().then((res) => {
          updateLogged(true)
        })
    }
  }, [location.pathname])

  // console.log(logged)

  return logged ? (
    <div className="container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SiderMenu
            collapsed={collapsed}
            selectedKeys={selectedKeys}
          ></SiderMenu>
        </Sider>
        <Layout>
          <Header className="header">
            <HeaderComponent
              collapsed={collapsed}
              toggle={toggle}
              selectedKeys={selectedKeys}
            />
          </Header>
          <Content className="site-content-background">
            <Suspense
              fallback={
                <Spin size="large" style={{ width: "100%", height: "100%" }} />
              }
            >
              {element}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </div>
  ) : null
}

export default _Layout

import React, { lazy } from "react"
import IconFont from "src/components/iconfont"

// 控制台
const DashBoard = lazy(() => import("src/pages/Dashboard"))

// 用户列表
const UserList = lazy(() => import("src/pages/UserList"))

const EditUserList = lazy(() => import("src/pages/editUserList"))

// 购物车
const shopCart = lazy(() => import("src/pages/ShopCart"))

// 商品
const GoodsList = lazy(() => import("src/pages/GoodsList"))
const GoodsAddOrEdit = lazy(() => import("src/pages/GoodsList/GoodsAddOrEdit"))

// 店铺设置
// 显示设置
const showSetting = lazy(() => import("src/pages/DisplaySetting"))

// 广告列表
const AdList = lazy(() => import("src/pages/AdList"))

const AdListAddorEdit = lazy(() => import("src/pages/AdList/AdListAddorEdit"))

// 公告管理
const AnnounceManage = lazy(() => import("src/pages/AnnounceManage"))

// 运费模板
const FreightTemplate = lazy(() => import("src/pages/FreightTemplate"))

// 快递设置
const ExpressSetting = lazy(() => import("src/pages/ExpressSetting"))
// 添加or编辑快递设置
const ExpressAddOrEdit = lazy(
  () => import("src/pages/ExpressSetting/ExpressAddOrEdit")
)
// 快递公司列表
const ExpressList = lazy(() => import("src/pages/ExpressSetting/ExpressList"))

// 管理员
const Administrator = lazy(() => import("src/pages/Administrator"))

const EditorAdministrator = lazy(
  () => import("src/pages/Administrator/EditorAdmin")
)

const NotFound = lazy(() => import("src/pages/notFound"))

// 资源中心
const Resource = lazy(() => import("src/components/Resource"))

/**
 * 子级页面路由的path请保持与父级path有相同的Menu前缀，确保菜单选中
 */
export const routesConfig = [
  {
    label: "Dashboard",
    key: "/",
    path: "/",
    icon: React.createElement(IconFont, { type: "icon-blogkongzhitai" }),
    element: React.createElement(DashBoard)
  },
  {
    label: "用户",
    key: "/user",
    icon: React.createElement(IconFont, {
      type: "icon-blogwenzhangguanli"
    }),
    type: "group",
    children: [
      {
        label: "用户列表",
        key: "/userInfoList",
        path: "/userInfoList",
        icon: React.createElement(IconFont, {
          type: "icon-blogwenzhangliebiaoxiangqing"
        }),
        element: React.createElement(UserList)
      },
      {
        label: "用户详情",
        key: "/editUserList",
        path: "/userList/:id",
        hideMenu: true,
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(EditUserList)
      }
    ]
  },
  {
    label: "购物车",
    key: "/shopcart",
    path: "/shopcart",
    icon: React.createElement(IconFont, { type: "icon-blogliuyanban-05" }),
    element: React.createElement(shopCart)
  },
  {
    label: "商品管理",
    key: "/goods",
    icon: React.createElement(IconFont, {
      type: "icon-blogwenzhangguanli"
    }),
    type: "group",
    children: [
      {
        label: "商品列表",
        key: "/goods/goodsList",
        path: "/goods/goodsList",
        icon: React.createElement(IconFont, {
          type: "icon-blogwenzhangliebiaoxiangqing"
        }),
        element: React.createElement(GoodsList)
      },
      {
        label: "商品添加",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        hideMenu: true,
        key: "/goods/add",
        path: "/goods/add",
        element: React.createElement(GoodsAddOrEdit)
      },
      {
        label: "商品修改",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        hideMenu: true,
        key: "/goods/edit",
        path: "/goods/edit/:id",
        element: React.createElement(GoodsAddOrEdit)
      }
    ]
  },
  {
    label: "店铺设置",
    key: "/shop",
    icon: React.createElement(IconFont, {
      type: "icon-blogwenzhangguanli"
    }),
    type: "group",
    children: [
      {
        label: "显示设置",
        key: "/showset",
        path: "/showset",
        icon: React.createElement(IconFont, {
          type: "icon-blogwenzhangliebiaoxiangqing"
        }),
        element: React.createElement(showSetting)
      },
      {
        label: "广告列表",
        key: "/adList",
        path: "/adList",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(AdList)
      },
      {
        label: "广告添加",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        hideMenu: true,
        path: "/settings/adList/add",
        name: "adListEdit",
        element: React.createElement(AdListAddorEdit)
      },
      {
        label: "广告编辑",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        hideMenu: true,
        path: "/settings/adList/:id",
        name: "adListEdit",
        element: React.createElement(AdListAddorEdit)
      },
      {
        label: "公告管理",
        key: "/announceManage",
        path: "/announceManage",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(AnnounceManage)
      },
      {
        label: "运费模板",
        key: "/freightTemplate",
        path: "/freightTemplate",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(FreightTemplate)
      },
      {
        label: "快递设置",
        key: "/expressSetting",
        path: "/expressSetting",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(ExpressSetting)
      },
      {
        label: "快递列表",
        key: "/expressList",
        hideMenu: true,
        path: "/expressList",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(ExpressList)
      },
      {
        label: "添加快递公司",
        key: "/expressAdd",
        hideMenu: true,
        path: "/expressAdd",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(ExpressAddOrEdit)
      },
      {
        label: "修改快递公司",
        key: "/expressEdit",
        hideMenu: true,
        path: "/expressEdit/:id",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(ExpressAddOrEdit)
      },
      {
        label: "管理员",
        key: "/administrator",
        path: "/administrator",
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(Administrator)
      },
      {
        label: "编辑管理员",
        key: "/editor_administrator",
        path: "/administrator/:id",
        hideMenu: true,
        icon: React.createElement(IconFont, {
          type: "icon-blogbianjiwenzhang_huaban"
        }),
        element: React.createElement(EditorAdministrator)
      }
    ]
  },
  {
    label: "资源中心",
    key: "/resource",
    path: "/resource",
    icon: React.createElement(IconFont, { type: "icon-blogliuyanban-05" }),
    element: React.createElement(Resource)
  },
  // {
  //   label: '关于我',
  //   key: '/about',
  //   path: '/about',
  //   icon: React.createElement(IconFont, { type: 'icon-blogguanyuwomen' }),
  //   element: React.createElement(About)
  // },
  // {
  //   label: '设置',
  //   key: '/setting',
  //   path: '/setting',
  //   icon: React.createElement(IconFont, { type: 'icon-blogshezhi' }),
  //   element: React.createElement(Setting)
  // },
  // {
  //   label: '个人中心',
  //   key: '/personalSetting',
  //   path: '/personalSetting',
  //   hideMenu: true,
  //   element: React.createElement(shopCart)
  // },
  {
    label: "404",
    key: "/404",
    path: "*",
    hideMenu: true,
    element: React.createElement(NotFound)
  }
]

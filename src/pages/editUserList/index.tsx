import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { useNavigate, useParams } from "react-router"
import styles from "./index.module.less"
import {
  Form,
  FormInstance,
  Input,
  InputRef,
  Table,
  Image,
  message,
  Card,
  Tabs,
  TabsProps
} from "antd"
import {
  getUserDataInfo,
  getUserInfo,
  getUserOrderList,
  updateUserMobile,
  updateUserName
} from "src/services/userlist"
import { EditableCell, EditableRow } from "src/components/EditorTable"

type EditableTableProps = Parameters<typeof Table>[0]
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>

interface DataType {
  id: React.Key
  avator: string
  name: string
  nickname: string
  mobile: string
  gender: string
  register_time: string
  last_login_time: string
}

function EditUserList(props) {
  const navigate = useNavigate()
  const params = useParams()
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      id: 0,
      avator: "",
      name: "",
      nickname: "",
      mobile: "",
      gender: "",
      register_time: "",
      last_login_time: ""
    }
  ])
  const [order, setOrder] = useState([])
  const [dataInfo, setDataInfo] = useState({
    orderSum: "",
    orderDone: "",
    orderMoney: "",
    cartSum: ""
  })
  const [region, setRegion] = useState([])
  const goBack = () => {
    navigate(-1)
  }
  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setDataSource(newData)
    updateUserName({ id: newData[0].id, name: newData[0].name }).then((res) => {
      message.success("修改成功!")
    })
    updateUserMobile({ id: newData[0].id, mobile: newData[0].name }).then(
      (res) => {
        message.success("修改成功!")
      }
    )
  }
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex?: string
    title: string
  })[] = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "头像",
      // dataIndex: 'avatar',
      render: (text) => (
        <Image
          width={200}
          src={text.avatar}
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      editable: true
    },
    {
      title: "姓名",
      dataIndex: "name",
      editable: true
    },
    {
      title: "手机",
      dataIndex: "mobile",
      editable: true
    },
    {
      title: "性别",
      dataIndex: "gender",
      render: (text) => (text.gender === 2 ? "女" : "男")
    },
    {
      title: "注册时间",
      dataIndex: "register_time"
    },
    {
      title: "最近登录",
      dataIndex: "last_login_time"
    }
  ]

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  const getInfo = () => {
    getUserInfo(params.id).then((res) => {
      console.log("res", res)
      setDataSource([res])
    })
  }

  const getOrder = () => {
    //
    getUserOrderList(params.id).then((res) => {
      console.log(res, "order")
    })
  }

  const getDataInfo = () => {
    //
    getUserDataInfo(params.id).then((res) => {
      console.log(res, "getUserDataInfo")
      setDataInfo(res)
    })
  }

  const getAllRegion = () => {
    //
    // getUserInfo({ id: params.id }).then((res) => {
    //   console.log(res)
    // })
  }

  useEffect(() => {
    getInfo()
    getOrder()
    getDataInfo()
    // getAllRegion()
  }, [params])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "订单",
      children: "Content of Tab Pane 1"
    },
    {
      key: "2",
      label: "地址管理",
      children: "Content of Tab Pane 2"
    },
    {
      key: "3",
      label: "购物车",
      children: "Content of Tab Pane 3"
    },
    {
      key: "4",
      label: "足迹",
      children: "Content of Tab Pane 4"
    }
  ]

  return (
    <div>
      <div
        className={styles.goBack}
        onClick={goBack}
        style={{ verticalAlign: "center", cursor: "pointer" }}
      >
        <div className={styles.gobackIcon}>&lt;&nbsp;</div>
        <div>返回</div>
      </div>
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          columns={columns as ColumnTypes}
          dataSource={dataSource}
          rowKey={(record: any) => record.id}
        ></Table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Card title="提交订单数" bordered={false} style={{ width: 300 }}>
          {dataInfo.orderSum}笔
        </Card>
        <Card title="成交订单" bordered={false} style={{ width: 300 }}>
          {dataInfo.orderDone}笔
        </Card>
        <Card title="消费金额" bordered={false} style={{ width: 300 }}>
          {dataInfo.orderMoney ? dataInfo.orderMoney : 0}元
        </Card>
        <Card title="加入购物车" bordered={false} style={{ width: 300 }}>
          {dataInfo.cartSum ? dataInfo.cartSum : 0}件
        </Card>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default EditUserList

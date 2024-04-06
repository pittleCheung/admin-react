import {
  Breadcrumb,
  message,
  Modal,
  Radio,
  Space,
  Tooltip,
  Image,
  Input,
  Table
} from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { editUserList, getUserList } from "src/services/userlist"
import { IUserListQuery } from "src/types/userlist"
import { data2PageData, paging2Params } from "src/utils/tools"
import style from "./index.module.less"

interface DataType {
  id: number
  title: string
  nickname: string
  avatar: string
  gender: string
  register_time: string
  last_login_time: string
}

const index = (props) => {
  const [pageData, setPageData] = useState(data2PageData("userData"))
  const [loading, setLoading] = useState(false)
  // const [pageData,setPageData] = useState([]);
  const navigate = useNavigate()
  const { confirm } = Modal

  const onQuery = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: Partial<IUserListQuery> = paging2Params(pageData.paging!)
  ) => {
    getUserList(query).then((res) => {
      setPageData(data2PageData("userData", res))
    })
  }

  const onEdit = (r: any) => {
    const id = r.id
    // navigate("/editBlog?id=" + id);
    navigate("/userList/" + id)
  }

  const onNickName = (e: any, record: DataType) => {
    record.nickname = e.target.value
    pageData.list?.forEach((item: DataType, i: number) => {
      if (item.id === record.id) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pageData.list![i] = record
      }
    })
    setPageData({ ...pageData })
  }

  const onSubmitNick = (row: DataType) => {
    editUserList({
      id: row.id,
      nickname: row.nickname
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "头像",
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
      render: (text, record) => (
        <Input
          placeholder="昵称"
          value={text.nickname}
          onChange={(e) => onNickName(e, record)}
          onBlur={() => onSubmitNick(record)}
        />
      )
    },
    {
      title: "性别",
      render: (text) => (text.gender === 2 ? "女" : "男")
    },
    {
      title: "注册时间",
      dataIndex: "register_time"
    },
    {
      title: "最近登录",
      dataIndex: "last_login_time"
    },
    {
      title: "操作",
      render: (_, r) => (
        <Space>
          <Tooltip placement="top" title={"编辑"}>
            <span onClick={() => onEdit(r)} className={style["edit-text"]}>
              编辑
            </span>
          </Tooltip>
          {/* <Tooltip placement="top" title={'删除'}>
            <span onClick={() => onCancel(r)} className={style['delete-text']}>
              删除
            </span>
          </Tooltip> */}
        </Space>
      )
    }
  ]

  useEffect(() => {
    onQuery()
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          ...pageData.paging,
          onChange: (pageIndex, pageSize) =>
            onQuery({ page: pageIndex, size: pageSize })
        }}
        dataSource={pageData.list}
        rowKey={(record) => record.id}
      />
    </div>
  )
}

export default index

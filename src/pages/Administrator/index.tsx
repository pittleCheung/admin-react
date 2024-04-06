import { Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getAdminList } from "src/services/auth"
import { data2PageData, paging2Params } from "src/utils/tools"
interface DataType {
  id: number
  username: string
  last_login_time: string
  last_login_ip: string
}

const index = () => {
  const [pageData, setPageData] = useState(data2PageData("admin"))
  const onQuery = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    getAdminList(query).then((res) => {
      console.log("res", res)
      setPageData(data2PageData("admin", res))
    })
  }
  const navigate = useNavigate()
  const onEdit = (r) => {
    //
    console.log(r)
    navigate("/administrator/" + r.id)
  }
  useEffect(() => {
    onQuery()
  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "会员名称",
      dataIndex: "username",
      render: (text) => <a>{text}</a>
    },
    {
      title: "最近登录",
      dataIndex: "last_login_time",
      render: (text) => <a>{text}</a>
    },
    {
      title: "登录IP",
      dataIndex: "last_login_ip",
      render: (text) => <a>{text}</a>
    },
    {
      title: "操作",
      render: (t, r: any) => (
        <Space>
          <Tooltip placement="top" title={"编辑"}>
            <span onClick={() => onEdit(r)} style={{ cursor: "pointer" }}>
              编辑
            </span>
          </Tooltip>
        </Space>
      )
    }
  ]
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

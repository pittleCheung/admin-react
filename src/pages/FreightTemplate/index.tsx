import {
  Form,
  Radio,
  Table,
  Image,
  Switch,
  message,
  Tooltip,
  Space,
  Button
} from "antd"
import { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { getFeightTmpl } from "src/services/freightTmpl"
import { data2PageData, paging2Params } from "src/utils/tools"

interface DataType {
  id: number
  name: string
  package_price: string
  freight_type: string
}

const index = () => {
  const [pageData, setPageData] = useState(data2PageData("feightTemp"))

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "名字",
      dataIndex: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "包装费",
      dataIndex: "package_price",
      render: (text) => <a>{text}</a>
    },
    {
      title: "按件/按重",
      dataIndex: "freight_type",
      render: (text) => <a>{text}</a>
    },
    {
      title: "操作",
      render: (t, r) => (
        <Space>
          <Tooltip placement="top" title={"编辑"}>
            <a onClick={() => onEdit(r)} style={{ cursor: "pointer" }}>
              编辑
            </a>
          </Tooltip>
          <Tooltip placement="top" title={"删除"}>
            <a onClick={() => onDel(r)} style={{ cursor: "pointer" }}>
              删除
            </a>
          </Tooltip>
        </Space>
      )
    }
  ]

  const onEdit = (r: DataType) => {
    //
  }

  const onDel = (r: DataType) => {
    //
  }

  useEffect(() => {
    onQuery()
  }, [])

  const onQuery = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    getFeightTmpl(query).then((res) => {
      setPageData(data2PageData("feightTemp", res))
    })
  }
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

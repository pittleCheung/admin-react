import { LeftOutlined } from "@ant-design/icons"
import { Button, Space, Switch, Table, Tooltip, message } from "antd"
import { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { deleteShipper, getShipperList } from "src/services/expressSetting"
import { IExpressListQuery } from "src/types/expresslist"
import { data2PageData, paging2Params } from "src/utils/tools"

interface DataType {
  id: number
  name: string
  code: string
  sort_order: string
  enabled: string
}
const ExpressList = () => {
  const navigate = useNavigate()
  const [pageData, setPageData] = useState(data2PageData("expressList"))
  const onQuery = (
    query: Partial<IExpressListQuery> = paging2Params(pageData.paging!)
  ) => {
    //
    console.log(query, "query", pageData)
    getShipperList(query).then((res) => {
      setPageData(data2PageData("expressList", res))
    })
  }
  const onAddExpress = () => {
    navigate("/expressAdd")
  }
  const onBack = () => {
    navigate(-1)
  }

  const onEdit = (r) => {
    //
    navigate("/ExpressEdit/" + r.id)
  }

  const onCancel = async (r) => {
    //
    await deleteShipper(r.id)
    message.success("删除成功")
    onQuery()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "名字",
      dataIndex: "name"
    },
    {
      title: "代号",
      dataIndex: "code"
    },
    {
      title: "排序",
      dataIndex: "sort_order"
    },
    {
      title: "使用",
      render: (text) => <Switch checked={text.enabled === 1} disabled />
    },
    {
      title: "操作",
      render: (_, r) => (
        <Space>
          <Tooltip placement="top" title={"编辑"}>
            <Button onClick={() => onEdit(r)}>编辑</Button>
          </Tooltip>
          <Tooltip placement="top" title={"删除"}>
            <Button danger onClick={() => onCancel(r)}>
              删除
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ]

  useEffect(() => {
    onQuery()
  }, [])
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={onBack}>
          <LeftOutlined />
          <span> 返回列表</span>
        </div>
        <Button onClick={onAddExpress} type="primary">
          添加快递公司
        </Button>
      </div>

      <Table
        columns={columns}
        pagination={{
          ...pageData.paging,
          onChange: (pageIndex, pageSize) => {
            console.log(pageData, "xxx")
            onQuery({ page: pageIndex, size: pageSize })
          }
        }}
        dataSource={pageData.list}
        rowKey={(record) => record.id}
      />
    </div>
  )
}

export default ExpressList

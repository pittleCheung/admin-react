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
import { useNavigate } from "react-router"
import { deleteAd, getAdList, updateEnableStatus } from "src/services/adList"
import { data2PageData, paging2Params } from "src/utils/tools"

interface DataType {
  id: number
  image_url: string
  goods_id: string
  end_time: string
  sort_order: string
  enabled: string
}

const index = () => {
  const [pageData, setPageData] = useState(data2PageData("AdList"))
  const [messageApi, contextHolder] = message.useMessage()
  const navigator = useNavigate()
  const onIsAble = async (v, record: DataType) => {
    await updateEnableStatus({
      id: record.id,
      status: v
    })
    messageApi.success("修改成功")
    // 使数据受控
    onQuery()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "广告",
      render: (text) => (
        <Image
          width={200}
          src={text.image_url}
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    {
      title: "关联商品",
      dataIndex: "goods_id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      render: (text) => <a>{text}</a>
    },
    {
      title: "排序",
      dataIndex: "sort_order",
      render: (text) => <a>{text}</a>
    },
    {
      title: "开启状态",
      render: (text, record) => {
        return (
          <Switch
            onChange={(v) => onIsAble(v, record)}
            checked={text.enabled}
          />
        )
      }
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

  const onQuery = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    getAdList(query).then((res) => {
      console.log(data2PageData("AdList", res), query, res)
      setPageData(data2PageData("AdList", res))
    })
  }

  useEffect(() => {
    onQuery()
  }, [])

  const onAddAd = () => {
    navigator("/settings/adList/add")
  }

  const onEdit = (r: any) => {
    //
    navigator("/settings/adList/" + r.id)
  }

  const onDel = async (r: any) => {
    //
    await deleteAd(r.id)
    message.success("删除成功")
    onQuery()
  }

  return (
    <>
      <Button type="primary" onClick={onAddAd}>
        添加广告
      </Button>
      {contextHolder}
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
    </>
  )
}

export default index

import { Table, Image } from "antd"
import { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { getShopCart } from "src/services/shopcart"
import { IShopCartQuery } from "src/types/shopcart"
import { data2PageData, paging2Params } from "src/utils/tools"
interface DataType {
  id: number
  user_id: string
  goods_id: string
  nickname: string
  list_pic_url: string
  goods_name: string
  goods_specifition_name_value: string
  number: string
  retail_price: string
  add_time: string
  is_delete: string
}

const index = () => {
  const [pageData, setPageData] = useState(data2PageData("shopCart"))
  const onQuery = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: Partial<IShopCartQuery> = paging2Params(pageData.paging!)
  ) => {
    getShopCart(query).then((res) => {
      setPageData(data2PageData("shopCart", res))
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "用户ID",
      dataIndex: "user_id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "商品ID",
      dataIndex: "goods_id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "用户昵称",
      dataIndex: "nickname",
      render: (text) => <a>{text}</a>
    },
    {
      title: "头像",
      render: (text) => (
        <Image
          width={200}
          src={text.list_pic_url}
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    {
      title: "商品名称",
      dataIndex: "goods_name"
    },
    {
      title: "型号",
      dataIndex: "goods_specifition_name_value"
    },
    {
      title: "数量",
      dataIndex: "number"
    },
    {
      title: "成交价",
      dataIndex: "retail_price"
    },
    {
      title: "加入时间",
      dataIndex: "add_time"
    },
    {
      title: "是否删除",
      dataIndex: "is_delete"
    }
  ]

  useEffect(() => {
    onQuery()
  }, [])

  console.log(pageData.list)
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

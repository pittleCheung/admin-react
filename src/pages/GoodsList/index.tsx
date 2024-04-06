import { Button, Input, Tabs } from "antd"
import type { TabsProps } from "antd"
import {
  Form,
  Radio,
  Table,
  Image,
  Switch,
  message,
  Tooltip,
  Space
} from "antd"
import { useForm } from "antd/es/form/Form"
import { ColumnsType } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
  deleteGoods,
  getGoodsAll,
  getGoodsDrop,
  getGoodsOnSale,
  getGoodsOut
} from "src/services/goodsList"
import { data2PageData, paging2Params } from "src/utils/tools"

interface DataType {
  id: number
  https_pic_url: string
  name: string
  sort_order: string
  sell_volume: string
  goods_number: string
  is_index: boolean
  is_on_sale: boolean
}

const index = () => {
  const navigator = useNavigate()
  const [pageData, setPageData] = useState(data2PageData("goodsList"))
  const [form] = useForm()
  const [type, setType] = useState("1")
  const [messageApi, contextHolder] = message.useMessage()
  const onChange = (key: string) => {
    setType(key)
    onQueryByType({ page: 1, size: 10 }, key)
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "全部商品"
    },
    {
      key: "2",
      label: "出售中"
    },
    {
      key: "3",
      label: "已售完"
    },
    {
      key: "4",
      label: "已下架"
    }
  ]

  const onQueryAll = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    getGoodsAll(query).then((res: any) => {
      console.log(data2PageData("goodsList", res), query, res)
      setPageData(data2PageData("goodsList", res))
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "商品图片",
      render: (text) => (
        <Image
          width={200}
          src={text.https_pic_url}
          style={{ width: "50px", height: "50px" }}
        />
      )
    },
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "排序",
      dataIndex: "sort_order",
      render: (text) => <a>{text}</a>
    },
    {
      title: "销量",
      dataIndex: "sell_volume"
    },
    {
      title: "库存",
      dataIndex: "sell_volume"
    },
    {
      title: "首页显示状态",
      render: (text, record) => {
        return <Switch checked={text.is_index} />
      }
    },
    {
      title: "上架状态",
      render: (text, record) => {
        return <Switch checked={text.is_on_sale} />
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
            <a onClick={() => onDelGoods(r.id)} style={{ cursor: "pointer" }}>
              删除
            </a>
          </Tooltip>
        </Space>
      )
    }
  ]

  // 删除一则商品
  const onDelGoods = async (id: number) => {
    await deleteGoods(id)
    message.success("删除成功")
    onQueryByType({ page: 1, size: 10 }, type)
  }

  const onEdit = (r: any) => {
    //
    navigator("/goods/goodList/edit/" + r.id)
  }
  useEffect(() => {
    onQueryByType({ page: 1, size: 10 }, type)
  }, [type])

  const onQueryByType = (
    query: ICommonPaging = paging2Params(pageData.paging!),
    type
  ) => {
    switch (type) {
      case "1":
        onQueryAll(query)
        break
      case "2":
        onQueryOut(query)
        break
      case "3":
        onQueryDrop(query)
        break
      case "4":
        onQueryOnSale(query)
        break
    }
  }

  // 出售中
  const onQueryOnSale = (
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    //
    getGoodsOnSale(query).then((res: any) => {
      console.log(data2PageData("goodsList", res), query, res)
      setPageData(data2PageData("goodsList", res))
    })
  }

  // 已售完
  const onQueryOut = (
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    //
    getGoodsOut(query).then((res: any) => {
      console.log(data2PageData("goodsList", res), query, res)
      setPageData(data2PageData("goodsList", res))
    })
  }

  // 已下架
  const onQueryDrop = (
    query: ICommonPaging = paging2Params(pageData.paging!)
  ) => {
    //
    getGoodsDrop(query).then((res: any) => {
      console.log(data2PageData("goodsList", res), query, res)
      setPageData(data2PageData("goodsList", res))
    })
  }

  return (
    <div>
      <Button type="primary">添加商品</Button>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Form
        wrapperCol={{ span: 22.5 }}
        layout="inline"
        labelAlign="left"
        style={{ marginTop: "20px" }}
        disabled={type === "1" ? false : true}
        form={form}
        onFinish={(p) => {
          const target = form.getFieldsValue()
          console.log(target, "target")
          onQueryByType({ ...target, page: 1, size: 10 }, type)
        }}
      >
        <Form.Item label="商品名称" name="name">
          <Input placeholder="输入搜索的商品名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        pagination={{
          ...pageData.paging,
          onChange: (pageIndex, pageSize) =>
            onQueryByType({ page: pageIndex, size: pageSize }, type)
        }}
        dataSource={pageData.list}
        rowKey={(record) => record.id}
      />
    </div>
  )
}

export default index

import React, { useEffect, useState } from "react"
import {
  Button,
  Space,
  Table,
  Tooltip,
  Modal,
  Form,
  DatePicker,
  Input
} from "antd"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import locale from "antd/es/date-picker/locale/zh_CN"
import {
  addOneAnnounce,
  delOneAnnounce,
  getAnnounceList,
  updateOneAnnounce
} from "src/services/announceManage"
import { data2PageData, paging2Params } from "src/utils/tools"
import { ExclamationCircleOutlined } from "@ant-design/icons"

interface DataType {
  id: number
  content: string
  end_time: string
  enabled: string
}

const confirm = Modal.confirm

const index = () => {
  const [pageData, setPageData] = useState(data2PageData("announceManage"))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [form] = Form.useForm()
  const onEdit = (r: DataType) => {
    //
    setIsEdit(true)
    setIsModalOpen(true)
    form.setFieldsValue({
      id: r.id,
      content: r.content,
      time: dayjs(r.end_time)
    })
  }

  const onDel = async (r: DataType) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>确实是否删除?</div>,
      onOk() {
        pageData.list = pageData.list?.filter((item) => item.id !== r.id)
        setPageData({
          ...pageData,
          list: pageData.list
        })
        delOneAnnounce({
          id: r.id
        })
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>
    },
    {
      title: "内容",
      dataIndex: "content",
      render: (text) => <a>{text}</a>
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      render: (text) => <a>{text}</a>
    },
    {
      title: "状态",
      dataIndex: "enabled",
      render: (text) => <a>{text == 0 ? "启用中" : "已到期下线"}</a>
    },
    {
      title: "操作",
      render: (t, r: any) => (
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
    getAnnounceList().then((res) => {
      console.log("res", res)
      setPageData(data2PageData("announceManage", res))
    })
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    const values = await form.validateFields()
    // const values = form.getFieldsValue()
    if (values.time) {
      values.time = values.time.format("YYYY-MM-DD HH:mm:ss")
    }
    if (!isEdit) {
      await addOneAnnounce(values)
    } else {
      await updateOneAnnounce(values)
    }
    onQuery()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    onQuery()
  }, [])

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }

  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select time!"
      }
    ]
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加公告
      </Button>
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
      <Modal
        title={isEdit ? "修改公告" : "添加公告"}
        destroyOnClose={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {isEdit ? "确认修改" : "确认添加"}
          </Button>
        ]}
      >
        <Form
          {...formItemLayout}
          style={{ maxWidth: 600 }}
          form={form}
          preserve={false}
          // initialValues={{
          //   time: dayjs('2023-10-16 22:32:57', 'YYYY-MM-DD HH:mm:ss')
          // }}
        >
          <Form.Item name="id"></Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input your content!"
              }
            ]}
          >
            <Input placeholder="请输入公告内容" />
          </Form.Item>
          <Form.Item
            name="time"
            label="到期时间"
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "Please select time!"
              }
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default index

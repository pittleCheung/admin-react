import { Form, FormInstance, Input, InputRef } from "antd"
import React, { useContext, useEffect, useRef, useState } from "react"

interface Item {
  id: string
  avator: string
  nickname: string
  mobile: string
  gender: string
  register_time: string
  last_login_time: string
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: any
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

interface EditableRowProps {
  index: number
}
const EditableContext = React.createContext<FormInstance<any> | null>(null)

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm()
  // console.log(props, 'EditableRow')
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form?.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode: any = children

  // console.log(editable, 'childNode', childNode, editing, children)

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, width: "100%", height: "100%" }}
        onClick={toggleEdit}
      >
        {children[1] ? (
          children[1]
        ) : (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        )}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

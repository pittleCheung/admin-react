# From 表单

对于一个简单的 Input 组件，其值属性默认为 "value"：

```html
<Form.Item label="Username" name="username">
  <input />
</Form.Item>
// 上述代码等价于：
<Form.Item label="Username" name="username" valuePropName="value">
  <Input value={form.getFieldValue('username')} onChange={(e) =>
  form.setFieldsValue({ 'username': e.target.value })} />
</Form.Item>

可以使用 valuePropName 来更改这个默认行为。例如，如果你的组件使用 "checked"
属性而不是 "value" 属性来表示其状态，你可以将 valuePropName 设置为 "checked"：
<Form.Item label="Agree to Terms" name="agreement" valuePropName="checked">
  <Checkbox>Agree</Checkbox>
</Form.Item>
```

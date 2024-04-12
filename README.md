# 接口文档

- baseURL: http://127.0.0.1:8360/admin/

- webhook

#### 登录

- 登录接口

```yaml
path: /auth/login
methods: post
params: { username: string, password: string }
```

- 获取用户信息接口

```yaml
path: /admin
methods: get
headers: X-Hioshop-Token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY5NzAzNzc5N30.yW1JQn0N5gaFS8zNAY4J1_GBcbXVyoOiNgOxbMw4jeM
```

#### 用户列表

```yaml
path: /user
methods: get
params: { page:1, size:10 }
```

#### 购物车列表

```yaml
path: /shopcart
methods: get
params: { page:1, size:10 }
```

# 店铺设置

#### 显示设置

- 获取显示设置接口

```yaml
path: /shopcart
methods: get
```

- 修改显示设置接口

```yaml
path: /showsetStore
methods: post
data: { "banner": 1, "notice": 1, "channel": 1, "index_banner_img": 1 }
```

#### 广告列表

- 获取广告列表接口

```yaml
path: /ad
methods: get
params: { page:1, size:10 }
```

- 修改广告列表接口

```yaml
path: /ad/saleStatus
methods: get
params: { id: 30, status: false }
```

#### 公告管理

- 获取所有公告

```yaml
path: /notice
methods: get
```

- 删除一条公告

```yaml
path: /notice/destory
methods: post
data: { id: 117 }
```

- 添加一条公告

```yaml
path: /notice/add
methods: post
data: { content: "广告内容", time: "2023-11-15 21:27:51" }
```

- 更新一条公告

```yaml
path: /notice/update
methods: post
data: { id: 128, content: "广告内容", time: "2023-11-15 21:27:51" }
```

#### 运费模板

#### 快递设置

#### 管理员

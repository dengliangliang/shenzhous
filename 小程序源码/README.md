# 神州邮小程序

基于 uni-app 框架开发的快递物流小程序，支持微信小程序、H5、App等多端发布，为用户提供便捷的快递寄送服务。

## 项目概述

神州邮小程序是一个全功能的快递物流服务平台，为用户提供：

- 📦 **快递寄送** - 在线下单、价格计算、上门取件
- 🚚 **批量寄件** - 支持批量订单管理，提高寄件效率
- 📋 **订单管理** - 订单查询、状态跟踪、物流信息
- 💰 **在线支付** - 微信支付集成，支持在线付款
- 👤 **用户中心** - 个人信息、地址管理、发票管理
- 📊 **月结服务** - 企业用户月结账单、资格申请
- 🎯 **代理系统** - 邀请好友、佣金管理、收益统计

## 技术栈

### 核心框架
- **uni-app** - 跨平台应用开发框架
- **Vue.js 2.6.11** - 渐进式JavaScript框架
- **Vuex 3.6.2** - 状态管理模式

### UI组件
- **uni-ui 1.5.7** - uni-app官方UI组件库
- **自定义组件** - 业务定制化组件

### 开发工具
- **HBuilderX** - uni-app官方IDE
- **微信开发者工具** - 微信小程序调试工具

## 环境要求

### 系统要求
- **操作系统**: Windows 10/11, macOS, Linux
- **Node.js**: >= 14.0.0 (推荐使用 16.x 或 18.x LTS版本)
- **npm**: >= 6.0.0

### 开发工具
- **HBuilderX**: 最新版本 (推荐)
- **微信开发者工具**: 最新稳定版
- **VS Code**: 可选，需安装uni-app插件

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd 小程序源码
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置开发环境

#### 使用HBuilderX (推荐)
1. 下载并安装 HBuilderX: https://www.dcloud.io/hbuilderx.html
2. 打开HBuilderX，导入项目
3. 在项目根目录右键选择"运行" → "运行到小程序模拟器" → "微信开发者工具"

#### 使用命令行
```bash
# 安装uni-app CLI
npm install -g @vue/cli
npm install -g @dcloudio/uvm

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到H5
npm run dev:h5

# 运行到App
npm run dev:app-plus
```

### 4. 微信小程序配置

1. **下载微信开发者工具**: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

2. **配置小程序信息**
   编辑 `manifest.json`：
   ```json
   {
     "mp-weixin": {
       "appid": "你的小程序AppID",
       "setting": {
         "urlCheck": false
       }
     }
   }
   ```

3. **导入项目到微信开发者工具**
   - 打开微信开发者工具
   - 选择"导入项目"
   - 项目目录选择 `dist/dev/mp-weixin`
   - 输入小程序AppID

## Windows 部署指南

### 开发环境搭建

1. **安装Node.js**
   - 下载地址: https://nodejs.org/
   - 选择LTS版本安装
   - 验证安装: `node -v` 和 `npm -v`

2. **安装HBuilderX**
   - 下载地址: https://www.dcloud.io/hbuilderx.html
   - 选择正式版下载安装
   - 安装uni-app插件

3. **安装微信开发者工具**
   - 下载地址: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
   - 安装并登录微信账号

### 项目配置

1. **API接口配置**
   编辑 `config/config.js`：
   ```javascript
   // 开发环境
   const baseUrl = 'http://localhost:8092/shenzhoupost'
   
   // 生产环境
   const baseUrl = 'https://your-domain.com/shenzhoupost'
   ```

2. **微信小程序配置**
   编辑 `manifest.json`：
   ```json
   {
     "mp-weixin": {
       "appid": "wx2dfe755086f4af5e",
       "setting": {
         "urlCheck": false,
         "es6": true,
         "minified": true
       }
     }
   }
   ```

### 构建和发布

1. **构建小程序**
   ```bash
   # 构建微信小程序
   npm run build:mp-weixin
   
   # 构建H5版本
   npm run build:h5
   
   # 构建App版本
   npm run build:app-plus
   ```

2. **发布到微信小程序**
   - 在HBuilderX中选择"发行" → "小程序-微信"
   - 或在微信开发者工具中点击"上传"
   - 在微信公众平台提交审核

## 项目结构

```
小程序源码/
├── api/                    # API接口定义
├── components/             # 公共组件
├── config/                # 配置文件
├── pages/                 # 页面文件
│   ├── index/             # 首页
│   ├── login/             # 登录页
│   ├── order/             # 订单页
│   └── mine/              # 我的页面
├── static/                # 静态资源
├── store/                 # Vuex状态管理
├── utils/                 # 工具函数
├── views/                 # 子页面
├── App.vue               # 应用入口
├── main.js               # 入口文件
├── manifest.json         # 应用配置
├── pages.json            # 页面路由配置
└── uni.scss              # 全局样式
```

## 主要功能模块

### 1. 首页 (`pages/index/`)
- 快递寄送入口
- 服务功能导航
- 公告信息展示
- 快捷操作

### 2. 订单管理 (`pages/order/`)
- 订单列表查询
- 订单状态跟踪
- 物流信息查看
- 订单操作

### 3. 用户中心 (`pages/mine/`)
- 个人信息管理
- 地址管理
- 发票管理
- 设置功能

### 4. 快递服务 (`views/express/`)
- 单件寄送
- 批量寄件
- 快运服务
- 价格计算

### 5. 月结服务 (`views/monthly/`)
- 月结资格申请
- 账单查询
- 使用用户管理
- 结算明细

## 开发指南

### 添加新页面

1. **在pages.json中配置路由**
   ```json
   {
     "pages": [
       {
         "path": "pages/newpage/newpage",
         "style": {
           "navigationBarTitleText": "新页面"
         }
       }
     ]
   }
   ```

2. **创建页面文件**
   ```vue
   <template>
     <view class="container">
       <!-- 页面内容 -->
     </view>
   </template>
   
   <script>
   export default {
     data() {
       return {
         // 数据
       }
     },
     methods: {
       // 方法
     }
   }
   </script>
   
   <style>
   .container {
     /* 样式 */
   }
   </style>
   ```

### API接口调用

1. **在api目录下创建接口文件**
   ```javascript
   import request from '@/utils/request'
   
   export function getList(params) {
     return request({
       url: '/api/list',
       method: 'get',
       params
     })
   }
   ```

2. **在页面中使用**
   ```javascript
   import { getList } from '@/api/example'
   
   export default {
     async onLoad() {
       const res = await getList()
       console.log(res)
     }
   }
   ```

### 状态管理

1. **定义状态** (`store/index.js`)
   ```javascript
   const store = new Vuex.Store({
     state: {
       userInfo: null
     },
     mutations: {
       SET_USER_INFO(state, userInfo) {
         state.userInfo = userInfo
       }
     }
   })
   ```

2. **使用状态**
   ```javascript
   // 获取状态
   this.$store.state.userInfo
   
   // 修改状态
   this.$store.commit('SET_USER_INFO', userInfo)
   ```

## 常见问题

### 1. 开发工具问题
- **HBuilderX无法运行**: 检查Node.js版本，确保安装了uni-app插件
- **微信开发者工具连接失败**: 检查工具设置中的"安全设置"，开启服务端口

### 2. 编译问题
- **依赖安装失败**: 使用淘宝镜像 `npm install --registry=https://registry.npmmirror.com`
- **编译报错**: 检查语法错误，确保使用uni-app支持的API

### 3. 真机调试
- **真机预览失败**: 检查手机和电脑是否在同一网络
- **接口请求失败**: 检查域名配置，确保在微信公众平台配置了合法域名

### 4. 发布问题
- **审核被拒**: 检查小程序是否符合微信规范
- **功能异常**: 确保生产环境API地址配置正确

## 性能优化

### 1. 代码优化
- 使用组件懒加载
- 优化图片资源大小
- 减少不必要的API请求
- 合理使用缓存

### 2. 用户体验
- 添加加载状态提示
- 优化页面切换动画
- 处理网络异常情况
- 提供离线功能

## 更新日志

### v1.0.0
- 初始版本发布
- 基础快递寄送功能
- 用户登录注册
- 订单管理
- 微信支付集成

## 技术支持

如遇到问题，请：
1. 查看HBuilderX控制台错误信息
2. 检查微信开发者工具调试信息
3. 确认API接口是否正常
4. 联系技术支持团队

## 许可证

[MIT License](./LICENSE)

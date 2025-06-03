# 神州邮后台管理系统

基于 Vue.js + Element UI 的快递物流后台管理系统，用于管理订单、用户、快递类型、月结账单等业务功能。

## 项目概述

神州邮后台管理系统是一个完整的快递物流管理平台的管理端，提供了丰富的管理功能：

- 📦 **订单管理** - 快递订单的创建、查询、状态跟踪
- 👥 **用户管理** - 普通用户和管理员用户的管理
- 🚚 **快递管理** - 快递类型、价格配置管理
- 💰 **财务管理** - 佣金流水、月结账单、发票管理
- 📊 **数据统计** - 订单统计、收入分析等数据看板
- ⚙️ **系统设置** - 公告管理、协议管理、背景图片等

## 技术栈

### 前端框架
- **Vue.js 2.6.10** - 渐进式JavaScript框架
- **Element UI 2.15.14** - 基于Vue的桌面端组件库
- **Vue Router 3.0.3** - Vue.js官方路由管理器
- **Vuex 3.6.2** - Vue.js应用的状态管理模式

### 工具库
- **Axios 0.18.0** - HTTP客户端
- **ECharts 5.6.0** - 数据可视化图表库
- **Vue-Quill-Editor 3.0.6** - 富文本编辑器
- **Mavon-Editor 2.10.4** - Markdown编辑器
- **Vue-Cropperjs 3.0.0** - 图片裁剪组件
- **Vue-i18n 8.10.0** - 国际化插件

### 构建工具
- **Vue CLI 3.9.0** - Vue.js开发工具
- **Webpack** - 模块打包器
- **Babel** - JavaScript编译器

## 环境要求

### 系统要求
- **操作系统**: Windows 10/11, macOS, Linux
- **Node.js**: >= 14.0.0 (推荐使用 16.x 或 18.x LTS版本)
- **npm**: >= 6.0.0 或 yarn >= 1.22.0

### 开发工具推荐
- **IDE**: VS Code, WebStorm
- **浏览器**: Chrome >= 80, Firefox >= 75, Edge >= 80

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd 后台源码
```

### 2. 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn (推荐)
yarn install

# 如果安装失败，可以使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

### 3. 启动开发服务器
```bash
# 启动开发服务器
npm run serve
# 或
yarn serve

# 服务器将在 http://localhost:8086 启动
```

### 4. 构建生产版本
```bash
# 构建生产版本
npm run build
# 或
yarn build

# 构建完成后，dist目录包含所有静态文件
```

## Windows 部署指南

### 方式一：使用 IIS 部署

1. **安装 IIS**
   - 打开"控制面板" → "程序" → "启用或关闭Windows功能"
   - 勾选"Internet Information Services"
   - 确保勾选"万维网服务"和"IIS管理控制台"

2. **配置网站**
   ```bash
   # 构建项目
   npm run build

   # 将 dist 目录复制到 IIS 网站根目录
   # 例如：C:\inetpub\wwwroot\admin
   ```

3. **配置 URL 重写**
   - 在网站根目录创建 `web.config` 文件：
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="Handle History Mode and hash mode" stopProcessing="true">
             <match url="(.*)" />
             <conditions logicalGrouping="MatchAll">
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
               <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
             </conditions>
             <action type="Rewrite" url="/" />
           </rule>
         </rules>
       </rewrite>
     </system.webServer>
   </configuration>
   ```

### 方式二：使用 Nginx 部署

1. **下载并安装 Nginx for Windows**
   - 从 http://nginx.org/en/download.html 下载
   - 解压到 `C:\nginx`

2. **配置 Nginx**
   - 编辑 `C:\nginx\conf\nginx.conf`：
   ```nginx
   server {
       listen       80;
       server_name  localhost;

       location / {
           root   C:/path/to/your/dist;
           index  index.html index.htm;
           try_files $uri $uri/ /index.html;
       }

       # API代理配置
       location /api/ {
           proxy_pass http://localhost:8092/shenzhoupost/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **启动 Nginx**
   ```cmd
   cd C:\nginx
   start nginx
   ```

### 方式三：使用 Node.js 静态服务器

1. **安装 serve**
   ```bash
   npm install -g serve
   ```

2. **启动服务**
   ```bash
   # 在 dist 目录下运行
   serve -s . -l 3000
   ```

## 项目配置

### API 接口配置
编辑 `src/utils/request.js` 配置后端API地址：

```javascript
// 开发环境
const baseURL = 'http://localhost:8092/shenzhoupost'

// 生产环境
const baseURL = 'https://your-domain.com/shenzhoupost'
```

### 路由配置
主要路由配置在 `src/router/index.js`：

```javascript
// 主要功能模块路由
const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/order', component: OrderManage },
  { path: '/user', component: UserManage },
  { path: '/express', component: ExpressManage },
  // ... 其他路由
]
```

## 主要功能模块

### 1. 订单管理 (`/views/OrderManage.vue`)
- 订单列表查询和筛选
- 订单状态管理
- 订单详情查看
- 批量操作功能

### 2. 用户管理
- **普通用户管理** (`/views/NormalUserManage.vue`)
- **管理员用户管理** (`/views/AdminUserManage.vue`)
- 用户信息编辑
- 用户状态管理

### 3. 快递管理 (`/views/ExpressManage.vue`)
- 快递类型配置
- 价格管理
- 服务区域设置

### 4. 财务管理
- **佣金流水管理** (`/views/CommissionFlowManage.vue`)
- **月结账单管理** (`/views/MonthlyStatementManage.vue`)
- **发票申请管理** (`/views/OrderInvoiceRequestManage.vue`)

### 5. 系统管理
- **公告管理** (`/views/NoticeManage.vue`)
- **协议管理** (`/views/AgreementManage.vue`)
- 背景图片管理

## 开发指南

### 目录结构
```
src/
├── api/                 # API接口定义
├── assets/             # 静态资源
├── components/         # 公共组件
├── router/             # 路由配置
├── store/              # Vuex状态管理
├── utils/              # 工具函数
├── views/              # 页面组件
└── App.vue            # 根组件
```

### 添加新功能模块

1. **创建API接口** (`src/api/`)
2. **创建页面组件** (`src/views/`)
3. **添加路由配置** (`src/router/index.js`)
4. **更新导航菜单** (`src/components/common/Sidebar.vue`)

### 代码规范
- 使用 ES6+ 语法
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 遵循 Vue.js 官方风格指南

## 常见问题

### 1. 安装依赖失败
```bash
# 清除缓存
npm cache clean --force

# 使用淘宝镜像
npm install --registry=https://registry.npmmirror.com

# 或使用 yarn
yarn install
```

### 2. 启动失败
- 检查 Node.js 版本是否符合要求
- 确保端口 8086 未被占用
- 检查防火墙设置

### 3. 构建失败
- 检查内存是否充足
- 尝试删除 `node_modules` 重新安装
- 检查文件路径是否包含中文或特殊字符

### 4. 跨域问题
在 `vue.config.js` 中配置代理：

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8092',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/shenzhoupost'
        }
      }
    }
  }
}
```

## 性能优化

### 1. 构建优化
- 启用 Gzip 压缩
- 使用 CDN 加载第三方库
- 代码分割和懒加载

### 2. 运行时优化
- 图片懒加载
- 虚拟滚动（大数据列表）
- 防抖和节流

## 更新日志

### v4.2.0
- 升级 Element UI 到 2.15.14
- 新增 ECharts 5.6.0 支持
- 优化订单管理功能
- 修复已知问题

## 技术支持

如遇到问题，请：
1. 查看本文档的常见问题部分
2. 检查浏览器控制台错误信息
3. 确认后端API服务是否正常运行
4. 联系技术支持团队

## 许可证

[MIT License](./LICENSE)


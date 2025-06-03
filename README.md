<<<<<<< HEAD
# shenzhou 项目说明
### 多端开发框架
包含：
- 小程序端：`小程序源码/`
- 后端服务：`后端源码/`
- 管理后台：`后台源码/`
=======
# 神州邮快递物流管理系统

一个完整的快递物流管理平台，包含后台管理系统、后端API服务和小程序前端，为用户提供全方位的快递寄送服务。

## 项目概述

神州邮是一个企业级的快递物流管理平台，采用前后端分离架构，支持多端应用：

- 🖥️ **后台管理系统** - 管理员使用的Web后台，管理订单、用户、财务等
- 🚀 **后端API服务** - 提供RESTful API，支持业务逻辑处理
- 📱 **小程序前端** - 用户使用的微信小程序，提供快递寄送服务

## 系统架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   后台管理系统    │    │   小程序前端     │    │   移动端App     │
│   (Vue.js)      │    │   (uni-app)     │    │   (uni-app)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   后端API服务    │
                    │  (Spring Boot)  │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   数据库层       │
                    │  MySQL + Redis  │
                    └─────────────────┘
```

## 技术栈总览

### 前端技术
- **后台管理**: Vue.js 2.6 + Element UI + Vue Router + Vuex
- **小程序**: uni-app + Vue.js 2.6 + Vuex + uni-ui

### 后端技术
- **框架**: Spring Boot 3.1.5 + Spring Web
- **数据库**: MySQL 8.0 + Redis 6.0
- **ORM**: MyBatis Plus 3.5.5
- **安全**: JWT Token + BCrypt加密

### 第三方服务
- **支付**: 微信支付SDK
- **短信**: 阿里云短信服务
- **文件**: 本地存储 + 图片处理

## 项目结构

```
shenzhou/
├── 后台源码/                    # Vue.js后台管理系统
│   ├── src/
│   ├── package.json
│   └── README.md
├── 后端源码/                    # Spring Boot后端服务
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── 小程序源码/                  # uni-app小程序
│   ├── pages/
│   ├── manifest.json
│   └── README.md
└── README.md                   # 项目总体说明
```

## 环境要求

### 开发环境
- **Node.js**: >= 14.0.0 (推荐 16.x LTS)
- **JDK**: 17 或更高版本
- **Maven**: 3.6.0 或更高版本
- **MySQL**: 8.0 或更高版本
- **Redis**: 6.0 或更高版本

### 开发工具
- **前端**: VS Code, WebStorm, HBuilderX
- **后端**: IntelliJ IDEA, Eclipse
- **数据库**: Navicat, DBeaver, MySQL Workbench
- **API测试**: Postman, Apifox

## Windows 快速部署

### 1. 环境准备

#### 安装基础软件
```bash
# 1. 安装Node.js (https://nodejs.org/)
node -v
npm -v

# 2. 安装JDK 17 (https://adoptium.net/)
java -version

# 3. 安装Maven (https://maven.apache.org/)
mvn -version

# 4. 安装MySQL 8.0 (https://dev.mysql.com/downloads/)
# 5. 安装Redis (https://github.com/microsoftarchive/redis/releases)
```

### 2. 数据库配置

```sql
-- 创建数据库
CREATE DATABASE shenzhoupost CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户
CREATE USER 'ShenzhouPost'@'localhost' IDENTIFIED BY 'i3w8Lir5mRHm5dkC';
GRANT ALL PRIVILEGES ON shenzhoupost.* TO 'ShenzhouPost'@'localhost';
FLUSH PRIVILEGES;

-- 导入数据库结构
-- mysql -u ShenzhouPost -p shenzhoupost < 后端源码/sql/create.sql
```

### 3. 启动后端服务

```bash
cd 后端源码

# 编译项目
mvn clean compile

# 启动应用
mvn spring-boot:run

# 或者打包后运行
mvn clean package
java -jar target/test-0.0.1-SNAPSHOT.jar
```

后端服务将在 http://localhost:8092/shenzhoupost 启动

### 4. 启动后台管理系统

```bash
cd 后台源码

# 安装依赖
npm install

# 启动开发服务器
npm run serve
```

后台管理系统将在 http://localhost:8086 启动

### 5. 启动小程序

```bash
cd 小程序源码

# 安装依赖
npm install

# 使用HBuilderX打开项目
# 或使用命令行运行到微信小程序
npm run dev:mp-weixin
```

## 生产环境部署

### 1. 后端服务部署

```bash
# 构建JAR包
cd 后端源码
mvn clean package -DskipTests

# 创建启动脚本 start.bat
@echo off
set JAVA_OPTS=-Xms512m -Xmx1024m -Dfile.encoding=UTF-8
java %JAVA_OPTS% -jar target/test-0.0.1-SNAPSHOT.jar

# 启动服务
start.bat
```

### 2. 前端部署

```bash
# 构建后台管理系统
cd 后台源码
npm run build

# 部署到IIS或Nginx
# 将dist目录内容复制到Web服务器根目录
```

### 3. 小程序发布

```bash
# 构建小程序
cd 小程序源码
npm run build:mp-weixin

# 使用微信开发者工具上传代码
# 在微信公众平台提交审核
```

## 功能特性

### 核心业务功能
- ✅ **订单管理** - 创建、查询、跟踪、统计
- ✅ **用户管理** - 注册、登录、权限、认证
- ✅ **快递服务** - 单件寄送、批量寄件、快运
- ✅ **支付系统** - 微信支付、退款、流水
- ✅ **月结服务** - 企业月结、账单管理
- ✅ **代理系统** - 邀请返佣、收益统计

### 管理功能
- ✅ **数据统计** - 订单统计、收入分析
- ✅ **财务管理** - 佣金流水、发票管理
- ✅ **系统设置** - 公告、协议、配置
- ✅ **用户服务** - 客服、反馈、帮助

### 技术特性
- ✅ **响应式设计** - 支持多种屏幕尺寸
- ✅ **多端支持** - 小程序、H5、App
- ✅ **安全防护** - JWT认证、数据加密
- ✅ **性能优化** - 缓存、分页、懒加载

## 配置说明

### 后端配置 (application.yaml)
```yaml
server:
  port: 8092
  servlet:
    context-path: /shenzhoupost

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/shenzhoupost?serverTimezone=UTC
    username: ShenzhouPost
    password: i3w8Lir5mRHm5dkC
  redis:
    host: localhost
    port: 6379
    database: 10
```

### 前端配置
```javascript
// 后台管理系统 API配置
const baseURL = 'http://localhost:8092/shenzhoupost'

// 小程序 API配置
const baseUrl = 'http://localhost:8092/shenzhoupost'
```

## 常见问题

### 1. 端口冲突
```bash
# 查看端口占用
netstat -ano | findstr :8092
netstat -ano | findstr :8086

# 结束进程
taskkill /F /PID <进程ID>
```

### 2. 数据库连接失败
- 检查MySQL服务是否启动
- 确认数据库用户名密码正确
- 验证数据库是否存在

### 3. Redis连接失败
- 检查Redis服务是否启动
- 确认Redis配置参数
- 验证网络连接

### 4. 跨域问题
- 后台管理系统配置代理
- 确认后端CORS配置
- 检查请求头设置

## 开发团队

- **项目架构**: Spring Boot + Vue.js + uni-app
- **数据库设计**: MySQL + Redis
- **第三方集成**: 微信支付 + 阿里云短信
- **部署运维**: Windows + Linux 支持

## 更新日志

### v1.0.0 (2024-01-01)
- 🎉 初始版本发布
- ✨ 完整的快递物流管理功能
- 🔐 用户认证和权限系统
- 💰 微信支付集成
- 📱 小程序多端支持

## 技术支持

如遇到问题，请按以下步骤排查：

1. **查看日志文件**
   - 后端: `logs/shenzhoupost.log`
   - 前端: 浏览器控制台
   - 小程序: 微信开发者工具控制台

2. **检查服务状态**
   - MySQL服务是否启动
   - Redis服务是否启动
   - 后端API是否正常响应

3. **验证配置文件**
   - 数据库连接配置
   - API接口地址配置
   - 第三方服务配置

4. **联系技术支持**
   - 提供详细的错误信息
   - 说明操作步骤和环境信息
   - 附上相关日志文件

## 许可证

[MIT License](./LICENSE)

---

**神州邮快递物流管理系统** - 让快递寄送更简单、更高效！
>>>>>>> 1827995 (完全重建：正确添加所有源码)

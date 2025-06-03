# 神州邮后端API服务

基于 Spring Boot 3.1.5 的快递物流管理系统后端服务，提供完整的RESTful API接口，支持订单管理、用户管理、支付集成、短信服务等功能。

## 项目概述

神州邮后端API服务是一个企业级的快递物流管理平台后端，提供了完整的业务功能：

- 🚀 **订单管理** - 快递订单的创建、查询、状态跟踪、物流信息
- 👤 **用户系统** - 用户注册、登录、权限管理、实名认证
- 💳 **支付集成** - 微信支付、支付流水、退款处理
- 📱 **短信服务** - 阿里云短信、验证码、通知推送
- 📊 **数据统计** - 订单统计、收入分析、月结账单
- 🔐 **安全认证** - JWT Token、权限控制、数据加密

## 技术栈

### 核心框架
- **Spring Boot 3.1.5** - 企业级Java应用框架
- **Spring Web** - RESTful API开发
- **Spring Data Redis** - Redis缓存支持
- **MyBatis Plus 3.5.5** - 持久层框架

### 数据库
- **MySQL 8.0.27** - 主数据库
- **Redis** - 缓存和会话存储

### 第三方集成
- **微信支付SDK 4.5.0** - 微信支付集成
- **阿里云短信SDK** - 短信服务
- **Apache POI 5.2.3** - Excel文件处理
- **Hutool 5.3.10** - Java工具库

### 开发工具
- **Lombok** - 代码简化
- **Fastjson 1.2.60** - JSON处理
- **Apache HttpClient 4.5.13** - HTTP客户端

## 环境要求

### 系统要求
- **操作系统**: Windows 10/11, Linux, macOS
- **JDK**: 17 或更高版本
- **Maven**: 3.6.0 或更高版本
- **MySQL**: 8.0 或更高版本
- **Redis**: 6.0 或更高版本

### 开发工具推荐
- **IDE**: IntelliJ IDEA, Eclipse, VS Code
- **数据库工具**: Navicat, DBeaver, MySQL Workbench
- **API测试**: Postman, Apifox

## 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd 后端源码
```

### 2. 数据库配置

#### 安装MySQL
1. 下载MySQL 8.0: https://dev.mysql.com/downloads/mysql/
2. 安装并启动MySQL服务
3. 创建数据库：
```sql
CREATE DATABASE shenzhoupost CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ShenzhouPost'@'localhost' IDENTIFIED BY 'i3w8Lir5mRHm5dkC';
GRANT ALL PRIVILEGES ON shenzhoupost.* TO 'ShenzhouPost'@'localhost';
FLUSH PRIVILEGES;
```

#### 导入数据库结构
```bash
# 使用提供的SQL文件创建表结构
mysql -u ShenzhouPost -p shenzhoupost < sql/create.sql
```

### 3. Redis配置

#### Windows安装Redis
1. 下载Redis for Windows: https://github.com/microsoftarchive/redis/releases
2. 解压并启动Redis服务：
```cmd
cd redis
redis-server.exe redis.windows.conf
```

#### 或使用Docker
```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

### 4. 配置文件修改

编辑 `src/main/resources/application.yaml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/shenzhoupost?serverTimezone=UTC
    username: ShenzhouPost
    password: i3w8Lir5mRHm5dkC
  redis:
    host: localhost
    port: 6379
    password: # 如果Redis设置了密码
    database: 10
```

### 5. 编译和运行

```bash
# 使用Maven编译
mvn clean compile

# 运行应用
mvn spring-boot:run

# 或者打包后运行
mvn clean package
java -jar target/test-0.0.1-SNAPSHOT.jar
```

应用将在 http://localhost:8092/shenzhoupost 启动

## Windows 部署指南

### 方式一：直接运行JAR包

1. **编译项目**
```cmd
mvn clean package -DskipTests
```

2. **创建启动脚本** (`start.bat`)
```batch
@echo off
set JAVA_OPTS=-Xms512m -Xmx1024m -Dfile.encoding=UTF-8
java %JAVA_OPTS% -jar target/test-0.0.1-SNAPSHOT.jar
pause
```

3. **创建停止脚本** (`stop.bat`)
```batch
@echo off
for /f "tokens=1" %%i in ('jps -l ^| find "test-0.0.1-SNAPSHOT.jar"') do (
    echo Stopping process %%i
    taskkill /F /PID %%i
)
pause
```

### 方式二：Windows服务部署

1. **下载WinSW**: https://github.com/winsw/winsw/releases
2. **创建服务配置** (`shenzhoupost-service.xml`)
```xml
<service>
  <id>shenzhoupost</id>
  <name>ShenzhouPost API Service</name>
  <description>神州邮后端API服务</description>
  <executable>java</executable>
  <arguments>-Xms512m -Xmx1024m -jar "%BASE%\target\test-0.0.1-SNAPSHOT.jar"</arguments>
  <workingdirectory>%BASE%</workingdirectory>
  <logmode>rotate</logmode>
  <depend>MySQL80</depend>
</service>
```

3. **安装和启动服务**
```cmd
# 安装服务
winsw.exe install shenzhoupost-service.xml

# 启动服务
net start shenzhoupost

# 停止服务
net stop shenzhoupost
```

### 方式三：使用Tomcat部署

1. **修改打包方式** (pom.xml)
```xml
<packaging>war</packaging>
```

2. **添加Tomcat依赖**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

3. **创建启动类**
```java
@SpringBootApplication
public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(TestApplication.class);
    }
}
```

4. **部署到Tomcat**
```bash
mvn clean package
# 将生成的war文件复制到Tomcat的webapps目录
```

## 配置说明

### 数据库配置
```yaml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/shenzhoupost?serverTimezone=UTC
    username: ShenzhouPost
    password: i3w8Lir5mRHm5dkC
    hikari:
      connection-test-query: SELECT 1
      connection-timeout: 60000
      maximum-pool-size: 12
      minimum-idle: 10
```

### Redis配置
```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: # Redis密码（如果有）
    database: 10
    jedis:
      pool:
        max-active: 8
        max-wait: 5s
        min-idle: 0
        max-idle: 8
```

### 微信支付配置
```yaml
wxpay:
  appId: wx2dfe755086f4af5e
  mchId: 1705925600
  apiV3Key: AKIDRs55uXzEf6MPLG1nRtAOWfcNuDLF
  privateKeyPath: classpath:apiclient_key.pem
  merchantCertPath: classpath:apiclient_cert.pem
  notifyUrl: https://your-domain.com/shenzhoupost/WxPay/notify
  refundNotifyUrl: https://your-domain.com/shenzhoupost/WxPay/refundNotify
```

### 阿里云短信配置
```yaml
aliyun:
  sms:
    accessKeyId: YOUR_ACCESS_KEY_ID
    accessKeySecret: YOUR_ACCESS_KEY_SECRET
    signName: 您的短信签名
    templates:
      invoice: SMS_483415436
      pickup: SMS_484670070
      priceDiff: SMS_484650106
      monthly: SMS_484620088
      payment: SMS_484770093
      code: SMS_484825146
```

## API接口文档

### 认证接口
- `POST /UserLogin/login` - 用户登录
- `POST /UserLogin/register` - 用户注册
- `POST /UserLogin/logout` - 用户登出
- `POST /sms/send` - 发送短信验证码

### 订单管理
- `GET /Order/list` - 获取订单列表
- `POST /Order/create` - 创建订单
- `PUT /Order/update` - 更新订单
- `DELETE /Order/delete` - 删除订单
- `GET /Order/detail/{id}` - 获取订单详情

### 用户管理
- `GET /User/list` - 获取用户列表
- `POST /User/create` - 创建用户
- `PUT /User/update` - 更新用户信息
- `GET /User/profile` - 获取用户资料

### 支付接口
- `POST /WxPay/create` - 创建支付订单
- `POST /WxPay/notify` - 支付回调通知
- `POST /WxPay/refund` - 申请退款

## 主要功能模块

### 1. 订单管理 (`OrderController`)
- 订单创建和状态管理
- 物流信息跟踪
- 批量订单处理
- 订单统计分析

### 2. 用户管理 (`UserController`)
- 用户注册和认证
- 权限管理
- 用户资料管理
- 实名认证

### 3. 支付管理 (`WxPayController`)
- 微信支付集成
- 支付流水记录
- 退款处理
- 对账功能

### 4. 短信服务 (`SmsController`)
- 验证码发送
- 通知短信
- 模板管理
- 发送记录

### 5. 文件管理 (`FileController`)
- 图片上传
- 文件存储
- 访问控制
- 缩略图生成

## 开发指南

### 项目结构
```
src/main/java/com/test/
├── config/              # 配置类
├── controller/          # 控制器层
├── service/            # 服务层
├── mapper/             # 数据访问层
├── model/              # 实体类
├── utils/              # 工具类
├── exception/          # 异常处理
└── task/               # 定时任务
```

### 添加新功能模块

1. **创建实体类** (`model/`)
```java
@Data
@TableName("table_name")
public class Entity {
    @TableId(type = IdType.AUTO)
    private Long id;
    // 其他字段...
}
```

2. **创建Mapper接口** (`mapper/`)
```java
@Mapper
public interface EntityMapper extends BaseMapper<Entity> {
    // 自定义查询方法
}
```

3. **创建Service** (`service/`)
```java
@Service
public class EntityService extends ServiceImpl<EntityMapper, Entity> {
    // 业务逻辑
}
```

4. **创建Controller** (`controller/`)
```java
@RestController
@RequestMapping("/entity")
public class EntityController {
    @Autowired
    private EntityService entityService;
    // API接口
}
```

### 代码规范
- 使用 Lombok 简化代码
- 遵循 RESTful API 设计规范
- 统一异常处理
- 使用 Result 统一返回格式

## 常见问题

### 1. 数据库连接失败
```bash
# 检查MySQL服务状态
net start mysql80

# 检查数据库配置
# 确认用户名、密码、数据库名称正确
```

### 2. Redis连接失败
```bash
# 启动Redis服务
redis-server.exe

# 检查Redis配置
# 确认host、port、password配置正确
```

### 3. 端口被占用
```cmd
# 查看端口占用
netstat -ano | findstr :8092

# 结束占用进程
taskkill /F /PID <进程ID>
```

### 4. 微信支付配置问题
- 检查证书文件路径是否正确
- 确认商户号和API密钥配置
- 验证回调URL是否可访问

### 5. 短信发送失败
- 检查阿里云AccessKey配置
- 确认短信签名和模板ID
- 验证手机号格式

## 性能优化

### 1. 数据库优化
- 合理使用索引
- 优化SQL查询
- 配置连接池参数
- 读写分离

### 2. 缓存优化
- Redis缓存热点数据
- 设置合理的过期时间
- 缓存穿透和雪崩防护

### 3. 接口优化
- 分页查询大数据量
- 异步处理耗时操作
- 接口限流和防重复提交

## 监控和日志

### 1. 日志配置
```yaml
logging:
  level:
    com.test: DEBUG
    org.springframework: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/shenzhoupost.log
```

### 2. 健康检查
- Spring Boot Actuator
- 数据库连接检查
- Redis连接检查
- 第三方服务状态

## 安全配置

### 1. 数据加密
- 密码BCrypt加密
- 敏感数据AES加密
- HTTPS传输加密

### 2. 权限控制
- JWT Token认证
- 角色权限管理
- 接口访问控制

### 3. 防护措施
- SQL注入防护
- XSS攻击防护
- CSRF防护
- 接口限流

## 部署清单

### 生产环境部署前检查
- [ ] 数据库配置正确
- [ ] Redis配置正确
- [ ] 微信支付证书配置
- [ ] 阿里云短信配置
- [ ] 日志目录权限
- [ ] 文件上传目录权限
- [ ] 防火墙端口开放
- [ ] SSL证书配置（如需要）

### 环境变量配置
```bash
# 设置JVM参数
export JAVA_OPTS="-Xms512m -Xmx1024m -Dfile.encoding=UTF-8"

# 设置配置文件路径
export SPRING_CONFIG_LOCATION=classpath:/application.yaml

# 设置运行环境
export SPRING_PROFILES_ACTIVE=prod
```

## 更新日志

### v1.0.0
- 初始版本发布
- 基础订单管理功能
- 用户认证系统
- 微信支付集成
- 短信服务集成

## 技术支持

如遇到问题，请：
1. 查看应用日志文件
2. 检查数据库和Redis连接
3. 确认配置文件参数
4. 联系技术支持团队

## 许可证

[MIT License](./LICENSE)

-- -- 创建数据库
-- CREATE
-- DATABASE IF NOT EXISTS ShenzhouPost CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
--
-- -- 选择数据库
-- USE
-- ShenzhouPost;

-- 用户表
CREATE TABLE `user`
(
    `user_id`                           VARCHAR(100) NOT NULL UNIQUE COMMENT '用户id',
    `user_name`                         VARCHAR(100) NOT NULL COMMENT '姓名',
    `password`                          VARCHAR(100) NOT NULL COMMENT '密码',
    `phone`                             VARCHAR(255) NOT NULL COMMENT '电话号码',
    `identification`                    VARCHAR(18) COMMENT '身份证号码',
    `identity`                          INT          NOT NULL COMMENT '身份（0为管理员，1为普通用户）',
    `is_real`                           INT          NOT NULL DEFAULT 0 COMMENT '是否实名（0为否，1为审核中，2为已实名）',
    `open_id`                           VARCHAR(100) COMMENT '用户openId',
    `my_code`                           VARCHAR(255) COMMENT '邀请码',
    `be_invited`                        VARCHAR(255) COMMENT '被邀请',
    `code`                              VARCHAR(100) COMMENT '月结资格密码',
    `money`                             DECIMAL(15, 2)        DEFAULT 0 COMMENT '佣金金额',
    `get_money`                         DECIMAL(15, 2)        DEFAULT 0.5 COMMENT '每次可获取的佣金金额',
    `is_month`                          INT          NOT NULL DEFAULT 0 COMMENT '是否拥有月结资格（0为否，1为是）',
    `approved_limit`                    DECIMAL(15, 2)        DEFAULT 0 COMMENT '月结资格id',
    `monthly_settlement_eligibility_id` VARCHAR(100) COMMENT '已使用额度',
    `is_get_money`                      INT          NOT NULL DEFAULT 0 COMMENT '是否可以获得佣金（0为是，1为否）',
    `is_enable`                         INT          NOT NULL DEFAULT 0 COMMENT '是否加入黑名单（0为是，1为否）',
    `is_delete`                         INT          NOT NULL DEFAULT 0 COMMENT '是否可用（0为是，1为否）',
    `create_time`                       DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`                       DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='用户表';
INSERT INTO `user` (`user_id`,
                    `user_name`,
                    `password`,
                    `phone`,
                    `identification`,
                    `identity`,
                    `is_real`,
                    `open_id`,
                    `my_code`,
                    `be_invited`,
                    `code`,
                    `is_month`,
                    `approved_limit`,
                    `monthly_settlement_eligibility_id`,
                    `is_delete`,
                    `create_time`,
                    `update_time`)
VALUES ('admin_001', -- 用户id
        'Admin', -- 姓名
        '7E236424AD2FB23DFFC92427CEC12FAB', -- 密码
        '17520209079', -- 电话号码
        '110101199001011234', -- 身份证号码
        0, -- 身份（0为管理员，1为普通用户）
        2, -- 是否实名（0为否，1为审核中，2为已实名）
        NULL, -- 用户openId
        'ADMIN001', -- 邀请码
        NULL, -- 被邀请
        NULL, -- 月结资格密码
        0, -- 是否拥有月结资格（0为否，1为是）
        Null, -- 月结资格id
        NULL, -- 已使用额度
        0, -- 是否可用（0为是，1为否）
        NOW(), -- 创建时间
        NOW() -- 修改时间
       );


-- 地址表
CREATE TABLE `user_address`
(
    `address_id`     VARCHAR(100) NOT NULL UNIQUE COMMENT '地址id',
    `user_id`        VARCHAR(100) NOT NULL COMMENT '用户id',
    `contact_name`   VARCHAR(100) NOT NULL COMMENT '联系人姓名',
    `contact_phone`  VARCHAR(100) NOT NULL COMMENT '联系人电话',
    `province`       VARCHAR(50) COMMENT '省',
    `city`           VARCHAR(50) COMMENT '市',
    `district`       VARCHAR(50) COMMENT '区',
    `detail_address` VARCHAR(255) NOT NULL COMMENT '详细地址',
    `type`           INT          NOT NULL DEFAULT 0 COMMENT '类型（0为寄件人地址，1为收货人地址）',
    `is_default`     INT          NOT NULL DEFAULT 0 COMMENT '是否为默认地址（0为否，1为是）',
    `is_delete`      INT          NOT NULL DEFAULT 0 COMMENT '是否可用（0为是，1为否）',
    `create_time`    DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`    DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='地址表';

-- 发票抬头表
CREATE TABLE `invoice_title`
(
    `title_id`        VARCHAR(100) NOT NULL UNIQUE COMMENT '发票抬头id',
    `user_id`         VARCHAR(100) NOT NULL COMMENT '用户id',
    `companies_name`  VARCHAR(100) COMMENT '当type为0时为企业名称，为1时为抬头全称',
    `tax_number`      CHAR(18) COMMENT '企业税号',
    `company_address` VARCHAR(500) COMMENT '企业地址',
    `citycompany_tel` VARCHAR(20) COMMENT '企业电话',
    `bank_account`    VARCHAR(100) COMMENT '银行账户',
    `bank_name`       VARCHAR(255) COMMENT '开户行名称',
    `type`            INT          NOT NULL DEFAULT 0 COMMENT '类型（0为企业单位，1为个人/非企业单位）',
    `is_default`      INT          NOT NULL DEFAULT 0 COMMENT '是否为默认抬头（0为否，1为是）',
    `is_delete`       INT          NOT NULL DEFAULT 0 COMMENT '是否可用（0为是，1为否）',
    `create_time`     DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`     DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='发票抬头表';

-- 用户佣金金额流动表
CREATE TABLE `commission_flow`
(
    `flow_id`     VARCHAR(100)   NOT NULL UNIQUE COMMENT '发票抬头id',
    `user_id`     VARCHAR(100)   NOT NULL COMMENT '用户id',
    `order_id`    VARCHAR(100)   NOT NULL COMMENT '订单id',
    `amount`      DECIMAL(10, 2) NOT NULL COMMENT '变动金额（正为获得，负为抵扣）',
    `balance`     DECIMAL(10, 2) NOT NULL COMMENT '账户余额',
    `flow_type`   INT            NOT NULL COMMENT '类型（0为邀请返佣，1为快递费抵扣，2为快递取消返现）',
    `create_time` DATETIME       NOT NULL COMMENT '创建时间',
    `update_time` DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='用户佣金金额流动表';

-- 用户月结资格审核表
CREATE TABLE `monthly_settlement_apply`
(
    apply_id               VARCHAR(100)   NOT NULL UNIQUE COMMENT '申请id',
    user_id                VARCHAR(100)   NOT NULL COMMENT '用户id',
    account_type           INT            NOT NULL DEFAULT 0 COMMENT '账户类型（0为企业账户，1为个人账户）',
    name                   VARCHAR(100)   NOT NULL COMMENT '联系人名称',
    phone                  VARCHAR(100)   NOT NULL COMMENT '联系电话',
    address                VARCHAR(100)   NOT NULL COMMENT '联系地址',
    email                  VARCHAR(100)   NOT NULL COMMENT '电子邮箱',
--     start_time             VARCHAR(100)   NOT NULL COMMENT '月结起始日期',
--     end_time               VARCHAR(100)   NOT NULL COMMENT '月结截止日期',
    minimum_amount         DECIMAL(15, 2) NOT NULL COMMENT '每月最低寄件量（元）',
    remark                 VARCHAR(255) COMMENT '特殊要求',
    settlement_cycle       INT            NOT NULL DEFAULT 0 COMMENT '结算周期（0为月结，1为季结，2为半年结）',
    invoice_requirement    INT            NOT NULL COMMENT '发票要求（0为增值税普通发票，1为增值税专用发票，2为其他）',
    id_card_portrait_photo VARCHAR(255) COMMENT '身份证人像面照片',
    id_card_emblem_photo   VARCHAR(255) COMMENT '身份证国徽面照片',
    business_license       VARCHAR(255) COMMENT '企业营业执照',
    apply_status           INT            NOT NULL DEFAULT 0 COMMENT '审核状态（0为审核中，1为审核通过，2为审核驳回）',
    reject_reason          VARCHAR(255) COMMENT '驳回理由',
    pereviewer_id          VARCHAR(100) COMMENT '审核人id',
    pereviewer_time        VARCHAR(255) COMMENT '审核时间',
    create_time            DATETIME       NOT NULL COMMENT '创建时间',
    update_time            DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='用户月结资格审核表';

-- 月结资格表
CREATE TABLE `monthly_settlement_eligibility`
(
    monthly_settlement_eligibility_id VARCHAR(100)   NOT NULL UNIQUE COMMENT '月结资格id',
    user_id                           VARCHAR(255)   NOT NULL COMMENT '主用户id',
    settlement_cycle                  INT            NOT NULL DEFAULT 0 COMMENT '结算周期（0为月结，1为季结，2为半年结）',
    minimum_amount                    DECIMAL(15, 2) NOT NULL COMMENT '每月最低寄件量（元）',
    password                          VARCHAR(255)   NOT NULL COMMENT '密码',
    status                            INT            NOT NULL DEFAULT 0 COMMENT '月结状态（0为正常，1为失效）',
    trade_number                      INT            NOT NULL DEFAULT 0 COMMENT '已完成交易次数',
    start_time                        VARCHAR(100) COMMENT '月结起始日期',
    cycle_number                      INT            NOT NULL COMMENT '周期数',
    settlement_date                   INT            NOT NULL COMMENT '结算日期',
    invoice_requirement               INT            NOT NULL COMMENT '发票要求（0为增值税普通发票，1为增值税专用发票，2为其他）',
    create_time                       DATETIME       NOT NULL COMMENT '创建时间',
    update_time                       DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='月结资格表';

-- 月结账单表
CREATE TABLE `monthly_statement`
(
    monthly_statement_id              VARCHAR(100)   NOT NULL UNIQUE COMMENT '月结账单id',
    user_id                           VARCHAR(100)   NOT NULL COMMENT '用户id',
    monthly_settlement_eligibility_id VARCHAR(100)   NOT NULL COMMENT '月结资格id',
    order_id                          VARCHAR(100)   NOT NULL COMMENT '订单id',
    type                              INT            NOT NULL DEFAULT 0 COMMENT '类型（0为支付，1为退款）',
    is_user_pays                      INT            NOT NULL DEFAULT 0 COMMENT '用户是否支付（0为否，1为是）',
    amount                            DECIMAL(10, 2) NOT NULL COMMENT '金额',
    create_time                       DATETIME       NOT NULL COMMENT '创建时间',
    update_time                       DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='月结账单表';


-- 寄件类型表
CREATE TABLE `express_type`
(
    `type_id`     VARCHAR(100) NOT NULL UNIQUE COMMENT '申请id',
    `type_name`   VARCHAR(255) NOT NULL COMMENT '类型名称',
    `create_time` DATETIME     NOT NULL COMMENT '创建时间',
    `update_time` DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='寄件类型表';

-- 快递订单表（注意：`long`为保留字，建议重命名）
CREATE TABLE `order`
(
    order_id                          VARCHAR(100)   NOT NULL UNIQUE COMMENT '订单id',
    wechat_id                         VARCHAR(100) COMMENT '微信支付id',
    user_id                           VARCHAR(100)   NOT NULL COMMENT '用户id',
    sender_name                       VARCHAR(100)   NOT NULL COMMENT '寄件人姓名',
    sender_phone                      VARCHAR(100)   NOT NULL COMMENT '寄件人电话',
    sender_province                   VARCHAR(50)    NOT NULL COMMENT '寄件人省',
    sender_city                       VARCHAR(50)    NOT NULL COMMENT '寄件人市',
    sender_district                   VARCHAR(50)    NOT NULL COMMENT '寄件人区',
    sender_detail_address             VARCHAR(255)   NOT NULL COMMENT '寄件人详细地址',
    receiver_name                     VARCHAR(100)   NOT NULL COMMENT '收件人姓名',
    receiver_phone                    VARCHAR(100)   NOT NULL COMMENT '收件人电话',
    receiver_province                 VARCHAR(50)    NOT NULL COMMENT '收件人省',
    receiver_city                     VARCHAR(50)    NOT NULL COMMENT '收件人市',
    receiver_district                 VARCHAR(50)    NOT NULL COMMENT '收件人区',
    receiver_detail_address           VARCHAR(255)   NOT NULL COMMENT '收件人详细地址',
    express_code                      VARCHAR(100)   NOT NULL COMMENT '快递公司编码',
    type_id                           VARCHAR(100)   NOT NULL COMMENT '快递类型id',
    deliveryBusiness                  VARCHAR(100)    COMMENT '快递产品类型',
    estimated_item_weight             DECIMAL(10, 2) NOT NULL COMMENT '预估物品重量',
    goods                             VARCHAR(100)    COMMENT '物品名称',

    actual_weight                     DECIMAL(10, 2) COMMENT '实际重量',
    `long`                            DECIMAL(10, 2) COMMENT '长',
    width                             DECIMAL(10, 2) COMMENT '宽',
    height                            DECIMAL(10, 2) COMMENT '高',
    pick_up_start_time                VARCHAR(100) COMMENT '预计取件开始时间',
    pick_up_end_time                  VARCHAR(100) COMMENT '预计取件结束时间',
    guaran_tee_value_amount DOUBLE COMMENT '保价金额',
    insurance_fee                     DECIMAL(10, 2) COMMENT '保价费',
    payment_method                    INT COMMENT '支付方式',
    commission_deduction_amount       DECIMAL(10, 2) COMMENT '佣金抵扣金额',
    order_total_price                 DECIMAL(10, 2) COMMENT '订单总价',
    amount_after_commission_deduction DECIMAL(10, 2) COMMENT '佣金抵扣后金额',
    order_no                          VARCHAR(100) COMMENT '易达订单号',
    delivery_id                       VARCHAR(100) COMMENT '运单号',
    shipping_time                     VARCHAR(100) COMMENT '发货时间',
    receiving_time                    VARCHAR(100) COMMENT '签收时间',
    shipping_status                   INT COMMENT '运送状态',
    order_price_difference            DECIMAL(10, 2) COMMENT '订单差价',
    is_price_difference_paid          INT                     DEFAULT 1 COMMENT '是否补全差价',
    order_status                      INT COMMENT '订单状态',
    pick_up_time                      varchar(20)             DEFAULT NULL COMMENT '取件时间',
    remark                            VARCHAR(255) COMMENT '备注',
    is_delete                         INT            NOT NULL DEFAULT 0 COMMENT '是否可用',
    create_time                       DATETIME       NOT NULL COMMENT '创建时间',
    update_time                       DATETIME       NOT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='快递订单表';

-- 支付流水表
CREATE TABLE `payment_flow`
(
    `flow_id`           VARCHAR(100)   NOT NULL UNIQUE COMMENT '支付流水id',
    `user_id`           VARCHAR(100)   NOT NULL COMMENT '用户id',
    `order_id`          VARCHAR(100)   NOT NULL COMMENT '订单id',
    `merchant_order_id` VARCHAR(100)   NOT NULL COMMENT '商户订单号',
    `description`       VARCHAR(255) COMMENT '交易描述',
    `openid`            VARCHAR(100)   NOT NULL COMMENT '用户openId',
    `transaction_id`    VARCHAR(100)   NOT NULL COMMENT '微信支付交易单号',
    `amount`            DECIMAL(10, 2) NOT NULL COMMENT '实际支付金额（精确到分）',
    `refund_flag`       INT            NOT NULL DEFAULT 0 COMMENT '退款标记（0为未退款，1为已退款）',
    `error_description` VARCHAR(255) COMMENT '错误描述',
    `create_time`       DATETIME       NOT NULL COMMENT '创建时间',
    `update_time`       DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='支付流水表';

-- 订单发票申请表
CREATE TABLE `order_invoice_request`
(
    `order_invoice_request_id` VARCHAR(100) NOT NULL UNIQUE COMMENT '订单发票申请id',
    `user_id`                  VARCHAR(100) NOT NULL COMMENT '申请用户id',
    `order_id`                 VARCHAR(100) NOT NULL COMMENT '订单id',
    `email`                    VARCHAR(100) COMMENT '电子邮箱',
    `status`                   INT          NOT NULL DEFAULT 0 COMMENT '状态（0为待处理，1为已处理,2为申请驳回）',
    `invoice_photo`            VARCHAR(255) COMMENT '发票照片',
    `invoice_type`             INT COMMENT '发票类型',
    `companies_name`           VARCHAR(100) COMMENT '当type为0时为企业名称，为1时为抬头全称',
    `tax_number`               CHAR(18) COMMENT '企业税号',
    `company_address`          VARCHAR(500) COMMENT '企业地址',
    `citycompany_tel`          VARCHAR(20) COMMENT '企业电话',
    `bank_account`             VARCHAR(100) COMMENT '银行账户',
    `bank_name`                VARCHAR(255) COMMENT '开户行名称',
    `type`                     INT          NOT NULL DEFAULT 0 COMMENT '类型（0为企业单位，1为个人/非企业单位）',
    `overrule`                 VARCHAR(512) COMMENT '驳回理由',
    `remark`                   VARCHAR(512) COMMENT '备注',
    `create_time`              DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`              DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='订单发票申请表';

-- 快递利润表
CREATE TABLE `express`
(
    `express_id`    VARCHAR(100)   NOT NULL UNIQUE COMMENT '快递id',
    `express_name`  VARCHAR(100)   NOT NULL COMMENT '快递名称',
    `delivery_type` VARCHAR(100)   NOT NULL COMMENT '快递公司',
    `profit`        DECIMAL(10, 2) NOT NULL COMMENT '利润',
    `is_close`      INT            NOT NULL DEFAULT 1 COMMENT '是否关闭（0为关闭，1为开启）',
    `create_time`   DATETIME       NOT NULL COMMENT '创建时间',
    `update_time`   DATETIME       NOT NULL COMMENT '修改时间'
) COMMENT='快递利润表';

-- 向快递利润表(express)插入初始数据（利润默认为0.0）
INSERT INTO `express` (`express_id`,
                       `express_name`,
                       `delivery_type`,
                       `profit`,
                       `is_close`,
                       `create_time`,
                       `update_time`)
VALUES ('express_JD', '京东', 'JD', 0.00, 1, NOW(), NOW()),
       ('express_YTO', '圆通', 'YTO', 0.00, 1, NOW(), NOW()),
       ('express_STO', '申通', 'STO-INT', 0.00, 1, NOW(), NOW()),
       ('express_DOP', '德邦', 'DOP', 0.00, 1, NOW(), NOW()),
       ('express_SF', '顺丰', 'SF', 0.00, 1, NOW(), NOW()),
       ('express_JT', '极兔', 'JT', 0.00, 1, NOW(), NOW()),
       ('express_ZTO', '中通', 'ZTO', 0.00, 1, NOW(), NOW()),
       ('express_YUND', '韵达', 'YUND', 0.00, 1, NOW(), NOW()),
       ('express_CAINIAO', '菜鸟裹裹', 'CAINIAO', 0.00, 1, NOW(), NOW()),
       ('express_CNSD', '菜鸟速递', 'CNSD', 0.00, 1, NOW(), NOW()),
       ('express_BEST', '百世', 'BEST', 0.00, 1, NOW(), NOW()),
       ('express_KY', '跨越速运', 'KY', 0.00, 1, NOW(), NOW()),
       ('express_EMS', 'EMS', 'EMS', 0.00, 1, NOW(), NOW()),
       ('express_YMDD', '壹米滴答', 'YMDD', 0.00, 1, NOW(), NOW()),
       ('express_SXJD', '顺心捷达', 'SXJD', 0.00, 1, NOW(), NOW());

-- 协议表
CREATE TABLE `agreement`
(
    `agreement_id`   VARCHAR(100) NOT NULL UNIQUE COMMENT '协议id',
    `context`        LONGTEXT     NOT NULL COMMENT '协议内容',
    `agreement_type` INT          NOT NULL COMMENT '协议类型（0为隐私协议，1为快递协议，2为违禁品说明，3为用户协议）',
    `create_time`    DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`    DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='协议表';

-- 系统公告表
CREATE TABLE `notice`
(
    `notice_id`   VARCHAR(100) NOT NULL UNIQUE COMMENT '公告id',
    `title`       VARCHAR(255) NOT NULL COMMENT '公告标题',
    `content`     TEXT         NOT NULL COMMENT '公告内容',
    `type`        INT          NOT NULL COMMENT '公告类型（0为更新公告，1为新增公告，2为通知公告，3为维护公告）',
    `is_delete`   INT          NOT NULL DEFAULT 0 COMMENT '是否可用（0为是，1为否）',
    `create_time` DATETIME     NOT NULL COMMENT '创建时间',
    `update_time` DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='系统公告表';

-- 帮助中心问题表
CREATE TABLE `question`
(
    `question_id` VARCHAR(100) NOT NULL UNIQUE COMMENT '问题id',
    `question`    VARCHAR(255) NOT NULL COMMENT '问题',
    `reply`       TEXT         NOT NULL COMMENT '回答',
    `create_time` DATETIME     NOT NULL COMMENT '创建时间',
    `update_time` DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='帮助中心问题表';

-- 主页背景图片表
CREATE TABLE `background_photo`
(
    `background_photo_id`   VARCHAR(100) NOT NULL UNIQUE COMMENT '主页背景图片id',
    `background_photo_name` VARCHAR(255) NOT NULL COMMENT '图片名称',
    `background_photo_url`  VARCHAR(255) NOT NULL COMMENT '图片路径',
    `app_id` VARCHAR(255)  COMMENT '跳转appId',
    `path` VARCHAR(255)  COMMENT '跳转路径',
    `create_time`           DATETIME     NOT NULL COMMENT '创建时间',
    `update_time`           DATETIME     NOT NULL COMMENT '修改时间'
) COMMENT='主页背景图片表';

-- 用户意见反馈表
CREATE TABLE feedback
(
    `feedback_id` VARCHAR(100) NOT NULL UNIQUE COMMENT '反馈ID',
    `type`        VARCHAR(20)  NOT NULL COMMENT '反馈类型:bug(功能异常),experience(体验问题),suggestion(产品建议),complaint(服务投诉),other(其他问题)',
    `content`     VARCHAR(500) NOT NULL COMMENT '反馈内容',
    `contact`     VARCHAR(50) COMMENT '联系方式',
    `create_time` DATETIME     NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户意见反馈表';

-- 客服表
CREATE TABLE `customer`
(
    `customer_id`              INT      NOT NULL UNIQUE COMMENT '协议id',
    `wechat_number`            VARCHAR(200) COMMENT '微信号',
    `wechat_image`             VARCHAR(200) COMMENT '微信二维码',
    `official_account_image`             VARCHAR(200) COMMENT '微信公众号二维码',
    `service_hours`            VARCHAR(200) COMMENT '服务时间',
    `customer_service_hotline` VARCHAR(100) COMMENT '客服热线',
    `email`                    VARCHAR(100) COMMENT '邮箱',
    `company_name`             VARCHAR(200) COMMENT '公司名称',
    `company_address`          VARCHAR(200) COMMENT '公司地址',
    `company_profile`          VARCHAR(200) COMMENT '公司简介',
    `invoicing_contact`        VARCHAR(100) COMMENT '开票联系人',
    `create_time`              DATETIME NOT NULL COMMENT '创建时间',
    `update_time`              DATETIME NOT NULL COMMENT '修改时间'
) COMMENT='客服表';


-- 客服表
INSERT INTO `customer` (`customer_id`, `create_time`, `update_time`)
VALUES (1, NOW(), NOW());


-- 在create.sql中添加系统公告的测试数据
INSERT INTO `notice` (`notice_id`, `title`, `content`, `type`, `is_delete`, `create_time`, `update_time`)
VALUES ('notice_001', '神州邮小程序v2.0版本更新公告',
        '尊敬的用户：\n\n神州邮小程序v2.0版本将于2024年1月25日正式发布，本次更新包含以下内容：\n\n1. 全新的界面设计\n2. 优化寄件流程\n3. 新增快递公司\n4. 修复已知问题\n\n感谢您的支持！',
        0, 0, '2024-01-20 10:00:00', '2024-01-20 10:00:00'),

       ('notice_002', '新增快递公司：极兔快递',
        '尊敬的用户：\n\n我们很高兴地通知您，神州邮平台已新增极兔快递服务。现在您可以在寄件时选择极兔快递，享受更多优质的快递服务。\n\n极兔快递简介：\n- 全国范围覆盖\n- 快速配送\n- 优惠价格\n\n欢迎体验！',
        1, 0, '2024-01-18 14:30:00', '2024-01-18 14:30:00'),

       ('notice_003', '关于春节期间快递配送安排的通知',
        '尊敬的用户：\n\n春节临近，为保证您的快递服务质量，现将春节期间的配送安排通知如下：\n\n1. 正常收件截止时间：2024年2月8日\n2. 春节期间（2月9日-2月17日）暂停收件\n3. 2月18日起恢复正常服务\n\n请您合理安排寄件时间。祝您新春快乐！',
        2, 0, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),

       ('notice_004', '系统维护通知',
        '尊敬的用户：\n\n为了给您提供更好的服务，我们计划于2024年1月14日24:00-次日02:00进行系统维护升级。维护期间将暂停服务，请您提前安排寄件事宜。\n\n给您带来的不便敬请谅解！',
        3, 0, '2024-01-14 16:00:00', '2024-01-14 16:00:00'),

       ('notice_005', '关于优化月结用户审核流程的通知',
        '尊敬的用户：\n\n为提升服务质量，我们优化了月结用户的审核流程。主要变更如下：\n\n1. 缩短审核时间\n2. 简化申请材料\n3. 增加在线咨询服务\n\n新的审核流程将于2024年2月1日起实施。',
        2, 0, '2024-01-12 11:00:00', '2024-01-12 11:00:00'),

       ('notice_006', '寄件优惠活动公告',
        '尊敬的用户：\n\n即日起至2024年1月31日，神州邮平台开展寄件优惠活动：\n\n1. 新用户首单立减10元\n2. 老用户下单满50元减5元\n3. 月结用户额外享受95折优惠\n\n活动详情请见活动页面，欢迎参与！',
        2, 0, '2024-01-10 15:30:00', '2024-01-10 15:30:00'),

       ('notice_007', '关于提升快递安全的重要通知',
        '尊敬的用户：\n\n为保障快递安全，请注意以下事项：\n\n1. 贵重物品建议购买保价\n2. 易碎品请做好包装\n3. 寄递违禁品将承担法律责任\n\n感谢您的配合！',
        2, 0, '2024-01-08 10:00:00', '2024-01-08 10:00:00'),

       ('notice_008', '小程序v1.9.5版本更新说明',
        '更新内容：\n\n1. 修复订单状态显示异常\n2. 优化搜索功能\n3. 提升页面加载速度\n4. 新增用户反馈入口\n\n请及时更新到最新版本。',
        0, 0, '2024-01-05 14:00:00', '2024-01-05 14:00:00');

-- 用户表已经有一个管理员了，添加一些普通用户
INSERT INTO `user` (`user_id`, `user_name`, `password`, `phone`, `identification`, `identity`, `is_real`, `open_id`,
                    `my_code`, `be_invited`, `create_time`, `update_time`)
VALUES ('user_001', '张三', '7E236424AD2FB23DFFC92427CEC12FAB', '13811111111', '110101199001011234', 1, 2, 'wx_001',
        'USER001', NULL, NOW(), NOW()),
       ('user_002', '李四', '7E236424AD2FB23DFFC92427CEC12FAB', '13822222222', '110101199001021234', 1, 2, 'wx_002',
        'USER002', 'USER001', NOW(), NOW()),
       ('user_003', '王五', '7E236424AD2FB23DFFC92427CEC12FAB', '13833333333', '110101199001031234', 1, 1, 'wx_003',
        'USER003', 'USER001', NOW(), NOW());

-- 地址表
INSERT INTO `user_address` (`address_id`, `user_id`, `contact_name`, `contact_phone`, `province`, `city`, `district`,
                            `detail_address`, `type`, `is_default`, `create_time`, `update_time`)
VALUES ('addr_001', 'user_001', '张三', '13811111111', '北京市', '北京市', '朝阳区', '三里屯SOHO', 0, 1, NOW(), NOW()),
       ('addr_002', 'user_001', '张三家', '13811111111', '北京市', '北京市', '海淀区', '中关村科技园', 1, 1, NOW(),
        NOW()),
       ('addr_003', 'user_002', '李四', '13822222222', '上海市', '上海市', '浦东新区', '陆家嘴', 0, 1, NOW(), NOW());

-- 发票抬头表
INSERT INTO `invoice_title` (`title_id`, `user_id`, `companies_name`, `tax_number`, `company_address`,
                             `citycompany_tel`, `bank_account`, `bank_name`, `type`, `is_default`, `create_time`,
                             `update_time`)
VALUES ('title_001', 'user_001', '北京科技有限公司', '91110105MA12345678', '北京市朝阳区', '010-88888888',
        '6222222222222222', '中国银行', 0, 1, NOW(), NOW()),
       ('title_002', 'user_002', '李四', NULL, NULL, NULL, NULL, NULL, 1, 1, NOW(), NOW());

-- 用户佣金金额流动表
INSERT INTO `commission_flow` (`flow_id`, `user_id`, `order_id`, `amount`, `balance`, `flow_type`, `create_time`,
                               `update_time`)
VALUES ('comm_001', 'user_001', 'order_001', 10.00, 10.00, 0, NOW(), NOW()),
       ('comm_002', 'user_001', 'order_002', -5.00, 5.00, 1, NOW(), NOW()),
       ('comm_003', 'user_002', 'order_003', 15.00, 15.00, 0, NOW(), NOW());

-- 寄件类型表
INSERT INTO `express_type` (`type_id`, `type_name`, `create_time`, `update_time`)
VALUES ('type_001', '文件', NOW(), NOW()),
       ('type_002', '服装', NOW(), NOW()),
       ('type_003', '电子产品', NOW(), NOW()),
       ('type_004', '食品', NOW(), NOW());

-- 快递订单表
INSERT INTO `order` (`order_id`, `user_id`, `sender_name`, `sender_phone`, `sender_province`, `sender_city`,
                     `sender_district`, `sender_detail_address`,
                     `receiver_name`, `receiver_phone`, `receiver_province`, `receiver_city`, `receiver_district`,
                     `receiver_detail_address`,
                     `express_code`, `type_id`, `estimated_item_weight`, `payment_method`, `order_total_price`,
                     `shipping_status`, `order_status`, `create_time`, `update_time`)
VALUES ('order_001', 'user_001', '张三', '13811111111', '北京市', '北京市', '朝阳区', '三里屯SOHO',
        '李四', '13822222222', '上海市', '上海市', '浦东新区', '陆家嘴',
        'SF', 'type_001', 1.00, 0, 50.00, 0, 0, NOW(), NOW()),
       ('order_002', 'user_002', '李四', '13822222222', '上海市', '上海市', '浦东新区', '陆家嘴',
        '王五', '13833333333', '广州市', '广州市', '天河区', '珠江新城',
        'YTO', 'type_002', 2.00, 1, 30.00, 1, 1, NOW(), NOW());

-- 支付流水表
INSERT INTO `payment_flow` (`flow_id`, `user_id`, `order_id`, `merchant_order_id`, `openid`, `transaction_id`, `amount`,
                            `create_time`, `update_time`)
VALUES ('pay_001', 'user_001', 'order_001', 'M001', 'wx_001', 'T001', 50.00, NOW(), NOW()),
       ('pay_002', 'user_002', 'order_002', 'M002', 'wx_002', 'T002', 30.00, NOW(), NOW());


-- 协议表
INSERT INTO `agreement` (`agreement_id`, `context`, `agreement_type`, `create_time`, `update_time`)
VALUES ('agreement_001', '# 隐私协议\n\n本协议是用户与神州速递平台之间的协议...', 0, NOW(), NOW()),
       ('agreement_002', '# 快递协议\n\n感谢您选择神州速递，本协议包含以下内容...', 1, NOW(), NOW()),
       ('agreement_003', '# 违禁品说明\n\n以下物品属于禁止寄递范围...', 2, NOW(), NOW()),
       ('agreement_004', '# 用户协议\n\n欢迎使用神州速递服务...', 3, NOW(), NOW());

-- 帮助中心问题表的假数据
INSERT INTO `question` (`question_id`, `question`, `reply`, `create_time`, `update_time`)
VALUES ('question_001', '如何注册成为神州邮用户？',
        '您可以通过以下步骤注册成为神州邮用户：\n1. 打开神州邮小程序\n2. 点击右下角"我的"\n3. 点击"登录/注册"\n4. 输入手机号并获取验证码\n5. 填写基本信息完成注册',
        NOW(), NOW()),
       ('question_002', '寄件时如何选择合适的快递公司？',
        '选择快递公司时，您可以考虑以下因素：\n1. 配送时效：不同快递公司的配送时间有差异\n2. 配送范围：部分快递公司在某些地区可能没有覆盖\n3. 物品类型：不同快递公司对特殊物品的处理能力不同\n4. 价格：各家快递公司价格存在差异\n\n您可以在下单页面查看各快递公司的预估送达时间和价格进行比较选择。',
        NOW(), NOW()),
       ('question_003', '如何查询我的快递订单状态？',
        '查询订单状态的方法：\n1. 打开神州邮小程序\n2. 点击底部"订单"\n3. 找到您要查询的订单\n4. 点击订单即可查看详细物流信息\n\n您也可以通过订单列表右上角的搜索框，输入订单号或收件人姓名快速查找订单。',
        NOW(), NOW()),
       ('question_004', '如何申请快递费用发票？',
        '申请发票的步骤：\n1. 打开神州邮小程序\n2. 进入"我的"-"发票管理"\n3. 点击"申请发票"\n4. 选择需要开具发票的订单\n5. 选择或添加发票抬头\n6. 填写发票接收邮箱\n7. 提交申请\n\n发票将在1-3个工作日内开具并发送至您的邮箱。',
        NOW(), NOW()),
       ('question_005', '快递丢失或损坏如何理赔？',
        '如遇快递丢失或损坏，请按以下步骤申请理赔：\n1. 打开神州邮小程序\n2. 进入"订单详情"页面\n3. 点击"申请理赔"\n4. 上传物品损坏照片或其他证明材料\n5. 填写理赔申请信息\n6. 提交申请\n\n客服人员将在24小时内与您联系处理理赔事宜。建议寄送贵重物品时购买保价服务，以便获得更高赔付。',
        NOW(), NOW()),
       ('question_006', '什么是佣金抵扣功能？',
        '佣金抵扣是神州邮为用户提供的优惠功能。当您成功邀请新用户注册并完成首单，您将获得佣金奖励。这些佣金可在您后续下单时用于抵扣快递费用。\n\n使用步骤：\n1. 下单页面结算时，系统会自动显示可用佣金\n2. 选择"使用佣金抵扣"\n3. 确认支付剩余金额\n\n您可以在"我的"-"我的佣金"中查看佣金明细和使用记录。',
        NOW(), NOW()),
       ('question_007', '如何成为月结用户？',
        '成为月结用户的申请流程：\n1. 进入"我的"-"月结申请"\n2. 填写申请表单，包括企业信息、联系人信息等\n3. 上传相关证件（如营业执照、身份证等）\n4. 提交申请\n\n我们将在3-5个工作日内完成审核，审核通过后您将收到短信通知，并可设置月结账号密码。成为月结用户后，您可以先寄件，按月结算费用。',
        NOW(), NOW()),
       ('question_008', '如何修改我的收货地址？',
        '修改收货地址的方法：\n1. 打开神州邮小程序\n2. 进入"我的"-"地址管理"\n3. 找到需要修改的地址\n4. 点击编辑图标\n5. 修改相关信息\n6. 点击保存\n\n您也可以在下单页面选择收货地址时，点击"新增地址"来添加新的收货地址。',
        NOW(), NOW()),
       ('question_009', '为什么我的实名认证未通过？',
        '实名认证未通过的常见原因：\n1. 上传的证件照片不清晰或不完整\n2. 填写的信息与证件信息不一致\n3. 证件已过期\n4. 上传的照片中包含遮挡或反光\n\n建议您检查以上问题，修正后重新提交实名认证。如多次认证仍未通过，请联系客服获取帮助。',
        NOW(), NOW()),
       ('question_010', '如何联系客服？',
        '联系客服的方式：\n1. 小程序内点击"我的"-"联系客服"\n2. 拨打客服热线：400-888-8888（工作时间：周一至周日 8:00-22:00）\n3. 发送邮件至：service@shenzhoupost.com\n\n我们的客服团队将竭诚为您服务，解决您在使用过程中遇到的问题。',
        NOW(), NOW());


-- 用户意见反馈表的假数据
INSERT INTO `feedback` (`feedback_id`, `type`, `content`, `contact`, `create_time`)
VALUES ('feedback_001', 'bug', '寄件页面在选择快递公司后偶尔会闪退', '13811111111', NOW()),
       ('feedback_002', 'experience', '小程序加载速度有点慢，希望能优化一下', '13822222222', NOW()),
       ('feedback_003', 'suggestion', '建议增加批量寄件功能，方便企业用户', 'zhangsan@test.com', NOW()),
       ('feedback_004', 'complaint', '快递员态度不好，订单号：order_001', '13833333333', NOW()),
       ('feedback_006', 'suggestion', '希望能增加更多优惠券活动', '13844444444', NOW()),
       ('feedback_007', 'bug', '月结用户界面显示异常，无法查看历史账单', 'lisi@test.com', NOW()),
       ('feedback_008', 'experience', '地址选择器不太方便，建议优化交互体验', '13855555555', NOW()),
       ('feedback_009', 'other', '如何申请成为神州邮的合作伙伴？', '13866666666', NOW()),
       ('feedback_010', 'complaint', '订单被延误，但没有收到任何通知', '13877777777', NOW()),
       ('feedback_011', 'suggestion', '建议在首页展示常用寄件地址，提高效率', 'wangwu@test.com', NOW());
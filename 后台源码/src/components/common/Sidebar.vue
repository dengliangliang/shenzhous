<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <!-- --- -->
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item
                                >
                            </el-submenu>
                            <!-- --- -->
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{
                                    subItem.title
                                }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';

export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                	icon: 'el-icon-user',
                	index: 'userManage',
                	title: '用户管理',
                	subs: [{
                			icon: 'el-icon-user-solid',
                			index: 'ordinaryUserManage',
                			title: '普通用户'
                		},
                		{
                			icon: 'el-icon-s-custom',
                			index: 'adminUserManage',
                			title: '管理员用户'
                		}
                	]
                },
				{
				    icon: 'el-icon-money',
				    index: 'commissionFlowManage',
				    title: '佣金流水管理'
				},
                // {
                //     icon: 'el-icon-wallet',
                //     index: 'paymentFlowManage',
                //     title: '支付流水管理'
                // },
				{
				    icon: 'el-icon-s-order',
				    index: 'orderManage',
				    title: '快递订单管理',
				    subs: [
				        {
				            icon: 'el-icon-s-order',
				            index: 'orderManage',
				            title: '订单列表'
				        },
				        {
				            icon: 'el-icon-document',
				            index: 'orderInvoiceRequestManage',
				            title: '发票申请管理'
				        }
				    ]
				},
                {
                    icon: 'el-icon-s-finance',
                    index: 'monthlySettlement',
                    title: '用户月结管理',
                    subs: [
                        {
                            icon: 'el-icon-s-order',
                            index: 'monthlySettlementApplyManage',
                            title: '月结申请管理'
                        },
                        {
                            icon: 'el-icon-s-check',
                            index: 'monthlySettlementEligibilityManage',
                            title: '月结资格管理'
                        },
                        {
                            icon: 'el-icon-document',
                            index: 'monthlyStatementManage',
                            title: '月结账单管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-box',
                    index: 'expressTypeManage',
                    title: '寄件类型管理'
                },
                {
                    icon: 'el-icon-truck',
                    index: 'expressManage',
                    title: '快递公司管理'
                },
                
                
				{
				    icon: 'el-icon-bell',
				    index: 'NoticeManage',
				    title: '平台公告管理'
				},
				{
				    icon: 'el-icon-document',
				    index: 'agreementManage',
				    title: '平台协议管理'
				},
                {
                  icon: 'el-icon-message',          // 消息/反馈图标（最适合）
                  index: 'Feedback',
                  title: '问题反馈管理'
                },
				{
				  icon: 'el-icon-question',         // 简洁直接
				  index: 'Question',
				  title: '常见问题管理'
				},
				{
				  icon: 'el-icon-picture-outline',         // 简洁直接
				  index: 'BackgroundPhoto',
				  title: '背景图片管理'
				},
				{
				  icon: 'el-icon-setting',         // 简洁直接
				  index: 'Customer',
				  title: '系统信息配置'
				},
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}
</style>

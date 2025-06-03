import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                	path: '/adminUserManage',
                	component: () => import( /* webpackChunkName: "table" */
                		'@/view/User/AdminUser/AdminUserManage.vue'),
                	meta: {
                		title: '管理员用户管理'
                	}
                },
                {
                	path: '/ordinaryUserManage',
                	component: () => import( /* webpackChunkName: "table" */
                		'@/view/User/OrdinaryUser/NormalUserManage.vue'),
                	meta: {
                		title: '普通用户管理'
                	}
                },
				{
					path: '/commissionFlowManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/CommissionFlow/CommissionFlowManage.vue'),
					meta: {
						title: '用户佣金流水管理'
					}
				},
				{
					path: '/monthlySettlementApplyManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/MonthlySettlementApply/MonthlySettlementApplyManage.vue'),
					meta: {
						title: '用户月结资格申请管理'
					}
				},
				{
					path: '/monthlySettlementEligibilityManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/MonthlySettlementEligibility/MonthlySettlementEligibilityManage.vue'),
					meta: {
						title: '月结资格管理'
					}
				},
				{
					path: '/monthlyStatementManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/MonthlyStatement/MonthlyStatementManage.vue'),
					meta: {
						title: '月结账单管理'
					}
				},
				{
					path: '/expressTypeManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/ExpressType/ExpressTypeManage.vue'),
					meta: {
						title: '快递类型管理'
					}
				},
				{
					path: '/orderManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Order/OrderManage.vue'),
					meta: {
						title: '快递订单管理'
					}
				},
				{
					path: '/paymentFlowManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/PaymentFlow/PaymentFlowManage.vue'),
					meta: {
						title: '支付流水管理'
					}
				},
				{
					path: '/ExpressManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Express/ExpressManage.vue'),
					meta: {
						title: '快递公司管理'
					}
				},
				{
					path: '/AgreementManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Agreement/AgreementManage.vue'),
					meta: {
						title: '协议管理'
					}
				},
				{
					path: '/OrderInvoiceRequestManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/OrderInvoiceRequest/OrderInvoiceRequestManage.vue'),
					meta: {
						title: '订单发票申请管理'
					}
				},
				{
					path: '/NoticeManage',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Notice/NoticeManage.vue'),
					meta: {
						title: '通知公告管理'
					}
				},
				{
					path: '/Feedback',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Feedback/Feedback.vue'),
					meta: {
						title: '反馈问题管理'
					}
				},
				{
					path: '/Question',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Question/Question.vue'),
					meta: {
						title: '常见问题管理'
					}
				},
				{
					path: '/BackgroundPhoto',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/BackgroundPhoto/BackgroundPhoto.vue'),
					meta: {
						title: '主页背景图片管理'
					}
				},
				{
					path: '/Customer',
					component: () => import( /* webpackChunkName: "table" */
						'@/view/Customer/Customer.vue'),
					meta: {
						title: '在线客服配置'
					}
				},
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

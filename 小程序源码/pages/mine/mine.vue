<template>
	<view class="mine-container">
		<!-- 顶部用户信息卡片 -->
		<view class="user-card animate__animated animate__fadeIn">
			<!-- 背景装饰 -->
			<view class="bg-decoration left"></view>
			<view class="bg-decoration right"></view>

			<view class="user-info" @click="goProfile" v-if="isLogin">
				<view class="left-area">
					<image class="avatar" :src="userPhoto" mode="aspectFill"></image>
					<view class="avatar-border"></view>
				</view>
				<view class="info">
					<view class="user-name">
						<text class="nickname">{{userInfo.userName || '未设置昵称'}}</text>
						<view class="auth-tag" v-if="userInfo.isAuth">
							<text class="auth-icon">✓</text>
							<text>已认证</text>
						</view>
					</view>
					<view class="user-info-row">
						<text class="label">手机号:</text>
						<text class="value">{{userInfo.phone || '未绑定'}}</text>
					</view>
				</view>
				<view class="right-area">
					<text class="right-arrow">></text>
				</view>
			</view>
			<view class="no-login" v-else @click="goLogin">
				<view class="left-area">
					<image class="avatar" src="/static/img/default-avatar.png" mode="aspectFill"></image>
				</view>
				<view class="info">
					<text class="login-tip">登录/注册</text>
				</view>
				<view class="right-area">
					<text class="right-arrow">></text>
				</view>
			</view>
		</view>

		<!-- 功能区域 -->
		<view class="function-area">
			<!-- 横幅区域 -->
			<view class="tip-card animate__animated animate__fadeInUp" style="animation-delay: 0.5s">
				<view class="tip-card-content">
					<text class="tip-icon">i</text>
					<text class="tip-text">温馨提示：请确保您的信息已更新，以便我们为您提供更好的服务。</text>
				</view>
			</view>
			<!-- 订单管理 -->
			<view class="section animate__animated animate__fadeInUp" style="animation-delay: 0.1s">
				<view class="section-bg"></view>
				<view class="section-header">
					<text class="title">我的订单</text>
				</view>
				<view class="order-types">
					<view class="type-item" v-for="(item, index) in orderTypes" :key="index"
						@click="goOrder(item.status)">
						<image :src="item.icon" class="order-icon"></image>
						<text>{{item.name}}</text>
						<text class="badge" v-if="item.count">{{item.count}}</text>
					</view>
					<view class="divider"></view>
					<view class="type-item" @click="goOrder()">
						<image src="/static/icon/all-orders.png" class="order-icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 常用功能 -->
			<view class="section animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
				<view class="section-bg"></view>
				<view class="section-header">
					<text class="title">常用功能</text>
				</view>
				<view class="grid-list">
					<view class="grid-item" v-for="(item, index) in commonFunctions" :key="index"
						@click="handleFunction(item)">
						<image :src="item.icon" class="function-icon"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>


		</view>


		<!-- 系统功能区域 -->
		<view class="system-functions animate__animated animate__fadeInUp" style="animation-delay: 0.8s">
			<view class="function-row">
				<view class="function-btn" @click="handleSystemFunction('feedback')">
					<uni-icons type="chat" size="24" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<view class="function-btn" @click="handleSystemFunction('help')">
					<uni-icons type="help" size="24" color="#666"></uni-icons>
					<text>帮助中心</text>
				</view>
				<view class="function-btn" @click="handleSystemFunction('settings')">
					<uni-icons type="gear" size="24" color="#666"></uni-icons>
					<text>系统设置</text>
				</view>
				<view class="function-btn" @click="handleSystemFunction('service')">
					<uni-icons type="staff" size="24" color="#666"></uni-icons>
					<text>在线客服</text>
				</view>
				<view class="function-btn" @click="handleSystemFunction('share')">
					<uni-icons type="notification" size="24" color="#666"></uni-icons>
					<text>关注公众号</text>
				</view>
			</view>
		</view>

		<!-- 退出登录按钮 -->
		<button class="logout-btn animate__animated animate__fadeInUp" style="animation-delay: 0.4s"
			@click="handleLogout" v-if="isLogin">
			<uni-icons type="closeempty" size="20" color="#ff4d4f"></uni-icons>
			<text>退出登录</text>
		</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		onShow() {
			// 检查登录状态
			this.checkLogin()
		},

		data() {
			return {
				orderTypes: [
					{
						name: '待取件',
						icon: '/static/icon/waiting-pickup.png',
						status: 1,
						count: 0
					},
					{
						name: '运输中',
						icon: '/static/icon/in-transit.png',
						status: 2,
						count: 0
					},
					{
						name: '已送达',
						icon: '/static/icon/delivered.png',
						status: 3,
						count: 0
					}
				],
				commonFunctions: [{
						name: '地址管理',
						icon: '/static/icon/address-management.png',
						type: 'address'
					},
					{
						name: '发票抬头',
						icon: '/static/icon/invoice-title.png',
						type: 'invoice-title'
					},
					{
						name: '实名认证',
						icon: '/static/icon/authentication.png',
						type: 'auth'
					},
					{
						name: '月结资格',
						icon: '/static/icon/monthly-application.png',
						type: 'monthly'
					},
					{
						name: '电子发票',
						icon: '/static/icon/e-invoice.png',
						type: 'invoice'
					},
					{
						name: '佣金流动',
						icon: '/static/icon/commission-flow.png',
						type: 'commission'
					},
					{
						name: '邮政查询',
						icon: '/static/icon/postal-query.png',
						type: 'postal'
					},
					{
						name: '邀请好友',
						icon: '/static/icon/monthly-bill.png',
						type: 'agent',
						path: '/views/agent/invite'
					},
				],
				promo: '/static/img/promo.png',
				userPhoto: '/static/logo.png'
			}

		},

		computed: {
			...mapState('user', ['userInfo']),
			isLogin() {
				return !!this.userInfo && !!this.userInfo.userId
			}
		},

		methods: {
			// 检查登录状态
			checkLogin() {
				const userInfo = this.$store.getters['user/getUserInfo']
				if (!userInfo || !userInfo.userId) {
					return
				}
			},

			// 检查登录并提示
			checkLoginWithTip() {
				const userInfo = this.$store.getters['user/getUserInfo']
				if (!userInfo || !userInfo.userId) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return false
				}
				return true
			},

			// 去登录
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			// 去个人资料
			goProfile() {
				if (!this.checkLoginWithTip()) return
				uni.navigateTo({
					url: '/views/editProfile/editProfile'
				})
			},

			// 去订单列表
			goOrder(status) {
			  if (!this.checkLoginWithTip()) return
			  
			  if (status !== undefined) {
			    // 方式1：使用全局变量
			    getApp().globalData.orderStatus = status
			    
			    // 方式2：使用uni-app的vuex（需先配置store）
			    // this.$store.commit('setOrderStatus', status)
			    
			    // 方式3：使用本地缓存（不推荐，可能有延迟）
			    // uni.setStorageSync('orderStatus', status)
			  }
			  
			  // 统一使用switchTab跳转
			  uni.switchTab({
			    url: '/pages/order/order'
			  })
			},

			// 处理常用功能
			handleFunction(item) {
				if (!this.checkLoginWithTip()) return

				switch (item.type) {
					case 'address':
						uni.navigateTo({
							url: '/views/address/address'
						})
						break

					case 'auth':
						uni.navigateTo({
							url: '/views/auth/auth'
						})
						break

					case 'invoice':
						uni.navigateTo({
							url: '/views/invoice/invoice'
						})
						break

					case 'monthly':
						uni.navigateTo({
							url: '/views/monthly/monthly'
						})
						break

					case 'postal':
						uni.navigateTo({
							url: '/views/postal/query'
						})
						break

					case 'commission':
						uni.navigateTo({
							url: '/views/commissionFlow/commissionFlow'
						})
						break

					case 'invoice-title':
						uni.navigateTo({
							url: '/views/invoiceTile/invoiceTile'
						})
						break

					case 'agent':
						uni.navigateTo({
							url: item.path
						})
						break

					default:
						uni.showToast({
							title: '功能开发中',
							icon: 'none'
						})
				}
			},

			// 退出登录
			handleLogout() {
				if (!this.isLogin) return
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: async (res) => {
						if (res.confirm) {
							try {
								await this.$store.commit('user/clearUserInfo')
								uni.showToast({
									title: '退出成功',
									icon: 'success'
								})
							} catch (e) {
								uni.showToast({
									title: '退出失败',
									icon: 'none'
								})
							}
						}
					}
				})
			},

			// 处理系统功能按钮点击
			handleSystemFunction(type) {
				if (!this.checkLoginWithTip()) return

				switch (type) {
					case 'feedback':
						uni.navigateTo({
							url: '/views/feedback/feedback'
						})
						break

					case 'help':
						uni.navigateTo({
							url: '/views/help/help'
						})
						break

					case 'settings':
						uni.navigateTo({
							url: '/views/settings/settings'
						})
						break

					case 'service':
						// 跳转到客服页面，显示微信二维码
						uni.navigateTo({
							url: '/views/service/service'
						});
						break

					case 'share':
						// 直接跳转到分享页面
						uni.navigateTo({
							url: '/views/share/share'
						});
						break

					default:
						uni.showToast({
							title: '功能开发中',
							icon: 'none'
						})
				}
			},


		}
	}
</script>

<style lang="scss">
	.mine-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f6f7f9, #fff);
		padding-bottom: 40rpx;

		.user-card {
			position: relative;
			background: linear-gradient(135deg, #FF6B01, #FF8F1F);
			padding: 40rpx 30rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			box-shadow: 0 8rpx 32rpx -4rpx rgba(255, 107, 1, 0.3);
			border-radius: 0 0 30rpx 30rpx;

			.bg-decoration.left {
				position: absolute;
				top: -50%;
				left: -20%;
				width: 400rpx;
				height: 400rpx;
				background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
				border-radius: 50%;
				transform: rotate(-15deg);
				animation: float 6s ease-in-out infinite;
			}

			.bg-decoration.right {
				position: absolute;
				top: 20%;
				right: -30%;
				width: 300rpx;
				height: 300rpx;
				background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
				border-radius: 50%;
				transform: rotate(15deg);
				animation: float 8s ease-in-out infinite reverse;
			}

			.user-info,
			.no-login {
				position: relative;
				display: flex;
				align-items: center;

				.left-area {
					position: relative;
					margin-right: 40rpx;

					.avatar {
						width: 140rpx;
						height: 140rpx;
						// border-radius: 70rpx;
						// border: 6rpx solid rgba(255,255,255,0.8);
						box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
					}

					.avatar-border {
						position: absolute;
						top: -8rpx;
						left: -8rpx;
						right: -8rpx;
						bottom: -8rpx;
						// border: 2rpx solid rgba(255,255,255,0.3);
						// border-radius: 76rpx;
						animation: rotate 8s linear infinite;
					}
				}

				.info {
					flex: 1;

					.user-name {
						display: flex;
						align-items: center;
						margin-bottom: 16rpx;

						.nickname {
							font-size: 32rpx;
							color: #fff;
							font-weight: 500;
							margin-right: 12rpx;
						}

						.auth-tag {
							display: inline-flex;
							align-items: center;
							background: rgba(25, 190, 107, 0.3);
							backdrop-filter: blur(10px);
							border-radius: 24rpx;
							padding: 2rpx 12rpx;

							.auth-icon {
								margin-right: 4rpx;
								font-size: 20rpx;
								color: #fff;
							}

							text {
								font-size: 20rpx;
								color: #fff;
							}
						}
					}

					.user-info-row {
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;

						.label {
							font-size: 24rpx;
							color: rgba(255, 255, 255, 0.6);
							margin-right: 8rpx;
						}

						.value {
							font-size: 24rpx;
							color: rgba(255, 255, 255, 0.9);
						}
					}

					.login-tip {
						font-size: 32rpx;
						color: #fff;
						font-weight: 500;
					}
				}

				.right-area {
					margin-left: auto;
					padding-left: 20rpx;

					.right-arrow {
						font-size: 32rpx;
						color: rgba(255, 255, 255, 0.8);
					}
				}
			}
		}

		.function-area {
			.section {
				position: relative;
				background: linear-gradient(135deg, #f9f9f9, #fff);
				border-radius: 20rpx;
				margin: 20rpx;
				padding: 30rpx;
				box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
				transition: all 0.3s;
				overflow: hidden;

				.section-bg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: linear-gradient(135deg, rgba(255, 107, 1, 0.03), rgba(255, 143, 31, 0.03));
					opacity: 0;
					transition: opacity 0.3s;
				}

				&:active {
					transform: translateY(2rpx);

					.section-bg {
						opacity: 1;
					}
				}

				.section-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30rpx;

					.title {
						font-size: 32rpx;
						color: #333;
						font-weight: 500;
					}
				}

				.order-types {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;

					.type-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						transition: transform 0.3s;
						flex: 1;

						&:active {
							transform: scale(0.95);
						}

						.order-icon {
							width: 60rpx;
							height: 60rpx;
							margin-bottom: 10rpx;
						}

						text {
							font-size: 24rpx;
							color: #666;
						}

						.badge {
							position: absolute;
							top: -10rpx;
							right: -10rpx;
							min-width: 32rpx;
							height: 32rpx;
							line-height: 32rpx;
							text-align: center;
							background: linear-gradient(90deg, #FF6B01, #FF8F1F);
							box-shadow: 0 2rpx 8rpx rgba(255, 107, 1, 0.3);
							border-radius: 16rpx;
							color: #fff;
							font-size: 20rpx;
							padding: 0 6rpx;
						}
					}

					.divider {
						width: 2rpx;
						height: 50rpx;
						background: #eee;
						margin: 0 10rpx;
					}
				}

				.grid-list {
					position: relative;
					z-index: 2;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 20rpx;
					padding: 20rpx;

					.grid-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 20rpx;
						background: #fff;
						border-radius: 12rpx;
						transition: all 0.3s;

						&:active {
							transform: scale(0.95);
							background: #f8f8f8;
						}

						.function-icon {
							width: 60rpx;
							height: 60rpx;
							margin-bottom: 10rpx;
						}

						text {
							font-size: 24rpx;
							color: #333;
							text-align: center;
						}
					}
				}
			}
		}

		.tip-card {
			background: #fff;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			display: flex;
			align-items: center;

			.tip-card-content {
				display: flex;
				align-items: center;
			}

			.tip-icon {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				color: #FF6B01;
				font-style: italic;
				font-size: 30rpx;
				font-weight: bold;
			}

			.tip-text {
				margin-left: 10rpx;
				font-size: 24rpx;
				color: #666;
			}
		}

		.promo-card {
			background: #fff;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			display: flex;
			align-items: center;

			.promo-card-content {
				display: flex;
				align-items: center;
			}

			.promo-image {
				width: 100rpx;
				height: auto;
				margin-right: 10rpx;
			}

			.promo-text {
				display: flex;
				flex-direction: column;

				.promo-title {
					font-size: 28rpx;
					font-weight: bold;
					color: #FF6B01;
					margin-bottom: 4rpx;
				}

				.promo-description {
					font-size: 24rpx;
					color: #666;
				}
			}
		}

		.system-functions {
			background: #fff;
			margin: 20rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			display: flex;
			align-items: center;

			.function-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}

			.function-btn {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 10rpx;
				transition: all 0.3s;

				&:active {
					transform: scale(0.95);
				}

				text {
					font-size: 24rpx;
					color: #666;
					margin-top: 8rpx;
				}
			}
		}

		.logout-btn {
			width: 90%;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			background: #fff;
			border-radius: 45rpx;
			margin: 60rpx auto;
			color: #ff4d4f;
			font-size: 32rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			transition: all 0.3s;

			text {
				margin-left: 10rpx;
			}

			&:active {
				transform: translateY(4rpx);
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
			}
		}
	}

	@keyframes float {

		0%,
		100% {
			transform: translateY(0) rotate(-15deg);
		}

		50% {
			transform: translateY(-20rpx) rotate(-15deg);
		}
	}

	@keyframes wave {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-1200rpx);
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
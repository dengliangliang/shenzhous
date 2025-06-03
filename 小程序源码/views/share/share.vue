<template>
	<view class="share-container">
		<view class="share-card">
			<view class="card-header">
				<image class="app-logo" src="/static/img/系统左侧长LOGO.png" mode="aspectFit"></image>
				<view class="app-info">
					<text class="app-slogan">您的专业快递服务平台</text>
				</view>
			</view>

			<view class="card-content">
				<view class="share-title">关注神州邮公众号</view>
				<view class="share-desc">获取更多优惠信息和寄件动态提醒</view>

				<view class="qrcode-box">
					<image v-if="customerInfo.officialAccountImage" class="qrcode" :src="photoBaseUrl+customerInfo.officialAccountImage" mode="aspectFill" show-menu-by-longpress></image>
					<!-- <text class="tip">长按保存，打开微信扫一扫</text>
					<view class="official-account">
						<text class="account-name">{{officialAccountName}}</text>
						<button class="copy-btn" @click="copyAccountName">复制</button>
					</view> -->
				</view>

				<view class="benefits">
					<view class="benefit-item">
						<uni-icons type="star-filled" size="18" color="#FF9500"></uni-icons>
						<text>快递行业干货分享，物流知识全掌握</text>
					</view>
					<view class="benefit-item">
						<uni-icons type="star-filled" size="18" color="#FF9500"></uni-icons>
						<text>包装技巧指南，让物品安全送达</text>
					</view>
					<view class="benefit-item">
						<uni-icons type="star-filled" size="18" color="#FF9500"></uni-icons>
						<text>快递政策解读，特殊物品寄送指南</text>
					</view>
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	import customerApi from '@/api/customer'
	import{photoBaseUrl} from '@/config/env'
	export default {
		data() {
			return {
				qrCodeUrl: '',
				officialAccountName: '神州邮快递服务平台',
				appInfo: {
					name: '神州邮',
					slogan: '您的专业快递服务平台'
				},
				customerInfo: {},
				photoBaseUrl:''
			}
		},

		onLoad() {
			this.photoBaseUrl = photoBaseUrl;
			this.getCustomerInfo()
		},

		// 定义小程序分享行为
		onShareAppMessage() {
			return {
				title: '关注神州邮公众号，获取更多寄件优惠',
				path: '/views/share/share',
				imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
				success: function() {
					uni.showToast({
						title: '分享成功',
						icon: 'success'
					})
				}
			}
		},

		methods: {
			// 获取公司信息
			async getCustomerInfo() {
				this.loading = true
				try {
					const res = await customerApi.getCustomer()
					if (res) {
						this.customerInfo = res
					} else {
						uni.showToast({
							title: '获取公司信息失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('获取公司信息错误:', error)
					uni.showToast({
						title: '获取公司信息失败',
						icon: 'none'
					})
				} finally {
					this.loading = false
				}
			},





			// 复制公众号名称
			copyAccountName() {
				uni.setClipboardData({
					data: this.officialAccountName,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					}
				});
			},

			// 打开微信
			openWechat() {
				// 尝试打开微信
				plus.runtime.openURL('weixin://', (err) => {
					if (err) {
						uni.showToast({
							title: '请安装微信后使用',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.share-container {
		padding: 30rpx;
		min-height: 100vh;
		background: #f8f8f8;
		display: flex;
		flex-direction: column;
	}

	.share-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 40rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

		.card-header {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #f0f0f0;

			.app-logo {
				width: 220rpx;
				height: 80rpx;
				margin-right: 20rpx;
			}

			.app-info {
				flex: 1;

				.app-slogan {
					font-size: 26rpx;
					color: #666;
				}
			}
		}

		.card-content {
			display: flex;
			flex-direction: column;
			align-items: center;

			.share-title {
				font-size: 40rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 16rpx;
				text-align: center;
			}

			.share-desc {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 40rpx;
				text-align: center;
			}

			.qrcode-box {
				display: flex;
				flex-direction: column;
				align-items: center;

				.qrcode {
					width: 300rpx;
					height: 300rpx;
					margin-bottom: 20rpx;
					border-radius: 15rpx;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
				}

				.tip {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 20rpx;
				}

				.official-account {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					.account-name {
						font-size: 30rpx;
						color: #333;
						font-weight: bold;
						margin-right: 16rpx;
					}

					.copy-btn {
						background: #f0f0f0;
						color: #666;
						font-size: 24rpx;
						padding: 4rpx 20rpx;
						border-radius: 30rpx;
						line-height: 1.5;
						margin: 0;
					}
				}
			}

			.benefits {
				width: 100%;
				margin-top: 30rpx;
				padding-top: 30rpx;
				border-top: 1px dashed #eee;

				.benefit-item {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					text {
						font-size: 28rpx;
						color: #666;
						margin-left: 16rpx;
					}
				}
			}
		}
	}

	.share-actions {
		margin-top: auto;
		margin-bottom: 30rpx;

		.share-btn {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 30rpx;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: 500;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

			.btn-inner {
				display: flex;
				align-items: center;
				justify-content: center;

				.btn-icon {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}

			&.wechat {
				background: #07C160;
				color: #fff;
			}

			&.poster {
				background: #FF6B01;
				color: #fff;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
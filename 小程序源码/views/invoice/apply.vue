<template>
	<view class="apply-invoice-container">
		<view class="header">
			<text class="title">申请发票</text>
		</view>

		<!-- 订单信息 -->
		<view class="order-info section">
			<view class="section-title">订单信息</view>
			<view class="info-item">
				<text class="label">订单号</text>
				<text class="value">{{orderInfo.orderNo || '-'}}</text>
			</view>
			<view class="info-item">
				<text class="label">运单号</text>
				<text class="value">{{orderInfo.deliveryId || '-'}}</text>
			</view>
			<view class="info-item">
				<text class="label">订单金额</text>
				<text class="value price">¥{{orderInfo.orderTotalPrice || '0.00'}}</text>
			</view>
			<view class="info-item">
				<text class="label">下单时间</text>
				<text class="value">{{formatDate(orderInfo.createTime) || '-'}}</text>
			</view>


			<!-- 寄件人信息 -->
			<view class="sub-section">
				<text class="sub-title">寄件人信息</text>
				<view class="info-item">
					<text class="label">姓名</text>
					<text class="value">{{orderInfo.senderName || '-'}}</text>
				</view>
				<view class="info-item">
					<text class="label">电话</text>
					<text class="value">{{orderInfo.senderPhone || '-'}}</text>
				</view>
				<view class="info-item">
					<text class="label">地址</text>
					<text class="value">{{formatSenderAddress(orderInfo) || '-'}}</text>
				</view>
			</view>

			<!-- 收件人信息 -->
			<view class="sub-section">
				<text class="sub-title">收件人信息</text>
				<view class="info-item">
					<text class="label">姓名</text>
					<text class="value">{{orderInfo.receiverName || '-'}}</text>
				</view>
				<view class="info-item">
					<text class="label">电话</text>
					<text class="value">{{orderInfo.receiverPhone || '-'}}</text>
				</view>
				<view class="info-item">
					<text class="label">地址</text>
					<text class="value">{{formatReceiverAddress(orderInfo) || '-'}}</text>
				</view>
			</view>
		</view>

		<!-- 发票类型 -->
		<view class="invoice-type section">
			<view class="section-title">发票类型</view>
			<view class="type-options">
				<view class="type-item" :class="{'active': invoiceType === 0}" @click="invoiceType = 0">
					<text>增值税电子普通发票</text>
				</view>
			</view>
		</view>

		<!-- 发票抬头 -->
		<view class="invoice-title section">
			<view class="section-title">发票抬头</view>
			<view class="title-options">
				<view class="title-item" :class="{'active': titleType === 0}" @click="titleType = 0">
					<text>企业单位</text>
				</view>
				<view class="title-item" :class="{'active': titleType === 1}" @click="titleType = 1">
					<text>个人/非企业单位</text>
				</view>
			</view>

			<!-- 企业单位表单 -->
			<view v-if="titleType === 0" class="company-form">
				<view class="form-item" @click="selectInvoiceTitle">
					<text class="label required">企业名称</text>
					<view class="input-wrapper">
						<text v-if="selectedTitle">{{selectedTitle.title}}</text>
						<text v-else class="placeholder">请选择或添加发票抬头</text>
						<text class="arrow">></text>
					</view>
				</view>

				<!-- 选择抬头后显示完整的企业信息 -->
				<view v-if="selectedTitle">
					<view class="form-item">
						<text class="label required">税号</text>
						<view class="input-wrapper">
							<text>{{selectedTitle.taxNumber || '-'}}</text>
						</view>
					</view>

					<view class="form-item">
						<text class="label">单位地址</text>
						<view class="input-wrapper">
							<text>{{selectedTitle.companyAddress || '-'}}</text>
						</view>
					</view>

					<view class="form-item">
						<text class="label">电话号码</text>
						<view class="input-wrapper">
							<text>{{selectedTitle.citycompanyTel || '-'}}</text>
						</view>
					</view>

					<view class="form-item">
						<text class="label">开户银行</text>
						<view class="input-wrapper">
							<text>{{selectedTitle.bankName || '-'}}</text>
						</view>
					</view>

					<view class="form-item">
						<text class="label">银行账户</text>
						<view class="input-wrapper">
							<text>{{selectedTitle.bankAccount || '-'}}</text>
						</view>
					</view>
				</view>

				<!-- 添加选择发票抬头的按钮 -->
				<view class="title-action-buttons" v-if="showSelectTitleButton && !selectedTitle">
					<view class="action-btn" @click="selectInvoiceTitle">
						<text>选择已有抬头</text>
					</view>
					<view class="action-btn" @click="goToAddTitle">
						<text>新增发票抬头</text>
					</view>
				</view>
			</view>

			<!-- 个人表单 -->
			<view v-if="titleType === 1" class="personal-form">
				<view class="form-item">
					<text class="label required">发票抬头</text>
					<view class="input-wrapper">
						<input type="text" v-model="personalTitle" placeholder="请输入个人/非企业单位名称" />
					</view>
				</view>
			</view>
		</view>

		<!-- 发票内容 -->
		<view class="invoice-content section">
			<view class="section-title">发票内容</view>
			<view class="content-options">
				<view class="content-item" :class="{'active': invoiceContent === '快递服务费'}"
					@click="invoiceContent = '快递服务费'">
					<text>快递服务费</text>
				</view>
			</view>
		</view>

		<!-- 收票人信息 -->
		<view class="receiver-info section">
			<view class="section-title">收票人信息</view>
			<!-- <view class="form-item">
				<text class="label required">邮箱地址</text>
				<view class="input-wrapper">
					<input type="text" v-model="email" placeholder="用于接收电子发票" />
				</view>
			</view> -->
			<view class="form-item">
				<text class="label required">手机号码</text>
				<view class="input-wrapper">
					<input type="number" v-model="phone" placeholder="用于接收发票开具通知" maxlength="11" />
				</view>
			</view>
		</view>

		<!-- 发票备注 -->
		<view class="invoice-remark section">
			<view class="section-title">发票备注 <text class="optional">(选填)</text></view>
			<view class="form-item">
				<textarea v-model="remark" placeholder="请输入备注信息，最多200字" maxlength="200"
					class="remark-textarea"></textarea>
				<text class="word-count">{{remark.length}}/200</text>
			</view>
		</view>

		<!-- 底部提交按钮 -->
		<view class="footer">
			<button class="submit-btn" @click="submitInvoice">提交申请</button>
		</view>
	</view>
</template>

<script>
	import orderApi from '@/api/order'
	import {
		mapGetters
	} from 'vuex'
	import invoiceApi from '@/api/invoice'

	export default {
		data() {
			return {
				orderId: '',
				orderInfo: {},
				invoiceType: 0, // 发票类型 0:增值税电子普通发票
				titleType: 0, // 抬头类型 0:企业 1:个人
				selectedTitle: null, // 选中的发票抬头
				personalTitle: '', // 个人抬头
				invoiceContent: '快递服务费', // 发票内容
				email: '',
				phone: '',
				remark: '',
				showSelectTitleButton: false, // 是否显示选择发票抬头按钮
				invoiceTitleList: [] // 用户的发票抬头列表
			}
		},

		computed: {
			...mapGetters('user', ['getUserInfo'])
		},

		onLoad(options) {
			if (options.orderId) {
				this.orderId = options.orderId

				// 如果传递了订单金额和订单号，直接使用，避免再次请求
				if (options.amount) {
					this.orderInfo.orderTotalPrice = options.amount
				}
				if (options.orderNo) {
					this.orderInfo.orderNo = options.orderNo
				} else {
					// 如果没有传递订单信息，调用API获取
					this.loadOrderInfo()
				}
			}

			// 检查是否有默认发票抬头信息
			if (options.hasDefaultTitle === '1' && options.titleId) {
				this.titleType = parseInt(options.titleType || '0')

				// 根据类型处理抬头信息
				if (this.titleType === 0) { // 企业抬头
					// 获取指定抬头信息
					this.loadInvoiceTitle(options.titleId)
				} else if (this.titleType === 1 && options.title) { // 个人抬头
					this.personalTitle = decodeURIComponent(options.title)
				}
			}
			// 如果没有默认抬头但需要显示选择器
			else if (options.showTitleSelector === '1') {
				// 默认显示选择抬头按钮
				this.showSelectTitleButton = true
			}

			// 预填用户邮箱
			if (options.email) {
				this.email = options.email
			}

			// 预填用户手机号
			if (this.getUserInfo && this.getUserInfo.phone) {
				this.phone = this.getUserInfo.phone
			}
		},

		methods: {
			// 加载订单信息
			async loadOrderInfo() {
				try {
					uni.showLoading({
						title: '加载中'
					})

					const res = await orderApi.getOrderById(this.orderId)

					if (res) {
						this.orderInfo = res

						// 确保使用orderTotalPrice字段
						if (res.totalAmount && !res.orderTotalPrice) {
							this.orderInfo.orderTotalPrice = res.totalAmount
						}
					}
				} catch (e) {
					console.error('加载订单失败:', e)
					uni.showToast({
						title: '加载订单失败',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			// 格式化日期
			formatDate(dateStr) {
				if (!dateStr) return '-'
				const date = new Date(dateStr)
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
			},

			// 格式化寄件人地址
			formatSenderAddress(order) {
				if (!order) return '-'

				const address = []
				if (order.senderProvince) address.push(order.senderProvince)
				if (order.senderCity) address.push(order.senderCity)
				if (order.senderDistrict) address.push(order.senderDistrict)
				if (order.senderDetailAddress) address.push(order.senderDetailAddress)

				return address.join(' ') || '-'
			},

			// 格式化收件人地址
			formatReceiverAddress(order) {
				if (!order) return '-'

				const address = []
				if (order.receiverProvince) address.push(order.receiverProvince)
				if (order.receiverCity) address.push(order.receiverCity)
				if (order.receiverDistrict) address.push(order.receiverDistrict)
				if (order.receiverDetailAddress) address.push(order.receiverDetailAddress)

				return address.join(' ') || '-'
			},

			// 获取订单状态文本
			getOrderStatusText(status) {
				const statusMap = {
					0: '待接单',
					1: '已接单',
					2: '已取件',
					3: '运送中',
					4: '已送达',
					5: '已完成',
					6: '已取消'
				}
				return statusMap[status] || '未知状态'
			},

			// 选择发票抬头
			async selectInvoiceTitle() {
				try {
					uni.showLoading({
						title: '加载发票抬头...'
					})

					// 获取用户的发票抬头列表
					const res = await invoiceApi.getInvoiceList({
						type: this.titleType,
						userId: this.getUserInfo.userId
					})

					uni.hideLoading()

					if (res && res.length > 0) {
						this.invoiceTitleList = res

						// 显示选择器
						this.showTitleSelector()
					} else {
						// 如果没有发票抬头，提示用户添加
						uni.showModal({
							title: '提示',
							content: `您暂无${this.titleType === 0 ? '企业' : '个人'}发票抬头，是否前往添加？`,
							success: (res) => {
								if (res.confirm) {
									this.goToAddTitle()
								}
							}
						})
					}
				} catch (e) {
					uni.hideLoading()
					console.error('获取发票抬头列表失败:', e)
					uni.showToast({
						title: '获取发票抬头失败',
						icon: 'none'
					})
				}
			},

			// 显示发票抬头选择器
			showTitleSelector() {
				const items = this.invoiceTitleList.map(item => ({
					text: item.companiesName,
					value: item.titleId,
					item: item // 保存整个item对象，以便后续使用
				}))

				if (items.length === 0) {
					uni.showToast({
						title: '暂无发票抬头',
						icon: 'none'
					})
					return
				}

				items.push({
					text: '添加新抬头',
					value: 'add_new'
				})

				uni.showActionSheet({
					itemList: items.map(item => item.text),
					success: async (res) => {
						const selected = items[res.tapIndex]

						if (selected.value === 'add_new') {
							// 前往添加页面
							this.goToAddTitle()
						} else {
							// 使用选中的发票抬头
							this.selectedTitle = {
								titleId: selected.item.titleId,
								title: selected.item.companiesName,
								taxNumber: selected.item.taxNumber,
								// 保存更多字段，以便提交时使用
								companyAddress: selected.item.companyAddress,
								citycompanyTel: selected.item.citycompanyTel,
								bankAccount: selected.item.bankAccount,
								bankName: selected.item.bankName
							}
						}
					}
				})
			},

			// 提交发票申请
			async submitInvoice() {
				// 表单验证
				if (this.titleType === 0 && !this.selectedTitle) {
					uni.showToast({
						title: '请选择发票抬头',
						icon: 'none'
					})
					return
				}

				if (this.titleType === 1 && !this.personalTitle) {
					uni.showToast({
						title: '请输入发票抬头',
						icon: 'none'
					})
					return
				}

				// if (!this.email) {
				// 	uni.showToast({
				// 		title: '请输入邮箱地址',
				// 		icon: 'none'
				// 	})
				// 	return
				// }

				// // 简单的邮箱格式验证
				// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				// if (!emailRegex.test(this.email)) {
				// 	uni.showToast({
				// 		title: '邮箱格式不正确',
				// 		icon: 'none'
				// 	})
				// 	return
				// }

				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				}

				// 简单的手机号格式验证
				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return
				}

				// 构建发票申请数据 - 与实体类字段对应
				const invoiceData = {
					orderId: this.orderId,
					userId: this.getUserInfo.userId,
					email: this.email,
					invoiceType: this.invoiceType,
					type: this.titleType,
					status: 0, // 初始状态为"开票中"
					// 根据类型添加不同的字段
					companiesName: this.titleType === 0 ? this.selectedTitle.title : this.personalTitle,
					// 企业相关字段
					taxNumber: this.titleType === 0 ? this.selectedTitle.taxNumber : '',
					companyAddress: this.titleType === 0 ? this.selectedTitle.companyAddress || '' : '',
					citycompanyTel: this.titleType === 0 ? this.selectedTitle.citycompanyTel || '' : '',
					bankAccount: this.titleType === 0 ? this.selectedTitle.bankAccount || '' : '',
					bankName: this.titleType === 0 ? this.selectedTitle.bankName || '' : '',
					// 备注信息 - 注意：需要确保后端实体类有对应的remark字段
					// 如果后端实体类没有remark字段，请修改后端添加该字段或将此信息映射到其他合适的字段
					remark: this.remark || ''
				}

				// 提示用户
				uni.showModal({
					title: '提示',
					content: '确认提交发票申请吗？',
					success: async (res) => {
						if (res.confirm) {
							try {
								uni.showLoading({
									title: '提交中...'
								})

								const result = await invoiceApi.addOrderInvoiceRequest(invoiceData)

								uni.hideLoading()

								if (result) {
									uni.showToast({
										title: '发票申请已提交',
										icon: 'success'
									})

									setTimeout(() => {
										uni.navigateBack()
									}, 1500)
								} else {
									uni.showToast({
										title: '提交失败: ' + (result?.message || '未知错误'),
										icon: 'none'
									})
								}
							} catch (e) {
								uni.hideLoading()
								console.error('发票申请提交失败:', e)
								uni.showToast({
									title: '提交失败，请重试',
									icon: 'none'
								})
							}
						}
					}
				})
			},

			// 加载指定的发票抬头
			async loadInvoiceTitle(titleId) {
				try {
					const res = await invoiceApi.getInvoiceById(titleId)
					if (res && res.data) {
						this.selectedTitle = {
							titleId: res.data.titleId,
							title: res.data.companiesName,
							taxNumber: res.data.taxNumber,
							// 保存更多字段，以便提交时使用
							companyAddress: res.data.companyAddress,
							citycompanyTel: res.data.citycompanyTel,
							bankAccount: res.data.bankAccount,
							bankName: res.data.bankName
						}
					}
				} catch (e) {
					console.error('获取发票抬头失败:', e)
				}
			},

			// 跳转到添加发票抬头页面
			goToAddTitle() {
				uni.navigateTo({
					url: '/views/invoiceTile/edit'
				})
			}
		}
	}
</script>

<style lang="scss">
	.apply-invoice-container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 120rpx;

		.header {
			background: linear-gradient(135deg, #FF6B01, #FF8F1F);
			padding: 30rpx;
			color: #fff;

			.title {
				font-size: 36rpx;
				font-weight: bold;
			}
		}

		.section {
			background-color: #fff;
			margin: 20rpx;
			border-radius: 12rpx;
			padding: 30rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

			.section-title {
				font-size: 30rpx;
				font-weight: 500;
				color: #333;
				margin-bottom: 20rpx;

				.optional {
					font-size: 24rpx;
					font-weight: normal;
					color: #999;
				}
			}

			.sub-section {
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 1rpx dashed #EEEEEE;

				.sub-title {
					font-size: 28rpx;
					font-weight: 500;
					color: #333;
					margin-bottom: 16rpx;
					display: block;
				}
			}
		}

		.info-item {
			display: flex;
			margin-bottom: 16rpx;

			.label {
				width: 140rpx;
				font-size: 28rpx;
				color: #666;
			}

			.value {
				flex: 1;
				font-size: 28rpx;
				color: #333;

				&.price {
					color: #FF6B01;
					font-weight: 500;
				}
			}
		}

		.type-options,
		.title-options,
		.content-options {
			display: flex;
			flex-wrap: wrap;

			.type-item,
			.title-item,
			.content-item {
				padding: 16rpx 30rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				text {
					font-size: 28rpx;
					color: #666;
				}

				&.active {
					background-color: rgba(255, 107, 1, 0.1);
					border: 1px solid #FF6B01;

					text {
						color: #FF6B01;
					}
				}
			}
		}

		.form-item {
			margin-bottom: 20rpx;

			.label {
				display: block;
				font-size: 28rpx;
				color: #666;
				margin-bottom: 10rpx;

				&.required::before {
					content: '*';
					color: #FF4D4F;
					margin-right: 4rpx;
				}
			}

			.input-wrapper {
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 20rpx;

				input,
				textarea {
					flex: 1;
					font-size: 28rpx;
					color: #333;
				}

				.placeholder {
					color: #999;
				}

				.arrow {
					margin-left: auto;
					font-size: 30rpx;
					color: #999;
				}
			}

			.remark-textarea {
				width: 100%;
				height: 160rpx;
			}

			.word-count {
				text-align: right;
				font-size: 24rpx;
				color: #999;
				margin-top: 10rpx;
				display: block;
			}
		}

		.footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			padding: 20rpx;
			box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
			z-index: 100;

			.submit-btn {
				background: linear-gradient(135deg, #FF6B01, #FF8F1F);
				color: #fff;
				border-radius: 45rpx;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 32rpx;
				font-weight: 500;
			}
		}

		.title-action-buttons {
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;

			.action-btn {
				flex: 1;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(135deg, #FF8F1F, #FF6B01);
				border-radius: 40rpx;
				margin: 0 10rpx;
				box-shadow: 0 4rpx 12rpx rgba(255, 107, 1, 0.2);

				&:first-child {
					margin-left: 0;
				}

				&:last-child {
					margin-right: 0;
				}

				text {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
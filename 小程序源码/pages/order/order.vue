<template>
	<view class="order-container">
		<!-- 未登录状态 -->
		<view v-if="!isLogin" class="no-login">
			<image src="/static/img/no-login.png" mode="aspectFit" class="animate__animated animate__fadeInDown">
			</image>
			<text class="tips">登录后查看您的订单信息</text>
			<button class="login-btn animate__animated animate__fadeInUp" @click="goLogin">
				<text>去登录</text>
				<text class="iconfont icon-arrow-right"></text>
			</button>
		</view>

		<!-- 已登录状态 -->
		<view v-else class="order-content">
			<!-- 顶部状态栏 -->
			<view class="status-bar animate__animated animate__fadeInDown">
				<view class="status-item" v-for="(item, index) in statusList" :key="index"
					:class="{ active: currentStatus === item.value }" @click="switchStatus(item.value)">
					<text>{{item.label}}</text>
					<text class="count" v-if="item.count">{{item.count}}</text>
				</view>
			</view>

			<!-- 搜索框 -->
			<view class="search-container animate__animated animate__fadeIn">
				<view class="search-box">
					<uni-icons type="search" size="20" color="#FF6B01"></uni-icons>
					<input class="search-input" v-model="searchValue" placeholder="搜索订单号"
						placeholder-style="color: #BBBBBB;" confirm-type="search" @confirm="onSearch"
						@focus="searchFocused = true" @blur="searchFocused = false" />
					<view class="search-action" v-if="searchValue">
						<view class="clear-icon" @click="clearSearch">
							<uni-icons type="clear" size="18" color="#999999"></uni-icons>
						</view>
						<view class="divider"></view>
						<view class="search-btn" @click="onSearch">搜索</view>
					</view>
				</view>
			</view>

			<!-- 订单列表 -->
			<scroll-view class="order-list" scroll-y @scrolltolower="loadMore" refresher-enabled
				:refresher-triggered="refreshing" @refresherrefresh="onRefresh">
				<!-- 订单为空 -->
				<view v-if="orderList.length === 0 && !loading" class="empty-order">
					<image src="/static/img/empty-box.png" mode="aspectFit" class="animate__animated animate__fadeIn">
					</image>
					<text class="tips">{{ searchValue ? '未找到相关订单' : '暂无订单信息，快去寄快递吧' }}</text>
					<button class="send-btn animate__animated animate__fadeInUp" @click="goSend">
						<text>去寄快递</text>
						<text class="iconfont icon-arrow-right"></text>
					</button>
				</view>

				<!-- 订单列表 -->
				<view v-else class="list-content">
					<view class="order-item animate__animated animate__fadeIn"
						:style="{ animationDelay: index * 0.1 + 's' }" v-for="(item, index) in orderList"
						:key="item.orderId">
						<!-- 订单头部 -->
						<view class="item-header">
							<text class="order-no">订单号：{{item.orderNo || '暂无单号'}}</text>
							<view class="status-wrapper">
								<!-- 支付方式显示移到这里 -->
								<view class="payment-container" v-if="getPaymentMethodText(item)">
									<uni-icons type="wallet" size="16" color="#FF6B01"></uni-icons>
									<text class="payment-method">{{ getPaymentMethodText(item) }}</text>
								</view>
								<text :class="['status', getStatusClass(item.shippingStatus)]">
									{{getStatusText(item.shippingStatus)}}
								</text>
							</view>
						</view>

						<!-- 到付单剩余支付时间 -->
						<view class="countdown-container" v-if="item.remainderTime && item.remainderTime > 0">
							<uni-icons type="countdown" size="16" color="#FF6B01"></uni-icons>
							<text class="countdown-text">剩余支付时间:
								{{formatCountdown(item.remainderTime, item.orderId)}}</text>
						</view>

						<!-- 订单内容 -->
						<view class="item-content">
							<view class="address-info">
								<view class="from">
									<text class="label">寄</text>
									<view class="info">
										<text class="name">{{item.senderName || '暂无姓名'}}</text>
										<text
											class="address">{{item.senderProvince || ''}}{{item.senderCity || ''}}{{item.senderDistrict || ''}}{{item.senderDetailAddress || '暂无地址'}}</text>
									</view>
								</view>
								<view class="to">
									<text class="label">收</text>
									<view class="info">
										<text class="name">{{item.receiverName || '暂无姓名'}}</text>
										<text
											class="address">{{item.receiverProvince || ''}}{{item.receiverCity || ''}}{{item.receiverDistrict || ''}}{{item.receiverDetailAddress || '暂无地址'}}</text>
									</view>
								</view>
							</view>

							<view class="express-info">
								<image :src="getExpressLogo(item.expressCode)" mode="aspectFit"></image>
								<text>{{getExpressName(item.expressCode)}}</text>
							</view>
						</view>

						<!-- 订单底部 -->
						<view class="item-footer">
							<view class="order-meta">
								<view class="time-container">
									<uni-icons type="calendar" size="16" color="#999999"></uni-icons>
									<text class="time">{{item.createTime || '暂无时间'}}</text>
								</view>
							</view>
							<view class="price-container">
								<view v-if="item.insuranceFee && Number(item.insuranceFee) > 0" class="price-detail">
									<text class="price-label">运费:</text>
									<text
										class="price-value">¥{{Number(item.orderTotalPrice-item.insuranceFee || 0).toFixed(2)}}</text>
								</view>
								<view v-if="item.insuranceFee && Number(item.insuranceFee) > 0" class="price-detail">
									<text class="price-label">保险费:</text>
									<text class="price-value">¥{{Number(item.insuranceFee || 0).toFixed(2)}}</text>
								</view>
								<text class="price">¥{{getTotalPrice(item)}}</text>
							</view>
						</view>

						<!-- 新增：操作按钮区域 -->
						<view class="item-actions">
							<view class="action-group">
								<!-- 左侧主要操作 -->
								<view class="left-actions">
									<button class="action-btn primary-btn" @click.stop="goDetail(item.orderId)">
										<uni-icons type="info" size="14" color="#FFFFFF"></uni-icons>
										<text>详情</text>
									</button>

									<button v-if="[1,2,3].includes(item.shippingStatus)" class="action-btn info-btn"
										@click.stop="goLogistics(item.orderId, item.orderNo)">
										<uni-icons type="paperplane" size="14" color="#FFFFFF"></uni-icons>
										<text>物流</text>
									</button>

									<!-- 添加支付按钮：线上到付未支付 -->
									<button v-if="item.paymentMethod === 2 && item.orderStatus === 7"
										class="action-btn pay-btn" @click.stop="handlePay(item)">
										<uni-icons type="wallet" size="14" color="#FFFFFF"></uni-icons>
										<text>支付</text>
									</button>
								</view>

								<!-- 右侧危险操作 -->
								<view class="right-actions">
									<button v-if="item.shippingStatus === 0" class="action-btn warning-btn"
										@click.stop="showCancelConfirm(item)">
										<uni-icons type="close" size="14" color="#FFFFFF"></uni-icons>
										<text>取消</text>
									</button>

									<button v-if="[3, 6, 10].includes(item.shippingStatus)&&currentStatus!==9"
										class="action-btn danger-btn" @click.stop="showDeleteConfirm(item.orderId)">
										<uni-icons type="trash" size="14" color="#FFFFFF"></uni-icons>
										<text>删除</text>
									</button>
								</view>
							</view>
						</view>
					</view>

					<!-- 加载更多 -->
					<view class="load-more" v-if="orderList.length > 0">
						<text v-if="loading">加载中...</text>
						<text v-else-if="!hasMore">没有更多了</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import orderApi from '@/api/order'
	import expressApi from '@/api/express'
	import commissionFlowApi from '@/api/commissionFlow'
	import statementApi from '@/api/statement'
	import paymentApi from '@/api/payment'
	import userApi from '@/api/user'
	import wechat from '@/api/wechat.js'
	export default {
		data() {
			return {
				loading: false,
				refreshing: false,
				pageNum: 1,
				pageSize: 10,
				total: 0,
				orderList: [],
				isLogin: false,
				searchValue: '', // 搜索值
				searchFocused: false, // 搜索框焦点状态
				countdownTimers: {}, // 存储倒计时定时器
				countdownValues: {}, // 存储倒计时当前值
				expressMap: {
					'SF': {
						name: '顺丰速运',
						icon: '顺丰'
					},
					'ZTO': {
						name: '中通快递',
						icon: '中通'
					},
					'YTO': {
						name: '圆通速递',
						icon: '圆通'
					},
					'YUND': {
						name: '韵达快递',
						icon: '韵达'
					},
					'BEST': {
						name: '百世快递',
						icon: '百世'
					},
					'STO-INT': {
						name: '申通快递',
						icon: '申通'
					},
					'JD': {
						name: '京东快递',
						icon: '京东'
					},
					'DOP': {
						name: '德邦快递',
						icon: '德邦'
					},
					'JT': {
						name: '极兔速递',
						icon: '极兔'
					},
					'KY': {
						name: '跨越速运',
						icon: '跨越'
					},

					'CAINIAO': {
						name: '菜鸟裹裹',
						icon: '菜鸟裹裹'
					},
					'CNSD': {
						name: '菜鸟速递',
						icon: '菜鸟速递'
					},
					'SXJD': {
						name: '顺心捷达',
						icon: '顺心捷达'
					},
					'YMDD': {
						name: '壹米滴答',
						icon: '壹米滴答'
					}
				},
				currentStatus: -1, // 默认显示全部订单
				statusList: [{
						label: '全部',
						value: -1
					},
					// { label: '待付款', value: 0 },、
					{
						label: '到付单',
						value: 9
					},
					{
						label: '待取件',
						value: 0
					},
					{
						label: '运输中',
						value: 2
					},
					{
						label: '已送达',
						value: 3
					},
					{
						label: '已取消',
						value: 10
					}
				]
			}
		},

		computed: {
			...mapState('user', ['userInfo']),

			hasMore() {
				return this.orderList.length < this.total
			}
		},

		onLoad(options) {
			// 接收并处理路由参数中的状态值
			if (options.status !== undefined) {
				this.currentStatus = Number(options.status)
			}
		},

		onShow() {
			// 从全局变量获取
			const status = getApp().globalData.orderStatus

			// 从vuex获取
			// const status = this.$store.state.orderStatus

			// 从缓存获取
			// const status = uni.getStorageSync('orderStatus')

			if (status) {
				// 使用status处理你的逻辑
				console.log('订单状态:', status)
				if(status==1){
					this.currentStatus = 0
				}else if(status==2){
					this.currentStatus = 1
				}else if(status==3){
					this.currentStatus = 3
				}
				// 使用后清除（避免下次进入仍保留）
				getApp().globalData.orderStatus = null
			}
			this.checkLogin()

			// 检查是否有来自首页的搜索参数
			const searchValue = uni.getStorageSync('orderSearchValue')
			if (searchValue) {
				this.searchValue = searchValue
				// 使用完成后清除本地存储的搜索值，避免影响下次进入
				uni.removeStorageSync('orderSearchValue')
			}

			if (this.isLogin) {
				this.refreshList()
			}
		},

		methods: {
			// 检查登录状态
			checkLogin() {
				this.isLogin = !!this.userInfo && !!this.userInfo.userId
			},

			// 去登录
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
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
				} else {
					if (userInfo.isReal !== 2) {
						uni.showToast({
							title: '请先实名',
							icon: 'none'
						})
						return false
					}
				}
				return true
			},
			// 去寄快递
			goSend() {
				if (!this.checkLoginWithTip()) return
				uni.navigateTo({
					url: '/views/express/send'
				})
			},

			// 搜索订单
			onSearch() {
				this.refreshList()
			},

			// 清除搜索
			clearSearch() {
				this.searchValue = ''
				this.refreshList()
			},

			// 刷新列表
			async refreshList() {
				this.pageNum = 1
				this.orderList = []
				await this.getOrderList()
				if (this.refreshing) {
					this.refreshing = false
					uni.stopPullDownRefresh()
				}
			},

			// 加载更多
			async loadMore() {
				if (this.loading || !this.hasMore) return
				this.pageNum++
				await this.getOrderList()
			},

			// 下拉刷新
			async onRefresh() {
				this.refreshing = true
				await this.refreshList()
			},

			// 获取订单列表
			async getOrderList() {
				try {
					this.loading = true
					let parms = {}
					if (this.currentStatus === 9) {
						parms = {
							pageNum: this.pageNum,
							pageSize: this.pageSize,
							userId: '',
							orderStatus: '',
							paymentMethod: '',
							shippingStatus: '',
							isPriceDifferencePaid: '',
							searchValue: this.searchValue, // 添加搜索参数
							phone: this.currentStatus === 9 ? this.userInfo.phone : '',
						}
					} else {
						parms = {
							pageNum: this.pageNum,
							pageSize: this.pageSize,
							userId: this.userInfo.userId,
							orderStatus: '',
							paymentMethod: '',
							shippingStatus: this.currentStatus === -1 ? '' : this.currentStatus,
							isPriceDifferencePaid: '',
							searchValue: this.searchValue, // 添加搜索参数
							phone: '',
						}
					}
					const res = await orderApi.getOrderPage(parms)
					console.log(res)
					if (res) {
						if (this.pageNum === 1) {
							this.orderList = res.dataList || []
						} else {
							this.orderList = [...this.orderList, ...(res.dataList || [])]
						}
						this.total = res.totalPages || 0
					} else {
						this.orderList = []
						this.total = 0
						uni.showToast({
							title: res.msg || '获取订单列表失败',
							icon: 'none'
						})
					}

				} catch (e) {
					console.error(e)
					uni.showToast({
						title: '获取订单列表失败',
						icon: 'none'
					})
				} finally {
					this.loading = false
				}
			},

			// 获取状态文本
			getStatusText(status) {
				switch (Number(status)) {
					case 0:
						return '待取件'
					case 1:
						return '已取件'
					case 2:
						return '运输中'
					case 3:
						return '已签收'
					case 6:
						return '异常'
					case 10:
						return '已取消'
					default:
						return '未知状态'
				}
			},

			// 获取状态样式类
			getStatusClass(status) {
				switch (Number(status)) {
					case 0:
						return 'status-wait-pay'
					case 1:
						return 'status-wait-pick'
					case 11:
						return 'status-picked'
					case 2:
						return 'status-shipping'
					case 3:
						return 'status-delivered'
					case 6:
						return 'status-exception'
					case 10:
						return 'status-canceled'
					default:
						return ''
				}
			},

			// 获取支付方式文本
			getPaymentMethodText(item) {
				const paymentMethod = Number(item.paymentMethod);
				const orderStatus = Number(item.orderStatus);

				if (paymentMethod === 0) {
					return "线下寄付";
				} else if (paymentMethod === 1) {
					return "线下到付";
				} else if (paymentMethod === 2) {
					if (orderStatus === 1) {
						return "微信支付";
					} else if (orderStatus === 4) {
						return "月结支付";
					} else if (orderStatus === 7) {
						return "待支付";
					} else if (orderStatus === 8) {
						return "已支付";
					} else {
						return "在线支付";
					}
				} else {
					return "";
				}
			},

			// 计算总价（订单价格+保险费）
			getTotalPrice(item) {
				const orderPrice = Number(item.orderTotalPrice || 0);
				// const insuranceFee = Number(item.insuranceFee || 0);
				return orderPrice.toFixed(2);
			},

			// 公共方法 - 创建基础请求数据
			createBaseRequestData(express) {
				const baseData = {
					deliveryBusiness: express.deliveryBusiness,
					channelId: express.typeId,
					pickUpStartTime: express.pickUpStartTime,
					pickUpEndTime: express.pickUpEndTime,
					deliveryType: express.expressCode,
					// 收件人信息
					receiveAddress: express.receiverDetailAddress || '',
					receiveMobile: express.receiverPhone,
					receiveTel: express.receiverTel || "",
					receiveName: express.receiverName,
					receiveProvince: express.receiverProvince,
					receiveCity: express.receiverCity,
					receiveDistrict: express.receiverDistrict,
					// 发件人信息
					senderAddress: express.senderDetailAddress || '',
					senderMobile: express.senderPhone,
					senderTel: express.senderTel || "",
					senderName: express.senderName,
					senderProvince: express.senderProvince,
					senderCity: express.senderCity,
					senderDistrict: express.senderDistrict,
					// 物品信息
					goods: express.goods || '',
					packageCount: 1,
					weight: express.estimatedItemWeight,
					// 其他公共参数
					customerType: "kd",
					guaranteeValueAmount: express.guaranteeValueAmount || 0,
					thirdNo: "TD" + Date.now(),
					remark: express.remark
				};

				// 体积参数处理
				if (this.hasVolumeDimensions(express)) {
					baseData.vloumLong = express.length;
					baseData.vloumWidth = express.width;
					baseData.vloumHeight = express.height;
				}

				return {
					businessParams: baseData
				};
			},
			// 辅助方法 - 判断是否有体积信息
			hasVolumeDimensions(express) {
				return express.length && express.width && express.height;
			},

			// 处理支付
			async handlePay(order) {
				try {
					uni.showLoading({
						title: '准备支付...',
						mask: true
					});
					// 	let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					// const requestData = this.createBaseRequestData(order);
					// requestData.businessParams.onlinePay = "N";
					// requestData.businessParams.payMethod = "30";
					// let expressRes = {
					// 	orderNo:'测试',
					// 	deliveryId:'测试'
					// }
					// console.log(order)
					// if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order
					// 	.isPriceDifferencePaid == 0) {
					// 	await orderApi.updateOrderStatus(order.orderId, 8, 1, orderId,expressRes.orderNo,expressRes.deliveryId);
					// } else {
					// 	await orderApi.updateOrderStatus(order.orderId, 8, '', orderId,expressRes.orderNo,expressRes.deliveryId);
					// }
					try {
						let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
						// 使用processPayment方法处理完整支付流程
						const openId = uni.getStorageSync('openId');
						// 发起支付流程
						let amount = 0
						if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order
							.isPriceDifferencePaid == 0) {
							amount = order.amountAfterCommissionDeduction + order.orderPriceDifference
						} else {
							amount = order.amountAfterCommissionDeduction;
						}

						const description = `神州邮-线上到付快递费支付`;
						const payResult = await wechat.processPayment(openId, orderId, amount, description);
						if (payResult.success) {

							// 更新订单状态为已支付
							const requestData = this.createBaseRequestData(order);
							requestData.businessParams.onlinePay = "N";
							requestData.businessParams.payMethod = express.payMethod;
							const expressRes = await expressApi.createExpress(requestData);

							if (!expressRes) {
								throw new Error('快递下单失败')
							} else {
								if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order
									.isPriceDifferencePaid == 0) {
									await orderApi.updateOrderStatus(order.orderId, 8, 1, orderId, expressRes.orderNo,
										expressRes.deliveryId);
								} else {
									await orderApi.updateOrderStatus(order.orderId, 8, '', orderId, expressRes.orderNo,
										expressRes.deliveryId);
								}
							}
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							});
							// 刷新订单列表
							this.refreshList();
						} else {
							uni.showToast({
								title: payResult.message || '支付失败',
								icon: 'none'
							});
						}
					} catch (payError) {
						console.error('支付过程错误:', payError);
						uni.showToast({
							title: payError.message || '支付失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('处理支付错误:', error);
					uni.showToast({
						title: '支付操作失败',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			},

			// 获取快递公司名称
			getExpressName(code) {
				return code ? (this.expressMap[code]?.name || '未知快递') : '未知快递'
			},

			// 获取快递公司Logo
			getExpressLogo(code) {
				const defaultIcon = '/static/icon/default.png' // 添加一个默认图标
				return code ? `/static/icon/${this.expressMap[code]?.icon || 'default'}.png` : defaultIcon
			},

			// 跳转订单详情
			goDetail(orderId) {
				uni.navigateTo({
					url: `/views/order/detail?orderId=${orderId}`
				})
			},

			// 查看物流
			goLogistics(orderId, orderNo) {
				uni.navigateTo({
					url: `/views/order/logistics?orderId=${orderId}&orderNo=${orderNo}`
				})
			},

			// 显示取消确认
			showCancelConfirm(order) {
				uni.showModal({
					title: '取消订单',
					content: '确定要取消该订单吗？',
					confirmColor: '#FF6B01',
					success: async (res) => {
						if (res.confirm) {
							await this.cancelOrder(order)
						}
					}
				})
			},

			// 取消订单
			async cancelOrder(order) {
				try {
					uni.showLoading({
						title: '取消中...',
						mask: true
					})
					orderApi.cancelOrder(order.orderId).then(async r1 => {
						const params = {
							businessParams: {
								deliveryId: order.deliveryId,
								deliveryType: order.deliveryType
							}
						};
						expressApi.cancelExpress(params).then(async r2 => {
							if (r2) {
								// 月结支付的情况
								if (order.paymentMethod === 2) {
									if (order.commissionDeductionAmount === 0) {
										// 订单状态为已完成，创建月付退款记录
										if (order.orderStatus === 4) {
											const statement = {
												userId: this.userInfo.userId,
												monthlySettlementEligibilityId: this
													.userInfo
													.monthlySettlementEligibilityId,
												orderId: order.orderId,
												type: 1, // 1表示退款
												isUserPays: 0,
												amount: order.orderTotalPrice
											};
											try {
												await statementApi.createStatement(statement);
												console.log('月结退款记录创建成功');
											} catch (stmError) {
												console.error('月结退款记录创建失败', stmError);
												uni.showToast({
													title: '订单已取消，但退款记录创建失败',
													icon: 'none',
													duration: 2000
												});
												return;
											}
										}
										// 订单状态为待支付，创建退款流水记录
										else if (order.orderStatus === 1 || order
											.orderStatus === 8) {
											// 计算总退款金额（订单总价 + 保险费）
											const refundAmount = order.orderTotalPrice + (order
												.insuranceFee || 0);

											wechat.applyRefund(order.wechatId, refundAmount,
													'快递取消退款')
												.then(result => {
													if (result.success) {
														// 退款申请成功，可以提示用户
														console.log('退款申请已提交，退款单号:', order
															.wechatId);
													} else {
														// 退款申请失败
														console.error('退款申请失败:', result
															.message);
													}
												})
												.catch(error => {
													console.error('退款申请异常:', error);
												});
										}
									} else if (order.commissionDeductionAmount !== 0) {
										// 佣金抵扣不为0的情况，首先创建佣金支付退款记录
										const commissionRefund = {
											userId: this.userInfo.userId,
											orderId: order.orderId,
											amount: order
												.commissionDeductionAmount, // 佣金抵扣金额
											balance: (this.userInfo.money || 0) + Number(
												order
												.commissionDeductionAmount), // 退款后用户佣金余额
											flowType: 2, // 2表示快递取消返现
										};

										try {
											// 创建佣金支付退款记录
											const commissionResult = await commissionFlowApi
												.addCommissionFlow(
													commissionRefund);

											if (!commissionResult) {
												console.error('佣金退款记录创建失败');
												uni.showToast({
													title: '订单已取消，但佣金退款记录创建失败',
													icon: 'none',
													duration: 2000
												});
											} else {
												// 更新用户信息以获取最新佣金余额
												try {
													const userResult = await userApi
														.getUserById(this.userInfo
															.userId);
													if (userResult) {
														this.$store.commit('user/setUserInfo',
															userResult);
														console.log('用户信息已更新，最新佣金余额:',
															userResult.money);
													}
												} catch (userError) {
													console.error('更新用户信息失败:', userError);
												}
											}
										} catch (commError) {
											console.error('佣金退款记录创建失败', commError);
											uni.showToast({
												title: '订单已取消，但佣金退款记录创建失败',
												icon: 'none',
												duration: 2000
											});
										}

										// 检查佣金抵扣后金额是否为0
										if (order.amountAfterCommissionDeduction === 0) {
											// 如果佣金抵扣后金额为0，只需创建佣金退款记录，无需其他操作
											console.log('佣金完全抵扣订单金额，无需其他退款处理');
										} else {
											// 如果佣金抵扣后仍有剩余金额，则根据订单状态创建相应退款记录
											if (order.orderStatus === 1) {
												console.log(order)
												// 计算总退款金额（订单总价 + 保险费）
												const refundAmount = order
													.amountAfterCommissionDeduction;
												wechat.applyRefund(order.wechatId,
														refundAmount, '快递取消退款')
													.then(result => {
														if (result.success) {
															// 退款申请成功，可以提示用户
															console.log('退款申请已提交，退款单号:',
																order.wechatId);
														} else {
															// 退款申请失败
															console.error('退款申请失败:', result
																.message);
														}
													})
													.catch(error => {
														console.error('退款申请异常:', error);
													});
											} else if (order.orderStatus === 4) {
												// 订单状态为已完成，创建月付退款记录
												const statement = {
													userId: this.userInfo.userId,
													monthlySettlementEligibilityId: this
														.userInfo
														.monthlySettlementEligibilityId,
													orderId: order.orderId,
													type: 1, // 1表示退款
													isUserPays: 0,
													amount: order
														.amountAfterCommissionDeduction // 佣金抵扣后金额
												};

												try {
													await statementApi.createStatement(
														statement);
													console.log('部分佣金抵扣月结退款记录创建成功');
												} catch (stmError) {
													console.error('部分佣金抵扣月结退款记录创建失败',
														stmError);
													uni.showToast({
														title: '订单已取消，但部分退款记录创建失败',
														icon: 'none',
														duration: 2000
													});
												}
											}
										}
									}
								}

								// 微信支付或在线支付的情况 (paymentMethod 为 0 或 1)
								else if (order.paymentMethod === 0 || order.paymentMethod ===
									1) {
									console.log(order)
									// 计算总退款金额（订单总价 + 保险费）
									const refundAmount = order.orderTotalPrice + (order
										.insuranceFee || 0);
									wechat.applyRefund(order.wechatId, refundAmount, '快递取消退款')
										.then(result => {
											if (result.success) {
												// 退款申请成功，可以提示用户
												console.log('退款申请已提交，退款单号:', order
													.wechatId);
											} else {
												// 退款申请失败
												console.error('退款申请失败:', result.message);
											}
										})
										.catch(error => {
											console.error('退款申请异常:', error);
										});
								}

								// 显示成功提示
								uni.showToast({
									title: '订单已取消',
									icon: 'success'
								});

								// 刷新订单列表
								this.refreshList();
							} else {
								uni.showToast({
									title: '取消失败',
									icon: 'none'
								});
							}
						})
					}).catch(error => {
						console.error('取消订单API错误:', error);
						uni.showToast({
							title: '取消失败，请重试',
							icon: 'none'
						});
					});


				} catch (e) {
					console.error('取消订单失败:', e)
					uni.showToast({
						title: '操作失败，请重试',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			// 显示删除确认
			showDeleteConfirm(orderId) {
				uni.showModal({
					title: '删除订单',
					content: '删除后订单数据将无法恢复，确定要删除吗？',
					confirmColor: '#FF6B01',
					success: async (res) => {
						if (res.confirm) {
							await this.deleteOrder(orderId)
						}
					}
				})
			},

			// 删除订单
			async deleteOrder(orderId) {
				try {
					uni.showLoading({
						title: '删除中...',
						mask: true
					})

					const res = await orderApi.deleteOrder(orderId)

					if (res) {
						uni.showToast({
							title: '订单已删除',
							icon: 'success'
						})
						// 刷新订单列表
						this.refreshList()
					} else {
						uni.showToast({
							title: res?.message || '删除失败',
							icon: 'none'
						})
					}
				} catch (e) {
					console.error('删除订单失败:', e)
					uni.showToast({
						title: '操作失败，请重试',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			switchStatus(status) {
				if (this.currentStatus === status) return
				this.currentStatus = status
				this.refreshList()
			},

			// 格式化倒计时
			formatCountdown(milliseconds, orderId) {
				if (!milliseconds) return '00:00:00';

				// 初始化倒计时数据
				if (!this.countdownValues[orderId]) {
					// 使用Vue.set确保响应式
					this.$set(this.countdownValues, orderId, milliseconds);
					this.startCountdown(orderId);
				}

				// 使用存储的当前值
				const totalSeconds = Math.floor(this.countdownValues[orderId] / 1000);
				if (totalSeconds <= 0) return '00:00:00';

				const hours = Math.floor(totalSeconds / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;

				// 格式化为 HH:MM:SS
				const formattedHours = hours.toString().padStart(2, '0');
				const formattedMinutes = minutes.toString().padStart(2, '0');
				const formattedSeconds = seconds.toString().padStart(2, '0');

				return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
			},

			// 开始倒计时
			startCountdown(orderId) {
				// 清除可能存在的旧定时器
				if (this.countdownTimers[orderId]) {
					clearInterval(this.countdownTimers[orderId]);
				}

				// 创建新的定时器，每秒更新一次
				this.countdownTimers[orderId] = setInterval(() => {
					// 减少1000毫秒（1秒）
					const newValue = this.countdownValues[orderId] - 1000;

					// 使用Vue.set确保响应式更新
					this.$set(this.countdownValues, orderId, newValue);

					// 如果倒计时结束，清除定时器
					if (newValue <= 0) {
						clearInterval(this.countdownTimers[orderId]);
						this.$set(this.countdownValues, orderId, 0);
						// 可以在这里添加倒计时结束后的逻辑，比如刷新订单
						this.refreshList();
					}

					// 强制更新视图
					this.$forceUpdate();
				}, 1000);
			},

			onUnload() {
				// 清除所有倒计时定时器
				Object.keys(this.countdownTimers).forEach(orderId => {
					clearInterval(this.countdownTimers[orderId]);
				});
			}
		}
	}
</script>

<style lang="scss">
	.order-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #FFF6F0 0%, #FFF 40%);

		.no-login {
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 0 60rpx;

			image {
				width: 400rpx;
				height: 400rpx;
				margin-bottom: 40rpx;
				filter: drop-shadow(0 8rpx 16rpx rgba(255, 107, 1, 0.1));
			}

			.tips {
				font-size: 32rpx;
				color: #999;
				margin-bottom: 60rpx;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			}

			.login-btn {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(90deg, #FF6B01, #FF8F1F);
				border-radius: 45rpx;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				box-shadow: 0 8rpx 16rpx rgba(255, 107, 1, 0.2);
				transition: all 0.3s;

				.iconfont {
					margin-left: 10rpx;
					font-size: 24rpx;
				}

				&:active {
					transform: translateY(4rpx);
					box-shadow: 0 4rpx 8rpx rgba(255, 107, 1, 0.15);
				}
			}
		}

		.order-content {
			height: 100vh;

			.status-bar {
				position: sticky;
				top: 0;
				z-index: 1;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 88rpx;
				background: rgba(255, 255, 255, 0.95);
				backdrop-filter: blur(10px);
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
				margin-bottom: 10rpx;

				.status-item {
					position: relative;
					padding: 20rpx 0;
					display: flex;
					align-items: center;

					text {
						font-size: 28rpx;
						color: #666;
						transition: all 0.3s;
					}

					.count {
						min-width: 32rpx;
						height: 32rpx;
						padding: 0 8rpx;
						background: #FF6B01;
						border-radius: 16rpx;
						color: #fff;
						font-size: 20rpx;
						line-height: 32rpx;
						text-align: center;
						margin-left: 6rpx;
						transform: scale(0.8);
					}

					&.active {
						text {
							color: #FF6B01;
							font-weight: 500;
							transform: scale(1.1);
						}

						&::after {
							content: '';
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							width: 40rpx;
							height: 4rpx;
							background: linear-gradient(90deg, #FF6B01, #FF8F1F);
							border-radius: 2rpx;
						}
					}
				}
			}

			/* 搜索框样式 */
			.search-container {
				padding: 10rpx 30rpx 20rpx;
				background: linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
				position: relative;
				z-index: 5;

				.search-box {
					display: flex;
					align-items: center;
					height: 80rpx;
					background-color: #FFFFFF;
					border-radius: 40rpx;
					padding: 0 24rpx;
					box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
					border: 1px solid rgba(255, 107, 1, 0.1);
					transition: all 0.3s ease;
					overflow: hidden;

					uni-icons {
						margin-right: 16rpx;
					}

					.search-input {
						flex: 1;
						height: 80rpx;
						font-size: 28rpx;
						color: #333333;
					}

					.search-action {
						display: flex;
						align-items: center;

						.clear-icon {
							padding: 6rpx 12rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.divider {
							width: 2rpx;
							height: 40rpx;
							background-color: #EEEEEE;
							margin: 0 12rpx;
						}

						.search-btn {
							font-size: 28rpx;
							color: #FF6B01;
							font-weight: 500;
							padding: 0 12rpx;
						}
					}

					&:hover,
					&:focus-within {
						box-shadow: 0 6rpx 24rpx rgba(255, 107, 1, 0.15);
						border-color: rgba(255, 107, 1, 0.3);
						transform: translateY(-2rpx);
					}
				}
			}

			.order-list {
				height: calc(100vh - 88rpx - 110rpx);
				/* 调整高度适应新的搜索框 */

				.empty-order {
					padding-top: 200rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 400rpx;
						height: 400rpx;
						margin-bottom: 40rpx;
					}

					.tips {
						font-size: 32rpx;
						color: #999;
						margin-bottom: 60rpx;
					}

					.send-btn {
						width: 400rpx;
						height: 90rpx;
						line-height: 90rpx;
						background: linear-gradient(90deg, #FF6B01, #FF8F1F);
						border-radius: 45rpx;
						color: #fff;
						font-size: 32rpx;
						font-weight: 500;
						text-align: center;
					}
				}

				.list-content {
					padding: 20rpx;

					.order-item {
						background: #fff;
						border-radius: 20rpx;
						padding: 30rpx;
						margin-bottom: 20rpx;
						box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
						transform: translateY(0);
						transition: all 0.3s;

						&:active {
							transform: translateY(2rpx);
							box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
						}

						.item-header {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 20rpx;

							.order-no {
								font-size: 28rpx;
								color: #666;
								max-width: 340rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.status-wrapper {
								display: flex;
								align-items: center;

								.payment-container {
									display: flex;
									align-items: center;
									background: rgba(255, 107, 1, 0.15);
									margin-right: 16rpx;
									padding: 6rpx 14rpx;
									border-radius: 12rpx;
									border: 1px solid rgba(255, 107, 1, 0.3);
									box-shadow: 0 2rpx 4rpx rgba(255, 107, 1, 0.1);

									uni-icons {
										margin-right: 6rpx;
									}
								}

								.payment-method {
									font-size: 26rpx;
									font-weight: 500;
									color: #FF6B01;
								}

								.status {
									font-size: 28rpx;
									font-weight: 500;

									&.status-wait-pay {
										color: #FF6B01;
									}

									&.status-wait-pick {
										color: #FF8F1F;
									}

									&.status-shipping {
										color: #2979ff;
									}

									&.status-delivered {
										color: #19be6b;
									}

									&.status-completed {
										color: #999;
									}

									&.status-canceled {
										color: #999;
									}
								}
							}
						}

						.countdown-container {
							display: flex;
							align-items: center;
							margin-bottom: 20rpx;
							padding: 10rpx 16rpx;
							background: rgba(255, 107, 1, 0.05);
							border-radius: 8rpx;
							border-left: 4rpx solid #FF6B01;

							uni-icons {
								margin-right: 8rpx;
							}

							.countdown-text {
								font-size: 24rpx;
								color: #FF6B01;
								font-weight: 500;
							}
						}

						.item-content {
							position: relative;
							margin: 20rpx 0;
							padding: 20rpx;
							background: linear-gradient(135deg, #f8f9fc, #fff);
							border-radius: 12rpx;
							border: 1px solid rgba(0, 0, 0, 0.05);

							.address-info {

								.from,
								.to {
									display: flex;
									align-items: flex-start;
									margin-bottom: 20rpx;

									.label {
										width: 40rpx;
										height: 40rpx;
										line-height: 40rpx;
										text-align: center;
										background: #fff;
										box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
										border-radius: 6rpx;
										font-size: 24rpx;
										color: #666;
										margin-right: 20rpx;
										position: relative;
										overflow: hidden;

										&::after {
											content: '';
											position: absolute;
											top: -50%;
											left: -50%;
											width: 200%;
											height: 200%;
											background: linear-gradient(135deg,
													transparent,
													rgba(255, 255, 255, 0.4),
													transparent);
											transform: rotate(45deg);
											animation: labelShine 2s infinite;
										}
									}
								}
							}

							.express-info {
								display: flex;
								align-items: center;
								margin-top: 20rpx;

								image {
									width: 40rpx;
									height: 40rpx;
									margin-right: 10rpx;
								}

								text {
									font-size: 24rpx;
									color: #666;
								}
							}
						}

						.item-footer {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 20rpx;

							.order-meta {
								display: flex;
								align-items: center;
							}

							.time-container {
								display: flex;
								align-items: center;
								margin-right: 16rpx;

								uni-icons {
									margin-right: 6rpx;
								}
							}

							.time {
								font-size: 24rpx;
								color: #999;
							}

							.price-container {
								display: flex;
								flex-direction: column;
								align-items: flex-end;

								.price-detail {
									display: flex;
									align-items: center;
									margin-bottom: 4rpx;

									.price-label {
										font-size: 22rpx;
										color: #999;
										margin-right: 8rpx;
									}

									.price-value {
										font-size: 24rpx;
										color: #666;
									}
								}

								.price {
									font-size: 32rpx;
									color: #FF6B01;
									font-weight: bold;
								}
							}
						}

						// 新增：操作按钮区域
						.item-actions {
							margin-top: 24rpx;
							padding-top: 24rpx;
							border-top: 1px dashed #f1f1f1;

							.action-group {
								display: flex;
								justify-content: space-between; // 两端对齐

								.left-actions,
								.right-actions {
									display: flex;
									flex-wrap: wrap;
								}

								.left-actions {
									.action-btn {
										margin-right: 16rpx;
										margin-left: 0;
									}
								}

								.action-btn {
									display: flex;
									align-items: center;
									justify-content: center;
									height: 60rpx;
									padding: 0 24rpx;
									margin-bottom: 10rpx;
									font-size: 24rpx;
									font-weight: 500;
									border-radius: 30rpx;
									border: none;
									color: #FFFFFF;
									box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
									transition: all 0.2s ease;

									&:after {
										border: none;
									}

									uni-icons {
										margin-right: 6rpx;
									}

									&:active {
										transform: translateY(2rpx);
										box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
									}

									&.primary-btn {
										background: linear-gradient(90deg, #4A6FFF, #3C5CE8);
									}

									&.info-btn {
										background: linear-gradient(90deg, #1890FF, #096DD9);
									}

									&.warning-btn {
										background: linear-gradient(90deg, #FF8F1F, #FF6B01);
									}

									&.danger-btn {
										background: linear-gradient(90deg, #FF4D4F, #CF1322);
									}

									&.pay-btn {
										background: linear-gradient(90deg, #FF6B01, #FF8F1F);
									}
								}
							}
						}
					}

					.load-more {
						text-align: center;
						padding: 30rpx 0;

						text {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}
	}

	@keyframes labelShine {
		0% {
			transform: translateX(-100%) rotate(45deg);
		}

		100% {
			transform: translateX(100%) rotate(45deg);
		}
	}
</style>
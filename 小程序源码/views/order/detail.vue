<template>
	<view class="order-detail-container">
		<!-- 状态卡片 - 视觉升级 -->
		<view class="status-card animate__animated animate__fadeIn" :class="{
            'status-wait-pick': orderDetail.shippingStatus === 0,
            'status-picked': orderDetail.shippingStatus === 1,
            'status-shipping': orderDetail.shippingStatus === 2,
            'status-delivered': orderDetail.shippingStatus === 3,
            'status-exception': orderDetail.shippingStatus === 6,
            'status-canceled': orderDetail.shippingStatus === 10
          }">
			<view class="status-icon">
				<uni-icons :type="statusIcon" size="28" color="#FFFFFF"></uni-icons>
			</view>
			<view class="status-content">
				<view class="status-header">
					<text class="status-text">{{ statusText }}</text>
					<!-- 添加支付方式显示 -->
					<view class="payment-container" v-if="payMethodText">
						<uni-icons type="wallet" size="16" color="#FF6B01"></uni-icons>
						<text class="payment-method">{{ payMethodText }}</text>
					</view>
				</view>
				<text class="status-desc">{{ statusDesc }}</text>
				
				<!-- 到付单剩余支付时间 -->
				<view class="countdown-wrapper" v-if="showCountdown && countdownDisplay">
					<uni-icons type="countdown" size="16" color="#FFFFFF"></uni-icons>
					<text class="countdown-text">剩余支付时间: {{countdownDisplay}}</text>
				</view>
			</view>
		</view>

		<!-- 订单信息 - 扩展显示所有字段 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.1s;">
			<view class="card-header">
				<text class="header-title">订单信息</text>
			</view>
			<view class="card-body">
				<view class="info-item">
					<text class="label">订单ID</text>
					<text class="value">{{ orderDetail.orderId || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">订单编号</text>
					<view class="value-group">
						<text class="value order-no">{{ orderDetail.orderNo || '暂无' }}</text>
						<button class="copy-btn" @click="copyOrderNo">复制</button>
					</view>
				</view>
				<view class="info-item">
					<text class="label">运单号</text>
					<text class="value">{{ orderDetail.deliveryId || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">用户ID</text>
					<text class="value">{{ orderDetail.userId || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">下单时间</text>
					<text class="value">{{ orderDetail.createTime || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">更新时间</text>
					<text class="value">{{ orderDetail.updateTime || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">删除状态</text>
					<text class="value">{{ orderDetail.isDelete === 1 ? '已删除' : '正常' }}</text>
				</view>
			</view>
		</view>

		<!-- 快递信息 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.2s;">
			<view class="card-header">
				<text class="header-title">快递信息</text>
			</view>
			<view class="card-body">
				<view class="express-card">
					<view class="express-logo">
						<image :src="expressLogo" mode="aspectFit"></image>
					</view>
					<view class="express-info">
						<text class="express-name">{{ expressName }}</text>
						<text class="express-no">{{ orderDetail.deliveryId || '暂无运单号' }}</text>
					</view>
				</view>
				<view class="info-item" style="margin-top: 20rpx;">
					<text class="label">快递类型</text>
					<text class="value">{{ orderDetail.typeId || '普通快递' }}</text>
				</view>
				<view class="info-item">
					<text class="label">快递公司码</text>
					<text class="value">{{ orderDetail.expressCode || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">运送状态</text>
					<text class="value">{{ getShippingStatusText(orderDetail.shippingStatus) }}</text>
				</view>
			</view>
		</view>

		<!-- 取件时间信息 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.25s;">
			<view class="card-header">
				<text class="header-title">时间安排</text>
			</view>
			<view class="card-body">
				<view class="info-item">
					<text class="label">取件开始</text>
					<text class="value">{{ orderDetail.pickUpStartTime || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">取件结束</text>
					<text class="value">{{ orderDetail.pickUpEndTime || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">发货时间</text>
					<text class="value">{{ orderDetail.shippingTime || '暂无' }}</text>
				</view>
				<view class="info-item">
					<text class="label">收货时间</text>
					<text class="value">{{ orderDetail.receivingTime || '暂无' }}</text>
				</view>
			</view>
		</view>

		<!-- 地址信息 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.3s;">
			<view class="card-header">
				<text class="header-title">地址信息</text>
			</view>
			<view class="card-body">
				<view class="shipping-route">
					<!-- 寄件地址 -->
					<view class="address-card">
						<view class="address-type sender">寄</view>
						<view class="address-content">
							<view class="address-user">
								<text class="user-name">{{ orderDetail.senderName || '暂无姓名' }}</text>
								<text class="user-phone">{{ senderPhoneFormatted || '暂无号码' }}</text>
							</view>
							<text class="address-text">
								{{ orderDetail.senderProvince || '' }}
								{{ orderDetail.senderCity || '' }}
								{{ orderDetail.senderDistrict || '' }}
								{{ orderDetail.senderDetailAddress || '暂无详细地址' }}
							</text>
						</view>
					</view>

					<!-- 路线图示 -->
					<view class="route-line">
						<view class="route-dot start"></view>
						<view class="route-path"></view>
						<view class="route-dot end"></view>
					</view>

					<!-- 收件地址 -->
					<view class="address-card">
						<view class="address-type receiver">收</view>
						<view class="address-content">
							<view class="address-user">
								<text class="user-name">{{ orderDetail.receiverName || '暂无姓名' }}</text>
								<text class="user-phone">{{ receiverPhoneFormatted || '暂无号码' }}</text>
							</view>
							<text class="address-text">
								{{ orderDetail.receiverProvince || '' }}
								{{ orderDetail.receiverCity || '' }}
								{{ orderDetail.receiverDistrict || '' }}
								{{ orderDetail.receiverDetailAddress || '暂无详细地址' }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 物品信息 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.4s;">
			<view class="card-header">
				<text class="header-title">物品信息</text>
			</view>
			<view class="card-body">
				<view class="goods-item">
					<text class="label">预估重量</text>
					<text class="value">{{ orderDetail.estimatedItemWeight || '0' }}kg</text>
				</view>
				<view class="goods-item">
					<text class="label">实际重量</text>
					<text class="value">{{ orderDetail.actualWeight?orderDetail.actualWeight+'kg':'待取件' }}</text>
				</view>
				<view class="goods-item" v-if="orderDetail.length">
					<text class="label">长</text>
					<text class="value">{{ orderDetail.length }}cm</text>
				</view>
				<view class="goods-item" v-if="orderDetail.width">
					<text class="label">宽</text>
					<text class="value">{{ orderDetail.width }}cm</text>
				</view>
				<view class="goods-item" v-if="orderDetail.height">
					<text class="label">高</text>
					<text class="value">{{ orderDetail.height }}cm</text>
				</view>
				<view class="goods-item" v-if="orderDetail.remark">
					<text class="label">备注信息</text>
					<text class="value remark">{{ orderDetail.remark }}</text>
				</view>
			</view>
		</view>

		<!-- 添加重量差价计算区域 - 放在物品信息和费用信息之间 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.45s;"
			v-if="showWeightDifference">
			<view class="card-header">
				<text class="header-title">重量差价</text>
				<view class="tag" :class="isPriceDifferencePaid ? 'tag-success' : 'tag-warning'">
					{{ isPriceDifferencePaid ? '已补差价' : '待补差价' }}
				</view>
			</view>
			<view class="card-body">
				<view class="weight-compare">
					<view class="weight-item">
						<text class="weight-label">预估重量</text>
						<text class="weight-value">{{ orderDetail.estimatedItemWeight || '0' }}kg</text>
						<text class="weight-calc">(计费:
							{{ formatWeightForFee(orderDetail.estimatedItemWeight) }}kg)</text>
					</view>
					<view class="arrow-icon">
						<uni-icons type="arrow-right" size="20" color="#999"></uni-icons>
					</view>
					<view class="weight-item actual">
						<text class="weight-label">实际重量</text>
						<text class="weight-value">{{ orderDetail.actualWeight || '0' }}kg</text>
						<text class="weight-calc">(计费: {{ formatWeightForFee(orderDetail.actualWeight) }}kg)</text>
					</view>
				</view>

				<view class="price-divider"></view>

				<view class="diff-info">
					<view class="diff-item">
						<text class="diff-label">重量差额</text>
						<text class="diff-value">{{ weightDifference }}kg</text>
					</view>
					<view class="diff-item">
						<text class="diff-label">差价金额</text>
						<text
							class="diff-value price">¥{{ orderDetail.orderStatus===7?orderDetail.orderTotalPrice:orderDetail.orderPriceDifference || '0.00' }}</text>
					</view>
					<view class="diff-desc">
						<uni-icons type="info" size="14" color="#999"></uni-icons>
						<text>不足1kg按1kg计算，超过1kg部分向上取整</text>
					</view>
				</view>

				<!-- 补差价按钮 -->
				<!-- <button v-if="needToPay" class="pay-diff-btn" @click="payDifference">
					<uni-icons type="wallet" size="16" color="#FFFFFF"></uni-icons>
					<text>支付差价</text>
				</button> -->
			</view>
		</view>

		<!-- 费用信息 -->
		<view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.5s;">
			<view class="card-header">
				<text class="header-title">费用明细</text>
			</view>
			<view class="card-body">
				<view class="price-item">
					<text class="label">订单总价</text>
					<text class="value">¥{{ orderDetail.orderTotalPrice || '0.00' }}</text>
				</view>
				<view class="price-item" v-if="orderDetail.insuranceFee">
					<text class="label">保价费用</text>
					<text class="value">¥{{ orderDetail.insuranceFee }}</text>
				</view>
				<view class="price-item" v-if="orderDetail.guaranteeValueAmount">
					<text class="label">保价金额</text>
					<text class="value">¥{{ orderDetail.guaranteeValueAmount }}</text>
				</view>
				<view class="price-item" v-if="orderDetail.commissionDeductionAmount">
					<text class="label">佣金抵扣</text>
					<text class="value discount">-¥{{ orderDetail.commissionDeductionAmount }}</text>
				</view>
				<view class="price-item" v-if="orderDetail.commissionDeductionAmount">
					<text class="label">抵扣后金额</text>
					<text
						class="value">¥{{ orderDetail.amountAfterCommissionDeduction || orderDetail.orderTotalPrice || '0.00' }}</text>
				</view>
				<view class="price-item" v-if="orderDetail.orderPriceDifference">
					<text class="label">差价金额</text>
					<text
						class="value">¥{{ orderDetail.orderStatus===7?orderDetail.orderTotalPrice:orderDetail.orderPriceDifference }}</text>
				</view>
				<view class="price-item"
					v-if="orderDetail.orderPriceDifference&&orderDetail.orderPriceDifference!==0.00">
					<text class="label">差价支付</text>
					<text class="value">{{ orderDetail.isPriceDifferencePaid === 1 ? '已支付' : '未支付' }}</text>
				</view>
				<view class="price-divider"></view>
				<view class="price-total">
					<text class="label">实付金额</text>
					<text class="total-value">¥{{ actualPayAmount }}</text>
				</view>
			</view>
		</view>

		<!-- 底部空间，避免按钮遮挡内容 -->
		<view class="bottom-space"></view>

		<!-- 操作按钮 - 移除客服按钮 -->
		<view class="action-bar animate__animated animate__fadeInUp">
			<!-- 待取件状态可以取消订单 -->
			<button v-if="orderDetail.orderStatus === 1" class="action-btn cancel-btn" @click="showCancelConfirm()">
				<uni-icons type="close" size="16" color="#FFFFFF"></uni-icons>
				<text>取消订单</text>
			</button>

			<!-- 已取件及以后的状态可以查看物流 -->
			<button v-if="[11, 2, 3].includes(orderDetail.orderStatus)" class="action-btn logistics-btn"
				@click="goLogistics()">
				<uni-icons type="paperplane" size="16" color="#FFFFFF"></uni-icons>
				<text>查看物流</text>
			</button>

			<!-- 已签收、已取消或异常状态下可以删除订单 -->
			<button v-if="[3, 6, 10].includes(orderDetail.orderStatus)" class="action-btn delete-btn"
				@click="showDeleteConfirm()">
				<uni-icons type="trash" size="16" color="#FFFFFF"></uni-icons>
				<text>删除订单</text>
			</button>

			<!-- 如果需要补差价，添加补差价按钮到底部栏 -->
			<button v-if="needToPay" class="action-btn pay-btn" @click="payDifference">
				<uni-icons type="wallet" size="16" color="#FFFFFF"></uni-icons>
				<text>支付{{orderDetail.orderStatus==7&&orderDetail.isPriceDifferencePaid==0?"全价":"差价"}}</text>
			</button>

			<!-- 如果需要补差价，添加补差价按钮到底部栏 -->
			<button v-else-if="orderDetail.orderStatus==7&&orderDetail.isPriceDifferencePaid==0"
				class="action-btn pay-btn" @click="payAll">
				<uni-icons type="wallet" size="16" color="#FFFFFF"></uni-icons>
				<text>支付全价</text>
			</button>




		</view>
	</view>
</template>

<script>
	import orderApi from '@/api/order'
	import wechat from '@/api/wechat.js'
	export default {
		data() {
			return {
				loading: true,
				orderId: '',
				orderDetail: {},
				expressCompanies: [{
						name: '顺丰速运',
						code: 'SF',
						logo: '/static/icon/顺丰.png'
					},
					{
						name: '中通快递',
						code: 'ZTO',
						logo: '/static/icon/中通.png'
					},
					{
						name: '圆通速递',
						code: 'YTO',
						logo: '/static/icon/圆通.png'
					},
					{
						name: '韵达快递',
						code: 'YUND',
						logo: '/static/icon/韵达.png'
					},
					{
						name: '百世快递',
						code: 'BEST',
						logo: '/static/icon/百世.png'
					},
					{
						name: '申通快递',
						code: 'STO-INT',
						logo: '/static/icon/申通.png'
					},
					{
						name: '京东快递',
						code: 'JD',
						logo: '/static/icon/京东.png'
					},
					{
						name: '德邦快递',
						code: 'DBL',
						logo: '/static/icon/德邦.png'
					},
					{
						name: '极兔速递',
						code: 'JT',
						logo: '/static/icon/极兔.png'
					},
					{
						name: '跨越速运',
						code: 'KY',
						logo: '/static/icon/跨越.png'
					},
					{
						name: '菜鸟裹裹',
						code: 'CAINIAO',
						logo: '/static/icon/菜鸟裹裹.png'
					},
					{
						name: '菜鸟速递',
						code: 'CNSD',
						logo: '/static/icon/菜鸟速递.png'
					},
					{
						name: '顺心捷达',
						code: 'SXJD',
						logo: '/static/icon/顺心捷达.png'
					},
					{
						name: '壹米滴答',
						code: 'YMDD',
						logo: '/static/icon/壹米滴答.png'
					}
				],
				countdownTimer: null,
				countdownDisplay: ''
			}
		},

		computed: {
			statusIcon() {
				const icons = {
					0: 'calendar', // 待取件
					1: 'paperplane', // 已取件
					2: 'car', // 运输中
					3: 'checkmarkempty', // 已签收
					6: 'info', // 异常
					10: 'closeempty' // 已取消
				}
				return icons[this.orderDetail.shippingStatus] || 'help'
			},

			statusText() {
				const statusTexts = {
					0: '待取件',
					1: '已取件',
					2: '运输中',
					3: '已签收',
					6: '异常',
					10: '已取消'
				}
				return statusTexts[this.orderDetail.shippingStatus] || '未知状态'
			},

			statusDesc() {
				const statusDescs = {
					0: '快递员即将上门取件，请保持电话畅通',
					1: '快递员已上门取件',
					2: '包裹正在运输中，请耐心等待',
					3: '包裹已签收，感谢您的使用',
					6: '包裹出现异常，请联系快递员',
					10: '订单已取消'
				}
				return statusDescs[this.orderDetail.shippingStatus] || '状态信息暂无'
			},

			payMethodText() {
				const methods = {
					0: '线下寄付',
					1: '线下到付',
					2: '线上支付'
				}
				if (this.orderDetail.paymentMethod == 2) {
					if (this.orderDetail.orderStatus === 1) {
						return '微信支付'
					} else if (this.orderDetail.orderStatus === 4) {
						return '月结支付'
					} else if (this.orderDetail.orderStatus === 7) {
						return '线上到付未支付'
					} else if (this.orderDetail.orderStatus === 8) {
						return '线上到付已支付'
					}
				} else {
					return methods[this.orderDetail.paymentMethod] || '未知支付方式'
				}

			},

			expressLogo() {
				const company = this.expressCompanies.find(c => c.code === this.orderDetail.expressCode)
				// 返回找到的公司图标，如果找不到则使用中通图标作为默认图标
				return company ? company.logo : '/static/icon/中通.png'
			},

			expressName() {
				const company = this.expressCompanies.find(c => c.code === this.orderDetail.expressCode)
				return company ? company.name : (this.orderDetail.expressCode || '未知快递')
			},

			senderPhoneFormatted() {
				return this.formatPhone(this.orderDetail.senderPhone)
			},

			receiverPhoneFormatted() {
				return this.formatPhone(this.orderDetail.receiverPhone)
			},

			// 是否显示重量差价区域
			showWeightDifference() {
				return this.orderDetail.actualWeight > 0 && this.orderDetail.estimatedItemWeight > 0
			},

			// 重量差额
			weightDifference() {
				if (!this.orderDetail.actualWeight || !this.orderDetail.estimatedItemWeight) return 0
				const diff = parseFloat(this.orderDetail.actualWeight) - parseFloat(this.orderDetail.estimatedItemWeight)
				return diff > 0 ? diff.toFixed(2) : 0
			},

			// 计算差价金额
			priceDifference() {
				// 优先使用服务器返回的差价金额
				if (this.orderDetail.orderPriceDifference) {
					return parseFloat(this.orderDetail.orderPriceDifference).toFixed(2)
				} else {
					return 0
				}

				// // 如果没有服务器返回的差价，则进行本地计算
				// if (this.weightDifference <= 0) return 0

				// // 将差价计算逻辑提取到计算属性中
				// const estimatedWeightCalculated = this.formatWeightForFee(this.orderDetail.estimatedItemWeight)
				// const actualWeightCalculated = this.formatWeightForFee(this.orderDetail.actualWeight)

				// // 如果计算后的重量没有变化，则不产生差价
				// if (estimatedWeightCalculated >= actualWeightCalculated) return 0

				// // 计算每公斤的价格
				// const pricePerKg = this.orderDetail.orderTotalPrice / estimatedWeightCalculated

				// // 计算差价 = 单价 * (实际计费重量 - 预估计费重量)
				// const difference = pricePerKg * (actualWeightCalculated - estimatedWeightCalculated)

				// return difference.toFixed(2)
			},

			// 是否已补差价
			isPriceDifferencePaid() {
				return this.orderDetail.isPriceDifferencePaid === 1
			},

			// 是否需要支付差价
			needToPay() {
				if (!this.orderDetail.orderPriceDifference) return false

				const diff = parseFloat(this.orderDetail.orderPriceDifference)
				return diff > 0 && this.orderDetail.isPriceDifferencePaid !== 1
			},

			// 计算实付金额 = 订单总价 - 差价金额
			actualPayAmount() {
				const totalPrice = parseFloat(this.orderDetail.orderTotalPrice || 0)
				if (this.orderDetail.orderStatus === 7) {
					return 0
				}

				// 如果差价已支付，不需要从总价中减去差价
				if (this.orderDetail.isPriceDifferencePaid === 1) {
					return totalPrice.toFixed(2)
				}
				// 如果有差价且未支付，从总价中减去差价
				const priceDifference = parseFloat(this.orderDetail.orderPriceDifference || 0)
				return (totalPrice - priceDifference).toFixed(2)
			},

			// 是否显示倒计时
			showCountdown() {
				return this.orderDetail.orderStatus === 7 && 
				       this.orderDetail.remainderTime && 
				       this.orderDetail.remainderTime > 0;
			}
		},

		onLoad(options) {
			this.orderId = options.orderId
			this.loadOrderDetail()
		},

		methods: {
			async loadOrderDetail() {
				this.loading = true
				try {
					const res = await orderApi.getOrderById(this.orderId)
					console.log(res)
					if (res) {
						this.orderDetail = res || {}
						
						// 初始化倒计时
						if (this.showCountdown) {
							this.initializeCountdown();
						}

						// 如果服务器返回的差价为0，但有实际重量差异，则计算并更新差价
						if (this.orderDetail.actualWeight > 0 &&
							(!this.orderDetail.orderPriceDifference ||
								parseFloat(this.orderDetail.orderPriceDifference) === 0)) {
							this.updatePriceDifference()
						}
					} else {
						uni.showToast({
							title: '获取订单详情失败',
							icon: 'none'
						})
					}
				} catch (error) {
					console.error('获取订单详情错误', error)
					uni.showToast({
						title: '获取订单详情失败',
						icon: 'none'
					})
				} finally {
					this.loading = false
				}
			},

			copyOrderNo() {
				if (!this.orderDetail.orderNo) return
				uni.setClipboardData({
					data: this.orderDetail.orderNo,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				})
			},

			formatPhone(phone) {
				if (!phone) return ''
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
			},

			getShippingStatusText(status) {
				const texts = {
					0: '待取件',
					1: '已取件',
					2: '运输中',
					3: '已签收',
					10: '已取消',
					6: '异常'
				}
				return texts[status] || '未知状态'
			},

			goLogistics() {
				if (!this.orderDetail.orderNo && !this.orderDetail.deliveryId) {
					uni.showToast({
						title: '暂无运单号',
						icon: 'none'
					})
					return
				}

				uni.navigateTo({
					url: `/views/logistics/logistics?orderNo=${this.orderDetail.orderNo}&trackingNumber=${this.orderDetail.deliveryId || ''}&expressCode=${this.orderDetail.expressCode}`
				})
			},

			showCancelConfirm() {
				uni.showModal({
					title: '取消订单',
					content: '确定要取消该订单吗？',
					confirmColor: '#FF6B01',
					success: (res) => {
						if (res.confirm) {
							this.cancelOrder()
						}
					}
				})
			},

			async cancelOrder() {
				try {
					const res = await orderApi.cancelOrder(this.orderId)
					if (res) {
						uni.showToast({
							title: '订单已取消',
							icon: 'success'
						})
						// 重新加载订单详情
						setTimeout(() => {
							this.loadOrderDetail()
						}, 1500)
					}
				} catch (error) {
					uni.showToast({
						title: '取消订单失败',
						icon: 'none'
					})
				}
			},

			showDeleteConfirm() {
				uni.showModal({
					title: '删除订单',
					content: '删除后订单将无法恢复，确定要删除吗？',
					confirmColor: '#FF4D4F',
					success: (res) => {
						if (res.confirm) {
							this.deleteOrder()
						}
					}
				})
			},

			async deleteOrder() {
				try {
					const res = await orderApi.deleteOrder(this.orderId)
					if (res) {
						uni.showToast({
							title: '订单已删除',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				} catch (error) {
					uni.showToast({
						title: '删除订单失败',
						icon: 'none'
					})
				}
			},

			// 重量计费格式化（向上取整）
			formatWeightForFee(weight) {
				if (!weight) return 0
				const numWeight = parseFloat(weight)
				// 不足1kg按1kg计算
				if (numWeight <= 0) return 0
				if (numWeight <= 1) return 1
				// 超过1kg部分向上取整
				return Math.ceil(numWeight)
			},

			// 更新差价
			async updatePriceDifference() {
				// 如果服务器已返回差价，则不再计算
				if (this.orderDetail.orderPriceDifference && parseFloat(this.orderDetail.orderPriceDifference) > 0) {
					console.log('使用服务器返回的差价:', this.orderDetail.orderPriceDifference)
					return
				}

				// 计算差价
				const priceDiff = this.priceDifference

				if (priceDiff > 0) {
					// 只在界面上更新差价，不调用后端API
					this.orderDetail.orderPriceDifference = priceDiff
					console.log('差价计算完成:', priceDiff)

					// 服务器端暂未实现updateDifference接口，暂时只在前端显示
					// 后续后端实现接口后可以取消下面注释的代码
					/*
					try {
					  // 调用API更新差价
					  const result = await orderApi.updatePriceDifference(this.orderId, priceDiff)
					  console.log('差价更新结果:', result)
					} catch (error) {
					  console.error('更新差价失败:', error)
					  // 即使API失败，我们仍在UI上显示计算的差价
					}
					*/
				}
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
					goods: express.goods||'',
					packageCount:  1,
					weight:express.estimatedItemWeight,
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
			
			async payAll() {

				// 确认支付
				uni.showModal({
					title: '支付全价',
					content: `您需支付全价 ¥${this.orderDetail.orderTotalPrice}，确认支付？`,
					confirmColor: '#FF6B01',
					success: async (res) => {
						if (res.confirm) {
							try {
								let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
								const openId = uni.getStorageSync('openId');
								const description = `神州邮-线上到付快递费支付`;
								const payResult = await wechat.processPayment(openId, orderId,
									this.orderDetail.orderTotalPrice, description);
								// const payResult = await wechat.processPayment(openId, this.orderDetail.wechatId,
								// 	 0.01, description);
								if (payResult.success) {
									// 更新订单状态为已支付
									const requestData = this.createBaseRequestData(order);
									requestData.businessParams.onlinePay = "N";
									requestData.businessParams.payMethod = express.payMethod;
									const expressRes = await expressApi.createExpress(requestData);
									if (!expressRes){
										throw new Error('快递下单失败')
									}else{
										await orderApi.updateOrderStatus(this.orderDetail.orderId, 8, '',orderId,expressRes.orderNo,expressRes.deliveryId);
									}
									uni.showToast({
										title: '支付成功',
										icon: 'success'
									});
									
									// 更新订单状态为已支付

									// 刷新订单列表
									this.loadOrderDetail()
								} else {
									uni.showToast({
										title: payResult.message || '支付失败',
										icon: 'none'
									});
								}
							} catch (error) {
								console.error('支付过程错误:', error);
								uni.showToast({
									title: error.message || '支付失败',
									icon: 'none'
								});
							}
						}
					}
				})
			},
			// 支付差价
			async payDifference() {
				if (!this.orderDetail.orderPriceDifference || parseFloat(this.orderDetail.orderPriceDifference) <= 0) {
					uni.showToast({
						title: '无需支付差价',
						icon: 'none'
					})
					return
				}
				let orderPriceDifference = 0
				if (this.orderDetail.orderStatus === 7) {
					orderPriceDifference = this.orderDetail.orderTotalPrice
					// 确认支付
					uni.showModal({
						title: '支付全价',
						content: `订单实际重量超出预估，需全价 ¥${orderPriceDifference}，确认支付？`,
						confirmColor: '#FF6B01',
						success: async (res) => {
							if (res.confirm) {
								try {
									let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
									const openId = uni.getStorageSync('openId');
									const description = `神州邮-线上到付快递费支付`;
									const payResult = await wechat.processPayment(openId, this.orderDetail.wechatId,
										orderPriceDifference, description);
									// const payResult = await wechat.processPayment(openId, orderId,
									// 	0.01, description);
									if (payResult.success) {
										const requestData = this.createBaseRequestData(order);
										requestData.businessParams.onlinePay = "N";
										requestData.businessParams.payMethod = express.payMethod;
										const expressRes = await expressApi.createExpress(requestData);
										
										if (!expressRes){
											throw new Error('快递下单失败')
										}else{
											if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order
												.isPriceDifferencePaid == 0) {
												await orderApi.updateOrderStatus(order.orderId, 8, 1, orderId,expressRes.orderNo,expressRes.deliveryId);
											} else {
												await orderApi.updateOrderStatus(order.orderId, 8, '', orderId,expressRes.orderNo,expressRes.deliveryId);
											}
										}
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										}); 
								
									
										// 更新订单状态为已支付

										// 刷新订单列表
										this.loadOrderDetail()
									} else {
										uni.showToast({
											title: payResult.message || '支付失败',
											icon: 'none'
										});
									}
								} catch (error) {
									console.error('支付过程错误:', error);
									uni.showToast({
										title: error.message || '支付失败',
										icon: 'none'
									});
								}
								
								// 更新订单状态为已支付

								// 刷新订单列表
								this.loadOrderDetail()
							}
						}
					})
				} else {
					orderPriceDifference = this.orderDetail.orderPriceDifference
					// 确认支付
					uni.showModal({
						title: '支付差价',
						content: `订单实际重量超出预估，需补差价 ¥${orderPriceDifference}，确认支付？`,
						confirmColor: '#FF6B01',
						success: async (res) => {


							if (res.confirm) {
								try {
									let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math
									.random() * 1000);
									const openId = uni.getStorageSync('openId');
									const description = `神州邮-线上到付快递费支付`;
									const payResult = await wechat.processPayment(openId, this.orderDetail.wechatId,
										orderPriceDifference, description);
									// const payResult = await wechat.processPayment(openId, orderId,
									// 	0.01, description);
									if (payResult.success) {
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										});
										if (this.orderDetail.orderPriceDifference && this.orderDetail
											.orderPriceDifference !==
											0.00 && this.orderDetail.isPriceDifferencePaid == 0) {
											await orderApi.updateOrderStatus(this.orderDetail.orderId, 8,
												1,this.orderDetail.wechatId,this.orderDetail.orderNo,this.this.orderDetail.deliveryId);
										} else {
											await orderApi.updateOrderStatus(this.orderDetail.orderId, 8,
												'',this.orderDetail.wechatId,this.orderDetail.orderNo,this.this.orderDetail.deliveryId);
										}
										// 更新订单状态为已支付

										// 刷新订单列表
										this.loadOrderDetail()
									} else {
										uni.showToast({
											title: payResult.message || '支付失败',
											icon: 'none'
										});
									}
								} catch (error) {
									console.error('支付过程错误:', error);
									uni.showToast({
										title: error.message || '支付失败',
										icon: 'none'
									});
								}

							}
						}
					})
				}

			},

			// 初始化倒计时
			initializeCountdown() {
				// 清除之前可能存在的定时器
				if (this.countdownTimer) {
					clearInterval(this.countdownTimer);
				}
				
				// 设置初始显示
				this.countdownDisplay = this.formatTime(this.orderDetail.remainderTime);
				
				// 创建新的定时器，每秒更新一次
				this.countdownTimer = setInterval(() => {
					// 每秒减少1000毫秒
					this.orderDetail.remainderTime -= 1000;
					
					if (this.orderDetail.remainderTime <= 0) {
						// 倒计时结束
						clearInterval(this.countdownTimer);
						this.orderDetail.remainderTime = 0;
						this.countdownDisplay = '00:00:00';
						
						// 当倒计时结束时刷新订单详情
						setTimeout(() => {
							this.loadOrderDetail();
						}, 1000);
					} else {
						// 更新显示
						this.countdownDisplay = this.formatTime(this.orderDetail.remainderTime);
					}
				}, 1000);
			},
			
			// 格式化时间为 HH:MM:SS
			formatTime(milliseconds) {
				if (!milliseconds || milliseconds <= 0) return '00:00:00';
				
				const totalSeconds = Math.floor(milliseconds / 1000);
				const hours = Math.floor(totalSeconds / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;
				
				return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
			}
		},
		onUnload() {
			// 清除倒计时定时器
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer);
				this.countdownTimer = null;
			}
		},
		
		onHide() {
			// 当页面隐藏时也清除定时器，避免在后台持续运行
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer);
				this.countdownTimer = null;
			}
		}
	}
</script>

<style lang="scss">
	.order-detail-container {
		min-height: 100vh;
		background-color: #F5F7FA;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));

		// 状态卡片
		.status-card {
			display: flex;
			align-items: center;
			padding: 40rpx 30rpx;
			background: linear-gradient(135deg, #FF8F1F, #FF6B01);
			color: #FFFFFF;
			position: relative;
			overflow: hidden;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				width: 120rpx;
				height: 120rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 50%;
				transform: translate(50%, -50%);
			}

			.status-icon {
				width: 80rpx;
				height: 80rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 30rpx;
			}

			.status-content {
				flex: 1;

				.status-header {
					display: flex;
					align-items: center;
					margin-bottom: 8rpx;

					.status-text {
						font-size: 36rpx;
						font-weight: bold;
						margin-right: 16rpx;
					}

					.payment-container {
						display: flex;
						align-items: center;
						background: rgba(255, 255, 255, 0.2);
						padding: 6rpx 14rpx;
						border-radius: 12rpx;
						border: 1px solid rgba(255, 255, 255, 0.3);

						uni-icons {
							margin-right: 6rpx;
						}

						.payment-method {
							font-size: 26rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}

				.status-desc {
					font-size: 26rpx;
					opacity: 0.9;
					margin-bottom: 8rpx;
				}
				
				.countdown-wrapper {
					display: flex;
					align-items: center;
					margin-top: 12rpx;
					padding: 8rpx 16rpx;
					background: rgba(255, 255, 255, 0.2);
					border-radius: 8rpx;
					border-left: 4rpx solid #FFFFFF;
					
					uni-icons {
						margin-right: 8rpx;
					}
					
					.countdown-text {
						font-size: 24rpx;
						color: #FFFFFF;
						font-weight: 500;
					}
				}
			}

			// 不同状态的颜色
			&.status-wait-pick {
				background: linear-gradient(135deg, #FF8F1F, #FF6B01);
			}

			&.status-picked {
				background: linear-gradient(135deg, #40A9FF, #1890FF);
			}

			&.status-shipping {
				background: linear-gradient(135deg, #40A9FF, #1890FF);
			}

			&.status-delivered {
				background: linear-gradient(135deg, #52C41A, #389E0D);
			}

			&.status-exception {
				background: linear-gradient(135deg, #FF4D4F, #CF1322);
			}

			&.status-canceled {
				background: linear-gradient(135deg, #BFBFBF, #8C8C8C);
			}
		}

		// 卡片通用样式
		.info-card {
			margin: 20rpx 30rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
			overflow: hidden;

			.card-header {
				padding: 24rpx 30rpx;
				border-bottom: 1px solid #F0F0F0;

				.header-title {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					position: relative;
					padding-left: 20rpx;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 24rpx;
						background: #FF6B01;
						border-radius: 3rpx;
					}
				}
			}

			.card-body {
				padding: 30rpx;
			}
		}

		// 信息项通用样式
		.info-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.label {
				font-size: 28rpx;
				color: #666666;
				width: 140rpx;
			}

			.value {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
				text-align: right;

				&.order-no {
					max-width: 340rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.value-group {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.value {
					margin-right: 20rpx;
				}

				.copy-btn {
					background: #F5F7FA;
					border: none;
					font-size: 24rpx;
					color: #40A9FF;
					padding: 6rpx 20rpx;
					border-radius: 30rpx;
					line-height: 1.5;

					&:after {
						border: none;
					}
				}
			}
		}

		// 快递信息
		.express-card {
			display: flex;
			align-items: center;

			.express-logo {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				border-radius: 8rpx;
				overflow: hidden;
				background: #F5F7FA;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 80%;
					height: 80%;
				}
			}

			.express-info {
				flex: 1;

				.express-name {
					font-size: 30rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 8rpx;
					display: block;
				}

				.express-no {
					font-size: 26rpx;
					color: #666666;
				}
			}
		}

		// 地址信息
		.shipping-route {
			position: relative;

			.address-card {
				display: flex;
				margin-bottom: 40rpx;
				position: relative;
				z-index: 2;

				&:last-child {
					margin-bottom: 0;
				}

				.address-type {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 24rpx;
					font-weight: bold;
					margin-top: 6rpx;
					margin-right: 20rpx;
					flex-shrink: 0;

					&.sender {
						background: #FF6B01;
					}

					&.receiver {
						background: #52C41A;
					}
				}

				.address-content {
					flex: 1;

					.address-user {
						display: flex;
						margin-bottom: 10rpx;

						.user-name {
							font-size: 30rpx;
							color: #333333;
							font-weight: 500;
							margin-right: 20rpx;
						}

						.user-phone {
							font-size: 28rpx;
							color: #666666;
						}
					}

					.address-text {
						font-size: 28rpx;
						color: #666666;
						line-height: 1.5;
					}
				}
			}

			.route-line {
				position: absolute;
				left: 22rpx;
				top: 44rpx;
				bottom: 44rpx;
				width: 1px;
				background: #E8E8E8;
				z-index: 1;

				.route-dot {
					position: absolute;
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					left: -7.5rpx;

					&.start {
						top: 0;
						background: #FF6B01;
					}

					&.end {
						bottom: 0;
						background: #52C41A;
					}
				}

				.route-path {
					position: absolute;
					top: 16rpx;
					bottom: 16rpx;
					left: 0;
					width: 100%;
				}
			}
		}

		// 商品信息
		.goods-item {
			display: flex;
			margin-bottom: 20rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.label {
				width: 140rpx;
				font-size: 28rpx;
				color: #666666;
			}

			.value {
				flex: 1;
				font-size: 28rpx;
				color: #333333;

				&.remark {
					color: #666666;
				}
			}
		}

		// 价格信息
		.price-item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.label {
				font-size: 28rpx;
				color: #666666;
			}

			.value {
				font-size: 28rpx;
				color: #333333;

				&.discount {
					color: #52C41A;
				}
			}
		}

		.price-divider {
			height: 1px;
			background: #F0F0F0;
			margin: 20rpx 0;
		}

		.price-total {
			display: flex;
			justify-content: space-between;

			.label {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}

			.total-value {
				font-size: 34rpx;
				color: #FF6B01;
				font-weight: bold;
			}
		}

		// 底部空间
		.bottom-space {
			height: 120rpx;
		}

		// 操作按钮栏
		.action-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #FFFFFF;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 16rpx 30rpx;
			padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
			box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.05);
			z-index: 100;

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 72rpx;
				padding: 0 30rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
				font-weight: 500;
				border-radius: 36rpx;
				color: #FFFFFF;
				box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);

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

				&.delete-btn {
					background: linear-gradient(90deg, #FF7875, #FF4D4F);
				}

				&.cancel-btn {
					background: linear-gradient(90deg, #FF9C2A, #FF6B01);
				}

				&.logistics-btn {
					background: linear-gradient(90deg, #40A9FF, #1890FF);
				}

				&.pay-btn {
					background: linear-gradient(90deg, #FF9C2A, #FF6B01);
				}
			}
		}

		// 重量差价卡片样式
		.tag {
			padding: 4rpx 12rpx;
			font-size: 22rpx;
			border-radius: 8rpx;
			margin-left: 16rpx;

			&.tag-success {
				background: rgba(82, 196, 26, 0.1);
				color: #52C41A;
			}

			&.tag-warning {
				background: rgba(255, 107, 1, 0.1);
				color: #FF6B01;
			}
		}

		.weight-compare {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;

			.weight-item {
				flex: 1;
				text-align: center;

				&.actual {
					.weight-value {
						color: #FF6B01;
						font-weight: bold;
					}
				}

				.weight-label {
					font-size: 24rpx;
					color: #999;
					margin-bottom: 8rpx;
					display: block;
				}

				.weight-value {
					font-size: 36rpx;
					color: #333;
					font-weight: 500;
					margin-bottom: 6rpx;
					display: block;
				}

				.weight-calc {
					font-size: 22rpx;
					color: #999;
					display: block;
				}
			}

			.arrow-icon {
				padding: 0 20rpx;
			}
		}

		.diff-info {
			padding: 20rpx 0;

			.diff-item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 12rpx;

				.diff-label {
					font-size: 28rpx;
					color: #666;
				}

				.diff-value {
					font-size: 28rpx;
					color: #333;

					&.price {
						color: #FF6B01;
						font-weight: bold;
					}
				}
			}

			.diff-desc {
				display: flex;
				align-items: center;
				margin-top: 16rpx;

				text {
					font-size: 24rpx;
					color: #999;
					margin-left: 8rpx;
				}
			}
		}

		.pay-diff-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			width: 100%;
			margin-top: 20rpx;
			border-radius: 40rpx;
			background: linear-gradient(90deg, #FF9C2A, #FF6B01);
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: 500;
			box-shadow: 0 4rpx 8rpx rgba(255, 107, 1, 0.2);

			&:after {
				border: none;
			}

			uni-icons {
				margin-right: 8rpx;
			}

			&:active {
				transform: translateY(2rpx);
				box-shadow: 0 2rpx 4rpx rgba(255, 107, 1, 0.2);
			}
		}
	}
</style>
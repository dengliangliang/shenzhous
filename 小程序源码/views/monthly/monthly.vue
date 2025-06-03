<template>
	<view class="monthly-container">
		<!-- 类型切换 -->
		<view class="type-tabs animate__animated animate__fadeIn">
			<view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
				<uni-icons :type="currentTab === 0 ? 'star-filled' : 'star'" size="20"
					:color="currentTab === 0 ? '#FF6B01' : '#666'"></uni-icons>
				<text>月结资格</text>
			</view>
			<view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
				<uni-icons :type="currentTab === 1 ? 'calendar-filled' : 'calendar'" size="20"
					:color="currentTab === 1 ? '#FF6B01' : '#666'"></uni-icons>
				<text>申请记录</text>
			</view>
		</view>

		<!-- 月结资格列表 -->
		<view class="list-container" v-if="currentTab === 0">
			<!-- 密码输入框 -->
			<view v-if="!userInfo || userInfo.isMonth !== 1" class="invitation-card animate__animated animate__fadeIn">
				<view class="card-content">
					<uni-icons type="locked" size="32" color="#FF6B01"></uni-icons>
					<text class="title">您暂无月结资格</text>
					<text class="subtitle">请输入月结资格密码</text>
					<input class="code-input" type="text" v-model="monthlyCode" placeholder="请输入月结资格密码"
						placeholder-style="color: #999999" password />
					<button class="submit-btn" :disabled="!monthlyCode" @click="submitMonthlyCode">
						<text>提交</text>
					</button>
				</view>
			</view>

			<!-- 月结资格列表 -->
			<view class="list-content">
				<scroll-view class="eligibility-list" scroll-y @scrolltolower="loadMoreEligibility" refresher-enabled
					:refresher-triggered="refreshingEligibility" @refresherrefresh="onRefreshEligibility">
					<view class="eligibility-item animate__animated animate__fadeIn"
						v-for="(item, index) in eligibilityList" :key="item.monthlySettlementEligibilityId"
						:style="{ animationDelay: index * 0.1 + 's' }" v-if="userInfo">
						<view class="card-header">
							<view class="title">
								<uni-icons type="wallet" size="24" color="#FF6B01"></uni-icons>
								<text>月结账户</text>
							</view>
							<view class="status-tag" :class="{ invalid: item.status === 1 }">
								{{ item.status === 0 ? '正常' : '已失效' }}
							</view>
						</view>

						<view class="info-row">
							<text class="label">结算周期</text>
							<text class="value">{{ getCycleText(item.settlementCycle) }}</text>
						</view>

						<view class="info-row">
							<text class="label">最低寄件量</text>
							<text class="value highlight">¥ {{ item.minimumAmount }}<text class="unit">/月</text></text>
						</view>

						<view class="info-row">
							<text class="label">发票要求</text>
							<text class="value">{{ getInvoiceText(item.invoiceRequirement) }}</text>
						</view>

						<view class="info-row">
							<text class="label">生效时间</text>
							<text class="value">{{ item.createTime }}</text>
						</view>

						<!-- 操作按钮 -->
						<!-- <view class="action-buttons">
							<view class="action-btn" @click="viewBill(item)">
								<uni-icons type="list" size="16" color="#666666"></uni-icons>
								<text>查看账单</text>
							</view>
							<view class="action-btn" @click="viewUsers(item)">
								<uni-icons type="staff" size="16" color="#666666"></uni-icons>
								<text>使用用户</text>
							</view>
							<view class="action-btn" @click="viewDetails(item)">
								<uni-icons type="info" size="16" color="#666666"></uni-icons>
								<text>查看详情</text>
							</view>
						</view> -->

						<view class="action-buttons">
							<!-- 当前用户是月结资格的拥有者 -->
							<template v-if="userInfo && userInfo.userId === item.userId">
								<view class="action-btn" @click="viewBill(item)">
									<uni-icons type="list" size="16" color="#666666"></uni-icons>
									<text>查看账单</text>
								</view>
								<view class="action-btn" @click="viewUsers(item)">
									<uni-icons type="staff" size="16" color="#666666"></uni-icons>
									<text>使用用户</text>
								</view>
								<view class="action-btn" @click="viewDetails(item)">
									<uni-icons type="info" size="16" color="#666666"></uni-icons>
									<text>查看详情</text>
								</view>
							</template>

							<!-- 当前用户不是月结资格的拥有者 -->
							<template v-else>
								<view class="action-btn" @click="viewBill(item)">
									<uni-icons type="list" size="16" color="#666666"></uni-icons>
									<text>我的账单</text>
								</view>
							</template>
						</view>
					</view>

					<!-- 加载更多 -->
					<uni-load-more :status="eligibilityLoadMoreStatus"
						v-if="eligibilityList.length > 0"></uni-load-more>

					<!-- 空状态 -->
					<view v-if="eligibilityList.length === 0" class="empty-state animate__animated animate__fadeIn">
						<image src="/static/img/empty-eligibility.png" mode="aspectFit"></image>
						<text>暂无月结资格</text>
						<text class="sub-text">您可以在申请记录中提交申请</text>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 申请记录列表 -->
		<scroll-view v-if="currentTab === 1" class="apply-list" scroll-y @scrolltolower="loadMoreApply"
			refresher-enabled :refresher-triggered="refreshingApply" @refresherrefresh="onRefreshApply">
			<view class="apply-item animate__animated animate__fadeIn" v-for="(item, index) in applyList"
				:key="item.applyId" :style="{ animationDelay: index * 0.1 + 's' }">
				<view class="card-header">
					<view class="title">
						<uni-icons type="paperplane" size="24" color="#FF6B01"></uni-icons>
						<text>月结申请</text>
					</view>
					<view class="status-tag" :class="{
              'pending': item.applyStatus === 0,
              'passed': item.applyStatus === 1,
              'rejected': item.applyStatus === 2,
              'canceled': item.applyStatus === 3
            }">
						{{ getApplyStatusText(item.applyStatus) }}
					</view>
				</view>

				<view class="info-grid">
					<view class="info-item">
						<text class="label">账户类型</text>
						<text class="value">{{ item.accountType === 0 ? '企业账户' : '个人账户' }}</text>
					</view>

					<view class="info-item">
						<text class="label">联系人</text>
						<text class="value">{{ item.name }}</text>
					</view>

					<view class="info-item">
						<text class="label">结算周期</text>
						<text class="value">{{ getCycleText(item.settlementCycle) }}</text>
					</view>

					<view class="info-item">
						<text class="label">申请时间</text>
						<text class="value">{{ item.createTime }}</text>
					</view>
				</view>

				<view class="reject-reason" v-if="item.applyStatus === 2 && item.rejectReason">
					<uni-icons type="info" size="16" color="#FF4D4F"></uni-icons>
					<text class="label">驳回原因:</text>
					<text class="value">{{ item.rejectReason }}</text>
				</view>

				<!-- 操作按钮 -->
				<view class="action-buttons">
					<view class="action-btn" @click="viewApplyDetails(item)">
						<uni-icons type="info" size="16" color="#666666"></uni-icons>
						<text>查看详情</text>
					</view>

					<view class="action-btn danger" v-if="item.applyStatus === 0"
						@click="confirmCancelApply(item.applyId)">
						<uni-icons type="close" size="16" color="#FF4D4F"></uni-icons>
						<text>取消申请</text>
					</view>
				</view>
			</view>

			<!-- 加载更多 -->
			<uni-load-more :status="applyLoadMoreStatus" v-if="applyList.length > 0"></uni-load-more>

			<!-- 空状态 -->
			<view v-if="applyList.length === 0" class="empty-state animate__animated animate__fadeIn">
				<image src="/static/img/empty-apply.png" mode="aspectFit"></image>
				<text>暂无申请记录</text>
				<text class="sub-text">点击下方按钮提交申请</text>
			</view>
		</scroll-view>

		<!-- 底部按钮 -->
		<view class="bottom-btn animate__animated animate__fadeInUp"
			v-if="(!userInfo || userInfo.isMonth !== 1)">
			<button class="add-btn" @click="goApply">
				<uni-icons type="plus" size="20" color="#FFFFFF"></uni-icons>
				<text>提交月结申请</text>
			</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import monthlyApi from '@/api/monthly'
	import userApi from '@/api/user'

	export default {
		data() {
			return {
				currentTab: 0,
				monthlyCode: '',
				// 月结资格列表数据
				eligibilityList: [],
				eligibilityPage: 1,
				eligibilityPageSize: 10,
				hasMoreEligibility: true,
				loadingEligibility: false,
				refreshingEligibility: false,
				// 申请记录列表数据
				applyList: [],
				applyPage: 1,
				applyPageSize: 10,
				hasMoreApply: true,
				loadingApply: false,
				refreshingApply: false,
			}
		},

		computed: {
			...mapState('user', ['userInfo']),
			// 是否有月结资格
			hasEligibility() {
				return this.eligibilityList.some(item => item.status === 0)
			},
			// 监听用户月结资格ID变化
			monthlyId() {
				return this.userInfo?.monthlySettlementEligibilityId
			},
			// 月结资格加载更多状态
			eligibilityLoadMoreStatus() {
				if (this.loadingEligibility) return 'loading'
				if (this.hasMoreEligibility) return 'more'
				return this.eligibilityList.length > 0 ? 'noMore' : 'empty'
			},
			// 申请记录加载更多状态
			applyLoadMoreStatus() {
				if (this.loadingApply) return 'loading'
				if (this.hasMoreApply) return 'more'
				return this.applyList.length > 0 ? 'noMore' : 'empty'
			}
		},

		watch: {
			// 当月结资格ID变化时，重新获取详情
			monthlyId: {
				immediate: true,
				handler(newVal) {
					if (newVal && this.userInfo && this.userInfo.isMonth === 1) {
						this.getMonthlyDetails()
					}
				}
			}
		},

		created() {
			console.log('created - userInfo:', this.userInfo)
			// this.loadInitialData()
		},

		onShow() {
			console.log('onShow - userInfo:', this.userInfo)
			this.loadInitialData()
		},

		methods: {
			// 加载初始数据
			async loadInitialData() {
				if (this.currentTab === 0) {
					// 重置列表状态
					this.eligibilityPage = 1
					this.hasMoreEligibility = true
					this.eligibilityList = []

					// 如果用户有月结资格，先检查有效性
					if (this.userInfo && this.userInfo.isMonth === 1&&this.userInfo.code) {
						try {
							const isEffective = await monthlyApi.checkEffective(this.userInfo
								.monthlySettlementEligibilityId,this.userInfo.code)

							if (isEffective === 0) {
								// 月结资格已失效，更新用户信息
								try {
									await userApi.updateUser({
										userId: this.userInfo.userId,
										isMonth: 0,
										monthlySettlementEligibilityId: null,
										code:null
									})

									// 更新 Vuex 中的用户信息
									await this.$store.dispatch('user/updateUserInfo')

									uni.showToast({
										title: '月结资格已失效',
										icon: 'none'
									})

									// 无论是否有月结资格，都获取列表
									if (this.userInfo) {
										await this.loadEligibilityList()
									}
								} catch (e) {
									console.error('更新用户信息失败:', e)
								}
							} else {
								// 月结资格有效，获取详情
								try {
									const detail = await monthlyApi.getEligibilityById(this.userInfo
										.monthlySettlementEligibilityId)
									console.log(detail)
									if (detail) {
										// 将详情添加到列表的开头
										this.eligibilityList.unshift(detail)

										// 无论是否有月结资格，都获取列表
										if (this.userInfo) {
											await this.loadEligibilityList()
										}
									}
								} catch (e) {
									console.error('获取月结资格详情失败:', e)
								}
							}
						} catch (e) {
							console.error('检查月结资格有效性失败:', e)
							uni.showToast({
								title: '检查月结资格失败',
								icon: 'none'
							})
						}
					} else {
						// 没有月结资格，获取列表
						if (this.userInfo) {
							await this.loadEligibilityList()
						}
					}
				} else {
					// 加载申请记录列表
					this.applyPage = 1
					this.hasMoreApply = true
					this.applyList = []
					console.log('开始加载申请记录列表')
					await this.loadApplyList()
				}
			},

			// 切换标签
			switchTab(tab) {
				if (this.currentTab === tab) return
				this.currentTab = tab
				console.log('切换到标签页:', tab)
				this.loadInitialData()
			},

			// 获取结算周期文本
			getCycleText(cycle) {
				const cycleMap = {
					0: '月结',
					1: '季结',
					2: '半年结'
				}
				return cycleMap[cycle] || '未知'
			},

			// 获取发票要求文本
			getInvoiceText(requirement) {
				const requirementMap = {
					0: '增值税普通发票',
					1: '增值税专用发票',
					2: '其他'
				}
				return requirementMap[requirement] || '未知'
			},

			// 获取申请状态文本
			getApplyStatusText(status) {
				const statusMap = {
					0: '审核中',
					1: '已通过',
					2: '已驳回',
					3: '已取消'
				}
				return statusMap[status] || '未知'
			},

			// 去申请页面
			goApply() {
				uni.navigateTo({
					url: '/views/monthly/apply'
				})
			},

			// 加载月结资格列表
			async loadEligibilityList() {
				if (!this.hasMoreEligibility || this.loadingEligibility) return

				try {
					this.loadingEligibility = true
					console.log('开始获取月结资格列表:', {
						pageNum: this.eligibilityPage,
						pageSize: this.eligibilityPageSize,
						userId: this.userInfo?.userId
					})

					const res = await monthlyApi.getEligibilityPage({
						pageNum: this.eligibilityPage,
						pageSize: this.eligibilityPageSize,
						userId: this.userInfo?.userId
					})

					console.log('获取月结资格列表结果:', res)

					if (!res || typeof res !== 'object') {
						throw new Error('Invalid response data')
					}

					const records = Array.isArray(res.dataList) ? res.dataList : []
					const total = Number(res.totalPages) || 0

					if (this.eligibilityPage === 1) {
						// 如果是第一页，需要保留之前添加的详情记录
						const currentDetail = this.eligibilityList.length !== 0 ? this.eligibilityList[0] : null
						this.eligibilityList = records
						if (currentDetail && !this.eligibilityList.some(item => item.monthlySettlementEligibilityId ===
								currentDetail.monthlySettlementEligibilityId)) {
							this.eligibilityList.unshift(currentDetail)
						}
					} else {
						this.eligibilityList = [...this.eligibilityList, ...records]


					}

					this.hasMoreEligibility = records.length === this.eligibilityPageSize
					this.eligibilityPage++
					console.log(this.eligibilityList)
				} catch (e) {
					console.error('获取月结资格列表失败:', e)
					uni.showToast({
						title: '获取列表失败',
						icon: 'none'
					})
				} finally {
					this.loadingEligibility = false
					if (this.refreshingEligibility) {
						this.refreshingEligibility = false
					}
				}
			},

			// 加载申请记录列表
			async loadApplyList(refresh = false) {
				if (this.loadingApply || (!refresh && !this.hasMoreApply)) return

				try {
					this.loadingApply = true

					if (refresh) {
						this.applyPage = 1
						this.hasMoreApply = true
					}

					const res = await monthlyApi.getApplyPage({
						pageNum: this.applyPage,
						pageSize: this.applyPageSize,
						userId: this.userInfo ? this.userInfo.userId : ''
					})

					const list = res.dataList || []
					console.log('申请列表数据:', list)

					if (refresh) {
						this.applyList = list
					} else {
						this.applyList = [...this.applyList, ...list]
					}

					this.hasMoreApply = list.length >= this.applyPageSize

					if (this.hasMoreApply) {
						this.applyPage++
					}
				} catch (e) {
					console.error('加载申请记录列表失败:', e)
					uni.showToast({
						title: '加载失败，请重试',
						icon: 'none'
					})
				} finally {
					this.loadingApply = false
					if (refresh) {
						this.refreshingApply = false
					}
				}
			},

			// 加载更多月结资格
			loadMoreEligibility() {
				if (this.currentTab === 0) {
					this.loadEligibilityList()
				}
			},

			// 加载更多申请记录
			loadMoreApply() {
				console.log('加载更多申请记录')
				if (this.hasMoreApply && !this.loadingApply) {
					this.loadApplyList()
				}
			},

			// 刷新月结资格列表
			onRefreshEligibility() {
				this.refreshingEligibility = true
				this.eligibilityPage = 1
				this.hasMoreEligibility = true
				this.loadEligibilityList()
			},

			// 刷新申请记录列表
			onRefreshApply() {
				console.log('刷新申请记录列表')
				this.refreshingApply = true
				this.applyPage = 1
				this.hasMoreApply = true
				this.applyList = []
				this.loadApplyList()
			},

			// 查看账单
			viewBill(item) {
				uni.navigateTo({
					url: `/views/monthly/statement?id=${item.monthlySettlementEligibilityId}`
				})
			},

			// 查看使用用户
			viewUsers(item) {
				uni.navigateTo({
					url: `/views/monthly/users?id=${item.monthlySettlementEligibilityId}`
				})
			},

			// 查看详情
			viewDetails(item) {
				uni.navigateTo({
					url: `/views/monthly/details?id=${item.monthlySettlementEligibilityId}`
				})
			},

			// 获取月结资格详情
			async getMonthlyDetails() {
				try {
					uni.showLoading({
						title: '加载中...'
					})

					// 先检查月结资格是否有效
					const isEffective = await monthlyApi.checkEffective(this.userInfo.monthlySettlementEligibilityId,this.userInfo.code)

					if (isEffective === 0) {
						// 月结资格已失效，更新用户信息
						try {
							await userApi.updateUser({
								userId: this.userInfo.userId,
								isMonth: 0,
								monthlySettlementEligibilityId: null,
								code:null
							})

							// 更新 Vuex 中的用户信息
							await this.$store.dispatch('user/updateUserInfo')

							uni.showToast({
								title: '月结资格已失效',
								icon: 'none'
							})

							// 清空列表
							this.eligibilityList = []

							// 获取列表
							this.eligibilityPage = 1
							this.hasMoreEligibility = true
							await this.loadEligibilityList()
							return
						} catch (e) {
							console.error('更新用户信息失败:', e)
						}
					}

					// 获取月结资格详情
					const res = await monthlyApi.getEligibilityById(this.userInfo.monthlySettlementEligibilityId)
					if (res) {
						// 将详情添加到列表中
						this.eligibilityList = [res]
						console.log('月结资格详情:', this.eligibilityList)
					}

					// 获取列表
					this.eligibilityPage = 1
					this.hasMoreEligibility = true
					await this.loadEligibilityList()
				} catch (e) {
					console.error('获取月结资格详情失败:', e)
					uni.showToast({
						title: '获取详情失败',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			},

			// 提交月结资格密码
			async submitMonthlyCode() {
				if (!this.monthlyCode) return

				try {
					uni.showLoading({
						title: '提交中...'
					})
					await userApi.inputCode(this.userInfo.userId, this.monthlyCode)

					// 更新用户信息
					await this.$store.dispatch('user/updateUserInfo')

					uni.showToast({
						title: '密码验证成功',
						icon: 'success'
					})

					// 获取月结资格详情
					await this.getMonthlyDetails()
				} catch (e) {
					console.error('月结资格密码验证失败:', e)
					uni.showToast({
						title: '密码无效，请重试',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
					this.monthlyCode = '' // 清空输入框
				}
			},

			// 查看申请详情
			viewApplyDetails(item) {
				uni.navigateTo({
					url: `/views/monthly/applyDetails?id=${item.applyId}`
				})
			},

			// 确认取消申请
			confirmCancelApply(applyId) {
				// 检查 item 是否存在
				// if (!item) {
				// 	uni.showToast({
				// 		title: '申请数据不存在',
				// 		icon: 'none'
				// 	})
				// 	return
				// }

				console.log(applyId)
				uni.showModal({
					title: '取消申请',
					content: '确定要取消该月结资格申请吗？',
					confirmColor: '#FF6B01',
					success: async (res) => {
						if (res.confirm) {
							// 确保 ID 存在

							if (!applyId) {
								uni.showToast({
									title: '申请ID不存在',
									icon: 'none'
								})
								return
							}
							await this.cancelApply(applyId)
						}
					}
				})
			},

			// 取消申请
			async cancelApply(id) {
				// 检查 ID 是否存在
				if (!id) {
					uni.showToast({
						title: '申请ID不存在',
						icon: 'none'
					})
					return
				}

				try {
					uni.showLoading({
						title: '取消中...'
					})

					// 调用取消申请接口
					const res = await monthlyApi.cancelApply(id)

					if (!res) {
						throw new Error('取消申请失败')
					}

					uni.showToast({
						title: '取消成功',
						icon: 'success'
					})

					// 刷新申请列表
					this.onRefreshApply()
				} catch (e) {
					console.error('取消申请失败:', e)
					uni.showToast({
						title: '取消失败，请重试',
						icon: 'none'
					})
				} finally {
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style lang="scss">
	.monthly-container {
		min-height: 100vh;
		background-color: #F8F8F8;
		padding-bottom: 120rpx;

		.type-tabs {
			display: flex;
			background-color: #FFFFFF;
			padding: 20rpx 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

			.tab-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx 0;
				position: relative;

				uni-icons {
					margin-bottom: 8rpx;
				}

				text {
					font-size: 28rpx;
					color: #666666;
				}

				&.active {
					text {
						color: #FF6B01;
						font-weight: 500;
					}

					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 40rpx;
						height: 4rpx;
						background-color: #FF6B01;
						border-radius: 2rpx;
					}
				}
			}
		}

		.list-container {
			.invitation-card {
				margin: 30rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
				overflow: hidden;

				.card-content {
					padding: 40rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					uni-icons {
						margin-bottom: 20rpx;
					}

					.title {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						margin-bottom: 10rpx;
					}

					.subtitle {
						font-size: 28rpx;
						color: #666666;
						margin-bottom: 30rpx;
					}

					.code-input {
						width: 100%;
						height: 80rpx;
						background-color: #F5F6FA;
						border-radius: 40rpx;
						padding: 0 30rpx;
						font-size: 28rpx;
						margin-bottom: 30rpx;
						text-align: center;
						letter-spacing: 2rpx;
					}

					.submit-btn {
						width: 100%;
						height: 80rpx;
						background: linear-gradient(90deg, #FF6B01, #FF9C01);
						border-radius: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						text {
							font-size: 28rpx;
							color: #FFFFFF;
							font-weight: 500;
						}

						&:disabled {
							opacity: 0.6;
						}
					}
				}
			}

			.list-content {
				.eligibility-list {
					height: calc(100vh - 200rpx);

					.eligibility-item {
						margin: 20rpx 30rpx;
						background-color: #FFFFFF;
						border-radius: 12rpx;
						padding: 30rpx;
						box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

						.card-header {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 20rpx;

							.title {
								display: flex;
								align-items: center;

								uni-icons {
									margin-right: 10rpx;
								}

								text {
									font-size: 32rpx;
									font-weight: 500;
									color: #333333;
								}
							}

							.status-tag {
								font-size: 24rpx;
								padding: 4rpx 16rpx;
								border-radius: 20rpx;
								background-color: rgba(82, 196, 26, 0.1);
								color: #52C41A;

								&.invalid {
									background-color: rgba(255, 77, 79, 0.1);
									color: #FF4D4F;
								}
							}
						}

						.info-row {
							display: flex;
							justify-content: space-between;
							margin-bottom: 16rpx;

							.label {
								font-size: 28rpx;
								color: #666666;
							}

							.value {
								font-size: 28rpx;
								color: #333333;

								&.highlight {
									color: #FF6B01;
									font-weight: 500;

									.unit {
										font-size: 24rpx;
										color: #999999;
										font-weight: normal;
										margin-left: 4rpx;
									}
								}
							}
						}

						.action-buttons {
							display: flex;
							justify-content: flex-end;
							margin-top: 20rpx;

							.action-btn {
								display: flex;
								align-items: center;
								padding: 10rpx 20rpx;
								margin-left: 20rpx;
								background-color: #F5F6FA;
								border-radius: 24rpx;

								uni-icons {
									margin-right: 6rpx;
								}

								text {
									font-size: 24rpx;
									color: #666666;
								}

								&:active {
									opacity: 0.8;
								}
							}
						}
					}
				}
			}
		}

		.apply-list {
			height: calc(100vh - 200rpx);

			.apply-item {
				margin: 20rpx 30rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				padding: 30rpx;
				box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

				.card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;

					.title {
						display: flex;
						align-items: center;

						uni-icons {
							margin-right: 10rpx;
						}

						text {
							font-size: 32rpx;
							font-weight: 500;
							color: #333333;
						}
					}

					.status-tag {
						font-size: 24rpx;
						padding: 4rpx 16rpx;
						border-radius: 20rpx;

						&.pending {
							background-color: rgba(250, 173, 20, 0.1);
							color: #FAAD14;
						}

						&.passed {
							background-color: rgba(82, 196, 26, 0.1);
							color: #52C41A;
						}

						&.rejected {
							background-color: rgba(255, 77, 79, 0.1);
							color: #FF4D4F;
						}

						&.canceled {
							background-color: rgba(153, 153, 153, 0.1);
							color: #999999;
						}
					}
				}

				.info-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 16rpx;
					margin-bottom: 20rpx;

					.info-item {
						.label {
							font-size: 26rpx;
							color: #999999;
							margin-bottom: 4rpx;
							display: block;
						}

						.value {
							font-size: 28rpx;
							color: #333333;
						}
					}
				}

				.reject-reason {
					background-color: #FFF1F0;
					padding: 16rpx;
					border-radius: 8rpx;
					display: flex;
					align-items: flex-start;

					uni-icons {
						margin-right: 8rpx;
						margin-top: 4rpx;
					}

					.label {
						font-size: 26rpx;
						color: #FF4D4F;
						margin-right: 8rpx;
					}

					.value {
						font-size: 26rpx;
						color: #666666;
						flex: 1;
					}
				}

				.action-buttons {
					display: flex;
					margin-top: 20rpx;
					padding-top: 20rpx;
					border-top: 1px solid #F5F5F5;

					.action-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 12rpx 24rpx;
						border-radius: 30rpx;
						background-color: #F8F8F8;
						margin-right: 20rpx;

						uni-icons {
							margin-right: 6rpx;
						}

						text {
							font-size: 24rpx;
							color: #666666;
						}

						&.danger {
							background-color: rgba(255, 77, 79, 0.1);

							text {
								color: #FF4D4F;
							}
						}
					}
				}
			}
		}

		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 100rpx 0;

			image {
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 20rpx;
			}

			text {
				font-size: 30rpx;
				color: #666666;
				margin-bottom: 10rpx;
			}

			.sub-text {
				font-size: 26rpx;
				color: #999999;
			}
		}

		.bottom-btn {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
			box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

			.add-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 88rpx;
				background: linear-gradient(90deg, #FF6B01, #FF9C01);
				border-radius: 44rpx;

				uni-icons {
					margin-right: 10rpx;
				}

				text {
					font-size: 30rpx;
					color: #FFFFFF;
					font-weight: 500;
				}
			}
		}
	}
</style>
<template>
	<view class="statement-container">
		<!-- 导航栏 -->
		<view class="nav-header">
			<view class="tabs-container">
				<view class="tabs">
					<view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)" v-if="isOwner">
						<text>总账单</text>
						<view class="tab-line" v-if="currentTab === 0"></view>
					</view>
					<view class="tab-item" :class="{ active: currentTab === (isOwner ? 1 : 0) }"
						@click="switchTab(isOwner ? 1 : 0)">
						<text>我的账单</text>
						<view class="tab-line" v-if="currentTab === (isOwner ? 1 : 0)"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 摘要信息卡片 -->
		<view class="statement-summary">
			<view class="summary-card">
				<view class="summary-header">
					<text>{{ currentTab === 0 && isOwner ? '账单统计' : '我的交易' }}</text>
					<view class="current-period-badge" v-if="currentPeriodInfo && !currentPeriodInfo.isAll">
						当前第{{ currentPeriodInfo.number }}期
					</view>
				</view>
				<view class="summary-content">
					<view class="summary-item">
						<text class="value">¥ {{ monthlyBill.month }}</text>
						<text class="label">{{ currentTab === 0 && isOwner ? '总交易额' : '我的交易额' }}</text>
					</view>
					<view class="summary-divider"></view>
					<view class="summary-item">
						<text class="value">{{ monthlyBill.number }}</text>
						<text class="label">交易笔数</text>
					</view>
				</view>

				<!-- 修改结算按钮显示条件，增加资格状态判断 -->
				<view class="settle-button-container"
					v-if="currentTab === 0 && isOwner && eligibilityInfo && eligibilityInfo.status === 0&&monthlyBill.treatSettlementAmount!==0.00">
					<button class="settle-button" @click="settleStatements">
						<uni-icons type="weixin" size="20" color="#FFFFFF"></uni-icons>
						<text>微信结算账单</text>
					</button>
				</view>

				<!-- 添加资格失效提示 -->
				<view class="invalid-eligibility-tip"
					v-if="currentTab === 0 && isOwner && eligibilityInfo && eligibilityInfo.status === 1">
					<uni-icons type="info" size="16" color="#FF4D4F"></uni-icons>
					<text>月结资格已失效，无法进行结算操作</text>
				</view>

				<view class="period-info" v-if="currentPeriodInfo && !currentPeriodInfo.isAll">
					<uni-icons type="calendar" size="16" color="#FFFFFF"></uni-icons>
					<text>{{ currentPeriodInfo.startDate }} 至 {{ currentPeriodInfo.endDate }}</text>
				</view>
				<view class="period-info" v-if="currentPeriodInfo && currentPeriodInfo.isAll">
					<uni-icons type="calendar" size="16" color="#FFFFFF"></uni-icons>
					<text>显示全部账单记录</text>
				</view>
			</view>
		</view>

		<!-- 筛选条件卡片 - 简化版 -->
		<view class="filter-card">
			<view class="filter-header" @click="toggleFilterPanel">
				<text>筛选条件</text>
				<uni-icons :type="showFilterPanel ? 'top' : 'bottom'" size="14" color="#666"></uni-icons>
			</view>

			<view class="filter-body" v-if="showFilterPanel">
				<!-- 日期范围选择 -->
				<view class="filter-row">
					<view class="filter-label">
						<uni-icons type="calendar" size="16" color="#FF6B01"></uni-icons>
						<text>时间范围</text>
					</view>
					<view class="date-pickers">
						<picker mode="date" :value="startDate" @change="onStartDateChange" class="date-picker">
							<view class="picker-content">
								<text>{{ displayStartDate || '开始日期' }}</text>
								<uni-icons type="right" size="12" color="#CCCCCC"></uni-icons>
							</view>
						</picker>
						<text class="date-separator">至</text>
						<picker mode="date" :value="endDate" @change="onEndDateChange" class="date-picker">
							<view class="picker-content">
								<text>{{ displayEndDate || '结束日期' }}</text>
								<uni-icons type="right" size="12" color="#CCCCCC"></uni-icons>
							</view>
						</picker>
					</view>
				</view>

				<!-- 类型筛选 -->
				<view class="filter-row">
					<view class="filter-label">
						<uni-icons type="list" size="16" color="#FF6B01"></uni-icons>
						<text>交易类型</text>
					</view>
					<view class="filter-tabs">
						<view class="filter-tab" :class="{ active: selectedType === null }" @click="selectType(null)">
							全部
						</view>
						<view class="filter-tab" :class="{ active: selectedType === 0 }" @click="selectType(0)">
							支付
						</view>
						<view class="filter-tab" :class="{ active: selectedType === 1 }" @click="selectType(1)">
							退款
						</view>
					</view>
				</view>

				<!-- 筛选按钮 -->
				<view class="filter-actions">
					<button class="filter-btn reset" @click="resetFilters">
						<uni-icons type="reload" size="14" color="#666666"></uni-icons>
						<text>重置</text>
					</button>
					<button class="filter-btn apply" @click="applyFilters">
						<uni-icons type="search" size="14" color="#FFFFFF"></uni-icons>
						<text>应用筛选</text>
					</button>
				</view>
			</view>
		</view>

		<!-- 修改周期选择器显示逻辑 -->
		<view class="cycle-selector" v-if="hasValidCycles">
			<view class="cycle-header" @click="toggleCyclePanel">
				<text>历史周期查询</text>
				<text class="current-cycle">{{ selectedCycleName }}</text>
				<uni-icons :type="showCyclePanel ? 'top' : 'bottom'" size="14" color="#666"></uni-icons>
			</view>

			<view class="cycle-panel" v-if="showCyclePanel">
				<scroll-view scroll-y class="cycle-list">
					<view class="cycle-item" v-for="(cycle, index) in settlementCycles" :key="index"
						:class="{ active: currentCycleIndex === index }" @click="selectCycle(index)">
						<view class="cycle-name">第{{ cycle.number }}期</view>
						<view class="cycle-date">{{ cycle.startDate }} 至 {{ cycle.endDate }}</view>
						<view class="cycle-status" v-if="cycle.isCurrent">当前周期</view>
						<view class="history-badge" v-if="!cycle.isCurrent">历史周期</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 添加无周期提示 -->
		<view class="no-cycles-tip" v-if="!hasValidCycles">
			<uni-icons type="info" size="16" color="#FAAD14"></uni-icons>
			<text>当前月结资格暂无历史周期数据</text>
		</view>

		<!-- 账单列表标题 -->
		<view class="list-header">
			<text>账单明细</text>
			<text class="list-count">共 {{ monthlyBill.number }} 笔</text>
		</view>

		<!-- 账单列表 -->
		<scroll-view scroll-y class="statement-list-container" @scrolltolower="loadMoreData"
			:style="{ height: 'calc(100vh - 450rpx)' }">
			<view class="statement-list">
				<!-- 账单项 -->
				<view class="statement-item" v-for="(item, index) in statementList" :key="item.monthlyStatementId"
					@click="viewStatementDetail(item)" :class="{ 'animate-in': index < 10 }"
					:style="{ 'animation-delay': index * 0.05 + 's' }">
					<view class="item-header">
						<view class="order-info">
							<text class="order-id">订单号: {{ item.orderId }}</text>
							<text class="time">{{ item.createTime }}</text>
						</view>
						<view class="type-tag" :class="{ refund: item.type === 1 }">
							{{ item.type === 0 ? '支付' : '退款' }}
						</view>
					</view>

					<view class="item-content">
						<text class="amount" :class="{ refund: item.type === 1 }">
							{{ item.type === 0 ? '+' : '-' }} ¥{{ item.amount }}
						</text>
					</view>

					<view class="item-footer">
						<view class="payment-status" :class="{ paid: item.isUserPays === 1 }"
							v-if="item.isUserPays === 1 || item.type === 0">
							{{ item.isUserPays === 1 ? '已结算' : '未结算' }}
						</view>
						<view class="flex-space"></view>
						<view class="detail-link">
							<text>查看详情</text>
							<uni-icons type="right" size="12" color="#999999"></uni-icons>
						</view>
					</view>
				</view>

				<!-- 添加底部加载状态指示器 -->
				<view class="load-more" v-if="loading && hasMoreData">
					<view class="loading-spinner"></view>
					<text>加载更多...</text>
				</view>

				<!-- 添加无更多数据提示 -->
				<view class="no-more-data" v-if="!hasMoreData && statementList.length > 0">
					<text>已经到底啦</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import monthlyApi from '@/api/monthly'
	import statementApi from '@/api/statement'
	import request from '@/utils/request'
	import paymentApi from '@/api/payment'
	import wxpayApi from '@/api/wechat.js'
	export default {
		data() {
			return {
				eligibilityId: '', // 月结资格ID
				eligibilityInfo: null, // 月结资格信息

				userInfo: uni.getStorageSync('userInfo') || {}, // 当前用户信息

				showTotalBillTab: false, // 是否显示总账单选项卡

				// 标签切换
				currentTab: 0, // 当前选中的标签 0-总账单 1-我的账单

				// 筛选条件
				showFilterPanel: false,
				startDate: '',
				endDate: '',
				displayStartDate: '',
				displayEndDate: '',
				selectedType: null, // 0-支付 1-退款 null-全部

				// 分页加载
				currentPage: 1,
				pageSize: 5,
				hasMoreData: true,
				loading: false,

				monthlyBill: {},

				// 数据
				statementList: [],
				totalAmount: 0, // 总交易金额

				// 添加周期相关数据的初始值
				settlementCycles: [], // 所有结算周期
				currentCycleIndex: 0, // 当前选中的周期索引
				hasAllPeriodsOption: false, // 是否已添加"全部"选项
				showCyclePanel: false, // 控制周期选择面板显示

				// 添加支付相关状态
				paymentLoading: false
			}
		},

		computed: {
			// 判断是否为资格拥有者
			isOwner() {
				const isOwner = this.eligibilityInfo &&
					this.userInfo &&
					this.eligibilityInfo.userId === this.userInfo.userId
				console.log('isOwner计算:', {
					eligibilityInfo: this.eligibilityInfo,
					userInfo: this.userInfo,
					isOwner
				})
				return isOwner
			},

			// 加载更多状态
			loadMoreStatus() {
				if (this.loading) return 'loading'
				if (this.hasMoreData) return 'more'
				return 'noMore'
			},

			// 当前选中周期的名称 - 修改处理无周期情况
			selectedCycleName() {
				if (this.settlementCycles.length === 0) return '暂无周期'

				const cycle = this.settlementCycles[this.currentCycleIndex]
				if (cycle.isAll) return '全部'
				return `第${cycle.number}期 (${cycle.startDate} 至 ${cycle.endDate})`
			},

			// 是否有可用的周期
			hasValidCycles() {
				// 排除只有"全部"选项的情况
				if (this.settlementCycles.length === 1 && this.settlementCycles[0].isAll) {
					return false
				}
				return this.settlementCycles.length > 0
			},

			// 当前期数信息
			currentPeriodInfo() {
				if (this.settlementCycles.length === 0) return null
				return this.settlementCycles[this.currentCycleIndex]
			},

			// 是否有未结算的账单
			hasUnpaidStatements() {
				// 如果没有账单或者所有账单都已结算，也允许点击结算按钮
				return true
			},

			// 计算未结算金额
			unpaidAmount() {
				const unpaidAmount = this.statementList
					.filter(item => item.isUserPays === 0)
					.reduce((total, item) => {
						const amount = item.type === 1 ? -item.amount : item.amount
						return total + amount
					}, 0)

				// 如果没有未结算账单，返回总金额
				return unpaidAmount > 0 ? unpaidAmount : this.totalAmount
			}
		},

		// 修改生命周期方法
		async onLoad(options) {
			console.log('onLoad options:', options)

			if (options.id) {
				this.eligibilityId = options.id

				try {
					console.log('开始获取月结资格信息')
					// 获取月结资格信息
					await this.getEligibilityInfo()

					console.log('开始计算结算周期')
					// 计算所有结算周期
					this.calculateAllSettlementCycles()

					console.log('开始选择当前周期')
					// 选择当前周期
					this.selectCurrentCycle()

					// 加载账单数据
					this.loadStatements(true)

					this.getAllPrice();
				} catch (e) {
					console.error('初始化失败:', e)
				}
			}
		},

		methods: {
			async getAllPrice() {

				const userId = this.currentTab === 1 || !this.isOwner ? this.userInfo.userId : ''
				const startTime = this.startDate || ''
				const endTime = this.endDate || ''
				if (this.currentTab === 0) {
					const res = await statementApi.getAllPrice(this.eligibilityId, startTime, endTime)

					if (res) {
						this.monthlyBill = res
					}
				} else {
					const res = await statementApi.getAllPrice(this.eligibilityId, startTime, endTime, userId)
					if (res) {
						this.monthlyBill = res
					}
				}

			},

			// 获取月结资格信息
			async getEligibilityInfo() {
				try {
					uni.showLoading({
						title: '加载中...'
					})
					const res = await monthlyApi.getEligibilityById(this.eligibilityId)

					if (res) {
						this.eligibilityInfo = res
						console.log('获取到的月结资格信息:', {
							eligibilityInfo: this.eligibilityInfo,
							userInfo: this.userInfo,
							isOwner: this.isOwner
						})

						// 如果当前用户不是月结资格拥有者，直接显示"我的账单"页签
						if (!this.isOwner) {
							this.currentTab = 0
						} else {
							this.currentTab = 0
							this.showTotalBillTab = true
						}
					}
				} catch (e) {
					console.error('获取月结资格信息失败:', e)
				} finally {
					uni.hideLoading()
				}
			},

			// 修改标签切换方法
			switchTab(tab) {
				if (this.currentTab === tab) return

				this.currentTab = tab
				this.currentPage = 1
				this.statementList = []
				this.hasMoreData = true

				// 重新加载账单数据，保留当前选中的周期和筛选条件
				this.loadStatements(true)
				this.getAllPrice();
			},

			// 切换筛选面板
			toggleFilterPanel() {
				this.showFilterPanel = !this.showFilterPanel
			},

			// 修改开始日期选择处理函数
			onStartDateChange(e) {
				this.startDate = e.detail.value
				this.displayStartDate = e.detail.value

				// 如果已选择了结束日期，并且开始日期晚于结束日期，调整结束日期
				if (this.endDate && this.startDate > this.endDate) {
					this.endDate = this.startDate
					this.displayEndDate = this.startDate
					uni.showToast({
						title: '已自动调整结束日期',
						icon: 'none'
					})
				}
			},

			// 修改结束日期选择处理函数
			onEndDateChange(e) {
				const selectedEndDate = e.detail.value

				// 检查结束日期是否早于开始日期
				if (this.startDate && selectedEndDate < this.startDate) {
					uni.showToast({
						title: '结束日期不能早于开始日期',
						icon: 'none'
					})
					return
				}

				this.endDate = selectedEndDate
				this.displayEndDate = selectedEndDate
			},

			// 选择交易类型
			selectType(type) {
				this.selectedType = type
			},

			// 修改应用筛选方法，确保日期有效
			applyFilters() {
				// 验证日期
				if (this.startDate && this.endDate && this.startDate > this.endDate) {
					uni.showToast({
						title: '结束日期不能早于开始日期',
						icon: 'none'
					})
					return
				}

				// 关闭筛选面板
				this.showFilterPanel = false

				// 重置分页
				this.currentPage = 1
				this.hasMoreData = true

				// 重新加载数据
				this.loadStatements(true)
			},

			// 重置筛选条件时也处理日期关系
			resetFilters() {
				this.startDate = ''
				this.endDate = ''
				this.displayStartDate = ''
				this.displayEndDate = ''
				this.selectedType = null
			},

			// 修改加载账单数据方法
			async loadStatements(refresh = false) {
				if (refresh) {
					this.currentPage = 1
					this.hasMoreData = true
				}

				if (!this.hasMoreData && !refresh) return

				try {
					this.loading = true

					// 获取API所需的所有参数，注意使用正确的变量名
					const pageNum = this.currentPage;
					const pageSize = this.pageSize;
					const monthlySettlementEligibilityId = this.eligibilityId;
					const userId = this.currentTab === 1 || !this.isOwner ? this.userInfo.userId : '';
					const startTime = this.startDate || '';
					const endTime = this.endDate || '';
					const type = this.selectedType !== null ? this.selectedType : null;

					// 输出日志，帮助调试
					console.log('加载账单参数:', {
						pageNum,
						pageSize,
						monthlySettlementEligibilityId,
						userId,
						startTime,
						endTime,
						type
					});

					// 使用原有API调用方式，传入单独的参数
					const res = await statementApi.pageStatement(
						pageNum,
						pageSize,
						monthlySettlementEligibilityId,
						userId,
						startTime,
						endTime,
						type
					);

					// 处理响应数据
					if (res && res.dataList && Array.isArray(res.dataList)) {
						// 更新列表数据
						if (refresh) {
							this.statementList = [...res.dataList];
						} else {
							this.statementList = [...this.statementList, ...res.dataList];
						}

						// 更新分页状态
						this.hasMoreData = res.dataList.length >= this.pageSize;

						console.log(
							`已加载账单数据，当前页: ${pageNum}, 数据条数: ${res.dataList.length}, 是否有更多: ${this.hasMoreData}`);
					} else {
						if (refresh) {
							this.statementList = [];
						}
						this.hasMoreData = false;
					}
				} catch (error) {
					console.error('加载账单数据异常:', error);
					uni.showToast({
						title: '加载账单数据失败',
						icon: 'none'
					});
					this.hasMoreData = false;
				} finally {
					this.loading = false;
				}
			},

			// 查看账单详情
			viewStatementDetail(item) {
				uni.navigateTo({
					url: `/views/monthly/statement-detail?id=${item.monthlyStatementId}`
				})
			},

			// 选择当前周期
			selectCurrentCycle() {
				console.log('开始选择当前周期')
				if (this.settlementCycles.length === 0) {
					console.warn('没有可选择的周期')
					return
				}

				// 找到当前周期的索引
				const currentIndex = this.settlementCycles.findIndex(cycle => cycle.isCurrent)
				console.log('当前周期索引:', currentIndex)

				if (currentIndex !== -1) {
					this.currentCycleIndex = currentIndex
					const cycle = this.settlementCycles[this.currentCycleIndex]
					this.startDate = cycle.startDate
					this.endDate = cycle.endDate
					this.displayStartDate = cycle.startDate
					this.displayEndDate = cycle.endDate
					console.log('已选择当前周期:', this.settlementCycles[currentIndex])
				}

			},

			// 添加日期格式化方法
			// formatDate(date) {
			// 	if (!date) return ''

			// 	const d = new Date(date)
			// 	const year = d.getFullYear()
			// 	const month = String(d.getMonth() + 1).padStart(2, '0')
			// 	const day = String(d.getDate()).padStart(2, '0')

			// 	return `${year}-${month}-${day}`
			// },

			// calculateAllSettlementCycles() {
			//   console.log('开始计算历史周期，当前资格信息:', this.eligibilityInfo);

			//   if (!this.eligibilityInfo || !this.eligibilityInfo.createTime) {
			//     console.warn('月结资格信息不完整，无法计算周期');
			//     this.settlementCycles = [];
			//     return;
			//   }

			//   const { settlementCycle, createTime } = this.eligibilityInfo;
			//   const settlementDate = 15; // 固定结算日
			//   const cycleNumberMap = { 0: 1, 1: 3, 2: 6 };
			//   const cycleNumber = cycleNumberMap[settlementCycle] || 1;

			//   const createdAt = new Date(createTime.replace(/-/g, '/'));
			//   const today = new Date();
			//   today.setHours(0, 0, 0, 0);

			//   let cycles = [];
			//   let currentStart = new Date(createdAt);
			//   currentStart.setHours(0, 0, 0, 0);

			//   // 生成周期核心逻辑
			//   // 新增配置参数
			//   const EXTRA_CYCLES = 2; // 遇到当前周期后额外生成的周期数

			//   while (currentStart <= today || extraCount > 0) {
			//     const cycleEnd = this.calculateCycleEnd(currentStart, cycleNumber);
			//     cycleEnd.setHours(23, 59, 59, 999);

			//     // 判断当前周期
			//     const isCurrent = today <= cycleEnd;

			//     cycles.push({
			//       startDate: this.formatDate(currentStart),
			//       endDate: this.formatDate(cycleEnd),
			//       isCurrent
			//     });

			//     // 遇到当前周期开始计数
			//     if (isCurrent && extraCount === null) {
			//       extraCount = EXTRA_CYCLES;
			//     }

			//     // 在遇到当前周期后继续生成指定数量的周期
			//     if (extraCount !== null) {
			//       if (extraCount <= 0) break;
			//       extraCount--;
			//     }

			//     // 准备下一周期
			//     currentStart = new Date(cycleEnd);
			//     currentStart.setDate(currentStart.getDate() + 1);
			//     currentStart.setHours(0, 0, 0, 0);
			//   }
			// //   while (currentStart <= today) {
			// //     const cycleEnd = this.calculateCycleEnd(currentStart, cycleNumber);
			// //     cycleEnd.setHours(23, 59, 59, 999); // 包含当天

			// //     // 判断当前周期
			// //     const isCurrent = today <= cycleEnd;

			// //     cycles.push({
			// //       startDate: this.formatDate(currentStart),
			// //       endDate: this.formatDate(cycleEnd),
			// //       isCurrent
			// //     });

			// //     // 遇到当前周期停止生成
			// //     if (isCurrent) break;

			// //     // 准备下一个周期（结束日期次日）
			// //     currentStart = new Date(cycleEnd);
			// //     currentStart.setDate(currentStart.getDate() + 1);
			// //     currentStart.setHours(0, 0, 0, 0);
			// //   }

			//   // 按时间倒序排列并添加序号
			//   this.settlementCycles = cycles.reverse().map((item, index) => ({
			//     number: index + 1,
			//     ...item
			//   }));

			//   console.log('最终生成的结算周期:', this.settlementCycles);
			// },

			// // 计算周期结束日期（强制设置为15号）
			// calculateCycleEnd(startDate, cycleNumber) {
			//   const end = new Date(startDate);
			//   end.setMonth(end.getMonth() + cycleNumber);
			//   end.setDate(15); // 强制设置为当月15号

			//   // 处理跨年情况（12月+cycleNumber可能会超出）
			//   if (end.getMonth() !== (startDate.getMonth() + cycleNumber) % 12) {
			//     end.setFullYear(startDate.getFullYear() + Math.floor((startDate.getMonth() + cycleNumber) / 12));
			//   }
			//   return end;
			// },

			// // 保持原有格式方法
			// formatDate(date) {
			//   return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
			// },

			calculateAllSettlementCycles() {
				console.log('开始计算结算周期（最终排序修正版）');

				// 配置参数
				const SETTLEMENT_DAY = 15; // 固定结算日
				const FUTURE_CYCLES = 0; // 展示的未来周期数
				const MAX_LOOP = 100; // 安全计数器

				// 初始化数据
				this.settlementCycles = [];
				if (!this.eligibilityInfo?.createTime) {
					console.warn('月结资格信息不完整');
					return;
				}

				// 解析输入参数
				const {
					createTime,
					settlementCycle
				} = this.eligibilityInfo;
				const cycleMonths = {
					0: 1,
					1: 3,
					2: 6
				} [settlementCycle] || 1;
				const startDate = new Date(createTime.replace(/-/g, '/'));
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				// 准备数据结构
				let history = []; // 历史周期（正序存储）
				let current = null; // 当前周期
				let future = []; // 未来周期（正序存储）

				// 核心算法
				let cursor = new Date(startDate);
				let loopCount = 0;

				while (loopCount++ < MAX_LOOP) {
					// 计算周期结束日（强制15号）
					const cycleEnd = new Date(cursor);
					cycleEnd.setMonth(cycleEnd.getMonth() + cycleMonths);
					cycleEnd.setDate(SETTLEMENT_DAY);
					cycleEnd.setHours(23, 59, 59, 999);

					// 创建周期对象
					const cycle = {
						start: new Date(cursor),
						end: new Date(cycleEnd),
						isCurrent: cursor <= today && today <= cycleEnd,
						isFuture: cursor > today
					};

					// 分类存储
					if (cycle.end < today) {
						history.push(cycle); // 历史周期按生成顺序正序存储
					} else if (cycle.isCurrent) {
						current = cycle;
					} else {
						future.push(cycle);
					}

					// 移动游标到下一周期开始
					cursor = new Date(cycleEnd);
					cursor.setDate(cursor.getDate() + 1);
					cursor.setHours(0, 0, 0, 0);

					// 终止条件：生成足够未来周期且游标超过今天
					if (future.length >= FUTURE_CYCLES && cursor > today) break;
				}

				// 合并结果（历史正序 → 当前 → 未来正序）
				const final = [...history]; // 历史按时间正序
				if (current) final.push(current);
				final.push(...future.slice(0, FUTURE_CYCLES));
				this.startDate = current.startDate
				this.endDate = current.endDate
				this.displayStartDate = current.startDate
				this.displayEndDate = current.endDate
				// 添加序号
				this.settlementCycles = final.map((c, i) => ({
					number: i + 1,
					startDate: this.formatDate(c.start),
					endDate: this.formatDate(c.end),
					isCurrent: c.isCurrent,
					isFuture: c.isFuture
				}));

				console.log('修正排序后的周期数据:', this.settlementCycles);
			},

			// 日期格式化保持原样
			formatDate(date) {
				const pad = n => n.toString().padStart(2, '0');
				return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
			},

			// // 计算所有历史结算周期 - 添加更多日志
			// calculateAllSettlementCycles() {
			// 	console.log('开始计算历史周期，当前资格信息:', this.eligibilityInfo)

			// 	if (!this.eligibilityInfo || !this.eligibilityInfo.createTime) {
			// 		console.warn('月结资格信息不完整，无法计算周期')
			// 		this.settlementCycles = []
			// 		return
			// 	}

			// 	const {
			// 		settlementCycle,
			// 		createTime,
			// 		tradeNumber
			// 	} = this.eligibilityInfo
			// 	console.log('周期计算参数:', {
			// 		settlementCycle,
			// 		createTime,
			// 		tradeNumber
			// 	})

			// 	// 解析创建时间
			// 	const createdAt = new Date(createTime.replace(/-/g, '/'))
			// 	const today = new Date()

			// 	// 如果资格已失效，则不计算
			// 	if (this.eligibilityInfo.status === 1) {
			// 		console.log('月结资格已失效')
			// 		this.settlementCycles = []
			// 		return
			// 	}

			// 	let cycles = []
			// 	let cyclesCount = 0

			// 	// 根据不同的结算周期计算
			// 	switch (settlementCycle) {
			// 		case 0: // 月结
			// 			cyclesCount = this.calculateMonthlyCycles(createdAt, today)
			// 			break
			// 		case 1: // 季结
			// 			cyclesCount = this.calculateQuarterlyCycles(createdAt, today)
			// 			break
			// 		case 2: // 半年结
			// 			cyclesCount = this.calculateHalfYearlyCycles(createdAt, today)
			// 			break
			// 		default:
			// 			cyclesCount = this.calculateMonthlyCycles(createdAt, today)
			// 	}

			// 	console.log('计算得到的周期数:', cyclesCount)

			// 	// 生成所有历史周期
			// 	for (let i = 0; i < cyclesCount; i++) {
			// 		const cyclePeriod = this.calculateCyclePeriod(createdAt, i, settlementCycle)
			// 		cycles.push({
			// 			number: cyclesCount - i,
			// 			startDate: this.formatDate(cyclePeriod.start),
			// 			endDate: this.formatDate(cyclePeriod.end),
			// 			isCurrent: cyclePeriod.isCurrent
			// 		})
			// 	}

			// 	this.settlementCycles = cycles
			// 	console.log('生成的周期列表长度:', this.settlementCycles.length)

			// 	// 如果没有生成任何周期，添加提示
			// 	if (this.settlementCycles.length === 0) {
			// 		console.warn('未计算出任何周期，可能是新创建的月结资格')
			// 	}
			// },

			// 计算周期的起止时间
			// calculateCyclePeriod(startDate, cycleIndex, settlementCycle) {
			// 	// 克隆日期，避免修改原始日期
			// 	const start = new Date(startDate.getTime())
			// 	const end = new Date(startDate.getTime())
			// 	const today = new Date()

			// 	// 月结的月份数
			// 	let monthsPerCycle = 1; // 默认月结
			// 	if (settlementCycle === 1) monthsPerCycle = 3; // 季结
			// 	if (settlementCycle === 2) monthsPerCycle = 6; // 半年结

			// 	// 设置开始日期 - 向后推指定月数
			// 	start.setMonth(start.getMonth() + cycleIndex * monthsPerCycle)

			// 	// 设置结束日期 - 开始日期后推指定月数，再减一天
			// 	end.setMonth(start.getMonth() + monthsPerCycle)
			// 	end.setDate(end.getDate() - 1)

			// 	// 判断是否为当前周期
			// 	const isCurrent = today >= start && today <= end

			// 	return {
			// 		start,
			// 		end,
			// 		isCurrent
			// 	}
			// },

			// 计算月结周期数
			// calculateMonthlyCycles(startDate, today) {
			// 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
			// 		today.getMonth() - startDate.getMonth()
			// 	return months + 1 // 包含当前月
			// },

			// // 计算季结周期数
			// calculateQuarterlyCycles(startDate, today) {
			// 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
			// 		today.getMonth() - startDate.getMonth()
			// 	return Math.floor(months / 3) + 1 // 每3个月一个周期
			// },

			// // 计算半年结周期数
			// calculateHalfYearlyCycles(startDate, today) {
			// 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
			// 		today.getMonth() - startDate.getMonth()
			// 	return Math.floor(months / 6) + 1 // 每6个月一个周期
			// },

			// 修改周期选择方法，确保在不同标签下正确工作
			selectCycle(index) {
				this.currentCycleIndex = index
				this.showCyclePanel = false

				const cycle = this.settlementCycles[index]

				// 如果选择"全部"选项
				if (cycle.isAll) {
					this.startDate = ''
					this.endDate = ''
					this.displayStartDate = ''
					this.displayEndDate = ''
				} else {
					// 设置日期范围为选中周期的范围，确保起止日期正确
					this.startDate = cycle.startDate
					this.endDate = cycle.endDate
					this.displayStartDate = cycle.startDate
					this.displayEndDate = cycle.endDate

					// 验证日期有效性（虽然从周期生成的日期应该总是有效的）
					if (this.startDate > this.endDate) {
						console.error('周期日期错误:', {
							startDate: this.startDate,
							endDate: this.endDate
						})
						uni.showToast({
							title: '周期日期错误，请手动选择日期',
							icon: 'none'
						})
						return
					}
				}

				// 重新加载数据
				this.currentPage = 1
				this.hasMoreData = true
				this.loadStatements(true)
				this.getAllPrice();
			},

			// 添加全部周期选项 - 修改判断逻辑
			toggleCyclePanel() {
				// 如果没有有效周期，不需要切换面板
				if (this.settlementCycles.length === 0) {
					uni.showToast({
						title: '暂无历史周期',
						icon: 'none'
					})
					return
				}

				this.showCyclePanel = !this.showCyclePanel

				// 只有当有多个周期时才添加"全部"选项
				if (this.showCyclePanel && this.settlementCycles.length > 1 && !this.hasAllPeriodsOption) {
					this.settlementCycles.unshift({
						number: '全部',
						startDate: '',
						endDate: '',
						isAll: true
					})
					this.hasAllPeriodsOption = true
				}
			},

			// 修改结算账单方法
			async settleStatements() {
				if (this.paymentLoading) return

				try {
					this.paymentLoading = true

					// 1. 修复这里 - uni.showModal 不能使用解构赋值
					const res = await uni.showModal({
						title: '结算确认',
						content: `确认支付 ¥${this.monthlyBill.treatSettlementAmount} 的账单？`,
						confirmText: '确认支付',
						confirmColor: '#07C160'
					})

					console.log('确认框结果:', res)

					// 如果用户取消，结束流程
					if (!res.confirm) {
						this.paymentLoading = false
						return
					}

					// 显示加载提示
					uni.showLoading({
						title: '支付处理中',
						mask: true
					})

					// 处理支付逻辑（保留您现有的代码）
					let orderId = 'TEST' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const openId = uni.getStorageSync('openId');
					const payResult = await wxpayApi.processPayment(openId, orderId, this.monthlyBill
						.treatSettlementAmount,
						"用户" + this.userInfo.userName + "支付" + this.startDate + '至' +  this.endDate +
						'月结账单，共:' + this.monthlyBill.treatSettlementAmount)
					// const payResult = await wxpayApi.processPayment(openId, orderId, 0.01,
					// 	"用户" + this.userInfo.userName + "支付" + this.startDate + '至' + this.endDate +
					// 	'月结账单，共:' + this.monthlyBill.treatSettlementAmount)
					if (payResult.success) {
						const startTime = this.startDate || ''
						const endTime = this.endDate || ''
						const payResult = await statementApi.payBills(this.eligibilityId, startTime, endTime)

						if (payResult) {
							// 延迟2秒模拟支付过程
							setTimeout(() => {
								uni.hideLoading()
								uni.showToast({
									title: '结算成功',
									icon: 'success'
								})

								// 刷新数据
								setTimeout(() => {
									this.refreshData()
									this.paymentLoading = false
								}, 1500)
							}, 2000)
						} else {
							throw new Error('支付账单失败')
						}
					} else {
						// 支付失败
						console.log("支付结果:", payResult.message);
						if (!payResult.canceled) {
							uni.showToast({
								title: payResult.message,
								icon: 'none'
							});
						}
						return; // 支付失败则不继续执行后续创建订单的代码
					}
				} catch (e) {
					console.error('支付失败:', e)
					uni.hideLoading()
					uni.showToast({
						title: '支付失败: ' + (e.message || '未知错误'),
						icon: 'none'
					})
					this.paymentLoading = false
				}
			},

			// 添加loadMoreData方法（负责触发加载更多）
			loadMoreData() {
				// 如果正在加载或没有更多数据，则不处理
				if (this.loading || !this.hasMoreData) {
					return;
				}

				console.log('触发加载更多数据...');
				// 页码加1
				this.currentPage++;
				// 调用加载方法，传入false表示追加模式
				this.loadStatements(false);
			},

			// 刷新数据时重置分页状态
			refreshData() {
				this.loadStatements(true);
			}
		}
	}
</script>

<style lang="scss">
	.statement-container {
		background-color: #F5F7FA;
		min-height: 100vh;
		padding-bottom: 30rpx;
	}

	// 导航栏样式优化
	.nav-header {
		background: #FFFFFF;
		padding: 20rpx 0;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);

		.tabs-container {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 15%;
				right: 15%;
				height: 1px;
				background: linear-gradient(to right,
						rgba(0, 0, 0, 0),
						rgba(0, 0, 0, 0.05),
						rgba(0, 0, 0, 0));
			}
		}

		.tabs {
			display: flex;
			justify-content: center;
			padding: 0 40rpx;

			.tab-item {
				position: relative;
				padding: 20rpx 40rpx;
				margin: 0 30rpx;

				text {
					font-size: 32rpx;
					color: #666666;
					font-weight: 400;
					transition: all 0.3s;
				}

				.tab-line {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 60rpx;
					height: 6rpx;
					background: linear-gradient(90deg, #FF6B01, #FF9C01);
					border-radius: 3rpx;
					transition: all 0.3s ease;
					box-shadow: 0 2rpx 8rpx rgba(255, 107, 1, 0.3);
				}

				&.active {
					text {
						color: #FF6B01;
						font-weight: 500;
					}
				}

				&:active {
					opacity: 0.7;
				}
			}
		}
	}

	// 摘要信息优化
	.statement-summary {
		padding: 20rpx 30rpx;

		.summary-card {
			background: linear-gradient(135deg, #FF6B01, #FF9C01);
			background-size: cover;
			border-radius: 16rpx;
			padding: 30rpx;
			box-shadow: 0 8rpx 20rpx rgba(255, 107, 1, 0.15);
			overflow: hidden;

			.summary-header {
				padding: 30rpx;
				color: rgba(255, 255, 255, 0.9);
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 32rpx;
					font-weight: 500;
				}

				.current-period-badge {
					padding: 8rpx 20rpx;
					background: rgba(255, 255, 255, 0.2);
					border-radius: 30rpx;
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}

			.summary-content {
				display: flex;
				justify-content: space-around;
				padding: 20rpx 30rpx 40rpx;

				.summary-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.value {
						font-size: 48rpx;
						color: #FFFFFF;
						font-weight: 600;
						margin-bottom: 10rpx;
						text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
					}

					.label {
						font-size: 26rpx;
						color: rgba(255, 255, 255, 0.8);
					}
				}

				.summary-divider {
					width: 2rpx;
					background: rgba(255, 255, 255, 0.3);
					margin: 0 30rpx;
				}
			}

			// 优化结算按钮样式
			.settle-button-container {
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 1px solid rgba(255, 255, 255, 0.1);
			}

			.settle-button {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				background-color: #07C160; // 微信支付绿色
				border-radius: 40rpx;
				color: #FFFFFF;
				font-size: 30rpx;
				font-weight: 500;
				padding: 0 40rpx;
				border: none;
				width: 100%;

				uni-icons {
					margin-right: 10rpx;
				}

				&:active {
					background-color: #06AD56;
				}
			}

			// 添加周期信息样式
			.period-info {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 1px solid rgba(255, 255, 255, 0.1);

				text {
					font-size: 24rpx;
					color: #FFFFFF;
					margin-left: 10rpx;
				}
			}
		}
	}

	// 筛选卡片
	.filter-card {
		margin: 20rpx 30rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		overflow: hidden;

		.filter-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.03);

			text {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}

			&:active {
				background: #FAFAFA;
			}
		}

		.filter-body {
			padding: 20rpx 30rpx;

			.filter-row {
				margin-bottom: 30rpx;

				.filter-label {
					display: flex;
					align-items: center;
					margin-bottom: 16rpx;

					uni-icons {
						margin-right: 10rpx;
					}

					text {
						font-size: 28rpx;
						color: #333333;
					}
				}

				.date-pickers {
					display: flex;
					align-items: center;

					.date-picker {
						flex: 1;
						background: #F8F9FA;
						border-radius: 12rpx;
						padding: 16rpx 20rpx;

						.picker-content {
							display: flex;
							justify-content: space-between;
							align-items: center;

							text {
								font-size: 26rpx;
								color: #333333;
							}
						}
					}

					.date-separator {
						margin: 0 20rpx;
						font-size: 26rpx;
						color: #999999;
					}
				}

				.filter-tabs {
					display: flex;
					flex-wrap: wrap;

					.filter-tab {
						padding: 12rpx 36rpx;
						background: #F8F9FA;
						border-radius: 40rpx;
						margin-right: 20rpx;
						margin-bottom: 16rpx;
						font-size: 26rpx;
						color: #666666;
						transition: all 0.3s;

						&.active {
							background: rgba(255, 107, 1, 0.1);
							color: #FF6B01;
							font-weight: 500;
						}

						&:active {
							transform: scale(0.98);
							opacity: 0.9;
						}
					}
				}
			}

			.filter-actions {
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;

				.filter-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 16rpx 40rpx;
					border-radius: 40rpx;
					font-size: 28rpx;
					margin-left: 20rpx;

					uni-icons {
						margin-right: 8rpx;
					}

					&.reset {
						background: #F5F6FA;
						color: #666666;
						border: 1px solid rgba(0, 0, 0, 0.05);
					}

					&.apply {
						background: linear-gradient(90deg, #FF6B01, #FF9C01);
						color: #FFFFFF;
						box-shadow: 0 6rpx 16rpx rgba(255, 107, 1, 0.2);

						&:active {
							transform: translateY(2rpx);
							box-shadow: 0 2rpx 8rpx rgba(255, 107, 1, 0.15);
						}
					}
				}
			}
		}
	}

	// 列表标题栏
	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;

		text {
			font-size: 32rpx;
			color: #333333;
			font-weight: 500;
		}

		.list-count {
			font-size: 24rpx;
			color: #999999;
			font-weight: normal;
		}
	}

	// 账单列表
	.statement-list-container {
		overflow: hidden;
		height: calc(100vh - 450rpx);
	}

	.statement-list {
		overflow-y: auto;
		padding: 0 30rpx;
	}

	.statement-item {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		transition: transform 0.3s, box-shadow 0.3s;

		// 入场动画
		&.animate-in {
			animation: slideIn 0.5s ease forwards;
			opacity: 0;
			transform: translateY(20rpx);
		}

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
		}

		.item-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 20rpx;

			.order-info {

				.order-id {
					font-size: 28rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 8rpx;
					display: block;
					width: 200px;
					overflow: hidden;
					/* 隐藏超出部分 */
					white-space: nowrap;
					/* 禁止换行 */
					text-overflow: ellipsis;
					/* 超出显示省略号 */
				}

				.time {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.type-tag {
				padding: 8rpx 24rpx;
				background: rgba(82, 196, 26, 0.1);
				border-radius: 30rpx;
				font-size: 24rpx;
				color: #52C41A;
				font-weight: 500;

				&.refund {
					background: rgba(255, 77, 79, 0.1);
					color: #FF4D4F;
				}
			}
		}

		.item-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.amount {
				font-size: 40rpx;
				color: #FF6B01;
				font-weight: 600;

				&.refund {
					color: #FF4D4F;
				}
			}
		}

		.item-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
			border-top: 1px solid #F5F5F5;

			.payment-status {
				font-size: 24rpx;
				padding: 6rpx 20rpx;
				background: rgba(250, 173, 20, 0.1);
				color: #FAAD14;
				border-radius: 20rpx;

				&.paid {
					background: rgba(82, 196, 26, 0.1);
					color: #52C41A;
				}
			}

			.flex-space {
				flex: 1;
			}

			.detail-link {
				display: flex;
				align-items: center;
				margin-left: auto;

				text {
					font-size: 24rpx;
					color: #999999;
					margin-right: 6rpx;
				}
			}
		}
	}

	// 空状态美化
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;

		.empty-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 180rpx;
			height: 180rpx;
			background: #F8F9FA;
			border-radius: 50%;
			margin-bottom: 30rpx;
		}

		text {
			font-size: 32rpx;
			color: #666666;
			margin-bottom: 10rpx;
		}

		.sub-text {
			font-size: 26rpx;
			color: #999999;
			margin-bottom: 40rpx;
		}

		.refresh-btn {
			padding: 16rpx 60rpx;
			background: #F8F9FA;
			border: 1px solid rgba(0, 0, 0, 0.05);
			color: #666666;
			font-size: 28rpx;
			border-radius: 40rpx;

			&:active {
				background: #EAEAEA;
			}
		}
	}

	// 动画定义
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	// 添加周期选择器样式
	.cycle-selector {
		margin: 20rpx 30rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

		.cycle-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid #F5F5F5;

			text {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
			}

			.current-cycle {
				flex: 1;
				text-align: right;
				font-size: 26rpx;
				color: #666666;
				margin-right: 10rpx;
				font-weight: normal;
			}
		}

		.cycle-panel {
			max-height: 600rpx;
			background: #FFFFFF;

			.cycle-list {
				max-height: 600rpx;
			}

			.cycle-item {
				padding: 30rpx;
				border-bottom: 1px solid #F5F5F5;
				position: relative;

				&.active {
					background: rgba(255, 107, 1, 0.05);

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 60%;
						background: #FF6B01;
						border-radius: 0 6rpx 6rpx 0;
					}

					.cycle-name {
						color: #FF6B01;
					}
				}

				.cycle-name {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 10rpx;
					font-weight: 500;
				}

				.cycle-date {
					font-size: 26rpx;
					color: #999999;
				}

				.cycle-status {
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 24rpx;
					padding: 6rpx 20rpx;
					background: rgba(82, 196, 26, 0.1);
					color: #52C41A;
					border-radius: 30rpx;
				}

				// 添加历史周期标记
				.history-badge {
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 24rpx;
					padding: 6rpx 20rpx;
					background: rgba(153, 153, 153, 0.1);
					color: #999999;
					border-radius: 30rpx;
				}
			}
		}
	}

	// 添加无周期提示样式
	.no-cycles-tip {
		margin: 20rpx 30rpx;
		padding: 20rpx 30rpx;
		background: rgba(250, 173, 20, 0.1);
		border-radius: 8rpx;
		display: flex;
		align-items: center;

		uni-icons {
			margin-right: 10rpx;
		}

		text {
			font-size: 26rpx;
			color: #FAAD14;
		}
	}

	// 添加资格失效提示样式
	.invalid-eligibility-tip {
		margin-top: 20rpx;
		padding: 16rpx 20rpx;
		background: rgba(255, 77, 79, 0.1);
		border-radius: 8rpx;
		display: flex;
		align-items: center;

		uni-icons {
			margin-right: 10rpx;
		}

		text {
			font-size: 24rpx;
			color: #FF4D4F;
		}
	}

	// 添加底部加载状态指示器
	.load-more {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;

		.loading-spinner {
			width: 36rpx;
			height: 36rpx;
			border: 3rpx solid #F5F5F5;
			border-radius: 50%;
			border-top-color: #FF6B01;
			margin-right: 16rpx;
			animation: spin 1s linear infinite;
		}

		text {
			font-size: 26rpx;
			color: #999999;
		}
	}

	// 添加无更多数据提示
	.no-more-data {
		text-align: center;
		padding: 30rpx 0;

		text {
			font-size: 26rpx;
			color: #999999;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
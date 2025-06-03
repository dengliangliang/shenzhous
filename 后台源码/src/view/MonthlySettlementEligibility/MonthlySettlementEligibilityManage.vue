<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="月结资格数据加载中...">
		</delivery-loading>

		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<!-- <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item> -->
				<el-form-item label="结算周期">
					<el-select v-model="queryParams.settlementCycle" placeholder="请选择结算周期" clearable>
						<el-option label="月结" :value="0"></el-option>
						<el-option label="季结" :value="1"></el-option>
						<el-option label="半年结" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch" :loading="loadingStates.search">查询</el-button>
					<el-button @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 表格区域 -->
		<div style="position: relative;">
			<!-- 表格加载动画 -->
			<delivery-loading v-if="loadingStates.table"></delivery-loading>
			
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column label="编号" width="55" align="center">
					<template slot-scope="scope">
						{{scope.$index + 1}}
					</template>
				</el-table-column>
				
				<el-table-column prop="userName" label="用户名" align="center"></el-table-column>
				<el-table-column prop="settlementCycle" label="结算周期" align="center">
					<template slot-scope="scope">
						<el-tag :type="getSettlementCycleType(scope.row.settlementCycle)">
							{{ getSettlementCycleText(scope.row.settlementCycle) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="minimumAmount" label="每月最低寄件量" align="center">
					<template slot-scope="scope">
						{{ scope.row.minimumAmount }} 元
					</template>
				</el-table-column>
				<el-table-column prop="invoiceRequirement" label="发票要求" align="center">
					<template slot-scope="scope">
						{{ getInvoiceText(scope.row.invoiceRequirement) }}
					</template>
				</el-table-column>
				
				<el-table-column prop="status" label="状态" align="center">
					<template slot-scope="scope">
						{{ scope.row.status === 0 ? "正常":"已失效" }}
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column label="操作" width="280" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleDetail(scope.row)" :loading="loadingStates['detail_'+scope.row.monthlySettlementEligibilityId]">查看</el-button>
						<el-button v-if="scope.row.status === 0" size="small" type="danger" @click="logout(scope.row)" :loading="loadingStates['detail_'+scope.row.monthlySettlementEligibilityId]">注销</el-button>
						<el-button size="small" type="info" @click="handleViewBills(scope.row)" :loading="loadingStates['bills_'+scope.row.monthlySettlementEligibilityId]">查看账单</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 分页 -->
		<div class="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<!-- 详情对话框 -->
		<el-dialog :title="'月结资格详情'" :visible.sync="detailVisible" width="600px">
			<div style="position: relative;">
				<!-- 详情加载动画 -->
				<delivery-loading v-if="loadingStates.detailContent" text="加载详情数据..."></delivery-loading>
				
				<el-descriptions :column="2" border>
					
					<el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
					<el-descriptions-item
						label="结算周期">{{ getSettlementCycleText(detail.settlementCycle) }}</el-descriptions-item>
					<el-descriptions-item label="每月最低寄件量">{{ detail.minimumAmount }} 元</el-descriptions-item>
					<el-descriptions-item
						label="发票要求">{{ getInvoiceText(detail.invoiceRequirement) }}</el-descriptions-item>
					<el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
					<el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
				</el-descriptions>
			</div>
		</el-dialog>

		<!-- 账单列表对话框 -->
		<el-dialog :title="'月结账单列表'" :visible.sync="billsVisible" width="900px">
			<div class="bills-wrapper">
				<!-- 账单搜索 -->
				<div class="search-wrapper">
					<el-form :inline="true" :model="billQueryParams" class="demo-form-inline">
						<el-form-item label="账单类型">
							<el-select v-model="billQueryParams.type" placeholder="请选择账单类型" clearable>
								<el-option label="支付" :value="0"></el-option>
								<el-option label="退款" :value="1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="结算期数">
							<el-select v-model="billQueryParams.periodIndex" placeholder="请选择结算期数" clearable
								@change="handlePeriodChange">
								<el-option 
									v-for="(period, index) in settlementPeriods" 
									:key="index"
									:label="`第${index + 1}期 (${period.startDate} ~ ${period.endDate})`" 
									:value="index">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleBillSearch" :loading="loadingStates.billSearch">查询</el-button>
							<el-button @click="resetBillQuery">重置</el-button>
						</el-form-item>
					</el-form>
				</div>

				<!-- 期数统计信息 -->
				<div class="period-summary" v-if="periodSummary.month">
					<el-card class="summary-card">
						<div slot="header" class="summary-header">
							<span>结算期统计信息</span>
							<span class="date-range" v-if="currentPeriod">
								{{ currentPeriod.startDate }} 至 {{ currentPeriod.endDate }}
							</span>
						</div>
						<div class="summary-content">
							<div class="summary-item">
								<span class="item-label">总金额：</span>
								<span class="item-value">{{ periodSummary.month }} 元</span>
							</div>
							<div class="summary-item">
								<span class="item-label">已结算金额：</span>
								<span class="item-value">{{ periodSummary.alreadySettlementAmount }} 元</span>
							</div>
							<div class="summary-item">
								<span class="item-label">待结算金额：</span>
								<span class="item-value" :class="{'highlight': periodSummary.treatSettlementAmount > 0}">
									{{ periodSummary.treatSettlementAmount }} 元
								</span>
							</div>
							<div class="summary-item">
								<span class="item-label">账单数量：</span>
								<span class="item-value">{{ periodSummary.number }} 笔</span>
							</div>
							
							<div class="summary-action" v-if="periodSummary.treatSettlementAmount > 0">
								<el-button 
									type="warning" 
									size="small" 
									@click="handleSendMonthlyReminder" 
									:loading="loadingStates.monthlyReminder">
									发送月结账单提醒
								</el-button>
							</div>
						</div>
					</el-card>
				</div>

				<!-- 账单表格 -->
				<div style="position: relative;">
					<!-- 账单表格加载动画 -->
					<delivery-loading v-if="loadingStates.billTable" text="加载账单数据..."></delivery-loading>
					
					<el-table :data="filteredBillsData" border style="width: 100%">
						<el-table-column label="编号" width="55" align="center">
							<template slot-scope="scope">
								{{scope.$index + 1}}
							</template>
						</el-table-column>
						
						<el-table-column prop="userName" label="用户名" align="center"></el-table-column>
						<el-table-column prop="settlementPeriod" label="结算期数" align="center">
							<template slot-scope="scope">
								<el-tag type="info">
									{{ getSettlementPeriodText(scope.row) }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
						<el-table-column prop="type" label="账单类型" align="center">
							<template slot-scope="scope">
								<el-tag :type="scope.row.type === 0 ? 'primary' : 'success'">
									{{ scope.row.type === 0 ? '支付' : '退款' }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="amount" label="金额" align="center">
							<template slot-scope="scope">
								<span :style="{ color: scope.row.type === 1 ? '#67C23A' : '#F56C6C' }">
									{{ scope.row.type === 1 ? '+' : '-' }}{{ scope.row.amount }}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="isUserPays" label="用户是否支付" align="center">
							<template slot-scope="scope">
								<el-tag :type="scope.row.isUserPays === 0 ? 'primary' : 'success'">
									{{ scope.row.isUserPays === 0 ? '待支付' : '已支付' }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
					</el-table>
				</div>

				<!-- 账单分页 -->
				<div class="pagination-container">
					<el-pagination @size-change="handleBillSizeChange" @current-change="handleBillCurrentChange"
						:current-page="billQueryParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
						:page-size="billQueryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
						:total="billTotal">
					</el-pagination>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		pageMonthlySettlementEligibility,
		getMonthlySettlementEligibilityById,
		logoffEligibility
	} from '@/api/MonthlySettlementEligibility'
	import {
		pageMonthlyStatement,
		getMonthlyStatementById,
		getAllPrice
	} from '@/api/MonthlyStatement'
	import { sendMonthly } from '@/api/sms'
	import { getUserById } from '@/api/User'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'
	
	export default {
		name: 'MonthlySettlementEligibilityManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					userId: '',
					settlementCycle: ''
				},
				tableData: [],
				total: 0,
				detailVisible: false,
				detail: {},
				billsVisible: false,
				billQueryParams: {
					pageIndex: 1,
					pageSize: 10,
					userId: '',
					monthlySettlementEligibilityId: '',
					periodIndex: '',
					type: '',
					startTime: '',
					endTime: ''
				},
				billsData: [],
				billTotal: 0,
				currentEligibility: null,
				settlementPeriods: [],
				currentPeriod: null,
				periodSummary: {
					alreadySettlementAmount: 0,
					month: 0,
					treatSettlementAmount: 0,
					number: 0,
					startTime: '',
					endTime: ''
				}
			}
		},
		created() {
			// 开始全屏加载
			this.startFullscreenLoading();
			
			// 加载数据
			this.getList().finally(() => {
				// 停止全屏加载
				this.stopFullscreenLoading();
			});
		},
		methods: {
			// 获取列表
			async getList() {
				return this.loadDataWithLoading(
					() => pageMonthlySettlementEligibility(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取月结资格列表失败'
				);
			},
			async logout(data){
				this.$confirm('确认要注销这个月结资格吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					logoffEligibility(data.monthlySettlementEligibilityId).then(res=>{
						if(res.code===200){
							this.$message.success('注销成功');
							this.getList();
						}else{
							this.$message.error(res.message);
						}
					})
				}).catch(() => {});
				
			},
			// 搜索
			async handleSearch() {
				this.queryParams.pageIndex = 1;
				// 使用独立的搜索加载状态
				this.setAreaLoading('search', true);
				try {
					await this.getList();
				} finally {
					this.setAreaLoading('search', false);
				}
			},

			// 重置
			resetQuery() {
				// this.queryParams.userName = ''
				this.queryParams.settlementCycle = '';
				this.handleSearch();
			},

			// 查看详情
			handleDetail(row) {
				const loadingKey = 'detail_' + row.monthlySettlementEligibilityId;
				this.setAreaLoading(loadingKey, true);
				
				this.detailVisible = true;
				this.setAreaLoading('detailContent', true);
				
				this.$nextTick(() => {
					this.detail = {
						...row
					};
					
					// 模拟加载延迟，显示加载效果
					setTimeout(() => {
						this.setAreaLoading('detailContent', false);
						this.setAreaLoading(loadingKey, false);
					}, 600);
				});
			},

			// 分页
			handleSizeChange(val) {
				this.queryParams.pageSize = val;
				this.getList();
			},

			handleCurrentChange(val) {
				this.queryParams.pageIndex = val;
				this.getList();
			},

			// 获取结算周期标签类型
			getSettlementCycleType(cycle) {
				const map = {
					0: 'success',
					1: 'warning',
					2: 'info'
				}
				return map[cycle] || '';
			},

			// 获取结算周期文本
			getSettlementCycleText(cycle) {
				const map = {
					0: '月结',
					1: '季结',
					2: '半年结'
				}
				return map[cycle] || '未知周期';
			},

			// 获取发票类型文本
			getInvoiceText(type) {
				const map = {
					0: '增值税普通发票',
					1: '增值税专用发票',
					2: '其他'
				}
				return map[type] || '未知类型';
			},

			// 查看账单
			handleViewBills(row) {
				const loadingKey = 'bills_' + row.monthlySettlementEligibilityId;
				this.setAreaLoading(loadingKey, true);
				
				this.billQueryParams.monthlySettlementEligibilityId = row.monthlySettlementEligibilityId;
				this.billsVisible = true;
				this.currentEligibility = row;
				
				// 计算结算期数
				this.calculateSettlementPeriods(row);
				
				this.getBills().finally(() => {
					this.setAreaLoading(loadingKey, false);
				});
			},
			
			// 计算结算期数
			calculateSettlementPeriods(eligibility) {
				this.settlementPeriods = [];
				
				if (!eligibility || !eligibility.createTime) {
					return;
				}
				
				// 解析创建时间
				const createDate = new Date(eligibility.createTime);
				const currentDate = new Date();
				
				// 定义周期长度（月）
				let cycleLength = 1; // 默认月结
				
				if (eligibility.settlementCycle === 1) {
					cycleLength = 3; // 季结
				} else if (eligibility.settlementCycle === 2) {
					cycleLength = 6; // 半年结
				}
				
				// 计算总期数（从创建到现在可能有多少期）
				let periodsCount = this.calculatePeriodsCount(createDate, currentDate, cycleLength);
				
				// 生成每一期的起止日期
				for (let i = 0; i < periodsCount; i++) {
					const periodDates = this.calculatePeriodDates(createDate, i, cycleLength);
					this.settlementPeriods.push(periodDates);
				}
			},
			
			// 计算总期数
			calculatePeriodsCount(createDate, currentDate, cycleLength) {
				// 创建年月
				const createYear = createDate.getFullYear();
				const createMonth = createDate.getMonth();
				
				// 当前年月
				const currentYear = currentDate.getFullYear();
				const currentMonth = currentDate.getMonth();
				
				// 月份差
				let monthsDiff = (currentYear - createYear) * 12 + (currentMonth - createMonth);
				
				// 计算期数（向上取整，确保包含当前正在进行的期）
				return Math.ceil(monthsDiff / cycleLength) + 1;
			},
			
			// 计算指定期数的起止日期
			calculatePeriodDates(createDate, periodIndex, cycleLength) {
				// 复制创建日期，防止修改原始日期
				const startDateObj = new Date(createDate);
				
				if (periodIndex === 0) {
					// 第一期的开始日期就是创建日期
					// 无需调整startDateObj
				} else {
					// 其他期的开始日期是上一期结束日期的后一天
					const prevEndDate = this.calculatePeriodDates(createDate, periodIndex - 1, cycleLength).endDateObj;
					prevEndDate.setDate(prevEndDate.getDate() + 1);
					startDateObj.setTime(prevEndDate.getTime());
				}
				
				// 计算结束日期
				const endDateObj = new Date(startDateObj);
				
				if (periodIndex === 0) {
					// 第一期特殊处理：从创建日到下N个月的15号
					endDateObj.setMonth(endDateObj.getMonth() + cycleLength);
					endDateObj.setDate(15);
				} else {
					// 非第一期：从开始日期算起的N个月后的15号
					const monthsToAdd = cycleLength;
					endDateObj.setMonth(endDateObj.getMonth() + monthsToAdd);
					endDateObj.setDate(15);
				}
				
				// 格式化日期为 YYYY-MM-DD
				const startDate = this.formatDate(startDateObj);
				const endDate = this.formatDate(endDateObj);
				
				return {
					startDate,
					endDate,
					startDateObj,
					endDateObj
				};
			},
			
			// 格式化日期
			formatDate(date) {
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			
			// 获取账单的结算期数文本
			getSettlementPeriodText(bill) {
				// 根据账单创建时间判断属于哪一期
				if (!bill.createTime || this.settlementPeriods.length === 0) {
					return '未知期数';
				}
				
				const billDate = new Date(bill.createTime);
				
				for (let i = 0; i < this.settlementPeriods.length; i++) {
					const period = this.settlementPeriods[i];
					const startDate = period.startDateObj;
					const endDate = period.endDateObj;
					
					// 判断账单日期是否在当前期间内
					if (billDate >= startDate && billDate <= endDate) {
						return `第${i + 1}期`;
					}
				}
				
				return '未知期数';
			},

			// 获取账单列表
			async getBills() {
				return this.loadDataWithLoading(
					() => pageMonthlyStatement(this.billQueryParams),
					'billTable',
					data => {
						this.billsData = data.dataList;
						this.billTotal = data.totalPages;
					},
					'获取月结账单列表失败'
				);
			},

			// 结算期数变更处理
			handlePeriodChange(periodIndex) {
				// 如果选择了有效的期数
				if (periodIndex !== '' && periodIndex !== null && this.settlementPeriods[periodIndex]) {
					const period = this.settlementPeriods[periodIndex];
					const startTime = period.startDate;
					const endTime = period.endDate;
					
					// 更新查询参数中的时间范围
					this.billQueryParams.startTime = startTime;
					this.billQueryParams.endTime = endTime;
					
					this.currentPeriod = period;
					this.loadPeriodSummary(startTime, endTime);
				} else {
					// 清空期数统计信息和时间范围
					this.currentPeriod = null;
					this.billQueryParams.startTime = '';
					this.billQueryParams.endTime = '';
					this.periodSummary = {
						alreadySettlementAmount: 0,
						month: 0,
						treatSettlementAmount: 0,
						number: 0,
						startTime: '',
						endTime: ''
					};
				}
			},
			
			// 加载期数统计信息
			async loadPeriodSummary(startTime, endTime) {
				if (!this.currentEligibility || !this.currentEligibility.monthlySettlementEligibilityId) {
					return;
				}
				
				this.setAreaLoading('periodSummary', true);
				
				try {
					const params = {
						id: this.currentEligibility.monthlySettlementEligibilityId,
						startTime: this.billQueryParams.startTime,
						endTime: this.billQueryParams.endTime,
						userId: this.currentEligibility.userId || ''
					};
					
					const res = await getAllPrice(params);
					
					if (res && res.code === 200 && res.data) {
						this.periodSummary = {
							alreadySettlementAmount: res.data.alreadySettlementAmount || 0,
							month: res.data.month || 0,
							treatSettlementAmount: res.data.treatSettlementAmount || 0,
							number: res.data.number || 0,
							startTime: this.billQueryParams.startTime,
							endTime: this.billQueryParams.endTime
						};
					} else {
						// 接口调用失败或数据为空
						this.$message.error(res.message || '获取期数统计信息失败');
						this.periodSummary = {
							alreadySettlementAmount: 0,
							month: 0,
							treatSettlementAmount: 0,
							number: 0,
							startTime: '',
							endTime: ''
						};
					}
				} catch (error) {
					console.error('获取期数统计信息异常:', error);
					this.$message.error('获取期数统计信息异常');
					this.periodSummary = {
						alreadySettlementAmount: 0,
						month: 0,
						treatSettlementAmount: 0,
						number: 0,
						startTime: '',
						endTime: ''
					};
				} finally {
					this.setAreaLoading('periodSummary', false);
				}
			},
			
			// 重置账单查询
			resetBillQuery() {
				this.billQueryParams.settlementCycle = '';
				this.billQueryParams.periodIndex = '';
				this.billQueryParams.startTime = '';
				this.billQueryParams.endTime = '';
				// 清空期数统计信息
				this.currentPeriod = null;
				this.periodSummary = {
					alreadySettlementAmount: 0,
					month: 0,
					treatSettlementAmount: 0,
					number: 0,
					startTime: '',
					endTime: ''
				};
				this.handleBillSearch();
			},

			// 发送月结账单提醒
			handleSendMonthlyReminder() {
				if (this.periodSummary.treatSettlementAmount <= 0) {
					this.$message.info('当前没有待结算金额，无需发送提醒');
					return;
				}
				
				if (!this.currentEligibility || !this.currentEligibility.userId) {
					this.$message.error('缺少用户信息，无法发送提醒');
					return;
				}
				
				this.$confirm(`确认要发送月结账单提醒吗？待结算金额: ${this.periodSummary.treatSettlementAmount}元`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 设置加载状态
					this.setAreaLoading('monthlyReminder', true);
					
					// 获取用户ID
					const userId = this.currentEligibility.userId;
					
					// 先获取用户信息
					getUserById(userId).then(userResponse => {
						console.log('获取用户信息响应:', userResponse);
						if (userResponse && userResponse.code === 200 && userResponse.data) {
							const userInfo = userResponse.data;
							if (!userInfo.phone) {
								this.$message.error('用户未设置手机号，无法发送提醒');
								this.setAreaLoading('monthlyReminder', false);
								return;
							}
							
							console.log('准备发送提醒到手机号:', userInfo.phone);
							// 获取到手机号后调用发送月结账单提醒API
							const params = {
								phoneNumber: userInfo.phone
							};
							
							sendMonthly(params).then(response => {
								console.log('发送提醒响应:', response);
								if (response && response.code === 200) {
									this.$message.success('月结账单提醒已发送');
								} else {
									this.$message.error(response.message || '发送提醒失败');
								}
							}).catch(error => {
								console.error('发送月结账单提醒失败:', error);
								this.$message.error('发送月结账单提醒失败');
							}).finally(() => {
								this.setAreaLoading('monthlyReminder', false);
							});
						} else {
							console.error('获取用户信息返回错误:', userResponse);
							this.$message.error(userResponse.message || '获取用户信息失败');
							this.setAreaLoading('monthlyReminder', false);
						}
					}).catch(error => {
						console.error('获取用户信息请求异常:', error);
						this.$message.error('获取用户信息失败');
						this.setAreaLoading('monthlyReminder', false);
					});
				}).catch(() => {
					// 用户取消操作，不做处理
				});
			},

			// 分页
			handleBillSizeChange(val) {
				this.billQueryParams.pageSize = val;
				this.getBills();
			},

			handleBillCurrentChange(val) {
				this.billQueryParams.pageIndex = val;
				this.getBills();
			},

			// 搜索账单
			async handleBillSearch() {
				this.billQueryParams.pageIndex = 1;
				this.setAreaLoading('billSearch', true);
				try {
					await this.getBills();
				} finally {
					this.setAreaLoading('billSearch', false);
				}
			}
		},
		computed: {
			// 根据期数过滤账单数据
			filteredBillsData() {
				if (!this.billQueryParams.periodIndex && this.billQueryParams.periodIndex !== 0) {
					return this.billsData;
				}
				
				// 获取选中期数的起止日期
				const selectedPeriod = this.settlementPeriods[this.billQueryParams.periodIndex];
				if (!selectedPeriod) {
					return this.billsData;
				}
				
				const startDate = new Date(selectedPeriod.startDate);
				const endDate = new Date(selectedPeriod.endDate);
				
				// 过滤账单数据
				return this.billsData.filter(bill => {
					const billDate = new Date(bill.createTime);
					return billDate >= startDate && billDate <= endDate;
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		position: relative;
	}

	.search-wrapper {
		margin-bottom: 20px;
	}

	.pagination-container {
		margin-top: 20px;
		text-align: right;
	}
	
	.period-summary {
		margin-bottom: 20px;
	}
	
	.summary-card {
		border-radius: 8px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	
	.summary-header {
		font-size: 16px;
		font-weight: bold;
		color: #606266;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.date-range {
		font-size: 14px;
		color: #909399;
		font-weight: normal;
	}
	
	.summary-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.summary-item {
		width: 45%;
		margin-bottom: 15px;
		display: flex;
		align-items: center;
	}
	
	.summary-action {
		width: 100%;
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}
	
	.item-label {
		color: #909399;
		margin-right: 8px;
		font-size: 14px;
	}
	
	.item-value {
		color: #606266;
		font-size: 16px;
		font-weight: 500;
	}
	
	.item-value.highlight {
		color: #F56C6C;
		font-weight: bold;
	}
</style>
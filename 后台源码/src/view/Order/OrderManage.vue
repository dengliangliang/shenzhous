<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading v-if="fullscreenLoading" :fullscreen="true" :progress="loadingProgress" text="订单数据加载中...">
		</delivery-loading>

		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<el-form-item label="支付方式">
					<el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
						<el-option label="线下到付" :value="0"></el-option>
						<el-option label="线下寄付" :value="1"></el-option>
						<el-option label="线上支付" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运送状态">
					<el-select v-model="queryParams.shippingStatus" placeholder="请选择运送状态" clearable>
						<el-option label="待取件" :value="0"></el-option>
						<el-option label="已取件" :value="1"></el-option>
						<el-option label="运输中" :value="2"></el-option>
						<el-option label="已送达" :value="3"></el-option>
						<el-option label="异常" :value="6"></el-option>
						<el-option label="已取消" :value="10"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable>
						<el-option label="微信支付" :value="1"></el-option>
						<el-option label="月结支付" :value="4"></el-option>
						<el-option label="线上到付——未支付" :value="7"></el-option>
						<el-option label="线上到付——已支付" :value="8"></el-option>
						<el-option label="已取消" :value="3"></el-option>
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
				<el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
				<el-table-column prop="orderNo" label="易达订单号" align="center"></el-table-column>
				<el-table-column prop="deliveryId" label="运单号" align="center"></el-table-column>
				<el-table-column label="寄件人信息" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.senderName}}</div>
						<div>{{scope.row.senderPhone}}</div>
						<div>
							{{scope.row.senderProvince}}{{scope.row.senderCity}}{{scope.row.senderDistrict}}{{scope.row.senderDetailAddress}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="收件人信息" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.receiverName}}</div>
						<div>{{scope.row.receiverPhone}}</div>
						<div>
							{{scope.row.receiverProvince}}{{scope.row.receiverCity}}{{scope.row.receiverDistrict}}{{scope.row.receiverDetailAddress}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="paymentMethod" label="支付方式" align="center">
					<template slot-scope="scope">
						<el-tag :type="getPaymentMethodType(scope.row)">
							{{ getPaymentMethodText(scope.row) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="shippingStatus" label="运送状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="getShippingStatusType(scope.row.shippingStatus)">
							{{ getShippingStatusText(scope.row.shippingStatus) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="orderStatus" label="订单状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="getOrderStatusType(scope.row.orderStatus)">
							{{ getOrderStatusText(scope.row.orderStatus) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="差价状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="getPriceDifferenceType(scope.row)">
							{{ getPriceDifferenceText(scope.row) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="待补差价金额" align="center">
					<template slot-scope="scope">
						<span
							v-if="scope.row.orderPriceDifference !== 0 && scope.row.orderPriceDifference !== '0.00' && scope.row.isPriceDifferencePaid === 0"
							class="price-difference">
							¥ {{ scope.row.orderPriceDifference }}
						</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column prop="orderTotalPrice" label="订单金额" align="center">
					<template slot-scope="scope">
						{{ scope.row.orderTotalPrice }} 元
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column label="操作" width="450" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleDetail(scope.row)"
							:loading="loadingStates['detail_'+scope.row.orderId]">查看</el-button>
						<el-button size="small" type="success" v-if="scope.row.shippingStatus !== 10"
							@click="handleViewLogistics(scope.row)"
							:loading="loadingStates['logistics_'+scope.row.orderId]">查看物流</el-button>
						<el-button size="small" type="warning"
							v-if="scope.row.orderPriceDifference !== 0 && scope.row.orderPriceDifference !== '0.00' && scope.row.isPriceDifferencePaid === 0"
							@click="handleRemindPayDiff(scope.row)"
							:loading="loadingStates['remind_'+scope.row.orderId]">提醒补差价</el-button>
						<el-button size="small" type="info" v-if="scope.row.orderStatus === 7"
							@click="handleRemindPayment(scope.row)"
							:loading="loadingStates['payment_'+scope.row.orderId]">提醒付款</el-button>
						<!-- <el-button size="small" type="warning" @click="handleCheckAndRemindDiff(scope.row)"
							:loading="loadingStates['check_diff_'+scope.row.orderId]">补差价提醒</el-button> -->
						<el-button size="small" type="danger" @click="handleDelete(scope.row)"
							:loading="loadingStates['delete_'+scope.row.orderId]">删除</el-button>
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
		<el-dialog :title="'订单详情'" :visible.sync="detailVisible" width="800px">
			<div style="position: relative;">
				<!-- 详情加载动画 -->
				<delivery-loading v-if="loadingStates.detailContent" text="加载订单详情..."></delivery-loading>

				<el-descriptions :column="2" border>
					<!-- <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item> -->
					<el-descriptions-item label="易达订单号">{{ detail.orderNo }}</el-descriptions-item>
					<el-descriptions-item label="运单号">{{ detail.deliveryId }}</el-descriptions-item>
					<el-descriptions-item label="支付方式">{{ getPaymentMethodText(detail) }}</el-descriptions-item>
					<el-descriptions-item
						label="运送状态">{{ getShippingStatusText(detail.shippingStatus) }}</el-descriptions-item>
					<el-descriptions-item
						label="订单状态">{{ getOrderStatusText(detail.orderStatus) }}</el-descriptions-item>
				</el-descriptions>

				<el-divider content-position="left">寄件人信息</el-divider>
				<el-descriptions :column="2" border>
					<el-descriptions-item label="姓名">{{ detail.senderName }}</el-descriptions-item>
					<el-descriptions-item label="电话">{{ detail.senderPhone }}</el-descriptions-item>
					<el-descriptions-item label="地址" :span="2">
						{{ detail.senderProvince }}{{ detail.senderCity }}{{ detail.senderDistrict }}{{ detail.senderDetailAddress }}
					</el-descriptions-item>
				</el-descriptions>

				<el-divider content-position="left">收件人信息</el-divider>
				<el-descriptions :column="2" border>
					<el-descriptions-item label="姓名">{{ detail.receiverName }}</el-descriptions-item>
					<el-descriptions-item label="电话">{{ detail.receiverPhone }}</el-descriptions-item>
					<el-descriptions-item label="地址" :span="2">
						{{ detail.receiverProvince }}{{ detail.receiverCity }}{{ detail.receiverDistrict }}{{ detail.receiverDetailAddress }}
					</el-descriptions-item>
				</el-descriptions>

				<el-divider content-position="left">物品信息</el-divider>
				<el-descriptions :column="2" border>
					<el-descriptions-item label="预估重量">{{ detail.estimatedItemWeight }} kg</el-descriptions-item>
					<el-descriptions-item label="实际重量">{{ detail.actualWeight }} kg</el-descriptions-item>
					<el-descriptions-item label="尺寸">{{ detail.length }}*{{ detail.width }}*{{ detail.height }}
						cm</el-descriptions-item>
					<el-descriptions-item label="保价金额">{{ detail.guaranteeValueAmount }} 元</el-descriptions-item>
				</el-descriptions>

				<el-divider content-position="left">费用信息</el-divider>
				<el-descriptions :column="2" border>
					<el-descriptions-item label="保价费">{{ detail.insuranceFee?detail.insuranceFee+'元':'无' }}
					</el-descriptions-item>
					<el-descriptions-item
						label="佣金抵扣">{{ detail.commissionDeductionAmount?detail.commissionDeductionAmount+'元':'无' }}</el-descriptions-item>
					<el-descriptions-item label="订单总价">{{ detail.orderTotalPrice }} 元</el-descriptions-item>
					<el-descriptions-item label="抵扣后金额">{{ detail.amountAfterCommissionDeduction }}
						元</el-descriptions-item>
					<el-descriptions-item label="差价金额">{{ detail.orderPriceDifference }} 元</el-descriptions-item>
					<el-descriptions-item label="差价状态">
						<el-tag :type="getPriceDifferenceType(detail)">
							{{ getPriceDifferenceText(detail) }}
						</el-tag>
					</el-descriptions-item>
				</el-descriptions>

				<el-divider content-position="left">其他信息</el-divider>
				<el-descriptions :column="2" border>
					<el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
					<el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
					<el-descriptions-item label="备注" :span="2">{{ detail.remark }}</el-descriptions-item>
				</el-descriptions>
			</div>
		</el-dialog>

		<!-- 物流详情对话框 -->
		<el-dialog title="物流详情" :visible.sync="logisticsVisible" width="700px" custom-class="logistics-dialog">
			<div style="position: relative;">
				<!-- 物流详情加载动画 -->
				<delivery-loading v-if="loadingStates.logistics" text="加载物流信息..."></delivery-loading>

				<div v-else class="logistics-container">
					<!-- 快递信息卡片 -->
					<div class="logistics-card">
						<!-- 快递信息头部 -->
						<div class="express-header">
							<div class="express-info">
								<!-- <div class="logo-container">
                  <img :src="getExpressLogo(logisticsData.expressCode)" alt="快递logo">
                </div> -->
								<div class="name-no">
									<span class="name">{{getExpressName(logisticsData.expressCode)}}</span>
									<span class="no">单号：{{logisticsData.orderNo || logisticsData.deliveryId}}</span>
								</div>
							</div>
							<el-tag :type="getShippingStatusType(logisticsData.shippingStatus)">
								{{getShippingStatusText(logisticsData.shippingStatus)}}
							</el-tag>
						</div>

						<!-- 地址信息 -->
						<div class="address-info">
							<div class="address-flow">
								<div class="from">
									<div class="label-box">寄</div>
									<div class="info">
										<div class="name">{{logisticsData.senderName}}</div>
										<div class="address">
											{{logisticsData.senderProvince}}{{logisticsData.senderCity}}{{logisticsData.senderDistrict}}{{logisticsData.senderDetailAddress}}
										</div>
									</div>
								</div>

								<div class="flow-line">
									<div class="dot start"></div>
									<div class="line"></div>
									<div class="dot end"></div>
								</div>

								<div class="to">
									<div class="label-box">收</div>
									<div class="info">
										<div class="name">{{logisticsData.receiverName}}</div>
										<div class="address">
											{{logisticsData.receiverProvince}}{{logisticsData.receiverCity}}{{logisticsData.receiverDistrict}}{{logisticsData.receiverDetailAddress}}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 物流轨迹 -->
					<div class="logistics-track">
						<div class="track-title">
							<div class="title-with-icon">
								<i class="el-icon-location"></i>
								<span>物流轨迹</span>
							</div>
							<span v-if="trackList.length > 0" class="update-time">更新于 {{trackList[0].time}}</span>
						</div>

						<div class="track-list">
							<div class="track-item" v-for="(item, index) in trackList" :key="index"
								:class="{'track-active': index === 0}">
								<div class="time-column">
									<span class="time">{{item.timeStr}}</span>
									<span class="date">{{item.dateStr}}</span>
								</div>

								<div class="node-column">
									<div class="node-dot" :class="{'active-dot': index === 0}">
										<div class="inner-dot" v-if="index === 0"></div>
										<div class="pulse-circle" v-if="index === 0"></div>
									</div>
									<div class="node-line" v-if="index !== trackList.length - 1"></div>
								</div>

								<div class="content-column">
									<span class="content">{{item.content}}</span>
									<div class="location-info" v-if="item.location">
										<i class="el-icon-location-information"></i>
										<span class="location">{{item.location}}</span>
									</div>
								</div>
							</div>

							<!-- 无物流信息 -->
							<div class="empty-track" v-if="trackList.length === 0">
								<i class="el-icon-box"></i>
								<span>暂无物流信息</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="copyTrackingNo">
					<i class="el-icon-document-copy"></i> 复制单号
				</el-button>
				<el-button size="small" type="primary" @click="refreshLogistics"
					:loading="loadingStates.refreshLogistics">
					<i class="el-icon-refresh"></i> 刷新物流
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		pageOrder,
		deleteOrder
	} from '@/api/Order'
	import {
		deliveryTrace
	} from '@/api/Express'
	import {
		sendReminderPayment,
		sendPriceDiff
	} from '@/api/sms'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'
	import {
		getUserById
	} from '@/api/User'
	export default {
		name: 'OrderManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					paymentMethod: '',
					shippingStatus: '',
					isPriceDifferencePaid: '',
					orderStatus: '',
					userId: ''
				},
				tableData: [],
				total: 0,
				detailVisible: false,
				detail: {},
				// 物流相关数据
				logisticsVisible: false,
				logisticsData: {},
				trackList: [], // 物流轨迹
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
					() => pageOrder(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取订单列表失败'
				);
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
				this.queryParams.paymentMethod = '';
				this.queryParams.shippingStatus = '';
				this.queryParams.isPriceDifferencePaid = '';
				this.queryParams.orderStatus = '';
				this.handleSearch();
			},

			// 查看详情
			handleDetail(row) {
				const loadingKey = 'detail_' + row.orderId;
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

			// 删除
			handleDelete(row) {
				this.$confirm('确认要删除该订单吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const loadingKey = 'delete_' + row.orderId;

					this.loadDataWithLoading(
						() => deleteOrder(row.orderId),
						loadingKey,
						() => {
							this.$message.success('删除成功');
							this.getList();
						},
						'删除订单失败'
					);
				}).catch(() => {});
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

			// 查看物流
			handleViewLogistics(row) {
				const loadingKey = 'logistics_' + row.orderId;
				this.setAreaLoading(loadingKey, true);

				// 打开物流弹窗
				this.logisticsVisible = true;
				this.setAreaLoading('logistics', true);

				// 设置基本物流数据
				this.logisticsData = {
					...row
				};
				console.log(row)
				// 调用物流API获取轨迹数据
				this.getLogisticsTrack(row).finally(() => {
					this.setAreaLoading('logistics', false);
					this.setAreaLoading(loadingKey, false);
				});
			},

			// 获取物流轨迹数据
			async getLogisticsTrack(order) {
				this.trackList = []
				try {
					// 构建请求参数，调用真实物流API
					const params = {
						businessParams: {
							deliveryId: order.deliveryId || order.orderNo,
							deliveryType: order.expressCode || 'STO-INT' // 默认申通快递
						},
						// businessParams: {
						//   deliveryId: 'YT2547445214256',
						//   deliveryType:  'YTO' // 默认申通快递
						// }
					};

					const response = await deliveryTrace(params);

					if (response && response.data && response.data.length > 0) {
						// 处理API返回的物流轨迹数据
						this.trackList = response.data.map(item => {
							const date = new Date(item.time);
							return {
								time: item.time,
								timeStr: this.formatTime(date),
								dateStr: this.formatDate(date),
								content: item.desc,
								location: this.extractLocation(item.desc)
							};
						});
					} else {
						// 如果没有物流轨迹数据，根据订单状态显示默认信息
						// this.generateDefaultTrackList(order);
					}
				} catch (error) {
					console.error('获取物流轨迹数据失败:', error);
					this.$message.error('获取物流信息失败');
					// 发生错误时，根据订单状态显示默认信息
					this.generateDefaultTrackList(order);
				}
			},

			// 根据订单状态生成默认物流信息
			generateDefaultTrackList(order) {
				const currentDate = new Date();

				if (order.shippingStatus === 0) {
					// 待取件状态
					this.trackList = [{
						time: this.formatDateTime(currentDate),
						timeStr: this.formatTime(currentDate),
						dateStr: this.formatDate(currentDate),
						content: '您的订单已生成，等待快递员上门取件',
						location: order.senderCity
					}];
				} else if (order.shippingStatus === 1) {
					// 已取件状态
					const pickupDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
					this.trackList = [{
							time: this.formatDateTime(currentDate),
							timeStr: this.formatTime(currentDate),
							dateStr: this.formatDate(currentDate),
							content: '快递员已取件，正在送往分拣中心',
							location: order.senderCity
						},
						{
							time: this.formatDateTime(pickupDate),
							timeStr: this.formatTime(pickupDate),
							dateStr: this.formatDate(pickupDate),
							content: '您的订单已生成，等待快递员上门取件',
							location: order.senderCity
						}
					];
				} else if (order.shippingStatus === 10) {
					// 已取消状态
					this.trackList = [{
						time: this.formatDateTime(currentDate),
						timeStr: this.formatTime(currentDate),
						dateStr: this.formatDate(currentDate),
						content: '订单已取消',
						location: ''
					}];
				} else {
					// 默认状态
					this.trackList = [{
						time: this.formatDateTime(currentDate),
						timeStr: this.formatTime(currentDate),
						dateStr: this.formatDate(currentDate),
						content: '暂无物流信息',
						location: ''
					}];
				}
			},

			// 从物流描述中提取位置信息
			extractLocation(desc) {
				if (!desc) return '';

				// 使用正则表达式匹配【】中的内容
				const locationMatch = desc.match(/【(.*?)】/);
				if (locationMatch) {
					return locationMatch[1];
				}

				// 如果没有【】格式，尝试匹配"已到达"或"已发往"后面的位置
				const locationMatch2 = desc.match(/(?:已到达|已发往)\s*(.*?)(?:\s|$)/);
				if (locationMatch2) {
					return locationMatch2[1];
				}

				return '';
			},

			// 刷新物流信息
			refreshLogistics() {
				this.setAreaLoading('refreshLogistics', true);

				// 调用实际的物流API刷新数据
				this.getLogisticsTrack(this.logisticsData).finally(() => {
					this.$message.success('物流信息已更新');
					this.setAreaLoading('refreshLogistics', false);
				});
			},

			// 复制运单号
			copyTrackingNo() {
				const trackingNo = this.logisticsData.orderNo || this.logisticsData.deliveryId;
				if (!trackingNo) {
					this.$message.warning('无效的运单号');
					return;
				}

				// 创建一个临时textarea元素
				const textarea = document.createElement('textarea');
				textarea.value = trackingNo;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);

				this.$message.success('运单号已复制到剪贴板');
			},

			// 获取随机送件员姓名（模拟数据用）
			getRandomName() {
				const names = ['张师傅', '李师傅', '王师傅', '赵师傅', '钱师傅'];
				return names[Math.floor(Math.random() * names.length)];
			},

			// 获取快递公司Logo
			getExpressLogo(code) {
				// 实际项目中应该使用真实的快递公司logo
				return 'https://img.yzcdn.cn/upload_files/2021/04/14/FgoR58PFafYiZC8-XUE-itF5MUH5.png';
			},

			// 获取快递公司名称
			getExpressName(code) {
				const expressMap = {

					'SF': '顺丰速运',
					'ZTO': '中通快递',
					'YTO': '圆通速递',
					'YUND': '韵达快递',
					'BEST': '百世快递',
					'STO-INT': '申通快递',
					'JD': '京东快递',
					'DOP': '德邦快递',
					'JT': '极兔速递',
					'KY': '跨越速运',
					'CAINIAO': '菜鸟裹裹',
					'CNSD': '菜鸟速递',
					'SXJD': '顺心捷达',
					'YMDD': '壹米滴答'

				}

				return code ? (expressMap[code] || '易达速递') : '易达速递';
			},

			// 格式化日期时间
			formatDateTime(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');

				return `${year}-${month}-${day} ${hours}:${minutes}`;
			},

			// 格式化时间
			formatTime(date) {
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');

				return `${hours}:${minutes}`;
			},

			// 格式化日期
			formatDate(date) {
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');

				return `${month}-${day}`;
			},

			// 获取支付方式标签类型
			getPaymentMethodType(row) {
				const type = row.paymentMethod;
				if (type === 0) return 'success';
				if (type === 1) return 'primary';
				return '';
			},

			// 获取支付方式文本
			getPaymentMethodText(row) {
				const type = row.paymentMethod;
				if (type === 0) return '线下寄付';
				if (type === 1) return '线下到付';
				if (type === 2) {
					if (row.orderStatus == 1) {
						return '微信支付';
					} else if (row.orderStatus == 4) {
						return '月结支付';
					} else if (row.orderStatus == 7) {
						return '线上到付';
					} else if (row.orderStatus == 8) {
						return '线上到付';
					}
				}
				return '未知';
			},

			// 获取运送状态标签类型
			getShippingStatusType(status) {
				if (status === 0) return 'warning';
				if (status === 1) return 'primary';
				if (status === 2) return 'primary';
				if (status === 3) return 'success';
				if (status === 6) return 'danger';
				if (status === 10) return 'info';
				return '';
			},

			// 获取运送状态文本
			getShippingStatusText(status) {
				if (status === 0) return '待取件';
				if (status === 1) return '已取件';
				if (status === 2) return '运输中';
				if (status === 3) return '已签收';
				if (status === 6) return '异常';
				if (status === 10) return '已取消';
				return '未知状态';
			},

			// 获取订单状态标签类型
			getOrderStatusType(status) {
				if (status === 0) return 'warning';
				if (status === 1) return 'success';
				if (status === 2) return 'info';
				if (status === 3) return 'info';
				if (status === 4) return 'success';
				if (status === 7) return 'warning';
				if (status === 8) return 'success';
				return '';
			},

			// 获取订单状态文本
			getOrderStatusText(status) {
				if (status === 0) return '待支付';
				if (status === 1) return '微信已支付';
				if (status === 2) return '未支付已取消';
				if (status === 3) return '已取消已退款';
				if (status === 4) return '月结已支付';
				if (status === 7) return '线上到付未支付';
				if (status === 8) return '线上到付已支付';
				return '未知状态';
			},

			// 获取差价状态标签类型
			getPriceDifferenceType(row) {
				if (!row.isPriceDifferencePaid) return '';

				// 有差价但未支付
				if (row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid ===
					0) {
					return 'danger';
				}

				// 有差价且已支付
				if (row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid ===
					1) {
					return 'success';
				}

				return 'info';
			},

			// 获取差价状态文本
			getPriceDifferenceText(row) {
				// if (!row.isPriceDifferencePaid) return '无需补差价';

				// 有差价但未支付
				if (row.orderPriceDifference !== 0.00 && row.isPriceDifferencePaid === 0) {
					return '待补差价';
				}

				// 有差价且已支付
				if (row.orderPriceDifference !== 0.00 && row.isPriceDifferencePaid === 1) {
					return '已补差价';
				}

				return '无需补差价';
			},

			// 提醒补差价
			handleRemindPayDiff(row) {
				this.$confirm(`确认要提醒用户补差价吗？差价金额: ${row.orderPriceDifference}元`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loadingKey = 'remind_' + row.orderId;
					this.setAreaLoading(loadingKey, true);
					getUserById(row.userId).then(userResponse => {

						if (userResponse && userResponse.code === 200 && userResponse.data) {
							const userInfo = userResponse.data;
							if (!userInfo.phone) {
								this.$message.error('用户未设置手机号，无法发送提醒');
								this.setAreaLoading('monthlyReminder', false);
								return;
							}
							// 调用提醒补差价API
							const params = {
								phoneNumber: userInfo.phone,
								orderId: row.orderId
							};

							sendPriceDiff(params).then(response => {
								this.$message.success('补差价提醒已发送');
							}).catch(error => {
								this.$message.error('发送补差价提醒失败');
								console.error('发送补差价提醒失败:', error);
							}).finally(() => {
								this.setAreaLoading(loadingKey, false);
							});
						}
					}).catch(error => {
						this.$message.error('获取用户信息失败');
						console.error('获取用户信息异常:', error);
						this.setAreaLoading('monthlyReminder', false);
					});

				}).catch(() => {});
			},

			// 检查并提醒补差价
			handleCheckAndRemindDiff(row) {
				const loadingKey = 'check_diff_' + row.orderId;
				this.setAreaLoading(loadingKey, true);

				// 判断是否需要补差价
				if (row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid ===
					0) {
					// 需要补差价
					this.$confirm(`该订单需要补差价，差价金额: ${row.orderPriceDifference}元，是否发送提醒？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						getUserById(row.userId).then(userResponse => {

							if (userResponse && userResponse.code === 200 && userResponse.data) {
								const userInfo = userResponse.data;
								if (!userInfo.phone) {
									this.$message.error('用户未设置手机号，无法发送提醒');
									this.setAreaLoading('monthlyReminder', false);
									return;
								}
								const params = {
									phoneNumber: userInfo.phone,
									orderId: row.orderId
								};

								sendPriceDiff(params).then(response => {
									this.$message.success('补差价提醒已发送');
								}).catch(error => {
									this.$message.error('发送补差价提醒失败');
									console.error('发送补差价提醒失败:', error);
								});
							}
						}).catch(error => {
							this.$message.error('获取用户信息失败');
							console.error('获取用户信息异常:', error);
							this.setAreaLoading('monthlyReminder', false);
						});
						// 调用提醒补差价API

					}).catch(() => {}).finally(() => {
						this.setAreaLoading(loadingKey, false);
					});
				} else {
					// 不需要补差价
					this.$message.info('该订单无需补差价');
					this.setAreaLoading(loadingKey, false);
				}
			},

			// 提醒付款
			handleRemindPayment(row) {
				this.$confirm(`确认要提醒用户支付该订单吗？订单金额: ${row.orderTotalPrice}元`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					const loadingKey = 'payment_' + row.orderId;
					this.setAreaLoading(loadingKey, true);

					getUserById(row.userId).then(userResponse => {

						if (userResponse && userResponse.code === 200 && userResponse.data) {
							const userInfo = userResponse.data;
							if (!userInfo.phone) {
								this.$message.error('用户未设置手机号，无法发送提醒');
								this.setAreaLoading('monthlyReminder', false);
								return;
							}
							// 调用提醒付款API
							const params1 = {
								phoneNumber: userInfo.phone,
								orderId: row.orderId
							};
							const params2 = {
								phoneNumber: row.receiverPhone,
								orderId: row.orderId
							};
							// const params = {
							// 	phoneNumber: 17520209079,
							// 	orderId: row.orderId
							// };

							sendReminderPayment(params1).then(response1 => {
								sendReminderPayment(params2).then(response2 => {
									this.$message.success('发送付款提醒成功');
								})
							}).catch(error => {
								this.$message.error('发送付款提醒失败');
								console.error('发送付款提醒失败:', error);
							}).finally(() => {
								this.setAreaLoading(loadingKey, false);
							});


						}
					}).catch(error => {
						this.$message.error('获取用户信息失败');
						console.error('获取用户信息异常:', error);
						this.setAreaLoading('monthlyReminder', false);
					});
				}).catch(() => {

				});
			},
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

	.price-difference {
		color: #F56C6C;
		font-weight: bold;
	}

	.logistics-dialog {
		border-radius: 16px;
		overflow: hidden;
	}

	.logistics-container {
		padding: 10px;
	}

	.logistics-card {
		background: #fff;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		margin-bottom: 20px;
		position: relative;
		overflow: hidden;
	}

	.express-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid #f5f5f5;
	}

	.express-info {
		display: flex;
		align-items: center;
	}

	.logo-container {
		width: 40px;
		height: 40px;
		background: #f8f8f8;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
	}

	.logo-container img {
		width: 30px;
		height: 30px;
	}

	.name-no {
		display: flex;
		flex-direction: column;
	}

	.name-no .name {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 4px;
	}

	.name-no .no {
		font-size: 12px;
		color: #999;
	}

	.address-info {
		padding: 10px 0;
	}

	.address-flow {
		position: relative;
	}

	.from,
	.to {
		display: flex;
		align-items: flex-start;
		margin-bottom: 15px;
		position: relative;
		z-index: 2;
	}

	.label-box {
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		background: #FF6B01;
		color: #fff;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		margin-right: 12px;
	}

	.to .label-box {
		background: #2979FF;
	}

	.info {
		flex: 1;
	}

	.info .name {
		font-size: 14px;
		color: #333;
		font-weight: 500;
		margin-bottom: 4px;
	}

	.info .address {
		font-size: 12px;
		color: #666;
		line-height: 1.5;
	}

	.flow-line {
		position: absolute;
		top: 14px;
		left: 14px;
		height: calc(100% - 28px);
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flow-line .dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.flow-line .dot.start {
		background: #FF6B01;
	}

	.flow-line .dot.end {
		background: #2979FF;
	}

	.flow-line .line {
		width: 2px;
		height: 100%;
		background: #f0f0f0;
		margin: 4px 0;
	}

	.logistics-track {
		background: #fff;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.track-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f5f5f5;
	}

	.title-with-icon {
		display: flex;
		align-items: center;
	}

	.title-with-icon i {
		margin-right: 8px;
		color: #FF6B01;
	}

	.title-with-icon span {
		font-size: 16px;
		font-weight: 600;
		color: #333;
	}

	.update-time {
		font-size: 12px;
		color: #999;
	}

	.track-list {
		max-height: 350px;
		overflow-y: auto;
	}

	.track-item {
		display: flex;
		margin-bottom: 20px;
	}

	.track-active .time-column .time,
	.track-active .time-column .date {
		color: #FF6B01;
		font-weight: 600;
	}

	.track-active .content-column .content {
		color: #333;
		font-weight: 600;
	}

	.time-column {
		width: 70px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 15px;
	}

	.time-column .time {
		font-size: 14px;
		color: #333;
		margin-bottom: 4px;
	}

	.time-column .date {
		font-size: 12px;
		color: #999;
	}

	.node-column {
		width: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.node-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #ddd;
		margin-top: 6px;
		position: relative;
	}

	.active-dot {
		background: #FF6B01 !important;
		box-shadow: 0 0 0 4px rgba(255, 107, 1, 0.15);
	}

	.inner-dot {
		width: 4px;
		height: 4px;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.pulse-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 10px;
		border: 1px solid #FF6B01;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.node-line {
		width: 2px;
		height: 60px;
		background: #f0f0f0;
		margin-top: 4px;
	}

	.content-column {
		flex: 1;
		padding-left: 15px;
	}

	.content-column .content {
		font-size: 14px;
		color: #333;
		line-height: 1.5;
		margin-bottom: 4px;
	}

	.location-info {
		display: flex;
		align-items: center;
	}

	.location-info i {
		margin-right: 4px;
		font-size: 12px;
		color: #999;
	}

	.location {
		font-size: 12px;
		color: #999;
	}

	.empty-track {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px 0;
	}

	.empty-track i {
		font-size: 40px;
		color: #ddd;
		margin-bottom: 15px;
	}

	.empty-track span {
		font-size: 14px;
		color: #999;
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}

		70% {
			transform: translate(-50%, -50%) scale(2);
			opacity: 0;
		}

		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0;
		}
	}

	.dialog-footer {
		/* 添加对话框底部按钮容器样式代码 */
	}
</style>
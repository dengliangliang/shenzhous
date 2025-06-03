<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="问题反馈数据加载中...">
		</delivery-loading>

		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<el-form-item label="反馈类型">
					<el-select v-model="queryParams.type" placeholder="请选择反馈类型" clearable>
						<el-option label="功能异常" value="bug"></el-option>
						<el-option label="体验问题" value="suggestion"></el-option>
						<el-option label="产品建议" value="experience"></el-option>
						<el-option label="服务投诉" value="complaint"></el-option>
						<el-option label="其他问题" value="other"></el-option>
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
				<!-- <el-table-column prop="feedbackId" label="反馈问题ID" align="center"></el-table-column> -->
				<el-table-column  label="反馈类型" align="center">
					<template slot-scope="scope">
						{{getType(scope.row.type)}}
					</template>
				</el-table-column>
				<el-table-column prop="content" label="反馈内容" align="center"></el-table-column>
				<el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				
				<el-table-column label="操作" width="220" align="center">
					<template slot-scope="scope">
						
						<el-button size="small" type="danger" @click="handleDelete(scope.row)" :loading="loadingStates['delete_'+scope.row.typeId]">删除</el-button>
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

		
	</div>
</template>

<script>
	import {
		pageFeedback,
		deleteFeedback
	} from '@/api/Feedback'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'Feedback',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					type:''
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				dialogTitle: '',
				
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
					() => pageFeedback(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取反馈问题列表失败'
				);
			},
			getType(type) {
			  const typeMap = {
			    'bug': '功能异常',
			    'suggestion': '体验问题',
			    'experience': '产品建议',
			    'complaint': '服务投诉',
			    'other': '其他问题'
			  };
			  return typeMap[type] || typeMap['other']; // 默认返回"其他问题"
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
				this.queryParams.expressTypeName = '';
				this.handleSearch();
			},

			



			// 删除
			handleDelete(row) {
				this.$confirm('确认要删除该反馈问题吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const loadingKey = 'delete_' + row.feedbackId;
					
					this.loadDataWithLoading(
						() => deleteFeedback(row.feedbackId),
						loadingKey,
						() => {
							this.$message.success('删除成功');
							this.getList();
						},
						'删除失败'
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
</style>
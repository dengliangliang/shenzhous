<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="快递公司数据加载中...">
		</delivery-loading>
		
		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<el-form-item label="快递名称">
					<el-input v-model="queryParams.expressName" placeholder="请输入快递名称"></el-input>
				</el-form-item>
				<el-form-item label="快递公司">
					<el-input v-model="queryParams.deliveryType" placeholder="请输入快递公司"></el-input>
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
				<el-table-column prop="expressId" label="快递ID" align="center"></el-table-column>
				<el-table-column prop="expressName" label="快递名称" align="center"></el-table-column>
				<el-table-column prop="deliveryType" label="快递公司" align="center"></el-table-column>
				<el-table-column prop="profit" label="利润" align="center">
					<template slot-scope="scope">
						{{ scope.row.profit }}%
					</template>
				</el-table-column>
				<el-table-column prop="isClose" label="是否关闭" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.isClose" :active-value="1" :inactive-value="0"
							@change="handleStatusChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"
							:disabled="loadingStates['status_'+scope.row.expressId]">
						</el-switch>
						<el-tag v-if="loadingStates['status_'+scope.row.expressId]" size="mini" type="info">更新中</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleEdit(scope.row)">修改利润</el-button>
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

		<!-- 修改利润对话框 -->
		<el-dialog :title="'修改利润'" :visible.sync="dialogVisible" width="500px">
			<div style="position: relative;">
				<!-- 表单加载动画 -->
				<delivery-loading v-if="loadingStates.form" text="数据处理中..."></delivery-loading>
				
				<el-form :model="form" :rules="rules" ref="form" label-width="100px">
					<el-form-item label="快递名称">
						<span>{{ form.expressName }}</span>
					</el-form-item>
					<el-form-item label="快递公司">
						<span>{{ form.deliveryType }}</span>
					</el-form-item>
					<el-form-item label="利润" prop="profit">
						<el-input-number v-model="form.profit" :precision="2" :step="0.01" :min="0" :max="100"
							controls-position="right">
						</el-input-number>
						<span class="unit">%</span>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm" :loading="loadingStates.submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		pageExpress,
		updateExpress
	} from '@/api/Express'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'ExpressManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					expressName: '',
					deliveryType: ''
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				form: {
					expressId: '',
					expressName: '',
					deliveryType: '',
					profit: 0
				},
				rules: {
					profit: [{
						required: true,
						message: '请输入利润',
						trigger: 'blur'
					}]
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
					() => pageExpress(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取快递公司列表失败'
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
				this.queryParams.expressName = '';
				this.queryParams.deliveryType = '';
				this.handleSearch();
			},

			// 修改利润
			handleEdit(row) {
				this.dialogVisible = true;
				this.setAreaLoading('form', true);
				
				this.$nextTick(() => {
					this.form = {
						...row
					};
					// 模拟加载延迟，显示加载效果
					setTimeout(() => {
						this.setAreaLoading('form', false);
					}, 500);
				});
			},

			// 切换状态
			async handleStatusChange(row) {
				const loadingKey = 'status_' + row.expressId;
				
				this.loadDataWithLoading(
					() => updateExpress(row),
					loadingKey,
					() => {
						this.$message.success('状态更新成功');
						this.getList();
					},
					'状态更新失败'
				);
			},

			// 提交表单
			submitForm() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						this.loadDataWithLoading(
							() => updateExpress(this.form),
							'submit',
							() => {
								this.$message.success('利润修改成功');
								this.dialogVisible = false;
								this.getList();
							},
							'利润修改失败'
						);
					}
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

	.unit {
		margin-left: 10px;
	}
</style>
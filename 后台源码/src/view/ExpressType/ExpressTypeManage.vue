<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="快递类型数据加载中...">
		</delivery-loading>

		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<el-form-item label="类型名称">
					<el-input v-model="queryParams.expressTypeName" placeholder="请输入类型名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch" :loading="loadingStates.search">查询</el-button>
					<el-button @click="resetQuery">重置</el-button>
					<el-button type="success" @click="handleAdd">新增</el-button>
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
				<el-table-column prop="typeId" label="类型ID" align="center"></el-table-column>
				<el-table-column prop="typeName" label="类型名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
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

		<!-- 新增/编辑对话框 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
			<div style="position: relative;">
				<!-- 表单加载动画 -->
				<delivery-loading v-if="loadingStates.form" text="数据处理中..."></delivery-loading>
				
				<el-form :model="form" :rules="rules" ref="form" label-width="100px">
					<el-form-item label="类型名称" prop="typeName">
						<el-input v-model="form.typeName" placeholder="请输入类型名称"></el-input>
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
		pageExpressType,
		addExpressType,
		updateExpressType,
		deleteExpressType
	} from '@/api/ExpressType'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'ExpressTypeManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					expressTypeName: ''
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				dialogTitle: '',
				form: {
					typeId: '',
					typeName: ''
				},
				rules: {
					typeName: [{
						required: true,
						message: '请输入类型名称',
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
					() => pageExpressType(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取寄件类型列表失败'
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
				this.queryParams.expressTypeName = '';
				this.handleSearch();
			},

			// 新增
			handleAdd() {
				this.dialogTitle = '新增寄件类型';
				this.dialogVisible = true;
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = {
						typeId: '',
						typeName: ''
					};
				});
			},

			// 编辑
			handleEdit(row) {
				this.dialogTitle = '编辑寄件类型';
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

			// 提交表单
			submitForm() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						const api = this.form.typeId ? updateExpressType : addExpressType;
						const successMsg = this.form.typeId ? '更新成功' : '新增成功';
						const errorMsg = this.form.typeId ? '更新失败' : '新增失败';
						
						this.loadDataWithLoading(
							() => api(this.form),
							'submit',
							() => {
								this.$message.success(successMsg);
								this.dialogVisible = false;
								this.getList();
							},
							errorMsg
						);
					}
				});
			},

			// 删除
			handleDelete(row) {
				this.$confirm('确认要删除该寄件类型吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const loadingKey = 'delete_' + row.typeId;
					
					this.loadDataWithLoading(
						() => deleteExpressType(row.typeId),
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
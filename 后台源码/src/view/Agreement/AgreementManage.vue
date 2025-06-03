<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="协议数据加载中...">
		</delivery-loading>

		<!-- 工具栏 -->
		<div class="toolbar-wrapper">
			<el-button type="primary" @click="handleAdd">新增协议</el-button>
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
				<!-- <el-table-column prop="agreementId" label="协议ID" align="center"></el-table-column> -->
				<el-table-column prop="agreementType" label="协议类型" align="center">
					<template slot-scope="scope">
						<el-tag :type="getAgreementTypeTag(scope.row.agreementType)">
							{{ getAgreementTypeText(scope.row.agreementType) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="small" type="success" @click="handlePreview(scope.row)">预览</el-button>
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

		<!-- 编辑对话框 -->
		<el-dialog :title="form.agreementId ? '编辑协议' : '新增协议'" :visible.sync="dialogVisible" width="1200px"
			:before-close="handleClose" class="agreement-dialog">
			<div style="position: relative;">
				<!-- 表单加载动画 -->
				<delivery-loading v-if="loadingStates.form" text="协议数据处理中..."></delivery-loading>
				
				<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="agreement-form">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="协议类型" prop="agreementType">
								<el-select v-model="form.agreementType" placeholder="请选择协议类型" style="width: 100%">
									<el-option label="隐私协议" value="0">
										<i class="el-icon-lock"></i>
										<span>隐私协议</span>
									</el-option>
									<el-option label="快递协议" value="1">
										<i class="el-icon-truck"></i>
										<span>快递协议</span>
									</el-option>
									<el-option label="违禁品说明" value="2">
										<i class="el-icon-warning"></i>
										<span>违禁品说明</span>
									</el-option>
									<el-option label="用户协议" value="3">
										<i class="el-icon-user"></i>
										<span>用户协议</span>
									</el-option>
									<el-option label="月结服务协议" value="4">
										<i class="el-icon-money"></i>
										<span>月结服务协议</span>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="协议内容" prop="context">
						<div class="editor-wrapper">
							<mavon-editor v-model="form.context" :toolbars="markdownOption" @save="handleSave"
								:boxShadow="false" placeholder="请输入协议内容..." :style="{height: '600px'}"
								class="custom-editor" />
						</div>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose" size="medium">取 消</el-button>
				<el-button type="primary" @click="submitForm" size="medium" :loading="loadingStates.submit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 预览对话框 -->
		<el-dialog title="协议预览" :visible.sync="previewVisible" width="1000px" class="preview-dialog">
			<div style="position: relative;">
				<!-- 预览加载动画 -->
				<delivery-loading v-if="loadingStates.preview"></delivery-loading>
				
				<div class="preview-header">
					<el-tag :type="getAgreementTypeTag(form.agreementType)" size="medium">
						{{ getAgreementTypeText(form.agreementType) }}
					</el-tag>
				</div>
				<div class="markdown-body preview-content" v-html="compiledMarkdown"></div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		pageAgreement,
		addAgreement,
		updateAgreement
	} from '@/api/Agreement'
	import {
		mavonEditor
	} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import showdown from 'showdown'
	import 'github-markdown-css'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'AgreementManage',
		components: {
			mavonEditor,
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				previewVisible: false,
				form: {
					agreementId: '',
					agreementType: '',
					context: ''
				},
				rules: {
					agreementType: [{
						required: true,
						message: '请选择协议类型',
						trigger: 'change'
					}],
					context: [{
						required: true,
						message: '请输入协议内容',
						trigger: 'blur'
					}]
				},
				markdownOption: {
					bold: true,
					italic: true,
					header: true,
					underline: true,
					strikethrough: true,
					mark: true,
					superscript: true,
					subscript: true,
					quote: true,
					ol: true,
					ul: true,
					link: true,
					imagelink: true,
					code: true,
					table: true,
					fullscreen: true,
					readmodel: true,
					htmlcode: true,
					help: true,
					undo: true,
					redo: true,
					trash: true,
					save: true,
					navigation: true
				},
				compiledMarkdown: '',
				converter: new showdown.Converter({
					tables: true,
					simplifiedAutoLink: true,
					strikethrough: true,
					tasklists: true
				})
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
					() => pageAgreement(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取协议列表失败'
				);
			},

			// 编辑
			handleEdit(row) {
				this.dialogVisible = true
				this.$nextTick(() => {
					if (row) {
						// 显示加载
						this.setAreaLoading('form', true);
						this.form = {
							...row
						}
						// 模拟延迟，显示加载效果
						setTimeout(() => {
							this.setAreaLoading('form', false);
						}, 500);
					} else {
						this.form = {
							agreementId: '',
							agreementType: '',
							context: ''
						}
					}
				})
			},

			// 预览
			handlePreview(row) {
				this.setAreaLoading('preview', true);
				this.previewVisible = true;
				
				this.$nextTick(() => {
					this.form = {
						...row
					}
					this.compiledMarkdown = this.converter.makeHtml(row.context || '');
					
					// 模拟加载延迟，显示加载效果
					setTimeout(() => {
						this.setAreaLoading('preview', false);
					}, 600);
				});
			},

			// 保存
			handleSave(value, render) {
				this.form.context = value
			},

			// 关闭对话框
			handleClose() {
				this.$confirm('确认关闭？未保存的数据将会丢失', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogVisible = false
					this.$refs.form.resetFields()
				}).catch(() => {})
			},

			// 提交表单
			submitForm() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						const api = this.form.agreementId ? updateAgreement : addAgreement;
						const successMsg = this.form.agreementId ? '更新成功' : '新增成功';
						const errorMsg = this.form.agreementId ? '更新失败' : '新增失败';
						
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
				})
			},

			// 获取协议类型标签样式
			getAgreementTypeTag(type) {
				const map = {
					'0': 'success',
					'1': 'primary',
					'2': 'warning',
					'3': 'info',
					'4': 'danger'
				}
				return map[type] || ''
			},

			// 获取协议类型文本
			getAgreementTypeText(type) {
				const map = {
					'0': '隐私协议',
					'1': '快递协议',
					'2': '违禁品说明',
					'3': '用户协议',
					'4': '月结服务协议'
				}
				return map[type] || '未知类型'
			},

			// 分页
			handleSizeChange(val) {
				this.queryParams.pageSize = val
				this.getList()
			},

			handleCurrentChange(val) {
				this.queryParams.pageIndex = val
				this.getList()
			},

			// 新增
			handleAdd() {
				this.dialogVisible = true
				this.$nextTick(() => {
					this.$refs.form.resetFields()
					this.form = {
						agreementId: '',
						agreementType: '',
						context: ''
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		position: relative;
	}

	.pagination-container {
		margin-top: 20px;
		text-align: right;
	}

	.markdown-body {
		padding: 20px;
		min-height: 200px;
		max-height: 600px;
		overflow-y: auto;
	}

	.toolbar-wrapper {
		margin-bottom: 20px;
	}

	.agreement-dialog {
		/* Add your styles here */
	}

	.agreement-form {
		/* Add your styles here */
	}

	.editor-wrapper {
		/* Add your styles here */
	}

	.custom-editor {
		/* Add your styles here */
	}

	.preview-dialog {
		/* Add your styles here */
	}

	.preview-header {
		margin-bottom: 10px;
	}

	.preview-content {
		/* Add your styles here */
	}
</style>
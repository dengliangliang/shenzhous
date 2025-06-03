<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading v-if="fullscreenLoading" :fullscreen="true" :progress="loadingProgress" text="背景图片数据加载中...">
		</delivery-loading>

		<!-- 搜索区域 -->
		<div class="search-wrapper">
			<el-form :inline="true" :model="queryParams" class="demo-form-inline">
				<el-form-item label="图片名称">
					<el-input v-model="queryParams.backgroundPhotoName" placeholder="请输入图片名称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" @click="handleSearch" :loading="loadingStates.search">查询</el-button>
					<el-button @click="resetQuery">重置</el-button>
					<el-button type="success" @click="handleAdd">新增背景图</el-button>
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
				
				<el-table-column prop="backgroundPhotoName" label="图片名称" align="center"></el-table-column>
				<el-table-column prop="appId" label="应用ID" align="center"></el-table-column>
				<el-table-column prop="path" label="路径" align="center"></el-table-column>
				<el-table-column label="图片预览" align="center">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 60px" :src="$globalParam.apiUrl + scope.row.backgroundPhotoUrl"
							:preview-src-list="[$globalParam.apiUrl + scope.row.backgroundPhotoUrl]" fit="cover">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.row)"
							:loading="loadingStates['delete_'+scope.row.backgroundPhotoId]">删除</el-button>
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
					
					<el-form-item label="图片名称" prop="backgroundPhotoName">
						<el-input v-model="form.backgroundPhotoName" placeholder="请输入图片名称"></el-input>
					</el-form-item>
					<el-form-item label="应用ID" >
						<el-input v-model="form.appId" placeholder="请输入应用ID"></el-input>
					</el-form-item>
					<el-form-item label="路径">
						<el-input v-model="form.path" placeholder="请输入路径"></el-input>
					</el-form-item>
					<el-form-item label="背景图片" prop="backgroundPhotoUrl" required>
						<el-upload class="avatar-uploader" action="#" :show-file-list="false"
							:before-upload="beforeImageUpload" :http-request="handleImageUpload">
							<img v-if="form.backgroundPhotoUrl" :src="$globalParam.apiUrl + form.backgroundPhotoUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">建议尺寸：1920×1080，大小不超过2MB</div>
						</el-upload>
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
		pageBackgroundPhoto,
		addBackgroundPhoto,
		updateBackgroundPhoto,
		deleteBackgroundPhoto
	} from '@/api/BackgroundPhoto'
	import {
		orderFileUpload,
		deleteFile
	} from '@/api/File'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'BackgroundPhotoManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					backgroundPhotoName: '',
					appId: '',
					path: ''
				},
				tableData: [],
				total: 0,
				dialogVisible: false,
				dialogTitle: '',
				form: {
					backgroundPhotoId: '',
					backgroundPhotoName: '',
					backgroundPhotoUrl: '',
					appId: '',
					path: ''
				},
				rules: {
					backgroundPhotoName: [{
						required: true,
						message: '请输入图片名称',
						trigger: 'blur'
					}],
					backgroundPhotoUrl: [{
						required: true,
						message: '请上传背景图片',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
			this.startFullscreenLoading();
			this.getList().finally(() => {
				this.stopFullscreenLoading();
			});
		},
		methods: {
			// 获取列表
			async getList() {
				return this.loadDataWithLoading(
					() => pageBackgroundPhoto(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取背景图片列表失败'
				);
			},

			// 搜索
			async handleSearch() {
				this.queryParams.pageIndex = 1;
				this.setAreaLoading('search', true);
				try {
					await this.getList();
				} finally {
					this.setAreaLoading('search', false);
				}
			},

			// 重置
			resetQuery() {
				this.queryParams.backgroundPhotoName = '';
				this.queryParams.appId = '';
				this.queryParams.path = '';
				this.handleSearch();
			},

			// 新增
			handleAdd() {
				this.dialogTitle = '新增背景图片';
				this.dialogVisible = true;
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = {
						backgroundPhotoId: '',
						backgroundPhotoName: '',
						backgroundPhotoUrl: '',
						appId: '',
						path: ''
					};
				});
			},

			// 编辑
			handleEdit(row) {
				this.dialogTitle = '编辑背景图片';
				this.dialogVisible = true;
				this.setAreaLoading('form', true);

				this.$nextTick(() => {
					this.form = {
						...row
					};
					setTimeout(() => {
						this.setAreaLoading('form', false);
					}, 500);
				});
			},

			// 图片上传前校验
			beforeImageUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},

			// 自定义图片上传
			async handleImageUpload(file) {
				const formData = new FormData();
				formData.append('file', file.file);
				let fileName = file.file.name.split(".")[0];

				formData.append('name', fileName);
				try {
					const res = await orderFileUpload(formData);
					if (res.code === 200) {
						this.form.backgroundPhotoUrl = res.data;
						this.$message.success('图片上传成功');
					} else {
						this.$message.error(res.message || '图片上传失败');
					}
				} catch (error) {
					this.$message.error('图片上传失败');
				}
			},

			// 提交表单
			submitForm() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						const api = this.form.backgroundPhotoId ? updateBackgroundPhoto : addBackgroundPhoto;
						const successMsg = this.form.backgroundPhotoId ? '更新成功' : '新增成功';
						const errorMsg = this.form.backgroundPhotoId ? '更新失败' : '新增失败';

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
			async handleDelete(row) {
				this.$confirm('确认要删除该背景图片吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const loadingKey = 'delete_' + row.backgroundPhotoId;

					try {
						// 先删除文件服务器上的图片
						await deleteFile(row.backgroundPhotoUrl);

						// 再删除数据库记录
						await this.loadDataWithLoading(
							() => deleteBackgroundPhoto(row.backgroundPhotoId),
							loadingKey,
							() => {
								this.$message.success('删除成功');
								this.getList();
							},
							'删除失败'
						);
					} catch (error) {
						this.$message.error('删除失败');
					}
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

	.avatar-uploader {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		
	}

	.avatar-uploader:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}
</style>
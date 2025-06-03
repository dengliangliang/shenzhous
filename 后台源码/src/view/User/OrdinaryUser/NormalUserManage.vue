<template>
	<div class="main-container">
		<!-- 全屏加载动画 -->
		<delivery-loading 
			v-if="fullscreenLoading" 
			:fullscreen="true" 
			:progress="loadingProgress" 
			text="用户数据加载中...">
		</delivery-loading>
		
		<!-- 导出表单 - 隐藏 -->
		<form ref="exportForm" :action="getExportUrl()" method="get" target="_blank" style="display: none;">
			<input type="hidden" name="identity" value="1">
			<input v-if="queryParams.isReal" type="hidden" name="isReal" :value="queryParams.isReal">
			<input v-if="queryParams.userName" type="hidden" name="userName" :value="queryParams.userName">
			<!-- 导出格式选择 -->
			<input type="hidden" name="format" value="xlsx">
			<!-- 添加时间戳防止缓存 -->
			<input type="hidden" name="t" :value="Date.now()">
		</form>
		
		<!-- 下载用的iframe - 隐藏 -->
		<iframe ref="downloadFrame" style="display:none;"></iframe>
		
		<!-- 搜索区域 -->
		<el-card class="search-card" shadow="hover">
			<div class="card-header">
				<i class="el-icon-search"></i>
				<span>搜索筛选</span>
			</div>
			<el-form :inline="true" :model="queryParams" class="search-form">
				<el-form-item label="用户名">
					<el-input 
						v-model="queryParams.userName" 
						placeholder="请输入用户名" 
						prefix-icon="el-icon-user"
						clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="实名状态">
					<el-select v-model="queryParams.isReal" placeholder="请选择实名状态" clearable>
						<el-option label="未实名" value="0"></el-option>
						<el-option label="审核中" value="1"></el-option>
						<el-option label="已实名" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch" icon="el-icon-search" class="btn-primary" :loading="loadingStates.search">查询</el-button>
					<el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
					<el-button type="success" @click="handleAdd" icon="el-icon-plus" class="btn-success">新增用户</el-button>
					<el-button type="info" @click="handleExport" icon="el-icon-download" class="btn-info" :loading="exportLoading">导出表格</el-button>
					<el-button type="warning" @click="handleBatchSetMoney" icon="el-icon-money" class="btn-warning" :loading="batchMoneyLoading">批量调整邀请佣金</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 表格区域 -->
		<el-card class="table-card" shadow="hover">
			<div class="card-header">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
				<div class="card-header-right">
					<span class="total-count">共 {{total}} 条记录</span>
					<el-button 
						type="text" 
						icon="el-icon-download" 
						class="export-btn"
						@click="handleExport"
						:loading="exportLoading">
						导出用户数据
					</el-button>
				</div>
			</div>
			<div style="position: relative;">
				<!-- 表格加载动画 -->
				<delivery-loading v-if="loadingStates.table"></delivery-loading>
				
				<el-table 
					:data="tableData" 
					border 
					style="width: 100%" 
					:header-cell-style="tableHeaderStyle"
					row-key="userId"
					v-loading="false"
					:stripe="true"
					:highlight-current-row="true">
					<el-table-column label="编号" width="70" align="center">
						<template slot-scope="scope">
							<div class="index-cell">{{scope.$index + 1}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="userName" label="用户名" align="center" min-width="100">
						<template slot-scope="scope">
							<div class="user-info">
								<i class="el-icon-user-solid avatar-icon"></i>
								<span>{{ scope.row.userName }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="phone" label="电话号码" align="center" min-width="120">
						<template slot-scope="scope">
							<div class="phone-cell">
								<i class="el-icon-mobile-phone"></i>
								<span>{{ scope.row.phone }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="identification" label="身份证号" align="center" min-width="160"></el-table-column>
					<el-table-column prop="getMoney" label="佣金金额" align="center" min-width="100">
						<template slot-scope="scope">
							<div class="money-cell">
								<span>¥ {{ scope.row.money || '0.00' }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="isReal" label="实名状态" align="center" min-width="90">
						<template slot-scope="scope">
							<el-tag 
								:type="scope.row.isReal === 2 ? 'success' : scope.row.isReal === 1 ? 'warning' : 'info'"
								size="medium"
								effect="dark">
								{{ scope.row.isReal === 2 ? '已实名' : scope.row.isReal === 1 ? '审核中' : '未实名' }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="isMonth" label="月结资格" align="center" min-width="90">
						<template slot-scope="scope">
							<el-tag 
								:type="scope.row.isMonth === 1 ? 'success' : 'info'"
								size="medium"
								:effect="scope.row.isMonth === 1 ? 'dark' : 'plain'">
								{{ scope.row.isMonth === 1 ? '是' : '否' }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="isGetMoney" label="佣金获取资格" align="center" min-width="120">
						<template slot-scope="scope">
							<el-tag 
								:type="scope.row.isGetMoney === 0 ? 'success' : 'danger'"
								size="medium"
								:effect="scope.row.isGetMoney === 0 ? 'dark' : 'light'">
								{{ scope.row.isGetMoney === 0 ? '允许' : '禁止' }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="isEnable" label="账户状态" align="center" min-width="90">
						<template slot-scope="scope">
							<el-tag 
								:type="scope.row.isEnable === 0 ? 'success' : 'danger'"
								size="medium"
								:effect="scope.row.isEnable === 0 ? 'dark' : 'light'">
								{{ scope.row.isEnable === 0 ? '正常' : '黑名单' }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" align="center" min-width="160"></el-table-column>
					<el-table-column label="操作" width="330" align="center" fixed="right">
						<template slot-scope="scope">
							<div class="action-buttons">
								<el-tooltip content="编辑用户" placement="top" effect="light">
									<el-button 
										size="mini" 
										type="primary" 
										icon="el-icon-edit" 
										circle
										@click="handleEdit(scope.row)"
										:loading="loadingStates['edit_'+scope.row.userId]">
									</el-button>
								</el-tooltip>
								
								<el-tooltip content="调整佣金" placement="top" effect="light">
									<el-button 
										size="mini" 
										type="success" 
										icon="el-icon-money" 
										circle
										@click="handleSetMoney(scope.row)"
										:loading="loadingStates['money_'+scope.row.userId]">
									</el-button>
								</el-tooltip>
								
								<el-tooltip content="重置密码" placement="top" effect="light">
									<el-button 
										size="mini" 
										type="info" 
										icon="el-icon-key" 
										circle
										@click="handleResetPassword(scope.row)"
										:loading="loadingStates['resetPwd_'+scope.row.userId]">
									</el-button>
								</el-tooltip>
								
								<el-tooltip :content="scope.row.isGetMoney === 0 ? '禁止获取佣金' : '允许获取佣金'" placement="top" effect="light">
									<el-button 
										size="mini" 
										:type="scope.row.isGetMoney === 0 ? 'warning' : 'success'"
										:icon="scope.row.isGetMoney === 0 ? 'el-icon-close' : 'el-icon-check'" 
										circle
										@click="toggleMoneyPermission(scope.row)"
										:loading="loadingStates['permission_'+scope.row.userId]">
									</el-button>
								</el-tooltip>
								
								<el-tooltip :content="scope.row.isEnable === 0 ? '加入黑名单' : '移出黑名单'" placement="top" effect="light">
									<el-button 
										size="mini"
										:type="scope.row.isEnable === 0 ? 'danger' : 'success'" 
										:icon="scope.row.isEnable === 0 ? 'el-icon-lock' : 'el-icon-unlock'" 
										circle
										@click="toggleBlacklist(scope.row)"
										:loading="loadingStates['blacklist_'+scope.row.userId]">
									</el-button>
								</el-tooltip>
								
								<el-popconfirm
									title="确认要删除该用户吗？此操作不可恢复！"
									icon="el-icon-warning"
									icon-color="#ff4949"
									confirm-button-text="确定删除"
									cancel-button-text="取消"
									@confirm="handleDelete(scope.row)">
									<el-tooltip content="删除用户" placement="top" effect="light" slot="reference">
										<el-button 
											size="mini" 
											type="danger" 
											icon="el-icon-delete" 
											circle
											:loading="loadingStates['delete_'+scope.row.userId]">
										</el-button>
									</el-tooltip>
								</el-popconfirm>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 分页 -->
			<div class="pagination-container">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange"
					:current-page="queryParams.pageIndex" 
					:page-sizes="[10, 20, 50, 100]" 
					:page-size="queryParams.pageSize"
					:background="true"
					layout="total, sizes, prev, pager, next, jumper" 
					:total="total">
				</el-pagination>
			</div>
		</el-card>

		<!-- 编辑对话框 -->
		<el-dialog 
			:title="dialogTitle" 
			:visible.sync="dialogVisible" 
			width="500px"
			:close-on-click-modal="false"
			center>
			<div style="position: relative;">
				<!-- 表单加载动画 -->
				<delivery-loading v-if="loadingStates.form" text="加载用户数据..."></delivery-loading>
				
				<el-form :model="form" :rules="rules" ref="form" label-width="100px" status-icon>
					<el-form-item label="用户名" prop="userName">
						<el-input 
							v-model="form.userName" 
							placeholder="请输入用户名"
							prefix-icon="el-icon-user">
						</el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password" v-if="!form.userId">
						<el-input 
							v-model="form.password" 
							type="password"
							placeholder="请输入密码"
							prefix-icon="el-icon-lock"
							show-password>
						</el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input 
							v-model="form.phone" 
							placeholder="请输入手机号"
							prefix-icon="el-icon-mobile-phone">
						</el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="identification">
						<el-input 
							v-model="form.identification"
							placeholder="请输入身份证号"
							prefix-icon="el-icon-postcard">
						</el-input>
					</el-form-item>
					<el-form-item label="佣金获取资格" prop="isGetMoney">
						<el-switch
							v-model="form.isGetMoney"
							:active-value="0"
							:inactive-value="1"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-text="允许"
							inactive-text="禁止">
						</el-switch>
					</el-form-item>
					<el-form-item label="账户状态" prop="isEnable">
						<el-switch
							v-model="form.isEnable"
							:active-value="0"
							:inactive-value="1"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-text="正常"
							inactive-text="黑名单">
						</el-switch>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button type="primary" @click="submitForm" icon="el-icon-check" :loading="loadingStates.submit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 佣金调整对话框 -->
		<el-dialog 
			title="调整佣金" 
			:visible.sync="moneyDialogVisible" 
			width="400px"
			:close-on-click-modal="false"
			center>
			<div style="position: relative;">
				<!-- 佣金表单加载动画 -->
				<delivery-loading v-if="loadingStates.moneyForm" text="加载佣金数据..."></delivery-loading>
				
				<div class="money-dialog-content">
					<div class="money-icon">
						<i class="el-icon-money"></i>
					</div>
					<el-form :model="moneyForm" ref="moneyForm" label-width="100px">
						<el-form-item label="当前佣金">
							<div class="current-money">
								<span class="money-symbol">¥</span>
								<span class="money-value">{{ moneyForm.currentMoney || '0.00' }}</span>
							</div>
						</el-form-item>
						<el-form-item label="新佣金金额" prop="newMoney">
							<el-input-number 
								v-model="moneyForm.newMoney" 
								:precision="2" 
								:step="10" 
								:min="0"
								controls-position="right"
								style="width: 200px;">
							</el-input-number>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="moneyDialogVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button type="primary" @click="submitMoneyForm" icon="el-icon-check" :loading="loadingStates.moneySubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 批量调整佣金对话框 -->
		<el-dialog 
			title="批量调整佣金" 
			:visible.sync="batchMoneyDialogVisible" 
			width="400px"
			:close-on-click-modal="false"
			center>
			<div style="position: relative;">
				<!-- 批量佣金表单加载动画 -->
				<delivery-loading v-if="loadingStates.batchMoneyForm" text="处理中..."></delivery-loading>
				
				<div class="money-dialog-content">
					<div class="money-icon">
						<i class="el-icon-money"></i>
						<div class="batch-money-title">批量佣金设置</div>
					</div>
					<div class="batch-money-warning">
						<i class="el-icon-warning"></i>
						<span>此操作将修改所有用户邀请新用户一次所能获取的佣金金额</span>
					</div>
					<el-form :model="batchMoneyForm" ref="batchMoneyForm" label-width="110px">
						<el-form-item label="佣金金额" prop="money">
							<el-input-number 
								v-model="batchMoneyForm.money" 
								:precision="2" 
								:step="10" 
								:min="0"
								controls-position="right"
								style="width: 200px;">
							</el-input-number>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="batchMoneyDialogVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button type="warning" @click="submitBatchMoney" icon="el-icon-check" :loading="loadingStates.batchMoneySubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 重置密码对话框 -->
		<el-dialog 
			title="重置密码" 
			:visible.sync="resetPwdDialogVisible" 
			width="400px"
			:close-on-click-modal="false"
			center>
			<div style="position: relative;">
				<!-- 表单加载动画 -->
				<delivery-loading v-if="loadingStates.resetPwdForm" text="处理中..."></delivery-loading>
				
				<div class="reset-pwd-content">
					<div class="reset-pwd-icon">
						<i class="el-icon-key"></i>
						<div class="reset-pwd-title">重置用户密码</div>
					</div>
					<el-form :model="resetPwdForm" :rules="resetPwdRules" ref="resetPwdForm" label-width="100px">
						<el-form-item label="用户名">
							<el-input v-model="resetPwdForm.userName" disabled></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="newPassword">
							<el-input v-model="resetPwdForm.newPassword" type="password" show-password></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="confirmPassword">
							<el-input v-model="resetPwdForm.confirmPassword" type="password" show-password></el-input>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetPwdDialogVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button type="primary" @click="submitResetPwd" icon="el-icon-check" :loading="loadingStates.resetPwdSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		pageUser,
		addUser,
		updateUser,
		deleteUser,
		exportUsers,
		setGetMoney,
		changeNewPassword
	} from '@/api/User'
	import request from '@/utils/request'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'

	export default {
		name: 'NormalUserManage',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			// 自定义验证规则：确认密码必须与新密码一致
			const validateConfirmPassword = (rule, value, callback) => {
				if (value !== this.resetPwdForm.newPassword) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};

			return {
				queryParams: {
					pageIndex: 1,
					pageSize: 10,
					userName: '',
					isReal: '',
					identity: 1 // 普通用户
				},
				tableData: [],
				total: 0,
				tableLoading: false,
				dialogVisible: false,
				dialogTitle: '',
				form: {
					userId: '',
					userName: '',
					password: '',
					phone: '',
					identification: '',
					isMonth: 0,
					identity: 1,
					isGetMoney: 0,
					isEnable: 0
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}, {
						pattern: /^1[3-9]\d{9}$/,
						message: '请输入正确的手机号码',
						trigger: 'blur'
					}],
					identification: [{
						required: true,
						message: '请输入身份证号',
						trigger: 'blur'
					}, {
						pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						message: '请输入正确的身份证号码',
						trigger: 'blur'
					}]
				},
				moneyDialogVisible: false,
				moneyForm: {
					userId: '',
					currentMoney: 0,
					newMoney: 0
				},
				tableHeaderStyle: {
					backgroundColor: '#f5f7fa',
					color: '#333',
					fontWeight: 'bold',
					fontSize: '14px',
					height: '50px'
				},
				exportLoading: false,
				batchMoneyDialogVisible: false,
				batchMoneyLoading: false,
				batchMoneyForm: {
					money: 0
				},
				resetPwdDialogVisible: false,
				resetPwdForm: {
					userId: '',
					userName: '',
					newPassword: '',
					confirmPassword: ''
				},
				resetPwdRules: {
					newPassword: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
						{ min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
					],
					confirmPassword: [
						{ required: true, message: '请再次输入新密码', trigger: 'blur' },
						{ validator: validateConfirmPassword, trigger: 'blur' }
					]
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
			// 获取用户列表
			async getList() {
				return this.loadDataWithLoading(
					() => pageUser(this.queryParams),
					'table',
					data => {
						this.tableData = data.dataList;
						this.total = data.totalPages;
					},
					'获取用户列表失败'
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
				this.queryParams.userName = '';
				this.queryParams.isReal = '';
				this.handleSearch();
			},

			// 处理导出
			async handleExport() {
				this.exportLoading = true;
				try {
			    // 获取导出数据
			    const response = await request({
			      url: '/User/export',
			      method: 'get',
			      params: {
			        identity: 1,
			        isReal: this.queryParams.isReal || '',
			        userName: this.queryParams.userName || ''
			      },
			      // 注意：此处不设置responseType为blob，接收文本响应
			      responseType: 'text'
			    });
			    
			    // 记录响应数据以便调试
			    console.log('导出响应类型:', typeof response);
			    console.log('导出响应前20个字符:', typeof response=== 'string' ? response.substring(0, 20) : 'not a string');
			    
			    // 检查响应
			    const data = response;
			    if (!data) {
			      throw new Error('没有接收到数据');
			    }
			    
			    // 尝试解码Base64数据为二进制，不进行严格验证
			    try {
			      // 解码Base64数据为二进制
			      const binaryString = atob(data);
			      const bytes = new Uint8Array(binaryString.length);
			      for (let i = 0; i < binaryString.length; i++) {
			        bytes[i] = binaryString.charCodeAt(i);
			      }
			      
			      // 创建Blob对象
			      const blob = new Blob([bytes], {
			        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			      });
			      
			      // 生成默认文件名
			      const filename = `用户信息表_${new Date().getTime()}.xlsx`;
			      
			      // 创建下载链接
			      const url = window.URL.createObjectURL(blob);
			      const link = document.createElement('a');
			      link.href = url;
			      link.setAttribute('download', filename);
			      document.body.appendChild(link);
			      link.click();
			      
			      // 清理
			      document.body.removeChild(link);
			      window.URL.revokeObjectURL(url);
			      
			      this.$message.success('导出成功');
			    } catch (decodeError) {
			      console.error('Base64解码失败:', decodeError, '尝试直接使用表单下载');
			      
			      // 回退到表单提交方式
			      const form = this.$refs.exportForm;
			      
			      // 更新可能已变化的查询参数
			      const inputs = form.querySelectorAll('input');
			      for (let input of inputs) {
			        if (input.name === 'isReal' && this.queryParams.isReal) {
			          input.value = this.queryParams.isReal;
			        } else if (input.name === 'userName' && this.queryParams.userName) {
			          input.value = this.queryParams.userName;
			        } else if (input.name === 't') {
			          input.value = Date.now();
			        }
			      }
			      
			      // 提交表单，使用_blank在新标签页打开
			      form.target = "_blank";
			      form.submit();
			      
			      this.$message.success('已通过表单方式导出，请等待下载');
			    }
				} catch (error) {
					console.error('导出失败:', error);
			    this.$message.error(`导出失败: ${error.message || '请稍后重试'}`);
				} finally {
					this.exportLoading = false;
				}
			},

			// 获取导出URL (保留但不再使用)
			getExportUrl() {
				return 'https://shenzhoupost.cn/shenzhoupost/User/export';
			},

			// 新增用户
			handleAdd() {
				this.dialogTitle = '新增用户';
				this.dialogVisible = true;
				
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = {
						userId: '',
						userName: '',
						password: '',
						phone: '',
						identification: '',
						isMonth: 0,
						identity: 1,
						isGetMoney: 0,
						isEnable: 0
					};
				});
			},

			// 编辑
			handleEdit(row) {
				const loadingKey = 'edit_' + row.userId;
				this.setAreaLoading(loadingKey, true);
				this.setAreaLoading('form', true);
				
				this.dialogTitle = '编辑用户';
				this.dialogVisible = true;
				
				this.$nextTick(() => {
					this.$refs.form.resetFields();
					this.form = { ...row };
					
					// 短暂延迟后关闭加载动画
					setTimeout(() => {
						this.setAreaLoading('form', false);
						this.setAreaLoading(loadingKey, false);
					}, 500);
				});
			},

			// 调整佣金
			handleSetMoney(row) {
				const loadingKey = 'money_' + row.userId;
				this.setAreaLoading(loadingKey, true);
				this.setAreaLoading('moneyForm', true);
				
				this.moneyDialogVisible = true;
				
				this.$nextTick(() => {
					this.moneyForm = {
						userId: row.userId,
						currentMoney: row.getMoney,
						newMoney: parseFloat(row.getMoney) || 0
					};
					
					// 短暂延迟后关闭加载动画
					setTimeout(() => {
						this.setAreaLoading('moneyForm', false);
						this.setAreaLoading(loadingKey, false);
					}, 500);
				});
			},

			// 提交佣金表单
			async submitMoneyForm() {
				this.loadDataWithLoading(
					() => {
						const userData = this.tableData.find(item => item.userId === this.moneyForm.userId);
						if (!userData) throw new Error('未找到用户数据');

						const updateData = {
							...userData,
							getMoney: this.moneyForm.newMoney
						};

						return updateUser(updateData);
					},
					'moneySubmit',
					() => {
						this.$message.success('佣金调整成功');
						this.moneyDialogVisible = false;
						this.getList();
					},
					'佣金调整失败'
				);
			},

			// 切换佣金获取资格
			async toggleMoneyPermission(row) {
				const loadingKey = 'permission_' + row.userId;
				
				const newStatus = row.isGetMoney === 0 ? 1 : 0;
				const confirmText = newStatus === 0 ? '确认允许该用户获取佣金吗？' : '确认禁止该用户获取佣金吗？';
				
				this.$confirm(confirmText, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loadDataWithLoading(
						() => {
							const updateData = {
								...row,
								isGetMoney: newStatus
							};
							return updateUser(updateData);
						},
						loadingKey,
						() => {
							this.$message.success(newStatus === 0 ? '已允许该用户获取佣金' : '已禁止该用户获取佣金');
							this.getList();
						},
						'操作失败'
					);
				}).catch(() => {});
			},

			// 切换黑名单状态
			async toggleBlacklist(row) {
				const loadingKey = 'blacklist_' + row.userId;
				
				// isEnable: 0为正常账户，1为黑名单
				const newStatus = row.isEnable === 0 ? 1 : 0;
				const confirmText = newStatus === 0 ? '确认将该用户移出黑名单吗？' : '确认将该用户加入黑名单吗？';
				const successText = newStatus === 0 ? '用户已移出黑名单' : '用户已加入黑名单';
				
				this.$confirm(confirmText, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loadDataWithLoading(
						() => {
							const updateData = {
								...row,
								isEnable: newStatus
							};
							return updateUser(updateData);
						},
						loadingKey,
						() => {
							this.$message.success(successText);
							this.getList();
						},
						'黑名单操作失败'
					);
				}).catch(() => {});
			},

			// 审核实名
			handleVerify(row) {
				const loadingKey = 'verify_' + row.userId;
				
				this.$confirm('确认通过该用户的实名认证吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loadDataWithLoading(
						() => {
							const updateData = {
								...row,
								isReal: 2
							};
							return updateUser(updateData);
						},
						loadingKey,
						() => {
							this.$message.success('审核通过');
							this.getList();
						},
						'审核失败'
					);
				}).catch(() => {});
			},

			// 删除
			async handleDelete(row) {
				const loadingKey = 'delete_' + row.userId;
				
				this.loadDataWithLoading(
					() => deleteUser(row.userId),
					loadingKey,
					() => {
						this.$message.success('删除成功');
						this.getList();
					},
					'删除用户失败'
				);
			},

			// 提交表单
			submitForm() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.loadDataWithLoading(
							() => {
								const api = this.form.userId ? updateUser : addUser;
								return api(this.form);
							},
							'submit',
							() => {
								this.$message.success(this.form.userId ? '更新成功' : '新增成功');
								this.dialogVisible = false;
								this.getList();
							},
							this.form.userId ? '更新用户失败' : '新增用户失败'
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
			},

			// 批量调整所有用户的佣金
			handleBatchSetMoney() {
				this.setAreaLoading('batchMoneyForm', true);
				this.batchMoneyDialogVisible = true;
				this.batchMoneyForm.money = 0;
				
				// 短暂延迟后关闭加载动画
				setTimeout(() => {
					this.setAreaLoading('batchMoneyForm', false);
				}, 300);
			},
			
			// 提交批量佣金调整
			async submitBatchMoney() {
				this.$confirm('确认要将所有用户的佣金调整为 ¥' + this.batchMoneyForm.money + ' 吗？此操作不可撤销！', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					distinguishCancelAndClose: true
				}).then(() => {
					this.loadDataWithLoading(
						() => setGetMoney(this.batchMoneyForm.money),
						'batchMoneySubmit',
						() => {
							this.$message.success('所有用户佣金已更新');
							this.batchMoneyDialogVisible = false;
							this.getList(); // 刷新列表
						},
						'批量调整佣金失败'
					);
				}).catch(() => {});
			},

			// 处理重置密码
			handleResetPassword(row) {
				const loadingKey = 'resetPwd_' + row.userId;
				this.setAreaLoading(loadingKey, true);
				this.setAreaLoading('resetPwdForm', true);
				
				this.resetPwdDialogVisible = true;
				
				this.$nextTick(() => {
					this.$refs.resetPwdForm && this.$refs.resetPwdForm.resetFields();
					this.resetPwdForm.userId = row.userId;
					this.resetPwdForm.userName = row.userName;
					this.resetPwdForm.newPassword = '';
					this.resetPwdForm.confirmPassword = '';
					
					// 短暂延迟后关闭加载动画
					setTimeout(() => {
						this.setAreaLoading('resetPwdForm', false);
						this.setAreaLoading(loadingKey, false);
					}, 300);
				});
			},
			
			// 提交重置密码
			submitResetPwd() {
				this.$refs.resetPwdForm.validate((valid) => {
					if (valid) {
						this.loadDataWithLoading(
							() => {
								return changeNewPassword({
									userId: this.resetPwdForm.userId,
									newPassword: this.resetPwdForm.newPassword
								});
							},
							'resetPwdSubmit',
							() => {
								this.$message.success('密码重置成功');
								this.resetPwdDialogVisible = false;
							},
							'密码重置失败'
						);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.main-container {
		position: relative;
		padding: 20px;
	}

	.card-header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		font-size: 16px;
		font-weight: bold;
	}

	.card-header i {
		margin-right: 8px;
		font-size: 18px;
		color: #409EFF;
	}

	.card-header-right {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.total-count {
		margin-right: 15px;
		color: #606266;
	}

	.export-btn {
		padding: 0;
	}

	.search-card {
		margin-bottom: 20px;
	}

	.search-form {
		margin-top: 20px;
	}

	.btn-primary {
		background-color: #409EFF;
	}

	.btn-success {
		background-color: #67C23A;
	}

	.btn-info {
		background-color: #909399;
	}

	.user-info, .phone-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user-info i, .phone-cell i {
		margin-right: 5px;
		font-size: 16px;
	}

	.avatar-icon {
		color: #409EFF;
	}

	.index-cell {
		background-color: #f0f9eb;
		color: #67C23A;
		border-radius: 15px;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		font-weight: bold;
	}

	.money-cell {
		color: #E6A23C;
		font-weight: bold;
	}

	.pagination-container {
		margin-top: 20px;
		text-align: right;
	}

	.action-buttons {
		display: flex;
		justify-content: space-around;
	}

	.money-dialog-content {
		text-align: center;
		padding: 20px 0;
	}

	.money-icon {
		font-size: 40px;
		color: #E6A23C;
		margin-bottom: 20px;
	}

	.current-money {
		font-size: 24px;
		color: #E6A23C;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.money-symbol {
		margin-right: 5px;
	}

	.right-click-link {
		margin-left: 10px;
		font-size: 12px;
		color: #409EFF;
		text-decoration: none;
		cursor: pointer;
	}

	.right-click-link-small {
		margin-left: 5px;
		font-size: 12px;
		color: #409EFF;
		text-decoration: none;
		cursor: pointer;
	}

	.batch-money-title {
		margin-top: 10px;
		font-size: 16px;
		font-weight: bold;
		color: #E6A23C;
	}
	
	.batch-money-warning {
		background-color: #FEF0F0;
		padding: 10px;
		border-radius: 4px;
		margin: 15px 0;
		display: flex;
		align-items: center;
	}
	
	.batch-money-warning i {
		color: #F56C6C;
		margin-right: 8px;
		font-size: 16px;
	}
	
	.batch-money-warning span {
		color: #F56C6C;
		font-size: 14px;
	}
	
	.btn-warning {
		background-color: #E6A23C;
		color: white;
	}

	.reset-pwd-content {
		text-align: center;
		padding: 10px 0;
	}

	.reset-pwd-icon {
		font-size: 36px;
		color: #409EFF;
		margin-bottom: 15px;
	}

	.reset-pwd-title {
		margin-top: 5px;
		font-size: 16px;
		font-weight: bold;
		color: #409EFF;
	}
</style>
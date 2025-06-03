<template>
	<div class="container">
		<!-- 全屏加载动画 -->
		<delivery-loading v-if="fullscreenLoading" :fullscreen="true" :progress="loadingProgress" text="客服配置加载中...">
		</delivery-loading>

		<!-- 配置表单 -->
		<div style="position: relative;">
			<!-- 加载动画 -->
			<delivery-loading v-if="loadingStates.form"></delivery-loading>
			
			<el-form ref="customerForm" :model="customer" label-width="150px" class="demo-ruleForm" :rules="rules"
				style="max-width: 800px;">
				  <h3 class="config-title" style="margin-bottom: 15px;">在线客服配置</h3>
				<el-form-item label="微信号" prop="wechatNumber">
					<el-input v-model="customer.wechatNumber" placeholder="请输入微信号" :disabled="!isEditing"></el-input>
				</el-form-item>
				<el-form-item label="微信公众号二维码" prop="officialAccountImage">
				   <el-upload
				     class="avatar-uploader"
				     action="" 
				     :show-file-list="false"
				     :before-upload="beforeImageUpload"
				     :http-request="handleOfficialAccountImageUpload" 
				     :disabled="!isEditing"
				   >
				     <img v-if="customer.officialAccountImage" :src="$globalParam.apiUrl+ customer.officialAccountImage" class="avatar">
				     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				   </el-upload>
				 </el-form-item>
				 <el-form-item label="微信二维码" prop="wechatImage">
				    <el-upload
				      class="avatar-uploader"
				      action="" 
				      :show-file-list="false"
				      :before-upload="beforeImageUpload"
				      :http-request="handleImageUpload" 
				      :disabled="!isEditing"
				    >
				      <img v-if="customer.wechatImage" :src="$globalParam.apiUrl+ customer.wechatImage" class="avatar">
				      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				    </el-upload>
				  </el-form-item>

				<el-form-item label="服务时间" prop="serviceHours">
					<el-input v-model="customer.serviceHours" placeholder="例：周一至周五 9:00-18:00"
						:disabled="!isEditing"></el-input>
				</el-form-item>

				<el-form-item label="客服热线" prop="customerServiceHotline">
					<el-input v-model="customer.customerServiceHotline" placeholder="请输入客服热线"
						:disabled="!isEditing"></el-input>
				</el-form-item>

				<el-form-item label="邮箱" prop="email">
					<el-input v-model="customer.email" placeholder="请输入联系邮箱" :disabled="!isEditing"></el-input>
				</el-form-item>

				<h3 class="config-title" style="margin-bottom: 15px; margin-top: 30px;">公司信息配置</h3>
               
				<el-form-item label="公司名称" prop="companyName">
					<el-input v-model="customer.companyName" placeholder="请输入公司名称" :disabled="!isEditing"></el-input>
				</el-form-item>
               
				<el-form-item label="公司地址" prop="companyAddress">
					<el-input v-model="customer.companyAddress" placeholder="请输入公司地址" :disabled="!isEditing"></el-input>
				</el-form-item>
               
				<el-form-item label="公司简介" prop="companyProfile">
					<el-input type="textarea" :rows="4" v-model="customer.companyProfile" placeholder="请输入公司简介" :disabled="!isEditing"></el-input>
				</el-form-item>
               
				<el-form-item label="开票联系人" prop="invoicingContact">
					<el-input v-model="customer.invoicingContact" placeholder="请输入开票联系人" :disabled="!isEditing"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-if="!isEditing" @click="enableEditing">编辑配置</el-button>

					<template v-else>
						<el-button type="primary" @click="submitForm" :loading="loadingStates.submit">保存修改</el-button>
						<el-button @click="cancelEditing">取消</el-button>
					</template>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		getCustomer,
		updateCustomer
	} from '@/api/Customer'
	import DeliveryLoading from '@/components/common/DeliveryLoading'
	import loadingMixin from '@/mixins/loadingMixin'
	import {
		orderFileUpload,
		deleteFile
	} from '@/api/File'
	export default {
		name: 'CustomerServiceConfig',
		components: {
			DeliveryLoading
		},
		mixins: [loadingMixin],
		data() {
			return {
				isEditing: false,
				originalData: {}, // 用于保存原始数据
				customer: {
					customerId: null,
					wechatNumber: '',
					wechatImage: '',
					officialAccountImage:'',
					serviceHours: '',
					customerServiceHotline: '',
					email: '',
					companyName: '',
					companyAddress: '',
					companyProfile: '',
					invoicingContact: '',
					createTime: '',
					updateTime: ''
				},
				rules: {
					wechatNumber: [{
						required: true,
						message: '请输入微信号',
						trigger: 'blur'
					}],
					serviceHours: [{
						required: true,
						message: '请设置服务时间',
						trigger: 'blur'
					}],
					customerServiceHotline: [{
						required: true,
						message: '请输入客服热线',
						trigger: 'blur'
					}],
					email: [{
						type: 'email',
						message: '请输入正确的邮箱格式',
						trigger: 'blur'
					}],
					companyName: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
					invoicingContact: [{
						required: true,
						message: '请输入开票联系人',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.startFullscreenLoading()
			this.fetchCustomerConfig().finally(() => {
				this.stopFullscreenLoading()
			})
		},
		methods: {
			// 获取客服配置
			async fetchCustomerConfig() {
				return this.loadDataWithLoading(
					getCustomer,
					'form',
					data => {
						this.customer = data
						this.originalData = {
							...data
						}
					},
					'获取客服配置失败'
				)
			},

			// 启用编辑模式
			enableEditing() {
				this.isEditing = true
			},

			// 取消编辑
			cancelEditing() {
				this.isEditing = false
				this.customer = {
					...this.originalData
				}
			},

			// 提交表单
			submitForm() {
				this.$refs.customerForm.validate(valid => {
					if (valid) {
						this.setAreaLoading('submit', true)
						updateCustomer(this.customer)
							.then(() => {
								this.$message.success('配置更新成功')
								this.originalData = {
									...this.customer
								}
								this.isEditing = false
							})
							.catch(() => {
								this.$message.error('配置更新失败')
							})
							.finally(() => {
								this.setAreaLoading('submit', false)
							})
					}
				})
			},

			
			// 图片上传前校验（更新后的）
			beforeImageUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isJPG) {
					this.$message.error('上传图片只能是 JPG/PNG 格式!')
					return false
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!')
					return false
				}
				return isJPG && isLt2M
			},
			async handleOfficialAccountImageUpload({
				file
			}) {
				try {
					const formData = new FormData()
					formData.append('file', file)
					const fileName = file.name.split('.')[0]
					formData.append('name', fileName)

					const res = await orderFileUpload(formData)
					
					if (res.code === 200) {
						this.customer.officialAccountImage = res.data // 根据实际返回结构调整
						
						this.$message.success('图片上传成功')
					} else {
						this.$message.error(res.message || '图片上传失败')
					}
				} catch (error) {
					console.error('上传失败:', error)
					this.$message.error('图片上传失败，请稍后重试')
				}
			},
			// 自定义图片上传（整合后的）
			async handleImageUpload({
				file
			}) {
				try {
					const formData = new FormData()
					formData.append('file', file)
					const fileName = file.name.split('.')[0]
					formData.append('name', fileName)

					const res = await orderFileUpload(formData)
					
					if (res.code === 200) {
						this.customer.wechatImage = res.data // 根据实际返回结构调整
						
						this.$message.success('图片上传成功')
					} else {
						this.$message.error(res.message || '图片上传失败')
					}
				} catch (error) {
					console.error('上传失败:', error)
					this.$message.error('图片上传失败，请稍后重试')
				}
			},
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		position: relative;
	}

	.avatar-uploader {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 360px;
		height: 180px;
	}

	.avatar-uploader:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100%;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}

	.avatar {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
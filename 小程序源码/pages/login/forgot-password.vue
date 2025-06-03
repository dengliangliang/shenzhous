<template>
	<view class="forgot-container">
		<!-- 背景动画 -->
		<view class="bg-animation">
			<view class="circle circle-1"></view>
			<view class="circle circle-2"></view>
			<view class="circle circle-3"></view>
		</view>

		<!-- 标题区域 -->
		<view class="header-box">
			<view class="back-btn" @click="goBack">
				<uni-icons type="arrow-left" size="20" color="#333"></uni-icons>
			</view>
			<text class="title animate__animated animate__fadeIn">找回密码</text>
		</view>

		<!-- 表单区域 -->
		<view class="form-box animate__animated animate__fadeInUp">
			<view class="form-content">
				<!-- 手机号 -->
				<view class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="person" size="20" color="#999"></uni-icons>
					<input type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
				</view>

				<!-- 验证码 -->
				<view class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="chat" size="20" color="#999"></uni-icons>
					<input type="number" v-model="form.code" placeholder="请输入验证码" maxlength="6" />
					<view class="code-btn" @click="sendVerifyCode" :class="{ 'disabled': countdown > 0 }">
						{{ countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
					</view>
				</view>

				<!-- 新密码 -->
				<view class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input :password="!showPassword" v-model="form.newPassword" placeholder="请输入新密码" />
					<uni-icons :type="showPassword ? 'eye' : 'eye-slash'" size="20" color="#999"
						@click="togglePassword"></uni-icons>
				</view>

				<!-- 确认新密码 -->
				<view class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input :password="!showPassword" v-model="form.confirmPassword" placeholder="请确认新密码" />
				</view>

				<!-- 提交按钮 -->
				<button class="submit-btn animate__animated animate__fadeInLeft" 
					:class="{'btn-loading': loading}" 
					@click="handleSubmit">
					<text v-if="!loading">确认修改</text>
					<view class="loading-dots" v-else>
						<text></text>
						<text></text>
						<text></text>
					</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import userApi from '@/api/user.js'

	export default {
		data() {
			return {
				showPassword: false,
				loading: false,
				countdown: 0,
				timer: null,
				bizId: '',
				form: {
					phone: '',
					code: '',
					newPassword: '',
					confirmPassword: ''
				}
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack()
			},
			
			// 切换密码显示
			togglePassword() {
				this.showPassword = !this.showPassword
			},
			
			// 发送验证码
			async sendVerifyCode() {
				// 如果倒计时正在进行，则不重复发送
				if (this.countdown > 0) return
				
				// 检查手机号
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				
				if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return
				}
				
				try {
					// 显示加载中
					uni.showLoading({
						title: '发送中...'
					})
					
					// 调用发送验证码接口
					const res = await userApi.sendCode({
						phone: this.form.phone
					})
					
					// 隐藏加载中
					uni.hideLoading()
					
					// 检查响应格式
					if (res) {
						// 存储bizId，可能在后续验证中需要
						
						
						// 显示发送成功提示
						uni.showToast({
							title: '验证码发送成功',
							icon: 'success'
						})
						
						// 开始倒计时
						this.countdown = 60
						this.timer = setInterval(() => {
							this.countdown--
							if (this.countdown <= 0) {
								clearInterval(this.timer)
							}
						}, 1000)
					} else {
						// 显示错误信息
						const errorMsg = (res && res.body && res.body.message) || '验证码发送失败'
						uni.showToast({
							title: errorMsg,
							icon: 'none'
						})
					}
				} catch (e) {
					console.error('发送验证码出错:', e)
					uni.hideLoading()
					uni.showToast({
						title: e.message || '验证码发送失败',
						icon: 'none'
					})
				}
			},
			
			// 表单验证
			validate() {
				const { phone, code, newPassword, confirmPassword } = this.form
				
				if (!phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return false
				}
				
				if (!/^1[3-9]\d{9}$/.test(phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return false
				}
				
				if (!code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return false
				}
				
				if (!newPassword) {
					uni.showToast({
						title: '请输入新密码',
						icon: 'none'
					})
					return false
				}
				
				if (!confirmPassword) {
					uni.showToast({
						title: '请确认新密码',
						icon: 'none'
					})
					return false
				}
				
				if (newPassword !== confirmPassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return false
				}
				
				return true
			},
			
			// 提交表单
			async handleSubmit() {
				if (!this.validate()) return
				
				this.loading = true
				
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				
				try {
					// 调用忘记密码接口
					await userApi.forgotPassword({
						phone: this.form.phone,
						newPassword: this.form.newPassword,
						code: this.form.code
					})
					
					uni.hideLoading()
					
					// 显示成功提示
					uni.showToast({
						title: '密码修改成功',
						icon: 'success',
						duration: 1500
					})
					
					// 延迟跳转回登录页
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} catch (e) {
					console.error('密码重置失败', e)
					uni.hideLoading()
					uni.showToast({
						title: e.message || '密码重置失败',
						icon: 'none',
						duration: 1500
					})
					this.loading = false
				}
			}
		},
		// 页面卸载时清除定时器
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer)
			}
		}
	}
</script>

<style lang="scss">
	.forgot-container {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFF6F1 0%, #FFFFFF 100%);
		padding-top: 100rpx;
		position: relative;
		overflow: hidden;

		// 背景动画
		.bg-animation {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 0;

			.circle {
				position: absolute;
				border-radius: 50%;
				background: linear-gradient(45deg, rgba(255, 107, 1, 0.1), rgba(255, 143, 31, 0.1));
				animation: float 6s ease-in-out infinite;

				&.circle-1 {
					width: 400rpx;
					height: 400rpx;
					top: -100rpx;
					right: -100rpx;
					animation-delay: 0s;
				}

				&.circle-2 {
					width: 300rpx;
					height: 300rpx;
					bottom: 10%;
					left: -100rpx;
					animation-delay: 2s;
				}

				&.circle-3 {
					width: 200rpx;
					height: 200rpx;
					bottom: 20%;
					right: 10%;
					animation-delay: 4s;
				}
			}
		}

		.header-box {
			position: relative;
			z-index: 1;
			text-align: center;
			padding: 0 40rpx;
			margin-bottom: 80rpx;
			
			.back-btn {
				position: absolute;
				left: 40rpx;
				top: 10rpx;
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				&:active {
					opacity: 0.7;
				}
			}

			.title {
				font-size: 40rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.form-box {
			position: relative;
			z-index: 1;
			padding: 0 60rpx;

			.form-content {
				position: relative;

				.input-item {
					animation-duration: 0.5s;
				}

				.submit-btn {
					animation-duration: 0.5s;
				}
			}

			.input-item {
				display: flex;
				align-items: center;
				height: 110rpx;
				margin-bottom: 30rpx;
				padding: 0 40rpx;
				background: #FFFFFF;
				border-radius: 55rpx;
				box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

				.uni-icons {
					margin-right: 20rpx;
				}

				input {
					flex: 1;
					font-size: 30rpx;
					color: #333;
				}
				
				.code-btn {
					font-size: 26rpx;
					color: #FF6B01;
					padding: 10rpx 0 10rpx 20rpx;
					border-left: 1px solid #EEEEEE;
					white-space: nowrap;
					
					&.disabled {
						color: #999;
					}
					
					&:active {
						opacity: 0.8;
					}
				}

				&:hover {
					transform: translateY(-2rpx);
					box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.08);
				}
			}

			.submit-btn {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background: linear-gradient(90deg, #FF6B01, #FF8F1F);
				border-radius: 50rpx;
				color: #fff;
				font-size: 34rpx;
				font-weight: 500;
				letter-spacing: 4rpx;
				margin-top: 80rpx;
				box-shadow: 0 8rpx 20rpx rgba(255, 107, 1, 0.3);
				border: none;

				&::after {
					border: none;
				}

				&.btn-loading {
					background: #FF8F1F;
				}

				.loading-dots {
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						width: 8rpx;
						height: 8rpx;
						background: #fff;
						border-radius: 50%;
						margin: 0 6rpx;
						animation: loading 1s infinite;

						&:nth-child(2) {
							animation-delay: 0.2s;
						}

						&:nth-child(3) {
							animation-delay: 0.4s;
						}
					}
				}
			}
		}
	}

	// 动画关键帧
	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20rpx);
		}
	}

	@keyframes loading {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(0.5);
			opacity: 0.5;
		}
	}
</style> 
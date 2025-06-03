<template>
	<view class="login-container">
		<!-- 背景动画 -->
		<view class="bg-animation">
			<view class="circle circle-1"></view>
			<view class="circle circle-2"></view>
			<view class="circle circle-3"></view>
		</view>

		<!-- Logo区域 -->
		<view class="logo-box">
			<image class="logo animate__animated animate__fadeInDown" src="/static/img/系统左侧长LOGO.png" mode="aspectFit">
			</image>
			<text class="slogan animate__animated animate__fadeIn animate__delay-1s">快递服务平台</text>
		</view>

		<!-- 表单区域 -->
		<view class="form-box animate__animated animate__fadeInUp">
			<!-- 切换登录/注册 -->
			<view class="switch-box">
				<view :class="['switch-item', isLogin ? 'active' : '']" @click="switchType(true)">
					<text>登录</text>
					<view class="line" v-if="isLogin"></view>
				</view>
				<view :class="['switch-item', !isLogin ? 'active' : '']" @click="switchType(false)">
					<text>注册</text>
					<view class="line" v-if="!isLogin"></view>
				</view>
			</view>

			<!-- 表单内容 -->
			<view class="form-content">
				<!-- 手机号 -->
				<view class="input-item animate__animated"
					:class="{'animate__fadeInLeft': !isLogin, 'animate__fadeInRight': isLogin}">
					<uni-icons type="person" size="20" color="#999"></uni-icons>
					<input type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
				</view>

				<!-- 密码 -->
				<view class="input-item animate__animated"
					:class="{'animate__fadeInLeft': !isLogin, 'animate__fadeInRight': isLogin}">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input :password="!showPassword" v-model="form.password" placeholder="请输入密码" />
					<uni-icons :type="showPassword ? 'eye' : 'eye-slash'" size="20" color="#999"
						@click="togglePassword"></uni-icons>
				</view>



				<!-- 注册时显示确认密码 -->
				<view v-if="!isLogin" class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input :password="!showPassword" v-model="form.confirmPassword" placeholder="请确认密码" />
				</view>

				<!-- 注册时显示邀请码 -->
				<view v-if="!isLogin" class="input-item animate__animated animate__fadeInLeft">
					<uni-icons type="paperplane" size="20" color="#999"></uni-icons>
					<input v-model="form.beInvited" placeholder="请输入邀请码（选填）" />
				</view>

				<!-- 协议勾选 -->
				<view class="agreement-check">
					<view class="checkbox" @click="toggleAgreement">
						<uni-icons :type="isAgree ? 'checkbox-filled' : 'circle'" size="18"
							:color="isAgree ? '#FF6B01' : '#999'"></uni-icons>
					</view>
					<text class="text">我已阅读并同意</text>
					<text class="link" @click="handleUserAgreement">《用户协议》</text>
					<text class="text">和</text>
					<text class="link" @click="handlePrivacy">《隐私政策》</text>
				</view>



				<!-- 提交按钮 -->
				<button class="submit-btn animate__animated" :class="{
            'btn-loading': loading,
            'btn-disabled': !isAgree,
            'animate__fadeInLeft': !isLogin, 
            'animate__fadeInRight': isLogin
          }" @click="handleSubmit">
					<text v-if="!loading">{{isLogin ? '登 录' : '注 册'}}</text>
					<view class="loading-dots" v-else>
						<text></text>
						<text></text>
						<text></text>
					</view>
				</button>

				<!-- 记住密码和忘记密码选项 - 仅在登录时显示 -->
				<view v-if="isLogin" class="account-options">
					<view class="remember-pwd" @click="toggleRememberPwd">
						<uni-icons :type="rememberPwd ? 'checkbox-filled' : 'circle'" size="18"
							:color="rememberPwd ? '#FF6B01' : '#999'"></uni-icons>
						<text class="text">记住账号密码</text>
					</view>
					<view class="forgot-pwd" @click="goToForgotPassword">
						<text>忘记密码？</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userApi from '@/api/user.js'

	export default {
		data() {
			return {
				isLogin: true,
				showPassword: false,
				loading: false,
				form: {
					phone: '',
					password: '',
					confirmPassword: '',
					beInvited: '',
					userName: ''
				},
				isAgree: false,
				rememberPwd: false
			}
		},
		methods: {
			// 切换登录/注册
			switchType(type) {
				this.isLogin = type
				// 重置表单内容
				this.form = {
					phone: '',
					password: '',
					confirmPassword: '',
					beInvited: '',
					userName: ''
				}
				this.isAgree = false
			},
			// 处理用户协议
			handleUserAgreement() {
				uni.navigateTo({
					url: '/views/agreement/agreement?type=user'
				})
			},
			// 处理隐私政策
			handlePrivacy() {
				uni.navigateTo({
					url: '/views/privacy/privacy'
				})
			},

			// 切换密码显示
			togglePassword() {
				this.showPassword = !this.showPassword
			},

			// 切换协议勾选
			toggleAgreement() {
				this.isAgree = !this.isAgree
			},

			// 切换记住密码
			toggleRememberPwd() {
				this.rememberPwd = !this.rememberPwd
			},

			// 跳转协议页面
			goToAgreement(type) {
				uni.navigateTo({
					url: `/pages/agreement/user-agreement?type=${type}`
				})
			},

			// 跳转到忘记密码页面
			goToForgotPassword() {
				uni.navigateTo({
					url: '/pages/login/forgot-password'
				})
			},

			// 表单验证
			validate() {
				const {
					phone,
					password,
					confirmPassword
				} = this.form

				if (!this.isAgree) {
					uni.showToast({
						title: '请先阅读并同意用户协议',
						icon: 'none'
					})
					return false
				}

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

				if (!password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}

				if (!this.isLogin && password !== confirmPassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return false
				}

				return true
			},

			// 修改获取code的方法，增加更多错误处理
			async getWxCode() {
				try {
					// 清除旧的登录数据，确保新登录
					uni.removeStorageSync('uni_id_token');
					uni.removeStorageSync('uni_id_token_expired');
					uni.removeStorageSync('openId'); // 也清除之前的openId

					// 使用Promise包装uni.login
					const loginResult = await new Promise((resolve, reject) => {
						uni.login({
							provider: 'weixin',
							success: (res) => {
								console.log('微信登录成功，获取到code:', res.code);
								resolve(res);
							},
							fail: (err) => {
								console.error('微信登录失败，详细错误:', err);
								reject(err);
							}
						});
					});

					// 记录code以便调试
					const code = loginResult.code;
					console.log('即将发送到后端的code:', code);
					return code;
				} catch (error) {
					console.error('获取微信code完整错误:', error);
					return null;
				}
			},

			// 提交表单
			async handleSubmit() {
				// 首先检查表单有效性
				if (!this.validate()) {
					return;
				}

				// 设置按钮loading状态
				this.loading = true;
				console.log('提交表单，当前状态 isLogin:', this.isLogin);

				// 显示全屏加载动画并设置遮罩，防止用户点击导致中断
				uni.showLoading({
					title: this.isLogin ? '登录中...' : '注册中...',
					mask: true
				});

				try {
					if (this.isLogin) {
						// 登录逻辑
						console.log('执行登录流程')
						// 获取微信code
						const wxCode = await this.getWxCode();

						// 构建登录参数
						const loginParams = {
							phone: this.form.phone,
							password: this.form.password
						};

						if (wxCode) {
							loginParams.wxCode = wxCode;
						} else {
							console.log('未获取到微信code，将继续正常登录流程');
						}

						// 调用登录API
						const res = await userApi.login(loginParams);
						console.log('登录结果:', res)

						// 处理登录成功...
						if (res) {
							this.$store.commit('user/setUserInfo', res.userInfo);
							this.$store.commit('user/setToken', res.token);

							// 保存openId到本地存储
							if (res.openId) {
								uni.setStorageSync('openId', res.openId);
								console.log('已保存openId:', res.openId);
							}

							// 记住密码功能
							if (this.rememberPwd) {
								uni.setStorageSync('remembered_account', {
									phone: this.form.phone,
									password: this.form.password
								});
								console.log('已记住账号密码');
							} else {
								// 如果取消了记住密码，则清除之前的记录
								uni.removeStorageSync('remembered_account');
							}

							// 显示成功提示
							uni.hideLoading(); // 先隐藏加载中
							uni.showToast({
								title: '登录成功',
								icon: 'success',
								duration: 1500
							});

							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/index/index"
								});
							}, 1500);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '登录失败',
								icon: 'none',
								duration: 1500
							});
							this.loading = false;
						}
					} else {
						// 注册逻辑
						console.log('执行注册流程')
						// 构建注册参数
						const registerParams = {
							phone: this.form.phone,
							password: this.form.password,
							userName: this.form.phone, // 默认使用手机号作为用户名
							identity: 1
						};

						// 如果有邀请码，添加到参数中
						if (this.form.beInvited) {
							registerParams.beInvited = this.form.beInvited;
						}

						console.log('注册参数:', registerParams);

						// 调用注册API
						const res = await userApi.addUser(registerParams);
						console.log('注册结果:', res);

						if (res) {
							uni.hideLoading(); // 先隐藏加载中
							// 注册成功后显示成功提示
							uni.showToast({
								title: '注册成功',
								icon: 'success',
								duration: 1500
							});

							// 延迟重置表单
							setTimeout(() => {
								this.isLogin = true;
								this.form = {
									phone: this.form.phone,
									password: this.form.password,
									confirmPassword: '',
									beInvited: '',
									userName: ''
								};
								this.loading = false;
							}, 1500);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '注册失败',
								icon: 'none',
								duration: 1500
							});
							this.loading = false;
						}
					}
				} catch (e) {
					console.error(this.isLogin ? '登录失败' : '注册失败', e);
					// 隐藏加载动画
					uni.hideLoading();
					// 显示错误提示
					uni.showToast({
						title: e.message || (this.isLogin ? '登录失败' : '注册失败'),
						icon: 'none',
						duration: 1500
					});
					this.loading = false;
				}
			}
		},
		onLoad(options) {
			// 如果有邀请码参数，自动切换到注册页面并填充邀请码
			if (options.inviteCode) {
				this.isLogin = false
				this.form.beInvited = options.inviteCode
			}

			// 如果有注册参数，自动切换到注册页面
			if (options.register === 'true') {
				this.isLogin = false
			}

			// 检查是否有保存的账号和密码
			const rememberedAccount = uni.getStorageSync('remembered_account');
			if (rememberedAccount && this.isLogin) {
				this.form.phone = rememberedAccount.phone;
				this.form.password = rememberedAccount.password;
				this.rememberPwd = true;
				
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFF6F1 0%, #FFFFFF 100%);
		padding-top: 120rpx;
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

		.logo-box {
			position: relative;
			z-index: 1;
			text-align: center;

			.logo {
				width: 440rpx;
				height: 132rpx;
				margin-bottom: 20rpx;
			}

			.slogan {
				font-size: 32rpx;
				color: #FF6B01;
				letter-spacing: 4rpx;
			}
		}

		.form-box {
			position: relative;
			z-index: 1;
			margin-top: 80rpx;
			padding: 0 60rpx;

			.switch-box {
				display: flex;
				justify-content: center;
				margin-bottom: 60rpx;

				.switch-item {
					position: relative;
					padding: 0 60rpx;
					text-align: center;

					text {
						font-size: 36rpx;
						color: #999;
						font-weight: 500;
					}

					&.active {
						text {
							color: #FF6B01;
							font-weight: bold;
						}
					}

					.line {
						position: absolute;
						left: 50%;
						bottom: -12rpx;
						transform: translateX(-50%);
						width: 40rpx;
						height: 8rpx;
						background: #FF6B01;
						border-radius: 4rpx;
					}

					&:active {
						opacity: 0.8;
					}
				}
			}

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

				&:hover {
					transform: translateY(-2rpx);
					box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.08);
				}
			}

			.agreement-check {
				display: flex;
				align-items: center;

				padding: 0px 10px;
				margin-top: 40rpx;

				.checkbox {
					padding: 10rpx;
					margin-right: 6rpx;
				}

				.text {
					font-size: 24rpx;
					color: #999;
				}

				.link {
					font-size: 24rpx;
					color: #FF6B01;

					&:active {
						opacity: 0.8;
					}
				}
			}

			.remember-pwd {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 20rpx;

				.checkbox {
					padding: 10rpx;
					margin-right: 6rpx;
				}

				.text {
					font-size: 24rpx;
					color: #999;
				}
			}

			.forgot-password {
				text-align: right;
				padding: 0 20rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;

				text {
					font-size: 26rpx;
					color: #FF6B01;
				}

				&:active {
					opacity: 0.8;
				}
			}

			.account-options {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;

				.remember-pwd {
					display: flex;
					align-items: center;
					margin: 0;

					.uni-icons {
						margin-right: 6rpx;
					}

					.text {
						font-size: 24rpx;
						color: #999;
					}
				}

				.forgot-pwd {
					text {
						font-size: 26rpx;
						color: #FF6B01;
					}

					&:active {
						opacity: 0.8;
					}
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
				margin-top: 20rpx;
				box-shadow: 0 8rpx 20rpx rgba(255, 107, 1, 0.3);
				border: none;

				&::after {
					border: none;
				}

				&.btn-disabled {
					background: #CCCCCC;
					box-shadow: none;
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

		0%,
		100% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-20rpx);
		}
	}

	@keyframes loading {

		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}

		50% {
			transform: scale(0.5);
			opacity: 0.5;
		}
	}
</style>
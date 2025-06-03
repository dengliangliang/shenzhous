<template>
	<view class="edit-profile-container">
		<view class="form-card">
			<view class="card-title">基本信息</view>
			<view class="form-item">
				<text class="label">用户名</text>
				<input class="input" :disabled="isReal&&isReal==2" v-model="username" placeholder="请输入新的用户名" />
			</view>

			<view class="form-item">
				<text class="label">电话号码</text>
				<input class="input" :disabled="isReal&&isReal==2"  v-model="phone" placeholder="请输入电话号码" type="number" maxlength="11" />
			</view>

			<view class="form-item">
				<text class="label">身份证号码</text>
				<input class="input" :disabled="isReal&&isReal==2"  v-model="identification" placeholder="请输入身份证号码" maxlength="18" />
			</view>
			
			<view class="form-item">
				<text class="label">邀请码</text>
				<input class="input" :disabled="beInvited!=''" v-model="beInvited" placeholder="请输入邀请码(选填)" maxlength="18" />
			</view>
		</view>

		<view class="form-card">
			<view class="card-title">账户状态</view>
			<view class="info-item">
				<text class="label">实名状态</text>
				<text class="status-tag" :class="realNameStatusClass">{{ realNameOptions[isReal] }}</text>
			</view>

			<view class="info-item">
				<text class="label">月结资格</text>
				<text class="status-tag" :class="isMonth ? 'status-success' : 'status-pending'">
					{{ monthEligibilityOptions[isMonth] }}
				</text>
			</view>
		</view>

		<view class="button-group">
			<button class="primary-btn" @click="saveChanges">保存修改</button>
			<button class="secondary-btn" @click="goToChangePassword">修改密码</button>
		</view>
	</view>
</template>

<script>
	import userApi from '@/api/user.js'
	export default {
		data() {
			return {
				userId:this.$store.state.user.userInfo.userId|| '',
				username: this.$store.state.user.userInfo.userName || '',
				phone: this.$store.state.user.userInfo.phone || '',
				identification: this.$store.state.user.userInfo.identification || '',
				beInvited:this.$store.state.user.userInfo.beInvited|| '',
				isReal: this.$store.state.user.userInfo.isReal || 0,
				isMonth: this.$store.state.user.userInfo.isMonth || 0,
				realNameOptions: ['未实名', '审核中', '已实名'],
				monthEligibilityOptions: ['未开通', '已开通']
			}
		},
		computed: {
			realNameStatusClass() {
				const classes = {
					0: 'status-pending',
					1: 'status-processing',
					2: 'status-success'
				}
				return classes[this.isReal]
			}
		},
		methods: {
			async saveChanges() {
				if (!this.username || !this.phone || !this.identification) {
					uni.showToast({
						title: '所有字段均不能为空',
						icon: 'none'
					})
					return
				}
				let updataUser = {
					userId:this.userId,
					userName: this.username,
					phone: this.phone,
					identification: this.identification,
					beInvited:this.beInvited
				}
				// 假设有一个API可以更新用户信息
				const res = await userApi.updateRegularUser(updataUser);
				if (res) {
					this.$store.commit('user/setUserInfo', res)
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					})
				} else {
					uni.showToast({
						title: '修改失败',
						icon: 'none'
					})
				}

			},
			goToChangePassword() {
				uni.navigateTo({
					url: '/views/changePassword/changePassword'
				})
			}
		}
	}
</script>

<style scoped>
	.edit-profile-container {
		padding: 30rpx;
		background-color: #F5F7FA;
		min-height: 100vh;
	}

	.form-card {
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);
	}

	.card-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		padding-left: 16rpx;
		border-left: 8rpx solid #FF6B01;
	}

	.form-item,
	.info-item {
		margin-bottom: 24rpx;
		position: relative;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
	}

	.label {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 12rpx;
	}

	.input {
		width: 100%;
		height: 80rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		border: 2rpx solid #E8E8E8;
		border-radius: 12rpx;
		background-color: #FAFAFA;
		transition: all 0.3s;
	}

	.input:focus {
		border-color: #FF6B01;
		background-color: #FFF;
		box-shadow: 0 0 0 2rpx rgba(255, 107, 1, 0.1);
	}

	.status-tag {
		font-size: 26rpx;
		padding: 6rpx 20rpx;
		border-radius: 6rpx;
		font-weight: 500;
	}

	.status-pending {
		background-color: #FFF7E6;
		color: #FA8C16;
	}

	.status-processing {
		background-color: #E6F7FF;
		color: #1890FF;
	}

	.status-success {
		background-color: #F6FFED;
		color: #52C41A;
	}

	.button-group {
		margin-top: 48rpx;
		padding: 0 20rpx;
	}

	.primary-btn,
	.secondary-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		border-radius: 44rpx;
		text-align: center;
		margin-bottom: 24rpx;
		border: none;
		transition: all 0.3s;
	}

	.primary-btn {
		background: linear-gradient(135deg, #FF6B01, #FF8534);
		color: #FFFFFF;
		box-shadow: 0 8rpx 16rpx rgba(255, 107, 1, 0.2);
	}

	.primary-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 8rpx rgba(255, 107, 1, 0.2);
	}

	.secondary-btn {
		background: #FFF;
		color: #FF4D4F;
		border: 2rpx solid #FF4D4F;
	}

	.secondary-btn:active {
		background: #FFF1F0;
	}
</style>
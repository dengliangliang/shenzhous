<template>
  <view class="change-password-container">
    <view class="form-card">
      <view class="card-title">修改密码</view>
      
      <view class="form-item">
        <text class="label">当前密码</text>
        <view class="input-wrapper">
          <input 
            class="input" 
            :password="!showCurrentPassword"
            v-model="currentPassword" 
            placeholder="请输入当前密码" 
          />
          <text class="eye-icon" @click="showCurrentPassword = !showCurrentPassword">
            {{ showCurrentPassword ? '👁' : '👁‍🗨' }}
          </text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">新密码</text>
        <view class="input-wrapper">
          <input 
            class="input" 
            :password="!showNewPassword"
            v-model="newPassword" 
            placeholder="请输入新密码" 
          />
          <text class="eye-icon" @click="showNewPassword = !showNewPassword">
            {{ showNewPassword ? '👁' : '👁‍🗨' }}
          </text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">确认新密码</text>
        <view class="input-wrapper">
          <input 
            class="input" 
            :password="!showConfirmPassword"
            v-model="confirmPassword" 
            placeholder="请确认新密码" 
          />
          <text class="eye-icon" @click="showConfirmPassword = !showConfirmPassword">
            {{ showConfirmPassword ? '👁' : '👁‍🗨' }}
          </text>
        </view>
      </view>
    </view>

    <view class="tips-card">
      <view class="card-title">密码要求</view>
      <view class="tips-item">
        <text class="dot">•</text>
        <text>密码长度需要在8-20位之间</text>
      </view>
      <view class="tips-item">
        <text class="dot">•</text>
        <text>必须包含字母和数字</text>
      </view>
      <view class="tips-item">
        <text class="dot">•</text>
        <text>建议包含特殊字符，增加安全性</text>
      </view>
    </view>

    <view class="button-group">
      <button class="primary-btn" @click="changePassword">确认修改</button>
      <button class="secondary-btn" @click="goBack">取消</button>
    </view>
  </view>
</template>

<script>
import userApi from '@/api/user.js'

export default {
  data() {
    return {
      userId: this.$store.state.user.userInfo.userId || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    async changePassword() {
      if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
        uni.showToast({
          title: '请填写所有字段',
          icon: 'none'
        })
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        uni.showToast({
          title: '新密码不匹配',
          icon: 'none'
        })
        return
      }

      try {
        const res = await userApi.updatePassword({
          userId: this.userId,
          oldPassword: this.currentPassword,
          newPassword: this.newPassword
        })
        
        if (res) {
          uni.showToast({
            title: '密码修改成功',
            icon: 'success'
          })
          // 清除登录信息
          this.$store.commit('user/clearUserInfo')
          // 跳转到登录页面
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/mine/mine'
            })
          }, 1500)
        } else {
          uni.showToast({
            title: '密码修改失败',
            icon: 'none'
          })
        }
      } catch (error) {
        uni.showToast({
          title: error.message || '密码修改失败',
          icon: 'none'
        })
      }
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.change-password-container {
  padding: 30rpx;
  background-color: #F5F7FA;
  min-height: 100vh;
}

.form-card, .tips-card {
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

.form-item {
  margin-bottom: 24rpx;
  position: relative;
}

.label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  height: 80rpx;
  padding: 0 24rpx;
  padding-right: 80rpx;
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

.eye-icon {
  position: absolute;
  right: 24rpx;
  font-size: 32rpx;
  color: #999;
  cursor: pointer;
}

.tips-card {
  margin-top: 24rpx;
}

.tips-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  color: #666;
}

.dot {
  margin-right: 12rpx;
  color: #FF6B01;
  font-size: 32rpx;
}

.button-group {
  margin-top: 48rpx;
  padding: 0 20rpx;
}

.primary-btn, .secondary-btn {
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
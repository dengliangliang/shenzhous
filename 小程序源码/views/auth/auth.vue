<template>
  <view class="auth-container">
    <!-- 已认证状态 -->
    <view class="auth-status" v-if="userInfo.isReal ===2">
      <view class="status-card">
        <uni-icons type="checkmarkempty" size="64" color="#52C41A"></uni-icons>
        <text class="status-text">您已完成实名认证</text>
        <view class="auth-info">
          <text class="info-item">姓名：{{ userInfo.userName }}</text>
          <text class="info-item">手机号：{{ userInfo.phone }}</text>
          <text class="info-item">身份证：{{ maskIdentification(userInfo.identification) }}</text>
        </view>
      </view>
    </view>

    <!-- 未认证状态 -->
    <view class="auth-form" v-else>
      <view class="form-header">
        <text class="title">实名认证</text>
        <text class="subtitle">请填写真实信息进行认证</text>
      </view>

      <view class="input-group">
        <view class="input-item">
          <text class="label">真实姓名</text>
          <input 
            type="text"
            v-model="formData.userName"
			disabled
            placeholder="请输入真实姓名"
            class="input"
          />
        </view>

        <view class="input-item">
          <text class="label">身份证号</text>
          <input 
            type="idcard"
            v-model="formData.identification"
			disabled
            placeholder="请输入身份证号"
            class="input"
          />
        </view>

        <view class="input-item">
          <text class="label">手机号码</text>
          <input 
            type="number"
            v-model="formData.phone"
            placeholder="请输入手机号码"
			disabled
            class="input"
            maxlength="11"
          />
        </view>
      </view>

      <button class="submit-btn" @click="handleSubmit" :disabled="submitting">
        {{ submitting ? '认证中...' : '确认实名认证' }}
      </button>

      <view class="tips">
        <uni-icons type="info" size="14" color="#999"></uni-icons>
        <text>请确保填写的信息真实有效，认证通过后将无法修改</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import userApi from '@/api/user'

export default {
  data() {
    return {
      formData: {
        userName: '',
        identification: '',
        phone: ''
      },
      submitting: false
    }
  },

  computed: {
    ...mapState('user', ['userInfo'])
  },

  onShow() {
    this.initFormData()
  },
  
  onLoad() {
    this.initFormData()
  },

  methods: {
    initFormData() {	
      console.log('当前用户信息:', this.userInfo)
      
      if (this.userInfo) {
        this.formData = {
          userName: this.userInfo.userName || '',
          identification: this.userInfo.identification || '',
          phone: this.userInfo.phone || ''
        }
        console.log('表单数据已填充:', this.formData)
      } else {
        console.log('userInfo 不可用')
      }
    },

    // 处理表单提交
    async handleSubmit() {
      // 表单验证
      if (!this.formData.userName) {
        uni.showToast({
          title: '请输入真实姓名',
          icon: 'none'
        })
        return
      }
      if (!this.formData.identification) {
        uni.showToast({
          title: '请输入身份证号',
          icon: 'none'
        })
        return
      }
      if (!this.formData.phone) {
        uni.showToast({
          title: '请输入手机号码',
          icon: 'none'
        })
        return
      }

      try {
        this.submitting = true
        // 显示加载动画
        uni.showLoading({
          title: '认证中...',
          mask: true // 添加遮罩防止用户点击导致动画中断
        })
        
        const res = await userApi.authentication(this.userInfo.userId, this.formData.userName, this.formData.identification, this.formData.phone)
        let data = JSON.parse(res)
        console.log(JSON.parse(res))
        
        if (data.result.res === 1) {
          this.userInfo.isReal = 2
          // 认证成功，调用接口更新用户信息
          userApi.updateUser(this.userInfo).then(r1=>{
            if(r1){
              userApi.getUserById(this.userInfo.userId).then(r2=>{
                if (r2) {
                  this.$store.commit('user/setUserInfo', r2)
                  // 隐藏加载动画
                  uni.hideLoading()
                  uni.showToast({
                    title: '认证成功',
                    icon: 'success',
                    duration: 1500
                  })
                  
                  // 认证成功后返回上一页或刷新页面
                  setTimeout(() => {
                    uni.navigateBack()
                  }, 1500)
                } else {
                  uni.hideLoading()
                  uni.showToast({
                    title: '获取用户信息失败',
                    icon: 'none'
                  })
                }
              }).catch(err => {
                uni.hideLoading()
                uni.showToast({
                  title: '获取用户信息失败',
                  icon: 'none'
                })
              });
            } else {
              uni.hideLoading()
              uni.showToast({
                title: '更新用户信息失败',
                icon: 'none'
              })
            }
          }).catch(err => {
            uni.hideLoading()
            uni.showToast({
              title: '更新用户信息失败',
              icon: 'none'
            })
          })
        } else {
          // 认证失败情况
          uni.hideLoading()
		  
          uni.showToast({
            title: '您填写的信息有误，请进行检查' || '认证失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('认证失败:', error)
        uni.hideLoading()
        uni.showToast({
          title: '认证失败，请重试',
          icon: 'none'
        })
      } finally {
        this.submitting = false
      }
    },

    // 身份证号脱敏处理
    maskIdentification(idcard) {
      if (!idcard) return ''
      return idcard.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2')
    }
  }
}
</script>

<style lang="scss">
.auth-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;
}

.auth-status {
  padding: 60rpx 0;
  
  .status-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 60rpx 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    
    .status-text {
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
      margin: 30rpx 0;
    }
    
    .auth-info {
      width: 100%;
      margin-top: 40rpx;
      
      .info-item {
        font-size: 28rpx;
        color: #666;
        line-height: 2;
        display: block;
      }
    }
  }
}

.auth-form {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
  
  .form-header {
    text-align: center;
    margin-bottom: 40rpx;
    
    .title {
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .subtitle {
      font-size: 26rpx;
      color: #999;
    }
  }
  
  .input-group {
    margin-bottom: 40rpx;
    
    .input-item {
      margin-bottom: 30rpx;
      
      .label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
        display: block;
      }
      
      .input {
        width: 100%;
        height: 88rpx;
        background: #f8f8f8;
        border-radius: 44rpx;
        padding: 0 30rpx;
        font-size: 28rpx;
        color: #333;
        
        &:focus {
          background: #f0f0f0;
        }
      }
    }
  }
  
  .submit-btn {
    width: 100%;
    height: 88rpx;
    background: linear-gradient(135deg, #FF6B01, #FF8F1F);
    border-radius: 44rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    
    &:active {
      opacity: 0.9;
    }
    
    &[disabled] {
      background: #ccc;
      opacity: 0.8;
    }
  }
  
  .tips {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .uni-icons {
      margin-right: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style> 
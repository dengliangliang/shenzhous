<template>
  <view class="invite-container">
    <view class="invite-card">
      <view class="card-header">
        <image class="avatar" :src="userPhoto" mode="aspectFill"></image>
        <view class="user-info">
          <text class="nickname">{{ userInfo.userName || '未设置昵称' }}</text>
          <text class="invite-tip">邀请您加入神州邮</text>
        </view>
      </view>
      
      <view class="invite-code-section">
        <text class="code-label">我的邀请码</text>
        <text class="code-value">{{ userInfo.myCode || '暂无邀请码' }}</text>
      </view>
      
      <view class="code-info">
        <view class="share-desc">
          <uni-icons type="info" size="16" color="#FF6B01"></uni-icons>
          <text>好友使用您的邀请码注册，双方都将获得奖励</text>
        </view>
      </view>
      
      <view class="benefits">
        <view class="benefit-title">
          <uni-icons type="info" size="16" color="#FF6B01"></uni-icons>
          <text>成为代理的好处</text>
        </view>
        <view class="benefit-list">
          <view class="benefit-item">
            <uni-icons type="checkmarkempty" size="14" color="#52C41A"></uni-icons>
            <text>邀请好友注册返佣金，推广越多收益越高</text>
          </view>
          <view class="benefit-item">
            <uni-icons type="checkmarkempty" size="14" color="#52C41A"></uni-icons>
            <text>享受寄件费用专属折扣，省钱更省心</text>
          </view>
          <view class="benefit-item">
            <uni-icons type="checkmarkempty" size="14" color="#52C41A"></uni-icons>
            <text>优先派送服务，包裹更快送达</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="share-actions">
      <button class="share-btn wechat" open-type="shareTimeline">
        <view class="btn-inner">
          <image class="btn-icon" src="/static/img/wechat.png" mode="aspectFit"></image>
          <text>一键分享给微信好友</text>
        </view>
      </button>
      
      <button class="share-btn copy" @click="copyCode">
        <view class="btn-inner">
          <image class="btn-icon" src="/static/img/copy.png" mode="aspectFit"></image>
          <text>复制邀请码</text>
        </view>
      </button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import userApi from '@/api/user'

export default {
  data() {
    return {
      userPhoto: '/static/logo.png'
    }
  },
  
  computed: {
    ...mapState('user', ['userInfo'])
  },
  
  onLoad() {
    // 如果有头像就使用用户头像
    if (this.userInfo && this.userInfo.avatar) {
      this.userPhoto = this.userInfo.avatar
    }
  },
  
  // 分享给微信好友
  onShareAppMessage() {
    return {
      title: `${this.userInfo.userName || '好友'}邀请您加入神州邮`,
      path: `/pages/login/login?inviteCode=${this.userInfo.myCode}&register=true`,
      imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
      success: () => {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        })
      }
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '神州邮 - 方便快捷的快递服务',
      query: `inviteCode=${this.userInfo.myCode}&register=true`,
      imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png'
    }
  },
  
  methods: {
    // 复制邀请码
    copyCode() {
      if (!this.userInfo || !this.userInfo.myCode) {
        uni.showToast({
          title: '暂无邀请码',
          icon: 'none'
        });
        return;
      }
      
      uni.setClipboardData({
        data: this.userInfo.myCode,
        success: () => {
          uni.showToast({
            title: '邀请码已复制',
            icon: 'success'
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
.invite-container {
  padding: 30rpx;
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.invite-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
  margin-bottom: 40rpx;
  
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    
    .user-info {
      display: flex;
      flex-direction: column;
      
      .nickname {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 6rpx;
      }
      
      .invite-tip {
        font-size: 26rpx;
        color: #FF6B01;
      }
    }
  }
  
  .invite-code-section {
    background: #f8f8f8;
    padding: 30rpx;
    border-radius: 12rpx;
    margin-bottom: 30rpx;
    text-align: center;
    
    .code-label {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 16rpx;
      display: block;
    }
    
    .code-value {
      font-size: 48rpx;
      color: #FF6B01;
      font-weight: bold;
      display: block;
      letter-spacing: 2rpx;
    }
  }
  
  .code-info {
    .share-desc {
      display: flex;
      align-items: center;
      justify-content: center;
      
      text {
        font-size: 26rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
  }
}

.benefits {
  border-top: 1px dashed #eee;
  padding-top: 30rpx;
  margin-top: 20rpx;
  
  .benefit-title {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    text {
      font-size: 28rpx;
      color: #333;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  
  .benefit-list {
    .benefit-item {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      text {
        font-size: 26rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
  }
}

.share-actions {
  margin-top: 20rpx;
  
  .share-btn {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    border-radius: 45rpx;
    font-size: 32rpx;
    font-weight: 500;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
    
    .btn-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      
      .btn-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }
    
    &.wechat {
      background: #07C160;
      color: #fff;
    }
    
    &.copy {
      background: #4A90E2;
      color: #fff;
    }
  }
}
</style> 
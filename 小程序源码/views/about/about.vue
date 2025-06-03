<template>
  <view class="about-container">
    <!-- 公司logo -->
    <view class="logo-section">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="app-name">神州邮</text>
      <text class="version">v1.0.0</text>
    </view>

    <!-- 加载提示 -->
    <view class="loading" v-if="loading">
      <text>加载中...</text>
    </view>

    <!-- 公司信息 -->
    <view class="info-section" v-if="!loading && customerInfo">
      <view class="info-item">
        <text class="label">公司名称</text>
        <text class="value">{{ customerInfo.companyName || '暂无数据' }}</text>
      </view>
      <view class="info-item">
        <text class="label">公司地址</text>
        <text class="value">{{ customerInfo.companyAddress || '暂无数据' }}</text>
      </view>
     <!-- <view class="info-item">
        <text class="label">开票联系人</text>
        <text class="value">{{ customerInfo.invoicingContact || '暂无数据' }}</text>
      </view> -->
    </view>

    <!-- 公司简介 -->
    <view class="profile-section" v-if="!loading && customerInfo && customerInfo.companyProfile">
      <view class="section-title">公司简介</view>
      <view class="profile-content">{{ customerInfo.companyProfile }}</view>
    </view>

    <!-- 版权信息 -->
    <view class="copyright">
      <text>Copyright © {{ currentYear }} 神州邮</text>
      <text>All Rights Reserved</text>
    </view>
  </view>
</template>

<script>
import customerApi from '@/api/customer'

export default {
  data() {
    return {
      customerInfo: null,
      loading: true,
      currentYear: new Date().getFullYear() // 获取当前年份
    }
  },
  
  onLoad() {
    this.getCustomerInfo()
  },
  
  methods: {
    // 获取公司信息
    async getCustomerInfo() {
      this.loading = true
      try {
        const res = await customerApi.getCustomer()
        if (res) {
          this.customerInfo = res
        } else {
          uni.showToast({
            title: '获取公司信息失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('获取公司信息错误:', error)
        uni.showToast({
          title: '获取公司信息失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40rpx;

  .loading {
    display: flex;
    justify-content: center;
    padding: 40rpx 0;
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60rpx 0;

    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }

    .app-name {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .version {
      font-size: 24rpx;
      color: #999;
    }
  }

  .info-section {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-size: 28rpx;
        color: #666;
      }

      .value {
        font-size: 28rpx;
        color: #333;
        max-width: 450rpx;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  
  .profile-section {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      position: relative;
      padding-left: 20rpx;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6rpx;
        height: 30rpx;
        background-color: #FF6B01;
        border-radius: 3rpx;
      }
    }
    
    .profile-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      text-align: justify;
    }
  }

  .copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60rpx;

    text {
      font-size: 24rpx;
      color: #999;
      line-height: 1.5;
    }
  }
}
</style> 
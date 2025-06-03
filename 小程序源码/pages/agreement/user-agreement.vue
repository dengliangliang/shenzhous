<template>
  <view class="agreement-container">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="back" @tap="goBack">
        <uni-icons type="left" size="20" color="#333"></uni-icons>
      </view>
      <text class="title">用户协议</text>
    </view>
    
    <!-- 协议内容 -->
    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="section-title">1. 总则</view>
        <view class="section-content">
          <text>1.1 神州邮用户协议（以下简称"本协议"）是由神州邮平台（以下简称"本平台"）与用户就平台服务等相关事宜所订立的契约。</text>
          <text>1.2 用户在注册前应当仔细阅读本协议的全部内容。如果您不同意本协议的任意内容，请勿注册或使用本平台服务。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">2. 服务内容</view>
        <view class="section-content">
          <text>2.1 本平台主要提供快递寄送服务的在线下单、查询、评价等功能。</text>
          <text>2.2 用户可以通过本平台提供的功能进行快递服务的预约和管理。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">3. 用户权利和义务</view>
        <view class="section-content">
          <text>3.1 用户有权按照本协议约定使用本平台提供的各项服务。</text>
          <text>3.2 用户应当提供真实、准确的个人信息，如有变更应及时更新。</text>
          <text>3.3 用户应当妥善保管账号和密码，因账号和密码泄露造成的损失由用户自行承担。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">4. 隐私保护</view>
        <view class="section-content">
          <text>4.1 本平台重视用户的隐私保护，承诺依法保护用户的个人信息安全。</text>
          <text>4.2 本平台将采取适当的技术手段和管理措施保护用户的个人信息。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">5. 免责声明</view>
        <view class="section-content">
          <text>5.1 因不可抗力或第三方原因导致的服务中断或延迟，本平台不承担责任。</text>
          <text>5.2 用户因违反本协议或法律法规造成的损失，由用户自行承担。</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss">
.agreement-container {
  min-height: 100vh;
  background: #fff;
  padding-bottom: env(safe-area-inset-bottom);
  
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 88rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    padding-top: env(safe-area-inset-top);
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    
    .back {
      padding: 20rpx;
      margin-left: -20rpx;
    }
    
    .title {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: 500;
      padding-right: 60rpx;
    }
  }
  
  .content {
    height: 100vh;
    padding: 120rpx 30rpx 40rpx;
    box-sizing: border-box;
    
    .section {
      margin-bottom: 40rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .section-content {
        text {
          display: block;
          font-size: 28rpx;
          color: #666;
          line-height: 1.8;
          margin-bottom: 16rpx;
          text-align: justify;
        }
      }
    }
  }
}
</style> 
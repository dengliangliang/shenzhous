<template>
  <view class="details-container">
    <!-- 状态卡片 -->
    <view class="status-card animate__animated animate__fadeIn">
      <view class="status-icon" :class="{
        'pending': details.applyStatus === 0,
        'passed': details.applyStatus === 1,
        'rejected': details.applyStatus === 2,
        'canceled': details.applyStatus === 3
      }">
        <uni-icons :type="getStatusIcon(details.applyStatus)" size="32" :color="getStatusColor(details.applyStatus)"></uni-icons>
      </view>
      <text class="status-text" :style="{ color: getStatusColor(details.applyStatus) }">{{ getApplyStatusText(details.applyStatus) }}</text>
      <text class="apply-time">申请时间：{{ details.createTime }}</text>
    </view>
    
    <!-- 基本信息 -->
    <view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.1s">
      <view class="card-header">
        <uni-icons type="person" size="20" color="#FF6B01"></uni-icons>
        <text>基本信息</text>
      </view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">账户类型</text>
          <text class="value">{{ details.accountType === 0 ? '企业账户' : '个人账户' }}</text>
        </view>
        <view class="info-item">
          <text class="label">联系人</text>
          <text class="value">{{ details.name }}</text>
        </view>
        <view class="info-item">
          <text class="label">联系电话</text>
          <text class="value">{{ details.phone }}</text>
        </view>
        <view class="info-item">
          <text class="label">联系地址</text>
          <text class="value">{{ details.address }}</text>
        </view>
        <view class="info-item">
          <text class="label">电子邮箱</text>
          <text class="value">{{ details.email }}</text>
        </view>
      </view>
    </view>
    
    <!-- 结算信息 -->
    <view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.2s">
      <view class="card-header">
        <uni-icons type="wallet" size="20" color="#FF6B01"></uni-icons>
        <text>结算信息</text>
      </view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">结算周期</text>
          <text class="value">{{ getCycleText(details.settlementCycle) }}</text>
        </view>
        <view class="info-item">
          <text class="label">最低寄件量</text>
          <text class="value highlight">¥ {{ details.minimumAmount }}<text class="unit">/月</text></text>
        </view>
        <view class="info-item">
          <text class="label">发票要求</text>
          <text class="value">{{ getInvoiceText(details.invoiceRequirement) }}</text>
        </view>
        <view class="info-item">
          <text class="label">特殊要求</text>
          <text class="value">{{ details.remark || '无' }}</text>
        </view>
      </view>
    </view>
    
    <!-- 证件信息 -->
    <view class="info-card animate__animated animate__fadeIn" style="animation-delay: 0.3s">
      <view class="card-header">
        <uni-icons type="idcard" size="20" color="#FF6B01"></uni-icons>
        <text>证件信息</text>
      </view>
      <view class="cert-list">
        <view class="cert-item" v-if="details.idCardPortraitPhoto">
          <text class="label">身份证人像面</text>
          <image :src=" photoBaseUrl+details.idCardPortraitPhoto" mode="aspectFill" @click="previewImage(details.idCardPortraitPhoto)"></image>
        </view>
        <view class="cert-item" v-if="details.idCardEmblemPhoto">
          <text class="label">身份证国徽面</text>
          <image :src=" photoBaseUrl+details.idCardEmblemPhoto" mode="aspectFill" @click="previewImage(details.idCardEmblemPhoto)"></image>
        </view>
        <view class="cert-item" v-if="details.accountType === 0 && details.businessLicense">
          <text class="label">营业执照</text>
          <image :src=" photoBaseUrl+details.businessLicense" mode="aspectFill" @click="previewImage(details.businessLicense)"></image>
        </view>
      </view>
    </view>
    
    <!-- 驳回原因 -->
    <view class="reject-card animate__animated animate__fadeIn" 
          style="animation-delay: 0.4s"
          v-if="details.applyStatus === 2 && details.rejectReason">
      <view class="card-header">
        <uni-icons type="info" size="20" color="#FF4D4F"></uni-icons>
        <text class="reject-title">驳回原因</text>
      </view>
      <text class="reject-reason">{{ details.rejectReason }}</text>
    </view>
    
    <!-- 底部按钮 -->
    <view class="bottom-btn animate__animated animate__fadeInUp" v-if="details.applyStatus === 0">
      <button class="cancel-btn" @click="confirmCancel">
        <uni-icons type="close" size="20" color="#FF4D4F"></uni-icons>
        <text>取消申请</text>
      </button>
    </view>
  </view>
</template>

<script>
import monthlyApi from '@/api/monthly'
import{photoBaseUrl} from '@/config/env'
export default {
  data() {
    return {
      details: {},
      loading: true,
	  photoBaseUrl:''
    }
  },
  
  onLoad(options) {
	  this.photoBaseUrl = photoBaseUrl
    if (options.id) {
      this.loadDetails(options.id)
    }
  },
  
  methods: {
    // 加载申请详情
    async loadDetails(id) {
      try {
        uni.showLoading({
          title: '加载中...'
        })
        
        const res = await monthlyApi.getApplyById(id)
        this.details = res || {}
        
      } catch (e) {
        console.error('加载申请详情失败:', e)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
        this.loading = false
      }
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      const iconMap = {
        0: 'spinner-cycle',
        1: 'checkmarkempty',
        2: 'closeempty',
        3: 'closeempty'
      }
      return iconMap[status] || 'info'
    },
    
    // 获取状态颜色
    getStatusColor(status) {
      const colorMap = {
        0: '#FAAD14',
        1: '#52C41A',
        2: '#FF4D4F',
        3: '#999999'
      }
      return colorMap[status] || '#666666'
    },
    
    // 获取申请状态文本
    getApplyStatusText(status) {
      const statusMap = {
        0: '审核中',
        1: '已通过',
        2: '已驳回',
        3: '已取消'
      }
      return statusMap[status] || '未知'
    },
    
    // 获取结算周期文本
    getCycleText(cycle) {
      const cycleMap = {
        0: '月结',
        1: '季结',
        2: '半年结'
      }
      return cycleMap[cycle] || '未知'
    },
    
    // 获取发票要求文本
    getInvoiceText(requirement) {
      const invoiceMap = {
        0: '增值税普通发票',
        1: '增值税专用发票',
        2: '其他'
      }
      return invoiceMap[requirement] || '未知'
    },
    
    // 预览图片
    previewImage(url) {
      if (!url) return
      uni.previewImage({
        urls: [url]
      })
    },
    
    // 确认取消申请
    confirmCancel() {
      uni.showModal({
        title: '取消申请',
        content: '确定要取消该月结资格申请吗？',
        confirmColor: '#FF6B01',
        success: async (res) => {
          if (res.confirm) {
            await this.cancelApply()
          }
        }
      })
    },
    
    // 取消申请
    async cancelApply() {
      if (!this.details.applyId) return
      
      try {
        uni.showLoading({
          title: '取消中...'
        })
        
        await monthlyApi.cancelApply(this.details.applyId)
        
        uni.showToast({
          title: '取消成功',
          icon: 'success'
        })
        
        // 刷新详情
        this.loadDetails(this.details.applyId)
        
      } catch (e) {
        console.error('取消申请失败:', e)
        uni.showToast({
          title: '取消失败，请重试',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  min-height: 100vh;
  background-color: #F5F6FA;
  padding-bottom: 120rpx;
  
  .status-card {
    background-color: #FFFFFF;
    padding: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rpx;
    
    .status-icon {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      
      &.pending {
        background-color: rgba(250, 173, 20, 0.1);
      }
      
      &.passed {
        background-color: rgba(82, 196, 26, 0.1);
      }
      
      &.rejected {
        background-color: rgba(255, 77, 79, 0.1);
      }
      
      &.canceled {
        background-color: rgba(153, 153, 153, 0.1);
      }
    }
    
    .status-text {
      font-size: 32rpx;
      font-weight: 500;
      margin-bottom: 10rpx;
    }
    
    .apply-time {
      font-size: 26rpx;
      color: #999999;
    }
  }
  
  .info-card {
    background-color: #FFFFFF;
    padding: 30rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 12rpx;
    
    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      uni-icons {
        margin-right: 10rpx;
      }
      
      text {
        font-size: 30rpx;
        font-weight: 500;
        color: #333333;
      }
    }
    
    .info-list {
      .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .label {
          font-size: 28rpx;
          color: #666666;
        }
        
        .value {
          font-size: 28rpx;
          color: #333333;
          
          &.highlight {
            color: #FF6B01;
            font-weight: 500;
            
            .unit {
              font-size: 24rpx;
              color: #999999;
              font-weight: normal;
              margin-left: 4rpx;
            }
          }
        }
      }
    }
    
    .cert-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      
      .cert-item {
        .label {
          font-size: 26rpx;
          color: #666666;
          margin-bottom: 10rpx;
          display: block;
        }
        
        image {
          width: 100%;
          height: 180rpx;
          border-radius: 8rpx;
          background-color: #F5F5F5;
        }
      }
    }
  }
  
  .reject-card {
    background-color: #FFF1F0;
    padding: 30rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 12rpx;
    
    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      uni-icons {
        margin-right: 10rpx;
      }
      
      .reject-title {
        font-size: 30rpx;
        font-weight: 500;
        color: #FF4D4F;
      }
    }
    
    .reject-reason {
      font-size: 28rpx;
      color: #666666;
      line-height: 1.5;
    }
  }
  
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 30rpx;
    background-color: #FFFFFF;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .cancel-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      background-color: rgba(255, 77, 79, 0.1);
      border-radius: 44rpx;
      
      uni-icons {
        margin-right: 10rpx;
      }
      
      text {
        font-size: 30rpx;
        color: #FF4D4F;
        font-weight: 500;
      }
    }
  }
}
</style> 
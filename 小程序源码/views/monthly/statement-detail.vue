<template>
  <view class="detail-container">
    <!-- 加载状态 -->
    <view class="loading-container" v-if="loading">
      <view class="loading-circle"></view>
      <text class="loading-text">正在加载账单信息...</text>
    </view>
    
    <template v-else>
      <!-- 顶部状态 -->
      <view class="status-card animate__animated animate__fadeIn" :class="{ refund: statement.type === 1 }">
        <view class="status-icon">
          <uni-icons 
            :type="statement.type === 0 ? 'plus' : 'minus'" 
            size="28" 
            color="#FFFFFF"
          ></uni-icons>
        </view>
        <view class="status-info">
          <text class="status-type">{{ statement.type === 0 ? '支付' : '退款' }}</text>
          <text class="status-amount">¥ {{ formatAmount(statement.amount) }}</text>
        </view>
        <!-- 只在支付类型时显示结算状态 -->
        <view class="settlement-status" :class="{ settled: statement.isUserPays === 1 }" v-if="statement.type === 0">
          {{ statement.isUserPays === 1 ? '已结算' : '未结算' }}
        </view>
      </view>
      
      <!-- 详情卡片 -->
      <view class="detail-card animate__animated animate__fadeIn" style="animation-delay: 0.1s;">
        <view class="card-title">账单详情</view>
        
        <view class="info-list">
          <!-- 移除了账单编号和订单编号 -->
          <view class="info-item">
            <text class="label">所属用户</text>
            <text class="value">{{ statement.userName || '未知用户' }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">交易类型</text>
            <text class="value" :class="{ refund: statement.type === 1 }">
              {{ statement.type === 0 ? '支付' : '退款' }}
            </text>
          </view>
          
          <view class="info-item">
            <text class="label">交易金额</text>
            <text class="value highlight">¥ {{ formatAmount(statement.amount) }}</text>
          </view>
          
          <!-- 只在支付类型时显示结算状态 -->
          <view class="info-item" v-if="statement.type === 0">
            <text class="label">结算状态</text>
            <text class="value" :class="{ settled: statement.isUserPays === 1 }">
              {{ statement.isUserPays === 1 ? '已结算' : '未结算' }}
            </text>
          </view>
          
          <view class="info-item">
            <text class="label">创建时间</text>
            <text class="value">{{ formatDate(statement.createTime) }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">更新时间</text>
            <text class="value">{{ formatDate(statement.updateTime) }}</text>
          </view>
        </view>
      </view>
      
      <!-- 查看订单详情按钮 -->
      <button class="detail-btn animate__animated animate__fadeIn" style="animation-delay: 0.2s;" 
              @click="viewOrderDetail" v-if="statement.orderId">
        <uni-icons type="paperplane" size="18" color="#FFFFFF"></uni-icons>
        <text>查看订单详情</text>
      </button>
      
      <!-- 底部说明 -->
      <view class="bottom-tips animate__animated animate__fadeIn" style="animation-delay: 0.4s;">
        <uni-icons type="info" size="14" color="#999999"></uni-icons>
        <text>{{ statement.type === 0 ? '账单金额将在结算日自动结算，如有疑问请联系客服' : '退款金额已退回原支付账户' }}</text>
      </view>
    </template>
  </view>
</template>

<script>
import statementApi from '@/api/statement'

export default {
  data() {
    return {
      loading: true,
      refreshing: false,
      statementId: '',
      statement: {
        monthlyStatementId: '',
        userId: '',
        userName: '',
        monthlySettlementEligibilityId: '',
        orderId: '',
        order: null,
        type: 0,
        isUserPays: 0,
        amount: '0.00',
        createTime: '',
        updateTime: ''
      }
    }
  },
  
  onLoad(options) {
    if (options.id) {
      this.statementId = options.id
      this.getStatementDetail()
    }
  },
  
  // 添加下拉刷新支持
  onPullDownRefresh() {
    this.refreshData()
  },
  
  methods: {
    // 获取账单详情
    async getStatementDetail() {
      if (this.refreshing) {
        uni.showLoading({ title: '刷新中...' })
      } else if (this.loading) {
        uni.showLoading({ title: '加载中...' })
      }
      
      try {
        const res = await statementApi.getStatementById(this.statementId)
        
        if (res) {
          this.statement = res
        } else {
          uni.showToast({
            title: '获取账单失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取账单详情失败:', e)
        uni.showToast({
          title: '获取详情失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
        this.refreshing = false
        uni.hideLoading()
        uni.stopPullDownRefresh()
      }
    },
    
    // 刷新数据
    refreshData() {
      this.refreshing = true
      this.getStatementDetail()
    },
    
    // 获取订单状态文本
    getOrderStatus(status) {
      // 新的订单状态码对应文本
      const statusMap = {
        0: '待支付',
        1: '微信支付',
        2: '未支付已取消',
        3: '已取消已退款',
        4: '月结支付'
      }
      
      return statusMap[status] || '未知状态'
    },
    
    // 查看订单详情
    viewOrderDetail() {
      if (this.statement.orderId) {
        uni.navigateTo({
          url: `/views/order/detail?orderId=${this.statement.orderId}`
        })
      }
    },
    
    // 格式化金额显示
    formatAmount(amount) {
      if (!amount) return '0.00'
      
      // 确保是数字类型
      const num = parseFloat(amount)
      return num.toFixed(2)
    },
    
    // 格式化日期显示
    formatDate(dateStr) {
      if (!dateStr) return '暂无'
      
      // 如果需要更复杂的格式化，可以在这里添加处理逻辑
      return dateStr
    },
    
    // 复制文本
    copyText(text) {
      if (!text) {
        uni.showToast({
          title: '无内容可复制',
          icon: 'none'
        })
        return
      }
      
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({
            title: '复制成功',
            icon: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  background-color: #F8F8F8;
  min-height: 100vh;
  padding: 30rpx;
}

// 加载状态
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
  margin-top: 100rpx;
  
  .loading-circle {
    width: 80rpx;
    height: 80rpx;
    border: 4rpx solid rgba(255, 107, 1, 0.1);
    border-top-color: #FF6B01;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 30rpx;
  }
  
  .loading-text {
    font-size: 28rpx;
    color: #999;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 状态卡片
.status-card {
  background: linear-gradient(135deg, #52C41A, #95DE64);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  box-shadow: 0 6rpx 20rpx rgba(82, 196, 26, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    right: -60rpx;
    top: -60rpx;
    width: 200rpx;
    height: 200rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &.refund {
    background: linear-gradient(135deg, #FF4D4F, #FF7875);
    box-shadow: 0 6rpx 20rpx rgba(255, 77, 79, 0.2);
  }
  
  .status-icon {
    width: 80rpx;
    height: 80rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30rpx;
  }
  
  .status-info {
    flex: 1;
    
    .status-type {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 10rpx;
      display: block;
    }
    
    .status-amount {
      font-size: 48rpx;
      color: #FFFFFF;
      font-weight: 600;
    }
  }
  
  .settlement-status {
    padding: 8rpx 24rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 30rpx;
    font-size: 24rpx;
    color: #FFFFFF;
    
    &.settled {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// 详情卡片
.detail-card, .order-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  
  .card-title {
    font-size: 32rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 30rpx;
    position: relative;
    padding-left: 20rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6rpx;
      bottom: 6rpx;
      width: 6rpx;
      background: #FF6B01;
      border-radius: 3rpx;
    }
  }
}

// 信息列表
.info-list {
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24rpx;
    
    .label {
      font-size: 28rpx;
      color: #999999;
    }
    
    .value {
      font-size: 28rpx;
      color: #333333;
      max-width: 60%;
      text-align: right;
      
      &.highlight {
        color: #FF6B01;
        font-weight: 500;
      }
      
      &.refund {
        color: #FF4D4F;
      }
      
      &.settled {
        color: #52C41A;
      }
    }
  }
}

// 查看订单详情按钮
.detail-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #40A9FF, #1890FF);
  height: 90rpx;
  border-radius: 45rpx;
  color: #FFFFFF;
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 30rpx;
  box-shadow: 0 6rpx 16rpx rgba(24, 144, 255, 0.2);
  
  &:after {
    border: none;
  }
  
  uni-icons {
    margin-right: 12rpx;
  }
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.2);
  }
}

// 底部说明
.bottom-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx;
  
  .uni-icons {
    margin-right: 8rpx;
  }
  
  text {
    font-size: 24rpx;
    color: #999999;
  }
}
</style> 
<template>
  <view class="invoice-container">
    <view class="header">
      <text class="title">电子发票</text>
      <text class="subtitle">可为已完成的订单申请开具电子发票</text>
    </view>
    
    <!-- 订单列表 -->
    <view v-if="orderList.length > 0" class="order-list">
      <view 
        v-for="(item, index) in orderList" 
        :key="item.orderId" 
        class="order-item"
        @click="goToInvoiceDetail(item)"
      >
        <view class="order-header">
          <text class="order-id">订单号: {{item.orderNo}}</text>
          <text class="order-status">已完成</text>
        </view>
        <view class="order-content">
          <view class="order-info">
            <view class="info-row">
              <text class="label">收件人:</text>
              <text class="value">{{item.receiverName}}</text>
            </view>
            <view class="info-row">
              <text class="label">支付金额:</text>
              <text class="value price">¥{{item.orderTotalPrice}}</text>
            </view>
            <view class="info-row">
              <text class="label">完成时间:</text>
              <text class="value">{{formatDate(item.receivingTime  || item.updateTime)}}</text>
            </view>
          </view>
        </view>
        <view class="order-footer">
          <view class="order-btn" @click.stop="applyInvoice(item)">
            <text>查看开票信息</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image src="/static/img/empty-order.png" class="empty-image"></image>
      <text class="empty-text">暂无可开票订单</text>
    </view>
    
    <!-- 加载更多 -->
    <view v-if="orderList.length > 0" class="load-more">
      <text v-if="loading">加载中...</text>
      <text v-else-if="hasMore">上拉加载更多</text>
      <text v-else>没有更多数据了</text>
    </view>
  </view>
</template>

<script>
import orderApi from '@/api/order'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      hasMore: true
    }
  },
  
  computed: {
    ...mapGetters('user', ['getUserInfo'])
  },
  
  onLoad() {
    this.loadOrders()
  },
  
  // 下拉刷新
  onPullDownRefresh() {
    this.pageNum = 1
    this.orderList = []
    this.loadOrders().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  
  // 上拉加载
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.pageNum++
      this.loadOrders()
    }
  },
  
  methods: {
    // 加载订单列表
    async loadOrders() {
      if (!this.getUserInfo || !this.getUserInfo.userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }
      
      this.loading = true
      
      try {
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userId: this.getUserInfo.userId
        }
        console.log(params)
        const res = await orderApi.getDone(params)
        
        if (res) {
          if (this.pageNum === 1) {
            this.orderList = res.dataList || []
          } else {
            this.orderList = [...this.orderList, ...(res.dataList || [])]
          }
          
          this.total = res.totalPages || 0
          this.hasMore = this.orderList.length < this.total
        }
      } catch (e) {
        console.error('加载订单失败:', e)
        uni.showToast({
          title: '加载订单失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return '-'
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    },
    
    // 申请开票
    applyInvoice(item) {
      uni.navigateTo({
        url: `/views/invoice/invoice-detail?orderId=${item.orderId}`
      })
    },
    
    // 查看发票详情
    goToInvoiceDetail(item) {
		console.log(item)
      uni.navigateTo({
        url: `/views/order/detail?id=${item.orderId}`
      })
    }
  }
}
</script>

<style lang="scss">
.invoice-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
  
  .header {
    background: linear-gradient(135deg, #FF6B01, #FF8F1F);
    padding: 30rpx;
    color: #fff;
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .subtitle {
      font-size: 24rpx;
      opacity: 0.8;
    }
  }
  
  .order-list {
    padding: 20rpx;
    
    .order-item {
      background-color: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      overflow: hidden;
      
      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        border-bottom: 1px solid #f5f5f5;
        
        .order-id {
          font-size: 26rpx;
          color: #666;
        }
        
        .order-status {
          font-size: 26rpx;
          color: #FF6B01;
        }
      }
      
      .order-content {
        padding: 20rpx;
        
        .order-info {
          .info-row {
            display: flex;
            margin-bottom: 10rpx;
            
            .label {
              font-size: 26rpx;
              color: #999;
              width: 140rpx;
            }
            
            .value {
              font-size: 26rpx;
              color: #333;
              flex: 1;
              
              &.price {
                color: #FF6B01;
                font-weight: bold;
              }
            }
          }
        }
      }
      
      .order-footer {
        display: flex;
        justify-content: flex-end;
        padding: 20rpx;
        border-top: 1px solid #f5f5f5;
        
        .order-btn {
          display: inline-block;
          padding: 10rpx 30rpx;
          background: linear-gradient(135deg, #FF6B01, #FF8F1F);
          border-radius: 30rpx;
          color: #fff;
          font-size: 26rpx;
          
          text {
            font-size: 26rpx;
          }
        }
      }
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    
    .empty-image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 20rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .load-more {
    text-align: center;
    padding: 20rpx;
    
    text {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style> 
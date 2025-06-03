<template>
  <view class="logistics-container">
    <!-- 顶部装饰元素 -->
    <view class="top-decoration">
      <view class="decoration-dot" v-for="i in 5" :key="i"></view>
    </view>
    
    <!-- 加载中状态 -->
    <view class="loading-container" v-if="loading">
      <view class="loading-circle"></view>
      <text class="loading-text">正在加载物流信息...</text>
    </view>
    
    <!-- 物流信息卡片 -->
    <block v-else>
      <view class="logistics-card animate__animated animate__fadeInDown">
        <!-- 快递信息头部 -->
        <view class="express-header">
          <view class="express-info">
            <view class="logo-container">
              <image :src="expressLogo" mode="aspectFit"></image>
            </view>
            <view class="name-no">
              <text class="name">{{expressName}}</text>
              <text class="no">单号：{{orderNo}}</text>
            </view>
          </view>
          <view class="status-badge" :class="'status-' + status">{{statusText}}</view>
        </view>
        
        <!-- 地址信息 -->
        <view class="address-info">
          <view class="address-flow">
            <view class="from">
              <view class="label-box">寄</view>
              <view class="info">
                <text class="name">{{fromName}}</text>
                <text class="address">{{fromAddress}}</text>
              </view>
            </view>
            
            <view class="flow-line">
              <view class="dot start"></view>
              <view class="line"></view>
              <view class="dot end"></view>
            </view>
            
            <view class="to">
              <view class="label-box">收</view>
              <view class="info">
                <text class="name">{{toName}}</text>
                <text class="address">{{toAddress}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 物流轨迹 -->
      <view class="logistics-track animate__animated animate__fadeInUp" style="animation-delay: 0.2s;">
        <view class="track-title">
          <view class="title-with-icon">
            <uni-icons type="paperplane-filled" size="18" color="#FF6B01"></uni-icons>
            <text>物流轨迹</text>
          </view>
          <text v-if="trackList.length > 0" class="update-time">更新于 {{trackList[0].time}}</text>
        </view>
        
        <view class="track-list">
          <view 
            class="track-item" 
            v-for="(item, index) in trackList" 
            :key="index"
            :class="{'track-active': index === 0}"
            :style="{'animation-delay': index * 0.1 + 0.3 + 's'}"
          >
            <view class="time-column">
              <text class="time">{{item.timeStr}}</text>
              <text class="date">{{item.dateStr}}</text>
            </view>
            
            <view class="node-column">
              <view class="node-dot" :class="{'active-dot': index === 0}">
                <view class="inner-dot" v-if="index === 0"></view>
                <view class="pulse-circle" v-if="index === 0"></view>
              </view>
              <view class="node-line" v-if="index !== trackList.length - 1"></view>
            </view>
            
            <view class="content-column">
              <text class="content">{{item.content}}</text>
              <view class="location-info" v-if="item.location">
                <uni-icons type="location" size="14" color="#999"></uni-icons>
                <text class="location">{{item.location}}</text>
              </view>
            </view>
          </view>
          
          <!-- 无物流信息 -->
          <view class="empty-track animate__animated animate__fadeIn" v-if="trackList.length === 0">
            <image src="/static/img/empty-box.png" mode="aspectFit"></image>
            <text>暂无物流信息</text>
          </view>
        </view>
      </view>
      
      <!-- 底部按钮 -->
      <view class="footer-actions animate__animated animate__fadeInUp" style="animation-delay: 0.5s;">
        <button class="action-btn copy-btn" @click="copyTrackingNo">
          <uni-icons type="paperclip" size="18" color="#666666"></uni-icons>
          <text>复制单号</text>
        </button>
        
        <button class="action-btn refresh-btn" @click="refreshLogistics">
          <uni-icons type="refresh" size="18" color="#FFFFFF"></uni-icons>
          <text>刷新</text>
        </button>
      </view>
    </block>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import orderApi from '@/api/order'
import expressApi from '@/api/express'

export default {
  data() {
    return {
      orderId: '',
      orderNo: '',
      expressCode: '',
      expressName: '',
      expressLogo: '',
      status: 0,
      statusText: '',
      fromName: '',
      fromAddress: '',
      toName: '',
      toAddress: '',
      trackList: [], // 物流轨迹
      refreshing: false,
      loading: false
    }
  },
  
  computed: {
    ...mapState('user', ['userInfo']),
    
    // 格式化收件地址
    receiverFullAddress() {
      return this.receiverProvince + this.receiverCity + this.receiverDistrict + this.receiverDetailAddress
    },
    
    // 格式化寄件地址
    senderFullAddress() {
      return this.senderProvince + this.senderCity + this.senderDistrict + this.senderDetailAddress
    }
  },
  
  onLoad(options) {
    // 获取路由参数
    if (options.orderId) {
      this.orderId = options.orderId
    }
    
    if (options.orderNo) {
      this.orderNo = options.orderNo
    }
    
    // 获取订单详情
    this.getOrderDetail()
  },
  
  methods: {
    // 获取订单详情
    async getOrderDetail() {
      if (!this.orderId) {
        uni.showToast({
          title: '订单ID不能为空',
          icon: 'none'
        })
        return
      }
      
      this.loading = true
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      
      try {
        // 使用正确的API获取订单详情
        const res = await orderApi.getOrderById(this.orderId)
        
        if (res) {
          console.log('订单详情:', res)
          
          // 设置订单数据
          this.orderNo = res.deliveryId || this.orderNo
          this.expressCode = res.expressCode || ''
          this.expressName = this.getExpressName(res.expressCode)
          this.expressLogo = this.getExpressLogo(res.expressCode)
          
          // 收发人信息
          this.fromName = res.senderName || ''
          this.fromAddress = `${res.senderProvince || ''}${res.senderCity || ''}${res.senderDistrict || ''}${res.senderDetailAddress || ''}`
          
          this.toName = res.receiverName || ''
          this.toAddress = `${res.receiverProvince || ''}${res.receiverCity || ''}${res.receiverDistrict || ''}${res.receiverDetailAddress || ''}`
          
          // 状态
          this.status = res.shippingStatus !== undefined ? res.shippingStatus : 0
          this.statusText = this.getStatusText(this.status)
          
          // 获取物流轨迹数据
          await this.getLogisticsData()
        } else {
          uni.showToast({
            title: '获取订单详情失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取订单详情异常:', e)
        uni.showToast({
          title: '获取订单详情异常',
          icon: 'none'
        })
      } finally {
        this.loading = false
        uni.hideLoading()
      }
    },
    
    // 获取物流轨迹数据
    async getLogisticsData() {
      if (this.refreshing) {
        uni.showLoading({
          title: '刷新中...',
          mask: true
        })
      }
      
      try {
        // 构建请求参数
        const params = {
          businessParams: {
            deliveryId: this.orderNo,
            deliveryType: this.expressCode
          }
        }
        // const params = {
        //   businessParams: {
        //     deliveryId: '772039544760800',
        //     deliveryType: 'STO-INT'
        //   }
        // }
        // 调用物流轨迹API
        const res = await expressApi.deliveryTrace(params)
        // console.log(res)
        if (res) {
          // 处理返回的物流轨迹数据
          this.trackList = res.map(item => {
            const date = new Date(item.time)
            return {
              time: item.time,
              timeStr: this.formatTime(date),
              dateStr: this.formatDate(date),
              content: item.desc,
              location: this.extractLocation(item.desc)
            }
          })
        } else {
          // 如果没有物流轨迹数据，显示默认提示
          this.trackList = [{
            time: this.formatDateTime(new Date()),
            timeStr: this.formatTime(new Date()),
            dateStr: this.formatDate(new Date()),
            content: '暂无物流信息',
            location: ''
          }]
        }
      } catch (error) {
        console.error('获取物流轨迹数据失败:', error)
        uni.showToast({
          title: '获取物流信息失败',
          icon: 'none'
        })
        // 发生错误时显示默认提示
        this.trackList = [{
          time: this.formatDateTime(new Date()),
          timeStr: this.formatTime(new Date()),
          dateStr: this.formatDate(new Date()),
          content: '获取物流信息失败',
          location: ''
        }]
      } finally {
        if (this.refreshing) {
          uni.hideLoading()
          uni.showToast({
            title: '已刷新',
            icon: 'success'
          })
          this.refreshing = false
        }
      }
    },
    
    // 从物流描述中提取位置信息
    extractLocation(desc) {
      // 使用正则表达式匹配【】中的内容
      const locationMatch = desc.match(/【(.*?)】/)
      if (locationMatch) {
        return locationMatch[1]
      }
      
      // 如果没有【】格式，尝试匹配"已到达"或"已发往"后面的位置
      const locationMatch2 = desc.match(/(?:已到达|已发往)\s*(.*?)(?:\s|$)/)
      if (locationMatch2) {
        return locationMatch2[1]
      }
      
      return ''
    },
    
    // 刷新物流信息
    refreshLogistics() {
      this.refreshing = true
      this.getLogisticsData()
    },
    
    // 复制运单号
    copyTrackingNo() {
      if (!this.orderNo) {
        uni.showToast({
          title: '无效的运单号',
          icon: 'none'
        })
        return
      }
      
      uni.setClipboardData({
        data: this.orderNo,
        success: () => {
          uni.showToast({
            title: '运单号已复制',
            icon: 'success'
          })
        }
      })
    },
    
    // 获取状态文本
    getStatusText(status) {
      switch (Number(status)) {
        case 0: return '待取件'
        case 1: return '已取件'
        case 2: return '运输中'
        case 3: return '已签收'
        case 6: return '异常'
        case 10: return '已取消'
        default: return '未知状态'
      }
    },
    
    // 获取快递公司Logo
    getExpressLogo(code) {
      const expressMap = {
        'SF': { name: '顺丰速运', icon: '顺丰' },
        'ZTO': { name: '中通快递', icon: '中通' },
        'YTO': { name: '圆通速递', icon: '圆通' },
        'YUND': { name: '韵达快递', icon: '韵达' },
        'BEST': { name: '百世快递', icon: '百世' },
        'STO-INT': { name: '申通快递', icon: '申通' },
        'JD': { name: '京东快递', icon: '京东' },
        'DOP': { name: '德邦快递', icon: '德邦' },
        'JT': { name: '极兔速递', icon: '极兔' },
        'KY': { name: '跨越速运', icon: '跨越' },
        'CAINIAO': { name: '菜鸟裹裹', icon: '菜鸟裹裹' },
        'CNSD': { name: '菜鸟速递', icon: '菜鸟速递' },
        'SXJD': { name: '顺心捷达', icon: '顺心捷达' },
        'YMDD': { name: '壹米滴答', icon: '壹米滴答' }
      }
      
      const defaultIcon = '/static/icon/default.png'
      return code ? `/static/icon/${expressMap[code]?.icon || 'default'}.png` : defaultIcon
    },
    
    // 获取快递公司名称
    getExpressName(code) {
      const expressMap = {
        'SF': { name: '顺丰速运', icon: '顺丰' },
        'ZTO': { name: '中通快递', icon: '中通' },
        'YTO': { name: '圆通速递', icon: '圆通' },
        'YUND': { name: '韵达快递', icon: '韵达' },
        'BEST': { name: '百世快递', icon: '百世' },
        'STO-INT': { name: '申通快递', icon: '申通' },
        'JD': { name: '京东快递', icon: '京东' },
        'DOP': { name: '德邦快递', icon: '德邦' },
        'JT': { name: '极兔速递', icon: '极兔' },
        'KY': { name: '跨越速运', icon: '跨越' },
        'CAINIAO': { name: '菜鸟裹裹', icon: '菜鸟裹裹' },
        'CNSD': { name: '菜鸟速递', icon: '菜鸟速递' },
        'SXJD': { name: '顺心捷达', icon: '顺心捷达' },
        'YMDD': { name: '壹米滴答', icon: '壹米滴答' }
      }
      
      return code ? (expressMap[code]?.name || '未知快递') : '未知快递'
    },
    
    // 格式化日期时间
    formatDateTime(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },
    
    // 格式化时间
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      
      return `${hours}:${minutes}`
    },
    
    // 格式化日期
    formatDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      
      return `${month}-${day}`
    }
  }
}
</script>

<style lang="scss">
.logistics-container {
  min-height: 100vh;
  padding: 30rpx;
  background: linear-gradient(135deg, #FFF6F0 0%, #FFF 40%);
  
  // 加载中动画
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
  
  // 顶部装饰元素
  .top-decoration {
    display: flex;
    justify-content: center;
    margin-bottom: 20rpx;
    
    .decoration-dot {
      width: 12rpx;
      height: 12rpx;
      background: #FF6B01;
      border-radius: 50%;
      margin: 0 8rpx;
      opacity: 0.6;
      
      &:nth-child(1) { opacity: 0.2; }
      &:nth-child(2) { opacity: 0.4; }
      &:nth-child(3) { opacity: 0.6; }
      &:nth-child(4) { opacity: 0.4; }
      &:nth-child(5) { opacity: 0.2; }
    }
  }
  
  // 物流信息卡片
  .logistics-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 36rpx 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
    margin-bottom: 30rpx;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8rpx;
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
    }
    
    // 快递信息头部
    .express-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 36rpx;
      
      .express-info {
        display: flex;
        align-items: center;
        
        .logo-container {
          width: 70rpx;
          height: 70rpx;
          background: #f8f8f8;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;
          box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.04);
          
          image {
            width: 50rpx;
            height: 50rpx;
          }
        }
        
        .name-no {
          display: flex;
          flex-direction: column;
          
          .name {
            font-size: 34rpx;
            font-weight: 600;
            color: #333;
            margin-bottom: 8rpx;
          }
          
          .no {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
      
      .status-badge {
        font-size: 26rpx;
        font-weight: 500;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
        
        &.status-0 {
          background: rgba(255, 143, 31, 0.1);
          color: #FF8F1F;
        }
        
        &.status-1 {
          background: rgba(255, 107, 1, 0.1);
          color: #FF6B01;
        }
        
        &.status-2 {
          background: rgba(41, 121, 255, 0.1);
          color: #2979FF;
        }
        
        &.status-3 {
          background: rgba(25, 190, 107, 0.1);
          color: #19BE6B;
        }
      }
    }
    
    // 地址信息
    .address-info {
      .address-flow {
        position: relative;
        
        .from, .to {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20rpx;
          position: relative;
          z-index: 2;
          
          .label-box {
            width: 50rpx;
            height: 50rpx;
            line-height: 50rpx;
            text-align: center;
            background: #fff;
            box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
            border-radius: 10rpx;
            font-size: 26rpx;
            color: #FF6B01;
            font-weight: 600;
            margin-right: 20rpx;
            position: relative;
            overflow: hidden;
          }
          
          .info {
            flex: 1;
            
            .name {
              font-size: 30rpx;
              color: #333;
              font-weight: 500;
              margin-bottom: 8rpx;
            }
            
            .address {
              font-size: 26rpx;
              color: #666;
              line-height: 1.5;
            }
          }
        }
        
        .flow-line {
          position: absolute;
          top: 25rpx;
          left: 25rpx;
          height: calc(100% - 50rpx);
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .dot {
            width: 14rpx;
            height: 14rpx;
            border-radius: 50%;
            
            &.start {
              background: #FF6B01;
            }
            
            &.end {
              background: #19BE6B;
            }
          }
          
          .line {
            width: 2rpx;
            height: 100%;
            background: #f0f0f0;
            margin: 4rpx 0;
            position: relative;
            overflow: hidden;
            
            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 40%;
              background: linear-gradient(to bottom, #FF6B01, rgba(255, 107, 1, 0.2));
            }
          }
        }
      }
    }
  }
  
  // 物流轨迹
  .logistics-track {
    background: #fff;
    border-radius: 20rpx;
    padding: 36rpx 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
    margin-bottom: 30rpx;
    
    .track-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 36rpx;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 20rpx;
      
      .title-with-icon {
        display: flex;
        align-items: center;
        
        uni-icons {
          margin-right: 10rpx;
        }
        
        text {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }
      }
      
      .update-time {
        font-size: 24rpx;
        color: #999;
        font-weight: normal;
      }
    }
    
    .track-list {
      .track-item {
        display: flex;
        margin-bottom: 30rpx;
        animation: fadeIn 0.8s ease-out both;
        
        &.track-active {
          .time-column {
            .time, .date {
              color: #FF6B01;
              font-weight: 600;
            }
          }
          
          .content-column {
            .content {
              color: #333;
              font-weight: 600;
            }
          }
        }
        
        .time-column {
          width: 120rpx;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 20rpx;
          
          .time {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 8rpx;
          }
          
          .date {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .node-column {
          width: 60rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .node-dot {
            width: 16rpx;
            height: 16rpx;
            border-radius: 50%;
            background: #ddd;
            margin-top: 12rpx;
            position: relative;
            
            &.active-dot {
              background: #FF6B01;
              box-shadow: 0 0 0 6rpx rgba(255, 107, 1, 0.15);
              
              .inner-dot {
                width: 6rpx;
                height: 6rpx;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              
              .pulse-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 16rpx;
                height: 16rpx;
                border: 1px solid #FF6B01;
                border-radius: 50%;
                animation: pulse 2s infinite;
              }
            }
          }
          
          .node-line {
            width: 2rpx;
            height: 80rpx;
            background: #f0f0f0;
            margin-top: 4rpx;
          }
        }
        
        .content-column {
          flex: 1;
          padding-left: 20rpx;
          
          .content {
            font-size: 28rpx;
            color: #333;
            line-height: 1.5;
            margin-bottom: 8rpx;
          }
          
          .location-info {
            display: flex;
            align-items: center;
            
            uni-icons {
              margin-right: 4rpx;
            }
            
            .location {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
      }
      
      .empty-track {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60rpx 0;
        
        image {
          width: 200rpx;
          height: 200rpx;
          margin-bottom: 20rpx;
          opacity: 0.7;
        }
        
        text {
          font-size: 28rpx;
          color: #999;
        }
      }
    }
  }
  
  // 底部按钮
  .footer-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 60rpx;
    margin-bottom: 40rpx;
    
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90rpx;
      border-radius: 45rpx;
      font-size: 28rpx;
      font-weight: 500;
      flex: 1;
      
      &:after {
        border: none;
      }
      
      uni-icons {
        margin-right: 8rpx;
      }
    }
    
    .copy-btn {
      margin-right: 20rpx;
      background: rgba(0,0,0,0.04);
      color: #666;
    }
    
    .refresh-btn {
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
      color: #fff;
      box-shadow: 0 8rpx 16rpx rgba(255,107,1,0.2);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

// 添加加载动画
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 
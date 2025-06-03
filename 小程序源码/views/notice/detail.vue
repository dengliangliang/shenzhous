<template>
  <view class="notice-detail-container">
    <!-- 公告头部 -->
    <view class="notice-header">
      <view class="notice-title">{{ noticeDetail.title || '公告详情' }}</view>
      <view class="notice-meta">
        <view class="notice-type" :class="'type-' + noticeDetail.type">
          {{ getNoticeTypeText(noticeDetail.type) }}
        </view>
        <view class="notice-time">
          <uni-icons type="calendar" size="14" color="#999"></uni-icons>
          <text>{{ formatDate(noticeDetail.createTime) }}</text>
        </view>
      </view>
    </view>
    
    <!-- 公告内容 -->
    <view class="notice-content">
      <view v-if="loading" class="loading-content">
        <uni-icons type="spinner-cycle" size="30" color="#FF6B01"></uni-icons>
        <text>加载中...</text>
      </view>
      
      <view v-else-if="!noticeDetail.content" class="empty-content">
        <uni-icons type="info" size="30" color="#999"></uni-icons>
        <text>暂无公告内容</text>
      </view>
      
      <rich-text v-else class="rich-content" :nodes="noticeDetail.content"></rich-text>
    </view>
    
    <!-- 底部操作区 -->
    <view class="notice-footer">
      <button class="back-btn" @tap="goBack">
        <uni-icons type="back" size="16" color="#FFFFFF"></uni-icons>
        <text>返回列表</text>
      </button>
    </view>
  </view>
</template>

<script>
import noticeApi from '@/api/notice'

export default {
  data() {
    return {
      noticeId: '',
      noticeDetail: {},
      loading: true
    }
  },
  
  onLoad(options) {
    if (options.id) {
      this.noticeId = options.id
      this.getNoticeDetail()
    } else {
      this.loading = false
      uni.showToast({
        title: '缺少公告ID',
        icon: 'none'
      })
    }
  },
  
  methods: {
    // 获取公告详情
    async getNoticeDetail() {
      try {
        this.loading = true
        
        // 使用列表接口，过滤出ID匹配的公告
        // 实际项目中应该有专门的获取单个公告详情的接口
        const res = await noticeApi.getNoticeList()
        
        if (res && Array.isArray(res)) {
          const notice = res.find(item => item.noticeId === this.noticeId)
          if (notice) {
            this.noticeDetail = notice
          } else {
            uni.showToast({
              title: '公告不存在或已删除',
              icon: 'none'
            })
          }
        } else {
          uni.showToast({
            title: '获取公告详情失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取公告详情失败', e)
        uni.showToast({
          title: '获取公告详情失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 获取公告类型文本
    getNoticeTypeText(type) {
      switch (Number(type)) {
        case 0:
          return '更新公告'
        case 1:
          return '新增公告'
        case 2:
          return '通知公告'
        case 3:
          return '维护公告'
        default:
          return '公告'
      }
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return ''
      
      // 处理日期字符串
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        // 如果日期无效，尝试其他格式
        return dateStr
      }
      
      // 格式化为：2023-01-01 12:30:45
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss">
.notice-detail-container {
  min-height: 100vh;
  background: #F5F7FA;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  
  .notice-header {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    
    .notice-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
      line-height: 1.5;
      margin-bottom: 20rpx;
      text-align: center;
    }
    
    .notice-meta {
      display: flex;
      justify-content: center;
      align-items: center;
      
      .notice-type {
        padding: 6rpx 16rpx;
        border-radius: 20rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        margin-right: 20rpx;
        
        &.type-0 {
          background: linear-gradient(135deg, #FF6B01, #FF8F1F);
        }
        
        &.type-1 {
          background: linear-gradient(135deg, #1890FF, #0050B3);
        }
        
        &.type-2 {
          background: linear-gradient(135deg, #722ED1, #531DAB);
        }
        
        &.type-3 {
          background: linear-gradient(135deg, #13C2C2, #006D75);
        }
      }
      
      .notice-time {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #999;
        
        .uni-icons {
          margin-right: 6rpx;
        }
      }
    }
  }
  
  .notice-content {
    flex: 1;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;
    
    .loading-content, .empty-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100rpx 0;
      
      .uni-icons {
        margin-bottom: 20rpx;
      }
      
      text {
        font-size: 28rpx;
        color: #999;
      }
    }
    
    .rich-content {
      font-size: 30rpx;
      color: #333;
      line-height: 1.8;
    }
  }
  
  .notice-footer {
    padding: 20rpx 0;
    margin-top: auto;
    
    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      background: linear-gradient(90deg, #FF8F1F, #FF6B01);
      border-radius: 44rpx;
      color: #FFFFFF;
      font-size: 30rpx;
      font-weight: 500;
      box-shadow: 0 8rpx 16rpx rgba(255, 107, 1, 0.2);
      
      .uni-icons {
        margin-right: 10rpx;
      }
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 4rpx 8rpx rgba(255, 107, 1, 0.2);
      }
    }
  }
}
</style> 
<template>
  <view class="notice-list-container">
    <!-- 顶部类型筛选 -->
    <view class="filter-bar">
      <view 
        class="filter-item" 
        v-for="(item, index) in typeFilters" 
        :key="index"
        :class="{ active: currentType === item.value }"
        @tap="switchType(item.value)"
      >
        <text>{{ item.label }}</text>
      </view>
    </view>
    
    <!-- 公告列表 -->
    <scroll-view 
      class="notice-list" 
      scroll-y 
      @scrolltolower="loadMore" 
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
      :style="{ height: scrollHeight + 'px' }"
    >
      <!-- 公告为空 -->
      <view v-if="noticeList.length === 0 && !loading" class="empty-notice">
        <image src="/static/img/empty-notice.png" mode="aspectFit" class="empty-img"></image>
        <text class="empty-text">暂无公告信息</text>
      </view>
      
      <!-- 公告列表内容 -->
      <view v-else class="list-content">
        <view 
          class="notice-item animate__animated animate__fadeIn"
          :style="{ animationDelay: index * 0.05 + 's' }"
          v-for="(item, index) in noticeList" 
          :key="item.noticeId"
          @tap="viewDetail(item)"
        >
          <view class="notice-header">
            <view class="notice-type" :class="'type-' + item.type">{{ getNoticeTypeText(item.type) }}</view>
            <text class="notice-time">{{ formatDate(item.createTime) }}</text>
          </view>
          <view class="notice-title">{{ item.title }}</view>
          <view class="notice-brief">{{ getBriefContent(item.content) }}</view>
        </view>
        
        <!-- 加载更多 -->
        <view class="load-more" v-if="noticeList.length > 0">
          <text v-if="loading">加载中...</text>
          <text v-else-if="!hasMore">没有更多了</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import noticeApi from '@/api/notice'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      noticeList: [],
      loading: false,
      refreshing: false,
      currentType: '', // null表示全部
      scrollHeight: 0,
      typeFilters: [
        { label: '全部', value: '' },
        { label: '更新公告', value: 0 },
        { label: '新增公告', value: 1 },
        { label: '通知公告', value: 2 },
        { label: '维护公告', value: 3 }
      ]
    }
  },
  
  computed: {
    hasMore() {
      return this.noticeList.length < this.total
    }
  },
  
  onLoad(options) {
    // 如果传入了type，就设置当前类型
    if (options.type !== undefined) {
      this.currentType = Number(options.type)
    }
    
    // 计算滚动区域高度
    this.calculateScrollHeight()
    
    // 加载公告列表
    this.loadNoticeList()
  },
  
  methods: {
    // 计算滚动区域高度
    calculateScrollHeight() {
      const info = uni.getSystemInfoSync()
      // 屏幕高度 - 顶部类型筛选栏高度 - 状态栏高度 - 底部安全区域
      this.scrollHeight = info.windowHeight - 50 - info.statusBarHeight - 20
    },
    
    // 刷新列表
    async refreshList() {
      this.pageNum = 1
      this.noticeList = []
      await this.loadNoticeList()
      if (this.refreshing) {
        this.refreshing = false
        uni.stopPullDownRefresh()
      }
    },
    
    // 加载更多
    async loadMore() {
      if (this.loading || !this.hasMore) return
      this.pageNum++
      await this.loadNoticeList()
    },
    
    // 下拉刷新
    async onRefresh() {
      this.refreshing = true
      await this.refreshList()
    },
    
    // 切换类型
    switchType(type) {
      if (this.currentType === type) return
      this.currentType = type
      this.refreshList()
    },
    
    // 加载公告列表
    async loadNoticeList() {
      try {
        this.loading = true
        const res = await noticeApi.pageNotice(this.pageNum, this.pageSize, this.currentType)
        
        if (res) {
          if (this.pageNum === 1) {
            this.noticeList = res.dataList || []
          } else {
            this.noticeList = [...this.noticeList, ...(res.dataList || [])]
          }
          this.total = res.totalItems || 0
        } else {
          this.noticeList = []
          this.total = 0
          uni.showToast({
            title: '获取公告列表失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取公告列表失败', e)
        uni.showToast({
          title: '获取公告列表失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 查看详情
    viewDetail(notice) {
      uni.navigateTo({
        url: `/views/notice/detail?id=${notice.noticeId}`
      })
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
    
    // 获取简短内容
    getBriefContent(content) {
      if (!content) return '暂无内容'
      // 去除HTML标签，提取纯文本
      const plainText = content.replace(/<[^>]+>/g, '')
      // 截取前50个字符
      return plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText
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
      
      const now = new Date()
      const diff = now - date
      
      // 今天的日期
      if (diff < 24 * 60 * 60 * 1000 && 
          date.getDate() === now.getDate() && 
          date.getMonth() === now.getMonth() && 
          date.getFullYear() === now.getFullYear()) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `今天 ${hours}:${minutes}`
      }
      
      // 昨天的日期
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.getDate() === yesterday.getDate() && 
          date.getMonth() === yesterday.getMonth() && 
          date.getFullYear() === yesterday.getFullYear()) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `昨天 ${hours}:${minutes}`
      }
      
      // 一周内
      if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${days[date.getDay()]} ${hours}:${minutes}`
      }
      
      // 其他日期显示年月日
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss">
.notice-list-container {
  min-height: 100vh;
  background: #F5F7FA;
  
  .filter-bar {
    display: flex;
    justify-content: space-around;
    background: #FFFFFF;
    padding: 20rpx 0;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 10;
    
    .filter-item {
      padding: 10rpx 20rpx;
      font-size: 28rpx;
      color: #666;
      position: relative;
      transition: all 0.3s;
      
      &.active {
        color: #FF6B01;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -6rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 30rpx;
          height: 4rpx;
          background: #FF6B01;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .notice-list {
    padding: 20rpx;
  }
  
  .empty-notice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 200rpx;
    
    .empty-img {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 30rpx;
    }
    
    .empty-text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .list-content {
    .notice-item {
      margin-bottom: 20rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
      padding: 30rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
      
      .notice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        
        .notice-type {
          padding: 6rpx 16rpx;
          border-radius: 20rpx;
          font-size: 24rpx;
          color: #fff;
          
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
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .notice-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 16rpx;
      }
      
      .notice-brief {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;
      }
    }
    
    .load-more {
      text-align: center;
      padding: 30rpx 0;
      
      text {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style>
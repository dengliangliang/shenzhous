<template>
  <view class="users-container">
    <!-- 顶部统计 -->
    <view class="statistics-card animate__animated animate__fadeIn">
      <view class="stat-item">
        <text class="number">{{ userList.filter(u => u.isMonth === 1).length }}</text>
        <text class="label">使用中</text>
      </view>
      <view class="divider"></view>
      <view class="stat-item">
        <text class="number">{{ userList.length }}</text>
        <text class="label">总用户</text>
      </view>
    </view>

    <!-- 用户列表 -->
    <scroll-view class="user-list" scroll-y refresher-enabled :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh">
      <view class="list-header">
        <text class="title">用户列表</text>
        <text class="subtitle">共 {{ userList.length }} 人</text>
      </view>

      <view class="user-item animate__animated animate__fadeIn" v-for="(item, index) in userList" :key="item.userId"
        :style="{ animationDelay: index * 0.1 + 's' }">

        <view class="user-info">
          <view class="avatar" :style="{ backgroundColor: getRandomColor(item.name) }">
            <text class="avatar-text">{{ item.name ? item.name.substr(0, 1) : 'U' }}</text>
          </view>
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="phone">{{ formatPhone(item.phone) }}</text>
          </view>
        </view>

        <view class="right-section">
          <text class="join-time">加入时间：{{ formatDate(item.createTime) }}</text>
          <view class="status-tag" :class="{ active: item.isMonth === 1 }">
            {{ item.isMonth === 1 ? '使用中' : '已失效' }}
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="userList.length === 0 && !loading" class="empty-state animate__animated animate__fadeIn">
        <image src="/static/img/empty-users.png" mode="aspectFit" class="empty-image"></image>
        <text class="empty-text">暂无使用用户</text>
        <text class="empty-tips">用户使用您的月结资格后将显示在这里</text>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus" v-if="userList.length > 0"></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
import monthlyApi from '@/api/monthly'

export default {
  data() {
    return {
      userList: [],
      loading: true,
      refreshing: false,
      eligibilityId: '',
      colorCache: {}, // 缓存用户名对应的随机颜色
      page: 1,
      pageSize: 10,
      hasMore: true
    }
  },

  computed: {
    // 加载更多状态
    loadMoreStatus() {
      if (this.loading) return 'loading'
      if (this.hasMore) return 'more'
      return 'noMore'
    }
  },

  onLoad(options) {
     console.log('页面加载参数:', options) // 调试参数
     if (options.id) {
       this.eligibilityId = options.id
       this.loadUsers()
     } else {
       console.error('缺少必要的 id 参数')
       uni.showToast({
         title: '参数错误',
         icon: 'none'
       })
     }
   },


  // 触底加载更多
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.page++
      this.loadUsers()
    }
  },

  methods: {
    // 加载用户列表
    async loadUsers() {
         if (!this.eligibilityId) {
           console.error('缺少 eligibilityId')
           return
         }
   
         try {
           this.loading = true
           if (!this.refreshing) {
             uni.showLoading({
               title: '加载中...'
             })
           }
   
           console.log('开始请求数据，eligibilityId:', this.eligibilityId) // 调试请求
           const res = await monthlyApi.getUser(this.eligibilityId)
           console.log('请求返回数据:', res) // 调试响应
   
           // 处理返回的数据
           let list = []
           if (res && res.data) {
             // 如果返回数据在 data 字段中
             list = Array.isArray(res.data) ? res.data : []
           } else {
             // 如果直接返回数组
             list = Array.isArray(res) ? res : []
           }
   
           // 如果是刷新或第一页，重置列表
           if (this.refreshing || this.page === 1) {
             this.userList = list
           } else {
             this.userList = [...this.userList, ...list]
           }
   
           // 判断是否还有更多数据
           this.hasMore = list.length >= this.pageSize
   
         } catch (e) {
           console.error('加载用户列表失败:', e) // 调试错误
           uni.showToast({
             title: '加载失败，请重试',
             icon: 'none'
           })
         } finally {
           uni.hideLoading()
           this.loading = false
           if (this.refreshing) {
             this.refreshing = false
             // 重置页码
             this.page = 1
           }
         }
       },
   
       // 刷新列表
       async onRefresh() {
         console.log('触发刷新') // 调试刷新
         this.refreshing = true
         this.page = 1
         this.hasMore = true
         await this.loadUsers()
       },

    // 格式化手机号
    formatPhone(phone) {
      if (!phone) return ''
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },

    // 格式化日期
    formatDate(date) {
      if (!date) return ''
      return date.split(' ')[0] // 只显示日期部分
    },

    // 根据用户名生成随机颜色
    getRandomColor(name) {
      if (!name) return 'rgba(255, 107, 1, 0.1)'
      if (this.colorCache[name]) return this.colorCache[name]

      const colors = [
        'rgba(255, 107, 1, 0.1)',
        'rgba(64, 169, 255, 0.1)',
        'rgba(82, 196, 26, 0.1)',
        'rgba(250, 173, 20, 0.1)',
        'rgba(247, 151, 185, 0.1)',
        'rgba(114, 46, 209, 0.1)'
      ]
      const textColors = [
        '#FF6B01',
        '#40A9FF',
        '#52C41A',
        '#FAAD14',
        '#F797B9',
        '#722ED1'
      ]
      const index = Math.floor(Math.random() * colors.length)
      this.colorCache[name] = {
        background: colors[index],
        text: textColors[index]
      }
      return this.colorCache[name].background
    },

    // 获取文字颜色
    getTextColor(name) {
      if (!name || !this.colorCache[name]) return '#FF6B01'
      return this.colorCache[name].text
    }
  }
}
</script>

<style lang="scss" scoped>
.users-container {
  min-height: 100vh;
  background-color: #F5F6FA;
  padding: 20rpx 0;

  .statistics-card {
    margin: 0 30rpx 20rpx;
    background: linear-gradient(135deg, #FF6B01, #FF9C01);
    border-radius: 16rpx;
    padding: 40rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 4rpx 20rpx rgba(255, 107, 1, 0.2);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .number {
        font-size: 48rpx;
        color: #FFFFFF;
        font-weight: 600;
        margin-bottom: 8rpx;
      }

      .label {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .divider {
      width: 2rpx;
      height: 60rpx;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .user-list {
    height: calc(100vh - 200rpx);

    .list-header {
      padding: 20rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 32rpx;
        color: #333333;
        font-weight: 600;
      }

      .subtitle {
        font-size: 26rpx;
        color: #999999;
      }
    }

    .user-item {
      margin: 0 30rpx 20rpx;
      background-color: #FFFFFF;
      border-radius: 16rpx;
      padding: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      }

      .user-info {
        display: flex;
        align-items: center;
        flex: 1;

        .avatar {
          width: 88rpx;
          height: 88rpx;
          border-radius: 44rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 24rpx;
          transition: all 0.3s ease;

          .avatar-text {
            font-size: 36rpx;
            font-weight: 600;
          }
        }

        .info {
          flex: 1;

          .name {
            font-size: 32rpx;
            color: #333333;
            font-weight: 500;
            margin-bottom: 8rpx;
            display: block;
          }

          .phone {
            font-size: 26rpx;
            color: #999999;
          }
        }
      }

      .right-section {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .join-time {
          font-size: 24rpx;
          color: #999999;
          margin-bottom: 8rpx;
        }

        .status-tag {
          font-size: 24rpx;
          padding: 6rpx 20rpx;
          border-radius: 24rpx;
          background-color: rgba(153, 153, 153, 0.1);
          color: #999999;
          transition: all 0.3s ease;

          &.active {
            background-color: rgba(82, 196, 26, 0.1);
            color: #52C41A;
            font-weight: 500;
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
    padding: 120rpx 0;

    .empty-image {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 30rpx;
    }

    .empty-text {
      font-size: 32rpx;
      color: #333333;
      font-weight: 500;
      margin-bottom: 12rpx;
    }

    .empty-tips {
      font-size: 26rpx;
      color: #999999;
    }
  }
}

// 添加动画类
.animate__fadeIn {
  animation: fadeIn 0.3s ease-in-out;
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
</style>
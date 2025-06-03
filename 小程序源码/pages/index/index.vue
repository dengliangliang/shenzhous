<template>
  <view class="container">
    <!-- 顶部Logo区域 -->
    <view class="header">
      <view class="header-content">
        <image class="logo animate__animated animate__slideInLeft" 
               src="/static/img/系统左侧长LOGO.png" 
               mode="aspectFit">
        </image>
      </view>
    </view>

    <!-- 顶部搜索栏 -->
    <view class="search-bar animate__animated animate__fadeInDown">
      <view class="search-box" @tap="navToOrder(searchText)">
        <uni-icons type="search" size="18" color="#FF6B01"></uni-icons>
        <input 
          type="text" 
          v-model="searchText"
          placeholder="请输入快递单号" 
          placeholder-class="placeholder"
          confirm-type="search"
          @confirm="navToOrder(searchText)"
        />
        <view class="search-action" v-if="searchText">
          <view class="clear-icon" @tap.stop="searchText = ''">
            <uni-icons type="clear" size="16" color="#999999"></uni-icons>
          </view>
          <view class="divider"></view>
          <view class="search-btn" @tap.stop="navToOrder(searchText)">搜索</view>
        </view>
      </view>
    </view>
    
    <!-- 公告栏 -->
    <view class="notice-area animate__animated animate__fadeInUp" style="animation-delay: 0.15s">
      <view class="notice-header">
        <view class="header-left">
          <uni-icons type="notification-filled" size="20" color="#FF6B01"></uni-icons>
          <text class="notice-title">系统公告</text>
        </view>
        <view class="header-right" @tap="viewMoreNotices">
          <text class="more-text">更多</text>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
      
      <view class="notice-content">
        <swiper 
          class="notice-swiper" 
          vertical 
          circular 
          autoplay 
          interval="3000" 
          duration="500"
          :disable-touch="false">
          <swiper-item v-for="(item, index) in notices" :key="index" @tap="viewNoticeDetail(item)">
            <view class="notice-item">
              <view class="notice-item-content">
                <view class="notice-type-tag" :class="'type-' + item.type">{{ getNoticeTypeText(item.type) }}</view>
                <text class="notice-text">{{ item.title }}</text>
              </view>
              <text class="notice-date">{{ formatDate(item.createTime) }}</text>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <!-- 顶部功能区 -->
    <view class="function-area">
      <view class="section-title animate__animated animate__fadeInLeft">
        <text class="main">快递服务</text>
        <text class="sub">Express Service</text>
      </view>
      <view class="grid">
        <view class="grid-item animate__animated animate__fadeInUp" 
              style="animation-delay: 0.1s"
              @tap="navTo('/views/express/send')">
          <view class="icon-box">
            <image src="/static/icon/cargo.png" mode="aspectFit"></image>
          </view>
          <text class="label">个人寄件</text>
          <text class="desc">快速寄件</text>
        </view>
        <view class="grid-item animate__animated animate__fadeInUp" 
              style="animation-delay: 0.2s"
              @tap="navTo('/views/express/batch')">
          <view class="icon-box">
            <image src="/static/icon/batch.png" mode="aspectFit"></image>
          </view>
          <text class="label">商家寄件</text>
          <text class="desc">企业批量</text>
        </view>
        <view class="grid-item animate__animated animate__fadeInUp" 
              style="animation-delay: 0.3s"
              @tap="navTo('/views/express/cargo')">
          <view class="icon-box">
            <image src="/static/icon/express.png" mode="aspectFit"></image>
          </view>
          <text class="label">大件运输</text>
          <text class="desc">大件托运</text>
        </view>
      </view>
    </view>

    <!-- 轮播图 -->
    <view v-if="banners.length>0" class="swiper-area animate__animated animate__fadeInUp" style="animation-delay: 0.3s">
       <swiper 
         class="swiper" 
         circular 
         autoplay 
         interval="3000" 
         duration="500"
         :indicator-dots="true"
         indicator-active-color="#FF6B01"
         indicator-color="rgba(255,107,1,0.3)"
       >
         <swiper-item v-for="(item, index) in banners" :key="index" @tap="handleBannerClick(item)">
           <image v-if="item.backgroundPhotoUrl" :src="photoBaseUrl+item.backgroundPhotoUrl" mode="aspectFill"></image>
         </swiper-item>
       </swiper>
    </view>

    <!-- 合作快递公司 -->
    <view class="partner-area animate__animated animate__fadeInUp" style="animation-delay: 0.4s">
      <view class="section-title">
        <text class="main">合作快递</text>
        <text class="sub">Express Partners</text>
      </view>
      <scroll-view 
        class="partner-scroll" 
        scroll-x 
        :show-scrollbar="false"
        :enhanced="true"
        :bounces="false"
      >
        <view class="partner-list">
          <view 
            class="partner-item" 
            v-for="(item, index) in scrollPartners" 
            :key="index"
          >
            <image :src="item.logo" mode="aspectFit"></image>
            <text>{{item.name}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import noticeApi from '@/api/notice'
import bannerApi from '@/api/banner'
import{photoBaseUrl} from '@/config/env'
export default {
  data() {
    return {
      partners: [
        {
          name: '顺丰速运',
          logo: '/static/icon/顺丰.png'
        },
        {
          name: '中通快递',
          logo: '/static/icon/中通.png'
        },
        {
          name: '圆通速递',
          logo: '/static/icon/圆通.png'
        },
        {
          name: '韵达快递',
          logo: '/static/icon/韵达.png'
        },
        {
          name: '百世快递',
          logo: '/static/icon/百世.png'
        },
        {
          name: '申通快递',
          logo: '/static/icon/申通.png'
        },
        {
          name: '京东快递',
          logo: '/static/icon/京东.png'
        },
        {
          name: '德邦快递',
          logo: '/static/icon/德邦.png'
        },
        {
          name: '极兔速递',
          logo: '/static/icon/极兔.png'
        },
        {
          name: '跨越速运',
          logo: '/static/icon/跨越.png'
        },
        {
          name: '邮政快递',
          logo: '/static/icon/邮政.png'
        },
        {
          name: '菜鸟裹裹',
          logo: '/static/icon/菜鸟裹裹.png'
        },
        {
          name: '顺心捷达',
          logo: '/static/icon/顺心捷达.png'
        },
        {
          name: '壹米滴答',
          logo: '/static/icon/壹米滴答.png'
        }
      ],
      // 添加轮播图数据
      banners: [],
      // 公告数据
      notices: [],
      // 是否正在加载公告
      loadingNotices: false,
	  photoBaseUrl: '',
      searchText: '', // 添加搜索文本变量
    }
  },
  computed: {
    // 复制一份数据用于无缝滚动
    scrollPartners() {
      return [...this.partners, ...this.partners]
    }
  },
  onShow() {
    // 加载最新公告
    this.loadNotices()
	this.getBanner()
	this.photoBaseUrl = photoBaseUrl;
  },
  methods: {
    navTo(url) {
	if (!this.checkLoginWithTip()) return
      uni.navigateTo({ url })
    },

    getBanner(){
		bannerApi.getList().then(res=>{
			if(res){
				this.banners = res
			}
			
		})
	},
	// 检查登录并提示
	checkLoginWithTip() {
	  const userInfo = this.$store.getters['user/getUserInfo']
	  if (!userInfo || !userInfo.userId) {
	    uni.showToast({
	      title: '请先登录',
	      icon: 'none'
	    })
	    return false
	  }
	  return true
	},
    // 加载最新公告
    async loadNotices() {
      if (this.loadingNotices) return
      
      this.loadingNotices = true
      try {
        const result = await noticeApi.getLatestNotices()
        if (result && result.length > 0) {
          this.notices = result
        } else {
          // 如果没有获取到公告，使用默认数据
          this.notices = [
            
          ]
        }
      } catch (error) {
        console.error('获取公告失败:', error)
        // 出错时使用默认数据
        this.notices = [
          {
            noticeId: '1',
            title: '神州邮快递平台正式上线',
            content: '欢迎使用神州邮快递平台，体验更便捷的寄件服务！',
            type: 0,
            createTime: '2024-04-01'
          }
        ]
      } finally {
        this.loadingNotices = false
      }
    },
    
    // 查看更多公告
    viewMoreNotices() {
      uni.navigateTo({
        url: '/views/notice/list'
      })
    },
    
    // 查看公告详情
    viewNoticeDetail(notice) {
      uni.navigateTo({
        url: `/views/notice/detail?id=${notice.noticeId}`
      })
    },
    
    // 根据公告类型获取文本描述
    getNoticeTypeText(type) {
      switch (Number(type)) {
        case 0:
          return '更新'
        case 1:
          return '新增'
        case 2:
          return '通知'
        case 3:
          return '维护'
        default:
          return '公告'
      }
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return ''
      
      // 处理日期字符串：兼容iOS格式问题
      let date;
      try {
        // 检查日期字符串格式
        if (dateStr.includes(' ')) {
          // 将 "yyyy-MM-dd HH:mm:ss" 转换为 "yyyy-MM-ddTHH:mm:ss"
          dateStr = dateStr.replace(' ', 'T');
        }
        date = new Date(dateStr);
        
        // 验证日期是否有效
        if (isNaN(date.getTime())) {
          // 尝试手动解析
          const parts = dateStr.split(/[-T: ]/);
          if (parts.length >= 3) {
            // 使用数字创建日期对象 (年, 月-1, 日, 时, 分, 秒)
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; // 月份从0开始
            const day = parseInt(parts[2]);
            const hour = parts.length > 3 ? parseInt(parts[3]) : 0;
            const minute = parts.length > 4 ? parseInt(parts[4]) : 0;
            const second = parts.length > 5 ? parseInt(parts[5]) : 0;
            
            date = new Date(year, month, day, hour, minute, second);
          } else {
            // 返回原始字符串，无法解析
            return dateStr;
          }
        }
      } catch (e) {
        console.error('日期解析错误:', e, dateStr);
        return dateStr;
      }
      
      const now = new Date()
      const diff = now - date
      
      // 今天的日期
      if (diff < 24 * 60 * 60 * 1000 && 
          date.getDate() === now.getDate() && 
          date.getMonth() === now.getMonth() && 
          date.getFullYear() === now.getFullYear()) {
        return '今天'
      }
      
      // 昨天的日期
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.getDate() === yesterday.getDate() && 
          date.getMonth() === yesterday.getMonth() && 
          date.getFullYear() === yesterday.getFullYear()) {
        return '昨天'
      }
      
      // 一周内
      if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        return days[date.getDay()]
      }
      
      // 其他日期显示年月日
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    },
    
    // 跳转到订单页并带上搜索参数
    navToOrder(searchValue) {
      if (!searchValue) {
        uni.switchTab({ url: '/pages/order/order' })
        return
      }
      
      // 存储搜索参数到本地存储，因为switchTab不能携带参数
      uni.setStorageSync('orderSearchValue', searchValue)
      uni.switchTab({ url: '/pages/order/order' })
    },
    // 处理轮播图点击跳转小程序
    handleBannerClick(item) {
      if (item.appId && item.path) {
        // 跳转到其他小程序
        uni.navigateToMiniProgram({
          appId: item.appId,
          path: item.path,
          success: res => {
            console.log('跳转成功', res)
          },
          fail: err => {
            console.error('跳转失败', err)
            // uni.showToast({
            //   title: '跳转失败',
            //   icon: 'none'
            // })
          }
        })
      } else if (item.url) {
        // 如果有内部链接则跳转内部页面
        uni.navigateTo({
          url: item.url
        })
      } else {
        console.log('轮播图点击', item)
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF6F0 0%, #FFF 30%);
  padding-bottom: 30rpx;
  
  .header {
    position: relative;
    padding: 60rpx 30rpx 80rpx;
    padding-top: calc(60rpx + env(safe-area-inset-top));
    background: linear-gradient(135deg, rgba(255, 107, 1, 0.15), rgba(255, 143, 31, 0.15));
    border-radius: 0 0 30rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(255, 107, 1, 0.1);
    
    .header-content {
      position: relative;
      z-index: 1;
      
      .logo {
        width: 400rpx;
        height: 200rpx;
        display: block;
        // margin-left: -60rpx;
        margin-bottom: 20rpx;
        transform: translateY(15rpx);
      }
    }
  }
  
  .search-bar {
    transform: translateY(-100rpx);
    margin: 0 30rpx;
    margin-bottom: 10rpx;
    
    .search-box {
      transform: translateY(-10px);
      height: 80rpx;
      background: #fff;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
      border: 1px solid rgba(255, 107, 1, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
      
      .uni-icons {
        margin-right: 20rpx;
        color: #FF6B01;
      }
      
      input {
        flex: 1;
        font-size: 28rpx;
      }
      
      .placeholder {
        color: #999;
      }
      
      .search-action {
        display: flex;
        align-items: center;
        
        .clear-icon {
          padding: 6rpx 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .divider {
          width: 2rpx;
          height: 40rpx;
          background-color: #EEEEEE;
          margin: 0 12rpx;
        }
        
        .search-btn {
          font-size: 28rpx;
          color: #FF6B01;
          font-weight: 500;
          padding: 0 12rpx;
        }
      }
      
      &:hover, &:focus-within {
        box-shadow: 0 6rpx 24rpx rgba(255, 107, 1, 0.15);
        border-color: rgba(255, 107, 1, 0.3);
        transform: translateY(-12px);
      }
    }
  }
  
  .section-title {
    margin-bottom: 30rpx;
    padding: 0 10rpx;
    
    .main {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-right: 16rpx;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4rpx;
        left: 0;
        width: 40%;
        height: 6rpx;
        background: linear-gradient(90deg, #FF6B01, transparent);
        border-radius: 3rpx;
      }
    }
    
    .sub {
      font-size: 24rpx;
      color: #999;
      text-transform: uppercase;
    }
  }
  
  .function-area {
    
    margin-bottom: 40rpx;
    padding: 0 30rpx;
    
    .grid {
      display: flex;
      justify-content: space-between;
      
      .grid-item {
        width: 220rpx;
        height: 260rpx;
        background: #fff;
        border-radius: 24rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        box-shadow: 0 4rpx 20rpx rgba(255,107,1,0.1);
        
        .icon-box {
          width: 100rpx;
          height: 100rpx;
          background: linear-gradient(135deg, rgba(255,107,1,0.15), rgba(255,143,31,0.15));
          border-radius: 30rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20rpx;
          transition: all 0.3s;
          
          image {
            width: 60rpx;
            height: 60rpx;
          }
        }
        
        .label {
          font-size: 32rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 8rpx;
        }
        
        .desc {
          font-size: 24rpx;
          color: #999;
        }
        
        &:active {
          transform: scale(0.95);
          
          .icon-box {
            background: linear-gradient(135deg, rgba(255,107,1,0.2), rgba(255,143,31,0.2));
          }
        }
      }
    }
  }
  
  .swiper-area {
    margin: 0 30rpx 40rpx;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06);
    
    .swiper {
      height: 250rpx;
      
      image {
        width: 100%;
        height: 100%;
        border-radius: 24rpx;
      }
    }
    
    :deep(.uni-swiper-dots) {
      bottom: 20rpx;
    }
    
    :deep(.uni-swiper-dot) {
      width: 12rpx;
      height: 12rpx;
      border-radius: 6rpx;
      background: rgba(255,255,255,0.6);
      transition: all 0.3s;
      
      &.uni-swiper-dot-active {
        width: 24rpx;
        background: #fff;
      }
    }
  }
  
  .partner-area {
    margin: 0 30rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06);
    
    .partner-scroll {
      width: 100%;
      white-space: nowrap;
    }
    
    .partner-list {
      display: inline-flex;
      padding: 20rpx 10rpx;
      animation: scrollPartners 30s linear infinite;
      
      .partner-item {
        flex-shrink: 0;
        width: 160rpx;
        background: linear-gradient(135deg, #FFF6F0, #FFF);
        border-radius: 20rpx;
        padding: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s;
        border: 1px solid rgba(255,107,1,0.1);
        margin-right: 20rpx;
        
        image {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 16rpx;
        }
        
        text {
          font-size: 24rpx;
          color: #666;
          width: 100%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        &:active {
          transform: scale(0.95);
          background: linear-gradient(135deg, #FFF, #FFF6F0);
        }
      }
      
      // 复制一份列表用于无缝滚动
      &::after {
        content: '';
        display: block;
        width: 30rpx;
      }
    }
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6rpx);
  }
}

.search-box {
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: searchLight 3s infinite;
  }
}

@keyframes searchLight {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

// 添加横向滚动动画
@keyframes scrollPartners {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 15rpx));
  }
}

// 公告栏样式
.notice-area {
  margin: 0 30rpx 20rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
  transform: translateY(-80rpx);
  
  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
    
    .header-left {
      display: flex;
      align-items: center;
      
      .uni-icons {
        color: #FF6B01;
        margin-right: 10rpx;
      }
      
      .notice-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
      }
    }
    
    .header-right {
      display: flex;
      align-items: center;
      padding: 6rpx 10rpx;
      
      .more-text {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  
  .notice-content {
    height: 60rpx;
  }
  
  .notice-swiper {
    height: 100%;
  }
  
  .notice-item {
    padding: 12rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .notice-item-content {
      display: flex;
      align-items: center;
      flex: 1;
      overflow: hidden;
      
      .notice-type-tag {
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
        font-size: 22rpx;
        color: #fff;
        margin-right: 16rpx;
        background: #FF6B01;
        white-space: nowrap;
        
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
      
      .notice-text {
        font-size: 28rpx;
        color: #333;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .notice-date {
      font-size: 24rpx;
      color: #999;
      margin-left: 16rpx;
    }
  }
}
</style>
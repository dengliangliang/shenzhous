<template>
  <view class="settings-container">
    <!-- 设置列表 -->
    <view class="settings-list">
      <!-- 关于我们 -->
      <view class="settings-item" @click="handleAbout">
        <view class="item-left">
          <view class="item-icon about-icon"></view>
          <text class="item-text">关于我们</text>
        </view>
        <view class="arrow-right"></view>
      </view>

      <!-- 修改密码 -->
      <view class="settings-item" @click="handleChangePassword">
        <view class="item-left">
          <view class="item-icon password-icon"></view>
          <text class="item-text">修改密码</text>
        </view>
        <view class="arrow-right"></view>
      </view>

      <!-- 用户协议 -->
      <view class="settings-item" @click="handleUserAgreement">
        <view class="item-left">
          <view class="item-icon agreement-icon"></view>
          <text class="item-text">用户协议</text>
        </view>
        <view class="arrow-right"></view>
      </view>


      <!-- 隐私政策 -->
      <view class="settings-item" @click="handlePrivacy">
        <view class="item-left">
          <view class="item-icon privacy-icon"></view>
          <text class="item-text">隐私政策</text>
        </view>
        <view class="arrow-right"></view>
      </view>

      <!-- 快递协议 -->
      <view class="settings-item" @click="handleExpress">
        <view class="item-left">
          <view class="item-icon express-icon"></view>
          <text class="item-text">快递协议</text>
        </view>
        <view class="arrow-right"></view>
      </view>

      <!-- 违禁品说明 -->
      <view class="settings-item" @click="handleProhibited">
        <view class="item-left">
          <view class="item-icon prohibited-icon"></view>
          <text class="item-text">违禁品说明</text>
        </view>
        <view class="arrow-right"></view>
      </view>

      <!-- 清除缓存 -->
      <view class="settings-item" @click="handleClearCache">
        <view class="item-left">
          <view class="item-icon cache-icon"></view>
          <text class="item-text">清除缓存</text>
        </view>
        <view class="cache-size">{{cacheSize}}</view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="handleLogout" v-if="isLogin">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      cacheSize: '0KB'
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    isLogin() {
      return !!this.userInfo && !!this.userInfo.userId
    }
  },
  onShow() {
    // 获取缓存大小
    this.getCacheSize()
  },
  methods: {
    // 获取缓存大小
    getCacheSize() {
      // 使用uni-app API获取缓存信息
      uni.getStorageInfo({
        success: (res) => {
          // 计算缓存大小（单位：字节）
          const totalSize = res.currentSize;
          
          // 格式化缓存大小显示
          if (totalSize < 1024) {
            this.cacheSize = totalSize + 'B';
          } else if (totalSize < 1024 * 1024) {
            this.cacheSize = (totalSize / 1024).toFixed(2) + 'KB';
          } else {
            this.cacheSize = (totalSize / (1024 * 1024)).toFixed(2) + 'MB';
          }
        },
        fail: () => {
          this.cacheSize = '0KB';
        }
      });
    },

    // 处理关于我们
    handleAbout() {
      uni.navigateTo({
        url: '/views/about/about'
      })
    },

    // 处理修改密码
    handleChangePassword() {
      if (!this.isLogin) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }
      uni.navigateTo({
        url: '/views/changePassword/changePassword'
      })
    },

    // 处理用户协议
    handleUserAgreement() {
      uni.navigateTo({
        url: '/views/agreement/agreement?type=user'
      })
    },

    // 处理注册协议
    handleAgreement() {
      uni.navigateTo({
        url: '/views/agreement/agreement?type=register'
      })
    },

    // 处理隐私政策
    handlePrivacy() {
      uni.navigateTo({
        url: '/views/privacy/privacy'
      })
    },

    // 处理快递协议
    handleExpress() {
      uni.navigateTo({
        url: '/views/express/express'
      })
    },

    // 处理违禁品说明
    handleProhibited() {
      uni.navigateTo({
        url: '/views/prohibited/prohibited'
      })
    },

    // 处理清除缓存
    handleClearCache() {
      uni.showModal({
        title: '提示',
        content: '确定要清除缓存吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除所有缓存数据
            uni.clearStorage({
              success: () => {
                this.cacheSize = '0KB';
                uni.showToast({
                  title: '清除成功',
                  icon: 'success'
                });
              },
              fail: () => {
                uni.showToast({
                  title: '清除失败',
                  icon: 'none'
                });
              }
            });
          }
        }
      });
    },

    // 处理退出登录
    handleLogout() {
      if (!this.isLogin) return
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await this.$store.commit('user/clearUserInfo')
              uni.showToast({
                title: '退出成功',
                icon: 'success'
              })
              // 返回上一页
              uni.navigateBack()
            } catch(e) {
              uni.showToast({
                title: '退出失败',
                icon: 'none'
              })
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.settings-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;

  .settings-list {
    background-color: #fff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;

    .settings-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .item-left {
        display: flex;
        align-items: center;

        .item-icon {
          width: 48rpx;
          height: 48rpx;
          margin-right: 20rpx;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .about-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>');
        }

        .password-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>');
        }

        .agreement-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>');
        }

        .privacy-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>');
        }

        .express-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>');
        }

        .prohibited-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>');
        }

        .cache-icon {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>');
        }

        .item-text {
          font-size: 28rpx;
          color: #333;
        }
      }

      .arrow-right {
        width: 16rpx;
        height: 16rpx;
        border-top: 2rpx solid #999;
        border-right: 2rpx solid #999;
        transform: rotate(45deg);
      }

      .cache-size {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .logout-btn {
    width: 90%;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 45rpx;
    margin: 60rpx auto;
    color: #ff4d4f;
    font-size: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    transition: all 0.3s;
    
    &:active {
      transform: translateY(4rpx);
      box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
    }
  }
}
</style> 
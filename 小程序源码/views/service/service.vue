<template>
  <view class="service-container">
    <view class="header">
      <image class="logo" src="/static/img/系统左侧长LOGO.png" mode="aspectFit"></image>
      <text class="title">在线客服</text>
    </view>
    
    <view class="content">
      <view class="card">
        <view class="card-title">
          <text class="icon-box wechat-icon">微</text>
          <text>微信客服</text>
        </view>
        
        <view class="qrcode-box">
          <image class="qrcode" v-if="serviceInfo.wechatImage" :src="photoBaseUrl + serviceInfo.wechatImage" mode="aspectFit" show-menu-by-longpress></image>
          <text class="tip">长按保存二维码，打开微信扫一扫</text>
        </view>
        
        <view class="info-list">
          <view class="info-item">
            <text class="label">微信号:</text>
            <text class="value">{{serviceInfo.wechatNumber||'暂无数据'}}</text>
            <button class="copy-btn" @click="copyWechatId">复制</button>
          </view>
          
          <view class="info-item">
            <text class="label">服务时间:</text>
            <text class="value">{{serviceInfo.serviceHours||'暂无数据'}}</text>
          </view>
        </view>
      </view>
      
      <view class="contact-methods">
        <view class="method-title">其他联系方式</view>
        
        <view class="method-item" @click="callPhone">
          <text class="icon-box phone-icon">电</text>
          <text class="method-name">客服热线: {{serviceInfo.customerServiceHotline||'暂无数据'}}</text>
          <text class="arrow-icon">></text>
        </view>
        
        <view class="method-item" @click="sendEmail">
          <text class="icon-box email-icon">邮</text>
          <text class="method-name">邮箱: {{serviceInfo.email||'暂无数据'}}</text>
          <text class="arrow-icon">></text>
        </view>
      </view>
    </view>
    
    <view class="footer">
      <text class="slogan">神州邮 - 您的满意是我们永恒的追求</text>
    </view>
  </view>
</template>

<script>
import customerApi from '@/api/customer'
import{photoBaseUrl} from '@/config/env'
export default {
	
  data() {
    return {
      serviceInfo: {
        
      },
	  photoBaseUrl:''
    }
  },
  onLoad() {
  	this.getData();
	this.photoBaseUrl = photoBaseUrl;
  },
  methods: {
	getData(){
		customerApi.getCustomer().then(res=>{
			console.log(res)
			if(res){
				this.serviceInfo = res
			}
		})
	},
    // 复制微信号
    copyWechatId() {
      uni.setClipboardData({
        data: this.serviceInfo.wechatNumber,
        success: () => {
          uni.showToast({
            title: '微信号已复制',
            icon: 'success'
          });
        }
      });
    },
    
    // 拨打电话
    callPhone() {
      uni.showModal({
        title: '拨打客服电话',
        content: '确定要拨打客服电话'+this.serviceInfo.customerServiceHotline +'吗？',
        confirmText: '立即拨打',
        success: (res) => {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: this.serviceInfo.customerServiceHotline
            });
          }
        }
      });
    },
    
    // 发送邮件
    sendEmail() {
      // #ifdef H5
      window.location.href = `mailto:${this.serviceInfo.email}`;
      // #endif
      
      // #ifndef H5
      uni.setClipboardData({
        data: this.serviceInfo.email,
        success: () => {
          uni.showToast({
            title: '邮箱已复制',
            icon: 'success'
          });
        }
      });
      // #endif
    },
    
    // 保存二维码到相册
    saveQRCode() {
      uni.showLoading({
        title: '保存中...'
      });
      
      uni.saveImageToPhotosAlbum({
        filePath: '/static/img/wechat-qrcode.png',
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: '已保存到相册',
            icon: 'success'
          });
        },
        fail: (err) => {
          uni.hideLoading();
          // 处理保存失败的情况
          if (err.errMsg.indexOf('auth deny') >= 0) {
            uni.showModal({
              title: '提示',
              content: '需要授权才能保存图片到相册',
              confirmText: '去授权',
              success: (res) => {
                if (res.confirm) {
                  uni.openSetting();
                }
              }
            });
          } else {
            uni.showToast({
              title: '保存失败',
              icon: 'none'
            });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.service-container {
  min-height: 100vh;
  padding: 40rpx 30rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  
  .logo {
    width: 240rpx;
    height: 80rpx;
    margin-bottom: 20rpx;
  }
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
  }
}

.content {
  flex: 1;
  
  .card {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
    
    .card-title {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      
      text {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-left: 10rpx;
      }
    }
    
    .qrcode-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30rpx;
      
      .qrcode {
        width: 400rpx;
        height: 400rpx;
        margin-bottom: 20rpx;
        background-color: #f9f9f9;
        border: 1px solid #eeeeee;
      }
      
      .tip {
        font-size: 24rpx;
        color: #999999;
        margin-bottom: 10rpx;
      }
    }
    
    .info-list {
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        
        .label {
          font-size: 28rpx;
          color: #666666;
          width: 140rpx;
        }
        
        .value {
          font-size: 28rpx;
          color: #333333;
          flex: 1;
        }
        
        .copy-btn {
          width: 100rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-size: 24rpx;
          color: #FFFFFF;
          background-color: #FF6B01;
          border-radius: 28rpx;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
  
  .contact-methods {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
    
    .method-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 30rpx;
    }
    
    .method-item {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #F0F0F0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .method-name {
        flex: 1;
        font-size: 28rpx;
        color: #333333;
        margin: 0 20rpx;
      }
      
      .arrow-icon {
        font-size: 24rpx;
        color: #CCCCCC;
      }
    }
  }
}

.icon-box {
  display: inline-block;
  width: 46rpx;
  height: 46rpx;
  border-radius: 23rpx;
  text-align: center;
  line-height: 46rpx;
  font-size: 24rpx;
  color: #FFFFFF;
  
  &.wechat-icon {
    background-color: #07C160;
  }
  
  &.phone-icon {
    background-color: #FF6B01;
  }
  
  &.email-icon {
    background-color: #FF6B01;
  }
}

.footer {
  padding: 30rpx 0;
  text-align: center;
  
  .slogan {
    font-size: 24rpx;
    color: #999999;
  }
}
</style>

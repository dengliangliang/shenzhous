<template>
  <view class="help-container">
    <!-- 常见问题列表 -->
    <view class="faq-list">
      <view class="section-title">常见问题</view>
      <view 
        class="faq-item" 
        v-for="(item, index) in faqList" 
        :key="index"
        @click="handleFaqClick(item)"
      >
        <view class="faq-question">
          <text>{{item.question}}</text>
          <view class="arrow-right"></view>
        </view>
      </view>
    </view>

    <!-- 在线客服入口 -->
  <!-- <view class="service-entry" @click="handleService">
      <view class="service-content">
        <view class="service-icon"></view>
        <text class="service-text">联系在线客服</text>
      </view>
      <text class="service-tip">工作时间：9:00-18:00</text>
    </view> -->
  </view>
</template>

<script>
import questionApi from '@/api/question'
export default {
  data() {
    return {
      faqList: []
    }
  },
  created() {
  	this.getList();
  },
  methods: {
	getList(){
		questionApi.getList().then(res=>{
			console.log(res)
			if(res){
				this.faqList = res;
			}
		})
	},
    // 处理问题点击
    handleFaqClick(item) {
      uni.showModal({
        title: item.question,
        content: item.reply,
        showCancel: false
      })
    },
    
    
  }
}
</script>

<style lang="scss">
.help-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;

  .faq-list {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      padding-left: 10rpx;
    }

    .faq-item {
      padding: 20rpx 10rpx;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;

        text {
          font-size: 28rpx;
          color: #333;
        }

        .arrow-right {
          width: 16rpx;
          height: 16rpx;
          border-top: 2rpx solid #999;
          border-right: 2rpx solid #999;
          transform: rotate(45deg);
        }
      }
    }
  }

  .service-entry {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .service-content {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .service-icon {
        width: 48rpx;
        height: 48rpx;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6B01"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      .service-text {
        font-size: 28rpx;
        color: #FF6B01;
        margin-left: 10rpx;
      }
    }

    .service-tip {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style> 
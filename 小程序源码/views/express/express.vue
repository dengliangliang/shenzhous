<template>
  <view class="express-container">
    <view class="content">
      <view class="title">快递服务协议</view>
      <view class="content-text">{{content}}</view>
    </view>
  </view>
</template>

<script>
import agreementApi from '@/api/agreement'

export default {
  data() {
    return {
      content: ''
    }
  },
  onLoad() {
    this.getExpressContent()
  },
  methods: {
    // 获取快递协议内容
    async getExpressContent() {
      try {
        const res = await agreementApi.getExpressAgreement()
        
        if (res && res.dataList && res.dataList.length > 0) {
          // 从返回的数据列表中找到快递协议内容
          const expressData = res.dataList.find(item => item.agreementType === '1')
          
          if (expressData) {
            this.content = expressData.context
          } else {
            this.content = '未找到快递协议内容'
          }
        } else {
          this.content = '暂无快递协议内容'
        }
      } catch(e) {
        console.error('获取快递协议内容失败', e)
        uni.showToast({
          title: '获取内容失败',
          icon: 'none'
        })
        this.content = '获取快递协议内容失败'
      }
    }
  }
}
</script>

<style lang="scss">
.express-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30rpx;

  .content {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      text-align: center;
      margin-bottom: 40rpx;
    }

    .content-text {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  }
}
</style> 
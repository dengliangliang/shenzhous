<template>
  <view class="prohibited-container">
    <view class="content">
      <view class="title">月结服务说明</view>
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
    this.getProhibitedContent()
  },
  methods: {
    // 获取月结服务内容
    async getProhibitedContent() {
      try {
        const res = await agreementApi.getMonthlyService()
        
        if (res && res.dataList && res.dataList.length > 0) {
          // 从返回的数据列表中找到月结服务内容
          const prohibitedData = res.dataList.find(item => item.agreementType === '4')
          
          if (prohibitedData) {
            this.content = prohibitedData.context
          } else {
            this.content = '未找到月结服务内容'
          }
        } else {
          this.content = '暂无月结服务内容'
        }
      } catch(e) {
        console.error('获取月结服务内容失败', e)
        uni.showToast({
          title: '获取内容失败',
          icon: 'none'
        })
        this.content = '获取月结服务内容失败'
      }
    }
  }
}
</script>

<style lang="scss">
.prohibited-container {
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
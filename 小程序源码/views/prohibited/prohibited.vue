<template>
  <view class="prohibited-container">
    <view class="content">
      <view class="title">违禁品说明</view>
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
    // 获取违禁品说明内容
    async getProhibitedContent() {
      try {
        const res = await agreementApi.getProhibitedItems()
        
        if (res && res.dataList && res.dataList.length > 0) {
          // 从返回的数据列表中找到违禁品说明内容
          const prohibitedData = res.dataList.find(item => item.agreementType === '2')
          
          if (prohibitedData) {
            this.content = prohibitedData.context
          } else {
            this.content = '未找到违禁品说明内容'
          }
        } else {
          this.content = '暂无违禁品说明内容'
        }
      } catch(e) {
        console.error('获取违禁品说明内容失败', e)
        uni.showToast({
          title: '获取内容失败',
          icon: 'none'
        })
        this.content = '获取违禁品说明内容失败'
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
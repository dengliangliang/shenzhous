<template>
  <view class="agreement-container">
    <view class="content">
      <view class="title">{{title}}</view>
      <view class="content-text">{{content}}</view>
    </view>
  </view>
</template>

<script>
import agreementApi from '@/api/agreement'

export default {
  data() {
    return {
      title: '',
      content: '',
      type: ''
    }
  },
  onLoad(options) {
    this.type = options.type || 'register'
    this.getAgreementContent()
  },
  methods: {
    // 获取协议内容
    async getAgreementContent() {
      try {
        let res
        if (this.type === 'user') {
          res = await agreementApi.getUserAgreement()
          this.title = '用户协议'
        } else {
          res = await agreementApi.getAgreement({ agreementType: 0 })
          this.title = '注册协议'
        }
        
        if (res&& res.dataList && res.dataList.length > 0) {
          // 从返回的数据列表中找到对应类型的协议
          const agreementData = res.dataList.find(item => {
            if (this.type === 'user') {
              return item.agreementType === '3'
            } else {
              return item.agreementType === '0'
            }
          })
          
          if (agreementData) {
            this.content = agreementData.context
          } else {
            this.content = '未找到协议内容'
          }
        } else {
          this.content = '暂无协议内容'
        }
      } catch(e) {
        console.error('获取协议内容失败', e)
        uni.showToast({
          title: '获取协议内容失败',
          icon: 'none'
        })
        this.content = '获取协议内容失败'
      }
    }
  }
}
</script>

<style lang="scss">
.agreement-container {
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
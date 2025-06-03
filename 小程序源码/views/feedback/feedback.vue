<template>
  <view class="feedback-container">
    <view class="form-section">
      <!-- 反馈类型 -->
      <view class="form-item">
        <view class="item-label">
          <text class="required">*</text>
          <text>反馈类型</text>
        </view>
        <view class="type-list">
          <view 
            class="type-item" 
            v-for="(item, index) in feedbackTypes" 
            :key="index" 
            :class="{ active: selectedType === item.value }"
            @click="selectedType = item.value"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
      
      <!-- 反馈内容 -->
      <view class="form-item">
        <view class="item-label">
          <text class="required">*</text>
          <text>反馈内容</text>
        </view>
        <view class="textarea-box">
          <textarea 
            class="input-textarea" 
            v-model="content" 
            placeholder="请详细描述您遇到的问题或建议，以便我们更好地提供帮助..." 
            maxlength="500"
            :disable-default-padding="true"
          ></textarea>
          <view class="word-count">{{ content.length }}/500</view>
        </view>
      </view>
      
      <!-- 联系方式 -->
      <view class="form-item">
        <view class="item-label">
          <text>联系方式</text>
          <text class="sub-label">（可选，便于我们与您联系）</text>
        </view>
        <view class="input-box">
          <input 
            class="input-field" 
            v-model="contact" 
            placeholder="请留下您的手机或微信，方便我们联系您"
            type="text"
            maxlength="50"
          />
        </view>
      </view>
    </view>
    
    <!-- 提交按钮 -->
    <view class="submit-section">
      <button class="submit-btn" @click="submitFeedback" :disabled="!canSubmit">提交反馈</button>
    </view>
    
    <!-- 反馈说明 -->
    <view class="tips-section">
      <view class="tip-title">
        <uni-icons type="info" size="18" color="#FF6B01"></uni-icons>
        <text>温馨提示</text>
      </view>
      <view class="tip-item">
        <text>• 带 * 的内容为必填项</text>
      </view>
      <view class="tip-item">
        <text>• 您的反馈我们会认真处理</text>
      </view>
      <view class="tip-item">
        <text>• 如遇紧急问题，请直接联系在线客服</text>
      </view>
    </view>
  </view>
</template>

<script>
import feedbackApi from '@/api/feedback'
export default {
  data() {
    return {
      // 反馈类型列表
      feedbackTypes: [
        { label: '功能异常', value: 'bug' },
        { label: '体验问题', value: 'experience' },
        { label: '产品建议', value: 'suggestion' },
        { label: '服务投诉', value: 'complaint' },
        { label: '其他问题', value: 'other' }
      ],
      
      // 表单数据
      selectedType: '',  // 选中的反馈类型
      content: '',       // 反馈内容
      contact: '',       // 联系方式
      
      // 上传状态
      isSubmitting: false
    }
  },
  
  computed: {
    // 是否可以提交
    canSubmit() {
      return this.selectedType !== '' && this.content.trim() !== '' && !this.isSubmitting;
    }
  },
  
  onLoad() {
    // 尝试自动填充联系方式（如果用户已登录）
    const userInfo = this.$store.getters['user/getUserInfo']
    if (userInfo && userInfo.phone) {
      this.contact = userInfo.phone
    }
  },
  
  methods: {
    // 提交反馈
    submitFeedback() {
      if (!this.canSubmit) {
        return
      }
      
      if (this.selectedType === '') {
        uni.showToast({
          title: '请选择反馈类型',
          icon: 'none'
        })
        return
      }
      
      if (this.content.trim() === '') {
        uni.showToast({
          title: '请输入反馈内容',
          icon: 'none'
        })
        return
      }
      
      // 开始提交
      this.isSubmitting = true
      uni.showLoading({
        title: '提交中...'
      })
      
      // 准备提交的数据
      const feedbackData = {
        type: this.selectedType,
        content: this.content,
        contact: this.contact
      }
      
      // 这里应该调用实际的API提交反馈
      // SQL示例: INSERT INTO feedback (type, content, contact) VALUES (?, ?, ?)
      feedbackApi.addFeedback(feedbackData).then(res=>{
		  if(res){
			  // 目前使用模拟的方式
			  setTimeout(() => {
			    this.isSubmitting = false
			    uni.hideLoading()
			    
			    // 模拟提交成功
			    uni.showToast({
			      title: '提交成功',
			      icon: 'success',
			      duration: 2000
			    })
			    
			    // 重置表单
			    setTimeout(() => {
			      this.resetForm()
			      // 返回上一页
			      setTimeout(() => {
			        uni.navigateBack()
			      }, 500)
			    }, 1500)
			  }, 1000)
		  }
	  })
     
    },
    
    // 重置表单
    resetForm() {
      this.selectedType = ''
      this.content = ''
      // 不重置联系方式，保留便于下次使用
    }
  }
}
</script>

<style lang="scss">
.feedback-container {
  min-height: 100vh;
  padding: 30rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.form-section {
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  padding: 30rpx;
  margin-bottom: 30rpx;
  
  .form-item {
    margin-bottom: 40rpx;
    
    .item-label {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      
      .required {
        color: #ff4d4f;
        margin-right: 6rpx;
      }
      
      .sub-label {
        font-size: 24rpx;
        color: #999;
        font-weight: normal;
        margin-left: 10rpx;
      }
    }
    
    .type-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      
      .type-item {
        padding: 16rpx 30rpx;
        background-color: #f7f7f7;
        border-radius: 6rpx;
        margin: 10rpx;
        font-size: 26rpx;
        color: #666;
        transition: all 0.3s;
        
        &.active {
          background-color: #fff5ee;
          color: #FF6B01;
          border: 1px solid #FF6B01;
        }
      }
    }
    
    .textarea-box {
      position: relative;
      border: 1px solid #eee;
      border-radius: 8rpx;
      padding: 20rpx;
      background-color: #f9f9f9;
      
      .input-textarea {
        width: 100%;
        height: 240rpx;
        font-size: 28rpx;
        color: #333;
        line-height: 1.5;
      }
      
      .word-count {
        position: absolute;
        right: 20rpx;
        bottom: 20rpx;
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .input-box {
      border: 1px solid #eee;
      border-radius: 8rpx;
      padding: 20rpx;
      background-color: #f9f9f9;
      
      .input-field {
        width: 100%;
        height: 60rpx;
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}

.submit-section {
  padding: 20rpx 0;
  
  .submit-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background: linear-gradient(90deg, #FF6B01, #FF8F1F);
    color: #fff;
    font-size: 32rpx;
    font-weight: 500;
    border-radius: 45rpx;
    box-shadow: 0 6rpx 16rpx rgba(255, 107, 1, 0.3);
    
    &:active {
      transform: translateY(2rpx);
    }
    
    &[disabled] {
      background: #cccccc;
      box-shadow: none;
    }
  }
}

.tips-section {
  margin-top: 40rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .tip-title {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    text {
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
      margin-left: 10rpx;
    }
  }
  
  .tip-item {
    font-size: 26rpx;
    color: #666;
    padding: 6rpx 0;
    padding-left: 26rpx;
  }
}
</style>

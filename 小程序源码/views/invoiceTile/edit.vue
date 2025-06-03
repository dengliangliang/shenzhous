<template>
  <view class="edit-container">
    <!-- 类型切换 -->
    <view class="type-tabs" v-if="!isEdit">
      <view 
        class="tab-item" 
        :class="{ active: type === 0 }"
        @click="switchType(0)"
      >
        <uni-icons :type="type === 0 ? 'shop-filled' : 'shop'" size="20" :color="type === 0 ? '#FF6B01' : '#666'"></uni-icons>
        <text>企业单位</text>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: type === 1 }"
        @click="switchType(1)"
      >
        <uni-icons :type="type === 1 ? 'person-filled' : 'person'" size="20" :color="type === 1 ? '#FF6B01' : '#666'"></uni-icons>
        <text>个人/非企业单位</text>
      </view>
    </view>

    <form @submit="handleSubmit">
      <!-- 基本信息 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label required">{{type === 0 ? '企业名称' : '抬头全称'}}</text>
          <input 
            class="input" 
            type="text" 
            v-model="form.companiesName"
            :placeholder="type === 0 ? '请输入企业名称' : '请输入抬头全称'"
          />
        </view>

        <template v-if="type === 0">
          <view class="form-item">
            <text class="label required">税号</text>
            <input 
              class="input" 
              type="text" 
              v-model="form.taxNumber"
              placeholder="请输入纳税人识别号"
            />
          </view>

          <view class="form-item">
            <text class="label">单位地址</text>
            <input 
              class="input" 
              type="text" 
              v-model="form.companyAddress"
              placeholder="请输入单位地址"
            />
          </view>

          <view class="form-item">
            <text class="label">电话号码</text>
            <input 
              class="input" 
              type="text" 
              v-model="form.citycompanyTel"
              placeholder="请输入电话号码"
            />
          </view>

          <view class="form-item">
            <text class="label">开户银行</text>
            <input 
              class="input" 
              type="text" 
              v-model="form.bankName"
              placeholder="请输入开户银行"
            />
          </view>

          <view class="form-item">
            <text class="label">银行账户</text>
            <input 
              class="input" 
              type="text" 
              v-model="form.bankAccount"
              placeholder="请输入银行账号"
            />
          </view>
        </template>
      </view>

      <!-- 设置默认 -->
      <view class="form-group">
        <view class="form-item switch">
          <text class="label">设为默认抬头</text>
          <switch 
            :checked="form.isDefault === 1" 
            @change="e => form.isDefault = e.detail.value ? 1 : 0"
            color="#FF6B01"
          />
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn">
        <button 
          class="btn" 
          :loading="submitting" 
          form-type="submit"
        >
          保存
        </button>
      </view>
    </form>
  </view>
</template>

<script>
import invoiceApi from '@/api/invoice'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      type: 0, // 0:企业 1:个人
      titleId: '', // 编辑时的ID
      submitting: false,
      form: {
        companiesName: '',
        taxNumber: '',
        companyAddress: '',
        citycompanyTel: '',
        bankName: '',
        bankAccount: '',
        isDefault: 0,
        type: 0
      }
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    isEdit() {
      return !!this.titleId
    }
  },

  onLoad(options) {
    if (options.type) {
      this.type = Number(options.type)
      this.form.type = Number(options.type)
    }
    if (options.id) {
      this.titleId = options.id
      this.loadInvoiceDetail()
    }
  },

  methods: {
    // 加载发票抬头详情
    async loadInvoiceDetail() {
      try {
        const res = await invoiceApi.getInvoiceById(this.titleId)
        if (res) {
          this.form = { ...res }
          this.type = res.type
        }
      } catch (e) {
        console.error('加载发票抬头详情失败:', e)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      }
    },

    // 切换类型
    switchType(newType) {
      if (this.type === newType) return
      this.type = newType
      this.form.type = newType
      // 切换类型时清空表单
      this.form = {
        companiesName: '',
        taxNumber: '',
        companyAddress: '',
        citycompanyTel: '',
        bankName: '',
        bankAccount: '',
        isDefault: 0,
        type: newType
      }
    },

    // 表单提交
    async handleSubmit() {
      // 表单验证
      if (!this.form.companiesName) {
        return uni.showToast({
          title: this.type === 0 ? '请输入企业名称' : '请输入抬头全称',
          icon: 'none'
        })
      }
      if (this.type === 0 && !this.form.taxNumber) {
        return uni.showToast({
          title: '请输入税号',
          icon: 'none'
        })
      }

      try {
        this.submitting = true
        const userInfo = this.$store.getters['user/getUserInfo']
        const params = {
          ...this.form,
          userId: userInfo.userId
        }
        
        if (this.isEdit) {
          await invoiceApi.updateInvoice(params)
        } else {
          await invoiceApi.addInvoice(params)
        }

        uni.showToast({
          title: this.isEdit ? '修改成功' : '添加成功',
          icon: 'success'
        })

        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } catch (e) {
        uni.showToast({
          title: this.isEdit ? '修改失败' : '添加失败',
          icon: 'none'
        })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  min-height: 100vh;
  background: #F8F9FC;
  padding: 20rpx;
  
  .type-tabs {
    display: flex;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 10rpx;
    margin-bottom: 20rpx;
    
    .tab-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 72rpx;
      font-size: 28rpx;
      color: #666666;
      border-radius: 36rpx;
      transition: all 0.3s;
      
      &.active {
        color: #FF6B01;
        font-weight: 500;
        background: rgba(255,107,1,0.1);
      }
      
      .uni-icons {
        margin-right: 8rpx;
      }
    }
  }
  
  .form-group {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    
    .form-item {
      display: flex;
      align-items: center;
      min-height: 100rpx;
      border-bottom: 1rpx solid #EEEEEE;
      
      &:last-child {
        border-bottom: none;
      }
      
      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333333;
        
        &.required::before {
          content: '*';
          color: #FF4D4F;
          margin-right: 4rpx;
        }
      }
      
      .input {
        flex: 1;
        height: 100rpx;
        font-size: 28rpx;
      }
      
      &.switch {
        justify-content: space-between;
      }
    }
  }
  
  .submit-btn {
    padding: 40rpx 30rpx;
    
    .btn {
      height: 88rpx;
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
      border-radius: 44rpx;
      color: #FFFFFF;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style> 
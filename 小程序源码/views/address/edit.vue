<template>
  <view class="address-edit">
    <!-- 表单内容 -->
    <view class="form-content">
      <!-- 地址类型 -->
      <view class="form-item">
        <text class="label">地址类型</text>
        <view class="type-switch">
          <view 
            class="type-item" 
            :class="{ active: form.type === 0 }"
            @click="form.type = 0"
          >
            <uni-icons :type="form.type === 0 ? 'paperplane-filled' : 'paperplane'" 
                      size="20" 
                      :color="form.type === 0 ? '#FF6B01' : '#666'">
            </uni-icons>
            <text>寄件人地址</text>
          </view>
          <view 
            class="type-item" 
            :class="{ active: form.type === 1 }"
            @click="form.type = 1"
          >
            <uni-icons :type="form.type === 1 ? 'home-filled' : 'home'" 
                      size="20" 
                      :color="form.type === 1 ? '#FF6B01' : '#666'">
            </uni-icons>
            <text>收货人地址</text>
          </view>
        </view>
      </view>

      <!-- 联系人 -->
      <view class="form-item">
        <text class="label">联系人</text>
        <input 
          type="text"
          v-model="form.contactName"
          placeholder="请输入联系人姓名"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 手机号 -->
      <view class="form-item">
        <text class="label">手机号</text>
        <input 
          type="number"
          v-model="form.contactPhone"
          placeholder="请输入联系电话"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>

      <!-- 所在地区 -->
      <view class="form-item" @click="showRegionPicker">
        <text class="label">所在地区</text>
        <view class="region-select">
          <text v-if="form.province" class="selected">
            {{form.province}} {{form.city}} {{form.district}}
          </text>
          <text v-else class="placeholder">请选择所在地区</text>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>

      <!-- 详细地址 -->
      <view class="form-item textarea">
        <text class="label">详细地址</text>
        <textarea
          v-model="form.detailAddress"
          placeholder="请输入详细地址，如街道、门牌号等"
          placeholder-class="placeholder"
          :auto-height="true"
        />
      </view>

      <!-- 设为默认 -->
      <view class="form-item switch">
        <text class="label">设为默认地址</text>
        <switch 
          :checked="form.isDefault === 1"
          @change="handleDefaultChange"
          color="#FF6B01"
        />
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <button class="submit-btn" :loading="loading" @click="handleSubmit">
        保存地址
      </button>
    </view>

    <!-- 地区选择器 -->
    <uni-popup ref="regionPicker" type="bottom">
      <region-picker 
        @confirm="handleRegionConfirm"
        @cancel="$refs.regionPicker.close()"
      ></region-picker>
    </uni-popup>
  </view>
</template>

<script>
import addressApi from '@/api/address'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      addressId: '', // 编辑时的地址ID
      loading: false,
      form: {
        type: 0,
        contactName: '',
        contactPhone: '',
        province: '',
        city: '',
        district: '',
        detailAddress: '',
        isDefault: 0
      }
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    isEdit() {
      return !!this.addressId
    }
  },

  onLoad(options) {
    // 如果有id参数，说明是编辑
    if (options.id) {
      this.addressId = options.id
      this.loadAddressDetail()
    }
    // 如果有type参数，设置地址类型
    if (options.type !== undefined) {
      this.form.type = Number(options.type)
    }
  },

  methods: {
    // 加载地址详情
    async loadAddressDetail() {
      try {
        const res = await addressApi.getAddressById(this.addressId)
        Object.assign(this.form, res)
      } catch (e) {
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    },

    // 显示地区选择器
    showRegionPicker() {
      this.$refs.regionPicker.open()
    },

    // 地区选择确认
    handleRegionConfirm(region) {
      this.form.province = region.province
      this.form.city = region.city
      this.form.district = region.district
      this.$refs.regionPicker.close()
    },

    // 默认地址切换
    handleDefaultChange(e) {
      this.form.isDefault = e.detail.value ? 1 : 0
    },

    // 表单验证
    validate() {
      if (!this.form.contactName) {
        uni.showToast({
          title: '请输入联系人姓名',
          icon: 'none'
        })
        return false
      }
      if (!this.form.contactPhone) {
        uni.showToast({
          title: '请输入联系电话',
          icon: 'none'
        })
        return false
      }
      if (!/^1\d{10}$/.test(this.form.contactPhone)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return false
      }
      if (!this.form.province || !this.form.city || !this.form.district) {
        uni.showToast({
          title: '请选择所在地区',
          icon: 'none'
        })
        return false
      }
      if (!this.form.detailAddress) {
        uni.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
        return false
      }
      return true
    },

    // 提交表单
    async handleSubmit() {
      if (!this.validate() || this.loading) return
      
      this.loading = true
      try {
        const data = {
          ...this.form,
          userId: this.userInfo.userId
        }
        
        if (this.isEdit) {
          data.addressId = this.addressId
          await addressApi.updateAddress(data)
        } else {
          await addressApi.addAddress(data)
        }
        
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })
        
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } catch (e) {
        uni.showToast({
          title: e.message || '保存失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.address-edit {
  min-height: 100vh;
  background: #F8F8F8;
  padding-bottom: 120rpx;
  
  .form-content {
    background: #FFFFFF;
    margin-top: 20rpx;
    
    .form-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1px solid #F5F5F5;
      
      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333;
      }
      
      input, .region-select {
        flex: 1;
        font-size: 28rpx;
      }
      
      &.textarea {
        align-items: flex-start;
        
        textarea {
          flex: 1;
          height: 160rpx;
          font-size: 28rpx;
        }
      }
      
      &.switch {
        justify-content: space-between;
        
        .label {
          flex: 1;
        }
      }
      
      .type-switch {
        flex: 1;
        display: flex;
        justify-content: space-around;
        
        .type-item {
          display: flex;
          align-items: center;
          padding: 16rpx 30rpx;
          border-radius: 32rpx;
          background: #F8F8F8;
          transition: all 0.3s;
          
          &.active {
            color: #FF6B01;
            background: rgba(255,107,1,0.1);
          }
          
          .uni-icons {
            margin-right: 8rpx;
          }
          
          text {
            font-size: 28rpx;
            color: inherit;
          }
        }
      }
      
      .region-select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .selected {
          color: #333;
        }
      }
    }
  }
  
  .placeholder {
    color: #999;
  }
  
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx;
    background: #FFFFFF;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .submit-btn {
      height: 80rpx;
      line-height: 80rpx;
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
      border-radius: 40rpx;
      color: #FFFFFF;
      font-size: 32rpx;
      
      &[loading] {
        opacity: 0.8;
      }
    }
  }
}
</style> 
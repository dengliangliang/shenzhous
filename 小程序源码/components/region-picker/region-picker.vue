<template>
  <view class="region-picker">
    <!-- 选择器触发区域 -->
    <view class="picker-trigger" @click="showPicker">
      <view class="selected-value" :class="{ placeholder: !hasSelected }">
        {{ displayValue || placeholder }}
      </view>
      <uni-icons type="arrowdown" size="14" color="#999"></uni-icons>
    </view>

    <!-- 弹出选择器 -->
    <uni-popup ref="popup" type="bottom">
      <view class="picker-popup">
        <!-- 头部 -->
        <view class="picker-header">
          <text class="cancel" @click="handleCancel">取消</text>
          <text class="title">选择地区</text>
          <text class="confirm" @click="handleConfirm">确定</text>
        </view>

        <!-- 选择器主体 -->
        <view class="picker-body">
          <!-- 选项卡 -->
          <view class="tabs">
            <view 
              class="tab-item"
              v-for="(item, index) in tabTitles"
              :key="index"
              :class="{ active: currentTab === index }"
              @click="switchTab(index)"
            >
              <text>{{ getTabText(index) }}</text>
            </view>
            <view 
              class="tab-line" 
              :style="{ left: `${(100/3 * currentTab)}%` }"
            ></view>
          </view>

          <!-- 选项列表 -->
          <scroll-view 
            class="options-list"
            scroll-y
            :scroll-top="scrollTop"
          >
            <view 
              class="option-item"
              v-for="item in currentList"
              :key="item"
              :class="{ active: isSelected(item) }"
              @click="selectOption(item)"
            >
              <text>{{ item }}</text>
              <uni-icons 
                v-if="isSelected(item)"
                type="checkmarkempty" 
                size="16" 
                color="#FF6B01"
              ></uni-icons>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { areaData } from './area-data.js'

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        province: '',
        city: '',
        district: ''
      })
    },
    placeholder: {
      type: String,
      default: '请选择地区'
    }
  },

  data() {
    return {
      currentTab: 0,
      scrollTop: 0,
      selectedRegion: {
        province: '',
        city: '',
        district: ''
      },
      tabTitles: ['省份', '城市', '区县']
    }
  },

  computed: {
    hasSelected() {
      return !!(this.selectedRegion.province || this.selectedRegion.city || this.selectedRegion.district)
    },

    displayValue() {
      if (!this.hasSelected) return ''
      const { province, city, district } = this.selectedRegion
      return [province, city, district].filter(Boolean).join(' ')
    },

    currentList() {
      switch (this.currentTab) {
        case 0:
          return Object.keys(areaData)
        case 1:
          return this.selectedRegion.province ? Object.keys(areaData[this.selectedRegion.province]) : []
        case 2:
          return this.selectedRegion.province && this.selectedRegion.city 
            ? areaData[this.selectedRegion.province][this.selectedRegion.city] 
            : []
        default:
          return []
      }
    }
  },

  watch: {
    value: {
      handler(newVal) {
        this.selectedRegion = { ...newVal }
      },
      immediate: true
    }
  },

  methods: {
    showPicker() {
      this.$refs.popup.open()
    },

    handleCancel() {
      this.selectedRegion = { ...this.value }
      this.currentTab = 0
      this.$refs.popup.close()
    },

    getTabText(index) {
      switch (index) {
        case 0:
          return this.selectedRegion.province || '请选择省份'
        case 1:
          return this.selectedRegion.city || '请选择城市'
        case 2:
          return this.selectedRegion.district || '请选择区县'
        default:
          return ''
      }
    },

    isSelected(item) {
      switch (this.currentTab) {
        case 0:
          return item === this.selectedRegion.province
        case 1:
          return item === this.selectedRegion.city
        case 2:
          return item === this.selectedRegion.district
        default:
          return false
      }
    },

    selectOption(item) {
      switch (this.currentTab) {
        case 0:
          this.selectedRegion = {
            province: item,
            city: '',
            district: ''
          }
          this.currentTab = 1
          break
        case 1:
          this.selectedRegion.city = item
          this.selectedRegion.district = ''
          this.currentTab = 2
          break
        case 2:
          this.selectedRegion.district = item
          break
      }
      this.scrollTop = this.scrollTop ? 0 : 1
    },

    switchTab(index) {
      if (index > this.currentTab || 
         (index === 1 && !this.selectedRegion.province) || 
         (index === 2 && !this.selectedRegion.city)) {
        return
      }
      this.currentTab = index
      this.scrollTop = this.scrollTop ? 0 : 1
    },

    handleConfirm() {
      if (!this.selectedRegion.province || !this.selectedRegion.city || !this.selectedRegion.district) {
        uni.showToast({
          title: '请选择完整地区',
          icon: 'none'
        })
        return
      }
      this.$emit('input', { ...this.selectedRegion })
      this.$emit('confirm', { ...this.selectedRegion })
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.region-picker {
  .picker-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88rpx;
    padding: 0 30rpx;
    background: #FFFFFF;
    border-radius: 12rpx;
    border: 2rpx solid #EEEEEE;

    .selected-value {
      flex: 1;
      font-size: 28rpx;
      color: #333333;
      
      &.placeholder {
        color: #999999;
      }
    }
  }

  .picker-popup {
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 0 0;
    overflow: hidden;

    .picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100rpx;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #EEEEEE;

      .title {
        font-size: 32rpx;
        color: #333333;
        font-weight: 500;
      }

      .cancel, .confirm {
        font-size: 28rpx;
        padding: 20rpx;
        margin: -20rpx;
      }

      .cancel {
        color: #999999;
      }

      .confirm {
        color: #FF6B01;
        font-weight: 500;
      }
    }

    .picker-body {
      height: 600rpx;
      
      .tabs {
        display: flex;
        position: relative;
        height: 88rpx;
        background: #FFFFFF;
        border-bottom: 1rpx solid #EEEEEE;

        .tab-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          color: #666666;
          position: relative;
          
          &.active {
            color: #FF6B01;
            font-weight: 500;
          }
        }

        .tab-line {
          position: absolute;
          bottom: 0;
          width: calc(100% / 3);
          height: 4rpx;
          background: #FF6B01;
          border-radius: 2rpx;
          transition: all 0.3s;
        }
      }

      .options-list {
        height: calc(100% - 88rpx);
        
        .option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30rpx;
          font-size: 28rpx;
          color: #333333;
          
          &.active {
            color: #FF6B01;
            background: rgba(255,107,1,0.05);
          }

          &:active {
            background: #F5F5F5;
          }
        }
      }
    }
  }
}
</style> 
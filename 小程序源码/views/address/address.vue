<template>
  <view class="address-container">
    <!-- 地址类型切换 -->
    <view class="type-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentType === 0 }"
        @click="switchType(0)"
      >
        <uni-icons :type="currentType === 0 ? 'paperplane-filled' : 'paperplane'" size="20" :color="currentType === 0 ? '#FF6B01' : '#666'"></uni-icons>
        <text>寄件人地址</text>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentType === 1 }"
        @click="switchType(1)"
      >
        <uni-icons :type="currentType === 1 ? 'home-filled' : 'home'" size="20" :color="currentType === 1 ? '#FF6B01' : '#666'"></uni-icons>
        <text>收货人地址</text>
      </view>
    </view>

    <!-- 地址列表 -->
    <scroll-view 
      class="address-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        class="address-item animate__animated animate__fadeIn"
        v-for="(item, index) in addressList"
        :key="item.addressId"
        :style="{ animationDelay: index * 0.1 + 's' }"
        @click="onAddressItemClick(item)"
        :class="{ 'selected': selectMode && selectedAddressId === item.addressId }"
      >
        <!-- 选择模式显示选择指示器 -->
        <view class="select-indicator" v-if="selectMode">
          <view class="select-circle" :class="{ 'checked': selectedAddressId === item.addressId }">
            <uni-icons v-if="selectedAddressId === item.addressId" type="checkmarkempty" size="16" color="#FFFFFF"></uni-icons>
          </view>
        </view>
        
        <view class="info">
          <view class="top">
            <view class="left">
              <text class="name">{{item.contactName}}</text>
              <text class="phone">{{item.contactPhone}}</text>
            </view>
            <view class="right">
              <text class="tag default" v-if="item.isDefault">默认</text>
              <text class="tag type">{{item.type === 0 ? '寄件' : '收货'}}</text>
            </view>
          </view>
          <view class="address">
            <text class="label">地址：</text>
            <text class="content">{{item.province}}{{item.city}}{{item.district}}{{item.detailAddress}}</text>
          </view>
		  <!-- 非选择模式显示操作按钮 -->
		   <view class="actions" v-if="!selectMode">
		      <view class="action-btn" @click.stop="setDefault(item)" v-if="!item.isDefault">
		        <uni-icons type="checkmarkempty" size="20" color="#666"></uni-icons>
		        <text>设为默认</text>
		      </view>
		      <view class="action-btn" @click.stop="editAddress(item)">
		        <uni-icons type="compose" size="20" color="#666"></uni-icons>
		        <text>编辑</text>
		      </view>
		      <view class="action-btn delete" @click.stop="deleteAddress(item)">
		        <uni-icons type="trash" size="20" color="#FF4D4F"></uni-icons>
		        <text>删除</text>
		      </view>
		    </view>
		  </view>
        </view>
        
       

      <!-- 加载更多 -->
      <view class="load-more" v-if="addressList.length > 0">
        <text v-if="loading">加载中...</text>
        <text v-else-if="!hasMore">没有更多了</text>
      </view>

      <!-- 空状态 -->
      <view v-if="addressList.length === 0" class="empty-state">
        <image src="/static/img/empty-address.png" mode="aspectFit"></image>
        <view>
          <text>暂无{{currentType === 0 ? '寄件人' : '收货人'}}地址</text>
        </view>
        <view class="empty-add-btn" @click="addAddress">
          <uni-icons type="plus" size="16" color="#FF6B01"></uni-icons>
          <text>添加地址</text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <!-- 选择模式下显示确认按钮 -->
      <button v-if="selectMode && selectedAddressId" class="confirm-btn" @click="confirmSelect">
        <text>确认选择</text>
      </button>
      <!-- 普通模式下显示添加按钮 -->
      <button v-else class="add-btn" @click="addAddress">
        <uni-icons type="plus" size="20" color="#FFFFFF"></uni-icons>
        <text>新增{{currentType === 0 ? '寄件人' : '收货人'}}地址</text>
      </button>
    </view>
  </view>
</template>

<script>
import addressApi from '@/api/address'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      addressList: [],
      currentType: 0, // 0:寄件人地址 1:收货人地址
      loading: false,
      refreshing: false,
      hasMore: true,
      page: 1,
      pageSize: 10,
      selectMode: false, // 是否是选择地址模式
      selectedAddressId: '',
      selectedAddress: null, // 选中的地址完整数据
      addressType: '', // 地址类型：sender或receiver
    }
  },

  computed: {
    ...mapState('user', ['userInfo'])
  },

  onLoad(options) {
    // 检查是否是选择模式
    this.selectMode = options.select === 'true';
    this.addressType = options.type || '';
    
    // console.log('地址页面加载 - 选择模式:', this.selectMode, '地址类型:', this.addressType);
    
    // 加载地址列表
    this.loadAddressList();
  },

  onShow() {
    // 每次页面显示时重置分页并重新加载数据
    this.page = 1
    this.hasMore = true
    this.addressList = []
    this.loadAddressList()
  },

  methods: {
    async loadAddressList() {
      if (!this.hasMore || this.loading) return
      
      try {
        const userInfo = this.$store.getters['user/getUserInfo']
        this.loading = true
        const res = await addressApi.getAddressPage({
          pageNum: this.page,
          pageSize: this.pageSize,
          userId: userInfo.userId,
          type: this.currentType
        })
        
        const records = res?.dataList || []
        const total = res?.totalPages || 0
        
        if (this.page === 1) {
          this.addressList = records
        } else {
          this.addressList = [...this.addressList, ...records]
        }
        
        this.hasMore = this.addressList.length < total * this.pageSize
        this.page++
      } catch (e) {
        console.error('加载地址列表失败:', e)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      } finally {
        this.loading = false
        if (this.refreshing) {
          this.refreshing = false
          uni.stopPullDownRefresh()
        }
      }
    },

    // 下拉刷新
    async onRefresh() {
      this.refreshing = true
      this.page = 1
      this.hasMore = true
      await this.loadAddressList()
    },

    // 切换地址类型
    switchType(type) {
      if (this.currentType === type) return
      this.currentType = type
      this.page = 1
      this.hasMore = true
      this.addressList = []
      this.loadAddressList()
      
      // 切换类型时清除选择
      this.selectedAddressId = ''
      this.selectedAddress = null
    },

    // 修改选择地址方法，点击只标记不返回
    selectAddress(address) {
      if (!this.selectMode) return;
      
      // 设置选中状态
      this.selectedAddressId = address.addressId;
      this.selectedAddress = address;
      
      console.log('已选择地址:', address);
    },
    
    // 点击地址项的处理
    onAddressItemClick(item) {
      if (this.selectMode) {
        // 选择模式下，点击只标记选中状态，不立即返回
        this.selectAddress(item);
      } else {
        // 非选择模式下，点击进入编辑
        this.editAddress(item);
      }
    },

    // 确认选择按钮的处理
    confirmSelect() {
      if (!this.selectedAddress) {
        uni.showToast({
          title: '请选择一个地址',
          icon: 'none'
        });
        return;
      }
      
      console.log('确认选择地址:', this.selectedAddress, '类型:', this.addressType);
      
      // 获取页面通信通道
      const eventChannel = this.getOpenerEventChannel();
      
      // 发送选中的地址数据
      eventChannel.emit('addressSelected', {
        address: this.selectedAddress,
        type: this.addressType
      });
      
      // 返回上一页
      uni.navigateBack();
    },

    // 编辑地址
    editAddress(address) {
      uni.navigateTo({
        url: `/views/address/edit?id=${address.addressId}`
      })
    },

    // 新增地址
    addAddress() {
      uni.navigateTo({
        url: '/views/address/edit'
      })
    },

    // 删除地址
    deleteAddress(item) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该地址吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await addressApi.deleteAddress(item.addressId)
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
              this.onRefresh()
            } catch (e) {
              uni.showToast({
                title: e.message || '删除失败',
                icon: 'none'
              })
            }
          }
        }
      })
    },

    // 设为默认地址
    async setDefault(item) {
      try {
        await addressApi.updateAddress({
          ...item,
          isDefault: 1
        })
        uni.showToast({
          title: '设置成功',
          icon: 'success'
        })
        this.onRefresh()
      } catch (e) {
        uni.showToast({
          title: e.message || '设置失败',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.address-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F8F8F8;
  
  .type-tabs {
    display: flex;
    background: #FFFFFF;
    padding: 20rpx 40rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    position: relative;
    z-index: 10;
    
    .tab-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 80rpx;
      border-radius: 40rpx;
      margin: 0 20rpx;
      transition: all 0.3s ease;
      position: relative;
      
      text {
        font-size: 30rpx;
        margin-left: 10rpx;
        transition: color 0.3s ease;
      }
      
      &.active {
        background: #FFF5F0;
        
        text {
          color: #FF6B01;
          font-weight: 500;
        }
        
        &::after {
          content: '';
          position: absolute;
          bottom: -5rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 6rpx;
          background: #FF6B01;
          border-radius: 3rpx;
        }
      }
    }
  }
  
  .address-list {
    flex: 1;
    padding: 0 30rpx;
    width: 92%;
    .address-item {
      display: flex;
      margin-bottom: 30rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
      overflow: hidden;
      box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
      position: relative;
      padding: 30rpx 20rpx;
      transition: all 0.2s ease;
      
      // 选择模式布局
      &.selected {
        background: rgba(255, 107, 1, 0.05);
        border-left: 4rpx solid #FF6B01;
        padding-left: 16rpx;
      }
      
      // 选择指示器
      .select-indicator {
        margin-right: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .select-circle {
          width: 36rpx;
          height: 36rpx;
          border: 2rpx solid #E0E0E0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          
          &::before {
            content: '';
            position: absolute;
            width: 0%;
            height: 0%;
            background-color: #FF6B01;
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          }
          
          &.checked {
            border-color: #FF6B01;
            
            &::before {
              width: 100%;
              height: 100%;
              opacity: 1;
              transform: scale(1);
            }
            
            .uni-icons {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .uni-icons {
            position: relative;
            z-index: 2;
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
            transition-delay: 0.1s;
          }
        }
      }
      
      // 信息区域
      .info {
        flex: 1;
        
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16rpx;
          
          .left {
            display: flex;
            align-items: center;
            
            .name {
              font-size: 32rpx;
              color: #333;
              font-weight: 500;
              margin-right: 20rpx;
            }
            
            .phone {
              font-size: 28rpx;
              color: #666;
            }
          }
          
          .right {
            display: flex;
            align-items: center;
            
            .tag {
              font-size: 24rpx;
              padding: 4rpx 12rpx;
              border-radius: 8rpx;
              margin-left: 12rpx;
              
              &.default {
                color: #FF6B01;
                background: rgba(255,107,1,0.1);
              }
              
              &.type {
                color: #52C41A;
                background: rgba(82,196,26,0.1);
              }
            }
          }
        }
        
        .address {
          display: flex;
          font-size: 28rpx;
          color: #666;
          line-height: 1.5;
          
          .label {
            flex-shrink: 0;
            color: #999;
          }
          
          .content {
            flex: 1;
          }
        }
      }
      
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1px solid #EEEEEE;
        
        .action-btn {
          display: flex;
          align-items: center;
          padding: 10rpx 20rpx;
          margin-left: 30rpx;
          border-radius: 30rpx;
          transition: background-color 0.2s ease;
          
          &:active {
            background-color: #f5f5f5;
          }
          
          text {
            font-size: 28rpx;
            color: #666;
            margin-left: 8rpx;
          }
          
          &.delete {
            text {
              color: #FF4D4F;
            }
          }
        }
      }
      
      /* 增加点击效果 */
      &:active {
        background-color: #f8f8f8;
      }
    }
    
    .load-more {
      text-align: center;
      padding: 30rpx 0;
      
      text {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .empty-state {
      padding-top: 160rpx;
      text-align: center;
      
      image {
        width: 280rpx;
        height: 280rpx;
        margin-bottom: 30rpx;
      }
      
      text {
        font-size: 30rpx;
        color: #999;
      }
      
      .empty-add-btn {
        display: inline-flex;
        align-items: center;
        margin-top: 40rpx;
        padding: 16rpx 40rpx;
        background: #FFF5F0;
        border-radius: 40rpx;
        
        text {
          color: #FF6B01;
          font-size: 28rpx;
          margin-left: 8rpx;
        }
      }
    }
  }
  
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 40rpx 40rpx;
    background: #FFFFFF;
    box-shadow: 0 -2rpx 20rpx rgba(0,0,0,0.08);
    border-radius: 30rpx 30rpx 0 0;
    
    .add-btn, .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
      border-radius: 44rpx;
      color: #FFFFFF;
      font-size: 32rpx;
      box-shadow: 0 8rpx 16rpx rgba(255,107,1,0.2);
      
      .uni-icons {
        margin-right: 8rpx;
      }
    }
  }
}
</style> 
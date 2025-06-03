<template>
  <view class="invoice-container">
    <!-- 类型切换 -->
    <view class="type-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentType === 0 }"
        @click="switchType(0)"
      >
        <uni-icons :type="currentType === 0 ? 'shop-filled' : 'shop'" size="20" :color="currentType === 0 ? '#FF6B01' : '#666'"></uni-icons>
        <text>企业单位</text>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentType === 1 }"
        @click="switchType(1)"
      >
        <uni-icons :type="currentType === 1 ? 'person-filled' : 'person'" size="20" :color="currentType === 1 ? '#FF6B01' : '#666'"></uni-icons>
        <text>个人/非企业单位</text>
      </view>
    </view>

    <!-- 发票抬头列表 -->
    <scroll-view 
      class="invoice-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view 
        class="invoice-item animate__animated animate__fadeIn"
        v-for="(item, index) in invoiceList"
        :key="item.titleId"
        :style="{ animationDelay: index * 0.1 + 's' }"
      >
        <!-- 默认标记 -->
        <view class="default-tag" v-if="item.isDefault">
          <uni-icons type="star-filled" size="12" color="#FF6B01"></uni-icons>
          <text>默认</text>
        </view>

        <!-- 主要信息 -->
        <view class="main-info">
          <view class="title">{{item.companiesName}}</view>
          <view class="tax-number" v-if="item.type === 0">
            <text class="label">税号：</text>
            <text class="value">{{item.taxNumber}}</text>
          </view>
        </view>

        <!-- 详细信息 -->
        <view class="detail-info" v-if="item.type === 0">
          <view class="info-item" v-if="item.companyAddress">
            <text class="label">单位地址：</text>
            <text class="value">{{item.companyAddress}}</text>
          </view>
          <view class="info-item" v-if="item.citycompanyTel">
            <text class="label">电话号码：</text>
            <text class="value">{{item.citycompanyTel}}</text>
          </view>
          <view class="info-row" v-if="item.bankName || item.bankAccount">
            <view class="info-item bank" v-if="item.bankName">
              <text class="label">开户银行：</text>
              <text class="value">{{item.bankName}}</text>
            </view>
            
          </view>
		  <view class="info-item" v-if="item.bankAccount">
			<text class="label">银行账户：</text>
			<text class="value">{{item.bankAccount}}</text>
		  </view>
		  
        </view>

        <!-- 操作按钮 -->
        <view class="actions">
          <view class="action-btn" @click="setDefault(item)" v-if="!item.isDefault">
            <uni-icons type="checkmarkempty" size="16" color="#666"></uni-icons>
            <text>设为默认</text>
          </view>
          <view class="action-btn" @click="editInvoice(item)">
            <uni-icons type="compose" size="16" color="#666"></uni-icons>
            <text>编辑</text>
          </view>
          <view class="action-btn delete" @click="deleteInvoice(item)">
            <uni-icons type="trash" size="16" color="#FF4D4F"></uni-icons>
            <text>删除</text>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus" v-if="invoiceList.length > 0"></uni-load-more>

      <!-- 空状态 -->
      <view v-if="invoiceList.length === 0" class="empty-state">
        <image src="/static/img/empty-invoice.png" mode="aspectFit"></image>
        <text>暂无{{currentType === 0 ? '企业' : '个人'}}发票抬头</text>
        <text class="sub-text">点击下方按钮添加发票抬头</text>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <button class="add-btn" @click="addInvoice">
        <uni-icons type="plus" size="20" color="#FFFFFF"></uni-icons>
        <text>新增{{currentType === 0 ? '企业' : '个人'}}发票抬头</text>
      </button>
    </view>
  </view>
</template>

<script>
import invoiceApi from '@/api/invoice'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      invoiceList: [],
      currentType: 0, // 0:企业单位 1:个人/非企业单位
      loading: false,
      refreshing: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    }
  },

  computed: {
    ...mapState('user', ['userInfo'])
  },

  onShow() {
    this.page = 1
    this.hasMore = true
    this.invoiceList = []
    this.loadInvoiceList()
  },

  methods: {
    async loadInvoiceList() {
      if (!this.hasMore || this.loading) return
      
      try {
        const userInfo = this.$store.getters['user/getUserInfo']
        this.loading = true
        const res = await invoiceApi.getInvoicePage({
          pageNum: this.page,
          pageSize: this.pageSize,
          userId: userInfo.userId,
          type: this.currentType
        })
        
        if (!res || typeof res !== 'object') {
          throw new Error('Invalid response data')
        }
        
        const records = Array.isArray(res.dataList) ? res.dataList : []
        const total = Number(res.totalPages) || 0
        
        if (this.page === 1) {
          this.invoiceList = records
        } else {
          this.invoiceList = [...this.invoiceList, ...records]
        }
        
        this.hasMore = this.invoiceList.length < total * this.pageSize
        this.page++
      } catch (e) {
        console.error('加载发票抬头列表失败:', e)
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
      await this.loadInvoiceList()
    },

    // 切换类型
    switchType(type) {
      if (this.currentType === type) return
      this.currentType = type
      this.page = 1
      this.hasMore = true
      this.invoiceList = []
      this.loadInvoiceList()
    },

    // 设为默认
    async setDefault(invoice) {
      try {
        await invoiceApi.updateInvoice({
          ...invoice,
          isDefault: 1
        })
        uni.showToast({
          title: '设置成功',
          icon: 'success'
        })
        this.onRefresh()
      } catch (e) {
        uni.showToast({
          title: '设置失败，请重试',
          icon: 'none'
        })
      }
    },

    // 编辑发票抬头
    editInvoice(invoice) {
      uni.navigateTo({
        url: `/views/invoiceTile/edit?id=${invoice.titleId}`
      })
    },

    // 删除发票抬头
    async deleteInvoice(invoice) {
      if (!invoice || !invoice.titleId) {
        console.error('Invalid invoice object:', invoice)
        return uni.showToast({
          title: '删除失败，参数错误',
          icon: 'none'
        })
      }
	console.log(invoice.titleId)
      uni.showModal({
        title: '提示',
        content: '确定要删除该发票抬头吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await invoiceApi.deleteInvoice(invoice.titleId)
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
              this.onRefresh()
            } catch (e) {
              console.error('删除发票抬头失败:', e)
              uni.showToast({
                title: '删除失败，请重试',
                icon: 'none'
              })
            }
          }
        }
      })
    },

    // 新增发票抬头
    addInvoice() {
      uni.navigateTo({
        url: `/views/invoiceTile/edit?type=${this.currentType}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-container {
  min-height: 100vh;
  background: #F8F9FC;
  
  .type-tabs {
    display: flex;
    background: #FFFFFF;
    padding: 20rpx 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    position: relative;
    z-index: 1;

    .tab-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
      font-size: 28rpx;
      color: #666666;
      position: relative;
      transition: all 0.3s;
      
      &.active {
        color: #FF6B01;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -20rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background: #FF6B01;
          border-radius: 2rpx;
        }
      }
      
      .uni-icons {
        margin-right: 8rpx;
      }
    }
  }

  .invoice-list {
    height: calc(100vh - 120rpx - 120rpx);
    padding: 20rpx;
    
    .invoice-item {
      position: relative;
      background: #FFFFFF;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
      
      .default-tag {
        position: relative;
        float: right;
        display: flex;
        align-items: center;
        background: #FFF5E6;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
        margin-bottom: 16rpx;
        
        text {
          font-size: 20rpx;
          color: #FF6B01;
          margin-left: 4rpx;
        }
      }
      
      .main-info {
        clear: both;
        margin-bottom: 16rpx;
        
        .title {
          font-size: 32rpx;
          color: #333333;
          font-weight: 500;
          margin-bottom: 12rpx;
        }
        
        .tax-number {
          display: flex;
          align-items: center;
          
          .label {
            font-size: 26rpx;
            color: #999999;
          }
          
          .value {
            font-size: 26rpx;
            color: #666666;
          }
        }
      }
      
      .detail-info {
        background: #F8F9FC;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;
        
        .info-item {
          display: flex;
          margin-bottom: 12rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .label {
            flex-shrink: 0;
            font-size: 26rpx;
            color: #999999;
            width: 140rpx;
          }
          
          .value {
            flex: 1;
            font-size: 26rpx;
            color: #666666;
          }
        }
        
        .info-row {
          display: flex;
          gap: 20rpx;
          
          .info-item {
            flex: 1;
          }
        }
      }
      
      .actions {
        display: flex;
        justify-content: flex-end;
        border-top: 1rpx solid #EEEEEE;
        padding-top: 20rpx;
        margin-top: 20rpx;
        
        .action-btn {
          display: flex;
          align-items: center;
          padding: 10rpx 20rpx;
          margin-left: 30rpx;
          border-radius: 8rpx;
          transition: all 0.3s;
          
          &:active {
            background: #F5F5F5;
          }
          
          text {
            font-size: 26rpx;
            color: #666666;
            margin-left: 8rpx;
          }
          
          &.delete text {
            color: #FF4D4F;
          }
        }
      }
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    
    image {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 20rpx;
    }
    
    text {
      font-size: 28rpx;
      color: #999999;
      
      &.sub-text {
        font-size: 24rpx;
        margin-top: 10rpx;
      }
    }
  }
  
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 30rpx;
    background: #FFFFFF;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      background: linear-gradient(90deg, #FF6B01, #FF8F1F);
      border-radius: 44rpx;
      color: #FFFFFF;
      font-size: 32rpx;
      box-shadow: 0 4rpx 16rpx rgba(255,107,1,0.3);
      transition: all 0.3s;
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 8rpx rgba(255,107,1,0.2);
      }
      
      .uni-icons {
        margin-right: 8rpx;
      }
    }
  }
}
</style> 
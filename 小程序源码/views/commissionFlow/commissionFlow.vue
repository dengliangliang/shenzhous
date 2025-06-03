<template>
  <view class="commission-flow-container">
    <!-- 佣金统计卡片 -->
    <view class="summary-card">
      <view class="card-header">
        <text class="title">佣金总览</text>
        <text class="subtitle">本月收支情况</text>
      </view>
      <view class="card-content">
        <view class="stat-item">
          <text class="stat-value">¥{{ totalIncome.toFixed(2) }}</text>
          <text class="stat-label">累计收入</text>
          <view class="stat-trend positive">
            <uni-icons type="arrow-up" size="12" color="#52C41A"></uni-icons>
            <text>{{ incomePercent }}%</text>
          </view>
        </view>
        <view class="divider"></view>
        <view class="stat-item">
          <text class="stat-value">¥{{ totalExpense.toFixed(2) }}</text>
          <text class="stat-label">累计支出</text>
          <view class="stat-trend negative" v-if="expensePercent > 0">
            <uni-icons type="arrow-up" size="12" color="#FF4D4F"></uni-icons>
            <text>{{ expensePercent }}%</text>
          </view>
          <view class="stat-trend positive" v-else>
            <uni-icons type="arrow-down" size="12" color="#52C41A"></uni-icons>
            <text>{{ Math.abs(expensePercent) }}%</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 过滤器 -->
    <view class="filter-tabs">
      <view 
        v-for="(tab, index) in filterTabs" 
        :key="index"
        :class="['filter-tab', { active: activeTabIndex === index }]"
        @click="setActiveTab(index)"
      >
        {{ tab.name }}
      </view>
    </view>
    
    <!-- 流水列表 -->
    <scroll-view class="flow-list" scroll-y @scrolltolower="loadMore">
      <view v-for="(flow, index) in filteredFlows" :key="flow.flowId" 
            class="flow-item animate__animated animate__fadeIn"
            :style="{ animationDelay: index * 0.05 + 's' }">
        <view class="flow-icon" 
              :class="{
                'income': flow.flowType == 0,
                'expense': flow.flowType == 1,
                'refund': flow.flowType == 2,
                'unknown': flow.flowType != 0 && flow.flowType != 1 && flow.flowType != 2
              }">
          <uni-icons :type="getFlowIcon(flow.flowType)" size="24" color="#FFFFFF"></uni-icons>
        </view>
        <view class="flow-content">
          <view class="flow-header">
            <text class="flow-title">{{ getFlowTypeText(flow.flowType) }}</text>
            <text class="flow-amount" :class="{ positive: flow.amount > 0, negative: flow.amount < 0 }">
              {{ flow.amount > 0 ? '+' : '' }}{{ flow.amount.toFixed(2) }}
            </text>
          </view>
          <view class="flow-details">
            <view class="detail-item">
              <uni-icons type="calendar" size="12" color="#999"></uni-icons>
              <text>{{ formatDate(flow.createTime) }}</text>
            </view>
            <view class="detail-item" v-if="flow.orderId">
              <uni-icons type="paperplane" size="12" color="#999"></uni-icons>
              <text>订单: {{ flow.orderId }}</text>
            </view>
            <view class="detail-item">
              <uni-icons type="wallet" size="12" color="#999"></uni-icons>
              <text>余额: ¥{{ flow.balance.toFixed(2) }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <uni-load-more :status="loadMoreStatus" v-if="commissionFlows.length > 0"></uni-load-more>
      
      <view v-if="filteredFlows.length === 0 && !loading" class="empty-state">
        <image src="/static/img/no-data.png" mode="aspectFit" class="empty-image"></image>
        <text class="empty-text">暂无佣金流动记录</text>
        <text class="empty-tip">邀请好友加入可获得佣金收益</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import commissionFlowApi from '@/api/commissionFlow'

export default {
  data() {
    return {
      commissionFlows: [],
      pageNum: 1,
      pageSize: 10,
      totalPages: 0,
      loading: false,
      totalIncome: 0,
      totalExpense: 0,
      incomePercent: 0, 
      expensePercent: 0,
      activeTabIndex: 0,
      filterTabs: [
        { name: '全部', type: null },
        { name: '收入', type: 'income' },
        { name: '支出', type: 'expense' }
      ]
    }
  },
  
  onLoad() {
    this.loadCommissionFlows(true)
  },
  
  computed: {
    loadMoreStatus() {
      if (this.loading) return 'loading'
      if (this.pageNum <= this.totalPages) return 'more'
      return 'noMore'
    },
    
    filteredFlows() {
      const activeTab = this.filterTabs[this.activeTabIndex]
      if (!activeTab.type) return this.commissionFlows
      
      return this.commissionFlows.filter(flow => {
        if (activeTab.type === 'income') return flow.amount > 0
        if (activeTab.type === 'expense') return flow.amount < 0
        return true
      })
    }
  },
  
  methods: {
    setActiveTab(index) {
      this.activeTabIndex = index
    },
    
    loadMore() {
      if (this.pageNum <= this.totalPages && !this.loading) {
        this.loadCommissionFlows()
      }
    },
    
    getFlowTypeClass(flowType) {
      switch (flowType) {
        case 0: return 'income'  // 邀请返佣
        case 1: return 'expense' // 快递费抵扣
        case 2: return 'refund'  // 快递取消返现
        default: return 'unknown'
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '无日期'
      try {
        // 简单格式化，可根据需要调整
        const date = new Date(dateString)
        return dateString.split(' ')[0].replace(/-/g, '/')
      } catch (e) {
        console.error('日期格式化错误:', e)
        return dateString || '日期错误'
      }
    },
    
    async loadCommissionFlows(refresh = false) {
      if (this.loading) return
      this.loading = true
      
      if (refresh) {
        this.pageNum = 1
        this.commissionFlows = []
      }
      
      try {
        const response = await commissionFlowApi.pageCommissionFlow({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userId: this.$store.state.user.userInfo.userId
        })
        
        console.log('API响应:', response) // 添加日志调试
        
        if (response) {
          // 确保使用正确的数据格式
          const dataList = response.dataList || []
          
          if (refresh) {
            this.commissionFlows = dataList
          } else {
            this.commissionFlows = [...this.commissionFlows, ...dataList]
          }
          
          this.totalPages = response.totalPages || 1
          this.pageNum++
          
          // 更新统计数据
          this.calculateTotals()
          this.calculateTrends() // 添加趋势计算
        }
      } catch (error) {
        console.error('加载佣金流动失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    calculateTotals() {
      if (!this.commissionFlows.length) {
        this.totalIncome = 0
        this.totalExpense = 0
        return
      }
      
      this.totalIncome = this.commissionFlows
        .filter(flow => flow && flow.amount > 0)
        .reduce((sum, flow) => sum + Number(flow.amount), 0)
        
      this.totalExpense = Math.abs(this.commissionFlows
        .filter(flow => flow && flow.amount < 0)
        .reduce((sum, flow) => sum + Number(flow.amount), 0))
    },
    
    calculateTrends() {
      // 实际项目中，这里应该根据历史数据计算趋势
      // 现在使用简单模拟
      if (this.commissionFlows.length > 0) {
        this.incomePercent = (Math.random() * 10).toFixed(1)
        this.expensePercent = (Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)).toFixed(1)
      } else {
        this.incomePercent = 0
        this.expensePercent = 0
      }
    },
    
    getFlowTypeText(flowType) {
      switch (Number(flowType)) {
        case 0: return '邀请返佣'
        case 1: return '快递费抵扣'
        case 2: return '快递取消返现'
        default: return '未知类型'
      }
    },
    
    getFlowIcon(flowType) {
      switch (Number(flowType)) {
        case 0: return 'person-add'
        case 1: return 'minus'
        case 2: return 'refresh'
        default: return 'help'
      }
    }
  }
}
</script>

<style lang="scss">
.commission-flow-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20rpx;
  
  .summary-card {
    background: linear-gradient(135deg, #FF6B01, #FF8F1F);
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 8rpx 20rpx rgba(255, 107, 1, 0.15);
    
    .card-header {
      margin-bottom: 30rpx;
      
      .title {
        font-size: 36rpx;
        color: #FFFFFF;
        font-weight: bold;
        display: block;
      }
      
      .subtitle {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 6rpx;
        display: block;
      }
    }
    
    .card-content {
      display: flex;
      justify-content: space-between;
      
      .divider {
        width: 1px;
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .stat-value {
          font-size: 40rpx;
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .stat-label {
          font-size: 24rpx;
          color: rgba(255, 255, 255, 0.8);
          margin: 8rpx 0;
        }
        
        .stat-trend {
          display: flex;
          align-items: center;
          font-size: 22rpx;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
          
          &.positive {
            background-color: rgba(82, 196, 26, 0.2);
            color: #52C41A;
          }
          
          &.negative {
            background-color: rgba(255, 77, 79, 0.2);
            color: #FF4D4F;
          }
        }
      }
    }
  }
  
  .filter-tabs {
    display: flex;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    padding: 6rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    
    .filter-tab {
      flex: 1;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      padding: 16rpx 0;
      border-radius: 8rpx;
      transition: all 0.3s;
      
      &.active {
        background-color: #FF6B01;
        color: #FFFFFF;
        font-weight: 500;
      }
    }
  }
  
  .flow-list {
    height: calc(100vh - 340rpx);
    
    .flow-item {
      display: flex;
      align-items: flex-start;
      background-color: #FFFFFF;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .flow-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
        
        &.income {
          background: linear-gradient(135deg, #52C41A, #85E24D);
        }
        
        &.expense {
          background: linear-gradient(135deg, #FF4D4F, #FF7A7B);
        }
        
        &.refund {
          background: linear-gradient(135deg, #1890FF, #4CB8FF);
        }
        
        &.unknown {
          background: linear-gradient(135deg, #FAAD14, #FFD666);
        }
      }
      
      .flow-content {
        flex: 1;
        
        .flow-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12rpx;
          
          .flow-title {
            font-size: 30rpx;
            color: #333;
            font-weight: 500;
          }
          
          .flow-amount {
            font-size: 32rpx;
            font-weight: bold;
            
            &.positive {
              color: #52C41A;
            }
            
            &.negative {
              color: #FF4D4F;
            }
          }
        }
        
        .flow-details {
          display: flex;
          flex-wrap: wrap;
          
          .detail-item {
            display: flex;
            align-items: center;
            margin-right: 20rpx;
            margin-bottom: 8rpx;
            
            text {
              font-size: 24rpx;
              color: #999;
              margin-left: 6rpx;
            }
          }
        }
      }
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    
    .empty-image {
      width: 240rpx;
      height: 240rpx;
      margin-bottom: 30rpx;
    }
    
    .empty-text {
      font-size: 30rpx;
      color: #666;
      margin-bottom: 16rpx;
    }
    
    .empty-tip {
      font-size: 26rpx;
      color: #999;
    }
  }
}
</style>
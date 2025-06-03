<template>
  <!-- No changes to template section -->
</template>

<script>
import invoiceApi from '@/api/invoice'

export default {
  data() {
    return {
      // ... existing code ...
      
      // 发票状态选项
      statusOptions: [
        { label: '全部', value: -1 },
        { label: '开票中', value: 0 },
        { label: '已开票', value: 1 },
        { label: '申请驳回', value: 2 }
      ],
      currentStatus: -1,
      
      // ... existing code ...
    }
  },

  methods: {
    // ... existing code ...
    
    // 修改加载发票列表的方法
    async loadInvoiceList(refresh = false) {
      if (refresh) {
        this.page = 1
        this.invoiceList = []
      }
      
      this.loading = true
      
      try {
        if (!this.getUserInfo || !this.getUserInfo.userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          return
        }
        
        const params = {
          userId: this.getUserInfo.userId,
          page: this.page,
          limit: this.limit
        }
        
        // 如果选择了状态筛选，添加状态参数
        if (this.currentStatus >= 0) {
          params.status = this.currentStatus
        }
        
        const res = await invoiceApi.getOrderInvoiceList(params)
        
        if (res && res.length > 0) {
          // 直接使用返回的数组结果
          this.invoiceList = [...this.invoiceList, ...res]
          this.page++
          this.hasMore = res.length >= this.limit
        } else {
          this.hasMore = false
        }
      } catch (e) {
        console.error('加载发票列表失败:', e)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
        // 停止下拉刷新
        uni.stopPullDownRefresh()
      }
    },

    // 添加状态筛选方法
    changeStatus(status) {
      if (this.currentStatus === status) return
      this.currentStatus = status
      this.loadInvoiceList(true)
    },

    // ... existing code ...

    // 修改发票项渲染方法
    renderInvoiceItem(item) {
      return {
        // 使用OrderInvoiceRequest中的字段
        title: item.companiesName || '个人发票',
        orderId: item.orderId,
        // 格式化状态文本和样式
        status: this.formatStatus(item.status),
        statusStyle: this.getStatusStyle(item.status),
        // 显示申请时间
        time: this.$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM'),
        // 添加发票类型
        type: item.type === 0 ? '企业发票' : '个人发票',
        // 添加订单金额信息
        amount: item.order ? item.order.totalAmount : '未知',
        // 发票ID
        id: item.orderInvoiceRequestId
      }
    },

    // 格式化状态文本
    formatStatus(status) {
      const statusMap = {
        0: '开票中',
        1: '已开票',
        2: '申请驳回'
      }
      return statusMap[status] || '未知状态'
    },

    // 获取状态样式
    getStatusStyle(status) {
      const styleMap = {
        0: 'color: #2979ff;',
        1: 'color: #19be6b;',
        2: 'color: #fa3534;'
      }
      return styleMap[status] || ''
    }
  }
}
</script>

<style>
  /* No changes to style section */
</style> 
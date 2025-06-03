<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="支付方式">
          <el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
            <el-option label="在线支付" :value="0"></el-option>
            <el-option label="月结" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运送状态">
          <el-select v-model="queryParams.shippingStatus" placeholder="请选择运送状态" clearable>
            <el-option label="待取件" :value="0"></el-option>
            <el-option label="运送中" :value="1"></el-option>
            <el-option label="已送达" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable>
            <el-option label="待支付" :value="0"></el-option>
            <el-option label="已支付" :value="1"></el-option>
            <el-option label="已取消" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" width="55" align="center">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="易达订单号" align="center"></el-table-column>
      <el-table-column prop="deliveryId" label="运单号" align="center"></el-table-column>
      <el-table-column label="寄件人信息" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.senderName}}</div>
          <div>{{scope.row.senderPhone}}</div>
          <div>{{scope.row.senderProvince}}{{scope.row.senderCity}}{{scope.row.senderDistrict}}{{scope.row.senderDetailAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column label="收件人信息" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.receiverName}}</div>
          <div>{{scope.row.receiverPhone}}</div>
          <div>{{scope.row.receiverProvince}}{{scope.row.receiverCity}}{{scope.row.receiverDistrict}}{{scope.row.receiverDetailAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="paymentMethod" label="支付方式" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.paymentMethod === 0 ? 'primary' : 'success'">
            {{ scope.row.paymentMethod === 0 ? '在线支付' : '月结' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="shippingStatus" label="运送状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getShippingStatusType(scope.row.shippingStatus)">
            {{ getShippingStatusText(scope.row.shippingStatus) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getOrderStatusType(scope.row.orderStatus)">
            {{ getOrderStatusText(scope.row.orderStatus) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderTotalPrice" label="订单金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderTotalPrice }} 元
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 详情对话框 -->
    <el-dialog :title="'订单详情'" :visible.sync="detailVisible" width="800px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item>
        <el-descriptions-item label="易达订单号">{{ detail.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="运单号">{{ detail.deliveryId }}</el-descriptions-item>
        <el-descriptions-item label="支付方式">{{ detail.paymentMethod === 0 ? '在线支付' : '月结' }}</el-descriptions-item>
        <el-descriptions-item label="运送状态">{{ getShippingStatusText(detail.shippingStatus) }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{ getOrderStatusText(detail.orderStatus) }}</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">寄件人信息</el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ detail.senderName }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ detail.senderPhone }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">
          {{ detail.senderProvince }}{{ detail.senderCity }}{{ detail.senderDistrict }}{{ detail.senderDetailAddress }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">收件人信息</el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ detail.receiverName }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ detail.receiverPhone }}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">
          {{ detail.receiverProvince }}{{ detail.receiverCity }}{{ detail.receiverDistrict }}{{ detail.receiverDetailAddress }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">物品信息</el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="预估重量">{{ detail.estimatedItemWeight }} kg</el-descriptions-item>
        <el-descriptions-item label="实际重量">{{ detail.actualWeight }} kg</el-descriptions-item>
        <el-descriptions-item label="尺寸">{{ detail.length }}*{{ detail.width }}*{{ detail.height }} cm</el-descriptions-item>
        <el-descriptions-item label="保价金额">{{ detail.guaranteeValueAmount }} 元</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">费用信息</el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="保价费">{{ detail.insuranceFee }} 元</el-descriptions-item>
        <el-descriptions-item label="佣金抵扣">{{ detail.commissionDeductionAmount }} 元</el-descriptions-item>
        <el-descriptions-item label="订单总价">{{ detail.orderTotalPrice }} 元</el-descriptions-item>
        <el-descriptions-item label="抵扣后金额">{{ detail.amountAfterCommissionDeduction }} 元</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">其他信息</el-divider>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ detail.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { pageOrder, deleteOrder } from '@/api/Order'

export default {
  name: 'OrderManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        paymentMethod: '',
        shippingStatus: '',
        isPriceDifferencePaid: '',
        orderStatus: '',
        userId: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      detail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const res = await pageOrder(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取订单列表失败:', error)
      }
    },

    // 搜索
    handleSearch() {
      this.queryParams.pageIndex = 1
      this.getList()
    },

    // 重置
    resetQuery() {
      this.queryParams.paymentMethod = ''
      this.queryParams.shippingStatus = ''
      this.queryParams.isPriceDifferencePaid = ''
      this.queryParams.orderStatus = ''
      this.handleSearch()
    },

    // 查看详情
    handleDetail(row) {
      this.detail = { ...row }
      this.detailVisible = true
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteOrder(row.orderId)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          }
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {})
    },

    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },

    handleCurrentChange(val) {
      this.queryParams.pageIndex = val
      this.getList()
    },

    // 获取运送状态标签类型
    getShippingStatusType(status) {
      const map = {
        0: 'info',
        1: 'warning',
        2: 'success'
      }
      return map[status] || ''
    },

    // 获取运送状态文本
    getShippingStatusText(status) {
      const map = {
        0: '待取件',
        1: '运送中',
        2: '已送达'
      }
      return map[status] || '未知状态'
    },

    // 获取订单状态标签类型
    getOrderStatusType(status) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return map[status] || ''
    },

    // 获取订单状态文本
    getOrderStatusText(status) {
      const map = {
        0: '待支付',
        1: '已支付',
        2: '已取消'
      }
      return map[status] || '未知状态'
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.search-wrapper {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style> 
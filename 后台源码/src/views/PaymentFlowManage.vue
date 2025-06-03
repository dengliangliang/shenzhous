<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="订单ID">
          <el-input v-model="queryParams.orderId" placeholder="请输入订单ID"></el-input>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-select v-model="queryParams.refundFlag" placeholder="请选择退款状态" clearable>
            <el-option label="未退款" :value="0"></el-option>
            <el-option label="已退款" :value="1"></el-option>
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
      <el-table-column prop="flowId" label="流水ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
      <el-table-column prop="merchantOrderId" label="商户订单号" align="center"></el-table-column>
      <el-table-column prop="transactionId" label="微信支付交易单号" align="center"></el-table-column>
      <el-table-column prop="amount" label="支付金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }} 元
        </template>
      </el-table-column>
      <el-table-column prop="refundFlag" label="退款状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.refundFlag === 0 ? 'success' : 'warning'">
            {{ scope.row.refundFlag === 0 ? '未退款' : '已退款' }}
          </el-tag>
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
    <el-dialog :title="'支付流水详情'" :visible.sync="detailVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="流水ID">{{ detail.flowId }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
        <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item>
        <el-descriptions-item label="商户订单号">{{ detail.merchantOrderId }}</el-descriptions-item>
        <el-descriptions-item label="交易描述">{{ detail.description }}</el-descriptions-item>
        <el-descriptions-item label="用户openId">{{ detail.openid }}</el-descriptions-item>
        <el-descriptions-item label="微信支付交易单号">{{ detail.transactionId }}</el-descriptions-item>
        <el-descriptions-item label="支付金额">{{ detail.amount }} 元</el-descriptions-item>
        <el-descriptions-item label="退款状态">
          {{ detail.refundFlag === 0 ? '未退款' : '已退款' }}
        </el-descriptions-item>
        <el-descriptions-item label="错误描述">{{ detail.errorDescription }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { pagePaymentFlow, deletePaymentFlow } from '@/api/PaymentFlow'

export default {
  name: 'PaymentFlowManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        orderId: '',
        refundFlag: ''
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
        const res = await pagePaymentFlow(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取支付流水列表失败:', error)
      }
    },

    // 搜索
    handleSearch() {
      this.queryParams.pageIndex = 1
      this.getList()
    },

    // 重置
    resetQuery() {
      this.queryParams.userName = ''
      this.queryParams.orderId = ''
      this.queryParams.refundFlag = ''
      this.handleSearch()
    },

    // 查看详情
    handleDetail(row) {
      this.detail = { ...row }
      this.detailVisible = true
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该支付流水吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deletePaymentFlow(row.flowId)
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
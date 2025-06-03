<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账单类型">
          <el-select v-model="queryParams.type" placeholder="请选择账单类型" clearable>
            <el-option label="支付" :value="0"></el-option>
            <el-option label="退款" :value="1"></el-option>
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
      <el-table-column prop="monthlyStatementId" label="账单ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
      <el-table-column prop="type" label="账单类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 0 ? 'primary' : 'success'">
            {{ scope.row.type === 0 ? '支付' : '退款' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额" align="center">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.type === 1 ? '#67C23A' : '#F56C6C' }">
            {{ scope.row.type === 1 ? '+' : '-' }}{{ scope.row.amount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">查看</el-button>
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
    <el-dialog :title="'账单详情'" :visible.sync="detailVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="账单ID">{{ detail.monthlyStatementId }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
        <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item>
        <el-descriptions-item label="账单类型">
          {{ detail.type === 0 ? '支付' : '退款' }}
        </el-descriptions-item>
        <el-descriptions-item label="金额">{{ detail.amount }}</el-descriptions-item>
        <el-descriptions-item label="月结资格ID">{{ detail.monthlySettlementEligibilityId }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { pageMonthlyStatement, getMonthlyStatementById } from '@/api/MonthlyStatement'

export default {
  name: 'MonthlyStatementManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        type: '',
        monthlySettlementEligibilityId: '',
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
        const res = await pageMonthlyStatement(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      } catch (error) {
        console.error('获取月结账单列表失败:', error)
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
      this.queryParams.type = ''
      this.handleSearch()
    },

    // 查看详情
    handleDetail(row) {
      this.detail = { ...row }
      this.detailVisible = true
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
<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-select v-model="queryParams.settlementCycle" placeholder="请选择结算周期" clearable>
            <el-option label="月结" :value="0"></el-option>
            <el-option label="季结" :value="1"></el-option>
            <el-option label="半年结" :value="2"></el-option>
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
      <el-table-column prop="monthlySettlementEligibilityId" label="资格ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="settlementCycle" label="结算周期" align="center">
        <template slot-scope="scope">
          <el-tag :type="getSettlementCycleType(scope.row.settlementCycle)">
            {{ getSettlementCycleText(scope.row.settlementCycle) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="minimumAmount" label="每月最低寄件量" align="center">
        <template slot-scope="scope">
          {{ scope.row.minimumAmount }} 元
        </template>
      </el-table-column>
      <el-table-column prop="invoiceRequirement" label="发票要求" align="center">
        <template slot-scope="scope">
          {{ getInvoiceText(scope.row.invoiceRequirement) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">查看</el-button>
          <el-button size="small" type="info" @click="handleViewBills(scope.row)">查看账单</el-button>
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
    <el-dialog :title="'月结资格详情'" :visible.sync="detailVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="资格ID">{{ detail.monthlySettlementEligibilityId }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
        <el-descriptions-item label="结算周期">{{ getSettlementCycleText(detail.settlementCycle) }}</el-descriptions-item>
        <el-descriptions-item label="每月最低寄件量">{{ detail.minimumAmount }} 元</el-descriptions-item>
        <el-descriptions-item label="发票要求">{{ getInvoiceText(detail.invoiceRequirement) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail.updateTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 账单列表对话框 -->
    <el-dialog :title="'月结账单列表'" :visible.sync="billsVisible" width="900px">
      <div class="bills-wrapper">
        <!-- 账单搜索 -->
        <div class="search-wrapper">
          <el-form :inline="true" :model="billQueryParams" class="demo-form-inline">
            <el-form-item label="账单类型">
              <el-select v-model="billQueryParams.type" placeholder="请选择账单类型" clearable>
                <el-option label="支付" :value="0"></el-option>
                <el-option label="退款" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleBillSearch">查询</el-button>
              <el-button @click="resetBillQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 账单表格 -->
        <el-table :data="billsData" border style="width: 100%">
          <el-table-column label="编号" width="55" align="center">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="monthlyStatementId" label="账单ID" align="center"></el-table-column>
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
        </el-table>

        <!-- 账单分页 -->
        <div class="pagination-container">
          <el-pagination
            @size-change="handleBillSizeChange"
            @current-change="handleBillCurrentChange"
            :current-page="billQueryParams.pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="billQueryParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="billTotal">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageMonthlySettlementEligibility, getMonthlySettlementEligibilityById } from '@/api/MonthlySettlementEligibility'

export default {
  name: 'MonthlySettlementEligibilityManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        settlementCycle: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      detail: {},
      billsVisible: false,
      billQueryParams: {
        pageIndex: 1,
        pageSize: 10,
        type: ''
      },
      billsData: [],
      billTotal: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const res = await pageMonthlySettlementEligibility(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取月结资格列表失败:', error)
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
      this.queryParams.settlementCycle = ''
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
    },

    // 获取结算周期标签类型
    getSettlementCycleType(cycle) {
      const map = {
        0: 'success',
        1: 'warning',
        2: 'info'
      }
      return map[cycle] || ''
    },

    // 获取结算周期文本
    getSettlementCycleText(cycle) {
      const map = {
        0: '月结',
        1: '季结',
        2: '半年结'
      }
      return map[cycle] || '未知周期'
    },

    // 获取发票类型文本
    getInvoiceText(type) {
      const map = {
        0: '增值税普通发票',
        1: '增值税专用发票',
        2: '其他'
      }
      return map[type] || '未知类型'
    },

    // 查看账单
    handleViewBills(row) {
      this.billsVisible = true
    },

    // 获取账单列表
    async getBills() {
      try {
        const res = await pageMonthlySettlementEligibility(this.billQueryParams)
        if (res.code === 200) {
          this.billsData = res.data.records
          this.billTotal = res.data.total
        }
      } catch (error) {
        console.error('获取月结账单列表失败:', error)
      }
    },

    // 重置账单查询
    resetBillQuery() {
      this.billQueryParams.type = ''
      this.handleBillSearch()
    },

    // 分页
    handleBillSizeChange(val) {
      this.billQueryParams.pageSize = val
      this.getBills()
    },

    handleBillCurrentChange(val) {
      this.billQueryParams.pageIndex = val
      this.getBills()
    },

    // 搜索账单
    handleBillSearch() {
      this.billQueryParams.pageIndex = 1
      this.getBills()
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
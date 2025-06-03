<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="流水类型">
          <el-select v-model="queryParams.flowType" placeholder="请选择流水类型" clearable>
            <el-option label="邀请返佣" :value="0"></el-option>
            <el-option label="快递费抵扣" :value="1"></el-option>
            <el-option label="快递取消返现" :value="2"></el-option>
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
      <el-table-column prop="amount" label="变动金额" align="center">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.amount >= 0 ? '#67C23A' : '#F56C6C' }">
            {{ scope.row.amount >= 0 ? '+' : '' }}{{ scope.row.amount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="账户余额" align="center"></el-table-column>
      <el-table-column prop="flowType" label="流水类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="getFlowTypeTag(scope.row.flowType)">
            {{ getFlowTypeText(scope.row.flowType) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { pageCommissionFlow } from '@/api/CommissionFlow'

export default {
  name: 'CommissionFlowManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        flowType: '',
        userId: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取佣金流水列表
    async getList() {
      try {
        const res = await pageCommissionFlow(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      } catch (error) {
        console.error('获取佣金流水列表失败:', error)
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
      this.queryParams.flowType = ''
      this.queryParams.userId = ''
      this.handleSearch()
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

    // 获取流水类型标签样式
    getFlowTypeTag(type) {
      const map = {
        0: 'success',
        1: 'warning',
        2: 'info'
      }
      return map[type] || ''
    },

    // 获取流水类型文本
    getFlowTypeText(type) {
      const map = {
        0: '邀请返佣',
        1: '快递费抵扣',
        2: '快递取消返现'
      }
      return map[type] || '未知类型'
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
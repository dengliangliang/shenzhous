<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="queryParams.type" placeholder="请选择状态" clearable>
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="已处理" :value="1"></el-option>
            <el-option label="已驳回" :value="2"></el-option>
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
      <el-table-column prop="orderInvoiceRequestId" label="申请ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button 
            size="small" 
            type="success" 
            @click="handlePass(scope.row)"
            v-if="scope.row.status === 0">通过</el-button>
          <el-button 
            size="small" 
            type="danger" 
            @click="handleReject(scope.row)"
            v-if="scope.row.status === 0">驳回</el-button>
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
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
    <el-dialog title="发票申请详情" :visible.sync="detailVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="申请ID">{{ detail.orderInvoiceRequestId }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
        <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{ detail.email }}</el-descriptions-item>
        <el-descriptions-item label="发票抬头">
          {{ detail.invoiceTitle && detail.invoiceTitle.title || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(detail.status)">
            {{ getStatusText(detail.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="驳回原因" v-if="detail.status === 2">
          {{ detail.overrule }}
        </el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ detail.createTime }}</el-descriptions-item>
        <el-descriptions-item label="处理时间">{{ detail.updateTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 驳回对话框 -->
    <el-dialog title="驳回申请" :visible.sync="rejectVisible" width="500px">
      <el-form :model="rejectForm" :rules="rejectRules" ref="rejectForm" label-width="100px">
        <el-form-item label="驳回原因" prop="overrule">
          <el-input 
            type="textarea" 
            v-model="rejectForm.overrule" 
            :rows="3"
            placeholder="请输入驳回原因">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageOrderInvoiceRequest, passOrOverrule } from '@/api/OrderInvoiceRequest'

export default {
  name: 'OrderInvoiceRequestManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        type: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      rejectVisible: false,
      detail: {},
      rejectForm: {
        id: '',
        overrule: ''
      },
      rejectRules: {
        overrule: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const res = await pageOrderInvoiceRequest(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取发票申请列表失败:', error)
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
      this.detail = row
      this.detailVisible = true
    },

    // 通过申请
    handlePass(row) {
      this.$confirm('确认通过该发票申请？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await passOrOverrule(row.orderInvoiceRequestId, 1)
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.getList()
          }
        } catch (error) {
          console.error('操作失败:', error)
        }
      }).catch(() => {})
    },

    // 驳回申请
    handleReject(row) {
      this.rejectForm.id = row.orderInvoiceRequestId
      this.rejectForm.overrule = ''
      this.rejectVisible = true
    },

    // 提交驳回
    submitReject() {
      this.$refs.rejectForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await passOrOverrule(
              this.rejectForm.id,
              2,
              this.rejectForm.overrule
            )
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.rejectVisible = false
              this.getList()
            }
          } catch (error) {
            console.error('操作失败:', error)
          }
        }
      })
    },

    // 获取状态标签类型
    getStatusType(status) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return map[status] || ''
    },

    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: '待处理',
        1: '已处理',
        2: '已驳回'
      }
      return map[status] || '未知状态'
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
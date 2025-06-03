<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="queryParams.applyStatus" placeholder="请选择审核状态" clearable>
            <el-option label="审核中" :value="0"></el-option>
            <el-option label="审核通过" :value="1"></el-option>
            <el-option label="审核驳回" :value="2"></el-option>
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
      <el-table-column prop="userName" label="申请人" align="center"></el-table-column>
      <el-table-column prop="accountType" label="账户类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.accountType === 0 ? 'primary' : 'success'">
            {{ scope.row.accountType === 0 ? '企业账户' : '个人账户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系人" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="settlementCycle" label="结算周期" align="center">
        <template slot-scope="scope">
          {{ getSettlementCycleText(scope.row.settlementCycle) }}
        </template>
      </el-table-column>
      <el-table-column prop="minimumAmount" label="每月最低寄件量" align="center"></el-table-column>
      <el-table-column prop="applyStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.applyStatus)">
            {{ getStatusText(scope.row.applyStatus) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">查看</el-button>
          <el-button 
            v-if="scope.row.applyStatus === 0"
            size="small" 
            type="success" 
            @click="handleAudit(scope.row)">审核</el-button>
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
    <el-dialog :title="'申请详情'" :visible.sync="detailVisible" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="申请人">{{ detail.userName }}</el-descriptions-item>
        <el-descriptions-item label="账户类型">
          {{ detail.accountType === 0 ? '企业账户' : '个人账户' }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人">{{ detail.name }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ detail.phone }}</el-descriptions-item>
        <el-descriptions-item label="联系地址">{{ detail.address }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{ detail.email }}</el-descriptions-item>
        <el-descriptions-item label="月结起始日期">{{ detail.startTime }}</el-descriptions-item>
        <el-descriptions-item label="月结截止日期">{{ detail.endTime }}</el-descriptions-item>
        <el-descriptions-item label="每月最低寄件量">{{ detail.minimumAmount }}</el-descriptions-item>
        <el-descriptions-item label="结算周期">
          {{ getSettlementCycleText(detail.settlementCycle) }}
        </el-descriptions-item>
        <el-descriptions-item label="发票要求">
          {{ getInvoiceText(detail.invoiceRequirement) }}
        </el-descriptions-item>
        <el-descriptions-item label="特殊要求">{{ detail.remark }}</el-descriptions-item>
      </el-descriptions>
      <div class="image-preview" v-if="detail.accountType === 1">
        <div class="image-item">
          <p>身份证人像面</p>
          <el-image 
            style="width: 200px" 
            :src="detail.idCardPortraitPhoto" 
            :preview-src-list="[detail.idCardPortraitPhoto]">
          </el-image>
        </div>
        <div class="image-item">
          <p>身份证国徽面</p>
          <el-image 
            style="width: 200px" 
            :src="detail.idCardEmblemPhoto" 
            :preview-src-list="[detail.idCardEmblemPhoto]">
          </el-image>
        </div>
      </div>
      <div class="image-preview" v-else>
        <div class="image-item">
          <p>营业执照</p>
          <el-image 
            style="width: 200px" 
            :src="detail.businessLicense" 
            :preview-src-list="[detail.businessLicense]">
          </el-image>
        </div>
      </div>
    </el-dialog>

    <!-- 审核对话框 -->
    <el-dialog :title="'申请审核'" :visible.sync="auditVisible" width="500px">
      <el-form :model="auditForm" ref="auditForm" label-width="100px">
        <el-form-item label="审核结果">
          <el-radio-group v-model="auditForm.type">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回理由" v-if="auditForm.type === 2">
          <el-input type="textarea" v-model="auditForm.overrule"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAudit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageMonthlySettlementApply, deleteMonthlySettlementApply, passOrOverrule } from '@/api/MonthlySettlementApply'

export default {
  name: 'MonthlySettlementApplyManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        applyStatus: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      auditVisible: false,
      detail: {},
      auditForm: {
        id: '',
        type: 1,
        overrule: '',
        pereviewerId: 'admin' // 这里应该使用当前登录用户的ID
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
        const res = await pageMonthlySettlementApply(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      } catch (error) {
        console.error('获取月结申请列表失败:', error)
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
      this.queryParams.applyStatus = ''
      this.handleSearch()
    },

    // 查看详情
    handleDetail(row) {
      this.detail = { ...row }
      this.detailVisible = true
    },

    // 审核
    handleAudit(row) {
      this.auditForm.id = row.applyId
      this.auditForm.type = 1
      this.auditForm.overrule = ''
      this.auditVisible = true
    },

    // 提交审核
    async submitAudit() {
      try {
        const res = await passOrOverrule(this.auditForm)
        if (res.code === 200) {
          this.$message.success('审核成功')
          this.auditVisible = false
          this.getList()
        }
      } catch (error) {
        console.error('审核失败:', error)
      }
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该申请记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteMonthlySettlementApply(row.applyId)
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

    // 获取状态类型
    getStatusType(status) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return map[status] || 'info'
    },

    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: '审核中',
        1: '已通过',
        2: '已驳回'
      }
      return map[status] || '未知状态'
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
.image-preview {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.image-item {
  text-align: center;
}
.image-item p {
  margin-bottom: 10px;
}
</style> 
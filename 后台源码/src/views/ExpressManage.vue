<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="快递名称">
          <el-input v-model="queryParams.expressName" placeholder="请输入快递名称"></el-input>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="queryParams.deliveryType" placeholder="请输入快递公司"></el-input>
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
      <el-table-column prop="expressId" label="快递ID" align="center"></el-table-column>
      <el-table-column prop="expressName" label="快递名称" align="center"></el-table-column>
      <el-table-column prop="deliveryType" label="快递公司" align="center"></el-table-column>
      <el-table-column prop="profit" label="利润" align="center">
        <template slot-scope="scope">
          {{ scope.row.profit }}%
        </template>
      </el-table-column>
      <el-table-column prop="isClose" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isClose"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改利润</el-button>
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

    <!-- 修改利润对话框 -->
    <el-dialog :title="'修改利润'" :visible.sync="dialogVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="快递名称">
          <span>{{ form.expressName }}</span>
        </el-form-item>
        <el-form-item label="快递公司">
          <span>{{ form.deliveryType }}</span>
        </el-form-item>
        <el-form-item label="利润" prop="profit">
          <el-input-number 
            v-model="form.profit" 
            :precision="2" 
            :step="0.01" 
            :min="0"
            :max="100"
            controls-position="right">
          </el-input-number>
          <span class="unit">%</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageExpress, updateExpress } from '@/api/Express'

export default {
  name: 'ExpressManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        expressName: '',
        deliveryType: ''
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      form: {
        expressId: '',
        expressName: '',
        deliveryType: '',
        profit: 0
      },
      rules: {
        profit: [
          { required: true, message: '请输入利润', trigger: 'blur' }
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
        const res = await pageExpress(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取快递公司列表失败:', error)
      }
    },

    // 搜索
    handleSearch() {
      this.queryParams.pageIndex = 1
      this.getList()
    },

    // 重置
    resetQuery() {
      this.queryParams.expressName = ''
      this.queryParams.deliveryType = ''
      this.handleSearch()
    },

    // 修改利润
    handleEdit(row) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.form = { ...row }
      })
    },

    // 切换状态
    async handleStatusChange(row) {
      try {
        const res = await updateExpress(row)
        if (res.code === 200) {
          this.$message.success('状态更新成功')
          this.getList()
        }
      } catch (error) {
        console.error('状态更新失败:', error)
      }
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const res = await updateExpress(this.form)
            if (res.code === 200) {
              this.$message.success('利润修改成功')
              this.dialogVisible = false
              this.getList()
            }
          } catch (error) {
            console.error('利润修改失败:', error)
          }
        }
      })
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
.unit {
  margin-left: 10px;
}
</style> 
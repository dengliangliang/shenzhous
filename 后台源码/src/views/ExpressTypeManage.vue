<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="类型名称">
          <el-input v-model="queryParams.expressTypeName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="success" @click="handleAdd">新增</el-button>
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
      <el-table-column prop="typeId" label="类型ID" align="center"></el-table-column>
      <el-table-column prop="typeName" label="类型名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
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

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="form.typeName" placeholder="请输入类型名称"></el-input>
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
import { pageExpressType, addExpressType, updateExpressType, deleteExpressType } from '@/api/ExpressType'

export default {
  name: 'ExpressTypeManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        expressTypeName: ''
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        typeId: '',
        typeName: ''
      },
      rules: {
        typeName: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
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
        const res = await pageExpressType(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取寄件类型列表失败:', error)
      }
    },

    // 搜索
    handleSearch() {
      this.queryParams.pageIndex = 1
      this.getList()
    },

    // 重置
    resetQuery() {
      this.queryParams.expressTypeName = ''
      this.handleSearch()
    },

    // 新增
    handleAdd() {
      this.dialogTitle = '新增寄件类型'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          typeId: '',
          typeName: ''
        }
      })
    },

    // 编辑
    handleEdit(row) {
      this.dialogTitle = '编辑寄件类型'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.form = { ...row }
      })
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const api = this.form.typeId ? updateExpressType : addExpressType
            const res = await api(this.form)
            if (res.code === 200) {
              this.$message.success(this.form.typeId ? '更新成功' : '新增成功')
              this.dialogVisible = false
              this.getList()
            }
          } catch (error) {
            console.error(this.form.typeId ? '更新失败:' : '新增失败:', error)
          }
        }
      })
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该寄件类型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteExpressType(row.typeId)
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
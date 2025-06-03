<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="实名状态">
          <el-select v-model="queryParams.isReal" placeholder="请选择实名状态">
            <el-option label="未实名" value="0"></el-option>
            <el-option label="审核中" value="1"></el-option>
            <el-option label="已实名" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
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
      <!-- <el-table-column prop="userId" label="用户ID"  align="center"></el-table-column> -->
      <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
      <el-table-column prop="phone" label="电话号码"  align="center"></el-table-column>
      <el-table-column prop="identification" label="身份证号"  align="center"></el-table-column>
      <el-table-column prop="money" label="佣金金额"  align="center"></el-table-column>
      <el-table-column prop="isReal" label="实名状态"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isReal === 2 ? 'success' : scope.row.isReal === 1 ? 'warning' : 'info'">
            {{ scope.row.isReal === 2 ? '已实名' : scope.row.isReal === 1 ? '审核中' : '未实名' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isMonth" label="月结资格"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isMonth === 1 ? 'success' : 'info'">
            {{ scope.row.isMonth === 1 ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"  align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
         <!-- <el-button 
            size="small" 
            type="success" 
            v-if="scope.row.isReal === 1"
            @click="handleVerify(scope.row)">审核实名</el-button> -->
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

    <!-- 编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!form.userId">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identification">
          <el-input v-model="form.identification"></el-input>
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
import { pageUser, updateUser, deleteUser } from '@/api/User'

export default {
  name: 'NormalUserManage',
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        isReal: '',
        identity: 1  // 普通用户
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        userId: '',
        userName: '',
        password: '',
        phone: '',
        identification: '',
        isMonth: 0,
        identity: 1
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        identification: [{ required: true, message: '请输入身份证号', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取用户列表
    async getList() {
      try {
        const res = await pageUser(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      } catch (error) {
        console.error('获取用户列表失败:', error)
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
      this.queryParams.isReal = ''
      this.handleSearch()
    },

    // 编辑
    handleEdit(row) {
      this.dialogTitle = '编辑用户'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = { ...row }
      })
    },

    // 审核实名
    handleVerify(row) {
      this.$confirm('确认通过该用户的实名认证吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const updateData = { ...row, isReal: 2 }
          const res = await updateUser(updateData)
          if (res.code === 200) {
            this.$message.success('审核通过')
            this.getList()
          }
        } catch (error) {
          console.error('审核失败:', error)
        }
      }).catch(() => {})
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteUser(row.userId)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          }
        } catch (error) {
          console.error('删除失败:', error)
        }
      }).catch(() => {})
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const api = this.form.userId ? updateUser : addUser
            const res = await api(this.form)
            if (res.code === 200) {
              this.$message.success(this.form.userId ? '更新成功' : '新增成功')
              this.dialogVisible = false
              this.getList()
            }
          } catch (error) {
            console.error(this.form.userId ? '更新失败:' : '新增失败:', error)
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
    },

    // 新增
    handleAdd() {
      this.dialogTitle = '新增用户'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          userId: '',
          userName: '',
          password: '',
          phone: '',
          identification: '',
          isMonth: 0,
          identity: 1
        }
      })
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
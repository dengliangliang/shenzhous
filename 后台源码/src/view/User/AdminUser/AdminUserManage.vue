<template>
  <div class="container">
    <!-- 全屏加载动画 -->
    <delivery-loading 
      v-if="fullscreenLoading" 
      :fullscreen="true" 
      :progress="loadingProgress" 
      text="管理员数据加载中...">
    </delivery-loading>
    
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="实名状态">
          <el-select v-model="queryParams.isReal" placeholder="请选择实名状态">
            <el-option label="未实名" value="0"></el-option>
            <el-option label="审核中" value="1"></el-option>
            <el-option label="已实名" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :loading="loadingStates.search">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="handleAdd">新增管理员</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div style="position: relative;">
      <!-- 表格加载动画 -->
      <delivery-loading v-if="loadingStates.table"></delivery-loading>
      
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="编号" width="55" align="center">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="userId" label="用户ID"  align="center"></el-table-column>  -->
        <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
        <el-table-column prop="phone" label="电话号码"  align="center"></el-table-column>
        <!-- <el-table-column prop="identification" label="身份证号" width="180" align="center"></el-table-column> -->
        <!-- <el-table-column prop="isReal" label="实名状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isReal === 2 ? 'success' : scope.row.isReal === 1 ? 'warning' : 'info'">
              {{ scope.row.isReal === 2 ? '已实名' : scope.row.isReal === 1 ? '审核中' : '未实名' }}
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button 
              size="small" 
              @click="handleEdit(scope.row)"
              :loading="loadingStates['edit_'+scope.row.userId]">编辑</el-button>
            <el-button 
              size="small" 
              type="warning" 
              @click="handleResetPassword(scope.row)"
              :loading="loadingStates['resetPwd_'+scope.row.userId]">重置密码</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(scope.row)"
              :loading="loadingStates['delete_'+scope.row.userId]">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
      <div style="position: relative;">
        <!-- 表单加载动画 -->
        <delivery-loading v-if="loadingStates.form" text="加载表单数据..."></delivery-loading>
        
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
          <!-- <el-form-item label="身份证号" prop="identification">
            <el-input v-model="form.identification"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading="loadingStates.submit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码对话框 -->
    <el-dialog title="重置密码" :visible.sync="resetPwdDialogVisible" width="400px">
      <div style="position: relative;">
        <!-- 表单加载动画 -->
        <delivery-loading v-if="loadingStates.resetPwdForm" text="处理中..."></delivery-loading>
        
        <el-form :model="resetPwdForm" :rules="resetPwdRules" ref="resetPwdForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="resetPwdForm.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="resetPwdForm.newPassword" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="resetPwdForm.confirmPassword" type="password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitResetPwd" :loading="loadingStates.resetPwdSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageUser, addUser, updateUser, deleteUser, changeNewPassword } from '@/api/User'
import DeliveryLoading from '@/components/common/DeliveryLoading'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  name: 'AdminUserManage',
  components: {
    DeliveryLoading
  },
  mixins: [loadingMixin],
  data() {
    // 自定义验证规则：确认密码必须与新密码一致
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.resetPwdForm.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        isReal: '',
        identity: 0  // 管理员用户
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
        identity: 0
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        // identification: [{ required: true, message: '请输入身份证号', trigger: 'blur' }]
      },
      resetPwdDialogVisible: false,
      resetPwdForm: {
        userId: '',
        userName: '',
        newPassword: '',
        confirmPassword: ''
      },
      resetPwdRules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 开始全屏加载
    this.startFullscreenLoading();
    
    // 加载数据
    this.getList().finally(() => {
      // 停止全屏加载
      this.stopFullscreenLoading();
    });
  },
  methods: {
    // 获取用户列表
    async getList() {
      return this.loadDataWithLoading(
        () => pageUser(this.queryParams),
        'table',
        data => {
          this.tableData = data.dataList;
          this.total = data.totalPages;
        },
        '获取管理员列表失败'
      );
    },

    // 搜索
    async handleSearch() {
      this.queryParams.pageIndex = 1;
      // 使用独立的搜索加载状态
      this.setAreaLoading('search', true);
      try {
        await this.getList();
      } finally {
        this.setAreaLoading('search', false);
      }
    },

    // 重置
    resetQuery() {
      this.queryParams.userName = '';
      this.queryParams.isReal = '';
      this.handleSearch();
    },

    // 新增
    handleAdd() {
      this.dialogTitle = '新增管理员';
      this.dialogVisible = true;
      
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form = {
          userId: '',
          userName: '',
          password: '',
          phone: '',
          identification: '',
          identity: 0
        };
      });
    },

    // 编辑
    handleEdit(row) {
      const loadingKey = 'edit_' + row.userId;
      this.setAreaLoading(loadingKey, true);
      this.setAreaLoading('form', true);
      
      this.dialogTitle = '编辑管理员';
      this.dialogVisible = true;
      
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form = { ...row };
        
        // 短暂延迟后关闭加载动画
        setTimeout(() => {
          this.setAreaLoading('form', false);
          this.setAreaLoading(loadingKey, false);
        }, 500);
      });
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const loadingKey = 'delete_' + row.userId;
        
        this.loadDataWithLoading(
          () => deleteUser(row.userId),
          loadingKey,
          () => {
            this.$message.success('删除成功');
            this.getList();
          },
          '删除管理员失败'
        );
      }).catch(() => {});
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loadDataWithLoading(
            () => {
              const api = this.form.userId ? updateUser : addUser;
              return api(this.form);
            },
            'submit',
            () => {
              this.$message.success(this.form.userId ? '更新成功' : '新增成功');
              this.dialogVisible = false;
              this.getList();
            },
            this.form.userId ? '更新管理员信息失败' : '新增管理员失败'
          );
        }
      });
    },

    // 处理重置密码
    handleResetPassword(row) {
      const loadingKey = 'resetPwd_' + row.userId;
      this.setAreaLoading(loadingKey, true);
      this.setAreaLoading('resetPwdForm', true);
      
      this.resetPwdDialogVisible = true;
      
      this.$nextTick(() => {
        this.$refs.resetPwdForm && this.$refs.resetPwdForm.resetFields();
        this.resetPwdForm.userId = row.userId;
        this.resetPwdForm.userName = row.userName;
        this.resetPwdForm.newPassword = '';
        this.resetPwdForm.confirmPassword = '';
        
        // 短暂延迟后关闭加载动画
        setTimeout(() => {
          this.setAreaLoading('resetPwdForm', false);
          this.setAreaLoading(loadingKey, false);
        }, 300);
      });
    },
    
    // 提交重置密码
    submitResetPwd() {
      this.$refs.resetPwdForm.validate((valid) => {
        if (valid) {
          this.loadDataWithLoading(
            () => {
              return changeNewPassword({
                userId: this.resetPwdForm.userId,
                newPassword: this.resetPwdForm.newPassword
              });
            },
            'resetPwdSubmit',
            () => {
              this.$message.success('密码重置成功');
              this.resetPwdDialogVisible = false;
            },
            '密码重置失败'
          );
        }
      });
    },

    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.queryParams.pageIndex = val;
      this.getList();
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  position: relative;
}
.search-wrapper {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style> 
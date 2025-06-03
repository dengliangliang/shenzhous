<template>
  <div class="container">
    <!-- 工具栏 -->
    <div class="toolbar-wrapper">
      <el-button type="primary" @click="handleAdd">新增协议</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" width="55" align="center">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="agreementId" label="协议ID" align="center"></el-table-column>
      <el-table-column prop="agreementType" label="协议类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="getAgreementTypeTag(scope.row.agreementType)">
            {{ getAgreementTypeText(scope.row.agreementType) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="success" @click="handlePreview(scope.row)">预览</el-button>
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
    <el-dialog 
      :title="form.agreementId ? '编辑协议' : '新增协议'" 
      :visible.sync="dialogVisible" 
      width="1200px"
      :before-close="handleClose"
      class="agreement-dialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="agreement-form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="协议类型" prop="agreementType">
              <el-select v-model="form.agreementType" placeholder="请选择协议类型" style="width: 100%">
                <el-option label="隐私协议" value="0">
                  <i class="el-icon-lock"></i>
                  <span>隐私协议</span>
                </el-option>
                <el-option label="快递协议" value="1">
                  <i class="el-icon-truck"></i>
                  <span>快递协议</span>
                </el-option>
                <el-option label="违禁品说明" value="2">
                  <i class="el-icon-warning"></i>
                  <span>违禁品说明</span>
                </el-option>
                <el-option label="用户协议" value="3">
                  <i class="el-icon-user"></i>
                  <span>用户协议</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="协议内容" prop="context">
          <div class="editor-wrapper">
            <mavon-editor 
              v-model="form.context"
              :toolbars="markdownOption"
              @save="handleSave"
              :boxShadow="false"
              placeholder="请输入协议内容..."
              :style="{height: '600px'}"
              class="custom-editor"/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="medium">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览对话框 -->
    <el-dialog 
      title="协议预览" 
      :visible.sync="previewVisible" 
      width="1000px"
      class="preview-dialog">
      <div class="preview-header">
        <el-tag :type="getAgreementTypeTag(form.agreementType)" size="medium">
          {{ getAgreementTypeText(form.agreementType) }}
        </el-tag>
      </div>
      <div class="markdown-body preview-content" v-html="compiledMarkdown"></div>
    </el-dialog>
  </div>
</template>

<script>
import { pageAgreement, addAgreement, updateAgreement } from '@/api/Agreement'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import showdown from 'showdown'
import 'github-markdown-css'

export default {
  name: 'AgreementManage',
  components: {
    mavonEditor
  },
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      previewVisible: false,
      form: {
        agreementId: '',
        agreementType: '',
        context: ''
      },
      rules: {
        agreementType: [
          { required: true, message: '请选择协议类型', trigger: 'change' }
        ],
        context: [
          { required: true, message: '请输入协议内容', trigger: 'blur' }
        ]
      },
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: true,
        navigation: true
      },
      compiledMarkdown: '',
      converter: new showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
      })
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const res = await pageAgreement(this.queryParams)
        if (res.code === 200) {
          this.tableData = res.data.dataList
          this.total = res.data.totalPages
        }
      } catch (error) {
        console.error('获取协议列表失败:', error)
      }
    },

    // 编辑
    handleEdit(row) {
      this.dialogVisible = true
      this.$nextTick(() => {
        if (row) {
          this.form = { ...row }
        } else {
          this.form = {
            agreementId: '',
            agreementType: '',
            context: ''
          }
        }
      })
    },

    // 预览
    handlePreview(row) {
      this.compiledMarkdown = this.converter.makeHtml(row.context || '')
      this.previewVisible = true
    },

    // 保存
    handleSave(value, render) {
      this.form.context = value
    },

    // 关闭对话框
    handleClose() {
      this.$confirm('确认关闭？未保存的数据将会丢失', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
        this.$refs.form.resetFields()
      }).catch(() => {})
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const api = this.form.agreementId ? updateAgreement : addAgreement
            const res = await api(this.form)
            if (res.code === 200) {
              this.$message.success(this.form.agreementId ? '更新成功' : '新增成功')
              this.dialogVisible = false
              this.getList()
            }
          } catch (error) {
            console.error(this.form.agreementId ? '更新失败:' : '新增失败:', error)
          }
        }
      })
    },

    // 获取协议类型标签样式
    getAgreementTypeTag(type) {
      const map = {
        '0': 'success',
        '1': 'primary',
        '2': 'warning',
        '3': 'info'
      }
      return map[type] || ''
    },

    // 获取协议类型文本
    getAgreementTypeText(type) {
      const map = {
        '0': '隐私协议',
        '1': '快递协议',
        '2': '违禁品说明',
        '3': '用户协议'
      }
      return map[type] || '未知类型'
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
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = {
          agreementId: '',
          agreementType: '',
          context: ''
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
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
.markdown-body {
  padding: 20px;
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
}
.toolbar-wrapper {
  margin-bottom: 20px;
}
.agreement-dialog {
  /* Add your styles here */
}
.agreement-form {
  /* Add your styles here */
}
.editor-wrapper {
  /* Add your styles here */
}
.custom-editor {
  /* Add your styles here */
}
.preview-dialog {
  /* Add your styles here */
}
.preview-header {
  /* Add your styles here */
}
.preview-content {
  /* Add your styles here */
}
</style> 
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-bell"></i> 系统管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 搜索和操作按钮 -->
            <div class="handle-box">
                <el-select v-model="query.type" placeholder="公告类型" class="handle-select mr10">
                    <el-option label="更新公告" :value="0"></el-option>
                    <el-option label="新增公告" :value="1"></el-option>
                    <el-option label="通知公告" :value="2"></el-option>
                    <el-option label="维护公告" :value="3"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增公告</el-button>
            </div>
            
            <!-- 数据表格 -->
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="title" label="公告标题"></el-table-column>
                <el-table-column prop="content" label="公告内容" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="公告类型" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="getNoticeTagType(scope.row.type)">
                            {{ getNoticeTagText(scope.row.type) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页器 -->
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageNum"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="公告类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择公告类型">
                        <el-option label="更新公告" :value="0"></el-option>
                        <el-option label="新增公告" :value="1"></el-option>
                        <el-option label="通知公告" :value="2"></el-option>
                        <el-option label="维护公告" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input type="textarea" v-model="form.content" :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNotice">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { pageNotice, addNotice, updateNotice, deleteNotice } from '@/api/Notice'

export default {
    name: 'NoticeManage',
    data() {
        return {
            query: {
                pageNum: 1,
                pageSize: 10,
                type: ''
            },
            tableData: [],
            pageTotal: 0,
            editVisible: false,
            dialogTitle: '',
            form: {
                noticeId: '',
                title: '',
                content: '',
                type: ''
            },
            rules: {
                title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
                type: [{ required: true, message: '请选择公告类型', trigger: 'change' }],
                content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        // 获取数据
        async getData() {
            try {
                const res = await pageNotice(this.query)
                if (res.code === 200) {
                    this.tableData = res.data.dataList
                    this.pageTotal = res.data.totalPages
                }
            } catch (error) {
                console.error('获取公告列表失败:', error)
            }
        },
        
        // 获取公告标签类型
        getNoticeTagType(type) {
            const types = {
                0: 'success',
                1: 'primary',
                2: 'warning',
                3: 'info'
            }
            return types[type] || 'info'
        },
        
        // 获取公告标签文本
        getNoticeTagText(type) {
            const texts = {
                0: '更新',
                1: '新增',
                2: '通知',
                3: '维护'
            }
            return texts[type] || '通知'
        },
        
        // 处理页码改变
        handlePageChange(val) {
            this.query.pageNum = val
            this.getData()
        },
        
        // 打开新增弹窗
        handleAdd() {
            this.dialogTitle = '新增公告'
            this.form = {
                noticeId: '',
                title: '',
                content: '',
                type: ''
            }
            this.editVisible = true
        },
        
        // 打开编辑弹窗
        handleEdit(row) {
            this.dialogTitle = '编辑公告'
            this.form = JSON.parse(JSON.stringify(row))
            this.editVisible = true
        },
        
        // 保存公告
        saveNotice() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    try {
                        const api = this.form.noticeId ? updateNotice : addNotice
                        const res = await api(this.form)
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                            this.editVisible = false
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    } catch (error) {
                        console.error('保存公告失败:', error)
                        this.$message.error('操作失败')
                    }
                }
            })
        },
        
        // 删除公告
        handleDelete(row) {
            this.$confirm('确定要删除这条公告吗？', '提示', {
                type: 'warning'
            }).then(async () => {
                try {
                    const res = await deleteNotice(row.noticeId)
                    if (res.code === 200) {
                        this.$message.success('删除成功')
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                } catch (error) {
                    console.error('删除公告失败:', error)
                    this.$message.error('删除失败')
                }
            }).catch(() => {})
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table {
    width: 100%;
    font-size: 14px;
}
.pagination {
    margin: 20px 0;
    text-align: right;
}
</style> 
<template>
  <div class="container">
    <!-- 全屏加载动画 -->
    <delivery-loading 
      v-if="fullscreenLoading" 
      :fullscreen="true" 
      :progress="loadingProgress" 
      text="订单数据加载中...">
    </delivery-loading>

    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="支付方式">
          <el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
            <el-option label="在线支付" :value="0"></el-option>
            <el-option label="月结" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运送状态">
          <el-select v-model="queryParams.shippingStatus" placeholder="请选择运送状态" clearable>
            <el-option label="待取件" :value="0"></el-option>
            <el-option label="运送中" :value="1"></el-option>
            <el-option label="已送达" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable>
            <el-option label="待支付" :value="0"></el-option>
            <el-option label="已支付" :value="1"></el-option>
            <el-option label="已取消" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-container" style="position: relative;">
      <!-- 表格加载动画 -->
      <delivery-loading v-if="loadingStates.table"></delivery-loading>
      
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="编号" width="55" align="center">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="易达订单号" align="center"></el-table-column>
        <el-table-column prop="deliveryId" label="运单号" align="center"></el-table-column>
        <!-- 其他列... -->
        <el-table-column label="操作" width="320" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleDetail(scope.row)">查看</el-button>
            <el-button 
              size="small" 
              type="success" 
              v-if="scope.row.shipping_status !== 10"
              @click="handleViewLogistics(scope.row)">查看物流</el-button>
            <el-button 
              size="small" 
              type="warning" 
              v-if="scope.row.orderPriceDifference !== 0 && scope.row.orderPriceDifference !== '0.00' && scope.row.isPriceDifferencePaid === 0"
              @click="handleRemindPayDiff(scope.row)">提醒补差价</el-button>
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
    </div>

    <!-- 详情对话框 -->
    <el-dialog :title="'订单详情'" :visible.sync="detailVisible" width="800px">
      <div style="position: relative;">
        <!-- 详情加载动画 -->
        <delivery-loading v-if="loadingStates.detail"></delivery-loading>
        
        <el-descriptions :column="2" border>
          <!-- 详情内容... -->
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageOrder, deleteOrder, getOrderDetail } from '@/api/Order'
import DeliveryLoading from '@/components/common/DeliveryLoading'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  name: 'OrderManageWithLoading',
  components: {
    DeliveryLoading
  },
  mixins: [loadingMixin], // 混入加载状态管理
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        paymentMethod: '',
        shippingStatus: '',
        isPriceDifferencePaid: '',
        orderStatus: '',
        userId: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      detail: {}
    }
  },
  created() {
    // 开始全屏加载
    this.startFullscreenLoading();
    
    // 加载数据
    this.getList().finally(() => {
      // 关闭全屏加载
      this.stopFullscreenLoading();
    });
  },
  methods: {
    // 获取列表
    async getList() {
      // 使用mixin中的加载方法
      return this.loadDataWithLoading(
        () => pageOrder(this.queryParams), 
        'table',
        (data) => {
          this.tableData = data.dataList;
          this.total = data.totalPages;
        },
        '获取订单列表失败'
      );
    },

    // 搜索
    handleSearch() {
      this.queryParams.pageIndex = 1;
      this.getList();
    },

    // 重置
    resetQuery() {
      this.queryParams.paymentMethod = '';
      this.queryParams.shippingStatus = '';
      this.queryParams.isPriceDifferencePaid = '';
      this.queryParams.orderStatus = '';
      this.handleSearch();
    },

    // 查看详情
    async handleDetail(row) {
      this.detailVisible = true;
      this.detail = { ...row }; // 先显示基本信息
      
      // 加载详细信息
      this.loadDataWithLoading(
        () => getOrderDetail(row.orderId),
        'detail',
        (data) => {
          this.detail = data;
        },
        '获取订单详情失败'
      );
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确认要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loadDataWithLoading(
          () => deleteOrder(row.orderId),
          'delete',
          () => {
            this.$message.success('删除成功');
            this.getList();
          },
          '删除失败'
        );
      }).catch(() => {});
    },

    // 查看物流
    handleViewLogistics(row) {
      this.$message.info('查看物流功能, 订单ID: ' + row.orderId);
      // 这里实现查看物流的逻辑
    },

    // 提醒补差价
    handleRemindPayDiff(row) {
      this.$confirm(`确认要提醒用户补差价吗？差价金额: ${row.orderPriceDifference}元`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里实现发送提醒的逻辑
        this.$message.success('提醒已发送');
      }).catch(() => {});
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
.table-container {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style> 
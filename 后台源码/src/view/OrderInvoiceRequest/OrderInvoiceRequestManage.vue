<template>
  <div class="container">
    <!-- 全屏加载动画 -->
    <delivery-loading 
      v-if="fullscreenLoading" 
      :fullscreen="true" 
      :progress="loadingProgress" 
      text="发票申请数据加载中...">
    </delivery-loading>
    
    <!-- 搜索区域 -->
    <div class="search-wrapper">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
       <!-- <el-form-item label="用户名">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名"></el-input>
        </el-form-item> -->
        <el-form-item label="申请状态">
          <el-select v-model="queryParams.type" placeholder="请选择状态" clearable>
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="已处理" :value="1"></el-option>
            <el-option label="已驳回" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :loading="loadingStates.search">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
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
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <!-- <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column> -->
        <el-table-column prop="invoiceType" label="发票类型" align="center">
          <template slot-scope="scope">
            {{ getInvoiceTypeText(scope.row.invoiceType) }}
          </template>
        </el-table-column>
        <el-table-column prop="companiesName" label="企业名称/抬头" align="center"></el-table-column>
        <el-table-column prop="type" label="申请类型" align="center">
          <template slot-scope="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单差价" align="center">
          <template slot-scope="scope">
            <el-tag v-if="orderPriceDifferenceMap[scope.row.orderId]" 
                  :type="getPriceDifferenceType(orderPriceDifferenceMap[scope.row.orderId])">
              {{ getPriceDifferenceText(orderPriceDifferenceMap[scope.row.orderId]) }}
            </el-tag>
            <span v-else>
              <el-button type="text" size="mini" @click="loadOrderPriceDifference(scope.row)" :loading="loadingStates['price_'+scope.row.orderId]">
                加载差价信息
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button 
              size="small" 
              type="primary" 
              @click="handleUpdateStatus(scope.row)"
              :loading="loadingStates['update_'+scope.row.orderInvoiceRequestId]">修改状态</el-button>
            <el-button 
              size="small" 
              type="primary" 
              @click="handleDetail(scope.row)"
              :loading="loadingStates['detail_'+scope.row.orderInvoiceRequestId]">详情</el-button>
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

    <!-- 详情对话框 -->
    <el-dialog title="发票申请详情" :visible.sync="detailVisible" width="700px">
      <div style="position: relative;">
        <!-- 详情加载动画 -->
        <delivery-loading v-if="loadingStates.detailContent" text="加载发票申请详情..."></delivery-loading>
        
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名">{{ detail.userName }}</el-descriptions-item>
          <el-descriptions-item label="订单ID">{{ detail.orderId }}</el-descriptions-item>
          <el-descriptions-item label="发票类型">{{ getInvoiceTypeText(detail.invoiceType) }}</el-descriptions-item>
          <el-descriptions-item label="申请类型">{{ getTypeText(detail.type) }}</el-descriptions-item>
          <el-descriptions-item label="发票抬头">
            {{ detail.companiesName || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="税号" v-if="detail.type === 0">{{ detail.taxNumber || '-' }}</el-descriptions-item>
          <el-descriptions-item label="企业地址" v-if="detail.type === 0">{{ detail.companyAddress || '-' }}</el-descriptions-item>
          <el-descriptions-item label="企业电话" v-if="detail.type === 0">{{ detail.citycompanyTel || '-' }}</el-descriptions-item>
          <el-descriptions-item label="银行账户" v-if="detail.type === 0">{{ detail.bankAccount || '-' }}</el-descriptions-item>
          <el-descriptions-item label="开户行" v-if="detail.type === 0">{{ detail.bankName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="备注信息" :span="detail.remark ? 2 : 1">{{ detail.remark || '-' }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(detail.status)">
              {{ getStatusText(detail.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="驳回原因" v-if="detail.status === 2">
            {{ detail.overrule }}
          </el-descriptions-item>
          <el-descriptions-item label="发票图片" v-if="detail.invoicePhoto">
            <!-- 图片预览 -->
            <el-image v-if="getFileType(detail.invoicePhoto) === 'image'" 
              style="width: 100px; height: 100px" 
              :src="$globalParam.apiUrl + detail.invoicePhoto" 
              :preview-src-list="[$globalParam.apiUrl + detail.invoicePhoto]">
            </el-image>
            <!-- PDF文件显示 -->
            <div v-else-if="getFileType(detail.invoicePhoto) === 'pdf'" class="pdf-preview-small">
              <i class="el-icon-document file-icon"></i>
              <div class="file-name">{{ getFileName(detail.invoicePhoto) }}</div>
              <el-button type="text" @click="previewPdf(detail.invoicePhoto)">预览</el-button>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="申请时间">{{ detail.createTime }}</el-descriptions-item>
          <el-descriptions-item label="处理时间">{{ detail.updateTime }}</el-descriptions-item>
        </el-descriptions>

        <!-- 订单信息 -->
        <div v-if="detail.orderInfo" style="margin-top: 20px;">
          <el-divider content-position="left">订单基本信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="易达订单号">{{ detail.orderInfo.orderNo || '-' }}</el-descriptions-item>
            <el-descriptions-item label="运单号">{{ detail.orderInfo.deliveryId || '-' }}</el-descriptions-item>
            <el-descriptions-item label="支付方式">
              <el-tag :type="getPaymentMethodType(detail.orderInfo)">
                {{ getPaymentMethodText(detail.orderInfo) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="运送状态">
              <el-tag :type="getShippingStatusType(detail.orderInfo.shippingStatus)">
                {{ getShippingStatusText(detail.orderInfo.shippingStatus) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="订单状态">
              <el-tag :type="getOrderStatusType(detail.orderInfo.orderStatus)">
                {{ getOrderStatusText(detail.orderInfo.orderStatus) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="差价状态" v-if="detail.orderInfo.orderPriceDifference">
              <el-tag :type="getPriceDifferenceType(detail.orderInfo)">
                {{ getPriceDifferenceText(detail.orderInfo) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">寄件人信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名">{{ detail.orderInfo.senderName || '-' }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ detail.orderInfo.senderPhone || '-' }}</el-descriptions-item>
            <el-descriptions-item label="地址" :span="2">
              {{ detail.orderInfo.senderProvince || '' }}{{ detail.orderInfo.senderCity || '' }}{{ detail.orderInfo.senderDistrict || '' }}{{ detail.orderInfo.senderDetailAddress || '' }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">收件人信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名">{{ detail.orderInfo.receiverName || '-' }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ detail.orderInfo.receiverPhone || '-' }}</el-descriptions-item>
            <el-descriptions-item label="地址" :span="2">
              {{ detail.orderInfo.receiverProvince || '' }}{{ detail.orderInfo.receiverCity || '' }}{{ detail.orderInfo.receiverDistrict || '' }}{{ detail.orderInfo.receiverDetailAddress || '' }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">物品信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="预估重量">{{ detail.orderInfo.estimatedItemWeight || '-' }} kg</el-descriptions-item>
            <el-descriptions-item label="实际重量">{{ detail.orderInfo.actualWeight || '-' }} kg</el-descriptions-item>
            <el-descriptions-item label="尺寸">{{ detail.orderInfo.length || '-' }}*{{ detail.orderInfo.width || '-' }}*{{ detail.orderInfo.height || '-' }} cm</el-descriptions-item>
            <el-descriptions-item label="保价金额">{{ detail.orderInfo.guaranteeValueAmount || '-' }} 元</el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">费用信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="保价费">{{ detail.orderInfo.insuranceFee ? detail.orderInfo.insuranceFee + '元' : '无' }} </el-descriptions-item>
            <el-descriptions-item label="佣金抵扣">{{ detail.orderInfo.commissionDeductionAmount ? detail.orderInfo.commissionDeductionAmount + '元' : '无' }}</el-descriptions-item>
            <el-descriptions-item label="订单总价">{{ detail.orderInfo.orderTotalPrice || '-' }} 元</el-descriptions-item>
            <el-descriptions-item label="抵扣后金额">{{ detail.orderInfo.amountAfterCommissionDeduction || '-' }} 元</el-descriptions-item>
            <el-descriptions-item label="差价金额" v-if="detail.orderInfo.orderPriceDifference">{{ detail.orderInfo.orderPriceDifference || '-' }} 元</el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">时间信息</el-divider>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="创建时间">{{ detail.orderInfo.createTime || '-' }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ detail.orderInfo.updateTime || '-' }}</el-descriptions-item>
            <el-descriptions-item label="取件时间范围" v-if="detail.orderInfo.pickUpStartTime">
              {{ detail.orderInfo.pickUpStartTime || '' }} - {{ detail.orderInfo.pickUpEndTime || '' }}
            </el-descriptions-item>
            <el-descriptions-item label="取件时间" v-if="detail.orderInfo.pickUpTime">
              {{ detail.orderInfo.pickUpTime || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="发货时间" v-if="detail.orderInfo.shippingTime">
              {{ detail.orderInfo.shippingTime || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="收货时间" v-if="detail.orderInfo.receivingTime">
              {{ detail.orderInfo.receivingTime || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-dialog>

    <!-- 状态修改对话框 -->
    <el-dialog title="修改申请状态" :visible.sync="statusUpdateVisible" width="500px">
      <el-form :model="statusForm" :rules="statusRules" ref="statusForm" label-width="100px">
        <el-form-item label="状态" prop="status">
          <el-select v-model="statusForm.status" placeholder="请选择状态">
            <el-option label="开票中" :value="0"></el-option>
            <el-option label="已开票" :value="1"></el-option>
            <el-option label="申请驳回" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驳回原因" prop="overrule" v-if="statusForm.status === 2">
          <el-input 
            type="textarea" 
            v-model="statusForm.overrule" 
            :rows="3"
            placeholder="请输入驳回原因">
          </el-input>
        </el-form-item>
        <el-form-item label="上传发票" prop="invoicePhoto" v-if="statusForm.status === 1">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="uploadInvoicePhoto"
            :show-file-list="false"
            :before-upload="beforeInvoiceUpload">
            <!-- 根据文件类型不同显示不同的预览 -->
            <div v-if="statusForm.invoicePhoto">
              <!-- 图片预览 -->
              <img v-if="getFileType(statusForm.invoicePhoto) === 'image'" 
                   :src="$globalParam.apiUrl + statusForm.invoicePhoto" 
                   class="avatar">
              <!-- PDF预览 -->
              <div v-else-if="getFileType(statusForm.invoicePhoto) === 'pdf'" class="pdf-preview">
                <i class="el-icon-document file-icon"></i>
                <div class="file-name">{{ getFileName(statusForm.invoicePhoto) }}</div>
                <el-button type="text" @click="previewPdf(statusForm.invoicePhoto)">预览</el-button>
              </div>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">可上传jpg/png/pdf文件，且不超过5MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="statusUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitStatusUpdate" :loading="loadingStates.submitStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageOrderInvoiceRequest, passOrOverrule } from '@/api/OrderInvoiceRequest'
import { orderFileUpload, deleteFile } from '@/api/File'
import { getOrderById } from '@/api/Order'
import DeliveryLoading from '@/components/common/DeliveryLoading'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  name: 'OrderInvoiceRequestManage',
  components: {
    DeliveryLoading
  },
  mixins: [loadingMixin],
  data() {
    return {
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userId: '',
        type: ''
      },
      tableData: [],
      total: 0,
      detailVisible: false,
      statusUpdateVisible: false,
      detail: {},
      statusForm: {
        id: '',
        status: '',
        overrule: '',
        invoicePhoto: ''
      },
      statusRules: {
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        overrule: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      },
      orderPriceDifferenceMap: {},
	  
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
    // 获取列表
    async getList() {
      return this.loadDataWithLoading(
        () => pageOrderInvoiceRequest(this.queryParams),
        'table',
        data => {
          this.tableData = data.dataList;
          this.total = data.totalPages;
          this.orderPriceDifferenceMap = {};
          this.loadAllOrderPriceDifferences();
        },
        '获取发票申请列表失败'
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
      // this.queryParams.userName = ''
      this.queryParams.type = '';
      this.handleSearch();
    },

    // 查看详情
    handleDetail(row) {
      const loadingKey = 'detail_' + row.orderInvoiceRequestId;
      this.setAreaLoading(loadingKey, true);
      
      this.detailVisible = true;
      this.setAreaLoading('detailContent', true);
      
      this.$nextTick(async () => {
        this.detail = { ...row };
        
        // 获取订单信息
        try {
          const orderRes = await getOrderById(row.orderId);
          if (orderRes.code === 200 && orderRes.data) {
            this.detail.orderInfo = orderRes.data;
          }
        } catch (error) {
          console.error('获取订单信息失败', error);
        }
        
        // 模拟加载延迟，显示加载效果
        setTimeout(() => {
          this.setAreaLoading('detailContent', false);
          this.setAreaLoading(loadingKey, false);
        }, 600);
      });
    },

    // 修改状态
    handleUpdateStatus(row) {
      const loadingKey = 'update_' + row.orderInvoiceRequestId;
      this.setAreaLoading(loadingKey, true);
      
      this.statusForm = {
        id: row.orderInvoiceRequestId,
        status: row.status,
        overrule: row.overrule || '',
        invoicePhoto: row.invoicePhoto || ''
      };
      this.statusUpdateVisible = true;
      
      this.$nextTick(() => {
        this.setAreaLoading(loadingKey, false);
      });
    },

    // 提交状态修改
    submitStatusUpdate() {
      this.$refs.statusForm.validate((valid) => {
        if (valid) {
          const params = {
            id: this.statusForm.id,
            status: this.statusForm.status,
            overrule: this.statusForm.overrule,
            invoicePhoto: this.statusForm.invoicePhoto
          };

          this.loadDataWithLoading(
            () => passOrOverrule(
              params.id,
              params.status,
              params.status === 2 ? params.overrule : '',
              params.invoicePhoto
            ),
            'submitStatus',
            () => {
              this.$message.success('操作成功');
              this.statusUpdateVisible = false;
              this.getList();
            },
            '状态修改失败'
          );
        }
      });
    },

    // 上传前检查
    beforeInvoiceUpload(file) {
      const isValidType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
      const isLt5M = file.size / 1024 / 1024 < 10;

      if (!isValidType) {
        this.$message.error('上传发票文件只能是 JPG、PNG 或 PDF 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传发票文件大小不能超过 10MB!');
      }
      return isValidType && isLt5M;
    },

    // 自定义上传
    async uploadInvoicePhoto(file) {
      this.setAreaLoading('uploadInvoice', true);
      
      const formData = new FormData();
      formData.append('file', file.file);
      let fileName = file.file.name.split(".")[0];
      formData.append('name', fileName);
      
      try {
        const res = await orderFileUpload(formData);
        if (res.code === 200) {
          this.statusForm.invoicePhoto = res.data;
          this.$message.success('发票图片上传成功');
        } else {
          this.$message.error(res.message || '发票图片上传失败');
        }
        this.setAreaLoading('uploadInvoice', false);
      } catch (error) {
        this.$message.error('发票图片上传失败');
        this.setAreaLoading('uploadInvoice', false);
      }
    },

    // 分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.queryParams.pageIndex = val;
      this.getList();
    },

    // 获取状态标签类型
    getStatusType(status) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return map[status] || '';
    },

    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: '待处理',
        1: '已处理',
        2: '已驳回'
      }
      return map[status] || '未知状态';
    },

    // 获取发票类型文本
    getInvoiceTypeText(invoiceType) {
      const map = {
        0: '普通发票',
        1: '增值税专用发票',
        2: '电子发票'
      }
      return map[invoiceType] || '未知类型';
    },
    
    // 获取申请类型文本
    getTypeText(type) {
      const map = {
        0: '企业单位',
        1: '个人/非企业单位'
      }
      return map[type] || '未知类型';
    },

    // 获取支付方式文本
    getPaymentMethodText(row) {
      if (!row) return '未知方式';
      const type = row.paymentMethod;
      if (type === 0) return '线下寄付';
      if (type === 1) return '线下到付';
      if (type === 2) {
        if (row.orderStatus == 1) {
          return '微信支付';
        } else if (row.orderStatus == 4) {
          return '月结支付';
        } else if (row.orderStatus == 7) {
          return '线上到付';
        } else if (row.orderStatus == 8) {
          return '线上到付';
        }
      }
      return '未知方式';
    },
    
    // 获取支付方式标签类型
    getPaymentMethodType(row) {
      if (!row) return '';
      const type = row.paymentMethod;
      if (type === 0) return 'success';
      if (type === 1) return 'primary';
      return '';
    },
    
    // 获取运送状态标签类型
    getShippingStatusType(status) {
      if (status === 0) return 'warning';
      if (status === 1) return 'primary';
      if (status === 2) return 'primary';
      if (status === 3) return 'success';
      if (status === 6) return 'danger';
      if (status === 10) return 'info';
      return '';
    },
    
    // 获取运送状态文本
    getShippingStatusText(status) {
      if (status === 0) return '待取件';
      if (status === 1) return '已取件';
      if (status === 2) return '运输中';
      if (status === 3) return '已签收';
      if (status === 6) return '异常';
      if (status === 10) return '已取消';
      return '未知状态';
    },
    
    // 获取订单状态标签类型
    getOrderStatusType(status) {
      if (status === 0) return 'warning';
      if (status === 1) return 'success';
      if (status === 2) return 'info';
      if (status === 3) return 'info';
      if (status === 4) return 'success';
      if (status === 7) return 'warning';
      if (status === 8) return 'success';
      return '';
    },
    
    // 获取订单状态文本
    getOrderStatusText(status) {
      if (status === 0) return '待支付';
      if (status === 1) return '微信已支付';
      if (status === 2) return '未支付已取消';
      if (status === 3) return '已取消已退款';
      if (status === 4) return '月结已支付';
      if (status === 7) return '线上到付未支付';
      if (status === 8) return '线上到付已支付';
      return '未知状态';
    },
    
    // 获取差价状态标签类型
    getPriceDifferenceType(row) {
      if (!row || !row.isPriceDifferencePaid) return '';
      
      // 有差价但未支付
      if (row.orderPriceDifference && row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid === 0) {
        return 'danger';
      }
      
      // 有差价且已支付
      if (row.orderPriceDifference && row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid === 1) {
        return 'success';
      }
      
      return 'info';
    },
    
    // 获取差价状态文本
    getPriceDifferenceText(row) {
      if (!row || !row.isPriceDifferencePaid) return '无需补差价';
      
      // 有差价但未支付
      if (row.orderPriceDifference && row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid === 0) {
        return '待补差价';
      }
      
      // 有差价且已支付
      if (row.orderPriceDifference && row.orderPriceDifference !== 0 && row.orderPriceDifference !== '0.00' && row.isPriceDifferencePaid === 1) {
        return '已补差价';
      }
      
      return '无需补差价';
    },

    // 加载所有订单的差价信息
    async loadAllOrderPriceDifferences() {
      if (!this.tableData || this.tableData.length === 0) return;
      
      // 异步加载所有订单差价信息
      const promises = this.tableData.map(row => this.loadOrderPriceDifference(row, false));
      await Promise.all(promises);
    },
    
    // 加载单个订单的差价信息
    async loadOrderPriceDifference(row, showLoading = true) {
      if (!row.orderId || this.orderPriceDifferenceMap[row.orderId]) return;
      
      const loadingKey = 'price_' + row.orderId;
      if (showLoading) this.setAreaLoading(loadingKey, true);
      
      try {
        const orderRes = await getOrderById(row.orderId);
        if (orderRes.code === 200 && orderRes.data) {
          this.$set(this.orderPriceDifferenceMap, row.orderId, {
            orderPriceDifference: orderRes.data.orderPriceDifference,
            isPriceDifferencePaid: orderRes.data.isPriceDifferencePaid
          });
        }
      } catch (error) {
        console.error('获取订单差价信息失败', error);
      } finally {
        if (showLoading) this.setAreaLoading(loadingKey, false);
      }
      
      return this.orderPriceDifferenceMap[row.orderId];
    },

    // 获取文件类型
    getFileType(fileUrl) {
      if (!fileUrl) return '';
      
      const lowerUrl = fileUrl.toLowerCase();
      if (lowerUrl.endsWith('.pdf')) return 'pdf';
      if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg') || lowerUrl.endsWith('.png')) return 'image';
      
      return 'other';
    },
    
    // 获取文件名
    getFileName(fileUrl) {
      if (!fileUrl) return '';
      
      const parts = fileUrl.split('/');
      return parts[parts.length - 1];
    },
    
    // 预览PDF
    previewPdf(fileUrl) {
      if (!fileUrl) return;
      
      const url = this.$globalParam.apiUrl + fileUrl;
      window.open(url, '_blank');
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
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 100px;
  text-align: center;
}

.avatar {
  
  height: 200px;
  display: block;
  object-fit: cover;
}

.pdf-preview {
  
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 10px;
}

.pdf-preview-small {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 5px;
}

.file-icon {
  font-size: 36px;
  color: #f56c6c;
  margin-bottom: 5px;
}

.file-name {
  font-size: 12px;
  color: #606266;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
}
</style> 
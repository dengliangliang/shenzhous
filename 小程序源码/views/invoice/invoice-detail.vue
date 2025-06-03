<template>
  <view class="invoice-detail-container">
    <view class="header">
      <view class="header-bg"></view>
      <view class="header-content">
        <view class="title-area">
          <text class="title">发票详情</text>
          <text class="subtitle">订单号: {{orderInfo.orderNo || '-'}}</text>
        </view>
      </view>
    </view>
    
    <!-- 加载状态 -->
    <view class="loading-state" v-if="loading">
      <view class="loading-spinner">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
      <text class="loading-text">正在加载...</text>
    </view>
    
    <!-- 有发票申请记录 -->
    <view v-else-if="invoiceRequest" class="invoice-info">
      <view class="status-card">
        <view class="status-icon" :class="statusClass">
          <text class="icon">{{statusIcon}}</text>
        </view>
        <view class="status-text">
          <text class="status-title">{{statusTitle}}</text>
          <text class="status-desc">{{statusDesc}}</text>
        </view>
      </view>
      
      <view class="info-section">
        <view class="section-title">申请信息</view>
        <view class="info-row">
          <text class="label">申请时间</text>
          <text class="value">{{formatDate(invoiceRequest.createTime)}}</text>
        </view>
       <!-- <view class="info-row">
          <text class="label">接收邮箱</text>
          <text class="value">{{invoiceRequest.email}}</text>
        </view> -->
        <view class="info-row" v-if="invoiceTitle">
          <text class="label">发票抬头</text>
          <text class="value">{{invoiceTitle.companiesName}}</text>
        </view>
        <view class="info-row" v-if="invoiceTitle && invoiceTitle.taxNumber">
          <text class="label">税号</text>
          <text class="value">{{invoiceTitle.taxNumber}}</text>
        </view>
      </view>
      
      <!-- 已开票状态 -->
      <view v-if="invoiceRequest.status === 1" class="action-section">
        <!-- 发票文件预览 -->
        <view class="invoice-preview" v-if="invoiceRequest.invoicePhoto">
          <view class="preview-header">
            <text class="preview-title">电子发票</text>
            <view class="preview-actions">
              <view class="action-tag" @click="handleViewDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
                <uni-icons type="eye-filled" size="14" color="#2979FF"></uni-icons>
                <text>预览</text>
              </view>
              <view class="action-tag" @click="handleSaveDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
                <uni-icons type="download-filled" size="14" color="#2979FF"></uni-icons>
                <text>保存</text>
              </view>
            </view>
          </view>
          
          <!-- 图片发票预览 -->
          <view class="image-container" v-if="isImageFile(invoiceRequest.invoicePhoto)">
            <image 
              :src="photoBaseUrl+invoiceRequest.invoicePhoto" 
              mode="widthFix" 
              class="invoice-image" 
              @click="previewInvoiceImage(photoBaseUrl+invoiceRequest.invoicePhoto)"
            ></image>
            <view class="image-mask">
              <text>点击查看大图</text>
            </view>
          </view>
          
          <!-- PDF发票预览 -->
          <view class="pdf-container" v-else-if="isPdfFile(invoiceRequest.invoicePhoto)">
            <view class="pdf-placeholder" @click="openPdfDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
              <view class="pdf-icon">
                <uni-icons type="file-filled" size="46" color="#F56C6C"></uni-icons>
                <text class="pdf-text">PDF</text>
              </view>
              <text class="pdf-name">电子发票文件.pdf</text>
              <view class="pdf-tip">
                <uni-icons type="hand-up" size="14" color="#999999"></uni-icons>
                <text>点击查看PDF文件</text>
              </view>
            </view>
          </view>
          
          <!-- 其他类型文件 -->
          <view class="file-container" v-else>
            <view class="file-placeholder" @click="openDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
              <view class="file-icon">
                <uni-icons type="file-filled" size="46" color="#909399"></uni-icons>
              </view>
              <text class="file-name">电子发票文件</text>
              <view class="file-tip">
                <uni-icons type="hand-up" size="14" color="#999999"></uni-icons>
                <text>点击查看文件</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 操作按钮 -->
        <!-- <view class="action-buttons">
          <view class="action-btn preview-btn" @click="handleViewDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
            <uni-icons type="eye-filled" size="18" color="#FFFFFF"></uni-icons>
            <text>预览文件</text>
          </view>
          <view class="action-btn download-btn" @click="handleSaveDocument(photoBaseUrl+invoiceRequest.invoicePhoto)">
            <uni-icons type="download-filled" size="18" color="#FFFFFF"></uni-icons>
            <text>保存文件</text>
          </view>
        </view> -->
      </view>
      
      <!-- 申请被驳回 -->
      <view v-if="invoiceRequest.status === 2" class="reject-section">
        <view class="reject-title">驳回原因</view>
        <view class="reject-reason">{{invoiceRequest.overrule || '未提供驳回原因'}}</view>
        <view class="reapply-btn" @click="goToApply">
          <text>重新申请</text>
        </view>
      </view>
    </view>
    
    <!-- 无发票申请记录 -->
    <view v-else class="empty-state">
      <image src="/static/img/invoice-empty.png" class="empty-image"></image>
      <text class="empty-title">暂无发票申请</text>
      <text class="empty-desc">您还没有为此订单申请开具电子发票</text>
      <view class="apply-btn" @click="goToApply">
        <text>前去开票</text>
      </view>
    </view>
    
    <!-- 订单信息 -->
    <view v-if="orderInfo.orderId" class="order-section">
      <view class="section-title">订单信息</view>
      <view class="info-row">
        <text class="label">订单号</text>
        <text class="value">{{orderInfo.orderNo || '-'}}</text>
      </view>
      <view class="info-row">
        <text class="label">订单金额</text>
        <text class="value price">¥{{orderInfo.orderTotalPrice || '0.00'}}</text>
      </view>
      <view class="info-row">
        <text class="label">收件人</text>
        <text class="value">{{orderInfo.receiverName || '-'}}</text>
      </view>
      <view class="info-row">
        <text class="label">联系电话</text>
        <text class="value">{{orderInfo.receiverPhone || '-'}}</text>
      </view>
      <view class="info-row">
        <text class="label">收货地址</text>
        <text class="value address">{{formatAddress(orderInfo)}}</text>
      </view>
      <view class="info-row">
        <text class="label">下单时间</text>
        <text class="value">{{formatDate(orderInfo.createTime)}}</text>
      </view>
      <view class="info-row">
        <text class="label">完成时间</text>
        <text class="value">{{formatDate(orderInfo.receivingTime)}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import orderApi from '@/api/order'
import invoiceApi from '@/api/invoice'
import { mapGetters } from 'vuex'
import{photoBaseUrl} from '@/config/env'
export default {
  data() {
    return {
      orderId: '',
      orderInfo: {},
      invoiceRequest: null,
      invoiceTitle: null,
      loading: true,
	  photoBaseUrl:''
    }
  },
  
  computed: {
    ...mapGetters('user', ['getUserInfo']),
    
    // 状态相关计算属性
    statusClass() {
      if (!this.invoiceRequest) return ''
      
      switch (this.invoiceRequest.status) {
        case 0: return 'status-pending'
        case 1: return 'status-success'
        case 2: return 'status-reject'
        default: return 'status-pending'
      }
    },
    
    statusIcon() {
      if (!this.invoiceRequest) return ''
      
      switch (this.invoiceRequest.status) {
        case 0: return '⏳'
        case 1: return '✓'
        case 2: return '✗'
        default: return '⏳'
      }
    },
    
    statusTitle() {
      if (!this.invoiceRequest) return ''
      
      switch (this.invoiceRequest.status) {
        case 0: return '开票中'
        case 1: return '已开票'
        case 2: return '申请驳回'
        default: return '处理中'
      }
    },
    
    statusDesc() {
      if (!this.invoiceRequest) return ''
      
      switch (this.invoiceRequest.status) {
        case 0: return '您的发票申请正在处理中，请耐心等待'
        case 1: return '发票已开具成功，可下载电子发票'
        case 2: return '您的申请未通过审核，可查看驳回原因'
        default: return '您的申请正在处理中'
      }
    }
  },
  
  onLoad(options) {
    if (options.orderId) {
      this.orderId = options.orderId
      this.loadInvoiceInfo()
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
	this.photoBaseUrl = photoBaseUrl
  },
  
  methods: {
    // 加载发票和订单信息
    async loadInvoiceInfo() {
      this.loading = true
      
      try {
        if (!this.getUserInfo || !this.getUserInfo.userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          return
        }
        
        // 并行加载订单和发票申请信息
        const [orderRes, invoiceRes] = await Promise.all([
          // 加载订单详情
          orderApi.getOrderById(this.orderId),
          
          // 加载发票申请信息
          invoiceApi.getOrderInvoiceRequest({
            userId: this.getUserInfo.userId,
            orderId: this.orderId
          })
        ])
        
        // 处理订单信息
        if (orderRes && orderRes.data) {
          this.orderInfo = orderRes.data
        }
        
        // 处理发票申请信息 - 直接使用返回的数组
        if (invoiceRes && invoiceRes.length > 0) {
          this.invoiceRequest = invoiceRes[0]
          
          // 构建发票抬头信息直接从invoiceRequest中获取
          this.invoiceTitle = {
            companiesName: this.invoiceRequest.companiesName,
            taxNumber: this.invoiceRequest.taxNumber,
            companyAddress: this.invoiceRequest.companyAddress,
            citycompanyTel: this.invoiceRequest.citycompanyTel,
            bankAccount: this.invoiceRequest.bankAccount,
            bankName: this.invoiceRequest.bankName,
            type: this.invoiceRequest.type
          }
        }
      } catch (e) {
        console.error('加载发票信息失败:', e)
        uni.showToast({
          title: '加载信息失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return '-'
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    },
    
    // 格式化地址
    formatAddress(order) {
      if (!order) return '-'
      
      const address = []
      if (order.receiverProvince) address.push(order.receiverProvince)
      if (order.receiverCity) address.push(order.receiverCity)
      if (order.receiverDistrict) address.push(order.receiverDistrict)
      if (order.receiverDetailAddress) address.push(order.receiverDetailAddress)
      
      return address.join(' ') || '-'
    },
    
    // 判断是否为图片文件
    isImageFile(url) {
      if (!url) return false
      const lowerUrl = url.toLowerCase()
      return lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg') || 
             lowerUrl.endsWith('.png') || lowerUrl.endsWith('.gif') || 
             lowerUrl.endsWith('.webp')
    },
    
    // 判断是否为PDF文件
    isPdfFile(url) {
      if (!url) return false
      return url.toLowerCase().endsWith('.pdf')
    },
    
    // 预览发票图片
    previewInvoiceImage(url) {
      if (!url) {
        uni.showToast({
          title: '发票图片不存在',
          icon: 'none'
        })
        return
      }
      
      uni.previewImage({
        urls: [url],
        current: url,
        indicator: 'number',
        loop: false
      })
    },
    
    // 打开PDF文档
    openPdfDocument(url) {
      if (!url) {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '加载中...'
      })
      
      uni.downloadFile({
        url: url,
        success: (res) => {
          uni.hideLoading()
          if (res.statusCode === 200) {
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: () => {
                console.log('打开文档成功')
              },
              fail: (err) => {
                console.error('打开文档失败', err)
                uni.showToast({
                  title: '无法打开PDF文件',
                  icon: 'none'
                })
              }
            })
          } else {
            uni.showToast({
              title: '文件下载失败',
              icon: 'none'
            })
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: '文件下载失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 打开通用文档
    openDocument(url) {
      if (!url) {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '加载中...'
      })
      
      uni.downloadFile({
        url: url,
        success: (res) => {
          uni.hideLoading()
          if (res.statusCode === 200) {
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: () => {
                console.log('打开文档成功')
              },
              fail: (err) => {
                console.error('打开文档失败', err)
                uni.showToast({
                  title: '无法打开此类型文件',
                  icon: 'none'
                })
              }
            })
          } else {
            uni.showToast({
              title: '文件下载失败',
              icon: 'none'
            })
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: '文件下载失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 根据文件类型处理查看文档
    handleViewDocument(url) {
      if (!url) {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
        return
      }
      
      if (this.isImageFile(url)) {
        this.previewInvoiceImage(url)
      } else if (this.isPdfFile(url)) {
        this.openPdfDocument(url)
      } else {
        this.openDocument(url)
      }
    },
    
    // 保存图片到相册
    saveImageToAlbum(url) {
      if (!url) {
        uni.showToast({
          title: '发票图片不存在',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '正在保存...'
      })
      
      // 先下载图片到临时路径
      uni.downloadFile({
        url: url,
        success: (res) => {
          if (res.statusCode === 200) {
            // 保存图片到相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.hideLoading()
                uni.showToast({
                  title: '保存成功',
                  icon: 'success'
                })
              },
              fail: (err) => {
                uni.hideLoading()
                // 如果是用户拒绝授权导致的失败
                if (err.errMsg.indexOf('auth deny') >= 0) {
                  uni.showModal({
                    title: '提示',
                    content: '需要您授权保存图片到相册',
                    confirmText: '去设置',
                    success: (res) => {
                      if (res.confirm) {
                        // 打开设置页面
                        uni.openSetting()
                      }
                    }
                  })
                } else {
                  uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              }
            })
          } else {
            uni.hideLoading()
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            })
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 保存PDF或其他文件
    saveDocument(url) {
      if (!url) {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
        return
      }
      
      // 提示用户通过系统分享功能保存
      uni.showLoading({
        title: '准备中...'
      })
      
      uni.downloadFile({
        url: url,
        success: (res) => {
          uni.hideLoading()
          if (res.statusCode === 200) {
            // 打开文档并使用系统分享
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: () => {
                uni.showToast({
                  title: '请使用分享功能保存',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail: () => {
                uni.showToast({
                  title: '无法打开文件',
                  icon: 'none'
                })
              }
            })
          } else {
            uni.showToast({
              title: '文件下载失败',
              icon: 'none'
            })
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: '文件下载失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 根据文件类型处理保存文档
    handleSaveDocument(url) {
      if (!url) {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
        return
      }
      
      if (this.isImageFile(url)) {
        this.saveImageToAlbum(url)
      } else {
        this.saveDocument(url)
      }
    },
    
    // 下载电子发票功能转为根据类型保存
    downloadInvoice() {
      if (this.invoiceRequest && this.invoiceRequest.invoicePhoto) {
        const url = photoBaseUrl+this.invoiceRequest.invoicePhoto
        this.handleSaveDocument(url)
      } else {
        uni.showToast({
          title: '发票文件不存在',
          icon: 'none'
        })
      }
    },
    
    // 前往申请页面，并自动获取发票抬头信息
    async goToApply() {
      try {
        uni.showLoading({ title: '获取信息中...' })
        
        // 获取用户默认的企业抬头
        const companyRes = await invoiceApi.getDefaultInvoice({
          id: this.getUserInfo.userId,
          type: 0 // 企业抬头
        })
        
        // 获取用户默认的个人抬头
        const personalRes = await invoiceApi.getDefaultInvoice({
          id: this.getUserInfo.userId,
          type: 1 // 个人抬头
        })
        
        let defaultTitle = null
        let titleType = 0
        
        // 判断是否有默认抬头
        if (companyRes && companyRes.data) {
          defaultTitle = companyRes.data
          titleType = 0
        } else if (personalRes && personalRes.data) {
          defaultTitle = personalRes.data
          titleType = 1
        }
        
        // 构建查询参数 - 即使没有默认抬头也传递必要信息
        const params = {
          orderId: this.orderId,
          orderNo: this.orderInfo.orderNo || '',
          amount: this.orderInfo.orderTotalPrice || '',
          hasDefaultTitle: defaultTitle ? '1' : '0',
          titleId: defaultTitle ? defaultTitle.titleId : '',
          titleType: String(titleType),
          email: this.getUserInfo.email || '',
          showTitleSelector: '1' // 添加标记，表示需要显示发票抬头选择器
        }
        
        // 将参数转换为URL查询字符串
        const queryString = Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value || '')}`)
          .join('&')
        
        uni.hideLoading()
        
        // 跳转到申请页面，并传递参数
        uni.navigateTo({
          url: `/views/invoice/apply?${queryString}`
        })
      } catch (e) {
        uni.hideLoading()
        console.error('获取发票抬头信息失败:', e)
        
        // 如果获取失败，仍然跳转，并传递显示选择器的标记
        uni.navigateTo({
          url: `/views/invoice/apply?orderId=${this.orderId}&showTitleSelector=1`
        })
      }
    },
    
    // 重新申请
    reapplyInvoice() {
      this.goToApply()
    }
  }
}
</script>

<style lang="scss">
.invoice-detail-container {
  min-height: 100vh;
  background-color: #f7f8fc;
  padding-bottom: 30rpx;
  
  .header {
    position: relative;
    height: 200rpx;
    overflow: hidden;
    
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #FF8F1F, #FF6B01);
      border-radius: 0 0 40rpx 40rpx;
      transform: scale(1.2);
      z-index: 1;
    }
    
    .header-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40rpx 30rpx;
      z-index: 2;
      
      .title-area {
        .title {
          font-size: 40rpx;
          font-weight: bold;
          color: #fff;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .subtitle {
          font-size: 26rpx;
          color: rgba(255,255,255,0.8);
        }
      }
    }
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    
    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      
      .dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 8rpx;
        background-color: #FF6B01;
        margin: 0 8rpx;
        animation: dot-pulse 1.5s infinite ease-in-out;
        
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
    
    .loading-text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .invoice-info, .order-section {
    background: #fff;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
  }
  
  .status-card {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    
    .status-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      
      &.status-pending {
        background: linear-gradient(135deg, #FFB74D, #FF9800);
        box-shadow: 0 4rpx 16rpx rgba(255,152,0,0.2);
      }
      
      &.status-success {
        background: linear-gradient(135deg, #66BB6A, #4CAF50);
        box-shadow: 0 4rpx 16rpx rgba(76,175,80,0.2);
      }
      
      &.status-reject {
        background: linear-gradient(135deg, #EF5350, #F44336);
        box-shadow: 0 4rpx 16rpx rgba(244,67,54,0.2);
      }
      
      .icon {
        font-size: 40rpx;
        color: #fff;
      }
    }
    
    .status-text {
      flex: 1;
      
      .status-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .status-desc {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
  
  .section-title {
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
    padding-bottom: 16rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .info-row {
    display: flex;
    margin-bottom: 16rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .label {
      width: 160rpx;
      font-size: 26rpx;
      color: #999;
    }
    
    .value {
      flex: 1;
      font-size: 26rpx;
      color: #333;
      
      &.price {
        color: #FF6B01;
        font-weight: 500;
      }
      
      &.address {
        word-break: break-all;
      }
    }
  }
  
  .action-section {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    
    .invoice-preview {
      width: 100%;
      margin-bottom: 30rpx;
      
      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16rpx;
        
        .preview-title {
          font-size: 30rpx;
          color: #333;
          font-weight: 500;
        }
        
        .preview-actions {
          display: flex;
          
          .action-tag {
            display: flex;
            align-items: center;
            background-color: rgba(41, 121, 255, 0.1);
            padding: 4rpx 12rpx;
            border-radius: 20rpx;
            margin-left: 12rpx;
            
            text {
              font-size: 22rpx;
              color: #2979FF;
              margin-left: 4rpx;
            }
          }
        }
      }
      
      .image-container {
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
        
        .invoice-image {
          width: 100%;
          display: block;
        }
        
        .image-mask {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
          padding: 30rpx 0 16rpx;
          display: flex;
          justify-content: center;
          
          text {
            font-size: 24rpx;
            color: #fff;
            padding: 6rpx 20rpx;
            background-color: rgba(0,0,0,0.4);
            border-radius: 30rpx;
          }
        }
      }
      
      .pdf-container, .file-container {
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
        background: #f7f8fa;
        height: 300rpx;
        
        .pdf-placeholder, .file-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          
          .pdf-icon, .file-icon {
            position: relative;
            margin-bottom: 16rpx;
            
            .pdf-text {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              font-size: 20rpx;
              color: #fff;
              font-weight: bold;
            }
          }
          
          .pdf-name, .file-name {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 16rpx;
          }
          
          .pdf-tip, .file-tip {
            display: flex;
            align-items: center;
            background-color: rgba(0,0,0,0.05);
            padding: 8rpx 20rpx;
            border-radius: 30rpx;
            
            text {
              font-size: 24rpx;
              color: #666;
              margin-left: 8rpx;
            }
          }
        }
      }
    }
    
    .action-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      
      .action-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
        border-radius: 40rpx;
        margin: 0 10rpx;
        
        text {
          font-size: 28rpx;
          color: #fff;
          margin-left: 8rpx;
        }
        
        &.preview-btn {
          background: linear-gradient(135deg, #2979FF, #4C89FF);
          box-shadow: 0 4rpx 16rpx rgba(41,121,255,0.2);
        }
        
        &.download-btn {
          background: linear-gradient(135deg, #FF6B01, #FF8F1F);
          box-shadow: 0 4rpx 16rpx rgba(255,107,1,0.2);
        }
        
        &:first-child {
          margin-left: 0;
        }
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  
  .reject-section {
    margin-top: 20rpx;
    background-color: #FFF8E1;
    border-radius: 12rpx;
    padding: 20rpx;
    
    .reject-title {
      font-size: 26rpx;
      color: #FF6B01;
      font-weight: 500;
      margin-bottom: 10rpx;
    }
    
    .reject-reason {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 20rpx;
    }
    
    .reapply-btn {
      background-color: #FF6B01;
      border-radius: 30rpx;
      padding: 10rpx 30rpx;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      text {
        color: #fff;
        font-size: 26rpx;
      }
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 60rpx 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
    
    .empty-image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 30rpx;
    }
    
    .empty-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .empty-desc {
      font-size: 26rpx;
      color: #999;
      margin-bottom: 40rpx;
    }
    
    .apply-btn {
      background: linear-gradient(135deg, #FF8F1F, #FF6B01);
      border-radius: 40rpx;
      padding: 20rpx 60rpx;
      box-shadow: 0 4rpx 16rpx rgba(255,107,1,0.2);
      
      text {
        font-size: 30rpx;
        color: #fff;
      }
    }
  }
}

@keyframes dot-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
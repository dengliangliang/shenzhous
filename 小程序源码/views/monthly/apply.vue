<template>
  <view class="apply-container">
    <!-- 步骤指示器 -->
    <view class="steps-indicator">
      <view 
        v-for="(step, index) in steps" 
        :key="index"
        class="step-item"
        :class="{ 'active': currentStep >= index, 'completed': currentStep > index }"
      >
        <view class="step-number">
          <text v-if="currentStep <= index">{{ index + 1 }}</text>
          <uni-icons v-else type="checkmarkempty" size="14" color="#FFFFFF"></uni-icons>
        </view>
        <text class="step-title">{{ step.title }}</text>
        <view class="step-line" v-if="index < steps.length - 1"></view>
      </view>
    </view>
    
    <!-- 步骤内容 - 修改高度计算方式 -->
    <view class="steps-content-wrapper">
      <swiper 
        class="steps-content" 
        :current="currentStep" 
        :disable-touch="true"
        :style="{ height: swiperHeight + 'px' }"
      >
        <!-- 步骤1: 账户类型 -->
        <swiper-item>
          <scroll-view scroll-y class="step-scroll">
            <view class="step-container animate__animated animate__fadeIn">
              <view class="step-header">
                <text class="title">选择账户类型</text>
                <text class="subtitle">请选择您的账户类型</text>
              </view>
              
              <view class="account-type-options">
                <view 
                  class="account-option" 
                  :class="{ active: formData.accountType === 0 }"
                  @click="formData.accountType = 0"
                >
                  <view class="option-icon">
                    <uni-icons type="shop" size="32" color="#FF6B01"></uni-icons>
                  </view>
                  <view class="option-content">
                    <text class="option-title">企业账户</text>
                    <text class="option-desc">适合公司、企业等组织</text>
                  </view>
                  <view class="option-check">
                    <uni-icons 
                      :type="formData.accountType === 0 ? 'checkbox-filled' : 'circle'" 
                      size="20" 
                      :color="formData.accountType === 0 ? '#FF6B01' : '#CCCCCC'"
                    ></uni-icons>
                  </view>
                </view>
                
                <view 
                  class="account-option" 
                  :class="{ active: formData.accountType === 1 }"
                  @click="formData.accountType = 1"
                >
                  <view class="option-icon">
                    <uni-icons type="person" size="32" color="#FF6B01"></uni-icons>
                  </view>
                  <view class="option-content">
                    <text class="option-title">个人账户</text>
                    <text class="option-desc">适合个人、自由职业者</text>
                  </view>
                  <view class="option-check">
                    <uni-icons 
                      :type="formData.accountType === 1 ? 'checkbox-filled' : 'circle'" 
                      size="20" 
                      :color="formData.accountType === 1 ? '#FF6B01' : '#CCCCCC'"
                    ></uni-icons>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        
        <!-- 步骤2: 基本信息 -->
        <swiper-item>
          <scroll-view scroll-y class="step-scroll">
            <view class="step-container animate__animated animate__fadeIn">
              <view class="step-header">
                <text class="title">填写基本信息</text>
                <text class="subtitle">请填写您的联系信息</text>
              </view>
              
              <view class="form-group">
                <view class="form-item">
                  <text class="label required">联系人</text>
                  <input 
                    class="input" 
                    type="text" 
                    v-model="formData.name" 
                    placeholder="请输入联系人姓名"
                    placeholder-style="color: #999999"
                  />
                </view>
                
                <view class="form-item">
                  <text class="label required">联系电话</text>
                  <input 
                    class="input" 
                    type="number" 
                    v-model="formData.phone" 
                    placeholder="请输入联系电话"
                    placeholder-style="color: #999999"
                    maxlength="11"
                  />
                </view>
                
                <view class="form-item">
                  <text class="label required">联系地址</text>
                  <input 
                    class="input" 
                    type="text" 
                    v-model="formData.address" 
                    placeholder="请输入联系地址"
                    placeholder-style="color: #999999"
                  />
                </view>
                
                <view class="form-item">
                  <text class="label required">电子邮箱</text>
                  <input 
                    class="input" 
                    type="text" 
                    v-model="formData.email" 
                    placeholder="请输入电子邮箱"
                    placeholder-style="color: #999999"
                  />
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        
        <!-- 步骤3: 结算信息 -->
        <swiper-item>
          <scroll-view scroll-y class="step-scroll">
            <view class="step-container animate__animated animate__fadeIn">
              <view class="step-header">
                <text class="title">填写结算信息</text>
                <text class="subtitle">请设置您的结算周期和金额</text>
              </view>
              
              <view class="form-group">
                <view class="form-item">
                  <text class="label required">结算周期</text>
                  <picker 
                    mode="selector" 
                    :range="cycleOptions" 
                    @change="onCycleChange"
                    :value="formData.settlementCycle"
                  >
                    <view class="picker-value">
                      <text>{{ cycleOptions[formData.settlementCycle] || '请选择结算周期' }}</text>
                      <uni-icons type="arrowdown" size="14" color="#999999"></uni-icons>
                    </view>
                  </picker>
                </view>
                
                <view class="form-item">
                  <text class="label required">最低寄件量</text>
                  <view class="input-with-unit">
                    <input 
                      class="input" 
                      type="digit" 
                      v-model="formData.minimumAmount" 
                      placeholder="请输入每月最低寄件量"
                      placeholder-style="color: #999999"
                    />
                    <text class="unit">元/月</text>
                  </view>
                </view>
                
                <view class="form-item">
                  <text class="label required">发票要求</text>
                  <picker 
                    mode="selector" 
                    :range="invoiceOptions" 
                    @change="onInvoiceChange"
                    :value="formData.invoiceRequirement"
                  >
                    <view class="picker-value">
                      <text>{{ invoiceOptions[formData.invoiceRequirement] || '请选择发票类型' }}</text>
                      <uni-icons type="arrowdown" size="14" color="#999999"></uni-icons>
                    </view>
                  </picker>
                </view>
                
                <view class="form-item">
                  <text class="label">特殊要求</text>
                  <textarea 
                    class="textarea" 
                    v-model="formData.remark" 
                    placeholder="请输入特殊要求（选填）"
                    placeholder-style="color: #999999"
                  />
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        
        <!-- 步骤4: 证件信息 -->
        <swiper-item>
          <scroll-view scroll-y class="step-scroll">
            <view class="step-container animate__animated animate__fadeIn">
              <view class="step-header">
                <text class="title">上传证件信息</text>
                <text class="subtitle">请上传清晰的证件照片</text>
              </view>
              
              <view class="upload-group">
                <view class="form-item">
                  <text class="label">身份证人像面</text>
                  <view class="upload-box" @click="uploadImage('idCardPortraitPhoto')">
                    <image 
                      v-if="formData.idCardPortraitPhoto" 
                      :src="getImageSrc(formData.idCardPortraitPhoto)" 
                      class="preview-image"
                      mode="aspectFill"
                    ></image>
                    <view v-else class="upload-placeholder">
                      <uni-icons type="camera-filled" size="40" color="#CCCCCC"></uni-icons>
                      <text>点击上传身份证人像面</text>
                    </view>
                    <view class="upload-overlay" v-if="formData.idCardPortraitPhoto">
                      <view class="overlay-btn" @click.stop="previewImage(getImageSrc(formData.idCardPortraitPhoto))">
                        <uni-icons type="eye" size="16" color="#FFFFFF"></uni-icons>
                        <text>预览</text>
                      </view>
                      <view class="overlay-btn" @click.stop="uploadImage('idCardPortraitPhoto')">
                        <uni-icons type="upload" size="16" color="#FFFFFF"></uni-icons>
                        <text>重新上传</text>
                      </view>
                    </view>
                  </view>
                  <text class="upload-tips">请上传清晰的身份证人像面照片</text>
                </view>
                
                <view class="form-item">
                  <text class="label">身份证国徽面</text>
                  <view class="upload-box" @click="uploadImage('idCardEmblemPhoto')">
                    <image 
                      v-if="formData.idCardEmblemPhoto" 
                      :src="getImageSrc(formData.idCardEmblemPhoto)" 
                      class="preview-image"
                      mode="aspectFill"
                    ></image>
                    <view v-else class="upload-placeholder">
                      <uni-icons type="camera-filled" size="40" color="#CCCCCC"></uni-icons>
                      <text>点击上传身份证国徽面</text>
                    </view>
                    <view class="upload-overlay" v-if="formData.idCardEmblemPhoto">
                      <view class="overlay-btn" @click.stop="previewImage(getImageSrc(formData.idCardEmblemPhoto))">
                        <uni-icons type="eye" size="16" color="#FFFFFF"></uni-icons>
                        <text>预览</text>
                      </view>
                      <view class="overlay-btn" @click.stop="uploadImage('idCardEmblemPhoto')">
                        <uni-icons type="upload" size="16" color="#FFFFFF"></uni-icons>
                        <text>重新上传</text>
                      </view>
                    </view>
                  </view>
                  <text class="upload-tips">请上传清晰的身份证国徽面照片</text>
                </view>
                
                <view class="form-item" v-if="formData.accountType === 0">
                  <text class="label">营业执照</text>
                  <view class="upload-box" @click="uploadImage('businessLicense')">
                    <image 
                      v-if="formData.businessLicense" 
                      :src="getImageSrc(formData.businessLicense)" 
                      class="preview-image"
                      mode="aspectFill"
                    ></image>
                    <view v-else class="upload-placeholder">
                      <uni-icons type="camera-filled" size="40" color="#CCCCCC"></uni-icons>
                      <text>点击上传营业执照</text>
                    </view>
                    <view class="upload-overlay" v-if="formData.businessLicense">
                      <view class="overlay-btn" @click.stop="previewImage(getImageSrc(formData.businessLicense))">
                        <uni-icons type="eye" size="16" color="#FFFFFF"></uni-icons>
                        <text>预览</text>
                      </view>
                      <view class="overlay-btn" @click.stop="uploadImage('businessLicense')">
                        <uni-icons type="upload" size="16" color="#FFFFFF"></uni-icons>
                        <text>重新上传</text>
                      </view>
                    </view>
                  </view>
                  <text class="upload-tips">请上传清晰的营业执照照片</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        
        <!-- 步骤5: 确认提交 -->
        <swiper-item>
          <scroll-view scroll-y class="step-scroll">
            <view class="step-container animate__animated animate__fadeIn">
              <view class="step-header">
                <text class="title">确认信息</text>
                <text class="subtitle">请确认您的申请信息</text>
              </view>
              
              <view class="confirm-card">
                <!-- 基本信息 -->
                <view class="card-section">
                  <view class="section-title">
                    <uni-icons type="person" size="18" color="#FF6B01"></uni-icons>
                    <text>基本信息</text>
                  </view>
                  <view class="info-grid">
                    <view class="info-item">
                      <text class="label">账户类型</text>
                      <text class="value highlight">{{ formData.accountType === 0 ? '企业账户' : '个人账户' }}</text>
                    </view>
                    <view class="info-item">
                      <text class="label">联系人</text>
                      <text class="value">{{ formData.name }}</text>
                    </view>
                    <view class="info-item">
                      <text class="label">联系电话</text>
                      <text class="value">{{ formData.phone }}</text>
                    </view>
                    <view class="info-item full-width">
                      <text class="label">联系地址</text>
                      <text class="value">{{ formData.address }}</text>
                    </view>
                    <view class="info-item full-width">
                      <text class="label">电子邮箱</text>
                      <text class="value">{{ formData.email }}</text>
                    </view>
                  </view>
                </view>
                
                <!-- 结算信息 -->
                <view class="card-section">
                  <view class="section-title">
                    <uni-icons type="wallet" size="18" color="#FF6B01"></uni-icons>
                    <text>结算信息</text>
                  </view>
                  <view class="info-grid">
                    <view class="info-item">
                      <text class="label">最低寄件量</text>
                      <text class="value highlight">{{ formData.minimumAmount }} 元/月</text>
                    </view>
                    <view class="info-item">
                      <text class="label">结算周期</text>
                      <text class="value">{{ cycleOptions[formData.settlementCycle] }}</text>
                    </view>
                    <view class="info-item full-width">
                      <text class="label">发票要求</text>
                      <text class="value">{{ invoiceOptions[formData.invoiceRequirement] }}</text>
                    </view>
                    <view class="info-item full-width" v-if="formData.remark">
                      <text class="label">特殊要求</text>
                      <text class="value">{{ formData.remark }}</text>
                    </view>
                  </view>
                </view>
                
                <!-- 证件信息 -->
                <view class="card-section">
                  <view class="section-title">
                    <uni-icons type="paperplane" size="18" color="#FF6B01"></uni-icons>
                    <text>证件信息</text>
                  </view>
                  <view class="document-preview">
                    <view class="document-item" v-if="formData.idCardPortraitPhoto">
                      <image :src="getImageSrc(formData.idCardPortraitPhoto)" mode="aspectFit"></image>
                      <text>身份证人像面</text>
                    </view>
                    <view class="document-item" v-if="formData.idCardEmblemPhoto">
                      <image :src="getImageSrc(formData.idCardEmblemPhoto)" mode="aspectFit"></image>
                      <text>身份证国徽面</text>
                    </view>
                    <view class="document-item" v-if="formData.businessLicense && formData.accountType === 0">
                      <image :src="getImageSrc(formData.businessLicense)" mode="aspectFit"></image>
                      <text>营业执照</text>
                    </view>
                  </view>
                </view>
              </view>
              
              <view class="agreement-box">
                <view class="checkbox" @click="toggleAgreement">
                  <uni-icons 
                    :type="agreed ? 'checkbox-filled' : 'circle'" 
                    size="18" 
                    :color="agreed ? '#FF6B01' : '#CCCCCC'"
                  ></uni-icons>
                </view>
                <text class="agreement-text" @click="goToMonthly">我已阅读并同意《月结服务协议》</text>
              </view>
              
              <!-- <view class="step-actions">
                <button class="prev-btn" @click="prevStep">上一步</button>
                <button class="next-btn" @click="submitApply" :loading="submitting">提交申请</button>
              </view> -->
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 底部按钮 -->
    <view class="bottom-actions">
      <button 
        class="prev-btn" 
        v-if="currentStep > 0" 
        @click="prevStep"
      >
        <uni-icons type="left" size="14" color="#666666"></uni-icons>
        <text>上一步</text>
      </button>
      
      <button 
        class="next-btn" 
        v-if="currentStep < steps.length - 1" 
        @click="nextStep"
        :disabled="!canGoNext"
      >
        <text>下一步</text>
        <uni-icons type="right" size="14" color="#FFFFFF"></uni-icons>
      </button>
      
      <button 
        class="submit-btn" 
        v-if="currentStep === steps.length - 1" 
        @click="submitApply"
     
      >
        <text>{{ submitting ? '提交中...' : '提交申请' }}</text>
      </button>
    </view>
  </view>
</template>

<script>
import uploadApi from '@/api/upload'
import monthlyApi from '@/api/monthly'
import { mapState } from 'vuex'
import{photoBaseUrl} from '@/config/env'
export default {
  data() {
    return {
      steps: [
        { title: '账户类型' },
        { title: '基本信息' },
        { title: '结算信息' },
        { title: '证件信息' },
        { title: '确认提交' }
      ],
      currentStep: 0,
      formData: {
        accountType: 0, // 0为企业账户，1为个人账户
        name: '',
        phone: '',
        address: '',
        email: '',
        minimumAmount: '',
        settlementCycle: 0, // 0为月结，1为季结，2为半年结
        invoiceRequirement: 0, // 0为增值税普通发票，1为增值税专用发票，2为其他
        remark: '',
        idCardPortraitPhoto: '', // 身份证人像面
        idCardEmblemPhoto: '', // 身份证国徽面
        businessLicense: '' // 营业执照
      },
      cycleOptions: ['月结', '季结', '半年结'],
      invoiceOptions: ['增值税普通发票', '增值税专用发票', '其他'],
      agreed: false,
      submitting: false,
      photoBaseUrl: '',
      swiperHeight: 500, // 默认高度，将在onReady中计算实际高度
    }
  },
  
  computed: {
    ...mapState('user', ['userInfo']),
    
    canGoNext() {
      switch (this.currentStep) {
        case 0:
          return true
        case 1:
          return this.formData.name && this.formData.phone && this.formData.address && this.formData.email
        case 2:
          return this.formData.settlementCycle !== undefined && this.formData.minimumAmount && this.formData.invoiceRequirement !== undefined
        case 3:
          // 验证证件照片上传
          if (this.formData.accountType === 0) {
            // 企业账户：需要身份证正反面和营业执照
            return this.formData.idCardPortraitPhoto && 
                   this.formData.idCardEmblemPhoto && 
                   this.formData.businessLicense
          } else {
            // 个人账户：只需要身份证正反面
            return this.formData.idCardPortraitPhoto && 
                   this.formData.idCardEmblemPhoto
          }
        case 4:
          return this.agreed
        default:
          return false
      }
    }
  },
  
  // 页面加载时初始化表单数据
  onLoad() {
    // 如果用户已登录，自动填充联系信息
    if (this.userInfo) {
      this.formData.name = this.userInfo.name || ''
      this.formData.phone = this.userInfo.phone || ''
      this.formData.email = this.userInfo.email || ''
    }
    
    // 确保photoBaseUrl正确初始化
    this.photoBaseUrl = photoBaseUrl || '';
    console.log("photoBaseUrl初始化:", this.photoBaseUrl);
  },
  
  // 添加onReady生命周期函数，计算swiper实际高度
  onReady() {
    // 计算实际可用高度
    this.calculateSwiperHeight();
    
    // 监听窗口大小变化，重新计算高度
    uni.onWindowResize(() => {
      this.calculateSwiperHeight();
    });
  },
  
  methods: {
    // 计算swiper高度的方法
    calculateSwiperHeight() {
      const that = this;
      const query = uni.createSelectorQuery().in(this);
      query.select('.steps-indicator').boundingClientRect();
      query.select('.bottom-actions').boundingClientRect();
      query.exec(function(res) {
        if (res[0] && res[1]) {
          // 获取屏幕高度
          const windowHeight = uni.getSystemInfoSync().windowHeight;
          // 计算swiper高度 = 屏幕高度 - 步骤指示器高度 - 底部按钮高度
          const headerHeight = res[0].height || 0;
          const footerHeight = res[1].height || 0;
          const swiperHeight = windowHeight - headerHeight - footerHeight - 20; // 减去20是为了留出一些空间
          that.swiperHeight = swiperHeight > 400 ? swiperHeight : 500; // 确保最小高度
          
          console.log('动态计算的swiper高度:', that.swiperHeight);
        } else {
          // 如果无法获取元素高度，使用默认高度
          that.swiperHeight = 500;
          console.log('使用默认swiper高度:', that.swiperHeight);
        }
      });
    },
    goToMonthly(){
		uni.navigateTo({
			url: `/views/monthlyService/monthlyService`
		})
	},
    // 处理图片路径，确保路径正确
    getImageSrc(path) {
      if (!path) return '';
      if (!this.photoBaseUrl) {
        console.warn('photoBaseUrl未初始化');
        return path;
      }
      // 检查是否已经包含baseUrl，避免重复添加
      if (path.indexOf('http') === 0 || path.indexOf(this.photoBaseUrl) === 0) {
        return path;
      }
      return this.photoBaseUrl + path;
    },
    
    // 修改图片预览方法
    previewImage(url) {
      if (!url) {
        console.warn('预览图片url为空');
        return;
      }
      
      uni.previewImage({
        urls: [url],
        current: url,
        fail: (err) => {
          console.error('预览图片失败:', err);
          uni.showToast({
            title: '预览失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 下一步
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },
    
    // 上一步
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    
    // 选择结算周期
    onCycleChange(e) {
      this.formData.settlementCycle = parseInt(e.detail.value)
    },
    
    // 选择发票要求
    onInvoiceChange(e) {
      this.formData.invoiceRequirement = parseInt(e.detail.value)
    },
    
    // 上传图片
    async uploadImage(field) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: resolve,
            fail: reject
          })
        })
        
        if (res?.tempFilePaths?.length > 0) {
          const tempFilePath = res.tempFilePaths[0]
          let fileName = tempFilePath.substring(tempFilePath.lastIndexOf('/') + 1)
		  fileName = fileName.split(".")[0]
		  console.log(tempFilePath)
          console.log(fileName)
          uni.showLoading({ title: '上传中...' })
          
          // 调用修改后的uploadFile API
          const uploadRes = await uploadApi.uploadFile({
            file: tempFilePath,
            name: fileName
          })
          
          this.formData[field] = uploadRes.data
		  
          uni.hideLoading()
        }
      } catch (e) {
        console.error('上传图片失败:', e)
        uni.hideLoading()
        uni.showToast({
          title: '上传失败，请重试',
          icon: 'none'
        })
      }
    },
    
    // 提交申请
    async submitApply() {
		console.log(1)
      if (!this.validateForm()){
		  // console.log(2)
		  // uni.showToast({
		  //   title:'提交失败,请阅读并同意《月结服务协议》',
		  //   icon: 'none'
		  // })
		  return
	  } 
      
      try {
        this.submitting = true
        
        // 显示加载中
        uni.showLoading({
          title: '提交中...'
        })
        
        // 准备提交数据
        const applyData = {
          ...this.formData,
          userId: this.userInfo.userId,
          minimumAmount: parseFloat(this.formData.minimumAmount),
          applyStatus: 0 // 0为审核中
        }
        
        // 调用接口提交申请
        const res = await monthlyApi.addApply(applyData)
        
        // 提交成功
        uni.hideLoading()
        uni.showToast({
          title: '申请提交成功',
          icon: 'success'
        })
        
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } catch (e) {
        console.error('提交申请失败:', e)
        uni.hideLoading()
        uni.showToast({
          title: e.message || '提交失败，请重试',
          icon: 'none'
        })
      } finally {
        this.submitting = false
      }
    },
    
    // 验证表单
    validateForm() {
      // 验证基本信息
      if (!this.formData.name) {
        uni.showToast({
          title: '请输入联系人姓名',
          icon: 'none'
        })
        return false
      }
      
      if (!this.formData.phone) {
        uni.showToast({
          title: '请输入联系电话',
          icon: 'none'
        })
        return false
      }
      
      if (!/^1\d{10}$/.test(this.formData.phone)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        })
        return false
      }
      
      if (!this.formData.address) {
        uni.showToast({
          title: '请输入联系地址',
          icon: 'none'
        })
        return false
      }
      
      if (!this.formData.email) {
        uni.showToast({
          title: '请输入电子邮箱',
          icon: 'none'
        })
        return false
      }
      
      // 验证结算信息
      if (this.formData.settlementCycle === undefined) {
        uni.showToast({
          title: '请选择结算周期',
          icon: 'none'
        })
        return false
      }
      
      if (!this.formData.minimumAmount) {
        uni.showToast({
          title: '请输入最低寄件量',
          icon: 'none'
        })
        return false
      }
      
      if (this.formData.invoiceRequirement === undefined) {
        uni.showToast({
          title: '请选择发票要求',
          icon: 'none'
        })
        return false
      }
      
      // 验证协议
      if (!this.agreed) {
        uni.showToast({
          title: '请阅读并同意协议',
          icon: 'none'
        })
        return false
      }
      
      return true
    },
    
    // 切换协议同意状态
    toggleAgreement() {
      this.agreed = !this.agreed
    }
  }
}
</script>

<style lang="scss">
.apply-container {
  min-height: 100vh;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  position: relative; /* 添加position定位 */
  
  .steps-indicator {
    display: flex;
    padding: 30rpx 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    position: relative;
    z-index: 10;
    
    .step-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      
      .step-number {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background-color: #EEEEEE;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rpx;
        
        text {
          font-size: 24rpx;
          color: #999999;
        }
      }
      
      .step-title {
        font-size: 24rpx;
        color: #999999;
        white-space: nowrap;
      }
      
      .step-line {
        position: absolute;
        top: 20rpx;
        right: -50%;
        width: 100%;
        height: 2rpx;
        background-color: #EEEEEE;
        z-index: -1;
      }
      
      &.active {
        .step-number {
          background-color: #FF6B01;
          
          text {
            color: #FFFFFF;
          }
        }
        
        .step-title {
          color: #FF6B01;
          font-weight: 500;
        }
      }
      
      &.completed {
        .step-line {
          background-color: #FF6B01;
        }
      }
    }
  }
  
  .steps-content-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  
  .steps-content {
    width: 100%;
    /* 高度现在通过动态计算设置到style属性中 */
    
    .step-scroll {
      height: 100%;
    }
    
    .step-container {
      padding: 30rpx;
      /* 移除动画类，增加兼容性 */
      
      .step-header {
        margin-bottom: 30rpx;
        
        .title {
          font-size: 36rpx;
          font-weight: 600;
          color: #333333;
          margin-bottom: 10rpx;
        }
        
        .subtitle {
          font-size: 28rpx;
          color: #666666;
        }
      }
      
      .account-type-options {
        .account-option {
          display: flex;
          align-items: center;
          padding: 30rpx;
          background-color: #FFFFFF;
          border-radius: 12rpx;
          margin-bottom: 20rpx;
          box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
          
          .option-icon {
            margin-right: 20rpx;
          }
          
          .option-content {
            flex: 1;
            
            .option-title {
              font-size: 32rpx;
              font-weight: 500;
              color: #333333;
              margin-bottom: 6rpx;
            }
            
            .option-desc {
              font-size: 26rpx;
              color: #999999;
            }
          }
          
          &.active {
            border: 2rpx solid #FF6B01;
            background-color: rgba(255, 107, 1, 0.05);
          }
        }
      }
      
      .form-group {
        background-color: #FFFFFF;
        border-radius: 12rpx;
        padding: 30rpx;
        box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
        
        .form-item {
          margin-bottom: 30rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .label {
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 10rpx;
            display: block;
            
            &.required::after {
              content: '*';
              color: #FF4D4F;
              margin-left: 6rpx;
            }
          }
          
          .input {
            width: 100%;
            height: 80rpx;
            background-color: #F5F6FA;
            border-radius: 8rpx;
            padding: 0 20rpx;
            font-size: 28rpx;
            color: #333333;
          }
          
          .input-with-unit {
            display: flex;
            align-items: center;
            background-color: #F5F6FA;
            border-radius: 8rpx;
            padding-right: 20rpx;
            
            .input {
              flex: 1;
              background-color: transparent;
            }
            
            .unit {
              font-size: 28rpx;
              color: #999999;
            }
          }
          
          .picker-value {
            width: 100%;
            height: 80rpx;
            background-color: #F5F6FA;
            border-radius: 8rpx;
            padding: 0 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            text {
              font-size: 28rpx;
              color: #333333;
            }
          }
          
          .textarea {
            width: 100%;
            height: 160rpx;
            background-color: #F5F6FA;
            border-radius: 8rpx;
            padding: 20rpx;
            font-size: 28rpx;
            color: #333333;
          }
        }
      }
      
      .upload-group {
        background-color: #FFFFFF;
        border-radius: 12rpx;
        padding: 30rpx;
        box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
        
        .form-item {
          margin-bottom: 40rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .label {
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 16rpx;
            display: block;
            
            &.required::after {
              content: '*';
              color: #FF4D4F;
              margin-left: 6rpx;
            }
          }
          
          .upload-box {
            width: 100%;
            height: 360rpx;
            background-color: #F5F6FA;
            border-radius: 12rpx;
            overflow: hidden;
            position: relative;
            border: 2rpx dashed #DDDDDD;
            
            .preview-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .upload-placeholder {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              
              uni-icons {
                margin-bottom: 20rpx;
              }
              
              text {
                font-size: 28rpx;
                color: #999999;
              }
            }
            
            .upload-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 30rpx;
              
              .overlay-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 120rpx;
                height: 120rpx;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 12rpx;
                
                uni-icons {
                  margin-bottom: 10rpx;
                }
                
                text {
                  font-size: 24rpx;
                  color: #FFFFFF;
                }
              }
            }
          }
          
          .upload-tips {
            font-size: 24rpx;
            color: #999999;
            margin-top: 10rpx;
            display: block;
          }
        }
      }
      
      .agreement-section {
        margin-top: 30rpx;
        display: flex;
        align-items: flex-start;
        
        .checkbox {
          margin-right: 10rpx;
          margin-top: 6rpx;
        }
        
        .agreement-text {
          flex: 1;
          font-size: 26rpx;
          color: #666666;
          line-height: 1.5;
          
          .link {
            color: #FF6B01;
          }
        }
      }
      
      .summary-section {
        background-color: #FFFFFF;
        border-radius: 12rpx;
        padding: 30rpx;
        box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
        
        .summary-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333333;
          margin-bottom: 20rpx;
        }
        
        .summary-group {
          margin-bottom: 30rpx;
          
          .group-title {
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
            margin-bottom: 15rpx;
            padding-left: 20rpx;
            position: relative;
            
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 6rpx;
              height: 24rpx;
              background-color: #FF6B01;
              border-radius: 3rpx;
            }
          }
          
          .summary-item {
            display: flex;
            margin-bottom: 15rpx;
            
            &:last-child {
              margin-bottom: 0;
            }
            
            .item-label {
              width: 180rpx;
              font-size: 26rpx;
              color: #999999;
            }
            
            .item-value {
              flex: 1;
              font-size: 26rpx;
              color: #333333;
            }
          }
        }
        
        .summary-images {
          .image-title {
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
            margin-bottom: 15rpx;
          }
          
          .image-list {
            display: flex;
            flex-wrap: wrap;
            
            .image-item {
              width: 200rpx;
              height: 200rpx;
              margin-right: 20rpx;
              margin-bottom: 20rpx;
              border-radius: 8rpx;
              overflow: hidden;
              
              image {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
  
  .bottom-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 30rpx;
    background-color: #FFFFFF;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    display: flex;
    
    .prev-btn {
      width: 200rpx;
      height: 88rpx;
      background-color: #F5F6FA;
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      
      text {
        font-size: 30rpx;
        color: #666666;
      }
    }
    
    .next-btn, .submit-btn {
      flex: 1;
      height: 88rpx;
      background: linear-gradient(90deg, #FF6B01, #FF9C01);
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      
      text {
        font-size: 30rpx;
        color: #FFFFFF;
        font-weight: 500;
      }
      
      &:disabled {
        opacity: 0.6;
      }
    }
  }
}

.confirm-card {
  margin-bottom: 30rpx;
  
  .card-section {
    background-color: #FFFFFF;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    
    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      padding-bottom: 16rpx;
      border-bottom: 1px solid #F5F5F5;
      
      .uni-icons {
        margin-right: 10rpx;
      }
      
      text {
        font-size: 30rpx;
        color: #333333;
        font-weight: 500;
      }
    }
    
    .info-grid {
      display: flex;
      flex-wrap: wrap;
      
      .info-item {
        width: 50%;
        margin-bottom: 20rpx;
        padding-right: 20rpx;
        box-sizing: border-box;
        
        &.full-width {
          width: 100%;
        }
        
        .label {
          display: block;
          font-size: 26rpx;
          color: #999999;
          margin-bottom: 8rpx;
        }
        
        .value {
          font-size: 28rpx;
          color: #333333;
          word-break: break-all;
          
          &.highlight {
            color: #FF6B01;
            font-weight: 500;
          }
        }
      }
    }
    
    .document-preview {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      
      .document-item {
        width: 33.33%;
        padding: 0 10rpx;
        margin-bottom: 20rpx;
        text-align: center;
        
        image {
          width: 100%;
          height: 180rpx;
          border-radius: 8rpx;
          background-color: #F5F5F5;
          margin-bottom: 10rpx;
        }
        
        text {
          font-size: 24rpx;
          color: #666666;
        }
      }
    }
  }
}

.agreement-box {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  
  .checkbox {
    margin-right: 10rpx;
  }
  
  .agreement-text {
    font-size: 28rpx;
    color: #666666;
  }
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30rpx;
  
  .prev-btn {
    width: 200rpx;
    height: 88rpx;
    background-color: #F5F6FA;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20rpx;
    
    text {
      font-size: 30rpx;
      color: #666666;
    }
  }
  
  .next-btn {
    flex: 1;
    height: 88rpx;
    background: linear-gradient(90deg, #FF6B01, #FF9C01);
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    text {
      font-size: 30rpx;
      color: #FFFFFF;
      font-weight: 500;
    }
  }
}
</style>
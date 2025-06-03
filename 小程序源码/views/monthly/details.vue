<template>
  <view>
    <view class="details-container">
      <!-- 基本信息卡片 -->
      <view class="card">
        <view class="card-header">
          <view class="title">
            <uni-icons type="wallet" size="24" color="#FF6B01"></uni-icons>
            <text>月结资格信息</text>
          </view>
          <view class="status-tag" :class="{ invalid: details.status === 1 }">
            {{ details.status === 0 ? '正常' : '已失效' }}
          </view>
        </view>
        
        <view class="info-list">
          <!-- 主用户信息 -->
          <view class="info-item">
            <text class="label">主用户</text>
            <text class="value">{{ details.userName }}</text>
          </view>
          
          <!-- 交易信息 -->
          <view class="info-item">
            <text class="label">交易次数</text>
            <text class="value highlight">{{ details.tradeNumber || 0 }}<text class="unit">次</text></text>
          </view>

          <!-- 结算信息 -->
          <view class="info-item">
            <text class="label">结算周期</text>
            <text class="value">{{ getCycleText(details.settlementCycle) }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">最低寄件量</text>
            <text class="value highlight">¥ {{ details.minimumAmount }}<text class="unit">/月</text></text>
          </view>
          
          <view class="info-item">
            <text class="label">发票要求</text>
            <text class="value">{{ getInvoiceText(details.invoiceRequirement) }}</text>
          </view>

          <!-- 时间信息 -->
          <view class="info-item">
            <text class="label">生效时间</text>
            <text class="value">{{ details.createTime }}</text>
          </view>
          
          <view class="info-item">
            <text class="label">更新时间</text>
            <text class="value">{{ details.updateTime }}</text>
          </view>
        </view>
      </view>

      <!-- 特殊要求 -->
      <view class="card" v-if="details.remark">
        <view class="card-header">
          <view class="title">
            <uni-icons type="info" size="24" color="#FF6B01"></uni-icons>
            <text>特殊要求</text>
          </view>
        </view>
        
        <view class="remark">{{ details.remark }}</view>
      </view>

      <!-- 密码信息卡片 - 添加状态判断 -->
      <view class="card password-card" v-if="isOwner && details.status === 0">
        <view class="card-inner">
          <view class="card-header">
            <view class="title-row">
              <view class="title-badge">
                <uni-icons type="locked" size="22" color="#FF6B01"></uni-icons>
                <text>密码信息</text>
              </view>
            <!--  <view class="security-tag">
                <uni-icons type="info" size="12" color="#999"></uni-icons>
                <text>安全信息</text>
              </view> -->
            </view>
            <!-- <view class="description">请妥善保管您的密码，不要与他人分享</view> -->
          </view>
          
          <view class="password-display">
            <view class="password-text">{{ details.password }}</view>
            <view class="password-hint">可用于其他用户共享该月结资格</view>
          </view>
          
          <view class="action-buttons">
            <button class="action-btn copy-btn" @click="copyPassword">
              <view class="btn-content">
                <uni-icons type="copy" size="16"></uni-icons>
                <text>复制密码</text>
              </view>
            </button>
            <button class="action-btn modify-btn" @click="openPasswordDrawer">
              <view class="btn-content">
                <uni-icons type="reload" size="16"></uni-icons>
                <text>修改密码</text>
              </view>
            </button>
          </view>
        </view>
      </view>

      <!-- 当资格已失效时，显示提示信息 -->
      <view class="card disabled-card" v-if="isOwner && details.status === 1">
        <view class="card-inner">
          <view class="disabled-content">
            <uni-icons type="locked" size="32" color="#999"></uni-icons>
            <text class="disabled-text">月结资格已失效，密码信息不可用</text>
          </view>
        </view>
      </view>

      <!-- 底部操作按钮 -->
      <view class="bottom-actions" v-if="isOwner">
        <button 
          class="action-btn danger" 
          @click="confirmDeactivate"
          v-if="details.status === 0"
        >
          <uni-icons type="close" size="20" color="#FFFFFF"></uni-icons>
          <text>注销月结资格</text>
        </button>
      </view>
    </view>

    <!-- 修改密码抽屉 -->
    <uni-popup ref="passwordDrawer" type="bottom">
      <view class="password-drawer">
        <view class="drawer-content">
          <view class="drawer-header">
            <view class="drawer-title">修改密码</view>
            <view class="drawer-subtitle">为了账户安全，请定期更换密码</view>
          </view>
          
          <view class="input-section">
            <view class="input-group">
              <view class="input-label">
                <view class="label-icon">
                  <uni-icons type="locked" size="12"></uni-icons>
                </view>
                <text>当前密码</text>
              </view>
              <input 
                type="text" 
                v-model="oldPassword"
                placeholder="请输入当前使用的密码"
                class="input-field"
                maxlength="20"
              />
            </view>
            
            <view class="input-group">
              <view class="input-label">
                <view class="label-icon">
                  <uni-icons type="locked" size="12"></uni-icons>
                </view>
                <text>新密码</text>
              </view>
              <input 
                type="text" 
                v-model="newPassword"
                placeholder="请设置新的密码"
                class="input-field"
                maxlength="20"
              />
            </view>
          </view>
          
          <view class="action-tips">
            <uni-icons class="tips-icon" type="info" size="14"></uni-icons>
            <text class="tips-text">建议使用字母、数字组合的复杂密码，提高账户安全性</text>
          </view>
          
          <view class="drawer-actions">
            <button class="action-btn confirm-btn" @click="confirmUpdatePassword">确认修改</button>
            <button class="action-btn cancel-btn" @click="closePasswordDrawer">取消</button>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import monthlyApi from '@/api/monthly'

export default {
  data() {
    return {
      details: {},
      oldPassword: '',
      newPassword: ''
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    // 是否是资格拥有者
    isOwner() {
      return this.userInfo && this.details.userId === this.userInfo.userId
    }
  },

  onLoad(options) {
    if (options.id) {
      this.getDetails(options.id)
    }
  },

  methods: {
    // 获取月结资格详情
    async getDetails(id) {
      try {
        uni.showLoading({ title: '加载中...' })
        const res = await monthlyApi.getEligibilityById(id)
        if (res) {
          this.details = res
        }
      } catch (e) {
        console.error('获取月结资格详情失败:', e)
        uni.showToast({
          title: '获取详情失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },

    // 获取结算周期文本
    getCycleText(cycle) {
      const cycleMap = {
        0: '月结',
        1: '季结',
        2: '半年结'
      }
      return cycleMap[cycle] || '未知'
    },

    // 获取发票要求文本
    getInvoiceText(requirement) {
      const requirementMap = {
        0: '增值税普通发票',
        1: '增值税专用发票',
        2: '其他'
      }
      return requirementMap[requirement] || '未知'
    },

    // 确认注销
    confirmDeactivate() {
      uni.showModal({
        title: '确认注销',
        content: '注销后将无法恢复，是否继续？',
        confirmText: '确认注销',
        confirmColor: '#FF4D4F',
        success: async (res) => {
          if (res.confirm) {
            await this.deactivateEligibility()
          }
        }
      })
    },

    // 注销月结资格
    async deactivateEligibility() {
      try {
        uni.showLoading({ title: '处理中...' })
        await monthlyApi.logoffEligibility(this.details.monthlySettlementEligibilityId)
        
        uni.showToast({
          title: '注销成功',
          icon: 'success'
        })
        
        // 重新获取详情
        await this.getDetails(this.details.monthlySettlementEligibilityId)
      } catch (e) {
        console.error('注销月结资格失败:', e)
        uni.showToast({
          title: '注销失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },

    // 打开密码修改抽屉
    openPasswordDrawer() {
      this.oldPassword = '';
      this.newPassword = '';
      this.$refs.passwordDrawer.open();
    },

    // 关闭密码修改抽屉
    closePasswordDrawer() {
      this.$refs.passwordDrawer.close();
    },

    // 复制密码
    copyPassword() {
      uni.setClipboardData({
        data: this.details.password,
        success: () => {
          uni.showToast({
            title: '密码已复制',
            icon: 'success'
          })
        }
      })
    },

    // 确认修改密码
    async confirmUpdatePassword() {
      if (!this.oldPassword || !this.newPassword) {
        uni.showToast({
          title: '请输入完整密码信息',
          icon: 'none'
        })
        return
      }
      
      if (this.oldPassword === this.newPassword) {
        uni.showToast({
          title: '新密码不能与原密码相同',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({ title: '修改中...' })
        await monthlyApi.updatePassword(
          this.details.monthlySettlementEligibilityId,
          this.oldPassword,
          this.newPassword,
		  this.userInfo.userId
        )
        
        uni.showToast({
          title: '密码修改成功',
          icon: 'success'
        })
        
        this.closePasswordDrawer()
        
        // 重新获取详情
        await this.getDetails(this.details.monthlySettlementEligibilityId)
      } catch (e) {
        console.error('修改密码失败:', e)
        uni.showToast({
          title: '修改失败，请重试',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss">
.details-container {
  min-height: 100vh;
  background: #F5F6FA;
  padding: 30rpx;
  
  .card {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30rpx;
      
      .title {
        display: flex;
        align-items: center;
        
        .uni-icons {
          margin-right: 12rpx;
        }
        
        text {
          font-size: 32rpx;
          color: #333333;
          font-weight: 500;
        }
      }
      
      .status-tag {
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #52C41A;
        background: #F6FFED;
        box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
        
        &.invalid {
          color: #999999;
          background: #F5F5F5;
        }
      }
    }
    
    .info-list {
      .info-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .label {
          width: 160rpx;
          font-size: 28rpx;
          color: #999999;
          padding-top: 4rpx;
        }
        
        .value {
          flex: 1;
          font-size: 28rpx;
          color: #333333;
          line-height: 1.5;
          
          &.highlight {
            color: #FF6B01;
            font-size: 32rpx;
            font-weight: 500;
            
            .unit {
              font-size: 24rpx;
              color: #999999;
              margin-left: 4rpx;
            }
          }
        }
      }
    }
    
    .remark {
      font-size: 28rpx;
      color: #666666;
      line-height: 1.6;
    }
  }

  .bottom-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 30rpx;
    background: #FFFFFF;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 88rpx;
      border-radius: 44rpx;
      font-size: 32rpx;
      
      &.danger {
        background: linear-gradient(90deg, #FF4D4F, #FF7875);
        color: #FFFFFF;
        
        .uni-icons {
          margin-right: 8rpx;
        }
      }
    }
  }
}

// 密码卡片组件样式 - 升级版
.password-card {
  position: relative;
  border: none;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, #FFF9F5, #FFF2EA);
    border-radius: 16rpx;
    z-index: 0;
    box-shadow: 0 10rpx 30rpx rgba(255, 107, 1, 0.08);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 160rpx;
    height: 160rpx;
    background: radial-gradient(circle, rgba(255, 107, 1, 0.08) 0%, rgba(255, 107, 1, 0) 70%);
    z-index: 0;
  }
  
  .card-inner {
    position: relative;
    z-index: 1;
    padding: 40rpx;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 30rpx;
      left: 30rpx;
      width: 120rpx;
      height: 120rpx;
      background: radial-gradient(circle, rgba(255, 147, 66, 0.05) 0%, rgba(255, 147, 66, 0) 70%);
      border-radius: 50%;
      z-index: -1;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 60rpx;
      right: 40rpx;
      width: 80rpx;
      height: 80rpx;
      border: 4rpx solid rgba(255, 107, 1, 0.05);
      border-radius: 50%;
      z-index: -1;
    }
  }
  
  .card-header {
    margin-bottom: 40rpx;
    
    .title-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 20rpx;
      gap: 16rpx;
    }
    
    .title-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, rgba(255, 107, 1, 0.15), rgba(255, 107, 1, 0.08));
      padding: 12rpx 28rpx;
      border-radius: 36rpx;
      box-shadow: 0 4rpx 12rpx rgba(255, 107, 1, 0.12), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.6);
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 107, 1, 0.15);
      align-self: flex-start;
      margin-bottom: 0;
      max-width: none;
      flex-shrink: 0;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
        z-index: 0;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rpx;
        background: linear-gradient(90deg, transparent, rgba(255, 107, 1, 0.5), transparent);
      }
      
      .uni-icons {
        color: #FF6B01;
        margin-right: 8rpx;
        font-size: 24px;
        position: relative;
        z-index: 1;
        filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.7));
      }
      
      text {
        font-size: 32rpx;
        color: #FF6B01;
        font-weight: 600;
        letter-spacing: 1rpx;
        position: relative;
        z-index: 1;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
      }
    }
    
    .security-tag {
      font-size: 24rpx;
      color: #555;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(248, 248, 248, 0.7));
      padding: 8rpx 24rpx;
      border-radius: 28rpx;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 3rpx 10rpx rgba(0, 0, 0, 0.06),
                  inset 0 1px 0 #FFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
      align-self: flex-start;
      margin-left: 0;
      flex-shrink: 0;
      
      &::before {
        content: '';
        position: absolute;
        left: -2rpx;
        top: -2rpx;
        right: -2rpx;
        bottom: -2rpx;
        border-radius: 28rpx;
        background: linear-gradient(135deg, rgba(255, 107, 1, 0.03), rgba(0, 0, 0, 0.01));
        z-index: -1;
      }
      
      .uni-icons {
        font-size: 14px;
        margin-right: 8rpx;
        color: #FF8C3D;
        position: relative;
        z-index: 1;
      }
      
      text {
        color: #555;
        font-weight: 500;
        position: relative;
        z-index: 1;
        letter-spacing: 0.5rpx;
      }
      
      &:active {
        transform: scale(0.98);
        background: rgba(245, 245, 245, 0.9);
      }
    }
    
    .description {
      font-size: 26rpx;
      color: #888;
      margin-top: 16rpx;
      margin-left: 12rpx;
      position: relative;
      max-width: 90%;
      line-height: 1.5;
      
      &::before {
        content: '';
        position: absolute;
        left: -12rpx;
        top: 10rpx;
        width: 4rpx;
        height: 20rpx;
        background: #FFB380;
        border-radius: 2rpx;
      }
    }
  }
  
  .password-display {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 20rpx;
    padding: 40rpx 30rpx;
    margin-bottom: 36rpx;
    box-shadow: 0 6rpx 20rpx rgba(255, 107, 1, 0.08),
                inset 0 1rpx 0 rgba(255, 255, 255, 1),
                inset 0 0 20rpx rgba(255, 107, 1, 0.02);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6rpx;
      background: linear-gradient(90deg, #FF6B01, #FFAA70, #FF6B01);
      background-size: 200% 100%;
      animation: gradientShift 8s infinite linear;
    }
    
    .password-text {
      text-align: center;
      font-family: 'SF Mono', 'Courier New', monospace;
      font-size: 48rpx;
      color: #333;
      font-weight: 600;
      letter-spacing: 4rpx;
      margin-bottom: 20rpx;
      position: relative;
      padding: 15rpx 0;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 140rpx;
        height: 2rpx;
        background: linear-gradient(90deg, transparent, rgba(255, 107, 1, 0.2), transparent);
      }
    }
    
    .password-hint {
      text-align: center;
      font-size: 24rpx;
      color: #999;
      margin-top: 20rpx;
      padding: 0 20rpx;
      line-height: 1.6;
      
      &::before {
        content: '•';
        margin-right: 6rpx;
        color: #FFB380;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      width: 200rpx;
      height: 200rpx;
      background: radial-gradient(circle, rgba(255, 107, 1, 0.03) 0%, rgba(255, 107, 1, 0) 70%);
      top: -100rpx;
      right: -100rpx;
      border-radius: 50%;
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 24rpx;
    padding: 0 10rpx;
    
    .action-btn {
      flex: 1;
      height: 92rpx;
      border-radius: 46rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &.copy-btn {
        background: #FFF;
        color: #666;
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.04),
                    inset 0 2rpx 0 rgba(255, 255, 255, 1);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4));
          z-index: 0;
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        
        .uni-icons {
          font-size: 18px;
          color: #FF8C3D;
          margin-right: 10rpx;
          transition: all 0.3s ease;
        }
        
        text {
          color: #666;
          font-weight: 500;
        }
        
        &:active {
          transform: translateY(3rpx);
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
          
          .uni-icons {
            transform: scale(1.1);
            color: #FF6B01;
          }
        }
      }
      
      &.modify-btn {
        background: linear-gradient(135deg, #FF7416, #FF9548);
        color: #FFF;
        box-shadow: 0 8rpx 24rpx rgba(255, 107, 1, 0.3),
                    inset 0 2rpx 0 rgba(255, 255, 255, 0.3);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          transform: skewX(-20deg);
          animation: shimmer 4s infinite;
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .uni-icons {
          font-size: 20px;
          color: #FFF;
          margin-right: 10rpx;
          transition: all 0.3s ease;
        }
        
        text {
          color: #FFF;
          font-weight: 600;
          letter-spacing: 1rpx;
        }
        
        &:active {
          transform: translateY(4rpx);
          box-shadow: 0 3rpx 10rpx rgba(255, 107, 1, 0.2);
          background: linear-gradient(135deg, #F05800, #FF8530);
          
          .uni-icons {
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}

// 修改密码抽屉样式 - 升级版
.password-drawer {
  .drawer-content {
    padding: 60rpx 60rpx 80rpx;
    background: #FFF;
    border-radius: 40rpx 40rpx 0 0;
    box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 20rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 80rpx;
      height: 8rpx;
      background: #EAEAEA;
      border-radius: 4rpx;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -150rpx;
      right: -100rpx;
      width: 300rpx;
      height: 300rpx;
      background: radial-gradient(circle, rgba(255, 107, 1, 0.03) 0%, rgba(255, 107, 1, 0) 70%);
      border-radius: 50%;
      z-index: 0;
    }
  }
  
  .drawer-header {
    text-align: center;
    margin-bottom: 60rpx;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 160rpx;
      height: 6rpx;
      background: linear-gradient(90deg, transparent, rgba(255, 107, 1, 0.3), transparent);
      bottom: -20rpx;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 3rpx;
    }
    
    .drawer-title {
      font-size: 40rpx;
      color: #333;
      font-weight: 600;
      margin-bottom: 16rpx;
      position: relative;
      display: inline-block;
      
      &::before {
        content: '';
        position: absolute;
        width: 24rpx;
        height: 24rpx;
        border-radius: 50%;
        background: rgba(255, 107, 1, 0.1);
        left: -30rpx;
        top: 50%;
        transform: translateY(-50%);
      }
      
      &::after {
        content: '';
        position: absolute;
        width: 24rpx;
        height: 24rpx;
        border-radius: 50%;
        background: rgba(255, 107, 1, 0.1);
        right: -30rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    
    .drawer-subtitle {
      font-size: 26rpx;
      color: #999;
      max-width: 80%;
      margin: 0 auto;
      line-height: 1.5;
    }
  }
  
  .input-section {
    margin-bottom: 40rpx;
    position: relative;
    z-index: 1;
  }
  
  .input-group {
    margin-bottom: 36rpx;
    
    .input-label {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .label-icon {
        width: 44rpx;
        height: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 107, 1, 0.1);
        border-radius: 50%;
        margin-right: 14rpx;
        box-shadow: 0 2rpx 8rpx rgba(255, 107, 1, 0.1);
        
        .uni-icons {
          font-size: 20rpx;
          color: #FF6B01;
        }
      }
      
      text {
        font-size: 30rpx;
        color: #333;
        font-weight: 500;
      }
    }
    
    .input-field {
      background: rgba(248, 249, 252, 0.8);
      border-radius: 20rpx;
      padding: 0 30rpx;
      height: 100rpx;
      border: 1px solid #EAEAEA;
      font-size: 32rpx;
      color: #333;
      transition: all 0.25s ease;
      box-shadow: inset 0 2rpx 5rpx rgba(0, 0, 0, 0.02);
      
      &:focus {
        border-color: #FF6B01;
        background: #FFF;
        box-shadow: 0 0 0 3px rgba(255, 107, 1, 0.1),
                    inset 0 2rpx 3rpx rgba(0, 0, 0, 0);
      }
    }
  }
  
  .action-tips {
    margin-top: 10rpx;
    display: flex;
    align-items: flex-start;
    margin-bottom: 50rpx;
    background: rgba(255, 107, 1, 0.05);
    padding: 20rpx;
    border-radius: 16rpx;
    position: relative;
    z-index: 1;
    
    .tips-icon {
      margin-right: 12rpx;
      color: #FF6B01;
      font-size: 16px;
      margin-top: 2rpx;
    }
    
    .tips-text {
      font-size: 24rpx;
      line-height: 1.6;
      color: #888;
      flex: 1;
    }
  }
  
  .drawer-actions {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 0 -20rpx;
    
    .action-btn {
      height: 120rpx;
      border-radius: 60rpx;
      font-size: 36rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      width: calc(100% + 40rpx);
      align-self: center;
      
      &.confirm-btn {
        background: linear-gradient(90deg, #FF6B01, #FF9548);
        color: #FFF;
        font-weight: 600;
        box-shadow: 0 10rpx 30rpx rgba(255, 107, 1, 0.25),
                    inset 0 2rpx 0 rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
        letter-spacing: 2rpx;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
        }
        
        &:active {
          transform: translateY(4rpx);
          box-shadow: 0 3rpx 10rpx rgba(255, 107, 1, 0.15);
          background: linear-gradient(90deg, #F05800, #FF8530);
        }
      }
      
      &.cancel-btn {
        background: #F8F9FA;
        color: #888;
        border: 1px solid rgba(0, 0, 0, 0.05);
        font-weight: 500;
        height: 110rpx;
        font-size: 34rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03),
                    inset 0 2rpx 0 #FFFFFF;
        
        &:active {
          background: #EAEAEA;
          color: #666;
          transform: translateY(2rpx);
        }
      }
    }
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  15%, 100% {
    left: 100%;
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

.disabled-card {
  background: #F8F8F8;
  border: 1px dashed #DDDDDD;
  
  .card-inner {
    padding: 40rpx;
  }
  
  .disabled-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    
    .uni-icons {
      margin-bottom: 20rpx;
      opacity: 0.6;
    }
    
    .disabled-text {
      font-size: 28rpx;
      color: #999;
      text-align: center;
    }
  }
}
</style> 
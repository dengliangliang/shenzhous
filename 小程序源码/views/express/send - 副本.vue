<template>
	<view class="send-container">
		<!-- 保留顶部选项卡，但修改为导航功能 -->
		<view class="tab-header">
			<view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
				@click="navToTab(index)">
				<image :src="tab.icon" mode="aspectFit" class="tab-icon"></image>
				<text>{{ tab.name }}</text>
			</view>
		</view>

		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 普通寄件内容区域 -->
			<scroll-view scroll-y class="content-scroll" :scroll-top="scrollTop"
				:style="{ height: 'calc(100vh - ' + (isIPhoneX ? '168rpx' : '118rpx') + ')' }">
				<view class="content-area">
					<!-- 寄件人信息 -->
					<view class="form-card">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="paperplane" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">寄件人信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 地址簿选择卡片 -->
							<view v-if="!formData.senderName" class="address-empty-card ripple"
								@click="selectAddress('sender')">
								<uni-icons type="plusempty" size="24" color="#FF6B01"></uni-icons>
								<text>从地址簿选择寄件人</text>
							</view>

							<!-- 已选择的地址 -->
							<view v-else class="selected-address-card">
								<view class="address-info">
									<view class="address-person-info">
										<text class="address-name">{{ formData.senderName }}</text>
										<text class="address-phone">{{ formatPhone(formData.senderPhone) }}</text>
									</view>
									<text class="address-detail">{{ formData.senderProvince }} {{ formData.senderCity }}
										{{ formData.senderDistrict }} {{ formData.senderDetailAddress }}</text>
								</view>
								<view class="address-actions">
									<view class="address-action-btn ripple" @click="selectAddress('sender')">
										<uni-icons type="loop" size="16" color="#FF6B01"></uni-icons>
										<text>更换</text>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 收件人信息 - 改为只能从地址簿选择 -->
					<view class="form-card" style="animation-delay: 0.1s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="map-pin-ellipse" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">收件人信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 地址簿选择卡片 -->
							<view v-if="!formData.receiverName" class="address-empty-card ripple"
								@click="selectAddress('receiver')">
								<uni-icons type="plusempty" size="24" color="#FF6B01"></uni-icons>
								<text>从地址簿选择收件人</text>
							</view>

							<!-- 已选择的地址 -->
							<view v-else class="selected-address-card">
								<view class="address-info">
									<view class="address-person-info">
										<text class="address-name">{{ formData.receiverName }}</text>
										<text class="address-phone">{{ formatPhone(formData.receiverPhone) }}</text>
									</view>
									<text class="address-detail">{{ formData.receiverProvince }}
										{{ formData.receiverCity }} {{ formData.receiverDistrict }}
										{{ formData.receiverDetailAddress }}</text>
								</view>
								<view class="address-actions">
									<view class="address-action-btn ripple" @click="selectAddress('receiver')">
										<uni-icons type="loop" size="16" color="#FF6B01"></uni-icons>
										<text>更换</text>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 物品信息卡片 -->
					<view class="form-card" style="animation-delay: 0.2s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="package" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">物品信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 物品类型选择 - 自动完成输入框 -->
							<view class="input-row">
								<text class="label">物品类型</text>
								<view class="dropdown-wrapper">
									<view class="input-wrapper">
										<input type="text" v-model="expressTypeQuery" placeholder="请选择或输入物品类型"
											@input="onExpressTypeSearch" @focus="showTypeDropdown = true"
											@blur="onTypeInputBlur" class="input" />
										<!-- 添加加载指示器 -->
										<view v-if="expressTypeSearchLoading" class="search-loading">
											<view class="loading-dot"></view>
										</view>
										<uni-icons v-else type="search" size="16" color="#999"
											class="search-icon"></uni-icons>
									</view>

									<!-- 下拉列表 -->
									<view class="type-dropdown" v-if="showTypeDropdown">
										<!-- 显示调试信息 -->
										<view class="type-debug"
											v-if="filteredExpressTypes.length === 0 && !expressTypeSearchLoading">
											<text>未找到相关物品类型</text>
											<text v-if="expressTypeQuery" class="debug-query">搜索词:
												"{{ expressTypeQuery }}"</text>
										</view>

										<!-- 物品类型列表 -->
										<view class="type-item ripple" v-for="(item, index) in filteredExpressTypes"
											:key="index" @tap.stop="selectExpressType(item)">
											<text>{{ item.typeName }}</text>
										</view>
									</view>
								</view>
							</view>

							<!-- 预估重量 -->
							<view class="input-row">
								<text class="label">物品重量 (kg)</text>
								
								<input type="digit" v-model="formData.estimatedItemWeight" placeholder="请输入物品重量"
									class="input weight-input" @input="validateWeightInput" @blur="checkAndQueryExpress"
									maxlength="5" />
								<text class="unit-text">kg</text>
							</view>

							<!-- 体积尺寸 (可选) -->
							<view class="input-row">
								<text class="label">物品尺寸 (cm)</text>
								<view class="size-inputs">
									<input type="digit" v-model="formData.length" placeholder="长"
										class="input size-input" @input="validateSizeInput('length', $event)"
										maxlength="4" />
									<text class="size-separator">×</text>
									<input type="digit" v-model="formData.width" placeholder="宽"
										class="input size-input" @input="validateSizeInput('width', $event)"
										maxlength="4" />
									<text class="size-separator">×</text>
									<input type="digit" v-model="formData.height" placeholder="高"
										class="input size-input" @input="validateSizeInput('height', $event)"
										maxlength="4" />
									<text class="unit-text">cm</text>
								</view>
							</view>

							<!-- 上门备注 -->
							<view class="input-row">
								<text class="label">上门备注</text>
								<input type="text" v-model="formData.remark" placeholder="如特殊要求请备注说明" class="input" />
							</view>
						</view>
					</view>

					<!-- 快递选项卡片 -->
					<view class="form-card express-card-section" style="animation-delay: 0.3s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="car" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">快递选项</text>
							</view>

							<!-- 添加刷新按钮 -->
							<view class="refresh-btn ripple" @click="queryExpressOptions" v-if="canQueryExpress()">
								<uni-icons type="refresh" size="16" color="#FF6B01"></uni-icons>
								<text>刷新</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 快递公司选择 -->
							<view class="express-options-section">
								<text class="section-title">快递公司</text>

								<!-- 加载状态 -->
								<view v-if="expressLoading" class="express-loading-state">
									<text>正在获取快递报价...</text>
									<view class="loading-spinner"></view>
								</view>

								<!-- 没有快递选项 -->
								<view v-else-if="expressCompanies.length === 0" class="express-empty-hint">
									<text>请完善寄收件信息获取快递报价</text>
								</view>

								<!-- 快递公司垂直列表 -->
								<view v-else class="express-list">
									<view class="express-item-vertical" v-for="(item, index) in expressCompanies"
										:key="item.id" :class="{ active: formData.expressIndex === index }"
										@click="selectExpress(index)">
										<view class="express-item-left">
											<image :src="getExpressLogo(item.companyCode)" mode="aspectFit"
												class="express-logo"></image>
											<text class="express-name">{{item.name}}</text>
										</view>
										<view class="express-item-right">
											<text class="express-price">¥{{item.fee.toFixed(2)}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 取件时间卡片 - 仅在获取价格后显示 -->
					<view class="form-card" v-if="hasExpressOptions" style="animation-delay: 0.4s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="calendar" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">取件时间</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 取件时间选择 - 优化样式 -->
							<view class="pickup-time-header">
								<text class="pickup-tip">快递小哥会在您选择的时间上门取件</text>
							</view>

							<!-- 日期选择 -->
							<view class="date-selector">
								<scroll-view scroll-x class="date-scroll" show-scrollbar="false">
									<view class="date-scroll-container">
										<view v-for="(date, index) in pickupDateOptions" :key="index" class="date-item"
											:class="{'active': formData.pickupDate === date.value}"
											@click="selectPickupDate(date.value)">
											<text class="date-text">{{ date.label }}</text>
										</view>
									</view>
								</scroll-view>
							</view>

							<!-- 时间段选择 -->
							<view class="time-selector">
								<view class="time-options">
									<view v-for="(time, index) in updateAvailableTimeOptions()" :key="index"
										class="time-item" :class="{'active': formData.pickupTime === time.value}"
										@click="selectPickupTime(time.value)">
										<text class="time-text">{{ time.label }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 更优化的保价服务UI设计 -->
					<view class="form-card" v-if="hasExpressOptions" style="animation-delay: 0.5s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="shield" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">增值服务</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 保价服务卡片 -->
							<view class="insurance-card" :class="{'disabled': !insuranceSupported}">
								<view class="insurance-header">
									<view class="insurance-info">
										<view class="service-icon">
											<view class="checkbox-wrapper"
												:class="{'active': formData.needInsurance && insuranceSupported}">
												<uni-icons type="checkmarkempty" size="16" color="#FFFFFF"
													v-if="formData.needInsurance && insuranceSupported"></uni-icons>
											</view>
										</view>
										<view class="service-details">
											<text class="service-title">保价服务</text>
											<text class="service-desc" v-if="insuranceSupported">物品损坏或丢失可获得赔偿</text>
											<text class="service-desc unavailable"
												v-else>{{ insuranceUnavailableReason || '当前快递不支持保价' }}</text>
										</view>
									</view>

									<view class="service-toggle">
										<switch :checked="formData.needInsurance && insuranceSupported"
											:disabled="!insuranceSupported" color="#FF6B01" @change="toggleInsurance" />
									</view>
								</view>

								<!-- 保价金额输入区域 - 仅在启用保价时显示 -->
								<view class="insurance-amount-section"
									v-if="formData.needInsurance && insuranceSupported">
									<view class="insurance-explainer">
										<uni-icons type="info-filled" size="18" color="#FF6B01"></uni-icons>
										<text>保价金额是您物品的实际价值，保价费用根据该金额计算</text>
									</view>

									<!-- 展示保价规则说明 -->
									<view class="insurance-rule" v-if="insuranceRule">
										<uni-icons type="info" size="16" color="#999999"></uni-icons>
										<text>保价规则: {{ insuranceRule }}</text>
									</view>

									<view class="amount-section">
										<view class="amount-label">
											<text>物品价值</text>
											<text class="hint">(元)</text>
										</view>

										<view class="amount-fee-display">
											<text class="fee-calc">预计保费: ¥{{ insuranceFee.toFixed(2) }}</text>
										</view>
									</view>

									<view class="value-slider-section">
										<view class="slider-labels">
											<text>{{ minInsuranceAmount }}元</text>
											<text>{{ Math.floor((minInsuranceAmount + maxInsuranceAmount) / 2) }}元</text>
											<text>{{ maxInsuranceAmount }}元</text>
										</view>

										<slider :min="minInsuranceAmount" :max="maxInsuranceAmount"
											:step="Math.min(500, (maxInsuranceAmount - minInsuranceAmount) / 10)"
											:value="Number(formData.guaranteeValueAmount)" activeColor="#FF6B01"
											backgroundColor="#EEEEEE" blockColor="#FF6B01" blockSize="24"
											@change="onSliderChange" />
									</view>

									<!-- 添加物品价值输入框 -->
									<view class="value-input-container">
										<view class="value-input-wrapper">
											<text class="value-label">物品价值：</text>
											<view class="input-group">
												<text class="currency-symbol">¥</text>
												<input type="digit" class="value-input"
													:value="formData.guaranteeValueAmount"
													@input="onInsuranceAmountChange" placeholder="输入物品价值" />
												<text class="unit">元</text>
											</view>
										</view>

										<view class="quick-value-btns">
											<view class="quick-btn" @click="setQuickAmount(1000)">1千</view>
											<view class="quick-btn" @click="setQuickAmount(3000)">3千</view>
											<view class="quick-btn" @click="setQuickAmount(5000)">5千</view>
											<view class="quick-btn" @click="setQuickAmount(10000)">1万</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 费用明细卡片 - 仅在获取价格后显示 -->

					<!-- 支付方式卡片 - 更美观设计 -->
					<view class="form-card" v-if="hasExpressOptions" style="animation-delay: 0.7s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="wallet" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">支付方式</text>
							</view>
						</view>

						<view class="form-content">
							<view class="payment-methods">
								<!-- 在线支付选项 -->
								<view class="payment-option" :class="{
                    'active': formData.paymentMethod === 'online',
                    'disabled': !isPaymentMethodSupported('online')
                  }" @click="isPaymentMethodSupported('online') && selectPaymentMethod('online')">
									<view class="payment-left">
										<view class="payment-icon wechat">
											<uni-icons type="weixin" size="20" color="#09BB07"></uni-icons>
										</view>
										<view class="payment-details">
											<text class="payment-name">微信支付</text>
											<text class="payment-desc"
												v-if="isPaymentMethodSupported('online')">支持微信快捷支付</text>
											<text class="payment-desc unavailable" v-else>当前快递不支持</text>
										</view>
									</view>
									<view class="payment-right">
										<view class="radio-btn"
											:class="{'checked': formData.paymentMethod === 'online'}">
											<view class="radio-inner" v-if="formData.paymentMethod === 'online'"></view>
										</view>
									</view>
								</view>

								<!-- 月结账户支付 -->
								<view class="payment-option" v-if="hasMonthlyAccount" :class="{
                    'active': formData.paymentMethod === 'monthly',
                    'disabled': !isPaymentMethodSupported('monthly')
                  }" @click="isPaymentMethodSupported('monthly') && selectPaymentMethod('monthly')">
									<view class="payment-left">
										<view class="payment-icon monthly">
											<uni-icons type="calendar" size="20" color="#FF6B01"></uni-icons>
										</view>
										<view class="payment-details">
											<text class="payment-name">月结账户</text>
											<text class="payment-desc"
												v-if="isPaymentMethodSupported('monthly')">使用企业月结账户支付</text>
											<text class="payment-desc unavailable" v-else>当前快递不支持</text>
										</view>
									</view>
									<view class="payment-right">
										<view class="radio-btn"
											:class="{'checked': formData.paymentMethod === 'monthly'}">
											<view class="radio-inner" v-if="formData.paymentMethod === 'monthly'">
											</view>
										</view>
									</view>
								</view>
								<view class="payment-option" :class="{
								  'active': formData.paymentMethod === 'onlineCollect',
								  'disabled': !isPaymentMethodSupported('onlineCollect')
								}" @click="isPaymentMethodSupported('onlineCollect') && selectPaymentMethod('onlineCollect')">
									<view class="payment-left">
										<view class="payment-icon cod">
											<uni-icons type="shop" size="20" color="#3A86FF"></uni-icons>
										</view>
										<view class="payment-details">
											<text class="payment-name">线上到付</text>
											<text class="payment-desc"
												v-if="isPaymentMethodSupported('onlineCollect')">快递收货后付款</text>
											<text class="payment-desc unavailable" v-else>当前快递不支持到付</text>
										</view>
									</view>
									<view class="payment-right">
										<view class="radio-btn"
											:class="{'checked': formData.paymentMethod === 'onlineCollect'}">
											<view class="radio-inner" v-if="formData.paymentMethod === 'onlineCollect'">
											</view>
										</view>
									</view>
								</view>
								<!-- 到付选项 -->
								<!-- <view class="payment-option" :class="{
                    'active': formData.paymentMethod === 'cod',
                    'disabled': !isPaymentMethodSupported('cod')
                  }" @click="isPaymentMethodSupported('cod') && selectPaymentMethod('cod')">
									<view class="payment-left">
										<view class="payment-icon cod">
											<uni-icons type="shop" size="20" color="#3A86FF"></uni-icons>
										</view>
										<view class="payment-details">
											<text class="payment-name">到付</text>
											<text class="payment-desc"
												v-if="isPaymentMethodSupported('cod')">收件方支付快递费用</text>
											<text class="payment-desc unavailable" v-else>当前快递不支持到付</text>
										</view>
									</view>
									<view class="payment-right">
										<view class="radio-btn" :class="{'checked': formData.paymentMethod === 'cod'}">
											<view class="radio-inner" v-if="formData.paymentMethod === 'cod'"></view>
										</view>
									</view>
								</view> -->
							</view>
						</view>
					</view>



					<!-- 余额抵扣卡片 -->
					<view class="form-card" v-if="hasExpressOptions && availableBalance > 0"
						style="animation-delay: 0.6s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="wallet" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">佣金抵扣</text>
							</view>
						</view>

						<view class="form-content">
							<view class="balance-card" :class="{'disabled': !canUseCommission}">
								<view class="balance-header">
									<view class="balance-info">
										<view class="service-icon">
											<view class="checkbox-wrapper"
												:class="{'active': formData.useCommission, 'disabled': !canUseCommission}">
												<uni-icons type="checkmarkempty" size="16" color="#FFFFFF"
													v-if="formData.useCommission"></uni-icons>
											</view>
										</view>
										<view class="service-details">
											<view>
												<text class="service-title">佣金抵扣</text>
											</view>
											<view>
												<text class="service-desc">可用佣金
													¥{{ availableBalance.toFixed(2) }}</text>
											</view>


										</view>
									</view>

									<view class="service-toggle">
										<switch :checked="formData.useCommission" color="#FF6B01"
											@change="toggleUseBalance" :disabled="!canUseCommission" />
									</view>
								</view>

								<!-- 不支持线上支付时的提示 -->
								<view class="payment-notice" v-if="!canUseCommission">
									<uni-icons type="info" size="14" color="#999"></uni-icons>
									<text>当前快递公司或支付方式不支持使用佣金抵扣</text>
								</view>

								<!-- 抵扣金额说明 - 仅在启用抵扣时显示 -->
								<view class="balance-detail" v-if="formData.useCommission">
									<view class="balance-explainer">
										<uni-icons type="info-filled" size="18" color="#FF6B01"></uni-icons>
										<text>已抵扣 ¥{{ formData.commissionAmount }}</text>
									</view>

									<view class="deduction-info">
										<text class="deduction-label">抵扣后需支付：</text>
										<text
											class="deduction-amount">¥{{ (parseFloat((totalFee || 0).toFixed(2)) - parseFloat((formData.commissionAmount || 0).toFixed(2))) > 0 ? (parseFloat((totalFee || 0).toFixed(2)) - parseFloat((formData.commissionAmount || 0).toFixed(2))).toFixed(2) : '0.00' }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="form-card" v-if="hasExpressOptions" style="animation-delay: 0.6s">
						<view class="card-header">
							<view class="title-wrapper">
								<uni-icons type="list" size="20" color="#FF6B01"></uni-icons>
								<text class="card-title">费用明细</text>
							</view>
						</view>

						<view class="form-content fee-content">
							<view class="fee-item">
								<text class="fee-label">快递费</text>
								<text class="fee-value">¥{{ baseFee.toFixed(2) }}</text>
							</view>

							<view class="fee-item" v-if="insuranceFee > 0">
								<text class="fee-label">保价费</text>
								<text class="fee-value">¥{{ insuranceFee.toFixed(2) }}</text>
							</view>

							<view class="fee-divider"></view>

							<view class="fee-item total">
								<text class="fee-label">合计</text>
								<text class="fee-value highlight">¥{{ totalFee.toFixed(2) }}</text>
							</view>
						</view>
					</view>
					<!-- 添加同意协议部分 -->
					<view class="form-card agreement-card" style="animation-delay: 0.8s">
						<view class="agreement-content">
							<view class="agreement-checkbox" @click="toggleAgreement">
								<view class="checkbox-wrapper" :class="{'active': formData.agreedToTerms}">
									<uni-icons type="checkmarkempty" size="16" color="#FFFFFF"
										v-if="formData.agreedToTerms"></uni-icons>
								</view>
								<view class="agreement-text">
									<text>我已阅读并同意</text>
									<text class="agreement-link" @click.stop="handleExpress">《神州邮服务协议》</text>
								</view>
							</view>


						</view>
						<!-- 显示错误提示 -->
						<view class="agreement-error" v-if="showAgreementError">
							<uni-icons type="info-filled" size="14" color="#FF5252"></uni-icons>
							<text>请先同意神州邮服务协议</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 底部按钮区域 -->
		<view class="bottom-btn-area">
			<view class="total-fee">
				<text class="fee-label">合计</text>
				<view class="fee-amount-wrapper">
					<text class="deduction-text" v-if="formData.useCommission">已抵扣
						¥{{ formData.commissionAmount }}</text>
					<!-- 直接计算显示，不依赖计算属性 -->
					<text
						class="fee-amount">¥{{ (parseFloat((totalFee || 0).toFixed(2)) - parseFloat((formData.commissionAmount || 0).toFixed(2))) > 0 ? (parseFloat((totalFee || 0).toFixed(2)) - parseFloat((formData.commissionAmount || 0).toFixed(2))).toFixed(2) : '0.00' }}</text>
				</view>
			</view>
			<!-- 修改button的open-type为shareTimeline -->
			<button class="share-btn wechat" @tap="showShareGuideLayer">

				<view class="btn-inner">
					<text>分享获佣金</text>
				</view>
			</button>

			<button class="submit-btn" :class="{ active: submitBtnActive }" @click="submitOrder"
				@touchstart="submitBtnActive = true" @touchcancel="submitBtnActive = false" :disabled="submitting">
				<text v-if="!submitting">立即下单</text>
				<view v-else class="loading-icon"></view>
			</button>


		</view>

		<!-- 在页面底部添加分享引导遮罩 -->
		<view class="share-guide-mask" v-if="showShareGuide" @tap="hideShareGuide">
			<view class="guide-content" @tap.stop>
				<!-- 指向箭头 -->
				<view class="guide-arrow"></view>
				
				<!-- 简化的指引内容 -->
				<view class="guide-box">
					<view class="guide-text">点击右上角分享按钮分享至朋友圈</view>
					<view class="guide-tips">邀请好友成功注册后可获得佣金奖励</view>
					<button class="guide-close-btn" @tap="hideShareGuide">我知道了</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import addressApi from '@/api/address'
	import expressApi from '@/api/express'
	import expressTypeApi from '@/api/expressType'
	import userApi from '@/api/user'
	import monthlyApi from '@/api/monthly'
	import orderApi from '@/api/order'
	import paymentApi from '@/api/payment'
	import wxpayApi from '@/api/wechat.js'

	import {
		mapState
	} from 'vuex'
	import commissionFlowApi from '@/api/commissionFlow'
	import statementApi from '@/api/statement'
	// 引入月结API
	import {
		checkEffective
	} from '@/api/monthly.js';

	export default {
		data() {
			return {
				// 保留选项卡数据
				currentTab: 0,
				tabs: [{
						name: '寄快递',
						icon: '/static/icon/cargo.png',
						url: '/views/express/send'
					},
					{
						name: '批量寄件',
						icon: '/static/icon/batch.png',
						url: '/views/express/batch'
					},
					{
						name: '快运寄件',
						icon: '/static/icon/express.png',
						url: '/views/express/cargo'
					}
				],

				// 物品类型相关数据
				expressTypes: [], // 物品类型列表
				expressTypeQuery: '', // 物品类型搜索文本
				showTypeDropdown: false, // 控制下拉框显示
				filteredExpressTypes: [], // 过滤后的物品类型列表

				// 其他必要数据...
				monthlyCheckLoading: false,
				hasMonthlyEligibility: false,

				// 恢复必要的数据属性
				expressLoading: false, // 是否正在加载快递选项
				expressCompanies: [], // 快递公司列表
				baseFee: 0, // 基本运费
				totalFee: 0, // 总费用
				insuranceFee: 0, // 保险费用
				scrollTop: 0, // 滚动位置

				// 其他必要数据...
				isIPhoneX: false, // 是否为iPhone X系列
				submitting: false, // 提交状态
				submitBtnActive: false, // 按钮活动状态

				// 保留表单数据
				formData: {
					// 寄件人信息
					senderName: '',
					senderPhone: '',
					senderProvince: '',
					senderCity: '',
					senderDistrict: '',
					senderDetailAddress: '',

					// 收件人信息
					receiverName: '',
					receiverPhone: '',
					receiverProvince: '',
					receiverCity: '',
					receiverDistrict: '',
					receiverDetailAddress: '',

					// 物品信息
					itemType: '',
					estimatedItemWeight: '',
					length: '',
					width: '',
					height: '',
					remark: '',

					// 快递信息
					expressIndex: -1,
					companyCode: '',

					// 上门取件时间

					pickupDate: '', // 取件日期
					pickupTime: '', // 取件时间段
					// 增值服务
					needInsurance: false,
					guaranteeValueAmount: '', // 设置默认值为1000元
					paymentMethod: 'online', // 默认在线支付：online, monthly, cod
					// 支付相关
					payMethod: 30, // 默认线上支付
					onlinePayType: '', // 默认微信支付
					useCommission: false, // 是否使用佣金抵扣
					commissionAmount: 0, // 佣金抵扣金额
					packageCount: 1, // 默认包裹数量为1
					weight: '', // 重量需要用户输入
					goodsType: '' // 物品类型需要用户选择
				},

				// 用户佣金数据
				userInfo: {},
				userCommission: 0,

				// 其他必要属性
				expressTypeSearchLoading: false,
				expressTypeSearchTimer: null, // 添加一个计时器变量

				// 添加控制变量
				hasExpressOptions: false, // 确保初始值为false

				// 取件时间选项
				pickupDateOptions: [], // 可选取件日期
				pickupTimeOptions: [ // 可选时间段
					{
						value: '8:00-10:00',
						label: '上午 8:00-10:00'
					},
					{
						value: '10:00-12:00',
						label: '上午 10:00-12:00'
					},
					{
						value: '12:00-14:00',
						label: '中午 12:00-14:00'
					},
					{
						value: '14:00-16:00',
						label: '下午 14:00-16:00'
					},
					{
						value: '16:00-18:00',
						label: '下午 16:00-18:00'
					},
					{
						value: '18:00-20:00',
						label: '晚上 18:00-20:00'
					}
				],

				// 增加保价相关数据
				insuranceUnavailableReason: '', // 不可保价原因
				insuranceRule: '', // 保价规则描述

				// 保价金额范围
				minInsuranceAmount: 1000,
				maxInsuranceAmount: 10000,

				// 支付相关
				supportedPayMethods: [], // 支持的支付方式
				hasMonthlyAccount: false, // 是否有月结账户


				// 账户余额相关
				availableBalance: 0,
				canUseCommission: false,
				forceUpdate: false,
				insuranceSupported: false, // 确保这个属性存在于 data 中

				// 协议相关
				formData: {
					// ... 现有属性 ...
					agreedToTerms: false, // 是否同意协议
				},
				showAgreementError: false, // 是否显示协议错误提示
				showShareGuide: false, // 显示分享引导遮罩

			}
		},
		computed: {
			// 将userInfo重命名为storeUserInfo，避免与data中的userInfo冲突
			...mapState({
				storeUserInfo: state => state.user.userInfo
			}),

			// 最终支付金额
			finalPayAmount() {
				// 确保数值类型运算，使用Number强制转换
				const totalFee = Number(parseFloat(this.totalFee || 0).toFixed(2));
				const commissionAmount = Number(parseFloat(this.formData.commissionAmount || 0).toFixed(2));

				// 计算最终金额
				let finalAmount = Math.max(0, totalFee - commissionAmount);

				// 处理非常小的值
				if (finalAmount < 0.01) finalAmount = 0;

				console.log('最终金额详细计算:', {
					总费用原始: this.totalFee,
					总费用转换后: totalFee,
					抵扣金额原始: this.formData.commissionAmount,
					抵扣金额转换后: commissionAmount,
					计算结果: finalAmount,
					格式化结果: finalAmount.toFixed(2)
				});

				return finalAmount.toFixed(2);
			},

			insuranceRuleStr() {
				// 可以返回默认的保险规则
				return "保险费用为货物价值的1%，最低3元";
			},
		},

		created() {
			this.formData.commissionAmount = 0
			console.log(this.formData.commissionAmount)
			// 隐藏需要获取快递价格后才显示的内容
			this.hasExpressOptions = false;

			// 立即检查月结账户资格
			this.checkMonthlyAccount();

			// 初始化用户余额
			this.initUserBalance();


		},
		// 添加朋友圈分享处理函数
		onShareTimeline() {
			return {
				title: `${this.userInfo.userName || '好友'}邀请您加入神州邮`,
				query: `inviteCode=${this.userInfo.myCode}&register=true`, // 参数统一放在 query
				imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
				path: '/pages/login/login' // 路径保持干净，微信会自动拼接 query
			}
		},
		// 保留原有好友分享功能
		onShareAppMessage() {
			return {
				title: `${this.userInfo.userName || '好友'}邀请您加入神州邮`,
				path: `/pages/login/login?inviteCode=${this.userInfo.myCode}&register=true`,
				imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
				success: () => {
					uni.showToast({
						title: '分享成功',
						icon: 'success'
					})
				}
			}
		},
		mounted() {
			// 检测是否为iPhone X系列
			this.checkIphoneX();
		},

		methods: {
			// 处理快递协议
			handleExpress() {
				uni.navigateTo({
					url: '/views/express/express'
				})
			},

			// 获取物品类型列表 - 通过API
			getExpressTypes() {
				// 显示加载状态
				uni.showLoading({
					title: '加载物品类型...'
				});

				// 调用API获取物品类型 - 使用正确的方法
				expressTypeApi.getExpressTypeList().then(res => {
					if (res) {
						console.log('获取到的物品类型数据:', res);

						// 确保数据格式正确，并统一属性名
						this.expressTypes = (res || []).map(item => {
							return {
								typeId: item.id || item.typeId,
								typeName: item.expressTypeName || item.typeName || item.name || '未知类型'
							};
						});

						console.log('处理后的物品类型数据:', this.expressTypes);
						this.filteredExpressTypes = [...this.expressTypes];
					}
				}).catch(err => {
					console.error('获取物品类型失败:', err);
					uni.showToast({
						title: '获取物品类型失败',
						icon: 'none'
					});
				}).finally(() => {
					uni.hideLoading();
				});
			},

			// 检测是否为iPhone X系列
			checkIphoneX() {
				const systemInfo = uni.getSystemInfoSync();
				this.isIPhoneX = !!(systemInfo.model && (
					systemInfo.model.indexOf('iPhone X') > -1 ||
					systemInfo.model.indexOf('iPhone 11') > -1 ||
					systemInfo.model.indexOf('iPhone 12') > -1 ||
					systemInfo.model.indexOf('iPhone 13') > -1 ||
					systemInfo.model.indexOf('iPhone 14') > -1 ||
					systemInfo.model.indexOf('iPhone 15') > -1
				));
			},

			// 修改为导航到不同页面
			navToTab(index) {
				if (index === 0) {
					// 当前页面，不需要跳转
					return;
				}

				// 导航到对应页面
				const url = this.tabs[index].url;
				uni.navigateTo({
					url
				});
			},

			// 选择地址
			selectAddress(type) {
				// 修改为正确的地址簿页面路径
				uni.navigateTo({
					url: `/views/address/address?select=true&type=${type}`,
					events: {
						// 添加事件监听在页面跳转时
						addressSelected: (data) => {
							console.log('接收到地址选择数据:', data);
							if (data && data.address) {
								this.onAddressSelected(data.address, data.type);
							}
						}
					},
					success: (res) => {
						console.log('成功打开地址选择页面');
					}
				});
			},

			// 当选择了地址时
			onAddressSelected(address, type) {
				console.log('选中地址:', address, '类型:', type);

				if (type === 'sender') {
					// 填充寄件人信息 - 修正字段映射
					this.formData.senderName = address.contactName;
					this.formData.senderMobile = address.contactPhone; // 修正：发件人手机应该放到senderMobile
					this.formData.senderProvince = address.province;
					this.formData.senderCity = address.city;
					this.formData.senderDistrict = address.district || '';
					this.formData.senderDetailAddress = address.detailAddress;
				} else {
					// 填充收件人信息 - 修正字段映射
					this.formData.receiverName = address.contactName;
					this.formData.receiverMobile = address.contactPhone; // 修正：收件人手机应该放到receiverMobile
					this.formData.receiverProvince = address.province;
					this.formData.receiverCity = address.city;
					this.formData.receiverDistrict = address.district || '';
					this.formData.receiverDetailAddress = address.detailAddress;
				}

				console.log('完成地址填充，表单数据:', this.formData);

				// 如果还没有设置重量，设置一个默认值
				// if (!this.formData.estimatedItemWeight) {
				// 	this.formData.estimatedItemWeight = 1; // 默认1kg
				// }

				// 地址变更后，清除已有选项并重新查询
				this.clearExpressOptions();
				this.checkAndQueryExpress();
			},

			// 格式化手机号
			formatPhone(phone) {
				if (!phone) return '';
				if (phone.length !== 11) return phone;
				return `${phone.substring(0, 3)}****${phone.substring(7)}`;
			},

			// 物品类型搜索 - 直接实现防抖逻辑
			onExpressTypeSearch() {
				// 显示下拉框
				this.showTypeDropdown = true;

				// 如果输入为空，获取全部列表
				if (!this.expressTypeQuery) {
					this.getExpressTypes();
					return;
				}

				// 直接在方法中实现防抖
				if (this.expressTypeSearchTimer) {
					clearTimeout(this.expressTypeSearchTimer);
				}

				// 设置新的计时器
				this.expressTypeSearchTimer = setTimeout(() => {
					// 调用搜索方法
					this.searchExpressTypes(this.expressTypeQuery);
				}, 300);
			},

			// 改进搜索物品类型方法
			searchExpressTypes(query) {
				console.log('向后端发送搜索请求:', query);
				this.expressTypeSearchLoading = true;

				// 调用后端搜索API
				expressTypeApi.getExpressTypeList(query).then(res => {
					console.log('搜索结果:', res);

					if (res) {
						// 正确处理后端返回的数组格式
						let dataList = res;

						// 确保数据是数组
						if (!Array.isArray(dataList)) {
							dataList = [];
							console.error('API返回的数据不是数组:', res);
						}

						console.log('处理前的数据:', dataList);

						// 直接使用后端返回的属性名，不再进行映射转换
						this.filteredExpressTypes = dataList;

						console.log('处理后的过滤列表:', this.filteredExpressTypes);

						// 强制保持下拉框打开状态
						this.showTypeDropdown = true;
					} else {
						console.error('搜索请求返回错误:', res);
						this.filteredExpressTypes = [];
					}
				}).catch(err => {
					console.error('搜索物品类型失败:', err);
					this.filteredExpressTypes = [];
				}).finally(() => {
					this.expressTypeSearchLoading = false;
				});
			},

			// 改进物品类型输入框失焦处理
			onTypeInputBlur() {
				// 延迟更长时间关闭下拉框，确保可以点击选项
				setTimeout(() => {
					this.showTypeDropdown = false;
				}, 300);
			},

			// 改进选择物品类型方法
			selectExpressType(item) {
				console.log('选择物品类型:', item);
				// 使用正确的属性名
				this.formData.itemType = item.typeName;
				this.expressTypeQuery = item.typeName;

				// 延迟关闭下拉框
				setTimeout(() => {
					this.showTypeDropdown = false;
				}, 100);
				this.checkAndQueryExpress();

			},




			// 检查是否可以查询快递
			canQueryExpress() {
				// 基于实际表单数据结构修改检查逻辑
				const requiredFields = [
					// 发件人信息
					'senderName', 'senderMobile',
					'senderProvince', 'senderCity', 'senderDistrict',

					// 收件人信息
					'receiverName', 'receiverMobile',
					'receiverProvince', 'receiverCity', 'receiverDistrict',

					// 物品信息
					'estimatedItemWeight'
				];

				// 验证每个必填字段是否存在且不为空
				let missingFields = [];

				for (const field of requiredFields) {
					if (!this.formData[field]) {
						missingFields.push(field);
						console.log(`缺少必填字段: ${field}`);
					}
				}

				if (missingFields.length > 0) {
					console.log('缺少的必填字段:', missingFields);
					return false;
				}

				if (this.expressTypeQuery == '') {
					console.log('缺少必填字段：', this.expressTypeQuery);
					return false;
				}


				// 特殊检查：重量必须大于0
				if (parseFloat(this.formData.estimatedItemWeight) <= 0) {
					console.log('重量必须大于0');
					return false;
				}

				console.log('表单验证通过，可以查询快递');
				return true;
			},

			// 查询快递选项
			queryExpressOptions() {
				if (this.expressLoading) return;

				this.expressLoading = true;
				this.expressCompanies = [];

				// 构建查询参数
				const params = {
					businessParams: {
						// 收件人信息
						receiveAddress: this.formData.receiverDetailAddress || '',
						receiveMobile: this.formData.receiverMobile,
						receiveTel: this.formData.receiverTel || "",
						receiveName: this.formData.receiverName,
						receiveProvince: this.formData.receiverProvince,
						receiveCity: this.formData.receiverCity,
						receiveDistrict: this.formData.receiverDistrict,

						// 发件人信息
						senderAddress: this.formData.senderDetailAddress || '',
						senderMobile: this.formData.senderMobile,
						senderTel: this.formData.senderTel || "",
						senderName: this.formData.senderName,
						senderProvince: this.formData.senderProvince,
						senderCity: this.formData.senderCity,
						senderDistrict: this.formData.senderDistrict,

						// 物品信息
						goods: this.expressTypeQuery,
						packageCount: this.formData.packageCount || 1, // 默认为1
						weight: this.formData.estimatedItemWeight,

						// 其他参数
						customerType: "kd",
						onlinePay: "ALL",
						payMethod: 10,
						guaranteeValueAmount: this.formData.guaranteeValueAmount || 0,
						thirdNo: "TD" + Date.now() // 生成一个随机的第三方单号
					}
				};

				console.log('查询快递选项参数:', params);

				// API调用
				expressApi.queryExpressOptions(params)
					.then(result => {
						console.log('查询快递选项结果:', result);
						// 处理嵌套结构的返回数据
						if (result) {
							expressApi.getExpressList().then(res => {
								if (res) {
									console.log(res)
									const allOptions = [];
									let expressList = res;
									// 遍历所有快递公司
									Object.keys(result).forEach(companyCode => {
										const companyOptions = result[companyCode];
										if (Array.isArray(companyOptions) && companyOptions.length >
											0) {
											// 将每个公司的选项添加到总选项列表
											companyOptions.forEach(option => {
												if (option.channelName !== '德邦【寄付】9折' && option
													.channelName !== '德邦【到付】9折') {
													allOptions.push({
														id: option.channelId || Date
															.now() + Math.random()
															.toString(36).substr(2, 5),
														name: option.channelName ||
															`${companyCode}快递`,
														companyCode: option
															.deliveryType ||
															companyCode,
														fee: parseFloat(option
															.preOrderFee) || 0,
														originalData: option // 保存原始数据，可能在下单时需要
													});
												}

											});
										}
									});

									for (let i = allOptions.length - 1; i >= 0; i--) {
										const option = allOptions[i];
										let shouldDelete = false;
										let totalProfit = 0;

										for (const express of expressList) {
											if (option.companyCode === express.deliveryType) {
												if (express.isClose === 0) {
													shouldDelete = true;
													break; // 发现需删除，跳出循环
												} else if (express.profit !== 0) {
													totalProfit += express.profit;
												}
											}
										}

										if (shouldDelete) {
											allOptions.splice(i, 1); // 删除元素
										} else if (totalProfit !== 0) {
											option.fee += option.fee * (totalProfit / 100); // 调整费用
										}
									}

									// 按价格排序
									this.expressCompanies = allOptions.sort((a, b) => a.fee - b.fee);

									if (this.expressCompanies.length > 0) {
										this.formData.expressIndex = 0;
										const selectedExpress = this.expressCompanies[0];
										this.baseFee = selectedExpress.fee;
										this.totalFee = this.baseFee;
										if (selectedExpress.originalData.payMethod == 30) {
											this.canUseCommission = true;
										} else {
											this.canUseCommission = false;
										}
										// 获取到快递选项后，检查第一个快递选项的保价支持情况
										this.checkInsuranceSupport(selectedExpress);
										// 检查支付方式支持情况
										this.checkSupportedPayMethods(selectedExpress);

										// 如果当前选择的支付方式不支持，重置为默认支付方式
										this.resetToSupportedPaymentMethod();
										// 设置已获取快递价格标志，触发相关内容显示
										this.hasExpressOptions = true;
									} else {
										this.expressCompanies = [];
										this.hasExpressOptions = false;

										uni.showToast({
											title: '未找到可用的快递服务',
											icon: 'none'
										});
									}
								} else {
									this.expressCompanies = [];
									this.hasExpressOptions = false;

									uni.showToast({
										title: '未找到可用的快递服务',
										icon: 'none'
									});
								}
							})


						} else {
							this.expressCompanies = [];
							this.hasExpressOptions = false;

							uni.showToast({
								title: '未找到可用的快递服务',
								icon: 'none'
							});
						}
					})
					.catch(error => {
						console.error('查询快递选项错误:', error);
						this.expressCompanies = [];
						this.hasExpressOptions = false;

						uni.showToast({
							title: error.message || '查询快递选项失败',
							icon: 'none'
						});
					})
					.finally(() => {
						this.expressLoading = false;
					});
			},

			// 清空快递选项
			clearExpressOptions() {
				this.expressCompanies = [];
				this.formData.expressIndex = -1;
				this.formData.companyCode = '';
				this.baseFee = 0;
				this.insuranceFee = 0;
				this.totalFee = 0;

				// 重置快递价格获取状态
				this.hasExpressOptions = false;
				console.log('已清空快递选项，隐藏相关内容');
			},

			// 选择快递
			selectExpress(index) {
				// 更新选中的快递索引
				this.formData.expressIndex = index;

				// 获取选中的快递公司信息
				const selectedExpress = this.expressCompanies[index];
				// 更新基础运费
				this.baseFee = selectedExpress.fee;
				this.totalFee = this.baseFee;
				if (selectedExpress.originalData.payMethod == 30) {
					this.canUseCommission = true;
				} else {
					this.canUseCommission = false;
					this.formData.commissionAmount = 0;
					this.formData.useCommission = false;
					this.$nextTick(() => {
						this.forceUpdate = !this.forceUpdate;
					});

				}
				// 检查保价支持情况
				this.checkInsuranceSupport(selectedExpress);

				// 检查支付方式支持情况
				this.checkSupportedPayMethods(selectedExpress);

				// 如果当前选择的支付方式不支持，重置为默认支付方式
				this.resetToSupportedPaymentMethod();
			},

			// 获取快递logo
			getExpressLogo(companyCode) {
				// 快递公司代码到图标路径的映射关系
				const logoMap = {
					// 标准物流公司编码映射
					'SF': '/static/icon/顺丰.png',
					'ZTO': '/static/icon/中通.png',
					'YTO': '/static/icon/圆通.png',
					'YUND': '/static/icon/韵达.png',
					'HTKY': '/static/icon/百世.png',
					'STO': '/static/icon/申通.png',
					'JD': '/static/icon/京东.png',
					'DOP': '/static/icon/德邦.png',
					'JT': '/static/icon/极兔.png',
					'KYSY': '/static/icon/跨越.png',
					'EMS': '/static/icon/邮政.png',
					'CAINIAO': '/static/icon/菜鸟裹裹.png',
					'SXJD': '/static/icon/顺心捷达.png',
					'YMDD': '/static/icon/壹米滴答.png',

					// 添加别名映射，以防API返回不同的代码格式
					'SHUNFENG': '/static/icon/顺丰.png',
					'ZHONGTONG': '/static/icon/中通.png',
					'YUANTONG': '/static/icon/圆通.png',
					'YUNDA': '/static/icon/韵达.png',
					'HUITONGKUAIDI': '/static/icon/百世.png',
					'SHENTONG': '/static/icon/申通.png',
					'JINGDONG': '/static/icon/京东.png',
					'DEBANG': '/static/icon/德邦.png',
					'JITU': '/static/icon/极兔.png',
					'KUAYUE': '/static/icon/跨越.png',
					'YOUZHENG': '/static/icon/邮政.png',
					'CAINIAOBK': '/static/icon/菜鸟裹裹.png'
				};

				// 如果能直接找到映射，返回对应图标
				if (logoMap[companyCode]) {
					return logoMap[companyCode];
				}

				// 尝试转换为大写匹配
				const uppercaseCode = companyCode.toUpperCase();
				if (logoMap[uppercaseCode]) {
					return logoMap[uppercaseCode];
				}

				// 如果没有找到映射，返回默认图标
				console.log('未找到快递公司图标:', companyCode);
				return '/static/icon/菜鸟裹裹.png'; // 默认使用菜鸟裹裹图标
			},

			// 获取用户佣金
			getUserCommission() {
				try {
					const userInfo = uni.getStorageSync('userInfo') || {};
					this.userInfo = userInfo;
					this.userCommission = parseFloat(userInfo.money || 0);
				} catch (error) {
					console.error('获取用户佣金失败', error);
				}
			},



			async submitOrder() {
				const userInfo = this.$store.getters['user/getUserInfo']
				if (userInfo.isReal !== 2) {
					uni.showToast({
						title: '请先实名',
						icon: 'none'
					});
					return;
				}
				// 检查是否同意协议
				if (!this.checkBeforeSubmit()) {
					return;
				}



				// 2. 无论是否分享都继续提交订单
				this.processOrderSubmission();
				// // 公共时间处理
				// const {
				// 	startDateTime,
				// 	endDateTime
				// } = this.processPickupTime();

				// // 获取快递信息
				// const express = this.expressCompanies[this.formData.expressIndex].originalData;

				// // 根据支付类型执行不同逻辑
				// const payStrategy = {
				// 	10: this.handleOfflinePayment.bind(this),
				// 	20: this.handleOfflinePayment.bind(this),
				// 	30: this.handleOnlinePayment.bind(this)
				// };

				// if (payStrategy[express.payMethod]) {
				// 	payStrategy[express.payMethod](express, startDateTime, endDateTime);
				// } else {
				// 	console.error('未知的支付方式:', express.payMethod);
				// 	uni.showToast({
				// 		title: '不支持的支付方式',
				// 		icon: 'none'
				// 	});
				// }
			},



			// 处理订单提交的核心逻辑
			processOrderSubmission() {
				// 公共时间处理
				const {
					startDateTime,
					endDateTime
				} = this.processPickupTime();

				// 获取快递信息
				const express = this.expressCompanies[this.formData.expressIndex].originalData;

				// 根据支付类型执行不同逻辑
				const payStrategy = {
					10: this.handleOfflinePayment.bind(this),
					20: this.handleOfflinePayment.bind(this),
					30: this.handleOnlinePayment.bind(this)
				};

				if (payStrategy[express.payMethod]) {
					payStrategy[express.payMethod](express, startDateTime, endDateTime);
				} else {
					console.error('未知的支付方式:', express.payMethod);
					uni.showToast({
						title: '不支持的支付方式',
						icon: 'none'
					});
				}
			},

			// 公共方法 - 处理时间
			processPickupTime() {
				if (!this.formData.pickupTime) {
					uni.showToast({
						title: '请选择有效的派送时间',
						icon: 'none'
					});
					return;
				}
				const formatTime = rawTime => {
					const [hour, minute] = rawTime.split(":");
					return `${hour.padStart(2, "0")}:${minute}:00`;
				};

				const [startRaw, endRaw] = this.formData.pickupTime.split("-");
				return {
					startDateTime: `${this.formData.pickupDate} ${formatTime(startRaw)}`,
					endDateTime: `${this.formData.pickupDate} ${formatTime(endRaw)}`
				};
			},

			// 公共方法 - 创建基础请求数据
			createBaseRequestData(express, startDateTime, endDateTime) {
				const baseData = {
					deliveryBusiness: express.deliveryBusiness,
					channelId: express.channelId,
					pickUpStartTime: startDateTime,
					pickUpEndTime: endDateTime,
					deliveryType: express.deliveryType,
					// 收件人信息
					receiveAddress: this.formData.receiverDetailAddress || '',
					receiveMobile: this.formData.receiverMobile,
					receiveTel: this.formData.receiverTel || "",
					receiveName: this.formData.receiverName,
					receiveProvince: this.formData.receiverProvince,
					receiveCity: this.formData.receiverCity,
					receiveDistrict: this.formData.receiverDistrict,
					// 发件人信息
					senderAddress: this.formData.senderDetailAddress || '',
					senderMobile: this.formData.senderMobile,
					senderTel: this.formData.senderTel || "",
					senderName: this.formData.senderName,
					senderProvince: this.formData.senderProvince,
					senderCity: this.formData.senderCity,
					senderDistrict: this.formData.senderDistrict,
					// 物品信息
					goods: this.expressTypeQuery,
					packageCount: this.formData.packageCount || 1,
					weight: this.formData.estimatedItemWeight,
					// 其他公共参数
					customerType: "kd",
					guaranteeValueAmount: this.formData.guaranteeValueAmount || 0,
					thirdNo: "TD" + Date.now(),
					remark: this.formData.remark
				};

				// 体积参数处理
				if (this.hasVolumeDimensions()) {
					baseData.vloumLong = this.formData.length;
					baseData.vloumWidth = this.formData.width;
					baseData.vloumHeight = this.formData.height;
				}

				return {
					businessParams: baseData
				};
			},

			// 公共方法 - 创建订单数据
			createOrderData(express, paymentMethod, orderStatus, startDateTime, endDateTime, commissionDeductionAmount,
				orderId) {

				return {
					orderId,
					wechatId: orderId,
					userId: this.storeUserInfo.userId,
					// 寄件人信息
					senderName: this.formData.senderName,
					senderPhone: this.formData.senderMobile,
					senderProvince: this.formData.senderProvince,
					senderCity: this.formData.senderCity,
					senderDistrict: this.formData.senderDistrict,
					senderDetailAddress: this.formData.senderDetailAddress || '',
					// 收货人信息
					receiverDetailAddress: this.formData.receiverDetailAddress || '',
					receiverPhone: this.formData.receiverMobile,
					receiverName: this.formData.receiverName,
					receiverProvince: this.formData.receiverProvince,
					receiverCity: this.formData.receiverCity,
					receiverDistrict: this.formData.receiverDistrict,
					deliveryBusiness: express.deliveryBusiness,
					// 订单信息
					expressCode: express.deliveryType,
					typeId: express.channelId,
					goods: this.expressTypeQuery,
					estimatedItemWeight: this.formData.estimatedItemWeight,
					actualWeight: '',
					length: this.formData.length,
					width: this.formData.width,
					height: this.formData.height,
					pickUpStartTime: startDateTime,
					pickUpEndTime: endDateTime,
					shippingTime: '',
					receivingTime: '',
					guaranteeValueAmount: this.formData.guaranteeValueAmount,
					insuranceFee: this.insuranceFee,
					paymentMethod: paymentMethod,
					commissionDeductionAmount: commissionDeductionAmount,
					orderTotalPrice: this.totalFee,
					amountAfterCommissionDeduction: this.calculateFinalAmount(),
					orderPriceDifference: 0,
					shippingStatus: 0,
					isPriceDifferencePaid: 0,
					orderStatus: orderStatus,
					remark: this.formData.remark
				};
			},

			// 辅助方法 - 计算最终金额
			calculateFinalAmount() {
				const total = parseFloat((this.totalFee || 0).toFixed(2));
				const commission = parseFloat((this.formData.commissionAmount || 0).toFixed(2));
				const final = total - commission;
				return final > 0 ? final.toFixed(2) : '0.00';
			},

			// 辅助方法 - 判断是否有体积信息
			hasVolumeDimensions() {
				return this.formData.length && this.formData.width && this.formData.height;
			},

			async handleOfflinePayment(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});

				try {
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					// 使用processPayment方法处理完整支付流程
					const openId = uni.getStorageSync('openId');
					if (!openId) {
						const user = this.$store.getters['user/getUserInfo']
						openId = user.openId
					}
					const payResult = await wxpayApi.processPayment(openId, orderId, this.totalFee, "快递下单");

					// 支付成功或失败，根据payResult.success判断
					if (payResult.success) {
						// 支付成功，继续创建订单
						const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
						requestData.businessParams.onlinePay = "N";
						requestData.businessParams.payMethod = express.payMethod;
						const expressRes = await expressApi.createExpress(requestData);
						if (!expressRes) throw new Error('快递下单失败');

						const orderData = this.createOrderData(
							express,
							express.payMethod === 10 ? 0 : 1, // 支付方式映射
							5, // 订单状态
							startDateTime,
							endDateTime,
							0,
							orderId
						);
						// orderData.orderNo = '测试';
						// orderData.deliveryId = '测试';
						orderData.orderNo = expressRes.orderNo || '';
						orderData.deliveryId = expressRes.deliveryId || '';

						const orderRes = await orderApi.createOrder(orderData);
						this.handleOrderResult(orderRes);
					} else {
						// 支付失败
						console.log("支付结果:", payResult.message);
						if (!payResult.canceled) {
							uni.showToast({
								title: payResult.message,
								icon: 'none'
							});
						}
						return; // 支付失败则不继续执行后续创建订单的代码
					}
				} catch (error) {
					console.error('下单失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},

			// 处理线上支付
			async handleOnlinePayment(express, startDateTime, endDateTime) {
				if (!this.formData.useCommission && this.formData.paymentMethod === 'monthly') {
					await this.handleMonthlyPayment(express, startDateTime, endDateTime);
				} else if (this.formData.useCommission && this.storeUserInfo.money > 0.00) {
					let finalPrice = this.calculateFinalAmount();
					if (finalPrice === '0.00') {
						await this.handleUseCommission(express, startDateTime, endDateTime);
					} else {
						if (this.formData.paymentMethod === 'monthly') {
							await this.handleUseCommissionAndMonthlyPayment(express, startDateTime, endDateTime);
						} else if (this.formData.paymentMethod === 'online') {
							await this.handleUseCommissionAndWxChat(express, startDateTime, endDateTime);
						} else if (this.formData.paymentMethod === 'onlineCollect') {
							// await this.handleUseCommissionAndOnlineCollect(express, startDateTime, endDateTime);
						}
					}
				} else if (!this.formData.useCommission && this.formData.paymentMethod === 'online') {
					await this.handleUseWeChatPay(express, startDateTime, endDateTime);
				} else if (!this.formData.useCommission && this.formData.paymentMethod === 'onlineCollect') {

					await this.handleUseOnlineCollect(express, startDateTime, endDateTime);
				}
			},

			async handleUseCommissionAndOnlineCollect(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {
					userApi.isRealByPhone(this.formData.receiverMobile).then(res => {
						if (res === '1') {
							uni.showToast({
								title: '下单失败，请及时通知收件人注册并实名"神州邮"',
								icon: 'none',
								duration: 3000 // 3000ms = 3秒
							});
							return
						} else if (res === "0") {
							let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
							const orderData = this.createOrderData(
								express,
								2, // 支付方式
								7, // 订单状态
								startDateTime,
								endDateTime,
								this.storeUserInfo.money,
								orderId
							);

							orderData.orderNo = '';
							orderData.deliveryId = '';
							// orderData.orderNo = '测试';
							// orderData.deliveryId = '测试';
							orderApi.createOrder(orderData).then(orderRes => {
								if (!orderRes) throw new Error('订单创建失败');
								this.createOnlineCollectCommissionFlow(orderRes.orderId)
							})

						}
					});
				} catch (error) {
					console.error('微信支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},

			async handleUseOnlineCollect(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {

					userApi.isRealByPhone(this.formData.receiverMobile).then(res => {
						if (res === '1') {
							uni.showToast({
								title: '下单失败，请及时通知收件人注册并实名"神州邮"',
								icon: 'none',
								duration: 3000 // 3000ms = 3秒
							});
							return
						} else if (res === "0") {
							let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
							const orderData = this.createOrderData(
								express,
								2, // 支付方式
								7, // 订单状态
								startDateTime,
								endDateTime,
								0,
								orderId
							);
							orderData.orderNo = '';
							orderData.deliveryId = '';
							// orderData.orderNo = '测试';
							// orderData.deliveryId = '测试';
							orderApi.createOrder(orderData).then(orderRes => {
								if (!orderRes) throw new Error('订单创建失败');
								this.handleOrderResult(orderRes);
							})
						}
						// let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
						// const orderData = this.createOrderData(
						// 	express,
						// 	2, // 支付方式
						// 	7, // 订单状态
						// 	startDateTime,
						// 	endDateTime,
						// 	0,
						// 	orderId
						// );
						// orderData.orderNo =  '';
						// orderData.deliveryId =  '';
						// // orderData.orderNo = '测试';
						// // orderData.deliveryId = '测试';
						// orderApi.createOrder(orderData).then(orderRes=>{
						// 	if (!orderRes) throw new Error('订单创建失败');
						// 	this.handleOrderResult(orderRes);
						// })
					});
					// const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
					// requestData.businessParams.onlinePay = "Y";
					// requestData.businessParams.payMethod = 30;
					// const expressRes = await expressApi.createExpress(requestData);
					// if (!expressRes) throw new Error('快递下单失败');

				} catch (error) {
					console.error('线上到付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},


			async createCommissionFlowAndWxChat(orderId) {
				const commissionFlow = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: -this.storeUserInfo.money,
					balance: 0.0,
					flowType: 1
				};
				this.storeUserInfo.money = 0.0
				commissionFlowApi.addCommissionFlow(commissionFlow).then(res => {
					if (res) {
						if (res) {
							userApi.getUserById(this.storeUserInfo.userId).then(r2 => {
								if (r2) {
									this.$store.commit('user/setUserInfo', r2)
									this.handleOrderResult(r2);
								}
							});
						}
					}
				})
			},

			async handleUseCommissionAndWxChat(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const openId = uni.getStorageSync('openId');
					if (!openId) {
						const user = this.$store.getters['user/getUserInfo']
						openId = user.openId
					}
					const payResult = await wxpayApi.processPayment(openId, orderId, this.calculateFinalAmount(),
						"快递下单");

					// 支付成功或失败，根据payResult.success判断
					if (payResult.success) {
						const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
						requestData.businessParams.onlinePay = "Y";
						requestData.businessParams.payMethod = 30;

						const expressRes = await expressApi.createExpress(requestData);
						if (!expressRes) throw new Error('快递下单失败');

						const orderData = this.createOrderData(
							express,
							2, // 支付方式
							1, // 订单状态
							startDateTime,
							endDateTime,
							this.storeUserInfo.money,
							orderId
						);

						orderData.orderNo = expressRes.orderNo || '';
						orderData.deliveryId = expressRes.deliveryId || '';
						// orderData.orderNo = '测试';
						// orderData.deliveryId = '测试';
						const orderRes = await orderApi.createOrder(orderData);
						if (!orderRes) throw new Error('订单创建失败');
						await this.createCommissionFlowAndWxChat(orderId);
					} else {
						// 支付失败
						console.log("支付结果:", payResult.message);
						if (!payResult.canceled) {
							uni.showToast({
								title: payResult.message,
								icon: 'none'
							});
						}
						return; // 支付失败则不继续执行后续创建订单的代码
					}

				} catch (error) {
					console.error('微信支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},


			async handleUseWeChatPay(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const openId = uni.getStorageSync('openId');
					if (!openId) {
						const user = this.$store.getters['user/getUserInfo']
						openId = user.openId
					}
					const payResult = await wxpayApi.processPayment(openId, orderId, this.totalFee, "快递下单");

					// 支付成功或失败，根据payResult.success判断
					if (payResult.success) {
						const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
						requestData.businessParams.onlinePay = "Y";
						requestData.businessParams.payMethod = 30;
						const expressRes = await expressApi.createExpress(requestData);
						if (!expressRes) throw new Error('快递下单失败');

						const orderData = this.createOrderData(
							express,
							2, // 支付方式
							1, // 订单状态
							startDateTime,
							endDateTime,
							this.formData.commissionAmount,
							orderId
						);

						orderData.orderNo = expressRes.orderNo || '';
						orderData.deliveryId = expressRes.deliveryId || '';
						// orderData.orderNo = '测试';
						// orderData.deliveryId = '测试';
						const orderRes = await orderApi.createOrder(orderData);
						if (!orderRes) throw new Error('订单创建失败');
					} else {
						// 支付失败
						console.log("支付结果:", payResult.message);
						if (!payResult.canceled) {
							uni.showToast({
								title: payResult.message,
								icon: 'none'
							});
						}
						return; // 支付失败则不继续执行后续创建订单的代码
					}

				} catch (error) {
					console.error('月结支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},


			async handleUseCommissionAndMonthlyPayment(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {
					const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
					requestData.businessParams.onlinePay = "Y";
					requestData.businessParams.payMethod = 30;

					const expressRes = await expressApi.createExpress(requestData);
					if (!expressRes) throw new Error('快递下单失败');
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const orderData = this.createOrderData(
						express,
						2, // 支付方式
						4, // 订单状态
						startDateTime,
						endDateTime,
						this.formData.commissionAmount,
						orderId
					);

					orderData.orderNo = expressRes.orderNo || '';
					orderData.deliveryId = expressRes.deliveryId || '';
					// orderData.orderNo = '测试';
					// orderData.deliveryId = '测试';
					const orderRes = await orderApi.createOrder(orderData);
					if (!orderRes) throw new Error('订单创建失败');

					await this.createCommissionFlowAndStatementRes(orderRes
						.orderId);

				} catch (error) {
					console.error('月结支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},

			async handleUseCommission(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});
				try {
					const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
					requestData.businessParams.onlinePay = "Y";
					requestData.businessParams.payMethod = 30;

					const expressRes = await expressApi.createExpress(requestData);
					if (!expressRes) throw new Error('快递下单失败');
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const orderData = this.createOrderData(
						express,
						2, // 支付方式
						1, // 订单状态
						startDateTime,
						endDateTime,
						this.formData.commissionAmount,
						orderId
					);

					orderData.orderNo = expressRes.orderNo || '';
					orderData.deliveryId = expressRes.deliveryId || '';
					// orderData.orderNo = '测试';
					// orderData.deliveryId = '测试';
					const orderRes = await orderApi.createOrder(orderData);
					if (!orderRes) throw new Error('订单创建失败');

					await this.createCommissionFlow(orderRes.orderId);

				} catch (error) {
					console.error('月结支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},

			// 处理月结支付
			async handleMonthlyPayment(express, startDateTime, endDateTime) {
				uni.showLoading({
					title: '下单中...',
					mask: true
				});

				try {
					const requestData = this.createBaseRequestData(express, startDateTime, endDateTime);
					requestData.businessParams.onlinePay = "Y";
					requestData.businessParams.payMethod = 30;
					const expressRes = await expressApi.createExpress(requestData);
					if (!expressRes) throw new Error('快递下单失败');
					let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
					const orderData = this.createOrderData(
						express,
						2, // 支付方式
						4, // 订单状态
						startDateTime,
						endDateTime,
						0,
						orderId
					);
					orderData.orderNo = expressRes.orderNo || '';
					orderData.deliveryId = expressRes.deliveryId || '';
					// orderData.orderNo = '测试';
					// orderData.deliveryId = '测试';
					const orderRes = await orderApi.createOrder(orderData);
					if (!orderRes) throw new Error('订单创建失败');
					const statementRes = await this.createMonthlyStatement(orderRes.orderId);
					this.handleOrderResult(statementRes);
				} catch (error) {
					console.error('月结支付失败:', error);
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},

			async createPaymentFlow(orderId, orderTotalPrice, merchantOrderId, transactionId) {
				const paymentFlow = {
					userId: this.storeUserInfo.userId,
					merchantOrderId: merchantOrderId,
					description: '',
					orderId: orderId,
					openid: '',
					transactionId: transactionId,
					refundFlag: 0,
					errorDescription: '',
					amount: orderTotalPrice
				};
				return await paymentApi.createOrder(paymentFlow);
			},



			// 创建月结账单
			async createMonthlyStatement(orderId) {
				const statement = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: this.calculateFinalAmount()
				};


				return await statementApi.createStatement(statement);
			},

			// 
			async createCommissionFlow(orderId) {
				const commissionFlow = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: -this.formData.commissionAmount,
					balance: this.storeUserInfo.money - this.formData.commissionAmount,
					flowType: 1
				};


				commissionFlowApi.addCommissionFlow(commissionFlow).then(r1 => {
					if (r1) {
						userApi.getUserById(this.storeUserInfo.userId).then(r2 => {
							if (r2) {
								this.$store.commit('user/setUserInfo', r2)
								this.handleOrderResult(r2);
							}
						});
					}
				});
			},

			async createOnlineCollectCommissionFlow(orderId) {
				const commissionFlow = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: -this.storeUserInfo.money,
					balance: 0.00,
					flowType: 1
				};


				commissionFlowApi.addCommissionFlow(commissionFlow).then(r1 => {
					if (r1) {
						userApi.getUserById(this.storeUserInfo.userId).then(r2 => {
							if (r2) {
								this.$store.commit('user/setUserInfo', r2)
								this.handleOrderResult(r2);
							}
						});
					}
				});
			},


			async createCommissionFlowAndStatementRes(orderId) {

				const commissionFlow = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: -this.formData.commissionAmount,
					balance: this.storeUserInfo.money - this.formData.commissionAmount,
					flowType: 1
				};

				this.storeUserInfo.money = this.storeUserInfo.money - this.formData.commissionAmount

				const statement = {
					userId: this.storeUserInfo.userId,
					monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
					orderId: orderId,
					type: 0,
					isUserPays: 0,
					amount: this.totalFee - this.formData.commissionAmount
				};

				statementApi.createStatement(statement).then(res => {
					if (res) {
						commissionFlowApi.addCommissionFlow(commissionFlow).then(r1 => {
							if (r1) {
								userApi.getUserById(this.storeUserInfo.userId).then(r2 => {
									if (r2) {
										this.$store.commit('user/setUserInfo', r2)
										this.handleOrderResult(r2);
									}
								});
							}
						})
					}
				})


			},


			// 处理订单结果
			handleOrderResult(result) {
				if (result) {
					uni.showToast({
						title: '下单成功',
						icon: 'success'
					});
					setTimeout(() => uni.switchTab({
						url: '/pages/index/index'
					}), 1500);
				} else {
					uni.showToast({
						title: '下单失败',
						icon: 'none'
					});
				}
			},






			// 检查并查询快递
			checkAndQueryExpress() {
				// 先检查表单是否已填写完整
				if (this.canQueryExpress()) {
					console.log('表单完整，开始查询快递选项');
					this.queryExpressOptions();
				} else {
					console.log('表单不完整，无法查询快递选项');
				}
			},
			// 验证重量输入
			validateWeightInput(e) {
				// 从输入事件获取值或直接使用模型值
				let input = e.detail ? e.detail.value : this.formData.estimatedItemWeight;

				// 先移除非数字字符，只保留数字和小数点
				input = input.replace(/[^\d.]/g, '');

				// 确保只有一个小数点
				const parts = input.split('.');
				if (parts.length > 2) {
					input = parts[0] + '.' + parts.slice(1).join('');
				}

				// 限制小数位数为2位
				if (parts.length > 1 && parts[1].length > 2) {
					input = parts[0] + '.' + parts[1].substring(0, 2);
				}

				// 转换为数值类型进行比较
				const numValue = parseFloat(input);

				// 如果输入完成且值小于20kg，给出提示
				if (numValue > 20 && e.type === 'blur') {
					uni.showToast({
						title: '物品重量不得大于20kg',
						icon: 'none'
					});
					// 可以选择重置为20
					input = '19';
				}

				// 更新模型值
				this.formData.estimatedItemWeight = input;
			},

			// 计算保险费
			calculateInsuranceFee() {
				if (!this.formData.needInsurance || !this.insuranceSupported) {
					this.insuranceFee = 0;
					this.totalFee = this.baseFee;
					return;
				}

				const selectedExpress = this.expressCompanies[this.formData.expressIndex];
				if (!selectedExpress || !selectedExpress.originalData || !selectedExpress.originalData.bjRule) {
					this.insuranceFee = 0;
					return;
				}

				try {
					// 获取保价规则
					const bjRuleStr = selectedExpress.originalData.bjRule;
					// 保价金额
					const amount = parseFloat(this.formData.guaranteeValueAmount) || 0;

					// 保价费用
					let fee = 0;

					// 解析保价规则
					const bjRules = JSON.parse(bjRuleStr);

					// 如果没有规则或金额为0，返回0
					if (!bjRules || !bjRules.length || amount <= 0) {
						this.insuranceFee = 0;
						this.totalFee = this.baseFee;
						return;
					}

					// 应用保价规则计算费用
					for (const rule of bjRules) {
						// 检查保额是否在当前规则范围内
						if (amount >= (rule.start || 0) &&
							(rule.end === 0 || amount <= rule.end || !rule.end)) {

							if (rule.bjPrice !== undefined) {
								// 固定价格
								fee = rule.bjPrice;
							} else if (rule.bjRate !== undefined) {
								// 按费率计算
								fee = amount * rule.bjRate;
							}

							break; // 找到匹配规则后停止
						}
					}

					// 四舍五入到小数点后2位
					this.insuranceFee = Math.round(fee * 100) / 100;
					this.totalFee = this.baseFee + this.insuranceFee;

				} catch (error) {
					console.error('计算保价费用错误:', error);
					this.insuranceFee = 0;
					this.totalFee = this.baseFee;
				}
			},


			// 更新总费用
			updateTotalFee() {
				this.totalFee = this.baseFee + this.insuranceFee;

				// 如果启用了余额抵扣，重新计算抵扣金额
				if (this.formData.useCommission) {
					this.calculateCommissionAmount();
				}
			},

			// 添加页面生命周期函数，处理地址选择页面返回
			onShow() {
				// 仅当从地址选择页面返回时才执行事件监听
				// 判断是否有上一页
				const pages = getCurrentPages();
				if (pages.length > 1) {
					const prevPage = pages[pages.length - 2];
					// 检查上一页是否是地址选择页面
					if (prevPage.route && prevPage.route.includes('address/address')) {
						console.log('从地址页面返回，准备接收数据');
						const currentPage = pages[pages.length - 1];
						const eventChannel = currentPage.getOpenerEventChannel();

						if (eventChannel && typeof eventChannel.on === 'function') {
							// 监听地址选择页面传回的数据
							eventChannel.on('addressSelected', (data) => {
								console.log('接收到地址选择数据:', data);
								if (data && data.address) {
									this.onAddressSelected(data.address, data.type);
								}
							});
						} else {
							console.error('事件通道不可用');
						}
					}
				}
			},

			// 检查月结资格
			async checkMonthlyEligibility() {
				try {
					// 首先检查用户信息中的月结标志
					if (this.storeUserInfo && this.storeUserInfo.isMonth === 1) {
						// 用户基本具有月结权限，现在检查资格是否有效
						const eligibilityId = this.storeUserInfo.monthlySettlementEligibilityId;
						const code = this.storeUserInfo.code; // 用户的验证码

						console.log('检查月结资格:', eligibilityId, code);

						if (eligibilityId && code) {
							// 调用API检查月结资格是否有效
							const result = await monthlyApi.checkEffective(eligibilityId, code);

							// 1表示有效
							this.hasMonthlyEligibility = result === 1;
							console.log('月结资格检查结果:', this.hasMonthlyEligibility ? '有效' : '无效');
						} else {
							console.log('缺少月结资格ID或验证码');
							this.hasMonthlyEligibility = false;
						}
					} else {
						console.log('用户不具备月结权限');
						this.hasMonthlyEligibility = false;
					}
				} catch (error) {
					console.error('检查月结资格出错:', error);
					this.hasMonthlyEligibility = false;

					uni.showToast({
						title: '月结资格检查失败',
						icon: 'none'
					});
				}

				// 如果没有月结资格，且当前支付方式为月结，则改为在线支付
				if (!this.hasMonthlyEligibility && this.formData.onlinePayType === 'monthly') {
					this.formData.onlinePayType = 'online';
				}
			},

			// 加载用户佣金
			loadUserCommission() {
				try {
					if (this.storeUserInfo && this.storeUserInfo.money !== undefined) {
						this.userCommission = parseFloat(this.storeUserInfo.money) || 0;
						console.log('加载用户佣金成功:', this.userCommission);

						// 如果佣金为0，禁用佣金抵扣
						if (this.userCommission <= 0) {
							this.formData.useCommission = false;
							this.formData.commissionAmount = 0;
						}

						// 重新计算抵扣金额
						if (this.formData.useCommission) {
							this.calculateCommissionDeduction();
						}
					} else {
						console.log('用户未登录或佣金信息不存在');
						this.userCommission = 0;
					}
				} catch (error) {
					console.error('加载用户佣金出错:', error);
					this.userCommission = 0;
				}
			},

			// 计算佣金抵扣金额
			calculateCommissionDeduction() {
				if (!this.formData.useCommission || this.userCommission <= 0) {
					this.formData.commissionAmount = 0;
					return;
				}

				// 计算可抵扣金额（不超过总费用，也不超过可用佣金）
				const total = this.totalFee || 0;
				const maxDeduction = Math.min(total, this.userCommission);
				this.formData.commissionAmount = parseFloat(maxDeduction.toFixed(2));

				console.log('佣金抵扣计算:', {
					总费用: total,
					可用佣金: this.userCommission,
					抵扣金额: this.formData.commissionAmount
				});
			},


			// 当地址变更时
			onAddressChanged() {
				// 清空快递选项
				this.clearExpressOptions();

				// 检查是否可以查询快递
				this.checkAndQueryExpress();
			},

			// 当重量变更时
			onWeightChanged() {
				// 清空快递选项
				this.clearExpressOptions();

				// 检查是否可以查询快递
				this.checkAndQueryExpress();
			},

			// 切换保险服务
			toggleInsurance() {
				if (!this.insuranceSupported) return;

				this.formData.needInsurance = !this.formData.needInsurance;
				console.log(this.formData.needInsurance)
				if (this.formData.needInsurance) {
					// 确保有合理的默认金额
					if (!this.formData.guaranteeValueAmount ||
						isNaN(parseFloat(this.formData.guaranteeValueAmount)) ||
						parseFloat(this.formData.guaranteeValueAmount) <= 0) {
						this.formData.guaranteeValueAmount = 1000;
					}
					this.calculateInsuranceFee();
				} else {
					this.insuranceFee = 0;
					this.totalFee = this.baseFee;
				}
			},

			// 初始化取件日期选项 - 修改标签格式
			initPickupDateOptions() {
				const options = [];
				const now = new Date();

				// 今天的日期（如果已过截止时间，则不包含今天）
				const currentHour = now.getHours();
				let startDay = 0; // 从今天开始

				// 如果已经超过下午5点，则不能选择今天
				if (currentHour >= 16) {
					startDay = 1; // 从明天开始
				}

				// 生成未来7天的日期选项
				for (let i = startDay; i < startDay + 7; i++) {
					const date = new Date();
					date.setDate(now.getDate() + i);

					// 格式化日期为 YYYY-MM-DD
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const day = String(date.getDate()).padStart(2, '0');
					const dateStr = `${year}-${month}-${day}`;

					// 获取星期几
					const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

					// 统一使用相同的标签格式，不再添加"今天"、"明天"字样
					const label = `${month}月${day}日 ${weekday}`;

					options.push({
						value: dateStr,
						label: label,
						isToday: i === 0
					});
				}

				this.pickupDateOptions = options;

				// 默认选择第一个可用日期
				if (options.length > 0 && !this.formData.pickupDate) {
					this.formData.pickupDate = options[0].value;

					// 如果选择的是今天，过滤掉已过的时间段
					this.updateAvailableTimeOptions();
				}
			},

			// 更新可用的时间段选项
			updateAvailableTimeOptions() {
				// 如果选择的是今天，需要过滤已过的时间段
				const selectedDateObj = this.pickupDateOptions.find(o => o.value === this.formData.pickupDate);

				if (selectedDateObj && selectedDateObj.isToday) {
					const now = new Date();
					const currentHour = now.getHours();

					// 过滤已过的时间段
					const availableTimeOptions = this.pickupTimeOptions.filter(option => {
						const startHour = parseInt(option.value.split(':')[0]);
						// 提前2小时截止
						return startHour > currentHour + 2;
					});

					// 如果当前选择的时间段已不可用，重置选择
					if (this.formData.pickupTime) {
						const isCurrentTimeAvailable = availableTimeOptions.some(o => o.value === this.formData
							.pickupTime);
						if (!isCurrentTimeAvailable) {
							this.formData.pickupTime = availableTimeOptions.length > 0 ? availableTimeOptions[0].value :
								'';
						}
					} else if (availableTimeOptions.length > 0) {
						// 默认选择第一个可用时间段
						this.formData.pickupTime = availableTimeOptions[0].value;
					}
					return availableTimeOptions;

				}

				// 如果不是今天，所有时间段都可用
				if (!this.formData.pickupTime && this.pickupTimeOptions.length > 0) {
					// 默认选择第一个时间段
					this.formData.pickupTime = this.pickupTimeOptions[0].value;
				}

				return this.pickupTimeOptions;
			},

			// 选择取件日期
			selectPickupDate(date) {
				console.log('选择取件日期:', date);

				// 使用临时变量存储之前的日期
				const oldDate = this.formData.pickupDate;

				// 强制更新对象，确保Vue检测到变化
				const newFormData = {
					...this.formData
				};
				newFormData.pickupDate = date;
				this.formData = newFormData;

				// console.log(`取件日期已从${oldDate}更新为${this.formData.pickupDate}`);

				// 检查时间是否需要重置
				this.$nextTick(() => {
					const availableTimeOptions = this.updateAvailableTimeOptions();
					if (availableTimeOptions.length > 0) {
						const timeValues = availableTimeOptions.map(item => item.value);
						if (!timeValues.includes(this.formData.pickupTime)) {
							const newFormData = {
								...this.formData
							};
							newFormData.pickupTime = availableTimeOptions[0].value;
							this.formData = newFormData;
						}
					}
				});
			},

			// 选择取件时间段
			selectPickupTime(time) {
				console.log('选择取件时间:', time);

				// 使用临时变量存储之前的时间
				const oldTime = this.formData.pickupTime;

				// 强制更新对象，确保Vue检测到变化
				const newFormData = {
					...this.formData
				};
				newFormData.pickupTime = time;
				this.formData = newFormData;

				console.log(`取件时间已从${oldTime}更新为${this.formData.pickupTime}`);
			},

			// 初始化方法中调用

			// 检查快递是否支持保价
			checkInsuranceSupport(expressOption) {
				if (!expressOption || !expressOption.originalData) {
					this.insuranceSupported = false;
					this.insuranceUnavailableReason = '无法获取保价信息';
					return;
				}

				const originalData = expressOption.originalData;
				// console.log(originalData)
				// 根据bjRule判断是否支持保价
				if (originalData.bjRule && originalData.bjRule.trim() !== '') {
					this.formData.needInsurance = true;
					this.insuranceSupported = true;
					this.insuranceRule = originalData.bjRuleStr || '请按照物品实际价值保价';

					// 立即计算保价费用
					this.calculateInsuranceFee();

					this.$nextTick(() => {
						this.forceUpdate = !this.forceUpdate;
					});
				} else {
					this.insuranceSupported = false;
					this.insuranceUnavailableReason = originalData.bjRuleStr || '当前快递不支持保价';

					// 如果不支持保价但已选择，则关闭保价
					if (this.formData.needInsurance) {
						this.formData.needInsurance = false;
						this.insuranceFee = 0;
						this.totalFee = this.baseFee;
					}
				}
			},

			// 保价金额变更
			onInsuranceAmountChange(e) {
				// 处理输入事件
				const value = e.detail.value;

				// 先将输入存储为字符串，以便用户输入小数点
				this.formData.guaranteeValueAmount = value;

				// 如果有有效数值，则计算保价费用
				const numValue = parseFloat(value);
				if (!isNaN(numValue)) {
					this.calculateInsuranceFee();
				}
			},

			// 设置快速金额值
			setQuickAmount(amount) {
				if (!this.insuranceSupported || !this.formData.needInsurance) return;

				this.formData.guaranteeValueAmount = amount;
				this.calculateInsuranceFee();
			},

			// 滑块变更事件
			onSliderChange(e) {
				const value = e.detail.value;
				this.formData.guaranteeValueAmount = value;
				this.calculateInsuranceFee();
			},

			// 选择支付方式
			selectPaymentMethod(method, event) {
				// 如果传入了事件对象，阻止事件冒泡
				if (event) {
					event.stopPropagation();
				}
				// 检查是否支持该支付方式
				if (!this.supportedPayMethods.includes(method)) {
					uni.showToast({
						title: '当前快递不支持该支付方式',
						icon: 'none'
					});
					return;
				}

				// 使用Vue.set确保响应式更新
				this.$set(this.formData, 'paymentMethod', method);

				if (method === 'onlineCollect') {
					this.$set(this.formData, 'useCommission', false);
					this.$set(this.formData, 'commissionAmount', 0);
					this.canUseCommission = false;
				} else {
					this.canUseCommission = true;
				}
				// 强制更新视图以确保UI立即刷新
				this.$forceUpdate();

				// 可选：使用nextTick确保DOM更新
				this.$nextTick(() => {
					console.log('支付方式已更新为:', method);
				});
			},

			// 更新到付费用（如果有额外费用）
			updateCodFee() {
				const selectedExpress = this.expressCompanies[this.formData.expressIndex];
				if (!selectedExpress) return;

				// 检查是否有到付附加费率
				if (selectedExpress.originalData && selectedExpress.originalData.codFeeRate) {
					const rate = parseFloat(selectedExpress.originalData.codFeeRate);
					if (!isNaN(rate) && rate > 0) {
						// 计算到付费用
						this.codFee = Math.round(this.baseFee * rate * 100) / 100;
						this.updateTotalFee();
					}
				}
			},

			// 重置支付相关费用
			resetPaymentFee() {
				this.codFee = 0;
				this.updateTotalFee();
			},

			// 初始化支付方式
			initPaymentMethods() {
				// 检查用户是否有月结账户
				this.checkMonthlyAccount();

				// 检查选择的快递是否支持到付
				this.checkCodSupport();
			},

			// 检查月结账户
			async checkMonthlyAccount() {
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo') || {};
				console.log('检查月结资格，userInfo:', userInfo);

				if (userInfo.isMonth === 1) {
					// 如果isMonth为1，调用checkEffective方法进一步验证
					if (userInfo.monthlySettlementEligibilityId && userInfo.code) {
						// 调用月结API检查资格
						const res = await monthlyApi.checkEffective(userInfo.monthlySettlementEligibilityId, userInfo
							.code);
						console.log(res)
						if (res === 1) {
							this.hasMonthlyAccount = true;
							console.log('月结账户检查结果:', this.hasMonthlyAccount);
						} else {
							this.hasMonthlyAccount = false;
						}
					} else {
						this.hasMonthlyAccount = false;
					}
				} else {
					this.hasMonthlyAccount = false;
				}
			},

			// 检查是否支持到付
			checkCodSupport() {
				const selectedExpress = this.expressCompanies[this.formData.expressIndex];
				if (!selectedExpress || !selectedExpress.originalData) {
					this.codSupported = false;
					return;
				}

				// 根据快递公司数据判断是否支持到付
				this.codSupported = selectedExpress.originalData.supportCOD === true;
			},

			// 检查支持的支付方式
			checkSupportedPayMethods(expressOption) {
				this.supportedPayMethods = [];

				if (!expressOption || !expressOption.originalData) {
					return;
				}

				const payMethod = expressOption.originalData.payMethod;

				// 根据payMethod判断支持的支付方式
				if (payMethod === 10) {
					// 线下寄付 - 表示只支持在线支付
					// this.supportedPayMethods.push('online');
					// // 如果有月结账户，也支持月结支付
					// if (this.hasMonthlyAccount) {
					// 	this.supportedPayMethods.push('monthly');
					// }
				} else if (payMethod === 20) {
					// 线下到付 - 表示支持到付
					this.supportedPayMethods.push('cod');
				} else if (payMethod === 30) {
					// 线上支付 - 支持微信支付和月结
					this.supportedPayMethods.push('online');
					this.supportedPayMethods.push('onlineCollect');
					if (this.hasMonthlyAccount) {
						this.supportedPayMethods.push('monthly');
					}
				} else {
					// 默认支持在线支付
					this.supportedPayMethods.push('online');
				}
			},

			// 重置为支持的支付方式
			resetToSupportedPaymentMethod() {
				// 如果当前支付方式不在支持列表中，选择第一个支持的方式
				if (!this.supportedPayMethods.includes(this.formData.paymentMethod) && this.supportedPayMethods.length >
					0) {
					this.formData.paymentMethod = this.supportedPayMethods[0];
				}
			},

			// 判断支付方式是否可用
			isPaymentMethodSupported(method) {
				return this.supportedPayMethods.includes(method);
			},

			// 初始化检查月结账户
			initPaymentSettings() {
				// 已经在created钩子中执行了月结账户检查
				// 这里只需初始化其他支付相关设置

				// 如果已选择快递公司，检查支持的支付方式
				if (this.formData.expressIndex >= 0) {
					const selectedExpress = this.expressCompanies[this.formData.expressIndex];
					if (selectedExpress) {
						this.checkSupportedPayMethods(selectedExpress);
					}
				}
			},

			// 初始化用户余额
			initUserBalance() {
				const userInfo = uni.getStorageSync('userInfo') || {};
				this.availableBalance = parseFloat(userInfo.money) || 0;
				console.log('用户余额:', this.availableBalance);
			},

			// 切换是否使用余额抵扣
			toggleUseBalance(e) {
				// 首先检查当前快递公司是否支持线上支付
				if (!this.canUseCommission) {
					// 显示提示信息
					uni.showToast({
						title: '当前快递公司不支持线上支付，无法使用佣金抵扣',
						icon: 'none',
						duration: 2000
					});

					// 强制关闭开关
					this.formData.useCommission = false;
					this.formData.commissionAmount = 0;

					// 刷新UI
					this.$nextTick(() => {
						this.forceUpdate = !this.forceUpdate;
					});

					return;
				}

				// 处理switch的change事件
				let useBalance;

				if (e && typeof e === 'object') {
					// 兼容不同平台的事件对象结构
					if (e.detail && e.detail.value !== undefined) {
						// 微信小程序switch组件
						useBalance = e.detail.value;
					} else if (e.detail && e.detail.checked !== undefined) {
						// 某些平台的switch组件
						useBalance = e.detail.checked;
					} else if (e.target && e.target.value !== undefined) {
						// 标准Web组件
						useBalance = e.target.value;
					} else {
						// 如果无法从事件中获取值，则切换当前状态
						useBalance = !this.formData.useCommission;
					}
				} else {
					// 如果是程序直接调用，切换当前状态
					useBalance = !this.formData.useCommission;
				}

				// 确保useBalance是布尔值
				useBalance = Boolean(useBalance);

				console.log('切换余额抵扣状态:', useBalance);

				// 设置状态
				this.formData.useCommission = useBalance;

				// 根据开关状态计算抵扣金额
				if (this.formData.useCommission) {
					this.calculateBalanceDeduction();
				} else {
					this.formData.commissionAmount = 0;
				}

				// 添加延时强制刷新UI
				this.$nextTick(() => {
					console.log('余额抵扣最终状态:', this.formData.useCommission, '抵扣金额:', this.formData.commissionAmount);
					// 触发一个虚拟的状态更新，强制刷新UI
					this.forceUpdate = !this.forceUpdate;
				});
			},

			// 重命名并完善计算余额抵扣金额的方法
			calculateBalanceDeduction() {
				// 确保用户有余额且已打开余额抵扣开关，且快递公司支持线上支付
				if (!this.formData.useCommission || !this.canUseCommission || !this.availableBalance || this
					.availableBalance <= 0) {
					this.formData.commissionAmount = 0;
					return;
				}

				// 确保总费用已计算
				const total = this.totalFee || 0;
				if (total <= 0) {
					this.formData.commissionAmount = 0;
					return;
				}

				// 计算可抵扣金额（不超过总费用，也不超过可用余额）
				const maxDeduction = Math.min(total, this.availableBalance);

				// 使用 Vue 的响应式系统正确更新对象深层属性
				this.$set(this.formData, 'commissionAmount', parseFloat(maxDeduction.toFixed(2)));

				// 强制更新（我们已经这样做了，保留这行）
				this.$nextTick(() => {
					this.forceUpdate = !this.forceUpdate;
				});

				console.log('余额抵扣计算结果:', {
					总费用: total,
					可用余额: this.availableBalance,
					抵扣金额: this.formData.commissionAmount,
					最终支付: this.finalPayAmount
				});

				// 使用临时变量直接计算最终金额并打印，绕过计算属性
				const rawTotal = parseFloat(this.totalFee.toFixed(2));
				const rawDeduction = parseFloat(this.formData.commissionAmount.toFixed(2));
				const directFinalAmount = rawTotal - rawDeduction;

				console.log('直接计算的最终金额:', {
					总费用原始值: this.totalFee,
					总费用处理后: rawTotal,
					抵扣金额原始值: this.formData.commissionAmount,
					抵扣金额处理后: rawDeduction,
					计算结果: directFinalAmount,
					最终结果: directFinalAmount.toFixed(2)
				});

				// 强制刷新
				this.$forceUpdate();
			},

			// 修改处理快递选择的函数，确保在选择快递公司时检查支付方式
			selectExpressCompany(company) {
				console.log('选择快递公司:', company);

				this.selectedExpressCompany = company;
				this.showCompanyDropdown = false;

				// 清空已选择的快递选项
				this.selectedExpressOption = null;

				// 清空价格数据
				this.baseFee = 0;
				this.insuranceFee = 0;
				this.totalFee = 0;

				// 检查快递公司支持的支付方式
				this.checkSupportedPayMethods(company);

				// 如果不支持线上支付，则禁用余额抵扣
				if (!this.supportedPayMethods.includes('online')) {
					this.formData.useCommission = false;
					this.formData.commissionAmount = 0;
				}

				// 查询可用的快递选项
				this.queryExpressOptions();
			},

			// 切换同意协议
			toggleAgreement() {
				this.formData.agreedToTerms = !this.formData.agreedToTerms;
				if (this.formData.agreedToTerms) {
					this.showAgreementError = false;
				}
			},

			// 查看协议详情
			viewAgreement() {
				uni.navigateTo({
					url: '/views/agreement/service-agreement'
				});
			},

			// 提交订单前检查
			checkBeforeSubmit() {
				// 检查是否同意协议
				if (!this.formData.agreedToTerms) {
					this.showAgreementError = true;
					uni.showToast({
						title: '请先同意神州邮服务协议',
						icon: 'none'
					});
					return false;
				}

				// 其他检查...
				return true;
			},
			// 显示分享引导层
			showShareGuideLayer() {
				this.showShareGuide = true;
			},
			// 隐藏分享引导层
			hideShareGuide() {
				this.showShareGuide = false;
			},
		},

		// 组件销毁时清除计时器
		beforeDestroy() {
			if (this.expressTypeSearchTimer) {
				clearTimeout(this.expressTypeSearchTimer);
			}
		},

		// 生命周期钩子
		onLoad() {

			// 检查月结资格
			this.checkMonthlyEligibility();

			// 加载用户佣金
			this.loadUserCommission();

			// 初始化用户余额
			this.initUserBalance();

			console.log('[分享参数]',
				`邀请码: ${options.inviteCode}`,
				`注册标识: ${options.register}`
			)
			// 参数未收到时显示错误提示
			if (!options.inviteCode) {
				uni.showModal({
					title: '参数错误',
					content: '未收到邀请码，请检查分享方式'
				})
			}
			// 初始化取件日期选项
			this.initPickupDateOptions();
			// 启用分享朋友圈功能
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
		},

		// 监听费用变化，重新计算佣金抵扣
		watch: {
			totalFee: {
				handler(newVal) {
					if (this.formData.useCommission) {
						this.calculateBalanceDeduction();
					}
				}
			},
			// 添加对 formData.commissionAmount 的监听
			'formData.commissionAmount': {
				handler(newVal) {
					// 强制刷新
					this.$forceUpdate();
				}
			}
		}
	}
</script>

<style lang="scss">
	// 全局变量
	:root {
		--primary-color: #FF6B01;
		--primary-gradient: linear-gradient(135deg, #FF6B01, #FF9F40);
		--primary-light: rgba(255, 107, 1, 0.1);
		--card-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.07);
		--input-bg: #f9f9f9;
		--border-radius: 16rpx;
	}

	page {
		background: #f5f7fa;
		color: #333;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, sans-serif;
	}

	.send-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #F5F5F5;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.content-scroll {
		flex: 1;
		// 不需要底部内边距，而是使用独立的安全区域
	}

	.safe-area-bottom {
		height: 110rpx; // 与底部操作栏高度匹配
	}

	.action-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.08);
		z-index: 100;

		// 考虑iPhone X底部安全区
		padding-bottom: env(safe-area-inset-bottom, 0);

		.total-fee {
			display: flex;
			flex-direction: column;

			.fee-label {
				font-size: 24rpx;
				color: #999999;
			}

			.fee-amount-wrapper {
				position: relative;

				.fee-amount {
					font-size: 36rpx;
					font-weight: bold;
					color: #FF6B01;
				}

				.deduction-text {
					position: absolute;
					top: -28rpx;
					font-size: 20rpx;
					color: #52C41A;
				}
			}
		}

		.submit-btn {
			min-width: 220rpx;
			height: 76rpx;
			line-height: 76rpx;
			background: linear-gradient(135deg, #FF8F1F 0%, #FF6B01 100%);
			color: #FFFFFF;
			font-size: 30rpx;
			font-weight: 500;
			border-radius: 38rpx;
			text-align: center;

			box-shadow: 0 6rpx 16rpx rgba(255, 107, 1, 0.3);
		}
	}

	// 表单卡片 - 增强设计
	.form-card {
		background: #FFFFFF;
		border-radius: 24rpx;
		margin: 30rpx;
		box-shadow: var(--card-shadow);
		overflow: hidden;
		animation: slideUpFade 0.5s ease;
		animation-fill-mode: both;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 6rpx;
			height: 60%;
			background: var(--primary-gradient);
			border-radius: 6rpx;
		}

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 36rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
			background: linear-gradient(120deg, #fff9f5, #fff);

			.title-wrapper {
				display: flex;
				align-items: center;

				.card-title {
					font-size: 34rpx;
					font-weight: 600;
					color: #333;
					margin-left: 14rpx;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						bottom: -6rpx;
						left: 0;
						width: 40%;
						height: 3rpx;
						background: var(--primary-color);
						border-radius: 3rpx;
						opacity: 0.5;
					}
				}
			}

			.address-btn,
			.refresh-btn {
				display: flex;
				align-items: center;
				background: rgba(255, 107, 1, 0.08);
				border-radius: 30rpx;
				padding: 10rpx 20rpx;
				box-shadow: 0 4rpx 8rpx rgba(255, 107, 1, 0.1);
				transition: all 0.3s;

				text {
					font-size: 24rpx;
					color: var(--primary-color);
					margin-left: 8rpx;
					font-weight: 500;
				}

				&:active {
					transform: scale(0.96);
					box-shadow: 0 2rpx 4rpx rgba(255, 107, 1, 0.1);
				}
			}
		}

		.form-content {
			padding: 36rpx;

			.input-row {
				margin-bottom: 36rpx;
				position: relative;

				.label {
					font-size: 28rpx;
					color: #555;
					margin-bottom: 14rpx;
					display: block;
					font-weight: 500;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						display: inline-block;
						width: 8rpx;
						height: 8rpx;
						background: var(--primary-color);
						border-radius: 50%;
						margin-right: 10rpx;
						opacity: 0.6;
					}
				}

				// 输入框美化
				.input {
					width: 100%;
					height: 90rpx;
					background: var(--input-bg);
					border-radius: var(--border-radius);
					padding: 0 30rpx;
					font-size: 30rpx;
					color: #333;
					border: 1rpx solid transparent;
					box-sizing: border-box;
					transition: all 0.3s;

					&:focus {
						background: #fff;
						border-color: rgba(255, 107, 1, 0.3);
						box-shadow: 0 0 0 3rpx rgba(255, 107, 1, 0.1);
					}

					&::placeholder {
						color: #bbb;
					}
				}

				// 地址选择美化
				.address-select {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 90rpx;
					background: var(--input-bg);
					border-radius: var(--border-radius);
					padding: 0 30rpx;
					font-size: 30rpx;
					color: #333;
					transition: all 0.3s;

					&:active {
						background: rgba(255, 107, 1, 0.05);
					}

					.placeholder {
						color: #bbb;
					}
				}

				// 尺寸输入组美化
				.size-inputs {
					display: flex;
					align-items: center;

					.size-input {
						flex: 1;
						width: 0;
						text-align: center;
						border-radius: var(--border-radius);
					}

					.size-separator {
						margin: 0 16rpx;
						color: #999;
						font-weight: 500;
					}
				}

				.unit-text {
					position: absolute;
					right: 30rpx;
					top: 58%;
					transform: translateY(-50%);
					color: #999;
					font-size: 26rpx;
					font-weight: 500;
				}
			}
		}
	}

	// 搜索输入框增强
	.search-input-wrapper {
		position: relative;

		.search-input {
			padding-right: 70rpx;
		}

		.search-icon {
			position: absolute;
			right: 24rpx;
			top: 50%;
			transform: translateY(-50%);
			z-index: 2;
			width: 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 107, 1, 0.1);
			border-radius: 50%;
		}

		.type-dropdown {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			max-height: 360rpx;
			overflow-y: auto;
			background-color: #FFFFFF;
			box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.12);
			border-radius: 16rpx;
			z-index: 100;
			margin-top: 12rpx;

			&::-webkit-scrollbar {
				width: 6rpx;
			}

			&::-webkit-scrollbar-thumb {
				background: var(--primary-color);
				border-radius: 3rpx;
			}

			.type-item {
				padding: 24rpx 30rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.03);
				transition: all 0.2s;

				&:last-child {
					border-bottom: none;
				}

				&:active {
					background: var(--primary-light);
				}
			}
		}
	}

	// 快递选项卡片相关样式优化
	.express-options-section {
		margin-bottom: 20rpx;

		.section-title {
			font-size: 28rpx;
			font-weight: 500;
			color: #333;
			margin-bottom: 20rpx;
			position: relative;
			padding-left: 20rpx;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6rpx;
				height: 28rpx;
				background: var(--primary-gradient, linear-gradient(to bottom, #FF6B01, #FF9651));
				border-radius: 3rpx;
			}
		}

		.express-loading-state {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150rpx;
			background: #F7F7F7;
			border-radius: 12rpx;

			text {
				font-size: 28rpx;
				color: #999;
				margin-right: 20rpx;
			}

			.loading-spinner {
				width: 40rpx;
				height: 40rpx;
				border: 3rpx solid rgba(255, 107, 1, 0.2);
				border-top: 3rpx solid #FF6B01;
				border-radius: 50%;
				animation: spin 1s linear infinite;
			}

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}

				100% {
					transform: rotate(360deg);
				}
			}
		}

		.express-empty-hint {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150rpx;
			background: rgba(255, 107, 1, 0.05);
			border: 1px dashed rgba(255, 107, 1, 0.3);
			border-radius: 12rpx;

			text {
				font-size: 28rpx;
				color: #FF6B01;
			}
		}
	}

	/* 快递公司滚动列表样式优化 */
	.express-scroll {
		width: 100%;
		white-space: nowrap;
		margin: 10rpx 0;
		padding: 15rpx 0;
	}

	.express-scroll-container {
		display: inline-flex;
		padding: 10rpx 0;
	}

	.express-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 180rpx;
		margin-right: 20rpx;
		padding: 20rpx 15rpx;
		border-radius: 16rpx;
		background: #F7F7F7;
		transition: all 0.3s;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 4rpx;
			background: transparent;
			transition: all 0.3s;
		}

		&.active {
			background: rgba(255, 107, 1, 0.08);
			transform: translateY(-4rpx);
			box-shadow: 0 8rpx 16rpx rgba(255, 107, 1, 0.15);

			&::before {
				background: var(--primary-gradient, linear-gradient(to right, #FF6B01, #FF9651));
			}

			.express-name {
				color: #FF6B01;
				font-weight: 500;
			}

			.express-price {
				color: #FF6B01;
			}
		}

		.express-logo {
			width: 90rpx;
			height: 90rpx;
			margin-bottom: 15rpx;
			border-radius: 12rpx;
			padding: 12rpx;
			background: #FFFFFF;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		}

		.express-name {
			font-size: 26rpx;
			color: #333;
			margin-bottom: 8rpx;
			text-align: center;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.express-price {
			font-size: 30rpx;
			color: #FF6B01;
			font-weight: 500;
		}
	}

	/* 费用明细样式优化 */
	.fee-content {
		background: #FAFAFA;
		border-radius: 12rpx;
		padding: 20rpx;
	}

	.fee-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;

		&.total {
			margin-top: 10rpx;
			margin-bottom: 0;

			.fee-label {
				font-size: 28rpx;
				font-weight: 500;
			}

			.fee-value {
				font-size: 36rpx;
				font-weight: 600;
			}
		}

		.fee-label {
			font-size: 26rpx;
			color: #666;
		}

		.fee-value {
			font-size: 28rpx;
			color: #333;

			&.highlight {
				color: #FF6B01;
			}
		}
	}

	.fee-divider {
		height: 1px;
		background: #E5E5E5;
		margin: 16rpx 0;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			left: -10rpx;
			top: 0;
			width: 10rpx;
			height: 1px;
			background: linear-gradient(to right, transparent, #E5E5E5);
		}

		&::after {
			content: '';
			position: absolute;
			right: -10rpx;
			top: 0;
			width: 10rpx;
			height: 1px;
			background: linear-gradient(to left, transparent, #E5E5E5);
		}
	}

	// 支付方式卡片样式优化
	.payment-card {
		margin-bottom: 30rpx;
	}

	.payment-display {
		display: flex;
		align-items: center;
		padding: 26rpx;
		background: #F8F8F8;
		margin-bottom: 20rpx;
		border-radius: 12rpx;

		.payment-icon {
			width: 70rpx;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FFFFFF;
			border-radius: 50%;
			margin-right: 20rpx;
			box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
		}

		.payment-info {
			flex: 1;

			.payment-name {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
				margin-bottom: 8rpx;
				display: block;
			}

			.payment-desc {
				font-size: 24rpx;
				color: #999;
				display: block;
			}
		}
	}

	// 日期选择样式
	.date-scroll {
		width: 100%;
		white-space: nowrap;
		margin: 10rpx 0 30rpx;
	}

	.date-scroll-container {
		display: inline-flex;
		padding: 10rpx 0;
	}

	.date-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		transition: all 0.3s;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

		&.active {
			background-color: rgba(255, 107, 1, 0.08);
			border: 1px solid var(--primary-color);
			transform: translateY(-2rpx);
			box-shadow: 0 4rpx 12rpx rgba(255, 107, 1, 0.15);

			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 4rpx;
				background: var(--primary-gradient);
				border-radius: 4rpx 4rpx 0 0;
			}

			.date-text {
				color: #FF6B01;
				font-weight: 500;
			}
		}

		.date-text {
			font-size: 26rpx;
			color: #333;
			line-height: 1.4;
			text-align: center;
		}
	}

	// 时间段选择样式
	.time-slots {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 20rpx;
	}

	.time-slot {
		flex: 0 0 calc(50% - 10rpx);
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		transition: all 0.3s;
		position: relative;

		&.active {
			background: rgba(255, 107, 1, 0.1);

			text {
				color: var(--primary-color, #FF6B01);
				font-weight: 500;
			}
		}

		text {
			font-size: 28rpx;
			color: #333;
			transition: all 0.3s;
		}

		.time-check {
			opacity: 0;
			transition: opacity 0.3s;
		}

		&.active .time-check {
			opacity: 1;
		}
	}

	// 增值服务样式
	.service-options {
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		overflow: hidden;
	}

	.service-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		transition: all 0.3s;

		.service-info {
			display: flex;
			align-items: flex-start; // 改为顶部对齐，以便处理多行文本
			flex: 1;
			min-width: 0; // 防止子元素溢出
		}

		.service-action {
			margin-left: 20rpx; // 增加与文本的间距
			flex-shrink: 0; // 防止开关被压缩
		}

		&.disabled {
			opacity: 0.7;

			.service-desc,
			.rule-text {
				color: #ff5252 !important;
			}

			.view-more {
				background: rgba(255, 82, 82, 0.1);
				color: #ff5252;
			}
		}
	}

	// 保价金额输入
	.insurance-input-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx 24rpx;
		border-top: 1rpx dashed rgba(0, 0, 0, 0.05);

		text {
			font-size: 28rpx;
			color: #666;
		}

		.insurance-input {
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 12rpx;
			padding: 0 20rpx;
			width: 280rpx;
			height: 70rpx;

			.currency-symbol {
				font-size: 28rpx;
				color: #666;
				margin-right: 10rpx;
			}

			input {
				flex: 1;
				height: 100%;
				font-size: 28rpx;
				color: #333;
			}
		}
	}

	// 优化保价规则文本样式
	.service-detail {
		flex: 1;
		min-width: 0; // 防止flex子元素溢出

		.rule-text-wrapper {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.rule-text {
			flex: 1;
			min-width: 0;

			&.truncated {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: calc(100% - 70rpx); // 为"查看"按钮预留空间
			}
		}

		.view-more {
			font-size: 24rpx;
			color: #FF6B01;
			margin-left: 10rpx;
			padding: 2rpx 10rpx;
			background: rgba(255, 107, 1, 0.1);
			border-radius: 12rpx;
			white-space: nowrap;
		}
	}

	// 寄收件人卡片样式
	.address-empty-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 180rpx;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		margin: 10rpx 0;

		uni-icons {
			margin-bottom: 12rpx;
		}

		text {
			font-size: 28rpx;
			color: #666;
		}

		&:active {
			background: rgba(255, 107, 1, 0.05);
		}
	}

	.selected-address-card {
		display: flex;
		padding: 24rpx;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		margin: 10rpx 0;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 6rpx;
			height: 60%;
			background: var(--primary-color, #FF6B01);
			border-radius: 3rpx;
		}

		.address-info {
			flex: 1;
			padding-left: 16rpx;
		}

		.address-person-info {
			display: flex;
			align-items: center;
			margin-bottom: 12rpx;
		}

		.address-name {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			margin-right: 20rpx;
		}

		.address-phone {
			font-size: 28rpx;
			color: #666;
		}

		.address-detail {
			font-size: 28rpx;
			color: #333;
			line-height: 1.5;
		}

		.address-actions {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
		}

		.address-action-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 10rpx;

			text {
				font-size: 24rpx;
				color: #FF6B01;
				margin-top: 6rpx;
			}
		}
	}

	// 优化取件时间样式
	.pickup-time-header {
		margin-bottom: 20rpx;

		.pickup-tip {
			font-size: 26rpx;
			color: #666;
			display: flex;
			align-items: center;

			&::before {
				content: "";
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				background-color: #FF6B01;
				margin-right: 10rpx;
				display: inline-block;
			}
		}
	}

	.date-selector {
		margin-bottom: 30rpx;

		.date-scroll {
			width: 100%;
			white-space: nowrap;
			padding: 10rpx 0;
		}

		.date-scroll-container {
			display: inline-flex;
			padding: 10rpx 0;
		}

		.date-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 160rpx;
			height: 90rpx;
			margin-right: 20rpx;
			padding: 0 20rpx;
			border-radius: 16rpx;
			background-color: #F7F7F7;
			transition: all 0.3s;
			position: relative;
			overflow: hidden;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

			&.active {
				background-color: rgba(255, 107, 1, 0.08);
				border: 1px solid var(--primary-color);
				transform: translateY(-2rpx);
				box-shadow: 0 4rpx 12rpx rgba(255, 107, 1, 0.15);

				&::after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 4rpx;
					background: var(--primary-gradient);
					border-radius: 4rpx 4rpx 0 0;
				}

				.date-text {
					color: #FF6B01;
					font-weight: 500;
				}
			}

			.date-text {
				font-size: 26rpx;
				color: #333;
				line-height: 1.4;
				text-align: center;
			}
		}
	}

	.time-selector {
		.time-options {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.time-item {
			width: calc(50% - 15rpx);
			height: 90rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 16rpx;
			background-color: #F7F7F7;
			transition: all 0.3s;
			position: relative;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

			&.active {
				background-color: rgba(255, 107, 1, 0.08);
				border: 1px solid var(--primary-color);
				transform: translateY(-2rpx);
				box-shadow: 0 4rpx 12rpx rgba(255, 107, 1, 0.15);

				.time-text {
					color: #FF6B01;
					font-weight: 500;

					&::before {
						content: "✓";
						margin-right: 8rpx;
						font-size: 24rpx;
						font-weight: bold;
					}
				}
			}

			.time-text {
				font-size: 26rpx;
				color: #333;
				transition: all 0.2s;
			}
		}
	}

	// 添加无效输入的样式
	input.invalid {
		border: 1px solid #ff5252;
		background-color: rgba(255, 82, 82, 0.05);
	}

	// 提示文字样式
	.error-tip {
		font-size: 24rpx;
		color: #ff5252;
		margin-top: 6rpx;
	}

	// 批量寄件样式
	.batch-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-bottom: 100rpx;
	}

	.batch-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		background: #fff;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.batch-title {
		.batch-count {
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
		}

		.batch-selected {
			font-size: 26rpx;
			color: #FF6B01;
			margin-left: 20rpx;
		}
	}

	.batch-actions {
		display: flex;

		.batch-action {
			display: flex;
			align-items: center;
			padding: 10rpx 20rpx;

			text {
				font-size: 28rpx;
				color: #666;
				margin-left: 8rpx;
			}
		}
	}

	.batch-list {
		flex: 1;
		padding: 20rpx 30rpx;
	}

	.batch-item {
		display: flex;
		margin-bottom: 30rpx;
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.05);
		overflow: hidden;

		.batch-checkbox {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80rpx;
			padding: 0 10rpx;
			background: rgba(255, 107, 1, 0.05);
		}

		.batch-content {
			flex: 1;
			padding: 20rpx;
			display: flex;
		}

		.batch-addresses {
			flex: 1;
		}

		.batch-sender,
		.batch-receiver {
			display: flex;
			margin-bottom: 16rpx;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.address-label {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 36rpx;
			height: 36rpx;
			background: var(--primary-color, #FF6B01);
			color: #fff;
			font-size: 22rpx;
			border-radius: 50%;
			margin-right: 16rpx;
			flex-shrink: 0;
		}

		.address-detail {
			font-size: 28rpx;
			color: #333;
			line-height: 1.4;
		}

		.batch-info {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			margin-left: 20rpx;
		}

		.batch-weight {
			font-size: 28rpx;
			color: #666;
			background: rgba(0, 0, 0, 0.05);
			padding: 6rpx 16rpx;
			border-radius: 24rpx;
		}
	}

	.batch-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;

		.empty-icon {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
		}

		text {
			font-size: 30rpx;
			color: #999;
		}
	}

	.batch-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 10;

		.batch-select-info {
			.selected-count {
				font-size: 28rpx;
				color: #333;
			}
		}

		.batch-submit-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 300rpx;
			height: 80rpx;
			background: var(--primary-color, #FF6B01);
			border-radius: 40rpx;

			text {
				font-size: 30rpx;
				color: #fff;
				font-weight: 500;
			}

			&.disabled {
				background: #ccc;
			}
		}
	}

	// 快运寄件样式
	.heavy-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx 30rpx;
		padding-bottom: 120rpx;
	}

	.heavy-header {
		margin-bottom: 40rpx;
		padding: 20rpx 0;

		.heavy-title {
			font-size: 36rpx;
			font-weight: 600;
			color: #333;
			margin-bottom: 10rpx;
		}

		.heavy-subtitle {
			font-size: 26rpx;
			color: #666;
			line-height: 1.6;
		}
	}

	.heavy-form {
		.form-card {
			margin-bottom: 30rpx;
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		}
	}

	.textarea-input {
		width: 100%;
		height: 160rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);
		font-size: 28rpx;
	}

	.picker-value {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background: var(--input-bg, #f9f9f9);
		border-radius: var(--border-radius, 16rpx);

		text {
			font-size: 28rpx;
			color: #999;
		}
	}

	.heavy-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 30rpx;
		background: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 10;

		.heavy-submit-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 90rpx;
			background: var(--primary-color, #FF6B01);
			border-radius: 45rpx;

			text {
				font-size: 32rpx;
				color: #fff;
				font-weight: 500;
			}
		}
	}

	// 佣金相关
	.commission-deduction {
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 20rpx;
		border: 1px dashed #ddd;

		.deduction-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.deduction-title {
				display: flex;
				align-items: center;

				text {
					font-size: 26rpx;
					color: #333;
					font-weight: 500;
					margin-left: 8rpx;
				}
			}
		}
	}

	// 修改底部按钮区域，添加最终支付金额显示
	.bottom-btn-area {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: #FFFFFF;
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		border-top: 1rpx solid rgba(0, 0, 0, 0.05);

		// 考虑iPhone X底部安全区
		padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(24rpx + env(safe-area-inset-bottom));

		// 总价格区域
		.total-fee {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.fee-label {
				font-size: 24rpx;
				color: #999;
				font-weight: normal;
				margin-bottom: 8rpx;
			}

			// 价格和抵扣信息区域
			.fee-amount-wrapper {
				display: flex;
				flex-direction: row; // 使用水平布局
				align-items: flex-end; // 底部对齐
				flex-wrap: nowrap; // 不换行

				.deduction-text {
					font-size: 22rpx;
					color: #FF6B01;
					margin-right: 12rpx;
					position: relative;
					padding-left: 20rpx;
					font-weight: 500;
					line-height: 1.2;
					align-self: flex-end; // 确保与价格底部对齐
					margin-bottom: 6rpx; // 轻微上移

					// 小圆点图标
					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 12rpx;
						height: 12rpx;
						background-color: #FF6B01;
						border-radius: 50%;
						opacity: 0.8;
					}
				}

				.fee-amount {
					font-size: 42rpx;
					font-weight: bold;
					color: #FF6B01;
					line-height: 1;

					// 添加小号的货币符号
					&::before {
						content: '¥';
						font-size: 30rpx;
						position: relative;
						top: -4rpx;
						margin-right: 2rpx;
					}
				}
			}
		}

		// 提交按钮样式保持不变
	}

	// 为滚动视图添加足够的底部内边距
	.scroll-view-container {
		padding-bottom: 180rpx; // 增加底部内边距，防止内容被底部按钮遮挡
	}

	// 增加底部内边距，确保不被遮挡
	.scroll-view-container {
		padding-bottom: 240rpx !important; // 增加更大的底部内边距
		box-sizing: border-box;
	}

	// 确保底部按钮区域永远在底部
	.bottom-btn-area {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: #FFFFFF;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	// 支付方式卡片样式优化
	.payment-content {
		.payment-display {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: #F8F8F8;
			margin-bottom: 20rpx;
			border-radius: 12rpx;

			.payment-icon {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #FFFFFF;
				border-radius: 50%;
				margin-right: 20rpx;
				box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
			}

			.payment-info {
				flex: 1;

				.payment-name {
					font-size: 30rpx;
					color: #333;
					font-weight: 500;
					margin-bottom: 8rpx;
					display: block;
				}

				.payment-desc {
					font-size: 24rpx;
					color: #999;
					display: block;
				}
			}
		}

		// 线上支付选项样式
		.online-payment-options {
			background: #F8F8F8;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;

			.online-options-header {
				font-size: 26rpx;
				color: #666;
				margin-bottom: 16rpx;
			}

			.online-options-content {
				display: flex;
				justify-content: space-between;

				.online-option {
					flex: 1;
					margin: 0 10rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					padding: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;

					&:first-child {
						margin-left: 0;
					}

					&:last-child {
						margin-right: 0;
					}

					&.active {
						border: 1px solid #FF6B01;
					}

					&.disabled {
						opacity: 0.6;
					}

					.pay-icon {
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 10rpx;
					}

					text {
						font-size: 24rpx;
						color: #333;
					}

					.option-check {
						position: absolute;
						top: 10rpx;
						right: 10rpx;
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						border: 1px solid #ddd;
						display: flex;
						align-items: center;
						justify-content: center;

						.check-circle {
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
							background: #FF6B01;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}

					.no-eligibility {
						position: absolute;
						top: 10rpx;
						right: 10rpx;
						font-size: 20rpx;
						color: #FF4D4F;
						background: rgba(255, 77, 79, 0.1);
						padding: 2rpx 8rpx;
						border-radius: 4rpx;
					}
				}
			}
		}
	}

	// 底部按钮区域样式调整
	.bottom-btn-area {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: #FFFFFF;
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
		display: flex;
		justify-content: space-between; // 确保两端对齐
		align-items: center;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		border-top: 1rpx solid rgba(0, 0, 0, 0.05);

		// 考虑iPhone X底部安全区
		padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(24rpx + env(safe-area-inset-bottom));

		// 总价格区域
		.total-fee {
			flex: 1; // 占据左侧剩余空间
			display: flex;
			flex-direction: column;
			align-items: flex-start; // 靠左对齐

			.fee-label {
				font-size: 24rpx;
				color: #999;
				font-weight: normal;
				margin-bottom: 4rpx;
			}

			// 抵扣文字与金额并排显示
			.fee-amount-wrapper {
				display: flex;
				flex-direction: row; // 改为水平排列
				align-items: center; // 垂直居中对齐
				flex-wrap: wrap; // 允许换行

				.deduction-text {
					font-size: 22rpx;
					color: #FF6B01;
					font-weight: 500;
					margin-right: 16rpx; // 右侧间距
					position: relative;
					padding-left: 22rpx; // 留出图标空间
					height: 28rpx;
					line-height: 28rpx;
					display: inline-block;

					// 小圆点图标
					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 14rpx;
						height: 14rpx;
						background-color: #FF6B01;
						border-radius: 50%;
						opacity: 0.8;
					}
				}

				.fee-amount {
					font-size: 42rpx;
					font-weight: bold;
					color: #FF6B01;
					line-height: 1;
					display: inline-block;
					vertical-align: middle;

					// 添加小号的货币符号
					&::before {
						content: '¥';
						font-size: 30rpx;
						position: relative;
						top: -4rpx;
						margin-right: 2rpx;
					}
				}
			}
		}

		// 提交按钮样式
		.submit-btn {
			margin-left: 30rpx; // 与总价区域保持间距
			position: relative;
			min-width: 240rpx;
			height: 88rpx;
			line-height: 88rpx;

			background: linear-gradient(135deg, #FF9F2F 0%, #FF6B01 100%);
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 600;
			border-radius: 44rpx;
			text-align: center;
			padding: 0 30rpx;
			box-shadow: 0 8rpx 20rpx rgba(255, 107, 1, 0.35);
			overflow: hidden;
			transition: all 0.3s ease;
			border: none; // 确保没有边框

			// 按钮内容
			text {
				position: relative;
				z-index: 2;
				letter-spacing: 2rpx;
			}

			// 波纹效果
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(255, 255, 255, 0.1);
				opacity: 0;
				transform: scale(0.8);
				border-radius: 44rpx;
				transition: all 0.3s ease;
			}

			// 激活状态效果
			&.active::after {
				opacity: 1;
				transform: scale(1);
			}

			// 禁用状态
			&:disabled {
				opacity: 0.7;
				background: linear-gradient(135deg, #FFBB7E 0%, #FF8A3C 100%);
				box-shadow: 0 6rpx 12rpx rgba(255, 107, 1, 0.2);
			}

			// 加载状态
			.loading-icon {
				width: 32rpx;
				height: 32rpx;
				border: 3rpx solid #FFFFFF;
				border-radius: 50%;
				border-top-color: transparent;
				display: inline-block;
				animation: btn-loading 0.8s linear infinite;
				vertical-align: middle;
				margin-right: 10rpx;
			}
		}
	}

	// 确保内容区域有足够的底部间距
	.content-area {
		padding-bottom: 180rpx !important;
	}

	// 加载动画优化
	@keyframes btn-loading {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	// 月结支付加载样式
	.option-loading {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 30rpx;
		height: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.loading-dot {
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			border: 2rpx solid #FF6B01;
			border-top-color: transparent;
			animation: monthly-loading 0.8s linear infinite;
		}
	}

	@keyframes monthly-loading {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	// 佣金抵扣样式优化
	.commission-section {
		padding: 24rpx;
		background: linear-gradient(to right, #FFF9F3, #FFF6EE);
		border-radius: 16rpx;
		border: 1rpx solid rgba(255, 107, 1, 0.15);
		margin: 20rpx 0;
		box-shadow: 0 2rpx 12rpx rgba(255, 107, 1, 0.08);
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 80rpx;
			height: 80rpx;
			background: radial-gradient(circle at top right, rgba(255, 107, 1, 0.1), transparent 70%);
			border-radius: 0 0 0 100%;
			z-index: 1;
		}

		.commission-row {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.commission-info {
				display: flex;
				flex-direction: column;

				.commission-title {
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					margin-bottom: 8rpx;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						display: inline-block;
						width: 8rpx;
						height: 28rpx;
						background: #FF6B01;
						border-radius: 4rpx;
						margin-right: 12rpx;
					}
				}

				.commission-amount {
					font-size: 26rpx;
					color: #FF6B01;
					font-weight: 500;
				}
			}

			.commission-switch {
				position: relative;

				// 自定义开关样式可以在这里调整
			}
		}

		.commission-usage {
			margin-top: 20rpx;
			background: rgba(255, 107, 1, 0.08);
			padding: 12rpx 16rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.usage-text {
				font-size: 26rpx;
				color: #FF6B01;
				font-weight: 500;
				display: flex;
				align-items: center;

				&::before {
					content: '';
					display: inline-block;
					width: 16rpx;
					height: 16rpx;
					background: #FF6B01;
					border-radius: 50%;
					margin-right: 8rpx;
				}
			}

			.usage-amount {
				font-size: 28rpx;
				font-weight: 600;
				color: #FF6B01;
			}
		}
	}

	// 底部金额抵扣显示优化
	.fee-amount-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.deduction-text {
			font-size: 22rpx;
			color: #FF6B01;
			margin-bottom: 8rpx;
			position: relative;
			padding-left: 26rpx;
			font-weight: 600;

			// 添加标记图标
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 18rpx;
				height: 18rpx;
				background-color: #FF6B01;
				border-radius: 50%;
				opacity: 0.8;
			}

			// 添加闪烁动画效果
			animation: deduction-blink 2s infinite;
		}
	}

	// 闪烁动画
	@keyframes deduction-blink {

		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0.7;
		}
	}

	// 保留顶部选项卡样式
	.tab-header {
		display: flex;
		justify-content: space-around;
		background: linear-gradient(to right, #fff, #fff8f4);
		padding: 30rpx 20rpx 40rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 6rpx 20rpx rgba(255, 107, 1, 0.08);
		border-radius: 0 0 30rpx 30rpx;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 15%;
			width: 70%;
			height: 6rpx;
			background: var(--primary-gradient);
			border-radius: 6rpx;
			opacity: 0.2;
		}

		.tab-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx 40rpx;
			border-radius: 18rpx;
			transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
			position: relative;
			overflow: hidden;

			.tab-icon {
				width: 70rpx;
				height: 70rpx;
				margin-bottom: 16rpx;
				transition: all 0.3s;
			}

			text {
				font-size: 28rpx;
				color: #666;
				transition: all 0.3s;
				position: relative;
				z-index: 1;
			}

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: var(--primary-light);
				opacity: 0;
				border-radius: 18rpx;
				transition: opacity 0.3s;
				z-index: 0;
			}

			&.active {
				transform: translateY(-6rpx);

				&::before {
					opacity: 1;
				}

				.tab-icon {
					transform: scale(1.1);
				}

				text {
					color: var(--primary-color);
					font-weight: 600;
				}

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 25%;
					width: 50%;
					height: 4rpx;
					background: var(--primary-color);
					border-radius: 4rpx;
				}
			}
		}
	}

	/* 添加或修改下拉框样式 */
	.dropdown-wrapper {
		position: relative;
		flex: 1;

		.input-wrapper {
			position: relative;

			.search-icon {
				position: absolute;
				right: 16rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.type-dropdown {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			max-height: 400rpx;
			background: #FFFFFF;
			box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
			border-radius: 12rpx;
			z-index: 100;
			overflow-y: auto;
			margin-top: 8rpx;

			.type-item {
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: #333;
				border-bottom: 1rpx solid #F0F0F0;

				&:active {
					background-color: #F8F8F8;
				}

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}

	/* 添加搜索加载动画样式 */
	.search-loading {
		position: absolute;
		right: 16rpx;
		top: 50%;
		transform: translateY(-50%);
		width: 32rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.loading-dot {
			width: 16rpx;
			height: 16rpx;
			background-color: #FF6B01;
			border-radius: 50%;
			animation: search-loading 1.2s infinite ease-in-out;
		}
	}

	@keyframes search-loading {

		0%,
		100% {
			transform: scale(0.5);
			opacity: 0.3;
		}

		50% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* 空状态提示样式 */
	.type-empty {
		padding: 30rpx;
		text-align: center;
		color: #999;
		font-size: 26rpx;
	}

	/* 调试样式 */
	.type-debug {
		padding: 30rpx;
		text-align: center;
		color: #999;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;

		.debug-query {
			margin-top: 10rpx;
			color: #FF6B01;
			font-size: 24rpx;
		}
	}

	/* 确保下拉框样式正确 */
	.type-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		max-height: 400rpx;
		background: #FFFFFF;
		box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
		border-radius: 12rpx;
		z-index: 999;
		/* 增加z-index确保显示在最上层 */
		overflow-y: auto;
		margin-top: 8rpx;

		.type-item {
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			color: #333;
			border-bottom: 1rpx solid #F0F0F0;

			&:active {
				background-color: #F8F8F8;
			}

			&:last-child {
				border-bottom: none;
			}
		}
	}

	/* 添加点击效果 */
	.ripple {
		position: relative;
		overflow: hidden;
		transform: translate3d(0, 0, 0);

		&:active::after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none;
			background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform .5s, opacity 1s;
		}
	}

	/* 添加取件时间选择相关样式 */
	.date-selector {
		margin-bottom: 30rpx;

		.date-scroll {
			width: 100%;
			white-space: nowrap;
		}

		.date-scroll-container {
			display: inline-flex;
			padding: 10rpx 0;
		}

		.date-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 160rpx;
			height: 80rpx;
			margin-right: 20rpx;
			padding: 0 20rpx;
			border-radius: 12rpx;
			background-color: #F7F7F7;
			transition: all 0.3s;

			&.active {
				background-color: var(--primary-light);
				border: 1px solid var(--primary-color);
			}

			.date-text {
				font-size: 26rpx;
				color: #333;
			}
		}
	}

	.time-selector {
		.time-options {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.time-item {
			width: calc(50% - 15rpx);
			height: 80rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 12rpx;
			background-color: #F7F7F7;
			transition: all 0.3s;

			&.active {
				background-color: var(--primary-light);
				border: 1px solid var(--primary-color);
			}

			.time-text {
				font-size: 26rpx;
				color: #333;
			}
		}
	}

	/* 增值服务样式 */
	.service-options {
		padding: 0 10rpx;
	}

	.service-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 10rpx;
		border-radius: 12rpx;
		transition: all 0.3s;

		&.disabled {
			opacity: 0.7;
		}

		.service-left {
			display: flex;
			flex-direction: column;
		}

		.service-name {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 6rpx;
		}

		.service-desc {
			font-size: 24rpx;
			color: #666;

			&.unavailable {
				color: #999;
			}
		}
	}

	.insurance-input-wrapper {
		background-color: #F7F7F7;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.insurance-input {
			display: flex;
			align-items: center;
		}

		.insurance-label {
			font-size: 26rpx;
			color: #333;
			width: 150rpx;
		}

		.insurance-amount-input {
			flex: 1;
			height: 70rpx;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			padding: 0 20rpx;
			margin: 0 15rpx;
			border: 1px solid #EEEEEE;
		}

		.insurance-unit {
			font-size: 26rpx;
			color: #333;
			width: 50rpx;
		}

		.insurance-hint {
			font-size: 24rpx;
			color: #999;
			margin-top: 15rpx;
			line-height: 1.4;
		}
	}

	/* 全新设计的保价服务样式 */
	.insurance-card {
		background: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		transition: all 0.3s;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

		&.disabled {
			opacity: 0.85;
			background: #FAFAFA;
		}

		.insurance-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 30rpx;
				right: 30rpx;
				height: 1px;
				background: #F5F5F5;
			}
		}

		.insurance-info {
			display: flex;
			align-items: center;
			flex: 1;
		}

		.service-icon {
			margin-right: 20rpx;

			.checkbox-wrapper {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				background: #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s;
				border: 1px solid #DDDDDD;

				&.active {
					background: #FF6B01;
					border-color: #FF6B01;
				}
			}
		}

		.service-details {
			display: flex;
			flex-direction: column;
		}

		.service-title {
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 8rpx;
		}

		.service-desc {
			font-size: 24rpx;
			color: #666;

			&.unavailable {
				color: #999;
			}
		}

		.insurance-amount-section {
			padding: 30rpx;
			background: #FAFAFA;
			border-radius: 0 0 16rpx 16rpx;
		}

		.insurance-explainer {
			display: flex;
			align-items: center;
			background: rgba(255, 107, 1, 0.08);
			padding: 16rpx;
			border-radius: 8rpx;
			margin-bottom: 20rpx;

			uni-icons {
				margin-right: 10rpx;
				flex-shrink: 0;
			}

			text {
				font-size: 24rpx;
				color: #FF6B01;
				line-height: 1.4;
			}
		}

		.amount-section {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}

		.amount-label {
			display: flex;
			align-items: center;

			text {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
			}

			.hint {
				font-size: 24rpx;
				color: #999;
				margin-left: 10rpx;
				font-weight: normal;
			}
		}

		.amount-fee-display {
			.fee-calc {
				font-size: 26rpx;
				color: #FF6B01;
				font-weight: 500;
			}
		}

		.value-slider-section {
			background: #FFFFFF;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
		}

		.slider-labels {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;

			text {
				font-size: 22rpx;
				color: #999;
			}
		}

		slider {
			margin: 20rpx 0;
		}

		.value-input-wrapper {
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
		}

		.value-display {
			display: flex;
			align-items: center;
			background: #F8F8F8;
			border-radius: 8rpx;
			padding: 0 20rpx;
			height: 80rpx;
			margin-bottom: 15rpx;
			border: 1px solid #EEEEEE;
		}

		.currency-symbol {
			font-size: 34rpx;
			color: #333;
			font-weight: 500;
			margin-right: 10rpx;
		}

		.value-input {
			flex: 1;
			height: 80rpx;
			font-size: 34rpx;
			color: #333;
		}

		.quick-value-btns {
			display: flex;
			justify-content: space-between;
		}

		.quick-btn {
			flex: 1;
			text-align: center;
			padding: 12rpx 0;
			margin: 0 6rpx;
			border-radius: 8rpx;
			background: #F8F8F8;
			font-size: 24rpx;
			color: #666;
			border: 1px solid #EEEEEE;
			transition: all 0.2s;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}

			&:active {
				background: rgba(255, 107, 1, 0.08);
				border-color: #FF6B01;
				color: #FF6B01;
			}
		}

		.insurance-rule {
			display: flex;
			align-items: flex-start;
			background: rgba(255, 107, 1, 0.05);
			padding: 15rpx;
			border-radius: 8rpx;
			margin: 10rpx 0 20rpx 0;

			uni-icons {
				margin-right: 10rpx;
				flex-shrink: 0;
			}

			text {
				font-size: 24rpx;
				color: #666;
				line-height: 1.4;
			}
		}
	}

	.checkbox-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #FF6B01;
		border-radius: 50%;
		transition: all 0.3s;

		&.active {
			background-color: #FF6B01;
			border-color: #FF6B01;
		}
	}

	.insurance-explainer {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.amount-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.amount-label {
		font-size: 26rpx;
		color: #333;
	}

	.amount-fee-display {
		font-size: 24rpx;
		color: #FF6B01;
	}

	.value-slider-section {
		margin-bottom: 20rpx;
	}

	.slider-labels {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.value-input-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.value-display {
		font-size: 26rpx;
		color: #333;
	}

	.quick-value-btns {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.quick-btn {
		flex: 1;
		text-align: center;
		padding: 10rpx 0;
		border-radius: 8rpx;
		background: #FFFFFF;
		font-size: 24rpx;
		color: #FF6B01;
		border: 1px solid #FF6B01;
		transition: all 0.2s;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}

		&:active {
			background: rgba(255, 107, 1, 0.08);
			border-color: #FF6B01;
			color: #FF6B01;
		}
	}

	.insurance-rule {
		display: flex;
		align-items: flex-start;
		background: rgba(255, 107, 1, 0.05);
		padding: 15rpx;
		border-radius: 8rpx;
		margin: 10rpx 0 20rpx 0;

		uni-icons {
			margin-right: 10rpx;
			flex-shrink: 0;
		}

		text {
			font-size: 24rpx;
			color: #666;
			line-height: 1.4;
		}
	}

	.value-input-container {
		margin-top: 20rpx;
		background: #FAFAFA;
		border-radius: 8rpx;
		padding: 20rpx;
	}

	.value-input-wrapper {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.value-label {
		font-size: 26rpx;
		color: #333;
		margin-right: 10rpx;
	}

	.input-group {
		flex: 1;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 8rpx;
		padding: 0 15rpx;
		height: 70rpx;
	}

	.currency-symbol {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
	}

	.value-input {
		flex: 1;
		height: 70rpx;
		font-size: 30rpx;
		color: #333;
	}

	.unit {
		font-size: 26rpx;
		color: #666;
		margin-left: 8rpx;
	}

	.payment-methods {
		margin: 10rpx 0;
	}

	.payment-option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 20rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
		position: relative;
		border: 1px solid #EEEEEE;
		transition: all 0.3s;

		&.active {
			border-color: #FF6B01;
			background: rgba(255, 107, 1, 0.05);
			transform: translateY(-2rpx);
			box-shadow: 0 6rpx 16rpx rgba(255, 107, 1, 0.1);

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 6rpx;
				height: 100%;
				background: linear-gradient(to bottom, #FF6B01, #FF9651);
				border-radius: 6rpx 0 0 6rpx;
			}
		}

		&.disabled {
			opacity: 0.7;
			background: #F8F8F8;
			cursor: not-allowed;
		}

		.payment-left {
			display: flex;
			align-items: center;
		}

		.payment-icon {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;
			box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);

			&.wechat {
				background: rgba(9, 187, 7, 0.1);
			}

			&.monthly {
				background: rgba(255, 107, 1, 0.1);
			}

			&.cod {
				background: rgba(58, 134, 255, 0.1);
			}
		}

		.payment-details {
			display: flex;
			flex-direction: column;
		}

		.payment-name {
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 6rpx;
		}

		.payment-desc {
			font-size: 24rpx;
			color: #666;

			&.unavailable {
				color: #999;
			}
		}

		.payment-right {
			.radio-btn {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 2rpx solid #DDDDDD;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s;

				&.checked {
					border-color: #FF6B01;
					background: #FF6B01;
				}

				.radio-inner {
					width: 18rpx;
					height: 18rpx;
					border-radius: 50%;
					background: #FFFFFF;
				}
			}
		}
	}

	.radio-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border: 2rpx solid #DDDDDD;
		transition: all 0.3s;

		&.checked {
			border-color: #FF6B01;
			background: #FF6B01;
		}
	}

	.radio-inner {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background: #FFFFFF;
	}

	/* 支付方式样式 */
	.payment-methods {
		margin: 10rpx 0;
	}

	.payment-option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 20rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
		position: relative;
		border: 1px solid transparent;
		transition: all 0.3s;

		&.active {
			border-color: #FF6B01;
			background: rgba(255, 107, 1, 0.03);

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 6rpx;
				height: 100%;
				background: #FF6B01;
				border-radius: 6rpx 0 0 6rpx;
			}
		}

		&.disabled {
			opacity: 0.7;
			background: #F7F7F7;
		}

		.payment-left {
			display: flex;
			align-items: center;
		}

		.payment-icon {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;

			&.wechat {
				background: rgba(9, 187, 7, 0.1);
			}

			&.monthly {
				background: rgba(255, 107, 1, 0.1);
			}

			&.cod {
				background: rgba(58, 134, 255, 0.1);
			}
		}

		.payment-details {
			display: flex;
			flex-direction: column;
		}

		.payment-name {
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 6rpx;
		}

		.payment-desc {
			font-size: 24rpx;
			color: #666;

			&.unavailable {
				color: #999;
			}
		}

		.payment-right {
			.radio-btn {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 2rpx solid #CCCCCC;
				display: flex;
				align-items: center;
				justify-content: center;

				&.checked {
					border-color: #FF6B01;
				}

				.radio-inner {
					width: 18rpx;
					height: 18rpx;
					border-radius: 50%;
					background: #FF6B01;
				}
			}
		}
	}

	/* 余额抵扣样式 */
	.balance-card {
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.03);

		.balance-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.balance-info {
				display: flex;
				align-items: center;
			}

			.service-icon {
				margin-right: 20rpx;
			}

			.checkbox-wrapper {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 2rpx solid #DDDDDD;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s;

				&.active {
					border-color: #FF6B01;
					background: #FF6B01;
				}
			}

			.service-details {
				.service-title {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
					margin-bottom: 6rpx;
				}

				.service-desc {
					font-size: 24rpx;
					color: #666;
				}
			}
		}

		.balance-detail {
			margin-top: 20rpx;
			padding-top: 20rpx;
			border-top: 1px dashed #EEEEEE;

			.balance-explainer {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #FF6B01;
				margin-bottom: 16rpx;

				uni-icons {
					margin-right: 10rpx;
				}
			}

			.deduction-info {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.deduction-label {
					font-size: 26rpx;
					color: #666;
				}

				.deduction-amount {
					font-size: 34rpx;
					color: #FF6B01;
					font-weight: bold;
				}
			}
		}
	}

	/* 不支持线上支付时的提示 */
	.payment-notice {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	/* 添加余额抵扣禁用状态样式 */
	.balance-card {
		&.disabled {
			opacity: 0.8;

			.checkbox-wrapper.disabled {
				background-color: #DDDDDD;
				border-color: #CCCCCC;
			}
		}

		.payment-notice {
			padding: 12rpx 24rpx;
			background: #F8F8F8;
			display: flex;
			align-items: center;
			border-top: 1px dashed #EEEEEE;

			uni-icons {
				margin-right: 8rpx;
			}

			text {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	// 添加同意协议部分
	.agreement-card {
		margin-top: 20rpx;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

		.agreement-content {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.agreement-checkbox {
				display: flex;
				align-items: center;

				.checkbox-wrapper {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 2rpx solid #DDDDDD;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.3s;

					&.active {
						border-color: #FF6B01;
						background: #FF6B01;
					}
				}
			}

			.agreement-text {
				font-size: 26rpx;
				color: #333;
				margin-left: 10rpx;
			}
		}

		.agreement-error {
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #FF5252;
		}
	}

	/* 协议同意部分样式 */
	.agreement-card {
		margin-bottom: 20rpx;
	}

	.agreement-content {
		padding: 20rpx 30rpx;
	}

	.agreement-checkbox {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
	}

	.checkbox-wrapper {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #CCCCCC;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;

		&.active {
			background-color: #FF6B01;
			border-color: #FF6B01;
		}
	}

	.agreement-text {
		font-size: 28rpx;
		color: #333333;
	}

	.agreement-link {
		color: #FF6B01;
	}

	.agreement-error {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		margin-left: 60rpx;
		font-size: 24rpx;
		color: #FF5252;

		.uni-icons {
			margin-right: 8rpx;
		}
	}

	.express-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.express-item-vertical {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		background-color: #f9f9f9;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		transition: all 0.3s;

		&.active {
			background: rgba(255, 107, 1, 0.1);
			border: 1px solid #FF6B01;
		}

		.express-item-left {
			display: flex;
			align-items: center;

			.express-logo {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
			}

			.express-name {
				font-size: 28rpx;
				color: #333;
				font-weight: 500;
			}
		}

		.express-item-right {
			.express-price {
				font-size: 32rpx;
				color: #FF6B01;
				font-weight: bold;
			}
		}
	}

	.share-btn {
		width: 120px;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 44rpx;
		box-shadow: 0 2rpx 5rpx #07C160;
		line-height: 88rpx;
		color: #FFFFFF;
		text-align: center;
		padding: 0 30rpx;
		overflow: hidden;
		transition: all 0.3s ease;
		border: none;


		.btn-inner {
			display: flex;
			align-items: center;
			justify-content: center;

			.btn-icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}

		&.wechat {
			background: #07C160;
			color: #fff;
		}

		&.copy {
			background: #4A90E2;
			color: #fff;
		}
	}

	.share-guide-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide-content {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* 目标高亮 - 右上角按钮 */
	.target-highlight {
		position: absolute;
		top: 25px;
		right: 25px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid #FF9500;
		background-color: rgba(255, 149, 0, 0.2);
		box-shadow: 0 0 15px rgba(255, 149, 0, 0.8);
		animation: pulse 1.5s infinite;
		z-index: 10000;
	}

	/* 指向箭头 */
	.guide-arrow {
		position: absolute;
		top: 15px;
		right: 65px;
		width: 25px;
		height: 25px;
		border-left: 5px solid #FF9500;
		border-top: 5px solid #FF9500;
		transform: rotate(45deg);
		z-index: 10000;
		filter: drop-shadow(0 0 8px rgba(255, 149, 0, 0.8));
		animation: upDown 1.5s ease infinite;
	}

	@keyframes upDown {
		0%, 100% {
			transform: rotate(45deg) translateY(0);
		}
		50% {
			transform: rotate(45deg) translateY(-8px);
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	/* 简化指引内容 */
	.guide-box {
		position: fixed;
		bottom: 30%;
		left: 50%;
		transform: translateX(-50%);
		width: 280px;
		background-color: #fff;
		border-radius: 12px;
		padding: 20px;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.guide-text {
		font-size: 18px;
		font-weight: bold;
		color: #333;
		margin-bottom: 15px;
	}

	.guide-tips {
		font-size: 14px;
		color: #FF9500;
		margin-bottom: 20px;
	}

	.guide-close-btn {
		background-color: #FF9500;
		color: #fff;
		font-size: 16px;
		padding: 10px 0;
		border-radius: 20px;
		width: 100%;
	}
</style>
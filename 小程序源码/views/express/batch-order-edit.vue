<template>
	<view class="send-container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar" :class="{'ios-nav': isIPhoneX}">
			<view class="nav-back ripple-effect" @click="goBack">
				<uni-icons type="back" size="22" color="#333333"></uni-icons>
			</view>
			<text class="nav-title">{{ isEdit ? '编辑订单' : '新增订单' }}</text>
			<view class="nav-right">
				<text class="save-text" @click="saveOrder">保存</text>
			</view>
		</view>

		<!-- 主内容区域 -->
		<view class="main-content">
			<scroll-view scroll-y class="content-scroll" :scroll-top="scrollTop"
				:style="{ height: 'calc(100vh - ' + (isIPhoneX ? '168rpx' : '118rpx') + ')' }">
				<view class="content-area">
					<!-- 寄件人信息 -->
					<view class="form-card animate-slide-in" style="animation-delay: 0s">
						<view class="card-header">
							<view class="title-wrapper">
								<view class="icon-wrapper sender">
									<uni-icons type="paperplane" size="20" color="#FFFFFF"></uni-icons>
								</view>
								<text class="card-title">寄件人信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 地址簿选择卡片 -->
							<view v-if="!formData.senderName" class="address-empty-card ripple pulse-animation"
								@click="selectAddress('sender')">
								<uni-icons type="plusempty" size="24" color="#FF6B01"></uni-icons>
								<text>从地址簿选择寄件人</text>
							</view>

							<!-- 已选择的地址 -->
							<view v-else class="selected-address-card">
								<view class="address-info">
									<view class="address-person-info">
										<text class="address-name">{{ formData.senderName }}</text>
										<text class="address-phone">{{ formatPhone(formData.senderMobile) }}</text>
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

					<!-- 收件人信息 -->
					<view class="form-card animate-slide-in" style="animation-delay: 0.1s">
						<view class="card-header">
							<view class="title-wrapper">
								<view class="icon-wrapper receiver">
									<uni-icons type="map-pin-ellipse" size="20" color="#FFFFFF"></uni-icons>
								</view>
								<text class="card-title">收件人信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 地址簿选择卡片 -->
							<view v-if="!formData.receiverName" class="address-empty-card ripple pulse-animation"
								@click="selectAddress('receiver')">
								<uni-icons type="plusempty" size="24" color="#FF6B01"></uni-icons>
								<text>从地址簿选择收件人</text>
							</view>

							<!-- 已选择的地址 -->
							<view v-else class="selected-address-card">
								<view class="address-info">
									<view class="address-person-info">
										<text class="address-name">{{ formData.receiverName }}</text>
										<text class="address-phone">{{ formatPhone(formData.receiverMobile) }}</text>
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
					<view class="form-card animate-slide-in" style="animation-delay: 0.2s">
						<view class="card-header">
							<view class="title-wrapper">
								<view class="icon-wrapper package">
									<uni-icons type="package" size="20" color="#FFFFFF"></uni-icons>
								</view>
								<text class="card-title">物品信息</text>
							</view>
						</view>

						<view class="form-content">
							<!-- 物品类型选择 -->
							<view class="input-row">
								<view class="legal-notice">
									<text>请如实填写物品信息，由于虚假信息造成的法律责任，或者快递拦截、退件费用都将由寄件人承担！</text>
								</view>
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

							<!-- 物品重量 -->
							<view class="input-row">
								<text class="label">物品重量 (kg)</text>
								<input type="digit" v-model="formData.estimatedItemWeight" placeholder="请输入物品重量"
									class="input weight-input" @input="validateWeightInput" maxlength="5" />
								<text class="unit-text">kg</text>
							</view>

							<!-- 物品体积 -->
							<view class="input-row">
								<text class="label">物品长度 (cm)</text>
								<input type="digit" v-model="formData.length" placeholder="请输入物品长度"
									class="input length-input" @input="validateLengthInput" maxlength="5" />
								<text class="unit-text">cm</text>
							</view>

							<!-- 物品宽度 -->
							<view class="input-row">
								<text class="label">物品宽度 (cm)</text>
								<input type="digit" v-model="formData.width" placeholder="请输入物品宽度"
									class="input width-input" @input="validateWidthInput" maxlength="5" />
								<text class="unit-text">cm</text>
							</view>

							<!-- 物品高度 -->
							<view class="input-row">
								<text class="label">物品高度 (cm)</text>
								<input type="digit" v-model="formData.height" placeholder="请输入物品高度"
									class="input height-input" @input="validateHeightInput" maxlength="5" />
								<text class="unit-text">cm</text>
							</view>

							<!-- 上门备注 -->
							<view class="input-row">
								<text class="label">上门备注</text>
								<input type="text" v-model="formData.remark" placeholder="如特殊要求请备注说明" class="input" />
							</view>
						</view>
					</view>

					<!-- 安全底部区域 -->
					<view class="safe-area-bottom"></view>
				</view>
			</scroll-view>
		</view>

		<!-- 底部按钮区域 -->
		<view class="bottom-bar" :style="{ paddingBottom: isIPhoneX ? '34rpx' : '0' }">
			<view class="bottom-btn-wrapper">
				<button class="cancel-btn ripple" @click="goBack">取消</button>
				<button class="submit-btn ripple" @click="saveOrder" :disabled="!isFormValid"
					:class="{ 'disabled': !isFormValid }">
					保存订单
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import addressApi from '@/api/address'
	export default {
		data() {
			return {
				// 表单数据
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
					itemTypeName: '',
					estimatedItemWeight: '',
					remark: '',
					length: '', // 长度(cm)
					width: '', // 宽度(cm)
					height: '', // 高度(cm)
				},

				// 编辑状态
				isEdit: false,
				orderIndex: -1,

				// 滚动位置
				scrollTop: 0,

				// 系统信息
				isIPhoneX: false,

				// 物品类型相关
				expressTypeQuery: '',
				showTypeDropdown: false,
				expressTypeSearchLoading: false,
				expressTypeSearchTimer: null,
				filteredExpressTypes: [],

				// 模拟物品类型数据
				expressTypes: [{
						typeId: '1',
						typeName: '日用品'
					},
					{
						typeId: '2',
						typeName: '电子产品'
					},
					{
						typeId: '3',
						typeName: '数码产品'
					},
					{
						typeId: '4',
						typeName: '服装鞋帽'
					},
					{
						typeId: '5',
						typeName: '食品'
					},
					{
						typeId: '6',
						typeName: '图书文具'
					},
					{
						typeId: '7',
						typeName: '运动户外'
					},
					{
						typeId: '8',
						typeName: '家居家装'
					},
					{
						typeId: '9',
						typeName: '美妆个护'
					},
					{
						typeId: '10',
						typeName: '母婴用品'
					}
				],

				// 是否显示体积输入区域
				showVolumeFields: false,
			};
		},

		computed: {
			// 表单是否填写完整，用于启用/禁用保存按钮
			isFormValid() {
				return this.formData.senderName && this.formData.senderMobile &&
					this.formData.receiverName && this.formData.receiverMobile &&
					this.formData.estimatedItemWeight && this.expressTypeQuery;
			}
		},

		methods: {
			getDefault() {
				const userInfo = this.$store.getters['user/getUserInfo']
				addressApi.getDefaultAddress(userInfo.userId).then(data => {
					console.log(data)
					if (data) {
						this.formData.senderName = data.contactName;
						this.formData.senderMobile = data.contactPhone; // 修正：发件人手机应该放到senderMobile
						this.formData.senderProvince = data.province;
						this.formData.senderCity = data.city;
						this.formData.senderDistrict = data.district || '';
						this.formData.senderDetailAddress = data.detailAddress;
					}
				})
			},
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},

			// 保存订单
			saveOrder() {
				// 表单验证
				if (!this.isFormValid) {
					uni.showToast({
						title: '请完善寄件信息',
						icon: 'none'
					});
					return;
				}

				// 如果是编辑模式，使用原来的index
				if (this.isEdit && this.orderIndex !== undefined) {
					// 将编辑后的数据提交回主页面
					const pages = getCurrentPages();
					const prevPage = pages[pages.length - 2]; // 获取上一个页面对象

					if (prevPage && prevPage.$vm) {
						// 更新原来的订单数据
						prevPage.$vm.updateOrderAtIndex(this.orderIndex, this.formData);
					}

					// 返回上一级页面
					uni.navigateBack();
				} else {
					// 新增订单的逻辑...
					const pages = getCurrentPages();
					const prevPage = pages[pages.length - 2];

					if (prevPage && prevPage.$vm) {
						prevPage.$vm.addBatchOrder(this.formData);
					}

					uni.navigateBack();
				}
			},

			// 从地址簿选择地址
			selectAddress(type) {
				uni.navigateTo({
					url: `/views/address/address?select=true&type=${type}`,
					events: {
						// 选择地址后的回调
						addressSelected: (data) => {
							if (type === 'sender') {
								// 填充寄件人信息 - 修正字段映射
								this.formData.senderName = data.address.contactName;
								this.formData.senderMobile = data.address
								.contactPhone; // 修正：发件人手机应该放到senderMobile
								this.formData.senderProvince = data.address.province;
								this.formData.senderCity = data.address.city;
								this.formData.senderDistrict = data.address.district || '';
								this.formData.senderDetailAddress = data.address.detailAddress;
							} else {
								// 填充收件人信息 - 修正字段映射
								this.formData.receiverName = data.address.contactName;
								this.formData.receiverMobile = data.address
								.contactPhone; // 修正：收件人手机应该放到receiverMobile
								this.formData.receiverProvince = data.address.province;
								this.formData.receiverCity = data.address.city;
								this.formData.receiverDistrict = data.address.district || '';
								this.formData.receiverDetailAddress = data.address.detailAddress;
							}
							console.log('完成地址填充，表单数据:', this.formData);
						}
					}
				});
			},

			// 验证重量输入
			validateWeightInput(e) {
				// 从输入事件获取值
				let input = e.detail ? e.detail.value : this.formData.estimatedItemWeight;

				// 移除非数字字符，只保留数字和小数点
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

			// 格式化电话号码
			formatPhone(phone) {
				if (!phone) return '';
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			},

			// 初始化页面数据
			initPageData() {
				// 获取页面参数
				const eventChannel = this.getOpenerEventChannel();

				if (eventChannel) {
					// 监听编辑数据
					eventChannel.on('editOrderData', (data) => {
						if (data && data.orderIndex !== undefined) {
							this.isEdit = true;
							this.orderIndex = data.orderIndex;

							// 使用深拷贝防止引用修改
							if (data.order) {
								Object.keys(data.order).forEach(key => {
									if (this.formData.hasOwnProperty(key)) {
										this.formData[key] = data.order[key];
									}
								});
							}
						}
					});
				}

				// 初始化物品类型查询
				if (this.formData.itemTypeName) {
					this.expressTypeQuery = this.formData.itemTypeName;
				} else {
					// 默认设置为日用品
					this.formData.itemTypeName = '';
					this.expressTypeQuery = '';
					this.formData.itemType = '1';
				}
			},

			// 物品类型相关方法
			onExpressTypeSearch(e) {
				this.expressTypeQuery = e.detail.value;

				// 清除之前的定时器
				if (this.expressTypeSearchTimer) {
					clearTimeout(this.expressTypeSearchTimer);
				}

				// 显示加载状态
				this.expressTypeSearchLoading = true;

				// 模拟网络请求延迟
				this.expressTypeSearchTimer = setTimeout(() => {
					// 过滤物品类型
					this.filteredExpressTypes = this.expressTypes.filter(item =>
						!this.expressTypeQuery ||
						item.typeName.toLowerCase().indexOf(this.expressTypeQuery.toLowerCase()) > -1
					);

					this.expressTypeSearchLoading = false;
				}, 300);
			},

			onTypeInputBlur() {
				// 延迟隐藏，确保点击事件先触发
				setTimeout(() => {
					this.showTypeDropdown = false;

					// 如果没有选择物品类型，但输入了查询内容，则自动设置
					if (!this.formData.itemType && this.expressTypeQuery) {
						this.formData.itemTypeName = this.expressTypeQuery;
					}
				}, 200);
			},

			selectExpressType(item) {
				this.formData.itemType = item.typeId;
				this.formData.itemTypeName = item.typeName;
				this.expressTypeQuery = item.typeName;
				this.showTypeDropdown = false;
			},

			// 验证长度输入
			validateLengthInput(e) {
				// 从输入事件获取值
				let input = e.detail ? e.detail.value : this.formData.length;

				// 移除非数字字符，只保留数字和小数点
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

				// 更新模型值
				this.formData.length = input;
			},

			// 验证宽度输入
			validateWidthInput(e) {
				// 从输入事件获取值
				let input = e.detail ? e.detail.value : this.formData.width;

				// 移除非数字字符，只保留数字和小数点
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

				// 更新模型值
				this.formData.width = input;
			},

			// 验证高度输入
			validateHeightInput(e) {
				// 从输入事件获取值
				let input = e.detail ? e.detail.value : this.formData.height;

				// 移除非数字字符，只保留数字和小数点
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

				// 更新模型值
				this.formData.height = input;
			}
		},

		// 页面加载
		onLoad(options) {
			if (options.isEdit === 'true' || options.orderData) {
				this.isEdit = true;

				// 方法一：从URL参数获取数据
				if (options.orderData) {
					try {
						const orderData = JSON.parse(decodeURIComponent(options.orderData));
						this.orderIndex = parseInt(options.index);

						// 填充表单数据
						this.formData = {
							...this.formData,
							...orderData
						};

						console.log('接收到的订单数据:', this.formData);
					} catch (e) {
						console.error('解析订单数据出错:', e);
						uni.showToast({
							title: '加载订单数据失败',
							icon: 'none'
						});
					}
				}

				// 方法二：从本地存储获取数据
				// const orderData = uni.getStorageSync('currentEditingOrder');
				// this.orderIndex = uni.getStorageSync('currentEditingOrderIndex');
				// if (orderData) {
				//   this.formData = {...this.formData, ...orderData};
				// }
			}

			// 检查设备类型
			const systemInfo = uni.getSystemInfoSync();
			this.isIPhoneX = systemInfo.model.indexOf('iPhone X') !== -1 ||
				systemInfo.model.indexOf('iPhone 11') !== -1 ||
				systemInfo.model.indexOf('iPhone 12') !== -1 ||
				systemInfo.model.indexOf('iPhone 13') !== -1 ||
				systemInfo.model.indexOf('iPhone 14') !== -1 ||
				systemInfo.model.indexOf('iPhone 15') !== -1;

			// 初始化数据
			this.initPageData();
			this.getDefault();
			// 如果传入了编辑索引
			if (options.orderIndex) {
				this.orderIndex = parseInt(options.orderIndex);
				this.isEdit = true;
			}
		},

		// 页面加载完成后调用
		onReady() {
			// 初始化时执行搜索，预加载物品类型
			this.onExpressTypeSearch({
				detail: {
					value: this.expressTypeQuery
				}
			});
		}
	}
</script>

<style lang="scss">
	.send-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #F8F9FA;

		/* 顶部导航栏 */
		.nav-bar {
			height: 88rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			position: relative;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
			z-index: 10;

			&.ios-nav {
				padding-top: 44rpx;
				height: 132rpx;
			}

			.nav-back {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}

			.nav-title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-size: 34rpx;
				font-weight: 500;
				color: #333333;
			}

			.nav-right {
				display: flex;
				align-items: center;

				.save-text {
					font-size: 30rpx;
					color: #FF6B01;
					font-weight: 500;
				}
			}
		}

		/* 主内容区域 */
		.main-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.content-scroll {
			flex: 1;
		}

		.content-area {
			padding: 20rpx;
		}

		/* 表单卡片 */
		.form-card {
			background-color: #FFFFFF;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

			&.animate-slide-in {
				opacity: 0;
				animation: slide-in 0.5s ease forwards;
			}

			.card-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 24rpx 30rpx;
				border-bottom: 1rpx solid #F5F5F5;

				.title-wrapper {
					display: flex;
					align-items: center;

					.icon-wrapper {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 10rpx;

						&.sender {
							background: linear-gradient(135deg, #FF8F00, #FF6B01);
						}

						&.receiver {
							background: linear-gradient(135deg, #4A89DC, #3A86FF);
						}

						&.package {
							background: linear-gradient(135deg, #5CB85C, #4CAF50);
						}
					}

					.card-title {
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;
					}
				}
			}

			.form-content {
				padding: 20rpx 30rpx;
			}
		}

		/* 地址卡片样式 */
		.address-empty-card {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 120rpx;
			background-color: #F9F9F9;
			border-radius: 12rpx;

			text {
				font-size: 28rpx;
				color: #666666;
				margin-left: 10rpx;
			}
		}

		.selected-address-card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #F9F9F9;
			border-radius: 12rpx;
			padding: 20rpx;
			transition: transform 0.2s ease;

			&:active {
				transform: scale(0.98);
			}

			.address-info {
				flex: 1;
				margin-right: 20rpx;

				.address-person-info {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;

					.address-name {
						font-size: 30rpx;
						font-weight: bold;
						color: #333333;
						margin-right: 20rpx;
					}

					.address-phone {
						font-size: 28rpx;
						color: #666666;
					}
				}

				.address-detail {
					font-size: 28rpx;
					color: #666666;
					line-height: 1.4;
				}
			}

			.address-actions {
				display: flex;
				align-items: center;

				.address-action-btn {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 10rpx;

					text {
						font-size: 22rpx;
						color: #FF6B01;
						margin-top: 6rpx;
					}
				}
			}
		}

		/* 物品信息样式 */
		.input-row {
			margin-bottom: 24rpx;
			position: relative;

			&:last-child {
				margin-bottom: 0;
			}

			.label {
				font-size: 28rpx;
				color: #333333;
				display: block;
				margin-bottom: 10rpx;
				font-weight: 500;
			}

			.input {
				width: 100%;
				height: 80rpx;
				background-color: #F9F9F9;
				border-radius: 12rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #333333;
				box-sizing: border-box;
				transition: all 0.3s ease;

				&:focus {
					background-color: #FFF8F2;
					box-shadow: 0 0 0 2rpx rgba(255, 107, 1, 0.2);
				}
			}

			.weight-input {
				width: calc(100% - 60rpx);
				padding-right: 60rpx;
			}

			.unit-text {
				position: absolute;
				right: 20rpx;
				top: calc(50% + 20rpx);
				transform: translateY(-50%);
				font-size: 28rpx;
				color: #999999;
			}
		}

		/* 物品类型下拉框相关样式 */
		.dropdown-wrapper {
			position: relative;

			.input-wrapper {
				position: relative;

				.search-icon {
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.search-loading {
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-50%);
					width: 32rpx;
					height: 32rpx;

					.loading-dot {
						width: 100%;
						height: 100%;
						border: 2rpx solid #FF6B01;
						border-radius: 50%;
						border-top-color: transparent;
						animation: spin 0.8s linear infinite;
					}
				}
			}

			.type-dropdown {
				position: absolute;
				top: 85rpx;
				left: 0;
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
				z-index: 100;
				max-height: 400rpx;
				overflow-y: auto;
				animation: fade-in 0.2s ease;

				.type-debug {
					padding: 20rpx;
					text-align: center;

					text {
						display: block;
						font-size: 26rpx;
						color: #999999;
					}

					.debug-query {
						font-size: 24rpx;
						color: #CCCCCC;
						margin-top: 10rpx;
					}
				}

				.type-item {
					padding: 20rpx;
					border-bottom: 1rpx solid #F5F5F5;
					transition: background-color 0.2s ease;

					&:last-child {
						border-bottom: none;
					}

					&:active {
						background-color: #FFF8F2;
					}

					text {
						font-size: 28rpx;
						color: #333333;
					}
				}
			}
		}

		/* 底部按钮区域 */
		.bottom-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
			box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.06);
			z-index: 100;

			.bottom-btn-wrapper {
				display: flex;
				align-items: center;
				padding: 20rpx 30rpx;
			}

			.cancel-btn {
				flex: 1;
				height: 80rpx;
				background-color: #F5F5F5;
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;
				font-size: 30rpx;
				color: #666666;
				transition: all 0.3s ease;

				&:active {
					background-color: #EBEBEB;
					transform: scale(0.98);
				}
			}

			.submit-btn {
				flex: 2;
				height: 80rpx;
				background: linear-gradient(to right, #FF8F00, #FF6B01);
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				color: #FFFFFF;
				transition: all 0.3s ease;

				&:active {
					transform: scale(0.98);
				}

				&.disabled {
					background: #CCCCCC;
				}
			}
		}

		/* 底部安全区 */
		.safe-area-bottom {
			height: 120rpx;
		}

		/* 动画效果 */
		@keyframes slide-in {
			from {
				opacity: 0;
				transform: translateY(30rpx);
			}

			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fade-in {
			from {
				opacity: 0;
				transform: translateY(-10rpx);
			}

			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes pulse {
			0% {
				box-shadow: 0 0 0 0 rgba(255, 107, 1, 0.4);
			}

			70% {
				box-shadow: 0 0 0 10rpx rgba(255, 107, 1, 0);
			}

			100% {
				box-shadow: 0 0 0 0 rgba(255, 107, 1, 0);
			}
		}

		.pulse-animation {
			animation: pulse 2s infinite;
		}

		/* 水波纹效果 */
		.ripple {
			position: relative;
			overflow: hidden;
		}

		.ripple::after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none;
			background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform 0.5s, opacity 0.5s;
		}

		.ripple:active::after {
			transform: scale(0, 0);
			opacity: 0.3;
			transition: 0s;
		}

		/* 加载动画 */
		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

		.ripple-effect {
			position: relative;
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 5px;
				height: 5px;
				background: rgba(255, 255, 255, 0.5);
				opacity: 0;
				border-radius: 100%;
				transform: scale(1, 1) translate(-50%);
				transform-origin: 50% 50%;
			}

			&:active::after {
				animation: ripple 0.4s ease-out;
			}
		}

		@keyframes ripple {
			0% {
				transform: scale(0, 0);
				opacity: 0.5;
			}

			100% {
				transform: scale(20, 20);
				opacity: 0;
			}
		}
	}

	/* 物品信息合规提示样式 */
	.legal-notice {
		margin: 0 15px 15px;
		padding: 8px 12px;
		background-color: #FFF7E6;
		border-radius: 6px;
		border-left: 3px solid #FF3333;
	}

	.legal-notice text {
		font-size: 12px;
		color: #FF0000;
		line-height: 1.4;
	}
</style>
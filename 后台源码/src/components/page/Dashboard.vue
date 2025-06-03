<template>
    <div class="dashboard-container">
        <!-- 快递主题的全屏加载动画 -->
        <div v-if="fullscreenLoading" class="delivery-loading-mask">
            <div class="delivery-loading-container">
                <!-- 快递车图标 -->
                <div class="delivery-truck">
                    <i class="el-icon-truck"></i>
                    <div class="truck-wheels">
                        <div class="wheel"></div>
                        <div class="wheel"></div>
                    </div>
                </div>
                
                <!-- 配送路线动画 -->
                <div class="delivery-route">
                    <div class="route-line"></div>
                    <div class="route-dot dot-1"></div>
                    <div class="route-dot dot-2"></div>
                    <div class="route-dot dot-3"></div>
                </div>
                
                <!-- 包裹图标 -->
                <div class="delivery-box">
                    <i class="el-icon-box"></i>
                </div>
                
                <div class="loading-text">神州邮数据加载中...</div>
                <div class="loading-progress">
                    <div class="progress-bar" :style="{width: loadingProgress + '%'}"></div>
                </div>
            </div>
        </div>

        <!-- 欢迎信息卡片 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="welcome-card">
                    <div class="welcome-info">
                        <img src="../../assets/img/logo.png" class="welcome-img">
                        <div class="welcome-content">
                            <h2>欢迎回来，{{name}}</h2>
                            <p>神州邮 · 让寄件更简单</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 数据概览 -->
        <el-row :gutter="20">
            <el-col :span="5">
                <el-card shadow="hover" class="data-card blue">
                    <div class="card-loading" v-if="overviewLoading">
                        <div class="package-loading">
                            <i class="el-icon-box package-icon"></i>
                            <div class="package-scanner"></div>
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-cont-left">
                            <i class="el-icon-s-order grid-con-icon"></i>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{todayOrders}}</div>
                            <div>今日订单数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card shadow="hover" class="data-card green">
                    <div class="card-loading" v-if="overviewLoading">
                        <div class="package-loading">
                            <i class="el-icon-box package-icon"></i>
                            <div class="package-scanner"></div>
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-cont-left">
                            <i class="el-icon-money grid-con-icon"></i>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num">¥ {{todayIncome}}</div>
                            <div>今日流水</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="hover" class="data-card orange">
                    <div class="card-loading" v-if="overviewLoading">
                        <div class="package-loading">
                            <i class="el-icon-box package-icon"></i>
                            <div class="package-scanner"></div>
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-cont-left">
                            <i class="el-icon-s-cooperation grid-con-icon"></i>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{monthlyUsers}}</div>
                            <div>月结用户数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card shadow="hover" class="data-card purple">
                    <div class="card-loading" v-if="overviewLoading">
                        <div class="package-loading">
                            <i class="el-icon-box package-icon"></i>
                            <div class="package-scanner"></div>
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-cont-left">
                            <i class="el-icon-data-line grid-con-icon"></i>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{monthlyIncome}}</div>
                            <div>本月收入</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5">
                <el-card shadow="hover" class="data-card red">
                    <div class="card-loading" v-if="overviewLoading">
                        <div class="package-loading">
                            <i class="el-icon-box package-icon"></i>
                            <div class="package-scanner"></div>
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-cont-left">
                            <i class="el-icon-wallet grid-con-icon"></i>
                        </div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{differenceCount}}</div>
                            <div>待补差价数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 图表展示 -->
      <!--  <el-row :gutter="20" style="margin-bottom:10px">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header" class="chart-header">
                        <span>近7天订单趋势</span>
                        <el-radio-group v-model="chartType" size="small">
                        </el-radio-group>
                    </div>
                    <div class="chart-wrapper">
                        <div ref="orderChart" style="height: 300px"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header" class="chart-header">
                        <span>快递公司配送占比</span>
                        <el-select v-model="timeRange" size="small" style="width: 120px">
                            <el-option label="本周" value="week"></el-option>
                            <el-option label="本月" value="month"></el-option>
                            <el-option label="本季度" value="quarter"></el-option>
                        </el-select>
                    </div>
                    <div class="chart-wrapper">
                        <div ref="expressChart" style="height: 300px"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row> -->
		
        <!-- 待办事项和系统公告 -->
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="card-loading" v-if="todoLoading">
                        <div class="logistics-loading">
                            <div class="logistics-point start"></div>
                            <div class="logistics-line"></div>
                            <div class="logistics-point middle"></div>
                            <div class="logistics-line"></div>
                            <div class="logistics-point end"></div>
                            <div class="logistics-truck">
                                <i class="el-icon-truck"></i>
                            </div>
                        </div>
                        <div class="loading-text">加载待办事项...</div>
                    </div>
                    <div slot="header" class="card-header">
                        <span>待处理事项</span>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="12" v-for="(item, index) in todoList" :key="index" style="margin-bottom: 20px">
                            <div class="todo-item-card" @click="handleTodo(item)">
                                <div class="todo-item-icon" :class="item.iconClass">
                                    <i :class="item.icon"></i>
                                </div>
                                <div class="todo-item-content">
                                    <div class="todo-item-title">{{ item.type }}</div>
                                    <div class="todo-item-count">
                                        <span class="count-num">{{ item.count }}</span>
                                        <span class="count-text">条待处理</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="card-loading" v-if="noticeLoading">
                        <div class="logistics-loading">
                            <div class="logistics-point start"></div>
                            <div class="logistics-line"></div>
                            <div class="logistics-point middle"></div>
                            <div class="logistics-line"></div>
                            <div class="logistics-point end"></div>
                            <div class="logistics-truck">
                                <i class="el-icon-truck"></i>
                            </div>
                        </div>
                        <div class="loading-text">加载公告...</div>
                    </div>
                    <div slot="header" class="card-header">
                        <span>系统公告</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="handleTodoNotice">发布公告</el-button>
                    </div>
                    <div class="notice-list">
                        <div v-for="(item, index) in notices" :key="index" class="notice-item">
                            <el-tag size="small" :type="item.type" class="notice-tag">{{ item.tag }}</el-tag>
                            <span class="notice-title">{{ item.title }}</span>
                            <span class="notice-time">{{ item.time }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { getDashboardData, getOrderTrend, getExpressDistribution, getTodoCount,getLatestNotices } from '@/api/Dashboard'
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todayOrders: 0,
            todayIncome: '0',
            monthlyUsers: 0,
            monthlyIncome: '0',
            differenceCount: 0,
            chartType: 'week',
            timeRange: 'week',
            todoList: [],
            notices: [],
            orderChart: null,
            expressChart: null,
            // 加载状态变量
            fullscreenLoading: true,
            overviewLoading: false,
            todoLoading: false,
            noticeLoading: false,
            chartLoading: false,
            loadingProgress: 0,
            loadingTimer: null
        }
    },
    created() {
        // 初始化时显示全屏加载
        this.fullscreenLoading = true
        this.startLoadingProgress()
        
        // 加载各部分数据
        Promise.all([
            this.getOverviewData(),
            this.getTodoData(),
            this.getNotices()
        ]).then(() => {
            // 所有数据加载完成后，关闭全屏加载
            this.loadingProgress = 100
            setTimeout(() => {
                this.fullscreenLoading = false
                clearInterval(this.loadingTimer)
            }, 600)
        }).catch(error => {
            console.error('Dashboard数据加载失败:', error)
            this.loadingProgress = 100
            setTimeout(() => {
                this.fullscreenLoading = false
                clearInterval(this.loadingTimer)
            }, 600)
            this.$message.error('数据加载失败，请刷新页面重试')
        })
    },
    beforeDestroy() {
        if (this.loadingTimer) {
            clearInterval(this.loadingTimer)
        }
    },
    mounted() {
        this.initCharts()
    },
    methods: {
        // 启动加载进度模拟
        startLoadingProgress() {
            this.loadingProgress = 0
            this.loadingTimer = setInterval(() => {
                if (this.loadingProgress < 90) {
                    this.loadingProgress += Math.floor(Math.random() * 10) + 1
                    if (this.loadingProgress > 90) {
                        this.loadingProgress = 90
                    }
                }
            }, 200)
        },
        
        // 获取概览数据
        async getOverviewData() {
            this.overviewLoading = true
            try {
                const res = await getDashboardData()
                if (res.code === 200) {
                    const data = res.data
                    this.todayOrders = data.todayOrders
                    this.todayIncome = this.formatMoney(data.todayIncome)
                    this.monthlyUsers = data.monthlyUsers
                    this.monthlyIncome = this.formatMoney(data.monthlyIncome)
                    
                    // 如果API中直接返回了differenceCount，则直接使用
                    if(data.difference !== undefined) {
                        this.differenceCount = data.difference
                    }
                }
            } catch (error) {
                console.error('获取概览数据失败:', error)
                this.$message.error('概览数据加载失败')
            } finally {
                setTimeout(() => {
                    this.overviewLoading = false
                }, 600)
            }
        },
        
        // 获取公告数据
		async getNotices() {
            this.noticeLoading = true
            try {
                const res = await getLatestNotices()
                if (res.code === 200) {
                    // 转换公告类型为对应的标签类型
                    this.notices = res.data.map(notice => ({
                        title: notice.title,
                        time: notice.createTime.substring(0, 10),  // 只显示日期部分
                        type: this.getNoticeTagType(notice.type),
                        tag: this.getNoticeTagText(notice.type)
                    }))
                }
            } catch (error) {
                console.error('获取系统公告失败:', error)
                this.$message.error('公告数据加载失败')
            } finally {
                this.noticeLoading = false
            }
        },
        
        // 获取待办事项数据
        async getTodoData() {
            this.todoLoading = true
            try {
                const res = await getTodoCount()
                if (res.code === 200) {
                    const data = res.data
                    // 更新代补差价订单数
                    if(data.difference !== undefined) {
                        this.differenceCount = data.difference
                    }
                    
                    this.todoList = [
                        { 
                            type: '未实名用户', 
                            count: data.realNameCount, 
                            tagType: 'warning', 
                            route: 'ordinaryUserManage',
                            iconClass: 'bg-warning',
                            icon: 'el-icon-user'
                        },
                        { 
                            type: '待处理发票', 
                            count: data.invoiceCount, 
                            tagType: 'danger', 
                            route: 'orderInvoiceRequestManage',
                            iconClass: 'bg-danger',
                            icon: 'el-icon-document'
                        },
                        { 
                            type: '待审核月结', 
                            count: data.monthlySettleCount, 
                            tagType: 'primary', 
                            route: 'monthlySettlementApplyManage',
                            iconClass: 'bg-primary',
                            icon: 'el-icon-money'
                        },
                        { 
                            type: '未完成订单', 
                            count: data.orderCount, 
                            tagType: 'info', 
                            route: 'orderManage',
                            iconClass: 'bg-info',
                            icon: 'el-icon-s-order'
                        },
                        // 如果需要添加代补差价订单到待办事项列表中，可以取消下面的注释
                        /*
                        { 
                            type: '待补差价数', 
                            count: data.difference, 
                            tagType: 'danger', 
                            route: 'orderDifferenceManage', // 假设这是处理代补差价订单的路由
                            iconClass: 'bg-danger',
                            icon: 'el-icon-wallet'
                        }
                        */
                    ]
                }
            } catch (error) {
                console.error('获取待办数据失败:', error)
                this.$message.error('待办事项加载失败')
            } finally {
                this.todoLoading = false
            }
        },
		// 获取公告标签类型
		        getNoticeTagType(type) {
		            const types = {
		                0: 'success',  // 更新公告
		                1: 'primary',  // 新增公告
		                2: 'warning',  // 通知公告
		                3: 'info'      // 维护公告
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
        // // 初始化图表
        // initCharts() {
        //     this.orderChart = echarts.init(this.$refs.orderChart)
        //     this.expressChart = echarts.init(this.$refs.expressChart)
        //     this.updateOrderChart()
        //     this.updateExpressChart()
            
        //     // 监听窗口大小变化
        //     window.addEventListener('resize', () => {
        //         this.orderChart.resize()
        //         this.expressChart.resize()
        //     })
        // },

        // 更新订单趋势图表
        async updateOrderChart() {
            try {
                const res = await getOrderTrend()
                if (res.code === 200) {
                    const data = res.data
                    const option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['订单数', '完成数']
                        },
                        xAxis: {
                            type: 'category',
                            data: data.dateList
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '订单数',
                                type: 'line',
                                data: data.orderCount,
                                smooth: true,
                                itemStyle: {
                                    color: '#409EFF'
                                }
                            },
                            {
                                name: '完成数',
                                type: 'line',
                                data: data.finishCount,
                                smooth: true,
                                itemStyle: {
                                    color: '#67C23A'
                                }
                            }
                        ]
                    }
                    this.orderChart.setOption(option)
                }
            } catch (error) {
                console.error('获取订单趋势数据失败:', error)
            }
        },

        // 更新快递公司分布图表
        async updateExpressChart() {
            try {
                const res = await getExpressDistribution(this.timeRange)
                if (res.code === 200) {
                    const option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: res.data.items.map(item => item.expressName)
                        },
                        series: [
                            {
                                name: '配送占比',
                                type: 'pie',
                                radius: '50%',
                                data: res.data.items.map(item => ({
                                    name: item.expressName,
                                    value: item.count
                                })),
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }
                    this.expressChart.setOption(option)
                }
            } catch (error) {
                console.error('获取快递分布数据失败:', error)
            }
        },

        // 格式化金额
        formatMoney(amount) {
            return amount.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        },
		handleTodoNotice(){
			 this.$router.push({ path: '/NoticeManage' })
		},
        // 处理待办事项点击
        handleTodo(item) {
            this.$router.push({ path: item.route })
        }
    },
    watch: {
        // 监听时间范围变化
        timeRange() {
            this.updateExpressChart()
        },
        // 监听图表类型变化
        chartType() {
            this.updateOrderChart()
        }
    }
}
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
    position: relative;
}

/* 快递主题的全屏加载动画 */
.delivery-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delivery-loading-container {
    text-align: center;
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 300px;
    position: relative;
}

.delivery-truck {
    position: relative;
    font-size: 40px;
    color: #409EFF;
    animation: truck-move 3s linear infinite;
    margin-bottom: 20px;
}

.delivery-truck i {
    display: inline-block;
    transform: scaleX(-1); /* 让卡车朝右 */
}

.truck-wheels {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
}

.wheel {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #409EFF;
    animation: rotate 1.5s linear infinite;
}

.delivery-route {
    height: 40px;
    position: relative;
    margin: 30px 0;
}

.route-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #409EFF, #67C23A);
}

.route-dot {
    position: absolute;
    top: calc(50% - 4px);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #409EFF;
}

.dot-1 {
    left: 20%;
    animation: dot-pulse 1.5s ease infinite;
}

.dot-2 {
    left: 50%;
    animation: dot-pulse 1.5s ease infinite;
    animation-delay: 0.3s;
}

.dot-3 {
    left: 80%;
    animation: dot-pulse 1.5s ease infinite;
    animation-delay: 0.6s;
}

.delivery-box {
    font-size: 30px;
    color: #E6A23C;
    margin: 15px 0;
    animation: box-bounce 1.5s ease infinite;
}

.loading-text {
    margin: 15px 0;
    font-size: 16px;
    color: #303133;
    font-weight: bold;
}

.loading-progress {
    height: 4px;
    background-color: #E5E9F2;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 10px;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(to right, #409EFF, #67C23A);
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* 卡片加载动画 */
.card-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}

.package-loading {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
}

.package-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: #E6A23C;
}

.package-scanner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(rgba(64, 158, 255, 0) 0%, rgba(64, 158, 255, 0.8) 50%, rgba(64, 158, 255, 0) 100%);
    animation: scan-rotate 1.5s linear infinite;
}

.logistics-loading {
    width: 200px;
    height: 60px;
    position: relative;
    margin-bottom: 15px;
}

.logistics-point {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.logistics-point.start {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #67C23A;
}

.logistics-point.middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #E6A23C;
}

.logistics-point.end {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #F56C6C;
}

.logistics-line {
    position: absolute;
    top: 50%;
    width: 40%;
    height: 2px;
    background: #DCDFE6;
}

.logistics-line:first-of-type {
    left: 5%;
}

.logistics-line:nth-of-type(2) {
    right: 5%;
}

.logistics-truck {
    position: absolute;
    left: 15%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #409EFF;
    animation: truck-delivery 3s ease-in-out infinite;
}

/* 动画定义 */
@keyframes truck-move {
    0% {
        transform: translateX(-30px);
    }
    50% {
        transform: translateX(30px);
    }
    100% {
        transform: translateX(-30px);
    }
}

@keyframes box-bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@keyframes dot-pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.7;
    }
    50% {
        transform: scale(1.5);
        opacity: 1;
    }
}

@keyframes scan-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes truck-delivery {
    0% {
        left: 5%;
    }
    50% {
        left: 45%;
    }
    100% {
        left: 85%;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.welcome-card {
    margin-bottom: 20px;
}

.welcome-info {
    display: flex;
    align-items: center;
}

.welcome-img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

.welcome-content h2 {
    margin: 0;
    font-size: 28px;
    color: #303133;
}

.welcome-content p {
    margin: 10px 0 0;
    font-size: 16px;
    color: #409EFF;
}

.data-card {
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.data-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.grid-content {
    display: flex;
    align-items: center;
}

.grid-cont-left {
    margin-right: 20px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 5px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
    background: #409EFF;
    border-radius: 8px;
}

.chart-wrapper {
    padding: 20px;
}

.notice-list {
    padding: 0 20px;
}

.notice-item {
    padding: 12px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EBEEF5;
}

.notice-item:last-child {
    border-bottom: none;
}

.notice-title {
    flex: 1;
    margin: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.notice-time {
    font-size: 12px;
    color: #909399;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.data-card.blue .grid-con-icon { background: #409EFF; }
.data-card.green .grid-con-icon { background: #67C23A; }
.data-card.orange .grid-con-icon { background: #E6A23C; }
.data-card.purple .grid-con-icon { background: #909399; }
.data-card.red .grid-con-icon { background: #F56C6C; }

.notice-tag {
    margin-right: 10px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-item-card {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.todo-item-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.todo-item-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #EBEEF5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.todo-item-content {
    flex: 1;
}

.todo-item-title {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 5px;
}

.todo-item-count {
    font-size: 14px;
    color: #909399;
}

.count-num {
    font-size: 18px;
    font-weight: bold;
    color: #303133;
}

.count-text {
    margin-left: 5px;
}
</style>

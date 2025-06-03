<template>
  <!-- 全屏加载动画 -->
  <div v-if="fullscreen" class="delivery-loading-mask">
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
      
      <div class="loading-text">{{ text || '数据加载中...' }}</div>
      <div v-if="showProgress" class="loading-progress">
        <div class="progress-bar" :style="{width: progress + '%'}"></div>
      </div>
    </div>
  </div>
  
  <!-- 非全屏加载动画 - 可放置在页面的任何容器内 -->
  <div v-else class="card-loading" :style="customStyle">
    <slot name="card">
      <!-- 默认卡片加载动画 -->
      <div class="package-loading">
        <i class="el-icon-box package-icon"></i>
        <div class="package-scanner"></div>
      </div>
      <div v-if="text" class="loading-text">{{ text }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'DeliveryLoading',
  props: {
    // 是否全屏显示
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 加载文本
    text: {
      type: String,
      default: ''
    },
    // 是否显示进度条 (仅全屏模式有效)
    showProgress: {
      type: Boolean,
      default: true
    },
    // 进度值 (0-100)
    progress: {
      type: Number,
      default: 0
    },
    // 自定义样式
    customStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
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

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 
/**
 * 加载动画混入
 * 为页面提供统一的加载状态管理
 */
export default {
  data() {
    return {
      // 全屏加载状态
      fullscreenLoading: false,
      // 各区域加载状态
      loadingStates: {},
      // 加载进度
      loadingProgress: 0,
      // 进度条定时器
      loadingTimer: null
    };
  },
  methods: {
    /**
     * 开始全屏加载
     */
    startFullscreenLoading() {
      this.fullscreenLoading = true;
      this.startLoadingProgress();
    },

    /**
     * 停止全屏加载
     */
    stopFullscreenLoading() {
      this.loadingProgress = 100;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.clearLoadingTimer();
      }, 600);
    },

    /**
     * 开始加载进度模拟
     */
    startLoadingProgress() {
      this.loadingProgress = 0;
      this.clearLoadingTimer();
      this.loadingTimer = setInterval(() => {
        if (this.loadingProgress < 90) {
          this.loadingProgress += Math.floor(Math.random() * 10) + 1;
          if (this.loadingProgress > 90) {
            this.loadingProgress = 90;
          }
        }
      }, 200);
    },

    /**
     * 清除加载定时器
     */
    clearLoadingTimer() {
      if (this.loadingTimer) {
        clearInterval(this.loadingTimer);
        this.loadingTimer = null;
      }
    },

    /**
     * 设置区域加载状态
     * @param {String} area - 区域名称
     * @param {Boolean} status - 加载状态
     * @param {Number} delay - 延迟关闭时间(ms)
     */
    setAreaLoading(area, status, delay = 600) {
      if (status) {
        this.$set(this.loadingStates, area, true);
      } else {
        // 延迟关闭加载状态，提供更流畅的视觉效果
        setTimeout(() => {
          this.$set(this.loadingStates, area, false);
        }, delay);
      }
    },

    /**
     * 加载API数据的通用方法
     * @param {Function} apiCall - API调用函数
     * @param {String} area - 加载区域标识
     * @param {Function} successCallback - 成功回调
     * @param {String} errorMessage - 错误消息
     */
    async loadDataWithLoading(apiCall, area, successCallback, errorMessage = '数据加载失败') {
      this.setAreaLoading(area, true);
      try {
        const res = await apiCall();
        if (res.code === 200) {
          if (successCallback) {
            successCallback(res.data);
          }
        } else {
          this.$message.error(res.message || errorMessage);
        }
      } catch (error) {
        console.error(`${errorMessage}:`, error);
        this.$message.error(errorMessage);
      } finally {
        this.setAreaLoading(area, false);
      }
    }
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    this.clearLoadingTimer();
  }
}; 
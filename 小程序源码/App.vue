<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/iconfont.css";

	/* 添加一些全局过渡效果 */
	page {
		background: #fff;
	}

	/* 统一动画过渡 */
	.animate-transition {
		transition: all 0.3s ease;
	}

	/* 添加 animate.css 核心动画类 */
	.animate__animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}

	.animate__fadeIn {
		animation-name: fadeIn;
	}

	.animate__fadeInDown {
		animation-name: fadeInDown;
	}

	.animate__fadeInUp {
		animation-name: fadeInUp;
	}

	.animate__delay-1s {
		animation-delay: 1s;
	}

	/* 动画关键帧 */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translate3d(0, -100%, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	/* 添加新的动画 */
	.animate__fadeInLeft {
		animation-name: fadeInLeft;
	}

	.animate__fadeInRight {
		animation-name: fadeInRight;
	}

	@keyframes fadeInLeft {
		from {
			opacity: 0;
			transform: translate3d(-100%, 0, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes fadeInRight {
		from {
			opacity: 0;
			transform: translate3d(100%, 0, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}
</style>

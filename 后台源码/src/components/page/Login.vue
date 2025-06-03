<template>
  <div class="login-wrap">
    <!-- 动态背景 -->
    <div class="animated-bg">
      <div class="bg-gradient"></div>
      <div class="bg-grid"></div>
      <div class="bg-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
    
    <!-- 装饰元素 -->
    <div class="floating-elements">
      <div class="floating-element fe-1"><i class="el-icon-truck"></i></div>
      <div class="floating-element fe-2"><i class="el-icon-position"></i></div>
      <div class="floating-element fe-3"><i class="el-icon-box"></i></div>
      <div class="floating-element fe-4"><i class="el-icon-time"></i></div>
      <div class="floating-element fe-5"><i class="el-icon-map-location"></i></div>
      <div class="floating-element fe-6"><i class="el-icon-guide"></i></div>
    </div>
    
    <!-- 登录主内容 -->
    <div class="login-container">
      <div class="login-box">
        <!-- 卡片特效 -->
        <div class="card-effects">
          <div class="card-shine"></div>
          <div class="card-glow"></div>
          <div class="card-reflection"></div>
        </div>
        
        <!-- 神州邮 Logo 区域 -->
        <div class="login-header">
          <div class="logo-wrapper">
            <!-- <div class="logo-backdrop"></div>
            <div class="logo-orbital ring-1"></div>
            <div class="logo-orbital ring-2"></div>
           -->
		   <div class="logo-container">
		     <img src="../../assets/img/logo.png" alt="神州邮" class="logo-img">
		     <div class="logo-shine"></div>
		   </div>
          </div>
          
          <div class="brand-text">
            <h1 class="company-name">神州邮</h1>
            <h2 class="system-name">后台管理系统</h2>
          </div>
        </div>
        
        <!-- 分隔线和标语 -->
        <div class="divider">
          <div class="divider-line"></div>
          <div class="divider-text">让寄件更简单，管理更高效</div>
          <div class="divider-line"></div>
        </div>
        
        <!-- 登录表单 -->
        <el-form :model="param" :rules="rules" ref="login" class="login-form">
          <el-form-item prop="username" class="form-item-username">
            <div class="input-icon"><i class="el-icon-user"></i></div>
            <el-input 
              v-model="param.username" 
              placeholder="请输入账号" 
              class="styled-input"
              prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>
          
          <el-form-item prop="password" class="form-item-password">
            <div class="input-icon"><i class="el-icon-lock"></i></div>
            <el-input
              type="password"
              v-model="param.password"
              placeholder="请输入密码"
              class="styled-input"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="submitForm()">
            </el-input>
          </el-form-item>
          
          <div class="login-actions">
            <el-button 
              type="primary" 
              class="login-button" 
              :loading="loading" 
              @click="submitForm()">
              <span class="btn-text">登录系统</span>
              <i class="el-icon-right"></i>
              <div class="btn-aura"></div>
            </el-button>
          </div>
        </el-form>
        
        <!-- 额外信息 -->
        <div class="login-info">
          <div class="info-item">
            <i class="el-icon-truck"></i>
            <span>全国范围，安全快捷</span>
          </div>
          <div class="info-item">
            <i class="el-icon-time"></i>
            <span>7×24小时服务支持</span>
          </div>
        </div>
      </div>
      
      <!-- 页脚版权信息 -->
      <div class="login-footer">
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">帮助中心</a>
        </div>
        <div class="copyright">© 2025 神州邮 版权所有</div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, getUserById} from '@/api/UserLogin.js';
import store from '@/store/index';
export default {
  data: function () {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      loading: false
    };
  },
  methods: {
    submitForm() {
      if (this.param.username == '' || this.param.password == '') {
        this.$message.error('请输入账号和密码');
        return
      }
      
      this.loading = true;
    
      login(this.param).then(res => {
        console.log(res)
        //登陆识别返回码
        if (res.code == 200) {
          if(res.data.userInfo.identity==1){
            this.$message({
              message: '当前账号没有足够权限',
              type: 'error'
            });
            this.loading = false;
            return
          }
          this.$message.success('登录成功');
          // 存储到 Vuex
          store.commit('setIdentity', res.data.userInfo.identity);
          // 存储到 localStorage
          localStorage.setItem('identity', res.data.userInfo.identity);
          localStorage.setItem('ms_username', res.data.userInfo.userName);
          localStorage.setItem('ms_userPhoto', res.data.userInfo.userPhoto);
          localStorage.setItem('ms_userId', res.data.userInfo.userId);
          localStorage.setItem('ms_token', res.data.token);
          this.$router.push('/dashboard');
          
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          });
          this.loading = false;
        }
      }).catch(() => {
        this.loading = false;
      })
    }
  }
};
</script>

<style scoped>
/* ===== 基础设置 ===== */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-10px, -15px); }
  50% { transform: translate(0, -25px); }
  75% { transform: translate(10px, -15px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes orbitRotate {
  0% { transform: rotateZ(0deg) rotateY(80deg); }
  100% { transform: rotateZ(360deg) rotateY(80deg); }
}

/* ===== 主容器样式 ===== */
.login-wrap {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans SC', sans-serif;
  background: #f9f9f9;
  perspective: 1000px;
}

/* ===== 动画背景 ===== */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    135deg, 
    #fff6e5, #ffebcc, #ffe0b3, #ffd699, 
    #ffcc80, #ffc266, #ffb84d, #ffad33, 
    #ffa31a, #ff9900, #e68a00, #cc7a00
  );
  background-size: 400% 400%;
  opacity: 0.4;
  animation: gradientFlow 15s ease infinite;
  transform: rotate(-15deg);
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 152, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 152, 0, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
}

.bg-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.circle-1 {
  top: 10%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #FF9800, transparent 70%);
  animation: pulse 8s infinite alternate-reverse;
}

.circle-2 {
  bottom: 5%;
  right: 5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #FF6D00, transparent 70%);
  animation: pulse 12s infinite alternate;
}

.circle-3 {
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #FFC107, transparent 70%);
  transform: translate(-50%, -50%);
  animation: pulse 15s infinite;
}

/* ===== 浮动元素 ===== */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 4px 20px rgba(255, 152, 0, 0.2),
    0 0 0 1px rgba(255, 152, 0, 0.1) inset;
  animation: float 15s infinite ease-in-out;
  backdrop-filter: blur(5px);
}

.floating-element i {
  font-size: 24px;
  color: #FF9800;
}

.fe-1 {
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.fe-2 {
  top: 25%;
  right: 10%;
  animation-delay: -2s;
}

.fe-3 {
  bottom: 15%;
  left: 10%;
  animation-delay: -4s;
}

.fe-4 {
  bottom: 30%;
  right: 15%;
  animation-delay: -6s;
}

.fe-5 {
  top: 50%;
  left: 5%;
  animation-delay: -8s;
}

.fe-6 {
  top: 60%;
  right: 5%;
  animation-delay: -10s;
}

/* ===== 登录容器 ===== */
.login-container {
  position: relative;
  z-index: 10;
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 1s ease-out;
}

.login-box {
  position: relative;
  width: 100%;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 152, 0, 0.1) inset;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
}

.login-box:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 152, 0, 0.2) inset;
}

/* ===== 卡片特效 ===== */
.card-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.card-shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.4) 45%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(45deg);
  transition: all 1s;
  opacity: 0;
}

.login-box:hover .card-shine {
  opacity: 1;
  animation: shimmer 2s forwards;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 152, 0, 0.05) 0%,
    rgba(255, 152, 0, 0) 70%
  );
  opacity: 0;
  transition: opacity 1s ease;
}

.login-box:hover .card-glow {
  opacity: 1;
}

.card-reflection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0)
  );
  transform: translateY(-100%);
  transition: transform 0.5s ease;
}

.login-box:hover .card-reflection {
  transform: translateY(0%);
}

/* ===== 登录头部 ===== */
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.logo-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 15px;
  perspective: 800px;
}

.logo-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFC107, #FF9800);
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 20px rgba(255, 152, 0, 0.3);
  z-index: -1;
}

.logo-orbital {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(255, 152, 0, 0.3);
  transform-style: preserve-3d;
}

.ring-1 {
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%) rotateY(80deg);
  animation: orbitRotate 20s linear infinite;
}

.ring-2 {
  width: 90px;
  height: 90px;
  transform: translate(-50%, -50%) rotateY(80deg);
  animation: orbitRotate 15s linear infinite reverse;
}

.logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.logo-img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  z-index: 3;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.login-box:hover .logo-img {
  transform: scale(1.05);
}

.logo-shine {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 90px;
  height: 90px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 2;
  opacity: 0.4;
  pointer-events: none;
}

.brand-text {
  text-align: center;
  margin-top: 15px;
}

.company-name {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #FF6D00;
  letter-spacing: 2px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
}

.system-name {
  margin: 8px 0 0;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  letter-spacing: 1px;
}

/* ===== 分隔线 ===== */
.divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 15px 0 25px;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 152, 0, 0.3), transparent);
}

.divider-text {
  padding: 0 15px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
}

/* ===== 登录表单 ===== */
.login-form {
  width: 100%;
  margin-top: 10px;
}

.form-item-username,
.form-item-password {
  position: relative;
  margin-bottom: 25px;
}

.input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(to right, #FF9800, #FF6D00);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  z-index: 2;
  box-shadow: 2px 0 8px rgba(255, 152, 0, 0.15);
}

.styled-input {
  width: 100%;
}

.styled-input >>> .el-input__inner {
  height: 48px;
  padding-left: 60px !important;
  border-color: rgba(255, 152, 0, 0.2);
  border-radius: 8px !important;
  transition: all 0.3s;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.styled-input >>> .el-input__inner:focus {
  border-color: #FF6D00;
  background-color: white;
  box-shadow: 0 3px 10px rgba(255, 152, 0, 0.1);
}

.styled-input >>> .el-input__prefix {
  display: none;
}

/* ===== 登录按钮 ===== */
.login-actions {
  margin-top: 30px;
}

.login-button {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(45deg, #FF9800, #FF6D00, #FF9800);
  background-size: 200% 200%;
  border: none;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: white;
  box-shadow: 
    0 5px 15px rgba(255, 152, 0, 0.3),
    0 0 0 1px rgba(255, 152, 0, 0.1) inset;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  animation: gradientFlow 8s ease infinite;
}

.login-button .btn-text {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.login-button i {
  position: relative;
  z-index: 2;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 10px 25px rgba(255, 152, 0, 0.4),
    0 0 0 1px rgba(255, 152, 0, 0.2) inset;
}

.login-button:hover .btn-text {
  transform: translateX(-5px);
}

.login-button:hover i {
  transform: translateX(5px);
}

.login-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(255, 152, 0, 0.3);
}

.btn-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 25px;
  z-index: 1;
}

.login-button:hover .btn-aura::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  animation: ripple 1s ease-out;
}

/* ===== 附加信息 ===== */
.login-info {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}

.info-item {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 13px;
  transition: all 0.3s ease;
}

.info-item:hover {
  color: #FF6D00;
  transform: translateY(-2px);
}

.info-item i {
  margin-right: 5px;
  font-size: 16px;
}

/* ===== 页脚 ===== */
.login-footer {
  margin-top: 25px;
  text-align: center;
}

.footer-links {
  margin-bottom: 10px;
}

.footer-link {
  display: inline-block;
  margin: 0 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #FF6D00;
  transform: translateY(-2px);
}

.copyright {
  color: #999;
  font-size: 12px;
}

/* ===== Element UI 覆盖 ===== */
.el-form-item__error {
  color: #F44336;
  font-size: 12px;
}

/* ===== 响应式调整 ===== */
@media (max-width: 600px) {
  .login-container {
    width: 90%;
  }
  
  .login-box {
    padding: 30px 25px;
  }
  
  .login-info {
    flex-direction: column;
    align-items: center;
  }
  
  .info-item + .info-item {
    margin-top: 10px;
  }
}

@media (max-height: 800px) {
  .logo-wrapper {
    transform: scale(0.9);
    margin-bottom: 10px;
  }
  
  .form-item-username,
  .form-item-password {
    margin-bottom: 20px;
  }
  
  .login-actions {
    margin-top: 20px;
  }
}
</style>
/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {Number} wait 延迟时间(ms)
 * @return {Function} 返回防抖处理后的函数
 */
export function debounce(func, wait) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 可以添加其他公共工具函数 
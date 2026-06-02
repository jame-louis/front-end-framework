---
question: 如何在Vue中实现防抖（debounce）？
answer: 使用clearTimeout取消上次定时器，setTimeout延迟执行，将timer保存在data中。
explanation: |
  ```javascript
  createApp({
      data() {
          return {
              searchKey: '',
              searchTimer: null  // 保存定时器ID
          }
      },
      watch: {
          searchKey(newVal) {
              // 1. 清除上次定时器
              if (this.searchTimer) {
                  clearTimeout(this.searchTimer);
              }
              // 2. 设置新的防抖定时器
              this.searchTimer = setTimeout(() => {
                  console.log('执行搜索:', newVal);
                  this.fetchResults(newVal);
              }, 500); // 500ms延迟
          }
      }
  }).mount('#app');
  ```

  **防抖原理**：
  - 用户输入后等待一段时间
  - 如果在这段时间内再次输入，取消上次的等待
  - 只有停止输入超过指定时间后才执行操作

  **应用场景**：搜索框输入、窗口resize、表单验证
module: Vue.js框架
tags: ["Vue.js", "watch", "防抖", "性能优化"]
relatedLectures: ["lecture11"]
draft: false
---

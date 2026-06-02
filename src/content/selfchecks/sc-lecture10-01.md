---
question: Vue 3中如何使用CDN方式创建应用？
answer: 引入Vue 3全局构建版本，解构createApp，创建应用实例并挂载到DOM元素。
explanation: |
  ```html
  <!-- 引入 Vue 3 -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

  <script>
      // 解构 createApp
      const { createApp } = Vue;

      // 创建应用实例
      createApp({
          data() {
              return {
                  message: 'Hello Vue 3!'
              }
          }
      }).mount('#app'); // 挂载到 #app 元素
  </script>
  ```

  **核心概念**：
  - `createApp()` - 创建应用实例
  - `.mount()` - 挂载到DOM元素
  - `data()` - 定义响应式数据（必须是函数返回对象）
  - `{{ }}` - Mustache插值语法
module: Vue.js框架
tags: ["Vue.js", "Vue3", "CDN"]
relatedLectures: ["lecture10"]
draft: false
---

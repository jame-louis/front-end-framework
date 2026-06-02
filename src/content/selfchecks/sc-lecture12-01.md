---
question: Vue中:class的对象语法如何使用？
answer: ":class=\"{ className: condition }\"，condition为true时添加该class，false时不添加。"
explanation: |
  ```html
  <!-- 基础用法 -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
      动态类名
  </div>

  <!-- 与静态class共存 -->
  <div class="static-class" :class="{ active: isActive }">
      <!-- 结果：class="static-class active" -->
  </div>

  <!-- 绑定多个class（计算属性返回对象） -->
  <div :class="classObject"></div>
  ```

  ```javascript
  data() {
      return {
          isActive: true,
          hasError: false
      }
  },
  computed: {
      classObject() {
          return {
              active: this.isActive,
              'text-danger': this.hasError,
              'text-success': !this.hasError
          }
      }
  }
  ```

  **注意**：类名含连字符（如text-danger）需加引号。
module: Vue.js框架
tags: ["Vue.js", "v-bind", "class", "样式绑定"]
relatedLectures: ["lecture12"]
draft: false
---

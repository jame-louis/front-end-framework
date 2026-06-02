---
question: computed和methods有什么区别？
answer: computed有缓存，依赖不变时直接返回缓存值；methods每次渲染都重新执行，无缓存。
explanation: |
  | 特性 | computed | methods |
  |------|----------|---------|
  | 调用方式 | 属性访问 `{{ subtotal }}` | 函数调用 `{{ getSubtotal() }}` |
  | 缓存 | ✅ 依赖不变则返回缓存 | ❌ 每次渲染都重新执行 |
  | 适用场景 | 根据数据派生结果 | 响应用户交互事件 |

  ```javascript
  computed: {
      // 有缓存，price或quantity变化时才重新计算
      subtotal() {
          console.log('computed 执行');
          return this.price * this.quantity;
      }
  },
  methods: {
      // 无缓存，每次渲染都执行
      getSubtotal() {
          console.log('method 执行');
          return this.price * this.quantity;
      }
  }
  ```

  **费曼解释**：计算属性像一个有记忆的计算器。输入相同的数字，直接返回之前算好的答案；只有数字变了，才会重新计算。
module: Vue.js框架
tags: ["Vue.js", "computed", "methods", "缓存"]
relatedLectures: ["lecture11"]
draft: false
---

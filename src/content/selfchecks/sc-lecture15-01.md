---
question: Pinia的核心概念有哪些？它们的作用是什么？
answer: Pinia核心概念有State（状态）、Getters（计算属性）、Actions（方法），分别用于存储数据、派生数据、执行操作。
explanation: |
  ```javascript
  import { defineStore } from 'pinia'

  export const useCounterStore = defineStore('counter', {
      // State - 存储响应式数据
      state: () => ({
          count: 0,
          name: '计数器'
      }),

      // Getters - 派生数据（类似computed）
      getters: {
          doubleCount: (state) => state.count * 2,
          fullName: (state) => `${state.name} - 当前值: ${state.count}`
      },

      // Actions - 执行操作（类似methods）
      actions: {
          increment() {
              this.count++
          },
          async fetchData() {
              const res = await fetch('/api/data')
              this.count = await res.json()
          }
      }
  })
  ```

  **在组件中使用**：
  ```javascript
  import { useCounterStore } from '@/stores/counter'

  export default {
      setup() {
          const counter = useCounterStore()
          return { counter }
      }
  }
  ```

  **对比Vuex**：Pinia语法更简洁，支持TypeScript，无需mutations。
module: Vue.js框架
tags: ["Vue.js", "Pinia", "状态管理", "Store"]
relatedLectures: ["lecture15"]
draft: false
---

---
question: watch和computed的适用场景有什么区别？
answer: computed用于派生新数据；watch用于监听数据变化执行副作用（如发送请求、操作DOM）。
explanation: |
  | 特性 | computed | watch |
  |------|----------|-------|
  | 用途 | 派生新数据 | 执行副作用 |
  | 返回值 | 必须返回一个值 | 不返回值 |
  | 缓存 | 有缓存 | 无缓存 |
  | 适用 | 购物车总价、列表过滤 | 搜索防抖、数据持久化 |

  ```javascript
  // computed - 派生数据
  computed: {
      fullName() {
          return this.firstName + ' ' + this.lastName;
      }
  }

  // watch - 执行副作用
  watch: {
      searchKey(newVal, oldVal) {
          // 发送搜索请求
          this.fetchResults(newVal);
          // 记录日志
          console.log(`从 "${oldVal}" 变为 "${newVal}"`);
      }
  }
  ```

  **watch选项**：
  - `deep: true` - 深度监听对象/数组内部变化
  - `immediate: true` - 初始化时立即执行
module: Vue.js框架
tags: ["Vue.js", "watch", "computed", "副作用"]
relatedLectures: ["lecture11"]
draft: false
---

---
question: v-for列表渲染时为什么要绑定:key？
answer: :key为每个节点提供唯一标识，帮助Vue高效更新虚拟DOM，维持组件状态。
explanation: |
  ```html
  <ul>
      <!-- 必须绑定唯一的key -->
      <li v-for="item in items" :key="item.id">
          {{ item.name }}
      </li>
  </ul>
  ```

  **key的作用**：
  1. **识别节点**：Vue通过key识别哪些元素改变了
  2. **复用元素**：相同key的元素会被复用，而非重新创建
  3. **维持状态**：表单输入等状态不会丢失

  **最佳实践**：
  - 使用数据的唯一ID作为key
  - 避免使用数组索引作为key（除非列表不会变化）
  - key必须是字符串或数字

  ```javascript
  data() {
      return {
          items: [
              { id: 1, name: '苹果' },
              { id: 2, name: '香蕉' },
              { id: 3, name: '橙子' }
          ]
      }
  }
  ```
module: Vue.js框架
tags: ["Vue.js", "v-for", "列表渲染", "key"]
relatedLectures: ["lecture10"]
draft: false
---

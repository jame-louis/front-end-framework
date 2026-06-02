---
question: Vue中如何绑定非字符串值到表单选项？
answer: 使用:value绑定动态值，配合v-model实现数字、对象等非字符串值的绑定。
explanation: |
  ```html
  <!-- 数字值 -->
  <input type="radio" v-model="score" :value="10"> 10分
  <input type="radio" v-model="score" :value="20"> 20分
  <!-- score为数字类型，不是字符串 -->

  <!-- 下拉框绑定数字 -->
  <select v-model="cityId">
      <option :value="1">北京</option>
      <option :value="2">上海</option>
  </select>

  <!-- 绑定对象值 -->
  <select v-model="selectedProduct">
      <option v-for="item in products" :key="item.id" :value="item">
          {{ item.name }}
      </option>
  </select>
  ```

  ```javascript
  data() {
      return {
          score: 10,  // 数字
          cityId: 1,  // 数字
          selectedProduct: null,  // 对象
          products: [
              { id: 1, name: 'iPhone', price: 5999 },
              { id: 2, name: 'iPad', price: 3999 }
          ]
      }
  }
  ```

  **关键点**：
  - 不用`:`时，`value="1"`是字符串
  - 用`:value="1"`才是数字1
module: Vue.js框架
tags: ["Vue.js", "v-model", "表单", "值绑定"]
relatedLectures: ["lecture12"]
draft: false
---

---
question: v-model的作用是什么？它的本质是什么？
answer: v-model实现表单双向数据绑定，本质是:value和@input的语法糖。
explanation: |
  ```html
  <!-- v-model 双向绑定 -->
  <input v-model="message" placeholder="输入内容">
  <p>你输入了：{{ message }}</p>

  <!-- 本质等价于 -->
  <input :value="message" @input="message = $event.target.value">
  ```

  **支持多种表单控件**：
  ```html
  <!-- 文本输入 -->
  <input v-model="text">
  <textarea v-model="description"></textarea>

  <!-- 复选框 -->
  <input type="checkbox" v-model="isAgreed">
  <input type="checkbox" v-model="hobbies" value="reading">

  <!-- 单选按钮 -->
  <input type="radio" v-model="gender" value="male">

  <!-- 下拉框 -->
  <select v-model="selected">
      <option value="a">选项A</option>
  </select>
  ```

  **修饰符**：
  - `.lazy` - 失去焦点后更新
  - `.number` - 转为数字类型
  - `.trim` - 去除首尾空格
module: Vue.js框架
tags: ["Vue.js", "v-model", "双向绑定", "表单"]
relatedLectures: ["lecture10"]
draft: false
---

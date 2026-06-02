---
question: v-bind和v-on的简写形式是什么？
answer: v-bind简写为:；v-on简写为@。
explanation: |
  ```html
  <!-- v-bind 绑定属性 -->
  <img v-bind:src="imageSrc" v-bind:alt="description">
  <!-- 简写 -->
  <img :src="imageSrc" :alt="description">

  <!-- v-on 绑定事件 -->
  <button v-on:click="increment">+1</button>
  <!-- 简写 -->
  <button @click="increment">+1</button>

  <!-- 动态参数 -->
  <a v-bind:[attrName]="url">链接</a>
  <a :[attrName]="url">链接</a>
  ```

  **常用事件修饰符**：
  - `@click.stop` - 阻止冒泡
  - `@submit.prevent` - 阻止默认提交
  - `@keyup.enter` - 回车键触发
module: Vue.js框架
tags: ["Vue.js", "v-bind", "v-on", "指令"]
relatedLectures: ["lecture10"]
draft: false
---

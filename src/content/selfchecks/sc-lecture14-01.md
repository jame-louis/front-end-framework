---
question: Vue Router的router-link和router-view的作用是什么？
answer: router-link用于导航链接（替代a标签）；router-view用于渲染匹配的路由组件。
explanation: |
  ```html
  <template>
      <div>
          <!-- 导航链接 -->
          <nav>
              <router-link to="/">首页</router-link>
              <router-link to="/about">关于</router-link>
              <router-link :to="{ name: 'user', params: { id: 123 } }">用户</router-link>
          </nav>

          <!-- 路由出口：匹配到的组件在这里渲染 -->
          <router-view></router-view>
      </div>
  </template>
  ```

  **router-link特性**：
  - 自动添加激活状态类（.router-link-active）
  - 自动处理点击事件（无需阻止默认行为）
  - 支持to属性（字符串或对象）

  **router-view**：
  - 渲染当前匹配的路由组件
  - 可以嵌套使用实现多级路由
  - 支持命名视图（多个同级router-view）

  **编程式导航**：
  ```javascript
  this.$router.push('/about');
  this.$router.replace('/home');
  this.$router.back();
  ```
module: Vue.js框架
tags: ["Vue.js", "Vue Router", "路由", "SPA"]
relatedLectures: ["lecture14"]
draft: false
---

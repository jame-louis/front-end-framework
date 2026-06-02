---
question: Vue Router如何定义动态路由和获取路由参数？
answer: 路径中使用:参数名定义动态路由；通过this.$route.params获取参数。
explanation: |
  **定义动态路由**：
  ```javascript
  const routes = [
      { path: '/user/:id', component: User },       // 动态参数
      { path: '/post/:category/:slug', component: Post }  // 多个参数
  ];
  ```

  **获取路由参数**：
  ```javascript
  // 在组件中
  created() {
      console.log(this.$route.params.id);       // 获取 :id
      console.log(this.$route.params.category); // 获取 :category
  }

  // 在模板中
  <template>
      <div>
          <h1>用户ID: {{ $route.params.id }}</h1>
      </div>
  </template>
  ```

  **查询参数**：
  ```javascript
  // URL: /search?q=vue
  console.log(this.$route.query.q);  // 'vue'
  ```

  **Props模式**：
  ```javascript
  { path: '/user/:id', component: User, props: true }
  // 路由参数会作为props传递给组件
  ```
module: Vue.js框架
tags: ["Vue.js", "Vue Router", "动态路由", "参数"]
relatedLectures: ["lecture14"]
draft: false
---

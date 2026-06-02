---
question: Vue组件中Props和$emit的作用是什么？
answer: Props用于父组件向子组件传递数据；$emit用于子组件向父组件发送事件。
explanation: |
  **Props - 父传子**：
  ```javascript
  // 子组件
  app.component('ProductCard', {
      props: ['title', 'price'],
      template: `
          <div class="card">
              <h3>{{ title }}</h3>
              <p>¥{{ price }}</p>
          </div>
      `
  });

  // 父组件使用
  <ProductCard title="Vue.js实战" :price="79" />
  ```

  **$emit - 子传父**：
  ```javascript
  // 子组件触发事件
  app.component('ProductCard', {
      props: ['title', 'price'],
      methods: {
          addToCart() {
              this.$emit('add-to-cart', {
                  title: this.title,
                  price: this.price
              });
          }
      }
  });

  // 父组件监听事件
  <ProductCard @add-to-cart="handleAdd" />
  ```

  **Props命名**：JavaScript用camelCase，HTML用kebab-case。
module: Vue.js框架
tags: ["Vue.js", "组件", "Props", "Events", "通信"]
relatedLectures: ["lecture13"]
draft: false
---

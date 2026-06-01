---
title: "服务器通信与状态管理"
lectureNumber: 15
week: 15
module: "Vue.js框架"
description: "axios请求、RESTful API、Pinia状态管理、跨域处理"
duration: "90分钟"
difficulty: "advanced"
prerequisites: ["lecture14"]
tags: ["Vue.js", "axios", "Pinia", "状态管理", "API"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture15
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 使用 axios 发起 GET、POST 请求并处理响应数据
- 使用 `Promise.all` 实现并发请求
- 理解状态管理的应用场景，区分本地状态与全局状态
- 使用 Pinia 创建 Store，定义 State、Getters 和 Actions
- 在组合 API（`setup`）中使用 Pinia Store
- 整合 axios 与 Pinia 完成完整的数据流

---

# 第一部分：axios 应用

## 1.1 安装与基本用法

axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。

### 工程化项目（npm）

```bash
npm install axios
```

```javascript
import axios from 'axios';

axios.get('https://api.example.com/books')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error.message);
    });
```

### CDN 快速体验

```html
<script src="https://unpkg.com/axios@1/dist/axios.min.js"></script>

<script>
    // axios 自动挂载到全局
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => console.log(res.data));
</script>
```

---

## 1.2 axios API

### GET 请求

```javascript
// 方式一：直接调用
axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        console.log('状态码:', response.status);   // 200
        console.log('数据:', response.data);       // 返回的数组
    });

// 方式二：带查询参数
axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
        userId: 1,   // 自动拼接为 ?userId=1
        _limit: 5    // 限制返回 5 条
    }
}).then(response => {
    console.log(response.data);
});
```

### POST 请求

```javascript
axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: '新图书',
    body: '图书描述内容',
    userId: 1
}).then(response => {
    console.log('创建成功:', response.data);
    // JSONPlaceholder 会返回新创建的对象，id 为 101
});
```

### 其他方法

```javascript
axios.put('/posts/1', { title: '更新的标题' });    // 全量更新
axios.patch('/posts/1', { title: '更新的标题' });  // 局部更新
axios.delete('/posts/1');                           // 删除
```

---

## 1.3 请求配置

axios 支持通过配置对象精细化控制请求：

```javascript
axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: { _limit: 5 },           // URL 查询参数
    headers: { 'X-Custom-Header': 'foobar' },  // 自定义请求头
    timeout: 5000                     // 超时时间（毫秒）
}).then(response => {
    console.log(response.data);
});
```

**常用配置项**：

| 配置项 | 说明 |
|--------|------|
| `method` | 请求方法：`get`、`post`、`put`、`delete` |
| `url` | 请求地址 |
| `params` | URL 查询参数（GET） |
| `data` | 请求体数据（POST/PUT） |
| `headers` | 自定义请求头 |
| `timeout` | 超时时间 |

---

## 1.4 并发请求

当需要同时发起多个独立请求时，使用 `Promise.all`：

```javascript
const request1 = axios.get('https://jsonplaceholder.typicode.com/posts/1');
const request2 = axios.get('https://jsonplaceholder.typicode.com/posts/2');
const request3 = axios.get('https://jsonplaceholder.typicode.com/posts/3');

Promise.all([request1, request2, request3])
    .then(([res1, res2, res3]) => {
        console.log('请求1:', res1.data.title);
        console.log('请求2:', res2.data.title);
        console.log('请求3:', res3.data.title);
    })
    .catch(error => {
        console.error('任一请求失败:', error);
    });
```

> **注意**：`Promise.all` 中任一请求失败，整个 Promise 会进入 `catch`。

---

# 第二部分：Pinia 状态管理

## 2.1 为什么需要状态管理？

当应用变大时，组件之间的状态共享会变得复杂：

- **Props 逐层传递**：深层嵌套时极其繁琐（Prop Drilling）
- **事件总线混乱**：难以追踪数据来源和变化路径
- **状态不一致**：多个组件各自维护副本，容易不同步

**状态管理的核心价值**：将共享状态抽取到全局 Store 中，任何组件都可以读取和修改，且变化可预测、可追踪。

---

## 2.2 Pinia 安装与创建 Store

Pinia 是 Vue 官方推荐的状态管理库，Vuex 的下一代替代品。

### 工程化项目（npm）

```bash
npm install pinia
```

```javascript
// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        totalCount: (state) => state.items.length
    },
    actions: {
        addItem(item) {
            this.items.push(item);
        }
    }
});
```

### CDN 快速体验

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/pinia@2/dist/pinia.iife.js"></script>

<script>
    const { createApp } = Vue;
    const { createPinia, defineStore } = Pinia;

    const useCartStore = defineStore('cart', {
        state: () => ({ items: [] }),
        getters: {
            totalCount: (state) => state.items.length
        },
        actions: {
            addItem(item) {
                this.items.push(item);
            }
        }
    });

    const app = createApp({});
    app.use(createPinia());  // 注册 Pinia
    app.mount('#app');
</script>
```

---

## 2.3 State、Getters、Actions

### State —— 存储数据

```javascript
defineStore('cart', {
    state: () => ({
        items: [],           // 购物车商品
        isLoading: false,    // 加载状态
        user: null           // 当前用户
    })
});
```

**读取 State**：

```javascript
const cart = useCartStore();

// 直接访问
console.log(cart.items);

// 在模板中使用
// {{ cart.items.length }}
```

### Getters —— 计算属性

```javascript
defineStore('cart', {
    state: () => ({ items: [] }),
    getters: {
        // 基础计算
        totalCount: (state) => state.items.length,

        // 依赖其他 getter
        totalPrice: (state) => {
            return state.items.reduce((sum, item) => sum + item.price, 0);
        },

        // 接收参数（返回函数）
        getItemById: (state) => {
            return (id) => state.items.find(item => item.id === id);
        }
    }
});
```

```javascript
const cart = useCartStore();

console.log(cart.totalCount);       // 直接访问
console.log(cart.totalPrice);       // 自动计算
console.log(cart.getItemById(1));   // 传参调用
```

### Actions —— 操作方法

Actions 用于修改状态或执行副作用（如异步请求）。

```javascript
defineStore('cart', {
    state: () => ({ items: [], isLoading: false }),
    actions: {
        // 同步操作
        addItem(item) {
            this.items.push(item);
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        },

        // 异步操作
        async loadItems() {
            this.isLoading = true;
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );
                this.items = response.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    price: Math.floor(Math.random() * 100) + 50
                }));
            } finally {
                this.isLoading = false;
            }
        }
    }
});
```

---

## 2.4 Pinia 与组合 API

在 `setup()` 或 `<script setup>` 中使用 Pinia Store：

```vue
<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();

// 使用 storeToRefs 解构保持响应性
const { items, totalCount } = storeToRefs(cart);

// 方法可以直接解构
const { addItem, removeItem } = cart;
</script>

<template>
    <div>
        <p>购物车 {{ totalCount }} 件</p>
        <div v-for="item in items" :key="item.id">
            {{ item.title }}
            <button @click="removeItem(item.id)">删除</button>
        </div>
    </div>
</template>
```

**为什么需要 `storeToRefs`**：

```javascript
// ❌ 直接解构会失去响应性
const { items, totalCount } = useCartStore();

// ✅ 使用 storeToRefs 保持响应性
const { items, totalCount } = storeToRefs(useCartStore());

// ✅ 方法可以直接解构（方法本身不需要响应性）
const { addItem } = useCartStore();
```

---

# 刻意练习

## 场景：图书商城数据交互与全局状态

实现从 API 获取图书、全局管理购物车、提交订单的完整流程。

---

### Level 1：axios 基础（模仿练习）

**目标**：使用 axios 完成基础请求，处理加载和错误状态。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 1 - axios 基础</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .post-card { border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .loading { color: #3498db; }
        .error { color: #e74c3c; }
        .btn { padding: 8px 16px; cursor: pointer; border: none; border-radius: 4px; background: #3498db; color: white; margin-right: 10px; }
        .form-group { margin: 15px 0; }
        input, textarea { padding: 8px; width: 100%; box-sizing: border-box; }
    </style>
</head>
<body>
    <div id="app">
        <h2>axios 基础练习</h2>

        <div class="form-group">
            <button class="btn" @click="fetchPosts">获取文章列表</button>
            <button class="btn" @click="fetchPost">获取单篇文章</button>
            <button class="btn" @click="createPost">创建文章</button>
        </div>

        <p v-if="loading" class="loading">加载中...</p>
        <p v-if="error" class="error">{{ error }}</p>

        <div v-for="post in posts" :key="post.id" class="post-card">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
        </div>

        <div v-if="singlePost" class="post-card">
            <h4>单篇文章：{{ singlePost.title }}</h4>
            <p>{{ singlePost.body }}</p>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/axios@1/dist/axios.min.js"></script>
    <script>
        const { createApp, ref } = Vue;

        createApp({
            setup() {
                const posts = ref([]);
                const singlePost = ref(null);
                const loading = ref(false);
                const error = ref('');

                // TODO 1: 实现 fetchPosts 方法
                // 使用 axios.get 请求 https://jsonplaceholder.typicode.com/posts?_limit=3
                // 成功后将 response.data 赋值给 posts
                // 使用 try-catch 处理错误，将错误信息赋值给 error
                // 始终设置 loading 状态
                async function fetchPosts() {
                    ____________
                }

                // TODO 2: 实现 fetchPost 方法
                // 请求 https://jsonplaceholder.typicode.com/posts/1
                // 赋值给 singlePost
                async function fetchPost() {
                    ____________
                }

                // TODO 3: 实现 createPost 方法
                // 使用 axios.post 向 https://jsonplaceholder.typicode.com/posts 发送数据
                // body: { title: '新文章', body: '内容', userId: 1 }
                // 创建成功后 alert('创建成功，ID: ' + response.data.id)
                async function createPost() {
                    ____________
                }

                return { posts, singlePost, loading, error, fetchPosts, fetchPost, createPost };
            }
        }).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
async function fetchPosts() {
    loading.value = true;
    error.value = '';
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
        posts.value = response.data;
        singlePost.value = null;
    } catch (err) {
        error.value = '获取列表失败: ' + err.message;
    } finally {
        loading.value = false;
    }
}

async function fetchPost() {
    loading.value = true;
    error.value = '';
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        singlePost.value = response.data;
        posts.value = [];
    } catch (err) {
        error.value = '获取详情失败: ' + err.message;
    } finally {
        loading.value = false;
    }
}

async function createPost() {
    loading.value = true;
    error.value = '';
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: '新文章',
            body: '这是使用 axios 创建的测试内容',
            userId: 1
        });
        alert('创建成功，ID: ' + response.data.id);
    } catch (err) {
        error.value = '创建失败: ' + err.message;
    } finally {
        loading.value = false;
    }
}
```

**关键点**：
- axios 返回的 Promise 可用 `async/await` 处理
- 始终使用 `try-catch-finally` 管理加载和错误状态
- JSONPlaceholder 的 POST 请求会返回新对象（id 固定为 101）
</details>

---

### Level 2：Pinia Store（变式练习）

**目标**：创建 Pinia Store 管理购物车状态，在多组件中共享。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - Pinia Store</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .panel { border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .book-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .cart-badge { background: #e74c3c; color: white; padding: 5px 10px; border-radius: 12px; font-size: 14px; }
        .btn { padding: 6px 12px; cursor: pointer; border: none; border-radius: 4px; background: #3498db; color: white; }
        .btn-danger { background: #e74c3c; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 4px; }
    </style>
</head>
<body>
    <div id="app">
        <h2>Pinia 购物车</h2>

        <!-- 商品列表 -->
        <div class="panel">
            <h3>图书列表</h3>
            <div class="book-item" v-for="book in books" :key="book.id">
                <span>{{ book.title }} - ¥{{ book.price }}</span>
                <button class="btn" @click="cart.addItem(book)">加入购物车</button>
            </div>
        </div>

        <!-- 购物车 -->
        <div class="panel">
            <h3>
                购物车
                <span class="cart-badge">{{ cart.totalCount }} 件</span>
            </h3>
            <div class="book-item" v-for="item in cart.items" :key="item.id">
                <span>{{ item.title }} - ¥{{ item.price }}</span>
                <button class="btn btn-danger" @click="cart.removeItem(item.id)">移除</button>
            </div>
            <div v-if="cart.items.length === 0" style="color: #999;">购物车为空</div>

            <div class="summary" v-if="cart.items.length > 0">
                <p>数量：{{ cart.totalCount }}</p>
                <p>总价：¥{{ cart.totalPrice }}</p>
            </div>
        </div>

        <!-- 另一个使用同一 Store 的组件 -->
        <MiniCart></MiniCart>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/pinia@2/dist/pinia.iife.js"></script>
    <script>
        const { createApp, ref } = Vue;
        const { createPinia, defineStore } = Pinia;

        // TODO 1: 使用 defineStore 创建 cart Store
        // state: items 数组
        // getters: totalCount（数量）, totalPrice（总价）
        // actions: addItem(item), removeItem(id), clearCart()
        const useCartStore = ____________;

        const MiniCart = {
            setup() {
                const cart = useCartStore();
                return { cart };
            },
            template: `
                <div class="panel" style="background: #e8f5e9;">
                    <h4>迷你购物车（另一个组件）</h4>
                    <p>共 {{ cart.totalCount }} 件，合计 ¥{{ cart.totalPrice }}</p>
                </div>
            `
        };

        createApp({
            components: { MiniCart },
            setup() {
                const books = ref([
                    { id: 1, title: 'Vue.js实战', price: 79 },
                    { id: 2, title: 'JavaScript高级程序设计', price: 99 },
                    { id: 3, title: '深入浅出Node.js', price: 68 }
                ]);

                const cart = useCartStore();

                return { books, cart };
            }
        }).use(createPinia()).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        totalCount: (state) => state.items.length,
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0)
    },
    actions: {
        addItem(item) {
            this.items.push(item);
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        },
        clearCart() {
            this.items = [];
        }
    }
});
```

**关键点**：
- `defineStore('唯一标识', { state, getters, actions })`
- State 必须是函数返回对象：`state: () => ({ ... })`
- Getters 中使用 `state` 参数访问当前状态
- Actions 中使用 `this` 直接访问和修改状态
- 同一 Store 在多个组件中使用时，状态自动同步
</details>

---

### Level 3：axios + Pinia 综合（综合挑战）

**目标**：整合 axios 与 Pinia，实现"API 加载 → Store 管理 → API 提交"的完整数据流。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - axios + Pinia 综合</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .panel { border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .book-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .btn { padding: 6px 12px; cursor: pointer; border: none; border-radius: 4px; background: #3498db; color: white; margin-right: 10px; }
        .btn-success { background: #27ae60; }
        .btn-danger { background: #e74c3c; }
        .loading { color: #3498db; }
        .error { color: #e74c3c; }
        .success { color: #27ae60; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 15px; }
    </style>
</head>
<body>
    <div id="app">
        <h2>图书商城</h2>

        <div class="panel">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>图书列表</h3>
                <button class="btn" @click="loadBooks" :disabled="bookStore.loading">
                    {{ bookStore.loading ? '加载中...' : '从 API 加载' }}
                </button>
            </div>

            <p v-if="bookStore.error" class="error">{{ bookStore.error }}</p>

            <div class="book-item" v-for="book in bookStore.books" :key="book.id">
                <span>{{ book.title }} - ¥{{ book.price }}</span>
                <button class="btn btn-success" @click="cart.addItem(book)">加入购物车</button>
            </div>

            <p v-if="bookStore.books.length === 0" style="color: #999;">点击按钮从 API 加载图书</p>
        </div>

        <div class="panel">
            <h3>购物车（{{ cart.totalCount }} 件）</h3>
            <div class="book-item" v-for="item in cart.items" :key="item.id">
                <span>{{ item.title }} - ¥{{ item.price }}</span>
                <button class="btn btn-danger" @click="cart.removeItem(item.id)">移除</button>
            </div>
            <p v-if="cart.items.length === 0" style="color: #999;">购物车为空</p>

            <div class="summary" v-if="cart.items.length > 0">
                <p>总价：¥{{ cart.totalPrice }}</p>
                <button class="btn btn-success" @click="submitOrder" :disabled="orderLoading">
                    {{ orderLoading ? '提交中...' : '提交订单' }}
                </button>
                <p v-if="orderSuccess" class="success">{{ orderSuccess }}</p>
                <p v-if="orderError" class="error">{{ orderError }}</p>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/axios@1/dist/axios.min.js"></script>
    <script src="https://unpkg.com/pinia@2/dist/pinia.iife.js"></script>
    <script>
        const { createApp, ref } = Vue;
        const { createPinia, defineStore } = Pinia;

        // TODO 1: 创建 bookStore
        // state: books 数组, loading 布尔值, error 字符串
        // actions: loadBooks() 使用 axios 从 https://jsonplaceholder.typicode.com/posts?_limit=5 获取数据
        //          将 post 映射为 { id, title: post.title.slice(0, 20), price: 50 + id * 10 }
        const useBookStore = ____________;

        // TODO 2: 创建 cartStore（同 Level 2，增加 submitOrder action）
        // actions: submitOrder() 使用 axios.post 向 https://jsonplaceholder.typicode.com/posts 发送
        //          { title: '订单', body: JSON.stringify(this.items), userId: 1 }
        //          返回响应数据的 id
        const useCartStore = ____________;

        createApp({
            setup() {
                const bookStore = useBookStore();
                const cart = useCartStore();

                const orderLoading = ref(false);
                const orderSuccess = ref('');
                const orderError = ref('');

                // TODO 3: 实现 submitOrder 方法
                // 调用 cart.submitOrder()，处理 loading / success / error
                async function submitOrder() {
                    ____________
                }

                return {
                    bookStore,
                    cart,
                    loadBooks: bookStore.loadBooks,
                    submitOrder,
                    orderLoading,
                    orderSuccess,
                    orderError
                };
            }
        }).use(createPinia()).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
const useBookStore = defineStore('books', {
    state: () => ({
        books: [],
        loading: false,
        error: ''
    }),
    actions: {
        async loadBooks() {
            this.loading = true;
            this.error = '';
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );
                this.books = response.data.map(post => ({
                    id: post.id,
                    title: post.title.slice(0, 20),
                    price: 50 + post.id * 10
                }));
            } catch (err) {
                this.error = '加载失败: ' + err.message;
            } finally {
                this.loading = false;
            }
        }
    }
});

const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        totalCount: (state) => state.items.length,
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0)
    },
    actions: {
        addItem(item) {
            this.items.push(item);
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        },
        async submitOrder() {
            const response = await axios.post(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    title: '订单',
                    body: JSON.stringify(this.items),
                    userId: 1
                }
            );
            this.items = [];
            return response.data.id;
        }
    }
});
```

```javascript
async function submitOrder() {
    orderLoading.value = true;
    orderSuccess.value = '';
    orderError.value = '';
    try {
        const orderId = await cart.submitOrder();
        orderSuccess.value = `订单提交成功！订单号: ${orderId}`;
    } catch (err) {
        orderError.value = '提交失败: ' + err.message;
    } finally {
        orderLoading.value = false;
    }
}
```

**关键点**：
- Store 的 Action 可以是异步的，内部使用 `async/await`
- 将 API 调用放在 Store 的 Action 中，组件只负责触发和展示
- 提交订单后清空购物车是合理的业务逻辑
- 组件层管理 UI 状态（loading、success、error），业务层管理数据状态
</details>

---

## 知识检查清单

完成本讲后，你应该能够：

- [ ] 使用 `axios.get` 发起 GET 请求并处理响应数据
- [ ] 使用 `axios.post` 发起 POST 请求并发送数据
- [ ] 使用 `Promise.all` 实现并发请求
- [ ] 理解状态管理解决的问题（Prop Drilling、状态不一致）
- [ ] 使用 `defineStore` 创建 Pinia Store
- [ ] 在 Store 中定义 `state`、`getters` 和 `actions`
- [ ] 在组件中使用 `useStore()` 访问 Store
- [ ] 理解为什么需要用 `storeToRefs` 解构状态
- [ ] 在 Store 的 Action 中发起异步请求
- [ ] 整合 axios 与 Pinia 完成组件 → Store → API 的完整数据流

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| axios 请求无响应 | 网络问题或 URL 错误 | 检查网络连接，确认 URL 可访问 |
| CORS 报错 | 浏览器跨域限制 | 开发环境使用代理，或使用支持 CORS 的 API |
| Pinia Store 状态不响应 | 直接解构了 state | 使用 `storeToRefs` 解构，或直接用 `store.xxx` |
| Store 数据在刷新后丢失 | Pinia 状态仅存于内存 | 需要持久化时结合 `localStorage` |
| Action 中 `this` 为 undefined | 使用了箭头函数 | Action 使用普通函数，通过 `this` 访问 state |
| `createPinia is not defined` | 未引入 Pinia 或引入顺序错误 | 确保 Pinia 脚本在 Vue 之后加载 |
| 并发请求一个失败全部失败 | `Promise.all` 的特性 | 使用 `Promise.allSettled` 获取每个请求的结果 |
| POST 请求返回 201 但数据不对 | 假 API 不真保存数据 | JSONPlaceholder 只模拟响应，不持久化 |

---
title: "Vue Router 应用"
lectureNumber: 14
week: 14
module: "Vue.js框架"
description: "前端路由原理、Vue Router配置、路由传参、导航守卫"
duration: "90分钟"
difficulty: "advanced"
prerequisites: ["lecture13"]
tags: ["Vue.js", "Vue Router", "前端路由", "SPA"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture14
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 解释前端路由的工作原理（hash 模式与 history 模式）
- 使用 `createRouter` 配置路由表，实现单页面应用的多视图切换
- 使用动态路由匹配参数（`:id`），并通过 `useRoute()` 读取路由信息
- 使用嵌套路由（`children`）构建层级页面结构
- 使用命名路由和编程式导航进行页面跳转
- 使用 Vue Router 的组合 API（`useRoute`、`useRouter`）
- 使用全局前置守卫 `beforeEach` 实现简单的权限控制

---

# 第一部分：路由认识

## 1.1 前端路由原理

传统多页面应用中，每次页面跳转都由浏览器向服务器发起请求，服务器返回完整的 HTML 页面。而单页面应用（SPA）只有一个 HTML 页面，页面切换由前端路由管理。

**前端路由的核心原理**：监听 URL 变化，根据 URL 匹配对应的组件渲染，不刷新整个页面。

Vue Router 提供两种路由模式：

| 模式 | 原理 | URL 示例 | 优点 | 缺点 |
|------|------|----------|------|------|
| **Hash** | 监听 `hashchange` 事件 | `/#/books/1` | 兼容性好，无需服务器配置 | URL 带 `#` 不够美观 |
| **History** | 使用 HTML5 History API | `/books/1` | URL 美观 | 需要服务器配置 fallback |

```javascript
// Hash 模式（本讲默认使用，无需服务器配合）
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...]
});

// History 模式（工程化项目推荐）
import { createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [...]
});
```

---

## 1.2 Vue Router 安装与基本配置

### 工程化项目（npm）

```bash
npm install vue-router@4
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Books from '../views/Books.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/books', component: Books }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);  // 注册路由
app.mount('#app');
```

```vue
<!-- src/App.vue -->
<template>
    <nav>
        <!-- 声明式导航 -->
        <router-link to="/">首页</router-link>
        <router-link to="/books">图书</router-link>
    </nav>
    <!-- 路由出口 -->
    <router-view></router-view>
</template>
```

### CDN 快速体验

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>

<script>
    const { createApp } = Vue;
    const { createRouter, createWebHashHistory } = VueRouter;

    const Home = { template: '<div>首页</div>' };
    const Books = { template: '<div>图书列表</div>' };

    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            { path: '/', component: Home },
            { path: '/books', component: Books }
        ]
    });

    const app = createApp({});
    app.use(router);
    app.mount('#app');
</script>
```

---

## 1.3 动态路由匹配

当需要匹配某一类 URL（如 `/books/1`、`/books/2`）时，使用动态段 `:参数名`。

```javascript
const routes = [
    // 动态路由
    { path: '/books/:id', component: BookDetail }
];
```

**在组件中获取参数**：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

// 访问动态参数
console.log(route.params.id);  // "1"（字符串类型）
</script>

<template>
    <div>
        <h2>图书详情</h2>
        <p>图书 ID：{{ $route.params.id }}</p>
    </div>
</template>
```

**Options API 等效写法**：

```javascript
export default {
    mounted() {
        console.log(this.$route.params.id);
    }
}
```

---

## 1.4 路由匹配语法

| 模式 | 匹配路径 | 提取参数 |
|------|---------|---------|
| `/books/:id` | `/books/1` | `{ id: '1' }` |
| `/books/:id?` | `/books` 或 `/books/1` | `{ id: undefined }` 或 `{ id: '1' }` |
| `/books/:id+` | `/books/1` 或 `/books/1/2` | `{ id: ['1'] }` 或 `{ id: ['1', '2'] }` |
| `/books/:id*` | `/books` 或 `/books/1/2` | `{ id: undefined }` 或 `{ id: ['1', '2'] }` |
| `/user-*` | `/user-admin`、`/user-123` | — |

---

# 第二部分：路由应用

## 2.1 嵌套路由

当页面存在多级布局时（如用户中心包含资料页和订单页），使用嵌套路由。

```javascript
const routes = [
    {
        path: '/user',
        component: UserLayout,  // 外层布局组件
        children: [
            // 渲染在 UserLayout 内部的 <router-view> 中
            { path: '', component: UserProfile },       // /user
            { path: 'orders', component: UserOrders },  // /user/orders
            { path: 'settings', component: UserSettings }  // /user/settings
        ]
    }
];
```

```vue
<!-- UserLayout.vue -->
<template>
    <div class="user-layout">
        <aside>
            <router-link to="/user">资料</router-link>
            <router-link to="/user/orders">订单</router-link>
        </aside>
        <main>
            <!-- 子路由渲染位置 -->
            <router-view></router-view>
        </main>
    </div>
</template>
```

---

## 2.2 命名路由

为路由命名后，可以通过名称跳转，避免硬编码路径。

```javascript
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/books', name: 'Books', component: Books },
    {
        path: '/books/:id',
        name: 'BookDetail',
        component: BookDetail
    }
];
```

**声明式导航**：

```html
<!-- 通过名称跳转 -->
<router-link :to="{ name: 'BookDetail', params: { id: 1 } }">
    查看图书 1
</router-link>

<!-- 带查询参数 -->
<router-link :to="{ name: 'Books', query: { page: 2, sort: 'price' } }">
    第二页
</router-link>
```

**编程式导航**：

```javascript
import { useRouter } from 'vue-router';

const router = useRouter();

// 字符串路径
router.push('/books');

// 对象形式（命名路由 + 参数）
router.push({ name: 'BookDetail', params: { id: 3 } });

// 带查询参数
router.push({ path: '/books', query: { search: 'vue' } });

// 替换当前历史记录（不留下浏览记录）
router.replace('/books');

// 前进/后退
router.go(-1);  // 后退一页
```

---

## 2.3 Vue Router 与组合 API

在 `<script setup>` 或 `setup()` 中，使用 `useRoute` 和 `useRouter` 访问路由信息。

```vue
<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 响应式路由参数
const bookId = ref(route.params.id);

// 监听参数变化（同一组件内切换路由时）
watch(() => route.params.id, (newId) => {
    bookId.value = newId;
    loadBookData(newId);
});

function goBack() {
    router.back();
}

function goToEdit() {
    router.push({ name: 'BookEdit', params: { id: bookId.value } });
}
</script>
```

**在 `setup()` 中使用**：

```javascript
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        return { route, router };
    }
}
```

---

## 2.4 路由守卫

路由守卫用于在导航触发前后执行逻辑，常见用途：权限校验、登录跳转、页面标题设置。

### 全局前置守卫

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
    // to: 即将进入的路由
    // from: 当前离开的路由

    const isLoggedIn = localStorage.getItem('token');

    // 访问需要登录的页面
    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'Login' });  // 重定向到登录页
    } else {
        next();  // 继续导航
    }
});
```

### 路由元信息

```javascript
const routes = [
    {
        path: '/user',
        component: UserLayout,
        meta: { requiresAuth: true },  // 自定义元信息
        children: [...]
    }
];
```

---

# 刻意练习

## 场景：图书商城多页面导航

实现一个包含首页、图书列表、图书详情、用户中心的单页面应用。

---

### Level 1：基础路由配置（模仿练习）

**目标**：配置基础路由表，实现页面切换。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 1 - 基础路由配置</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        nav { padding: 15px; background: #f5f5f5; margin-bottom: 20px; border-radius: 4px; }
        nav a { margin-right: 20px; text-decoration: none; color: #3498db; }
        nav a.router-link-active { font-weight: bold; color: #e74c3c; }
        .page { padding: 20px; border: 1px solid #ddd; border-radius: 4px; }
    </style>
</head>
<body>
    <div id="app">
        <!-- TODO 1: 使用 router-link 创建导航链接 -->
        <nav>
            ____________
        </nav>

        <!-- TODO 2: 使用 router-view 作为路由出口 -->
        ____________
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
    <script>
        const { createApp } = Vue;
        const { createRouter, createWebHashHistory } = VueRouter;

        // 定义页面组件
        const Home = { template: '<div class="page"><h2>首页</h2><p>欢迎来到图书商城！</p></div>' };
        const Books = { template: '<div class="page"><h2>图书列表</h2><p>这里有丰富的图书资源。</p></div>' };
        const About = { template: '<div class="page"><h2>关于我们</h2><p>图书商城致力于为读者提供优质图书。</p></div>' };

        // TODO 3: 配置路由表，包含 /、/books、/about 三个路由
        const routes = ____________;

        // TODO 4: 创建 router 实例，使用 createWebHashHistory
        const router = ____________;

        const app = createApp({});

        // TODO 5: 注册路由插件
        ____________;

        app.mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<nav>
    <router-link to="/">首页</router-link>
    <router-link to="/books">图书列表</router-link>
    <router-link to="/about">关于我们</router-link>
</nav>

<!-- TODO 2 -->
<router-view></router-view>
```

```javascript
// TODO 3
const routes = [
    { path: '/', component: Home },
    { path: '/books', component: Books },
    { path: '/about', component: About }
];

// TODO 4
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// TODO 5
app.use(router);
```

**关键点**：
- `createRouter` 创建路由实例，`routes` 数组定义路由映射
- `createWebHashHistory()` 使用 hash 模式，URL 形如 `/#/books`
- `router-link` 用于声明式导航，`router-view` 渲染匹配组件
- 必须通过 `app.use(router)` 将路由注册到 Vue 应用
</details>

---

### Level 2：动态路由与嵌套路由（变式练习）

**目标**：实现图书详情动态路由和用户中心嵌套路由。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - 动态路由与嵌套路由</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        nav { padding: 15px; background: #f5f5f5; margin-bottom: 20px; border-radius: 4px; }
        nav a { margin-right: 20px; text-decoration: none; color: #3498db; }
        nav a.router-link-active { font-weight: bold; color: #e74c3c; }
        .page { padding: 20px; border: 1px solid #ddd; border-radius: 4px; }
        .sidebar { width: 150px; float: left; padding: 15px; background: #f9f9f9; margin-right: 20px; }
        .sidebar a { display: block; padding: 8px 0; }
        .content { overflow: hidden; padding: 15px; }
        .book-card { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
        .btn { padding: 5px 10px; background: #3498db; color: white; text-decoration: none; border-radius: 3px; }
    </style>
</head>
<body>
    <div id="app">
        <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/books">图书</router-link>
            <router-link to="/user">用户中心</router-link>
        </nav>

        <router-view></router-view>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
    <script>
        const { createApp, ref, watch } = Vue;
        const { createRouter, createWebHashHistory, useRoute } = VueRouter;

        // 首页
        const Home = { template: '<div class="page"><h2>首页</h2></div>' };

        // 图书列表
        const Books = {
            template: `
                <div class="page">
                    <h2>图书列表</h2>
                    <div class="book-card" v-for="book in books" :key="book.id">
                        {{ book.title }} - ¥{{ book.price }}
                        <!-- TODO 1: 使用命名路由跳转到图书详情，传入 params: { id: book.id } -->
                        <router-link :to="__________" class="btn">查看详情</router-link>
                    </div>
                </div>
            `,
            data() {
                return {
                    books: [
                        { id: 1, title: 'Vue.js实战', price: 79 },
                        { id: 2, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 3, title: '深入浅出Node.js', price: 68 }
                    ]
                };
            }
        };

        // 图书详情（动态路由）
        const BookDetail = {
            // TODO 2: 使用 Composition API 的 setup() 获取路由参数
            setup() {
                ____________

                return { route, bookId };
            },
            template: `
                <div class="page">
                    <h2>图书详情</h2>
                    <p>图书 ID：{{ bookId }}</p>
                    <p>路径参数：{{ route.params }}</p>
                </div>
            `
        };

        // 用户中心布局
        const UserLayout = {
            template: `
                <div class="page">
                    <div class="sidebar">
                        <router-link to="/user">个人资料</router-link>
                        <router-link to="/user/orders">我的订单</router-link>
                    </div>
                    <div class="content">
                        <!-- TODO 3: 嵌套路由出口 -->
                        ____________
                    </div>
                </div>
            `
        };

        const UserProfile = { template: '<div><h3>个人资料</h3></div>' };
        const UserOrders = { template: '<div><h3>我的订单</h3></div>' };

        // TODO 4: 配置路由表
        // 要求：
        // 1. /books/:id 动态路由，name 为 'BookDetail'
        // 2. /user 嵌套路由，children 包含 ''（默认）和 'orders'
        const routes = ____________;

        const router = createRouter({
            history: createWebHashHistory(),
            routes
        });

        createApp({}).use(router).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<router-link :to="{ name: 'BookDetail', params: { id: book.id } }" class="btn">查看详情</router-link>
```

```javascript
// TODO 2
setup() {
    const route = useRoute();
    const bookId = ref(route.params.id);

    watch(() => route.params.id, (newId) => {
        bookId.value = newId;
    });

    return { route, bookId };
}

// TODO 3
<router-view></router-view>

// TODO 4
const routes = [
    { path: '/', component: Home },
    { path: '/books', component: Books },
    { path: '/books/:id', name: 'BookDetail', component: BookDetail },
    {
        path: '/user',
        component: UserLayout,
        children: [
            { path: '', component: UserProfile },
            { path: 'orders', component: UserOrders }
        ]
    }
];
```

**关键点**：
- 动态路由使用 `:参数名` 定义，通过 `useRoute().params` 读取
- 嵌套路由的 `children` 路径不要以 `/` 开头（`orders` 而非 `/orders`）
- 同一组件内路由参数变化时，需用 `watch` 监听 `route.params`
- `setup()` 是 Vue 3 Composition API 的入口函数
</details>

---

### Level 3：导航守卫与综合应用（综合挑战）

**目标**：实现登录状态校验、编程式导航和完整的图书商城路由系统。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - 导航守卫与综合应用</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        nav { padding: 15px; background: #f5f5f5; margin-bottom: 20px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
        nav a { margin-right: 20px; text-decoration: none; color: #3498db; }
        nav a.router-link-active { font-weight: bold; color: #e74c3c; }
        .page { padding: 20px; border: 1px solid #ddd; border-radius: 4px; }
        .sidebar { width: 150px; float: left; padding: 15px; background: #f9f9f9; margin-right: 20px; }
        .sidebar a { display: block; padding: 8px 0; }
        .content { overflow: hidden; padding: 15px; }
        .btn { padding: 6px 12px; cursor: pointer; border: none; border-radius: 4px; background: #3498db; color: white; }
        .btn-success { background: #27ae60; }
        .alert { padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div id="app">
        <nav>
            <div>
                <router-link to="/">首页</router-link>
                <router-link to="/books">图书</router-link>
                <router-link to="/user">用户中心</router-link>
            </div>
            <div>
                <span v-if="isLoggedIn">已登录</span>
                <button v-else class="btn btn-success" @click="login">模拟登录</button>
            </div>
        </nav>

        <router-view></router-view>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
    <script>
        const { createApp, ref } = Vue;
        const { createRouter, createWebHashHistory, useRoute, useRouter } = VueRouter;

        const Home = { template: '<div class="page"><h2>首页</h2><p>欢迎来到图书商城</p></div>' };

        const Books = {
            setup() {
                const books = ref([
                    { id: 1, title: 'Vue.js实战', price: 79 },
                    { id: 2, title: 'JavaScript高级程序设计', price: 99 },
                    { id: 3, title: '深入浅出Node.js', price: 68 }
                ]);
                return { books };
            },
            template: `
                <div class="page">
                    <h2>图书列表</h2>
                    <div v-for="book in books" :key="book.id" style="padding: 10px; border-bottom: 1px solid #eee;">
                        {{ book.title }} - ¥{{ book.price }}
                        <router-link :to="{ name: 'BookDetail', params: { id: book.id } }" style="margin-left: 10px;">详情</router-link>
                    </div>
                </div>
            `
        };

        const BookDetail = {
            setup() {
                const route = useRoute();
                const router = useRouter();
                const bookId = ref(route.params.id);

                function goBack() {
                    router.back();
                }

                return { route, bookId, goBack };
            },
            template: `
                <div class="page">
                    <h2>图书详情</h2>
                    <p>图书 ID：{{ bookId }}</p>
                    <button class="btn" @click="goBack">返回</button>
                </div>
            `
        };

        const UserLayout = {
            template: `
                <div class="page">
                    <div class="sidebar">
                        <router-link to="/user">个人资料</router-link>
                        <router-link to="/user/orders">我的订单</router-link>
                    </div>
                    <div class="content">
                        <router-view></router-view>
                    </div>
                </div>
            `
        };

        const UserProfile = { template: '<div><h3>个人资料</h3></div>' };
        const UserOrders = { template: '<div><h3>我的订单</h3><p>暂无订单</p></div>' };

        const Login = {
            template: `
                <div class="page">
                    <h2>请登录</h2>
                    <p class="alert">访问用户中心需要先登录</p>
                </div>
            `
        };

        const routes = [
            { path: '/', component: Home },
            { path: '/books', component: Books },
            { path: '/books/:id', name: 'BookDetail', component: BookDetail },
            {
                path: '/user',
                component: UserLayout,
                meta: { requiresAuth: true },
                children: [
                    { path: '', component: UserProfile },
                    { path: 'orders', component: UserOrders }
                ]
            },
            { path: '/login', component: Login }
        ];

        const router = createRouter({
            history: createWebHashHistory(),
            routes
        });

        // TODO 1: 添加全局前置守卫 beforeEach
        // 要求：若目标路由 meta.requiresAuth 为 true 且未登录（localStorage 无 token），则跳转到 /login
        ____________

        createApp({
            setup() {
                const isLoggedIn = ref(!!localStorage.getItem('token'));

                function login() {
                    localStorage.setItem('token', 'demo-token');
                    isLoggedIn.value = true;
                }

                return { isLoggedIn, login };
            }
        }).use(router).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
// TODO 1
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});
```

**关键点**：
- `router.beforeEach` 注册全局前置守卫，每次路由切换前执行
- `to.meta` 访问路由元信息，用于标记需要权限的页面
- `next('/login')` 重定向，`next()` 放行
- 实际项目中应结合后端校验 token 有效性
</details>

---

## 知识检查清单

完成本讲后，你应该能够：

- [ ] 解释 hash 模式和 history 模式的区别及适用场景
- [ ] 使用 `createRouter` 和 `createWebHashHistory` 创建路由实例
- [ ] 使用 `app.use(router)` 注册路由插件
- [ ] 使用 `<router-link>` 实现声明式导航
- [ ] 使用 `<router-view>` 渲染匹配的路由组件
- [ ] 使用 `:id` 定义动态路由，并通过 `useRoute().params` 读取参数
- [ ] 使用 `children` 配置嵌套路由
- [ ] 使用 `name` 定义命名路由，并通过对象形式跳转
- [ ] 使用 `useRouter()` 进行编程式导航（`push`、`replace`、`back`）
- [ ] 在 `setup()` 中使用 `useRoute` 和 `useRouter`
- [ ] 使用 `router.beforeEach` 实现全局路由守卫
- [ ] 使用 `meta` 配置路由元信息

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| 页面空白，路由不生效 | 未调用 `app.use(router)` | 在 `mount` 前注册路由插件 |
| `useRoute` 返回 undefined | 在路由注册前调用 | 确保组件在 `<router-view>` 内渲染 |
| 嵌套路由不显示 | `children` 路径以 `/` 开头 | 嵌套路径不要加 `/`，如 `orders` |
| 动态参数变化组件不更新 | Vue 复用了同一组件实例 | 使用 `watch(() => route.params.id, ...)` 监听 |
| 刷新 404 | history 模式需要服务器配置 | 开发环境使用 hash 模式，或配置服务器 fallback |
| 路由守卫无限循环 | `next()` 调用逻辑有误 | 确保所有分支都有且只有一次 `next()` 调用 |
| `router-link` 不显示激活状态 | 未使用 `router-link-active` | Vue Router 自动添加该类，确保 CSS 正确 |

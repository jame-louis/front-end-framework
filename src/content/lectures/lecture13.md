---
title: "组件应用"
lectureNumber: 13
week: 13
module: "Vue.js框架"
description: "组件注册、Props传递、事件通信、插槽使用"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture12"]
tags: ["Vue.js", "组件", "Props", "Events", "Slots"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture13
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 使用全局注册和局部注册创建可复用组件
- 使用 Props 向子组件传递数据，理解单向数据流
- 使用 `$emit` 从子组件向父组件发送事件
- 使用 `<component :is>` 实现动态组件切换
- 了解异步组件的概念与基本实现方式
- 掌握常用生命周期钩子（`created`、`mounted`、`updated`、`unmounted`）

---

# 第一部分：组件应用方法

## 1.1 全局注册

全局注册的组件可以在任意地方使用，无需重复导入。

```javascript
const app = createApp({ /* ... */ });

// 全局注册 CartBadge 组件
app.component('CartBadge', {
    props: ['count'],
    template: `
        <span class="badge">
            购物车 {{ count }} 件
        </span>
    `
});

app.mount('#app');
```

```html
<!-- 在任意模板中使用 -->
<CartBadge :count="5"></CartBadge>
```

**适用场景**：通用基础组件（按钮、徽章、图标）需要在多个页面复用。

---

## 1.2 局部注册

局部注册的组件仅在当前组件内可用，避免命名冲突。

```javascript
import ProductCard from './ProductCard.js';

createApp({
    components: {
        // 局部注册
        ProductCard
    },
    data() {
        return { products: [/* ... */] }
    },
    template: `
        <ProductCard
            v-for="item in products"
            :key="item.id"
            :product="item"
        />
    `
}).mount('#app');
```

**适用场景**：页面专用组件，不需要在其他地方复用。

---

## 1.3 Props — 父组件向子组件传递数据

Props 是组件的自定义属性，用于接收父组件传入的数据。

```javascript
app.component('ProductCard', {
    // 声明接收的 props
    props: ['title', 'price', 'image'],
    template: `
        <div class="card">
            <img :src="image" :alt="title">
            <h3>{{ title }}</h3>
            <p>¥{{ price }}</p>
        </div>
    `
});
```

```html
<!-- 父组件传入数据 -->
<ProductCard
    title="Vue.js实战"
    :price="79"
    image="./vue.jpg"
/>
```

**Props 命名规范**：
- JavaScript 中使用 camelCase：`productTitle`
- HTML 模板中使用 kebab-case：`:product-title="..."`

### Props 验证（推荐做法）

```javascript
app.component('ProductCard', {
    props: {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        tags: {
            type: Array,
            default: () => []
        }
    }
});
```

---

## 1.4 $emit — 子组件向父组件发送事件

子组件通过 `$emit` 触发自定义事件，父组件监听该事件并处理。

```javascript
app.component('ProductCard', {
    props: ['title', 'price'],
    template: `
        <div class="card">
            <h3>{{ title }}</h3>
            <p>¥{{ price }}</p>
            <button @click="addToCart">加入购物车</button>
        </div>
    `,
    methods: {
        addToCart() {
            // 触发 add-to-cart 事件，并传递商品信息
            this.$emit('add-to-cart', {
                title: this.title,
                price: this.price
            });
        }
    }
});
```

```html
<!-- 父组件监听事件 -->
<ProductCard
    v-for="item in products"
    :key="item.id"
    :title="item.title"
    :price="item.price"
    @add-to-cart="handleAdd"
/>
```

```javascript
methods: {
    handleAdd(product) {
        console.log('收到商品：', product.title);
        this.cart.push(product);
    }
}
```

---

## 1.5 组件中的指令使用

组件内部可以像普通模板一样使用所有 Vue 指令。

```javascript
app.component('SearchBox', {
    data() {
        return { keyword: '' }
    },
    template: `
        <div>
            <input v-model="keyword" v-focus placeholder="搜索...">
            <p v-if="keyword">正在搜索：{{ keyword }}</p>
        </div>
    `,
    directives: {
        focus: {
            mounted(el) { el.focus(); }
        }
    }
});
```

---

# 第二部分：组件分类

## 2.1 动态组件

使用 `<component :is="...">` 在同一挂载点动态切换多个组件。

```html
<div id="app">
    <!-- 切换按钮 -->
    <button @click="currentTab = 'ProductList'">商品列表</button>
    <button @click="currentTab = 'OrderList'">订单列表</button>

    <!-- 动态组件 -->
    <component :is="currentTab"></component>
</div>
```

```javascript
const app = createApp({
    data() {
        return {
            currentTab: 'ProductList'
        }
    }
});

app.component('ProductList', {
    template: '<div><h3>商品列表</h3></div>'
});

app.component('OrderList', {
    template: '<div><h3>订单列表</h3></div>'
});

app.mount('#app');
```

---

## 2.2 异步组件

异步组件在需要时才加载，配合代码分割减少初始加载时间。

```javascript
const { defineAsyncComponent } = Vue;

// 方式一：基础用法
const AsyncModal = defineAsyncComponent(() =>
    import('./Modal.vue')
);

// 方式二：带加载状态（Options API 中常用）
const AsyncChart = defineAsyncComponent({
    loader: () => new Promise((resolve) => {
        // 模拟网络延迟
        setTimeout(() => {
            resolve({
                template: '<div class="chart">图表加载完成</div>'
            });
        }, 2000);
    }),
    loadingComponent: {
        template: '<div>加载中...</div>'
    },
    delay: 200
});
```

> 异步组件在大型项目中配合构建工具（Vite/Webpack）的代码分割功能效果显著。本课程了解概念即可。

---

## 2.3 组件生命周期

每个 Vue 组件从创建到销毁会经历一系列生命周期阶段，开发者可以在特定阶段执行代码。

```
<创建> → <挂载> → <更新> → <卸载>
```

| 钩子 | 触发时机 | 典型用途 |
|------|---------|---------|
| `created` | 组件实例创建完成，数据已初始化，但 DOM 未生成 | 发起 API 请求、初始化数据 |
| `mounted` | 组件挂载到 DOM 完成 | 操作 DOM、绑定第三方库、启动定时器 |
| `updated` | 响应式数据变化，DOM 重新渲染后 | 响应数据变化后的 DOM 操作（避免无限循环） |
| `unmounted` | 组件从 DOM 中移除 | 清理定时器、取消网络请求、解绑事件 |

```javascript
createApp({
    data() {
        return { count: 0, timer: null }
    },
    created() {
        console.log('组件已创建');
        // 可在此发起数据请求
    },
    mounted() {
        console.log('DOM 已挂载');
        // 启动定时器
        this.timer = setInterval(() => {
            this.count++;
        }, 1000);
    },
    updated() {
        console.log('数据已更新，DOM 已重新渲染');
    },
    unmounted() {
        console.log('组件即将卸载');
        // 必须清理副作用
        clearInterval(this.timer);
    }
});
```

**生命周期完整图示**：

```
      创建阶段                挂载阶段
    ┌──────────┐          ┌──────────┐
    │  created │ ───────> │ beforeMount
    └──────────┘          └──────────┘
                               │
                               ▼
                          ┌──────────┐
                          │  mounted │ <── DOM 可操作
                          └──────────┘
                               │
      更新阶段                 │
    ┌──────────┐          ┌──────────┐
    │beforeUpdate│<───── │ 数据变化  │
    └──────────┘          └──────────┘
         │                     │
         ▼                     │
    ┌──────────┐               │
    │ updated  │ ──────────────┘
    └──────────┘
         │
      卸载阶段
    ┌──────────┐
    │beforeUnmount
    └──────────┘
         │
         ▼
    ┌──────────┐
    │unmounted │ <── 清理副作用
    └──────────┘
```

---

# 刻意练习

## 场景：电商后台商品管理面板

实现一个包含商品卡片、购物车徽标、Tab 切换和模态框的后台管理界面。

---

### Level 1：组件注册与通信（模仿练习）

**目标**：注册全局和局部组件，正确传递 Props 和监听自定义事件。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 1 - 组件注册与通信</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
        .badge { background: #e74c3c; color: white; padding: 5px 10px; border-radius: 12px; font-size: 14px; }
        .btn { padding: 6px 12px; cursor: pointer; border: none; border-radius: 4px; }
        .btn-primary { background: #3498db; color: white; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div id="app">
        <!-- TODO 1: 使用 CartBadge 全局组件，传入 cartCount -->
        <div class="header">
            <h2>商品管理</h2>
            ____________
        </div>

        <!-- TODO 2: 使用 ProductCard 局部组件，传入 product 对象 -->
        <!-- 并监听 @add-to-cart 事件，调用 handleAdd 方法 -->
        <div v-for="item in products" :key="item.id">
            ____________
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        const app = createApp({
            components: {
                // TODO 3: 局部注册 ProductCard 组件
                // ProductCard 接收 props: ['product']，模板显示 title 和 price，按钮触发 add-to-cart 事件
                ____________
            },
            data() {
                return {
                    products: [
                        { id: 1, title: 'Vue.js实战', price: 79 },
                        { id: 2, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 3, title: '深入浅出Node.js', price: 68 }
                    ],
                    cart: []
                }
            },
            computed: {
                cartCount() {
                    return this.cart.length;
                }
            },
            methods: {
                handleAdd(product) {
                    this.cart.push(product);
                    console.log('加入购物车：', product.title);
                }
            }
        });

        // TODO 4: 全局注册 CartBadge 组件
        // 接收 props: ['count']，模板显示 "购物车 X 件"
        ____________

        app.mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<CartBadge :count="cartCount"></CartBadge>

<!-- TODO 2 -->
<ProductCard :product="item" @add-to-cart="handleAdd"></ProductCard>
```

```javascript
// TODO 3: 局部注册
components: {
    ProductCard: {
        props: ['product'],
        template: `
            <div class="card">
                <span>{{ product.title }} - ¥{{ product.price }}</span>
                <button class="btn btn-primary" @click="$emit('add-to-cart', product)">加入购物车</button>
            </div>
        `
    }
}

// TODO 4: 全局注册
app.component('CartBadge', {
    props: ['count'],
    template: `<span class="badge">购物车 {{ count }} 件</span>
    `
});
```

**关键点**：
- 全局注册：`app.component('组件名', { ... })`
- 局部注册：在父组件的 `components` 选项中声明
- Props 传对象时直接绑定 `:product="item"`，子组件通过 `props: ['product']` 接收
- 子组件通过 `this.$emit('事件名', 参数)` 向父组件通信
</details>

---

### Level 2：动态组件与生命周期（变式练习）

**目标**：实现 Tab 面板切换，观察组件挂载与卸载。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - 动态组件与生命周期</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .tab-btn { padding: 10px 20px; margin-right: 10px; border: 1px solid #ddd; background: white; cursor: pointer; }
        .tab-btn.active { background: #3498db; color: white; border-color: #3498db; }
        .tab-content { border: 1px solid #ddd; padding: 20px; margin-top: 10px; min-height: 150px; }
        .log { background: #f5f5f5; padding: 10px; margin-top: 20px; font-family: monospace; font-size: 14px; }
        .log-item { padding: 3px 0; border-bottom: 1px solid #eee; }
    </style>
</head>
<body>
    <div id="app">
        <div>
            <!-- TODO 1: 点击按钮切换 currentTab，并添加 active 类名 -->
            <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="currentTab = tab.name"
                :class="__________"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- TODO 2: 使用动态组件渲染当前选中的 Tab -->
        <div class="tab-content">
            ____________
        </div>

        <div class="log">
            <strong>生命周期日志：</strong>
            <div v-for="(log, index) in logs" :key="index" class="log-item">{{ log }}</div>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        const app = createApp({
            data() {
                return {
                    currentTab: 'ProductTab',
                    tabs: [
                        { name: 'ProductTab', label: '商品列表' },
                        { name: 'OrderTab', label: '订单统计' },
                        { name: 'UserTab', label: '用户信息' }
                    ],
                    logs: []
                }
            },
            methods: {
                addLog(msg) {
                    const time = new Date().toLocaleTimeString();
                    this.logs.unshift(`[${time}] ${msg}`);
                    if (this.logs.length > 10) this.logs.pop();
                }
            }
        });

        // ProductTab 组件
        app.component('ProductTab', {
            template: `<div><h3>商品列表</h3><p>共 3 件商品</p></div>`,
            mounted() { this.$parent.addLog('ProductTab mounted'); },
            unmounted() { this.$parent.addLog('ProductTab unmounted'); }
        });

        // OrderTab 组件
        app.component('OrderTab', {
            template: `<div><h3>订单统计</h3><p>本月订单 128 笔</p></div>`,
            mounted() { this.$parent.addLog('OrderTab mounted'); },
            unmounted() { this.$parent.addLog('OrderTab unmounted'); }
        });

        // TODO 3: 创建 UserTab 组件
        // 要求：模板显示 "用户信息"，在 mounted 和 unmounted 时通过 $parent.addLog 记录日志
        ____________

        app.mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<button
    v-for="tab in tabs"
    :key="tab.name"
    @click="currentTab = tab.name"
    :class="['tab-btn', { active: currentTab === tab.name }]"
>
    {{ tab.label }}
</button>

<!-- TODO 2 -->
<component :is="currentTab"></component>
```

```javascript
// TODO 3
app.component('UserTab', {
    template: `<div><h3>用户信息</h3><p>当前在线用户 42 人</p></div>`,
    mounted() { this.$parent.addLog('UserTab mounted'); },
    unmounted() { this.$parent.addLog('UserTab unmounted'); }
});
```

**关键点**：
- `<component :is="currentTab">` 会根据 `currentTab` 的值渲染对应组件
- 切换组件时，原组件会触发 `unmounted`，新组件会触发 `mounted`
- `$parent` 可以访问父组件实例（但应避免过度使用，优先使用 Props/Emit）
</details>

---

### Level 3：Modal 对话框综合（综合挑战）

**目标**：创建一个可复用的 Modal 组件，在商品删除场景中整合 Props、$emit、插槽和生命周期。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - Modal 对话框综合</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
        .btn { padding: 6px 12px; cursor: pointer; border: none; border-radius: 4px; }
        .btn-danger { background: #e74c3c; color: white; }
        .btn-default { background: #95a5a6; color: white; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; padding: 20px; border-radius: 8px; min-width: 300px; }
        .modal-header { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
        .modal-footer { margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px; }
    </style>
</head>
<body>
    <div id="app">
        <h2>商品管理</h2>

        <div class="card" v-for="product in products" :key="product.id">
            <span>{{ product.title }} - ¥{{ product.price }}</span>
            <button class="btn btn-danger" @click="openDeleteModal(product)">删除</button>
        </div>

        <!-- TODO 1: 使用 Modal 组件 -->
        <!-- 要求：visible 控制显示，title 传入 "确认删除" -->
        <!-- 监听 @confirm 执行删除，@cancel 关闭弹窗 -->
        <!-- 使用默认插槽显示删除提示内容（包含商品名） -->
        ____________
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        const app = createApp({
            data() {
                return {
                    products: [
                        { id: 1, title: 'Vue.js实战', price: 79 },
                        { id: 2, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 3, title: '深入浅出Node.js', price: 68 }
                    ],
                    modalVisible: false,
                    targetProduct: null
                }
            },
            methods: {
                openDeleteModal(product) {
                    this.targetProduct = product;
                    this.modalVisible = true;
                },
                confirmDelete() {
                    if (this.targetProduct) {
                        this.products = this.products.filter(p => p.id !== this.targetProduct.id);
                    }
                    this.modalVisible = false;
                    this.targetProduct = null;
                },
                closeModal() {
                    this.modalVisible = false;
                    this.targetProduct = null;
                }
            }
        });

        // TODO 2: 全局注册 Modal 组件
        // Props: visible（布尔值，控制显示）, title（字符串，标题）
        // 事件：confirm（点击确认按钮触发）, cancel（点击取消或遮罩层触发）
        // 插槽：默认插槽用于自定义内容
        ____________

        app.mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<Modal
    :visible="modalVisible"
    title="确认删除"
    @confirm="confirmDelete"
    @cancel="closeModal"
>
    <p>确定要删除商品 "{{ targetProduct?.title }}" 吗？</p>
    <p style="color: #e74c3c; font-size: 14px;">此操作不可撤销。</p>
</Modal>
```

```javascript
// TODO 2
app.component('Modal', {
    props: {
        visible: { type: Boolean, default: false },
        title: { type: String, default: '提示' }
    },
    template: `
        <div v-if="visible" class="modal-overlay" @click.self="$emit('cancel')">
            <div class="modal-content">
                <div class="modal-header">{{ title }}</div>
                <div class="modal-body">
                    <slot>默认内容</slot>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" @click="$emit('cancel')">取消</button>
                    <button class="btn btn-danger" @click="$emit('confirm')">确认</button>
                </div>
            </div>
        </div>
    `
});
```

**关键点**：
- 插槽（`slot`）允许父组件向子组件传入自定义内容
- 模态框遮罩层点击使用 `@click.self` 防止事件冒泡
- 可选链操作符 `?.` 安全访问可能为 null 的对象属性
- 组件通信流程：父组件控制显示状态 → 子组件触发事件 → 父组件处理业务逻辑
</details>

---

## 知识检查清单

完成本讲后，你应该能够：

- [ ] 使用 `app.component()` 全局注册组件
- [ ] 使用 `components` 选项局部注册组件
- [ ] 使用 `props` 接收父组件传入的数据
- [ ] 使用 `props` 的验证选项（`type`、`required`、`default`）
- [ ] 使用 `this.$emit()` 从子组件向父组件发送自定义事件
- [ ] 在父组件中使用 `@事件名` 监听子组件事件
- [ ] 使用 `<component :is="...">` 实现动态组件切换
- [ ] 了解异步组件的基本概念和 `defineAsyncComponent`
- [ ] 解释 `created`、`mounted`、`updated`、`unmounted` 的触发时机和用途
- [ ] 在 `unmounted` 中清理副作用（定时器、事件监听等）

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| 组件未渲染 | 组件名大小写不匹配 | HTML 中使用 kebab-case：`<my-component>` |
| Props 未传入 | 忘记加 `:`，值被当作字符串 | 数字/布尔/对象需加 `:`，如 `:price="79"` |
| 子组件修改 Props 报错 | 直接修改了 Props 的值 | Props 是只读的，需要修改时应 `$emit` 事件让父组件改 |
| 事件名不生效 | 使用了 camelCase | HTML 中事件监听使用 kebab-case：`@add-to-cart` |
| 动态组件不切换 | `:is` 绑定的是字符串但组件未注册 | 确保字符串与注册时的组件名一致 |
| 内存泄漏 | 定时器/事件未清理 | 在 `unmounted` 钩子中清理所有副作用 |
| 插槽内容不显示 | 忘记在子组件模板中使用 `<slot>` | 子组件必须声明 `<slot>` 作为内容出口 |

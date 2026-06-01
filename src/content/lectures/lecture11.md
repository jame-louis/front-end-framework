---
title: "计算属性与监听器"
lectureNumber: 11
week: 11
module: "Vue.js框架"
description: "computed计算属性、watch监听器、缓存特性、响应式原理"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture10"]
tags: ["Vue.js", "computed", "watch", "响应式"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture11
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 使用 `computed` 定义派生数据，理解其缓存特性
- 使用 `watch` 监听数据变化并执行副作用
- 注册全局和局部自定义指令，掌握简化版钩子函数用法
- 在实际场景中区分 `computed` 和 `watch` 的适用场景

---

# 第一部分：计算属性 computed

## 1.1 什么是计算属性

计算属性（Computed Properties）用于**根据已有数据派生出新数据**。当依赖的数据变化时，计算属性会自动重新求值；若依赖未变，则直接返回缓存结果。

**典型场景**：购物车总价、商品折扣价、列表过滤后的结果。

```html
<div id="app">
    <p>单价：{{ price }} 元</p>
    <p>数量：{{ quantity }}</p>
    <!-- 计算属性 -->
    <p>小计：{{ subtotal }} 元</p>
</div>

<script>
    const { createApp } = Vue;

    createApp({
        data() {
            return {
                price: 59,
                quantity: 3
            }
        },
        computed: {
            // 声明式定义：subtotal 依赖于 price 和 quantity
            subtotal() {
                return this.price * this.quantity;
            }
        }
    }).mount('#app');
</script>
```

---

## 1.2 计算属性 vs 方法

初学者常问：用 `computed` 和用 `methods` 有什么区别？

| 特性 | `computed` | `methods` |
|------|-----------|-----------|
| **调用方式** | 属性访问 `{{ subtotal }}` | 函数调用 `{{ getSubtotal() }}` |
| **缓存** | ✅ 依赖不变则返回缓存 | ❌ 每次渲染都重新执行 |
| **适用场景** | 根据数据派生结果 | 响应用户交互事件 |

```javascript
computed: {
    subtotal() {
        console.log('computed 执行');
        return this.price * this.quantity;
    }
},
methods: {
    getSubtotal() {
        console.log('method 执行');
        return this.price * this.quantity;
    }
}
```

> **费曼解释**：计算属性像一个有记忆的计算器。你输入相同的数字，它直接告诉你之前算好的答案；只有数字变了，它才会重新算一遍。

---

## 1.3 可写计算属性

默认情况下计算属性是只读的。通过同时提供 `getter` 和 `setter`，可以实现双向计算属性。

```javascript
computed: {
    // 完整写法
    fullName: {
        // 读取时调用
        get() {
            return this.firstName + ' ' + this.lastName;
        },
        // 赋值时调用
        set(newValue) {
            const parts = newValue.split(' ');
            this.firstName = parts[0];
            this.lastName = parts[1] || '';
        }
    }
}
```

**应用场景**：表单中的"全选"复选框——根据子项状态计算是否全选，同时点击全选可批量修改子项。

---

# 第二部分：监听器 watch

## 2.1 基本用法

当需要在数据变化时**执行副作用**（如发送请求、操作 DOM、记录日志），使用 `watch`。

```javascript
watch: {
    // 监听 searchKey 的变化
    searchKey(newVal, oldVal) {
        console.log(`搜索词从 "${oldVal}" 变为 "${newVal}"`);
        this.fetchResults(newVal);
    }
}
```

---

## 2.2 深度监听与立即执行

**深度监听 `deep`**：对象内部属性变化时也能触发监听。

```javascript
watch: {
    // 浅监听：只监听引用变化，不监听对象内部属性
    user(newVal) {
        console.log('user 引用变化');
    },

    // 深监听：对象内部任何属性变化都会触发
    user: {
        handler(newVal, oldVal) {
            console.log('user 内部变化:', newVal.age);
        },
        deep: true  // 开启深度监听
    }
}
```

**立即执行 `immediate`**：页面加载时立即执行一次回调。

```javascript
watch: {
    searchKey: {
        handler(newVal) {
            this.fetchResults(newVal);
        },
        immediate: true  // 初始化时立即执行
    }
}
```

---

## 2.3 监听多个数据源

Vue 3 中可以通过数组同时监听多个数据源：

```javascript
watch: {
    // 同时监听 price 和 quantity
    'price,quantity': {
        handler([newPrice, newQty], [oldPrice, oldQty]) {
            console.log('价格或数量变化，重新计算总价');
        }
    }
}
```

更灵活的方式是使用 `$watch` API：

```javascript
mounted() {
    this.$watch(
        () => [this.price, this.quantity],
        ([newPrice, newQty]) => {
            console.log('总价:', newPrice * newQty);
        }
    );
}
```

---

## 2.4 watchEffect 简介

`watchEffect` 是 Vue 3 新增的响应式 API，它会**自动追踪依赖**，无需显式指定监听源。

```javascript
// 需要单独从 Vue 中引入（Options API 中较少直接使用）
const { watchEffect } = Vue;

watchEffect(() => {
    // 自动追踪此函数内使用到的响应式数据
    console.log('当前搜索词:', this.searchKey);
    console.log('当前页码:', this.page);
    // 只要 searchKey 或 page 变化，就会重新执行
});
```

| 特性 | `watch` | `watchEffect` |
|------|---------|---------------|
| 依赖追踪 | 手动指定 | 自动追踪 |
| 旧值访问 | ✅ `oldVal` | ❌ 无 |
| 懒执行 | ✅ 默认 | ❌ 立即执行 |
| 使用场景 | 精确控制、需要旧值 | 副作用依赖关系复杂 |

> 本课程以 `watch` 为主，`watchEffect` 作为了解内容。

---

# 第三部分：自定义指令

## 3.1 全局注册

自定义指令用于对底层 DOM 进行直接操作。Vue 3 中通过 `app.directive()` 全局注册。

```javascript
const app = createApp({ /* ... */ });

// 注册全局指令 v-focus
app.directive('focus', {
    // 元素挂载完成后自动聚焦
    mounted(el) {
        el.focus();
    }
});

app.mount('#app');
```

```html
<!-- 使用指令 -->
<input v-focus placeholder="自动获得焦点">
```

---

## 3.2 局部注册

在组件内通过 `directives` 选项局部注册，仅当前组件可用。

```javascript
createApp({
    directives: {
        // 局部注册 v-color
        color: {
            mounted(el, binding) {
                el.style.color = binding.value;
            }
        }
    }
}).mount('#app');
```

```html
<p v-color="'red'">这段文字是红色</p>
<p v-color="themeColor">这段文字颜色由 data 控制</p>
```

---

## 3.3 钩子函数（简化版）

Vue 3 自定义指令提供以下钩子函数：

| 钩子 | 调用时机 | 常用程度 |
|------|---------|---------|
| `created` | 元素创建前 | ⭐ |
| `beforeMount` | 元素挂载前 | ⭐ |
| `mounted` | **元素挂载后** | ⭐⭐⭐ 最常用 |
| `beforeUpdate` | 组件更新前 | ⭐⭐ |
| `updated` | 组件更新后 | ⭐⭐ |
| `beforeUnmount` | 元素卸载前 | ⭐ |
| `unmounted` | **元素卸载后** | ⭐⭐ 清理副作用 |

> **简化记忆**：大部分场景只需 `mounted`（初始化 DOM 操作）和 `unmounted`（清理资源）。

---

## 3.4 动态参数

指令参数可以动态绑定，格式为 `v-directive:[argument]`。

```javascript
app.directive('pin', {
    mounted(el, binding) {
        // binding.arg 获取动态参数
        const position = binding.arg || 'top';
        el.style.position = 'fixed';

        switch (position) {
            case 'top': el.style.top = '10px'; break;
            case 'bottom': el.style.bottom = '10px'; break;
            case 'left': el.style.left = '10px'; break;
            case 'right': el.style.right = '10px'; break;
        }
    }
});
```

```html
<!-- 动态参数绑定 -->
<div v-pin:[direction]>固定在 {{ direction }} 方向</div>

<script>
    createApp({
        data() {
            return {
                direction: 'right'  // 可动态改变
            }
        }
    }).mount('#app');
</script>
```

**`binding` 对象常用属性**：

| 属性 | 说明 |
|------|------|
| `binding.value` | 指令绑定的值（如 `v-color="'red'"` 中的 `'red'`） |
| `binding.arg` | 动态参数（如 `v-pin:top` 中的 `'top'`） |
| `binding.modifiers` | 修饰符对象（如 `v-my-dir.uppercase`） |

---

# 刻意练习

## 场景：图书商城后台管理

你将实现一个图书管理面板，包含：
- 图书列表展示，支持分类筛选和搜索过滤
- 借阅车自动计算总价、折扣和数量
- 搜索输入防抖、借阅车数据自动同步 LocalStorage

---

### Level 1：计算属性基础（模仿练习）

**目标**：补全计算属性，实现借阅车的自动统计。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 1 - 计算属性基础</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .book-item { border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .cart-summary { background: #f5f5f5; padding: 15px; margin-top: 20px; border-radius: 4px; }
        .highlight { color: #e74c3c; font-weight: bold; }
    </style>
</head>
<body>
    <div id="app">
        <h2>图书列表</h2>
        <div class="book-item" v-for="book in books" :key="book.id">
            <p>{{ book.title }} - ¥{{ book.price }}</p>
            <button @click="addToCart(book)">加入借阅车</button>
        </div>

        <div class="cart-summary">
            <h3>借阅车统计</h3>
            <!-- TODO 1: 显示借阅车商品总数量 -->
            <p>商品数量：{{ ____________ }}</p>

            <!-- TODO 2: 显示原始总价 -->
            <p>原始总价：¥{{ ____________ }}</p>

            <!-- TODO 3: 显示折扣后总价（满100打9折） -->
            <p>折扣后总价：¥{{ ____________ }}</p>

            <!-- TODO 4: 显示节省金额 -->
            <p class="highlight">节省：¥{{ ____________ }}</p>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    books: [
                        { id: 1, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 2, title: 'Vue.js实战', price: 79 },
                        { id: 3, title: '深入浅出Node.js', price: 68 }
                    ],
                    cart: []
                }
            },
            computed: {
                // TODO 1: 计算 cart 中所有商品的数量总和
                cartCount() {
                    // 提示：使用 reduce 累加每个 cart 项的 qty
                    ____________
                },

                // TODO 2: 计算原始总价（不考虑折扣）
                originalTotal() {
                    ____________
                },

                // TODO 3: 计算折扣后总价：满100元打9折，否则原价
                discountedTotal() {
                    ____________
                },

                // TODO 4: 计算节省金额 = 原始总价 - 折扣后总价
                savedAmount() {
                    ____________
                }
            },
            methods: {
                addToCart(book) {
                    const existing = this.cart.find(item => item.id === book.id);
                    if (existing) {
                        existing.qty++;
                    } else {
                        this.cart.push({ ...book, qty: 1 });
                    }
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
computed: {
    cartCount() {
        return this.cart.reduce((sum, item) => sum + item.qty, 0);
    },
    originalTotal() {
        return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    discountedTotal() {
        const total = this.originalTotal;
        return total >= 100 ? Math.round(total * 0.9 * 100) / 100 : total;
    },
    savedAmount() {
        return Math.round((this.originalTotal - this.discountedTotal) * 100) / 100;
    }
}
```

**关键点**：
- `reduce` 是数组聚合的常用方法
- 计算属性可以依赖其他计算属性（如 `discountedTotal` 依赖 `originalTotal`）
- 计算属性的结果会被缓存，依赖不变时不会重复计算
</details>

---

### Level 2：监听器应用（变式练习）

**目标**：使用 `watch` 实现搜索防抖和借阅车 LocalStorage 持久化。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - 监听器应用</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        input { padding: 8px; width: 300px; margin-bottom: 10px; }
        .book-item { border: 1px solid #ddd; padding: 10px; margin: 5px 0; }
        .sync-status { color: #27ae60; font-size: 14px; }
    </style>
</head>
<body>
    <div id="app">
        <h2>图书搜索</h2>
        <input v-model="searchKey" placeholder="输入书名搜索...">
        <p class="sync-status">{{ syncStatus }}</p>

        <div class="book-item" v-for="book in filteredBooks" :key="book.id">
            {{ book.title }} - ¥{{ book.price }}
            <button @click="addToCart(book)">加入借阅车</button>
        </div>

        <h3>借阅车（{{ cartCount }} 本）</h3>
        <p v-for="item in cart" :key="item.id">{{ item.title }} x {{ item.qty }}</p>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    searchKey: '',
                    books: [
                        { id: 1, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 2, title: 'Vue.js实战', price: 79 },
                        { id: 3, title: '深入浅出Node.js', price: 68 },
                        { id: 4, title: 'CSS揭秘', price: 59 }
                    ],
                    cart: [],
                    syncStatus: '等待操作...',
                    searchTimer: null
                }
            },
            computed: {
                filteredBooks() {
                    if (!this.searchKey) return this.books;
                    return this.books.filter(book =>
                        book.title.toLowerCase().includes(this.searchKey.toLowerCase())
                    );
                },
                cartCount() {
                    return this.cart.reduce((sum, item) => sum + item.qty, 0);
                }
            },
            watch: {
                // TODO 1: 监听 searchKey 变化，实现防抖搜索提示
                // 要求：用户输入后 500ms 才在控制台输出"正在搜索: xxx"
                // 如果 500ms 内再次输入，取消上次的定时器
                searchKey(newVal) {
                    ____________
                },

                // TODO 2: 监听 cart 变化，深度监听，自动保存到 localStorage
                // 同时更新 syncStatus 为"已自动保存"，2秒后恢复"等待操作..."
                cart: {
                    ____________
                }
            },
            methods: {
                addToCart(book) {
                    const existing = this.cart.find(item => item.id === book.id);
                    if (existing) {
                        existing.qty++;
                    } else {
                        this.cart.push({ ...book, qty: 1 });
                    }
                }
            },
            mounted() {
                // TODO 3: 页面加载时从 localStorage 恢复 cart 数据
                // key 为 'lecture11_cart'
                ____________
            }
        }).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```javascript
watch: {
    searchKey(newVal) {
        // 清除上次定时器
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        // 设置新的防抖定时器
        this.searchTimer = setTimeout(() => {
            console.log('正在搜索:', newVal);
        }, 500);
    },
    cart: {
        handler(newVal) {
            localStorage.setItem('lecture11_cart', JSON.stringify(newVal));
            this.syncStatus = '已自动保存';
            setTimeout(() => {
                this.syncStatus = '等待操作...';
            }, 2000);
        },
        deep: true
    }
},
mounted() {
    const stored = localStorage.getItem('lecture11_cart');
    if (stored) {
        this.cart = JSON.parse(stored);
    }
}
```

**关键点**：
- 防抖（debounce）通过 `clearTimeout` + `setTimeout` 实现
- 监听数组/对象内部变化必须加 `deep: true`
- `localStorage` 存储需要 `JSON.stringify/parse`
</details>

---

### Level 3：自定义指令综合（综合挑战）

**目标**：创建并应用自定义指令，整合 `computed` 和 `watch` 完成图书管理面板。

**任务说明**：

1. 创建全局指令 `v-focus`，使搜索框自动获得焦点
2. 创建全局指令 `v-color`，根据绑定值改变文字颜色
3. 创建局部指令 `v-permission`，根据用户角色控制按钮显示/隐藏
4. 整合以上功能，实现一个完整的图书管理面板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - 自定义指令综合</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        .panel { border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .admin-btn { background: #3498db; color: white; padding: 5px 10px; border: none; cursor: pointer; }
        .danger-btn { background: #e74c3c; color: white; padding: 5px 10px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div id="app">
        <h2>图书管理系统</h2>

        <!-- TODO 1: 为搜索框添加 v-focus 指令 -->
        <input ____________ v-model="searchKey" placeholder="搜索图书...">

        <div class="panel">
            <h3>图书列表</h3>
            <div v-for="book in filteredBooks" :key="book.id">
                <!-- TODO 2: 使用 v-color 指令将书名显示为蓝色 -->
                <span ____________>{{ book.title }}</span>
                - ¥{{ book.price }}

                <!-- TODO 3: 使用 v-permission 指令，仅管理员可见删除按钮 -->
                <button class="danger-btn" ____________ @click="removeBook(book.id)">删除</button>
            </div>
        </div>

        <div class="panel">
            <h3>统计信息</h3>
            <p>图书总数：{{ totalBooks }}</p>
            <p>平均价格：¥{{ averagePrice }}</p>
            <p>最高价格：¥{{ maxPrice }}</p>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        const app = createApp({
            data() {
                return {
                    searchKey: '',
                    userRole: 'user', // 可切换为 'admin' 测试
                    books: [
                        { id: 1, title: 'JavaScript高级程序设计', price: 99 },
                        { id: 2, title: 'Vue.js实战', price: 79 },
                        { id: 3, title: '深入浅出Node.js', price: 68 },
                        { id: 4, title: 'CSS揭秘', price: 59 },
                        { id: 5, title: 'React设计模式', price: 89 }
                    ]
                }
            },
            computed: {
                filteredBooks() {
                    if (!this.searchKey) return this.books;
                    return this.books.filter(book =>
                        book.title.toLowerCase().includes(this.searchKey.toLowerCase())
                    );
                },
                totalBooks() {
                    return this.books.length;
                },
                averagePrice() {
                    if (this.books.length === 0) return 0;
                    return (this.books.reduce((sum, b) => sum + b.price, 0) / this.books.length).toFixed(2);
                },
                maxPrice() {
                    return Math.max(...this.books.map(b => b.price));
                }
            },
            watch: {
                books: {
                    handler() {
                        localStorage.setItem('lecture11_books', JSON.stringify(this.books));
                    },
                    deep: true
                }
            },
            methods: {
                removeBook(id) {
                    this.books = this.books.filter(book => book.id !== id);
                }
            },
            directives: {
                // TODO 4: 局部注册 v-permission 指令
                // 要求：若用户角色不在允许列表中，隐藏该元素
                permission: {
                    mounted(el, binding) {
                        ____________
                    }
                }
            },
            mounted() {
                const stored = localStorage.getItem('lecture11_books');
                if (stored) {
                    this.books = JSON.parse(stored);
                }
            }
        });

        // TODO 5: 全局注册 v-focus 指令，使元素自动获得焦点
        ____________

        // TODO 6: 全局注册 v-color 指令，将元素文字颜色设为 binding.value
        ____________

        app.mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- HTML 部分 -->
<input v-focus v-model="searchKey" placeholder="搜索图书...">
<span v-color="'blue'">{{ book.title }}</span>
<button class="danger-btn" v-permission="['admin']" @click="removeBook(book.id)">删除</button>
```

```javascript
// 局部指令
permission: {
    mounted(el, binding) {
        const allowedRoles = binding.value;
        if (!allowedRoles.includes(this.userRole)) {
            el.style.display = 'none';
        }
    }
}

// 全局注册
app.directive('focus', {
    mounted(el) {
        el.focus();
    }
});

app.directive('color', {
    mounted(el, binding) {
        el.style.color = binding.value;
    }
});
```

**关键点**：
- 全局指令在 `app.directive(name, definition)` 注册，组件内用 `v-name`
- 局部指令在组件 `directives` 选项中注册
- `binding.value` 获取指令绑定的值
- `binding.arg` 获取动态参数（本任务未使用）
</details>

---

## 知识检查清单

完成本讲后，你应该能够：

- [ ] 解释 `computed` 和 `methods` 的核心区别（缓存）
- [ ] 使用 `computed` 定义只读和可写的计算属性
- [ ] 使用 `watch` 监听数据变化并执行副作用
- [ ] 使用 `deep: true` 监听对象/数组内部变化
- [ ] 使用 `immediate: true` 在初始化时立即执行监听回调
- [ ] 使用 `clearTimeout` + `setTimeout` 实现防抖效果
- [ ] 全局注册自定义指令（`app.directive`）
- [ ] 局部注册自定义指令（组件 `directives` 选项）
- [ ] 在自定义指令中使用 `binding.value` 和 `binding.arg`
- [ ] 区分 `computed`（派生数据）和 `watch`（副作用）的适用场景

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| 计算属性不更新 | 在计算属性中修改了其他数据（副作用） | 计算属性应纯函数，只返回值不修改状态 |
| 监听对象内部变化不触发 | 未加 `deep: true` | 对象/数组监听添加 `deep: true` |
| 防抖不生效 | 每次输入都创建了新的定时器，没有清除旧的 | 将 timer 保存在 `data` 中，先 `clearTimeout` |
| 自定义指令不生效 | 指令名使用了驼峰命名 | HTML 中使用 kebab-case：`v-my-directive` |
| 局部指令在其他组件失效 | 局部指令只注册在当前组件 | 需要多处使用时改用全局注册 |
| `watch` 获取不到旧值 | 监听的是对象/数组，引用未变 | 对于对象类型，Vue 无法追踪旧引用，需深度克隆对比 |

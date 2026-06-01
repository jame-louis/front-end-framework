---
title: "JavaScript的数据传递与共享"
lectureNumber: 6
week: 6
module: "JavaScript基础"
description: "localStorage、sessionStorage、JSON序列化、URL参数传递"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture05"]
tags: ["JavaScript", "本地存储", "JSON", "URL参数"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture06
hasAssignment: false
draft: false
---


> **本章目标**：掌握浏览器环境下的数据持久化与传递技术，能够独立完成数据的存储、读取和页面间共享。

---

## 项目背景：购物车数据持久化

本章将通过一个**贯穿始终的实战项目**来学习所有知识点：

**场景**：实现一个购物车系统，要求：
- 用户添加商品后，刷新页面购物车数据不丢失
- 支持将购物车分享给他人（通过URL）
- 填写订单时，意外关闭页面可以恢复表单数据

---

## 第一部分：JSON —— 数据的通用语言

### 1.1 为什么需要 JSON？

浏览器存储只能保存**字符串**，但我们的数据通常是对象或数组：

```javascript
const cart = {
  items: [{ id: 1, name: '手机', price: 2999, qty: 2 }],
  total: 5998
};

// 直接存储会得到 [object Object] —— 数据损坏！
localStorage.setItem('cart', cart); // ❌ 错误
```

**解决方案**：使用 JSON 进行序列化与反序列化。

### 1.2 核心操作

| 操作       | 方法                    | 用途                 |
| -------- | --------------------- | ------------------ |
| **序列化**  | `JSON.stringify(obj)` | 对象 → JSON字符串（用于存储） |
| **反序列化** | `JSON.parse(str)`     | JSON字符串 → 对象（用于读取） |

```javascript
const cart = { items: [], total: 0 };

// 保存：序列化
const jsonStr = JSON.stringify(cart);
localStorage.setItem('cart', jsonStr);

// 读取：反序列化
const stored = localStorage.getItem('cart');
const cartData = JSON.parse(stored);
console.log(cartData.total);
```

---

### 刻意练习 1：JSON 序列化与反序列化

#### Level 1：基础序列化（模仿练习）

**目标**：将一个用户对象转换为 JSON 字符串并存储到 LocalStorage，然后读取并还原。

**任务说明**：
补全以下代码中的 `// TODO` 部分，实现完整的存储与读取流程。

```javascript
// 1. 定义用户数据
const user = {
  id: 1001,
  username: 'zhangsan',
  email: 'zhangsan@example.com',
  isVip: true
};

// 2. 将 user 对象序列化为 JSON 字符串
// TODO: 使用 JSON.stringify 序列化
const userJson = ________________;

// 3. 存储到 LocalStorage
// TODO: 使用 localStorage.setItem 保存
________________;

// 4. 从 LocalStorage 读取
// TODO: 使用 localStorage.getItem 读取
const storedJson = ________________;

// 5. 将 JSON 字符串反序列化为对象
// TODO: 使用 JSON.parse 反序列化
const userData = ________________;

// 6. 验证：输出 username
console.log(userData.username); // 应输出: zhangsan
```

<details>
<summary>参考答案</summary>

```javascript
// 2. 将 user 对象序列化为 JSON 字符串
const userJson = JSON.stringify(user);

// 3. 存储到 LocalStorage
localStorage.setItem('user', userJson);

// 4. 从 LocalStorage 读取
const storedJson = localStorage.getItem('user');

// 5. 将 JSON 字符串反序列化为对象
const userData = JSON.parse(storedJson);
```

**关键点**：
- `JSON.stringify()` 将对象转为字符串，用于存储
- `JSON.parse()` 将字符串转回对象，用于使用
- LocalStorage 只能存储字符串，对象必须先序列化
</details>

---

#### Level 2：处理复杂数据（变式练习）

**目标**：处理包含嵌套对象和数组的复杂数据序列化与还原。

**任务说明**：
购物车数据包含嵌套结构，你需要确保序列化和反序列化后数据完整无损。

```javascript
// 购物车数据（复杂嵌套结构）
const cart = {
  userId: 1001,
  items: [
    { id: 1, name: 'iPhone 15', price: 5999, qty: 1, specs: { color: '黑色', storage: '256GB' } },
    { id: 2, name: 'AirPods Pro', price: 1999, qty: 2, specs: { color: '白色', generation: 2 } }
  ],
  coupon: { code: 'SAVE100', discount: 100 },
  total: 9897,
  createdAt: new Date().toISOString()
};

// TODO 1: 将 cart 序列化并保存到 localStorage，key 为 'cart'


// TODO 2: 从 localStorage 读取并反序列化


// TODO 3: 验证数据完整性
// - 输出商品总数（应为 2）
// - 输出第一件商品的规格颜色（应为"黑色"）
// - 输出优惠券折扣金额（应为 100）

```

**思考问题**：
1. 如果购物车中有 100 件商品，序列化后的字符串会有什么特点？
2. 如果存储超过 LocalStorage 的容量限制（约 5-10MB）会发生什么？

<details>
<summary>参考答案</summary>

```javascript
// TODO 1: 序列化并保存
const cartJson = JSON.stringify(cart);
localStorage.setItem('cart', cartJson);

// TODO 2: 读取并反序列化
const storedCart = localStorage.getItem('cart');
const restoredCart = JSON.parse(storedCart);

// TODO 3: 验证数据完整性
console.log('商品总数:', restoredCart.items.length); // 2
console.log('第一件商品颜色:', restoredCart.items[0].specs.color); // 黑色
console.log('优惠券折扣:', restoredCart.coupon.discount); // 100
```

**思考问题答案**：
1. 数据量大的 JSON 字符串会非常长，可能达到数千甚至数万字符，影响存储和读取性能
2. 超出容量会抛出 `QuotaExceededError` 异常，存储失败，需要用 try-catch 处理
</details>

---

#### Level 3：错误处理实战（综合挑战）

**目标**：在实际场景中处理 JSON 解析错误，编写健壮的代码。

**任务说明**：
在真实项目中，LocalStorage 中的数据可能被损坏（手动修改、存储异常等），你需要确保应用不会因此崩溃。

```javascript
/**
 * 安全地从 LocalStorage 读取 JSON 数据
 * @param {string} key - LocalStorage 的 key
 * @param {*} defaultValue - 读取失败时的默认值
 * @returns {*} 解析后的数据或默认值
 */
function safeGetFromStorage(key, defaultValue = null) {
  // TODO: 实现安全读取
  // 1. 从 localStorage 获取字符串
  // 2. 如果为 null，返回 defaultValue
  // 3. 尝试 JSON.parse 解析
  // 4. 如果解析失败（try-catch），捕获错误并在控制台警告，返回 defaultValue
  // 5. 解析成功则返回解析后的数据
}

// ===== 测试用例 =====

// 测试 1: 正常数据
localStorage.setItem('validData', JSON.stringify({ name: '张三', age: 25 }));
console.log('测试1 - 正常数据:', safeGetFromStorage('validData', {}));
// 预期: { name: '张三', age: 25 }

// 测试 2: 不存在的 key
console.log('测试2 - 不存在key:', safeGetFromStorage('nonExistent', 'fallback'));
// 预期: 'fallback'

// 测试 3: 损坏的 JSON（手动模拟数据损坏）
localStorage.setItem('corruptedData', '{invalid json}');
console.log('测试3 - 损坏数据:', safeGetFromStorage('corruptedData', { restored: true }));
// 预期: 控制台显示警告，返回 { restored: true }

// 测试 4: 空字符串
localStorage.setItem('emptyString', '');
console.log('测试4 - 空字符串:', safeGetFromStorage('emptyString', 'emptyFallback'));
// 预期: 应该处理空字符串的情况
```

<details>
<summary>参考答案</summary>

```javascript
function safeGetFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);

    // key 不存在时返回默认值
    if (data === null) {
      return defaultValue;
    }

    // 尝试解析 JSON
    return JSON.parse(data);
  } catch (error) {
    console.warn(`从 localStorage 读取 "${key}" 失败:`, error.message);
    return defaultValue;
  }
}
```

**关键点**：
- 使用 `try-catch` 包裹 JSON.parse 防止崩溃
- 区分 `null`（key 不存在）和 `"null"`（存储的字符串）
- 提供默认值参数，让调用方决定失败时的行为
- 错误信息要包含 key 名称，方便调试
</details>

---

## 第二部分：URL参数 —— 页面间传值

### 2.1 URL的结构

```
https://example.com:8080/path/page.html?id=123&name=abc#section
\____/   \_________/ \__/ \_________/ \____________/ \______/
  |           |         |       |            |           |
协议        域名       端口    路径        查询参数      锚点
```

### 2.2 使用 URLSearchParams

```javascript
// 构建URL参数
const params = new URLSearchParams();
params.append('id', '123');
params.append('name', '张三');
const url = 'https://example.com/page.html?' + params.toString();
// 结果: https://example.com/page.html?id=123&name=%E5%BC%A0%E4%B8%89

// 解析URL参数
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');      // "123"
const name = urlParams.get('name');  // "张三"
```

---

### 刻意练习 2：URL 参数处理

#### Level 1：基础参数构建与解析

**任务**：实现一个函数，将普通对象转换为 URL 查询字符串。

```javascript
/**
 * 将对象转换为 URL 查询字符串
 * @param {Object} params - 参数对象
 * @returns {string} URL 查询字符串（带 ? 前缀）
 *
 * 示例：
 * objectToQueryString({ id: 123, name: '张三' })
 * 返回："?id=123&name=%E5%BC%A0%E4%B8%89"
 */
function objectToQueryString(params) {
  // TODO: 实现函数
  // 提示：使用 URLSearchParams
}

// ===== 测试用例 =====
console.log(objectToQueryString({ id: 123, name: '张三' }));
// 预期: "?id=123&name=%E5%BC%A0%E4%B8%89"

console.log(objectToQueryString({ search: '手机', page: 1, size: 20 }));
// 预期: "?search=%E6%89%8B%E6%9C%BA&page=1&size=20"

console.log(objectToQueryString({}));
// 预期: "?" 或空字符串 ""
```

<details>
<summary>参考答案</summary>

```javascript
function objectToQueryString(params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? '?' + queryString : '';
}

// 更简洁的写法
function objectToQueryString(params) {
  const query = new URLSearchParams(params).toString();
  return query ? '?' + query : '';
}
```
</details>

---

#### Level 2：购物车分享链接

**任务**：实现购物车分享功能，将购物车数据编码到 URL 参数中。

```javascript
/**
 * 生成购物车分享链接
 * @param {Object} cart - 购物车数据
 * @returns {string} 完整的分享 URL
 */
function generateCartShareLink(cart) {
  // TODO: 实现函数
  // 提示：
  // 1. 使用 JSON.stringify 将 cart 转为字符串
  // 2. 使用 encodeURIComponent 编码（处理特殊字符）
  // 3. 拼接到当前页面 URL 的 cart 参数中
}

/**
 * 从 URL 解析购物车数据
 * @returns {Object|null} 购物车数据或 null
 */
function parseCartFromURL() {
  // TODO: 实现函数
  // 提示：
  // 1. 使用 URLSearchParams 获取 cart 参数
  // 2. 使用 decodeURIComponent 解码
  // 3. 使用 JSON.parse 转为对象
  // 4. 添加 try-catch 处理无效数据
}

// ===== 测试用例 =====
const testCart = {
  items: [
    { id: 1, name: 'iPhone 15', price: 5999, qty: 1 },
    { id: 2, name: 'AirPods', price: 1999, qty: 2 }
  ],
  total: 9997
};

// 测试生成链接
const shareLink = generateCartShareLink(testCart);
console.log('分享链接:', shareLink);

// 模拟页面跳转后解析
// 假设当前 URL 是 shareLink
const parsedCart = parseCartFromURL();
console.log('解析结果:', parsedCart);
console.log('数据一致:', JSON.stringify(testCart) === JSON.stringify(parsedCart));
```

<details>
<summary>参考答案</summary>

```javascript
function generateCartShareLink(cart) {
  const cartJson = JSON.stringify(cart);
  const encodedCart = encodeURIComponent(cartJson);

  // 假设分享页面是当前页面
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?cart=${encodedCart}`;
}

function parseCartFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const encodedCart = params.get('cart');

    if (!encodedCart) {
      return null;
    }

    const cartJson = decodeURIComponent(encodedCart);
    return JSON.parse(cartJson);
  } catch (error) {
    console.error('解析购物车数据失败:', error);
    return null;
  }
}
```

**关键点**：
- `encodeURIComponent` 编码 JSON 字符串，避免 URL 中的特殊字符（如 `&`、`=`）破坏参数结构
- `decodeURIComponent` 解码后再 `JSON.parse`
- 始终使用 `try-catch` 包裹解析逻辑，防止无效数据导致页面崩溃
</details>

---

## 第三部分：三种存储方案对比与实战

### 3.1 方案概览

| 特性 | **Cookie** | **LocalStorage** | **SessionStorage** |
|------|------------|-------------------|-------------------|
| **容量** | ~4KB | ~5-10MB | ~5-10MB |
| **生命周期** | 可设置过期时间 | 永久保存 | 页面关闭即清除 |
| **作用域** | 可设置domain/path | 同源窗口共享 | 仅当前标签页 |
| **请求携带** | 自动携带 | 不自动携带 | 不自动携带 |
| **数据类型** | 字符串 | 字符串（需JSON转换） | 字符串（需JSON转换） |

### 3.2 使用场景速查

```javascript
// Cookie - 服务器需要读取的数据
// 例如：身份认证令牌（每次请求自动携带）
const date = new Date();
date.setTime(date.getTime() + (1 * 1000));
document.cookie = `username=John Doe; expires=${date.toUTCString()}; path=/`;

// LocalStorage - 长期保存的客户端数据
// 例如：用户偏好设置、购物车数据、缓存
localStorage.setItem('theme', 'dark');
localStorage.setItem('cart', JSON.stringify([{id: 1, qty: 2}]));

// SessionStorage - 临时数据
// 例如：表单草稿、多步骤向导、防止重复提交
sessionStorage.setItem('formDraft', JSON.stringify({step: 2, data: {...}}));
```

---

### 刻意练习 3：三种存储方案实战

#### Level 1：基础操作（模仿练习）

**任务**：完成 `ShoppingCartStorage` 类的基础方法，实现购物车的保存和读取。

```javascript
class ShoppingCartStorage {
  constructor(storageKey = 'shopping_cart') {
    this.key = storageKey;
  }

  /**
   * 保存购物车到 LocalStorage
   * @param {Object} cart - 购物车数据
   */
  save(cart) {
    // TODO: 将 cart 序列化并保存到 LocalStorage
  }

  /**
   * 从 LocalStorage 读取购物车
   * @returns {Object|null} 购物车数据或 null
   */
  load() {
    // TODO: 从 LocalStorage 读取并反序列化
    // 如果数据不存在，返回 null
  }

  /**
   * 清空购物车存储
   */
  clear() {
    // TODO: 从 LocalStorage 移除购物车数据
  }
}

// ===== 测试用例 =====
const storage = new ShoppingCartStorage();

const testCart = {
  items: [
    { id: 1, name: '手机', price: 2999, qty: 1 },
    { id: 2, name: '耳机', price: 199, qty: 2 }
  ],
  total: 3397
};

// 测试保存
storage.save(testCart);
console.log('已保存购物车');

// 测试读取
const loaded = storage.load();
console.log('读取结果:', loaded);
console.log('数据一致:', JSON.stringify(testCart) === JSON.stringify(loaded));

// 测试清空
storage.clear();
console.log('清空后读取:', storage.load()); // 应为 null
```

<details>
<summary>参考答案</summary>

```javascript
class ShoppingCartStorage {
  constructor(storageKey = 'shopping_cart') {
    this.key = storageKey;
  }

  save(cart) {
    const jsonStr = JSON.stringify(cart);
    localStorage.setItem(this.key, jsonStr);
  }

  load() {
    const jsonStr = localStorage.getItem(this.key);
    if (jsonStr === null) {
      return null;
    }
    return JSON.parse(jsonStr);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
```

**关键点**：
- `JSON.stringify()` 保存，`JSON.parse()` 读取
- 读取时检查是否为 `null`（key 不存在）
- 使用 `localStorage.removeItem()` 清除特定 key
</details>

---

#### Level 2：完整存储管理器（变式练习）

**任务**：扩展存储类，支持多种存储方式（LocalStorage / SessionStorage / Cookie），并添加错误处理。

```javascript
class DataStorageManager {
  /**
   * @param {string} type - 存储类型: 'local' | 'session' | 'cookie'
   * @param {string} prefix - key 前缀（可选，用于命名空间）
   */
  constructor(type = 'local', prefix = '') {
    this.type = type;
    this.prefix = prefix;

    // 根据类型选择存储引擎
    switch (type) {
      case 'local':
        this.engine = localStorage;
        break;
      case 'session':
        this.engine = sessionStorage;
        break;
      case 'cookie':
        this.engine = null; // Cookie 需要特殊处理
        break;
      default:
        throw new Error(`不支持的存储类型: ${type}`);
    }
  }

  /**
   * 生成完整的 key（带前缀）
   */
  _getKey(key) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }

  /**
   * 保存数据
   * @param {string} key
   * @param {*} value - 任意类型（会被 JSON 序列化）
   * @param {Object} options - 额外选项（如 Cookie 的过期时间）
   * @returns {boolean} 是否成功
   */
  set(key, value, options = {}) {
    // TODO: 实现保存逻辑
    // 1. 处理 Cookie 类型（特殊处理）
    // 2. 其他类型使用 engine.setItem
    // 3. value 需要 JSON 序列化
    // 4. 添加 try-catch 处理存储容量超限等错误
    // 5. 返回布尔值表示是否成功
  }

  /**
   * 读取数据
   * @param {string} key
   * @param {*} defaultValue - 默认值
   * @returns {*} 解析后的数据或默认值
   */
  get(key, defaultValue = null) {
    // TODO: 实现读取逻辑
    // 1. 获取存储的字符串
    // 2. 如果为 null，返回 defaultValue
    // 3. 尝试 JSON.parse 解析
    // 4. 添加 try-catch，解析失败返回 defaultValue
  }

  /**
   * 删除数据
   * @param {string} key
   */
  remove(key) {
    // TODO: 实现删除逻辑
  }

  /**
   * 清空所有数据（仅限当前前缀）
   */
  clear() {
    // TODO: 实现清空逻辑
    // 注意：只清除当前前缀的数据，不要清除其他数据
  }
}

// ===== 测试用例 =====

// 测试 LocalStorage
const localStore = new DataStorageManager('local', 'app');
localStore.set('user', { id: 1, name: '张三' });
console.log('LocalStorage 读取:', localStore.get('user'));

// 测试 SessionStorage
const sessionStore = new DataStorageManager('session');
sessionStore.set('tempData', { step: 2, draft: '未完成的表单' });
console.log('SessionStorage 读取:', sessionStore.get('tempData'));

// 测试错误处理
localStore.set('circular', {}); // 创建一个对象
const circular = { self: null };
circular.self = circular; // 循环引用
console.log('循环引用测试结果:', localStore.set('circular', circular)); // 应该返回 false
```

<details>
<summary>参考答案</summary>

```javascript
  set(key, value, options = {}) {
    const fullKey = this._getKey(key);

    try {
      if (this.type === 'cookie') {
        // Cookie 特殊处理
        let cookieStr = `${encodeURIComponent(fullKey)}=${encodeURIComponent(JSON.stringify(value))}`;
        if (options.expires) {
          cookieStr += `; expires=${options.expires.toUTCString()}`;
        }
        if (options.path) {
          cookieStr += `; path=${options.path}`;
        }
        document.cookie = cookieStr;
      } else {
        // LocalStorage / SessionStorage
        const jsonStr = JSON.stringify(value);
        this.engine.setItem(fullKey, jsonStr);
      }
      return true;
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
      return false;
    }
  }

  get(key, defaultValue = null) {
    const fullKey = this._getKey(key);

    try {
      let jsonStr;

      if (this.type === 'cookie') {
        // 从 document.cookie 解析
        const match = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(fullKey)}=([^;]*)`));
        jsonStr = match ? decodeURIComponent(match[1]) : null;
      } else {
        jsonStr = this.engine.getItem(fullKey);
      }

      if (jsonStr === null) {
        return defaultValue;
      }

      return JSON.parse(jsonStr);
    } catch (error) {
      console.warn(`Storage get error for key "${key}":`, error);
      return defaultValue;
    }
  }

  remove(key) {
    const fullKey = this._getKey(key);

    if (this.type === 'cookie') {
      document.cookie = `${encodeURIComponent(fullKey)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    } else {
      this.engine.removeItem(fullKey);
    }
  }

  clear() {
    if (this.type === 'cookie') {
      // Cookie 需要逐个删除，这里简化处理
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name] = cookie.trim().split('=');
        if (!this.prefix || name.startsWith(encodeURIComponent(this.prefix))) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        }
      });
    } else {
      // 只清除当前前缀的数据
      if (this.prefix) {
        for (let i = this.engine.length - 1; i >= 0; i--) {
          const key = this.engine.key(i);
          if (key && key.startsWith(this.prefix + ':')) {
            this.engine.removeItem(key);
          }
        }
      } else {
        this.engine.clear();
      }
    }
  }
```

**关键点**：
- 使用 `try-catch` 包裹所有可能出错的操作
- Cookie 需要特殊处理（编码、过期时间、路径）
- `clear()` 方法要考虑前缀，避免误删其他数据
- 提供默认值参数，让调用方控制失败行为
</details>

---

#### Level 3：表单草稿自动保存（综合挑战）

**任务**：使用 SessionStorage 实现表单草稿自动保存功能。用户在填写表单时，即使意外关闭页面，重新打开也能恢复数据。

```javascript
/**
 * 表单草稿管理器
 * 使用 SessionStorage 实现自动保存和恢复
 */
class FormDraftManager {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    this.storageKey = options.storageKey || `formDraft_${formId}`;
    this.excludeFields = options.excludeFields || ['password', 'token', 'creditCard'];
    this.autoSaveInterval = options.autoSaveInterval || 3000; // 默认 3 秒
    this.timer = null;

    if (!this.form) {
      throw new Error(`Form with id "${formId}" not found`);
    }

    this.init();
  }

  /**
   * 初始化：绑定事件和恢复数据
   */
  init() {
    // TODO: 绑定事件监听
    // 1. 监听表单输入事件，触发自动保存（防抖）
    // 2. 页面加载时尝试恢复草稿
    // 3. 表单提交时清除草稿
  }

  /**
   * 收集表单数据
   * @returns {Object} 表单数据对象
   */
  collectData() {
    // TODO: 收集表单数据
    // 1. 遍历表单所有字段
    // 2. 跳过 excludeFields 中的敏感字段
    // 3. 支持不同类型字段（input、select、textarea、checkbox、radio）
    // 4. 返回数据对象
  }

  /**
   * 保存草稿到 SessionStorage
   */
  save() {
    // TODO: 实现保存逻辑
    // 1. 收集表单数据
    // 2. 添加时间戳
    // 3. 序列化并保存到 SessionStorage
    // 4. 可选：触发保存成功提示（非阻塞）
  }

  /**
   * 从 SessionStorage 恢复草稿
   * @returns {boolean} 是否成功恢复
   */
  restore() {
    // TODO: 实现恢复逻辑
    // 1. 从 SessionStorage 读取草稿
    // 2. 如果不存在，返回 false
    // 3. 解析数据并填充到表单
    // 4. 处理字段类型匹配
    // 5. 可选：显示恢复提示，让用户确认是否使用草稿
    // 6. 返回 true
  }

  /**
   * 清除草稿
   */
  clear() {
    // TODO: 实现清除逻辑
    // 1. 从 SessionStorage 移除草稿
    // 2. 清除定时器
  }

  /**
   * 销毁管理器，清理资源
   */
  destroy() {
    // TODO: 实现销毁逻辑
    // 1. 清除定时器
    // 2. 解绑所有事件监听
  }
}

// ===== 使用示例 =====
/*
HTML 结构：
<form id="orderForm">
  <input type="text" name="username" placeholder="用户名">
  <input type="email" name="email" placeholder="邮箱">
  <select name="payment">
    <option value="">选择支付方式</option>
    <option value="alipay">支付宝</option>
    <option value="wechat">微信支付</option>
  </select>
  <textarea name="notes" placeholder="备注"></textarea>
  <input type="password" name="password" placeholder="密码（不保存）">
  <button type="submit">提交订单</button>
</form>

JavaScript：
const formManager = new FormDraftManager('orderForm', {
  excludeFields: ['password'],
  autoSaveInterval: 2000
});

// 表单提交时清除草稿
document.getElementById('orderForm').addEventListener('submit', () => {
  formManager.clear();
});
*/
```

<details>
<summary>参考答案（完整实现）</summary>

```javascript
class FormDraftManager {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    this.storageKey = options.storageKey || `formDraft_${formId}`;
    this.excludeFields = options.excludeFields || ['password', 'token', 'creditCard'];
    this.autoSaveInterval = options.autoSaveInterval || 3000;
    this.timer = null;
    this.eventHandlers = [];

    if (!this.form) {
      throw new Error(`Form with id "${formId}" not found`);
    }

    this.init();
  }

  init() {
    // 绑定输入事件（防抖）
    const inputHandler = this.debounce(() => this.scheduleSave(), 300);
    this.form.addEventListener('input', inputHandler);
    this.eventHandlers.push({ element: this.form, type: 'input', handler: inputHandler });

    // 页面加载时恢复草稿
    this.restore();
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  scheduleSave() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.save(), this.autoSaveInterval);
  }

  collectData() {
    const data = {};
    const elements = this.form.querySelectorAll('input, select, textarea');

    elements.forEach(element => {
      const name = element.name;
      if (!name || this.excludeFields.includes(name)) return;

      const type = element.type;

      if (type === 'checkbox') {
        // 多选框：收集所有选中值
        if (!data[name]) data[name] = [];
        if (element.checked) data[name].push(element.value);
      } else if (type === 'radio') {
        // 单选框：只保存选中值
        if (element.checked) data[name] = element.value;
      } else {
        // 其他：直接保存值
        data[name] = element.value;
      }
    });

    return data;
  }

  save() {
    try {
      const data = this.collectData();
      const draft = {
        data,
        timestamp: Date.now(),
        url: window.location.href
      };
      sessionStorage.setItem(this.storageKey, JSON.stringify(draft));
    } catch (error) {
      console.error('保存草稿失败:', error);
    }
  }

  restore() {
    try {
      const draftJson = sessionStorage.getItem(this.storageKey);
      if (!draftJson) return false;

      const draft = JSON.parse(draftJson);
      const data = draft.data;

      // 填充表单
      Object.keys(data).forEach(name => {
        const value = data[name];
        const elements = this.form.querySelectorAll(`[name="${name}"]`);

        if (elements.length === 0) return;

        const firstElement = elements[0];
        const type = firstElement.type;

        if (type === 'checkbox') {
          // 多选框
          elements.forEach(el => {
            el.checked = value.includes(el.value);
          });
        } else if (type === 'radio') {
          // 单选框
          elements.forEach(el => {
            el.checked = el.value === value;
          });
        } else {
          // 其他
          firstElement.value = value;
        }
      });

      // 可以在这里添加提示："已恢复上次编辑的内容"
      console.log('草稿已恢复，保存时间:', new Date(draft.timestamp).toLocaleString());
      return true;
    } catch (error) {
      console.error('恢复草稿失败:', error);
      return false;
    }
  }

  clear() {
    sessionStorage.removeItem(this.storageKey);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  destroy() {
    this.clear();
    this.eventHandlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler);
    });
    this.eventHandlers = [];
  }
}

// 导出供使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataStorageManager: FormDraftManager, FormDraftManager };
}
```

**关键点**：
- 使用 `sessionStorage` 存储草稿（页面关闭后自动清理）
- 收集数据时处理各种表单元素类型（input、select、textarea、checkbox、radio）
- 使用防抖（debounce）避免频繁保存
- 恢复时保持元素类型匹配
- 提供完整的生命周期管理（destroy 清理资源）
</details>

---

## 项目实战：完整购物车数据持久化

综合运用本章所有知识点，实现一个完整的购物车数据持久化方案。

### 功能需求

1. **长期存储**：使用 LocalStorage 保存购物车，刷新页面数据不丢失
2. **分享功能**：使用 URL 参数实现购物车分享
3. **草稿保存**：使用 SessionStorage 保存订单表单草稿

### 项目结构

```
project/
├── index.html          # 购物车页面
├── checkout.html       # 订单填写页面
├── css/
│   └── style.css
└── js/
    ├── cart.js         # 购物车逻辑
    ├── storage.js      # 存储管理器（本章练习成果）
    └── draft.js        # 表单草稿管理
```

### 核心代码框架

```javascript
// js/cart.js - 购物车核心逻辑

class ShoppingCart {
  constructor() {
    this.items = [];
    this.storage = new DataStorageManager('local', 'cart');
    this.load();
  }

  // 添加商品
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.qty += product.qty;
    } else {
      this.items.push({ ...product });
    }
    this.save();
  }

  // 从 LocalStorage 加载
  load() {
    const data = this.storage.get('items', []);
    this.items = Array.isArray(data) ? data : [];
  }

  // 保存到 LocalStorage
  save() {
    this.storage.set('items', this.items);
  }

  // 生成分享链接
  generateShareLink() {
    return generateCartShareLink({ items: this.items });
  }

  // 从 URL 恢复购物车（用于分享）
  loadFromURL() {
    const sharedCart = parseCartFromURL();
    if (sharedCart && sharedCart.items) {
      this.items = sharedCart.items;
      this.save();
      return true;
    }
    return false;
  }
}
```

---

## 总结与自查清单

### 核心知识点回顾

| 知识点 | 关键方法 | 用途 |
|--------|----------|------|
| **JSON 序列化** | `JSON.stringify(obj)` | 对象 → 字符串，用于存储/传输 |
| **JSON 反序列化** | `JSON.parse(str)` | 字符串 → 对象，用于读取/使用 |
| **URL 参数构建** | `URLSearchParams.append()` | 构造查询字符串 |
| **URL 参数解析** | `URLSearchParams.get()` | 获取 URL 中的参数值 |
| **LocalStorage** | `setItem/getItem/removeItem` | 永久存储，同源共享 |
| **SessionStorage** | `setItem/getItem/removeItem` | 临时存储，标签页隔离 |
| **Cookie** | `document.cookie` | 服务器通信，自动携带 |

### 自查清单

完成本章学习后，检查你是否能够：

- [ ] **JSON 操作**：给定任意 JavaScript 对象，能够正确地将其序列化为 JSON 字符串，并能从 JSON 字符串还原为对象
- [ ] **错误处理**：在 JSON.parse 失败时，能够优雅地处理错误，不让应用崩溃
- [ ] **URL 参数**：能够使用 URLSearchParams 构建和解析 URL 查询参数，理解 encodeURIComponent 的作用
- [ ] **LocalStorage**：能够实现数据的持久化存储，刷新页面后数据不丢失
- [ ] **SessionStorage**：理解其生命周期特性，能够在合适场景下使用（如表单草稿）
- [ ] **方案选择**：面对具体场景，能够判断应该使用哪种存储方案


---

## 附录：常见问题与解决方案

### Q1: LocalStorage 存储容量超出怎么办？

```javascript
function setWithQuotaCheck(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      // 容量已满，尝试清理旧数据或提示用户
      console.error('LocalStorage 容量已满');
      return false;
    }
    throw e;
  }
}
```

### Q2: 如何实现 LocalStorage 的跨标签页同步？

```javascript
// 监听 storage 事件（同一域名下的其他标签页修改 LocalStorage 时触发）
window.addEventListener('storage', (event) => {
  console.log('key:', event.key);           // 被修改的 key
  console.log('oldValue:', event.oldValue); // 旧值
  console.log('newValue:', event.newValue); // 新值
  console.log('url:', event.url);           // 触发修改的页面 URL

  // 可以在这里更新页面状态，实现多标签页同步
  if (event.key === 'shopping_cart') {
    updateCartUI(JSON.parse(event.newValue));
  }
});
```

### Q3: 如何在无痕/隐私模式下优雅降级？

```javascript
function isStorageAvailable(type) {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// 使用：在隐私模式下自动降级到内存存储
class FallbackStorage {
  constructor() {
    this.memory = new Map();
    this.hasLocalStorage = isStorageAvailable('localStorage');
  }

  setItem(key, value) {
    if (this.hasLocalStorage) {
      localStorage.setItem(key, value);
    } else {
      this.memory.set(key, value);
    }
  }

  getItem(key) {
    if (this.hasLocalStorage) {
      return localStorage.getItem(key);
    }
    return this.memory.get(key) || null;
  }
}
```

---
title: "JavaScript 事件处理"
lectureNumber: 4
week: 4
module: "JavaScript基础"
description: "事件驱动模型、事件监听器、用户交互处理、事件冒泡与捕获"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture02", "lecture03"]
tags: ["JavaScript", "事件", "DOM", "交互"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture04
hasAssignment: true
draft: false
---


> **本章目标**：理解 JavaScript 事件驱动模型，掌握事件监听器的注册与使用，能够处理用户交互。

---

## 学习目标

- 理解 JavaScript 事件驱动编程模型
- 掌握 `addEventListener` 与 `onclick` 的区别
- 学会使用 Event 对象获取事件信息
- 能够处理常见的鼠标和键盘事件

---

## 一、事件驱动编程

### 1.1 从顺序执行到事件驱动

传统的 JavaScript 代码是**顺序执行**的：

```js
let name = 'zhangsan';
const hour = new Date().getHours();
let timeGreeting = hour < 18 && hour >= 6 ? '白天好' : '晚上好';
console.log(`${timeGreeting}, ${name}`);
// 代码运行结束，页面就"静止"了
```

但网页是**交互式**的——用户会点击、输入、滚动。如何让代码"响应"这些动作？

---

### 1.2 费曼技巧：门卫的故事

想象你雇佣了一个门卫看守大门。但这个门卫很特别——**他一直在睡觉**。

为什么？因为每秒都盯着大门看会让人筋疲力尽。他只会在门铃响时才醒来。

**门卫的一天：**
> 😴 😴 😴 [**叮咚！**] 🏃 [去开门] 😴 😴 😴

这就是程序的工作方式：
- 程序"休眠"，等待
- 某事发生——点击、定时器、消息
- 程序"唤醒"并执行代码

| 门卫类比 | 程序中的概念 |
|---------|------------|
| 有人按门铃 | **事件触发**（点击、按键、加载完成） |
| 铃声唤醒门卫 | **事件监听**（浏览器通知程序） |
| 门卫开门说"你好" | **事件处理**（执行回调函数） |

**核心洞察**：程序不会主动"盯着"用户，而是被动**响应**信号。

---

## 二、事件监听器基础

### 2.1 第一个事件监听器

```html
<button id="btn">点击我</button>
```

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f5f5f5;
}
```

```js
// 'click' 是来自浏览器的信号
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  console.log('按钮被点击了！');
});
```

---

### 2.2 两种注册方式对比

| 方式 | 语法 | 特点 |
|-----|------|------|
| `onclick` 属性 | `btn.onclick = fn` | 只能绑定一个处理器，后覆盖前 |
| `addEventListener` | `btn.addEventListener('click', fn)` | 可绑定多个，不会被覆盖 |

```js
const btn = document.querySelector('#btn');

// ❌ onclick：第二次赋值会静默覆盖第一次
btn.onclick = () => console.log('处理器 A');
btn.onclick = () => console.log('处理器 B'); // A 消失了

// ✅ addEventListener：两个都会执行
btn.addEventListener('click', () => console.log('处理器 A'));
btn.addEventListener('click', () => console.log('处理器 B')); // A 仍然在
```

![[Pasted image 20260324164107.png]]

![[Pasted image 20260324164052.png]]

**最佳实践**：始终使用 `addEventListener`。

---

## 三、Event 对象

### 3.1 什么是 Event 对象？

当事件触发时，浏览器自动创建一个 **Event 对象**，作为参数传递给事件处理函数。

```js
const btn = document.querySelector('#btn');

// 注意：回调函数接收一个参数（通常命名为 e 或 event）
btn.addEventListener('click', (e) => {
  // 每个事件都有的核心属性
  console.log(e.type);           // "click" —— 发生了什么
  console.log(e.target);         // <button> —— 被点击的元素
  console.log(e.currentTarget);  // <button> —— 绑定监听器的元素
  console.log(e.timeStamp);      // 1234.56 —— 页面加载后的毫秒数

  // 鼠标事件特有属性
  console.log(e.clientX, e.clientY);  // 视口坐标
  console.log(e.pageX, e.pageY);      // 文档坐标
});
```

---

### 3.2 常用 Event 属性速查

| 属性 | 说明 | 适用事件 |
|-----|------|---------|
| `e.target` | 实际触发事件的元素 | 所有 |
| `e.currentTarget` | 绑定监听器的元素 | 所有 |
| `e.type` | 事件类型（如 "click"） | 所有 |
| `e.clientX/Y` | 鼠标在视口中的位置 | 鼠标事件 |
| `e.key` | 按下的键值（如 "Enter"） | 键盘事件 |
| `e.code` | 物理键位（如 "KeyA"） | 键盘事件 |

---

## 四、刻意练习

### 练习 1：基础事件绑定（模仿练习）

**目标**：为按钮绑定点击事件，点击后在控制台输出 "Hello World"。

**任务说明**：
补全以下代码中的 `// TODO` 部分。

```html
<button id="greetBtn">打招呼</button>
```

```js
// 1. 获取按钮元素
// TODO: 使用 querySelector 获取 id 为 greetBtn 的按钮
const btn = ________________;

// 2. 添加点击事件监听器
// TODO: 使用 addEventListener 绑定 click 事件
// 回调函数中 console.log("Hello World")
________________;
```

<details>
<summary>参考答案</summary>

```js
const btn = document.querySelector('#greetBtn');

btn.addEventListener('click', () => {
  console.log("Hello World");
});
```
</details>

---

### 练习 2：使用 Event 对象（独立练习）

**目标**：创建一个按钮，点击时显示鼠标点击位置的坐标。

**要求**：
1. 创建一个按钮，文字为"显示坐标"
2. 点击按钮时，在控制台输出：`"点击位置: x=100, y=200"`（使用实际坐标值）

**提示**：使用 `e.clientX` 和 `e.clientY` 获取坐标。

<details>
<summary>参考答案</summary>

```html
<button id="posBtn">显示坐标</button>
```

```js
const btn = document.querySelector('#posBtn');

btn.addEventListener('click', (e) => {
  console.log(`点击位置: x=${e.clientX}, y=${e.clientY}`);
});
```
</details>

---

### 练习 3：多个监听器对比（应用练习）

**目标**：验证 `onclick` 和 `addEventListener` 的区别。

**要求**：
1. 创建一个按钮，id 为 `testBtn`
2. 使用 `onclick` 绑定两个处理器：分别输出 "First" 和 "Second"
3. 使用 `addEventListener` 绑定两个处理器：分别输出 "Third" 和 "Fourth"
4. 观察控制台输出顺序

**预期结果**：
- 先输出 "Second"（覆盖了 First）
- 然后输出 "Third" 和 "Fourth"（两个都执行）

---

## 五、常见事件类型

### 5.1 鼠标事件

```js
const box = document.querySelector('#box');

// 单击
box.addEventListener('click', (e) => console.log('单击'));

// 双击
box.addEventListener('dblclick', (e) => console.log('双击'));

// 鼠标进入/离开
box.addEventListener('mouseenter', (e) => console.log('鼠标进入'));
box.addEventListener('mouseleave', (e) => console.log('鼠标离开'));

// 鼠标移动（频繁触发，注意性能）
box.addEventListener('mousemove', (e) => {
  console.log(`位置: ${e.offsetX}, ${e.offsetY}`);
});
```

### 5.2 键盘事件

```js
const input = document.querySelector('#username');

// 按键按下
input.addEventListener('keydown', (e) => {
  console.log(`按下: ${e.key}, 键码: ${e.code}`);
});

// 按键释放
input.addEventListener('keyup', (e) => {
  console.log(`释放: ${e.key}`);
});

// 输入内容变化（常用于表单验证）
input.addEventListener('input', (e) => {
  console.log(`当前值: ${e.target.value}`);
});
```

### 5.3 表单事件

```js
const form = document.querySelector('#loginForm');

// 表单提交
form.addEventListener('submit', (e) => {
  // 阻止默认提交行为（页面刷新）
  e.preventDefault();
  console.log('表单提交被拦截');
});

// 输入框获得/失去焦点
const email = document.querySelector('#email');
email.addEventListener('focus', () => console.log('获得焦点'));
email.addEventListener('blur', () => console.log('失去焦点'));
```

---

## 六、本章小结

### 核心概念

1. **事件驱动模型**：程序被动等待事件，而非主动轮询
2. **事件监听器**：使用 `addEventListener` 绑定响应函数
3. **Event 对象**：包含事件详情的参数，常用 `e.target`、`e.clientX/Y`、`e.key`

### 最佳实践

| ✅ 应该 | ❌ 避免 |
|--------|--------|
| 使用 `addEventListener` | 使用 `onclick` 等属性 |
| 使用箭头函数或命名函数 | 在 HTML 中写内联事件 |
| 及时移除不再需要的事件监听 | 在 mousemove 中执行重操作 |

---

## 七、延伸阅读

- [MDN: Event 参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
- [MDN: addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- [JavaScript.info: 事件简介](https://zh.javascript.info/introduction-browser-events)
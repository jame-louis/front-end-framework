---
title: "JavaScript入门"
lectureNumber: 2
week: 2
module: "JavaScript基础"
description: "JavaScript基础语法、数据类型、变量声明、运算符、流程控制"
duration: "90分钟"
difficulty: "beginner"
prerequisites: ["lecture01"]
tags: ["JavaScript", "基础语法", "变量"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture02
hasAssignment: true
draft: false
---

# Javascript入门

## HTML回顾

```html
1. <!DOCTYPE html> - 声明文档类型为HTML5
2. <html lang="zh-CN"> - 根元素，lang属性指定语言（对SEO和屏幕阅读器很重要）
3. <head> - 元数据容器，存放页面配置信息
4. <meta charset="UTF-8"> - 字符编码，必须设置以避免中文乱码
5. <meta name="viewport"> - 视口设置，响应式设计的基石
6. <title> - 页面标题，显示在浏览器标签和搜索引擎结果中
7. <body> - 可见内容的容器
```

---

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>Hello HTML</h1>
    <p>这是我在学习HTML时创建的第一个网页。</p>
</body>
</html>
```

---
## Web交互

- 1994年，**网景公司**发布了浏览器**Navigator 0.9**版本。
	- 历史上第一个比较成熟的网络浏览器
	- 只能用来浏览，不具备web交互
- 两个选择（争议不断，难以抉择）：
	- 采用现有的语言，如Perl、Python、Tcl、Scheme等
	- 开发一种全新的语言

---

- 重大事件：1995年，Sun公司将Oak语言改名Java，正式推向市场。
	- “一次编写，四处运行”的承诺
	- Java程序以Applet的形式直接在浏览器中运行
	- Java脚本嵌入将致HTML过于复杂而被弃
- 1995年4月，程序员Brendan Eich入职网景
	- 研究Scheme语言作为网页脚本语言
	- 只用了10天时间便将JavaScript设计出来了

---

Web交互是指用户与网页之间的双向信息交流过程。JavaScript是实现Web交互的核心技术。

**Web交互的三要素：**

```
┌─────────────┐      事件触发       ┌─────────────┐
│   用户操作   │ ─────────────────> │  JavaScript  │
│ (点击、输入) │                    │   事件处理   │
└─────────────┘                    └──────┬──────┘
                                          │
                                          │ DOM操作
                                          ▼
                                   ┌─────────────┐
                                   │   页面反馈   │
                                   │ (更新、动画) │
                                   └─────────────┘
```

---

```html
- <button> - 按钮组件，响应鼠标事件
- <script> - 脚本内容
```
```html
<!-- button.html -->
<script>
	function sayHello() {
		alert("Hello, World!");
	}
</script>
<button onclick="sayHello()">点击我</button>
```


---

**JavaScript的核心作用：**
- **DOM操作**：动态修改页面内容和样式
- **事件处理**：响应用户交互
- **数据通信**：与服务器进行数据交换（AJAX/Fetch）
- **逻辑控制**：实现复杂的业务逻辑

---

## JavaScript入门

---
### JavaScript发展历史

```
1995年  ──>  Brendan Eich 在10天内设计出 JavaScript
   │
1997年  ──>  ECMAScript 1 发布，标准化开始
   │
2009年  ──>  ECMAScript 5 (ES5) 发布，引入严格模式
   │
2015年  ──>  ECMAScript 6 (ES6/ES2015) 发布，重大更新
   │
2016+   ──>  每年发布新版本 (ES2016, ES2017, ...)
   │
现在    ──>  ES6+ 成为现代开发标准
```

---

### JavaScript 语言特点

| 特点       | 说明           | 示例                       |
| -------- | ------------ | ------------------------ |
| **解释型**  | 无需编译，浏览器直接执行 | 直接运行.js文件                |
| **弱类型**  | 变量类型动态确定     | `let x = 1; x = "hello"` |
| **单线程**  | 同一时间只能执行一个任务 | 事件循环机制                   |
| **基于原型** | 继承通过原型链实现    | `Object.prototype`       |
| **一等函数** | 函数可作为参数和返回值  | 回调函数、高阶函数                |
| **事件驱动** | 通过事件响应用户操作   | `addEventListener`       |

---

## JavaScript基本语法

### 1. 变量与常量

JavaScript 使用三种方式声明变量：

```javascript
// var - 旧式声明（函数作用域，可重复声明）
var name = "张三";

// let - 现代声明（块级作用域，可重新赋值）
let age = 20;
age = 21; // 可以修改

// const - 常量（块级作用域，不可重新赋值）
const PI = 3.14159;
// PI = 3.14; // 错误！不能修改常量
```

**最佳实践**：优先使用 `const`，需要重新赋值时使用 `let`，避免使用 `var`。

---

### 2. 数据类型

JavaScript 有 7 种基本数据类型：

| 类型 | 示例 | 说明 |
|------|------|------|
| **Number** | `let n = 42` | 数字（整数、小数） |
| **String** | `let s = "hello"` | 字符串 |
| **Boolean** | `let b = true` | 布尔值（true/false） |
| **Undefined** | `let u` | 未定义 |
| **Null** | `let n = null` | 空值 |
| **Object** | `{name: "张三"}` | 对象 |
| **Array** | `[1, 2, 3]` | 数组 |

```javascript
// 类型检测
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
```

---

### 3. 运算符

```javascript
// 算术运算符
let sum = 10 + 5;      // 15
let diff = 10 - 5;     // 5
let product = 10 * 5;  // 50
let quotient = 10 / 5; // 2
let remainder = 10 % 3; // 1（取余）

// 比较运算符
console.log(5 == "5");   // true（值相等）
console.log(5 === "5");  // false（值和类型都相等）
console.log(5 != 3);     // true
console.log(5 > 3);      // true

// 逻辑运算符
let and = true && false; // false（与）
let or = true || false;  // true（或）
let not = !true;         // false（非）
```

---

### 4. 类型转换

```javascript
// 字符串转数字
let num1 = parseInt("42");     // 42
let num2 = parseFloat("3.14"); // 3.14
let num3 = Number("100");      // 100

// 数字转字符串
let str1 = String(42);         // "42"
let str2 = (100).toString();   // "100"
let str3 = 42 + "";            // "42"

// 隐式转换
console.log("5" + 3);  // "53"（字符串拼接）
console.log("5" - 3);  // 2（数字运算）
```

---

## 流程控制

### 1. 条件语句

```javascript
// if-else
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

// 三元运算符
let result = score >= 60 ? "通过" : "不通过";

// switch
let day = 1;
switch(day) {
    case 1:
        console.log("星期一");
        break;
    case 2:
        console.log("星期二");
        break;
    default:
        console.log("其他");
}
```

---

### 2. 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// while 循环
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// 遍历数组
let fruits = ["苹果", "香蕉", "橙子"];
for (let fruit of fruits) {
    console.log(fruit);
}

// forEach
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});
```

---

## 函数

### 1. 函数声明

```javascript
// 函数声明（提升）
function greet(name) {
    return "Hello, " + name + "!";
}

// 函数表达式
const add = function(a, b) {
    return a + b;
};

// 箭头函数（推荐）
const multiply = (a, b) => a * b;

const square = x => x * x;

// 默认参数
function greet(name = "访客") {
    return `你好，${name}！`;
}
```

---

### 2. 回调函数

```javascript
// 回调函数作为参数
function processData(data, callback) {
    let result = data.toUpperCase();
    callback(result);
}

// 使用
processData("hello", function(result) {
    console.log(result); // "HELLO"
});

// 事件回调
button.addEventListener('click', function() {
    alert('按钮被点击了！');
});
```

---

## DOM 操作

DOM（Document Object Model）是 JavaScript 与 HTML 交互的接口。

### 1. 获取元素

```javascript
// 通过 ID（返回单个元素）
const element = document.getElementById('myId');

// 通过类名（返回 HTMLCollection）
const elements = document.getElementsByClassName('myClass');

// 通过标签名
const divs = document.getElementsByTagName('div');

// 通过 CSS 选择器（推荐）
const first = document.querySelector('.myClass');
const all = document.querySelectorAll('.myClass');
```

---

### 2. 修改内容和样式

```javascript
// 修改文本内容
element.textContent = '新文本';

// 修改 HTML（注意 XSS 风险）
element.innerHTML = '<b>加粗文本</b>';

// 修改属性
element.setAttribute('data-value', '123');
element.src = 'image.jpg';

// 修改样式
element.style.color = 'red';
element.style.backgroundColor = '#f0f0f0';
element.style.fontSize = '16px';

// 添加/移除/切换 CSS 类
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');
```

---

### 3. 事件处理

```javascript
// 添加事件监听器（推荐）
button.addEventListener('click', function(event) {
    console.log('点击位置：', event.clientX, event.clientY);
});

// 常用事件类型
// click - 点击
dblclick - 双击
// mouseenter/mouseleave - 鼠标进入/离开
// keydown/keyup - 键盘按下/释放
// input - 输入框内容变化
// submit - 表单提交
// load - 页面加载完成

// 事件对象
input.addEventListener('input', function(e) {
    console.log('输入的值：', e.target.value);
});
```

---

## 程序调试

### 1. Console 控制台

```javascript
// 常用输出方法
console.log('普通日志');
console.warn('警告信息');
console.error('错误信息');
console.info('提示信息');

// 表格输出
console.table([
    { name: "张三", age: 20 },
    { name: "李四", age: 25 }
]);

// 分组输出
console.group('用户数据');
console.log('姓名：张三');
console.log('年龄：20');
console.groupEnd();

// 计时
console.time('耗时');
// ... 代码
console.timeEnd('耗时'); // 输出：耗时: Xms
```

---

### 2. 断点调试

在 Chrome DevTools 中：
1. **Sources 面板** - 找到要调试的 JavaScript 文件
2. **设置断点** - 点击行号设置断点
3. **执行代码** - 代码会在断点处暂停
4. **调试操作**
   - **Step Over (F10)** - 执行当前行，不进入函数
   - **Step Into (F11)** - 执行当前行，进入函数
   - **Step Out (Shift+F11)** - 跳出当前函数
   - **Resume (F8)** - 继续执行到下一个断点

### 3. 常见错误

```javascript
// SyntaxError - 语法错误
if (x > 5  // 缺少右括号

// ReferenceError - 引用错误
console.log(undefinedVariable);

// TypeError - 类型错误
null.toString();
[1,2,3].map(); // map 需要回调函数

// RangeError - 范围错误
let arr = new Array(-1);
```

**调试技巧**：
- 使用 `debugger;` 语句设置断点
- 检查变量类型：`console.log(typeof variable)`
- 逐步执行代码，观察变量变化
- 使用 try-catch 捕获错误

---

## JavaScript入门级应用实践

本节通过一个完整的案例**「交互式问候器」**，采用**阶梯式教学法**，从纯HTML开始，逐步添加CSS样式和JavaScript交互，帮助你理解前端开发的完整流程。

---

### 案例：交互式问候器

**项目目标**：创建一个网页，用户可以输入姓名，点击按钮后显示个性化的问候语，并实时显示当前时间。

**文件结构**：
```
lecture02-examples/greeting-steps/
├── step1-html-only.html    # 阶段1：纯HTML结构
├── step2-with-css.html     # 阶段2：添加CSS样式
├── step3-basic-js.html     # 阶段3：基础JavaScript
└── step4-complete.html     # 阶段4：完整功能
```

---

### 阶段1：纯HTML结构

**文件**：`greeting-steps/step1-html-only.html`

#### 学习目标
- 回顾HTML基本标签
- 理解HTML文档结构
- 认识常用表单元素

#### 代码解析

```html
<!DOCTYPE html>           <!-- 声明文档类型为HTML5 -->
<html lang="zh-CN">       <!-- 根元素，lang属性指定语言 -->
<head>                    <!-- 头部：包含元数据 -->
    <meta charset="UTF-8">              <!-- 字符编码 -->
    <meta name="viewport" content="..."> <!-- 视口设置 -->
    <title>阶段1：纯HTML结构</title>     <!-- 页面标题 -->
</head>
<body>                    <!-- 主体：可见内容 -->
    <h1>交互式问候器</h1>   <!-- 一级标题 -->
    <p>当前时间：加载中...</p> <!-- 段落 -->
    <div>                   <!-- 区块容器 -->
        <label>请输入您的姓名：</label>  <!-- 标签 -->
        <input type="text" placeholder="您的姓名">  <!-- 文本输入框 -->
    </div>
    <button>打招呼</button>  <!-- 按钮 -->
    <div>
        <p>请输入姓名并点击按钮</p>
    </div>
</body>
</html>
```

#### 涉及的知识点

| 标签 | 作用 |
|------|------|
| `<!DOCTYPE html>` | 声明HTML5文档类型 |
| `<html>` | HTML文档根元素 |
| `<head>` | 包含元数据（标题、编码、样式链接等） |
| `<body>` | 包含可见的页面内容 |
| `<h1>` | 一级标题（h1-h6共六级） |
| `<p>` | 段落 |
| `<div>` | 通用区块容器（用于布局和分组） |
| `<label>` | 表单控件的标签 |
| `<input>` | 输入控件（type属性决定类型） |
| `<button>` | 按钮 |

#### 课堂练习
1. 在浏览器中打开该文件，观察默认样式
2. 尝试修改`<h1>`标签内的文字
3. 添加一个`<h2>`副标题
4. 在输入框下方添加一个`<p>`标签说明文字

---

### 阶段2：添加CSS样式

**文件**：`greeting-steps/step2-with-css.html`

#### 学习目标
- 理解CSS选择器
- 掌握常用CSS属性
- 学会使用开发者工具查看样式

#### HTML变化

与阶段1相比，HTML添加了`class`和`id`属性：

```html
<div class="container">     <!-- class：类名，可重复使用 -->
    <p class="time-display" id="timeDisplay">  <!-- id：唯一标识 -->
        当前时间：加载中...
    </p>
</div>
```

#### CSS核心代码

```css
/* ===== 选择器详解 ===== */

/* 元素选择器：选中所有body元素 */
body {
    font-family: 'Microsoft YaHei', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;          /* vh：视口高度的百分比 */
    margin: 0;                  /* 去除默认边距 */
    display: flex;              /* 弹性布局 */
    justify-content: center;    /* 水平居中 */
    align-items: center;        /* 垂直居中 */
}

/* 类选择器：选中class="container"的元素 */
.container {
    background: white;
    padding: 40px;              /* 内边距 */
    border-radius: 20px;        /* 圆角 */
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);  /* 阴影 */
    text-align: center;         /* 文字居中 */
}

/* ID选择器：选中id="timeDisplay"的元素 */
#timeDisplay {
    color: #666;
    font-size: 14px;
}

/* 伪类：元素的特殊状态 */
input:focus {       /* :focus - 元素获得焦点时 */
    outline: none;
    border-color: #667eea;
}

button:hover {      /* :hover - 鼠标悬停时 */
    opacity: 0.9;
}
```

#### CSS盒模型

```
┌─────────────────────────────┐
│          margin（外边距）      │
│   ┌─────────────────────┐   │
│   │    border（边框）    │   │
│   │   ┌─────────────┐   │   │
│   │   │ padding（内边距）│   │   │
│   │   │   ┌─────┐   │   │   │
│   │   │   │内容 │   │   │   │
│   │   │   └─────┘   │   │   │
│   │   └─────────────┘   │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
```

#### 常用CSS属性速查

| 属性 | 作用 | 示例 |
|------|------|------|
| `color` | 文字颜色 | `color: red;` |
| `background` | 背景 | `background: #f0f0f0;` |
| `font-size` | 字体大小 | `font-size: 16px;` |
| `padding` | 内边距 | `padding: 20px;` |
| `margin` | 外边距 | `margin: 10px auto;` |
| `border` | 边框 | `border: 1px solid #ccc;` |
| `border-radius` | 圆角 | `border-radius: 8px;` |
| `width/height` | 宽高 | `width: 100%;` |
| `display` | 显示方式 | `display: flex;` |
| `position` | 定位 | `position: relative;` |

#### 课堂练习
1. 修改背景渐变的颜色（使用在线渐变生成工具）
2. 给容器添加一个边框
3. 修改按钮的颜色
4. 使用浏览器开发者工具（F12）查看和临时修改样式

---

### 阶段3：基础JavaScript

**文件**：`greeting-steps/step3-basic-js.html`

#### 学习目标
- 理解JavaScript与HTML的关系
- 掌握变量声明和函数定义
- 学会获取和修改DOM元素
- 理解事件监听的基本概念

#### JavaScript代码结构

```javascript
// ===== 1. 变量声明 =====

// let - 声明可变变量
let userName = "";

// const - 声明常量（不可重新赋值）
const greetingPrefix = "你好";

// var - 旧式声明方式（不推荐）
var oldStyle = "避免使用";


// ===== 2. 函数声明 =====

// 函数定义语法：
// function 函数名(参数) { 函数体 }
function sayHello() {
    // 获取输入框元素
    const inputElement = document.getElementById("nameInput");

    // 获取输入的值
    userName = inputElement.value;

    // 条件判断
    if (userName === "") {
        alert("请先输入您的姓名！");
    } else {
        // 获取结果显示元素
        const resultElement = document.getElementById("greetingText");

        // 修改元素内容
        resultElement.textContent = greetingPrefix + "，" + userName + "！";

        // 控制台输出（F12打开开发者工具查看）
        console.log("问候成功：" + userName);
    }
}


// ===== 3. DOM操作核心方法 =====

// 通过ID获取元素（最常用）
document.getElementById("id名称")

// 通过class获取元素（返回数组）
document.getElementsByClassName("class名称")

// 通过CSS选择器获取（现代浏览器推荐）
document.querySelector("选择器")      // 获取第一个
document.querySelectorAll("选择器")  // 获取所有


// ===== 4. 修改元素内容 =====

element.textContent = "纯文本内容";   // 安全，不解析HTML
element.innerHTML = "<b>HTML内容</b>"; // 解析HTML（注意XSS风险）


// ===== 5. 定时器 =====

// 每隔1000毫秒（1秒）执行一次updateTime函数
setInterval(updateTime, 1000);
```

#### HTML中的事件绑定

```html
<!-- 方式1：HTML属性（简单但不够灵活） -->
<button onclick="sayHello()">打招呼</button>

<!-- 方式2：JavaScript中添加（推荐） -->
<button id="greetBtn">打招呼</button>
<script>
    document.getElementById("greetBtn").addEventListener("click", sayHello);
</script>
```

#### 调试技巧

```javascript
// 在控制台输出信息
console.log("普通日志");
console.warn("警告信息");
console.error("错误信息");

// 查看元素
element = document.getElementById("nameInput");
console.log(element);
console.dir(element);  // 详细的对象信息

// 断点调试：在代码中添加
debugger;  // 执行到这里会暂停，打开开发者工具查看
```

#### 课堂练习
1. 在控制台使用`document.getElementById`获取元素
2. 尝试修改`textContent`和`innerHTML`的区别
3. 添加一个新的函数，清空输入框和结果
4. 在按钮旁添加一个新按钮，调用清空函数

---

### 阶段4：完整功能

**文件**：`greeting-steps/step4-complete.html`

#### 学习目标
- 综合运用HTML、CSS、JavaScript
- 掌握模板字符串语法
- 理解事件对象
- 学会代码组织和优化

#### 新增功能

**1. 智能时段问候**
```javascript
function getGreetingByTime() {
    const hour = new Date().getHours();

    // 多条件判断
    if (hour < 6) {
        return { text: '夜深了', emoji: '🌙' };
    } else if (hour < 9) {
        return { text: '早上好', emoji: '🌅' };
    } else if (hour < 12) {
        return { text: '上午好', emoji: '☀️' };
    } else if (hour < 14) {
        return { text: '中午好', emoji: '🌞' };
    } else if (hour < 18) {
        return { text: '下午好', emoji: '🌤️' };
    } else {
        return { text: '晚上好', emoji: '🌆' };
    }
}
```

**2. 模板字符串（ES6）**
```javascript
// 旧方式：字符串拼接
const message = greeting + "，" + name + "！";

// 新方式：模板字符串（使用反引号`）
const message = `${greeting}，<span class="name">${name}</span>！`;
```

**3. 键盘事件监听**
```javascript
// 监听输入框的回车键
input.addEventListener('keypress', function(event) {
    // event对象包含事件信息
    console.log(event.key);      // 按下的键
    console.log(event.code);     // 键的代码
    console.log(event.target);   // 触发事件的元素

    if (event.key === 'Enter') {
        sayHello();
    }
});
```

**4. 输入实时反馈**
```javascript
// input事件：输入框内容变化时触发
input.addEventListener('input', function() {
    // this指向事件绑定的元素
    const value = this.value.trim();

    if (value === '') {
        greetingText.textContent = '请输入姓名并点击按钮';
    }
});
```

#### 完整代码流程图

```
用户打开页面
    ↓
显示当前时间（每秒更新）
    ↓
用户输入姓名
    ↓
├─ 按回车键 ──→ 触发问候
└─ 点击按钮 ──→ 触发问候
    ↓
判断输入是否为空
    ↓
是 → 显示警告
否 → 根据时间生成问候语
    ↓
显示个性化问候 + 表情
```

#### 代码优化建议

```javascript
// 优化1：使用严格模式
"use strict";

// 优化2：常量集中管理
const CONFIG = {
    MAX_NAME_LENGTH: 20,
    DEFAULT_MESSAGE: '请输入姓名并点击按钮'
};

// 优化3：函数单一职责
function getInputValue() { ... }
function validateInput(value) { ... }
function displayResult(message) { ... }

// 优化4：防抖处理（输入频繁时）
let timeout;
input.addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // 延迟执行
    }, 300);
});
```

---

### 学习检查清单

完成本案例后，你应该能够：

- [ ] 写出完整的HTML5文档结构
- [ ] 使用CSS选择器选中元素并添加样式
- [ ] 理解盒模型的概念（margin、border、padding、content）
- [ ] 使用`let`和`const`声明变量
- [ ] 编写简单的函数
- [ ] 使用`document.getElementById`获取DOM元素
- [ ] 修改元素的内容和样式
- [ ] 添加点击事件监听器
- [ ] 使用`setInterval`创建定时器
- [ ] 使用`Date`对象获取时间信息

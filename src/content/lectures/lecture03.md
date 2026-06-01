---
title: "JavaScript面向对象编程与内置对象"
lectureNumber: 3
week: 3
module: "JavaScript基础"
description: "面向对象三大特性、ES6 Class语法、继承机制、常用内置对象"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture02"]
tags: ["JavaScript", "面向对象", "Class", "内置对象"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture03
hasAssignment: true
draft: false
---


## 学习目标

- 理解面向对象编程的基本思想和三大特性（封装、继承、多态）
- 掌握ES6 Class语法和继承机制
- 熟练使用String、Array、Math、Date等内置对象
- 理解BOM浏览器对象模型及其常用API
- 掌握DOM文档对象模型的选择和操作方法

---

## 一、面向对象编程概述

### 1.1 从过程式到面向对象

**传统方式的问题**：

```javascript
const name = "张三";
const age = 20;
const major = "计算机科学";
const introduction = `我叫${name}，${age}岁，专业是${major}`;
console.log(introduction);

// 第二个学生需要重新定义变量
const name2 = "李四";
const age2 = 21;
const major2 = "通信工程";
```

**存在的问题**：
- 代码冗余：重复定义相似变量
- 数据混乱：变量之间没有关联
- 紧耦合：数据和逻辑分离

### 1.2 面向对象解决方案

```javascript
const student = {
    name: '张三',
    age: 20,
    major: '计算机科学',
    // 方法
    introduce() {
        return `我叫${this.name}，${this.age}岁，专业是${this.major}`;
    }
};

// 访问属性和方法
console.log(student.introduce()); // 我叫张三，20岁，专业是计算机科学
```

### 1.3 什么是面向对象编程

**面向对象编程（OOP）** 是一种程序设计范式，将数据和方法组织在一起，形成"对象"。

#### 三大特性

| 特性 | 说明 | 作用 |
|------|------|------|
| **封装** | 将数据和方法包装在对象中，隐藏内部细节 | 提高代码安全性和可维护性 |
| **继承** | 子类继承父类的属性和方法 | 实现代码复用 |
| **多态** | 同一接口不同实现，根据对象类型调用不同方法 | 提高代码灵活性 |

---

## 二、JavaScript对象创建方式

### 2.1 对象字面量

```javascript
const student = {
    name: '张三',
    age: 20,
    study() {
        console.log(`${this.name}正在学习`);
    }
};

student.study();  // 张三正在学习
```

### 2.2 ES6 Class语法

更简洁、更直观的面向对象写法：

```javascript
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    study() {
        console.log(`${this.name}正在学习`);
    }
    
    // 静态方法
    static isStudent(obj) {
        return obj instanceof Student;
    }
}

// 创建实例
const s1 = new Student('张三', 20);
s1.study();  // 张三正在学习
console.log(Student.isStudent(s1));  // true
```

### 2.3 Class继承

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `我叫${this.name}，${this.age}岁`;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);  // 调用父类构造函数
        this.major = major;
    }
    
    study() {
        console.log(`${this.name}学习${this.major}`);
    }
    
    // 重写父类方法
    introduce() {
        return `${super.introduce()}，专业是${this.major}`;
    }
}

const s = new Student('张三', 20, '计算机科学');
console.log(s.introduce());  // 我叫张三，20岁，专业是计算机科学
```

### 2.4 多态示例

教学系统用户登录示例：

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    
    login() {
        console.log(`${this.name}登录系统`);
    }
}

class Student extends Person {
    login() {
        console.log(`学生 ${this.name} 登录了教学系统`);
    }
}

class Teacher extends Person {
    login() {
        console.log(`教师 ${this.name} 登录了教学系统`);
    }
}

// 统一调用接口
const login = (user) => user.login();

const s = new Student('张三');
const t = new Teacher('王五');

login(s);  // 学生 张三 登录了教学系统
login(t);  // 教师 王五 登录了教学系统
```

---

## 三、JavaScript内置对象

### 3.1 String字符串对象

| 方法 | 说明 | 示例 |
|------|------|------|
| `length` | 字符串长度 | `"Hello".length` → `5` |
| `indexOf()` | 查找子串索引 | `"Hello".indexOf("l")` → `2` |
| `includes()` | 是否包含子串 | `"Hello".includes("ll")` → `true` |
| `slice()` | 截取子串 | `"Hello".slice(1, 4)` → `"ell"` |
| `substring()` | 截取子串 | `"Hello".substring(1, 4)` → `"ell"` |
| `toUpperCase()` | 转大写 | `"hello".toUpperCase()` → `"HELLO"` |
| `toLowerCase()` | 转小写 | `"HELLO".toLowerCase()` → `"hello"` |
| `split()` | 分割字符串 | `"a,b,c".split(",")` → `["a","b","c"]` |
| `trim()` | 去除两端空白 | `" hello ".trim()` → `"hello"` |

```javascript
const str = "Hello, JS!";

console.log(str.length);           // 10
console.log(str.slice(7, 9));      // "JS"
console.log(str.split(", "));      // ["Hello", "JS!"]

// 模板字符串
const name = "张三";
console.log(`你好，${name}！`);     // 你好，张三！
```

### 3.2 Array数组对象

| 方法 | 说明 |
|------|------|
| `push()` / `pop()` | 尾部添加/删除 |
| `unshift()` / `shift()` | 头部添加/删除 |
| `forEach()` | 遍历数组 |
| `map()` | 映射为新数组 |
| `filter()` | 过滤元素 |
| `find()` / `findIndex()` | 查找元素 |
| `reduce()` | 累计计算 |
| `sort()` | 排序 |
| `includes()` | 判断是否包含 |

```javascript
const numbers = [1, 2, 3, 4, 5];

// 添加删除
numbers.push(6);        // [1,2,3,4,5,6]
numbers.pop();          // [1,2,3,4,5]

// 遍历
numbers.forEach(n => console.log(n));

// 映射
const doubled = numbers.map(n => n * 2);  // [2,4,6,8,10]

// 过滤
const evens = numbers.filter(n => n % 2 === 0);  // [2,4]

// 查找
const first = numbers.find(n => n > 3);  // 4

// 累计
const sum = numbers.reduce((total, n) => total + n, 0);  // 15
```

### 3.3 Math数学对象

#### 常量

```javascript
Math.PI;    // 3.141592653589793
Math.E;     // 2.718281828459045
```

#### 取整方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `Math.round()` | 四舍五入 | `Math.round(3.7)` → `4` |
| `Math.floor()` | 向下取整 | `Math.floor(3.7)` → `3` |
| `Math.ceil()` | 向上取整 | `Math.ceil(3.2)` → `4` |
| `Math.trunc()` | 去除小数 | `Math.trunc(3.7)` → `3` |

#### 随机数

```javascript
// 生成0-1之间的随机数
Math.random();  // 0.123456...

// 生成1-10之间的随机整数
const randomNum = Math.floor(Math.random() * 10) + 1;
```

#### 其他常用方法

```javascript
Math.max(1, 5, 3);     // 5
Math.min(1, 5, 3);     // 1
Math.pow(2, 3);        // 8 (2的3次方)
Math.sqrt(16);         // 4
Math.abs(-5);          // 5
```

### 3.4 Date日期对象

```javascript
const now = new Date();

// 获取时间分量
now.getFullYear();     // 年 (2025)
now.getMonth();        // 月 (0-11，0表示1月)
now.getDate();         // 日 (1-31)
now.getDay();          // 星期 (0-6，0表示周日)
now.getHours();        // 时
now.getMinutes();      // 分
now.getSeconds();      // 秒

// 时间戳
now.getTime();         // 毫秒时间戳
Date.now();            // 当前时间戳（静态方法）
```

#### 日期计算

```javascript
// 计算两个日期相差天数
const dateA = new Date('2025-01-01');
const dateB = new Date('2025-01-15');

const diff = dateB - dateA;  // 毫秒差
const days = diff / (1000 * 60 * 60 * 24);  // 14天

// 格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

console.log(formatDate(now));  // 2025-01-15
```

---

## 四、BOM浏览器对象模型

**BOM（Browser Object Model）** 提供了与浏览器窗口交互的接口。

### 4.1 核心对象

| 对象 | 说明 | 常用属性/方法 |
|------|------|---------------|
| `window` | 顶层全局对象 | `alert()`, `confirm()`, `prompt()` |
| `location` | URL信息 | `href`, `reload()`, `replace()` |
| `navigator` | 浏览器信息 | `userAgent`, `onLine` |
| `history` | 历史记录 | `back()`, `forward()`, `go()` |
| `screen` | 屏幕信息 | `width`, `height` |

### 4.2 location对象

```javascript
// 获取当前URL
console.log(location.href);

// 页面跳转
location.href = 'https://example.com';

// 重新加载页面
location.reload();

// 替换当前页面（不保留历史记录）
location.replace('https://example.com');
```

### 4.3 navigator对象

```javascript
// 获取浏览器标识
console.log(navigator.userAgent);

// 判断是否在线
console.log(navigator.onLine);  // true / false

// 网络状态变化监听
window.addEventListener('online', () => console.log('网络已连接'));
window.addEventListener('offline', () => console.log('网络已断开'));
```

### 4.4 定时器

#### setTimeout - 延迟执行一次

```javascript
const timeoutId = setTimeout(() => {
    console.log('2秒后执行');
}, 2000);

// 取消定时器
clearTimeout(timeoutId);
```

#### setInterval - 间隔重复执行

```javascript
let count = 0;

const intervalId = setInterval(() => {
    count++;
    console.log(count);
    
    if (count >= 5) {
        clearInterval(intervalId);  // 停止定时器
    }
}, 1000);  // 每秒执行一次
```

---

## 五、DOM文档对象模型

**DOM（Document Object Model）** 将HTML文档映射为JavaScript可操作的对象树。

```
Document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── div
          │   ├── p
          │   └── span
          └── ul
              ├── li
              └── li
```

### 5.1 DOM节点类型

- **元素节点** (Element) - HTML标签
- **文本节点** (Text) - 标签内的文本内容
- **属性节点** (Attribute) - 元素的属性

### 5.2 DOM元素选择

```javascript
// 传统方法（返回HTMLCollection）
document.getElementById('id');
document.getElementsByClassName('class');
document.getElementsByTagName('tag');

// CSS选择器（推荐）
document.querySelector('.class');       // 第一个匹配元素
document.querySelectorAll('.class');    // 所有匹配元素（NodeList）

// 示例
document.querySelector('#list li:first-child');
document.querySelectorAll('button[type="submit"]');
```

### 5.3 DOM内容与属性操作

#### 内容操作

```javascript
const element = document.querySelector('#box');

// 设置HTML内容（解析HTML标签）
element.innerHTML = '<b>加粗文字</b>';

// 设置纯文本内容（不解析HTML）
element.textContent = '<b>纯文本</b>';

// 获取文本（受CSS影响，如display:none的元素）
element.innerText;
```

#### 属性操作

```javascript
// 直接设置属性
element.id = 'newId';
element.src = 'image.jpg';

// 使用setAttribute/getAttribute
element.setAttribute('data-id', '1');
const dataId = element.getAttribute('data-id');

// data-* 自定义属性
element.dataset.userId = '123';      // 设置 data-user-id
console.log(element.dataset.userId);  // 获取 data-user-id
```

#### 样式操作

```javascript
// 行内样式
element.style.color = 'red';
element.style.backgroundColor = '#fff';  // 驼峰命名
element.style.cssText = 'color: red; font-size: 14px;';

// 获取计算样式
const computed = getComputedStyle(element);
console.log(computed.color);

// classList（推荐操作类名）
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');     // 切换
element.classList.contains('active');   // 判断是否包含
```

### 5.4 DOM节点增删改

```javascript
// 创建元素
const div = document.createElement('div');
div.textContent = '新元素';
div.className = 'box';

// 添加元素
parent.appendChild(child);                    // 末尾添加
parent.insertBefore(newNode, referenceNode);  // 指定位置插入
parent.append(node1, node2);                  // ES6，末尾添加多个
parent.prepend(node);                         // 开头添加

// 删除元素
parent.removeChild(child);    // 传统方式
element.remove();             // ES6方式

// 替换元素
parent.replaceChild(newNode, oldNode);
```

### 5.5 DOM节点关系遍历

#### 父子关系

```javascript
// 获取父节点
element.parentNode;
element.parentElement;

// 获取最近的匹配选择器的祖先元素
element.closest('.container');

// 获取子元素
parent.children;              // 子元素集合（HTMLCollection）
parent.childNodes;            // 所有子节点（包含文本节点）
parent.firstElementChild;     // 第一个子元素
parent.lastElementChild;      // 最后一个子元素
```

#### 兄弟关系

```javascript
// 元素兄弟节点
element.previousElementSibling;  // 前一个元素兄弟
element.nextElementSibling;      // 后一个元素兄弟

// 包含文本节点
element.previousSibling;
element.nextSibling;
```

---

## 六、本讲总结

### 核心要点

1. **面向对象三大特性**：封装、继承、多态
2. **ES6 Class语法**：`class`、`extends`、`super`、`constructor`
3. **内置对象**：
   - String：文本处理方法
   - Array：数组操作方法
   - Math：数学计算工具
   - Date：日期时间处理
4. **BOM**：`window`、`location`、`navigator`、定时器
5. **DOM**：元素选择、内容/属性/样式操作、节点增删改查

### 知识图谱

```
JavaScript OOP
    ├── 对象创建
    │   ├── 对象字面量
    │   └── ES6 Class
    ├── 三大特性
    │   ├── 封装
    │   ├── 继承 (extends/super)
    │   └── 多态
    └── 内置对象
        ├── String
        ├── Array
        ├── Math
        └── Date

Web API
    ├── BOM
    │   ├── window
    │   ├── location
    │   ├── navigator
    │   ├── history
    │   └── 定时器
    └── DOM
        ├── 元素选择
        ├── 内容操作
        ├── 属性操作
        ├── 样式操作
        └── 节点遍历
```

---

## 课后思考与作业

### 思考题

1. 面向对象编程相比过程式编程有什么优势？
2. ES6 Class语法和传统的原型继承有什么关系？
3. BOM和DOM分别是什么？它们的作用范围有何不同？

### 作业

- **内容**：创建一个简单的学生信息管理系统
- **要求**：
  1. 使用ES6 Class创建`Student`类，包含姓名、年龄、成绩属性
  2. 实现添加学生、删除学生、查询学生、计算平均分等功能
  3. 使用DOM操作动态渲染学生列表到页面
  4. 使用数组方法（filter、map、reduce）处理数据
  5. 界面使用HTML表单收集输入，表格展示数据

---

*Web前端框架技术 | 第3讲 JavaScript面向对象编程与内置对象*

---
title: "JavaScript的数据组织与验证"
lectureNumber: 5
week: 5
module: "JavaScript基础"
description: "数组操作与方法、表单数据收集、正则表达式验证"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture04"]
tags: ["JavaScript", "数组", "表单", "正则表达式"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture05
hasAssignment: true
draft: false
---


## 学习目标

- 掌握数组的基本操作和常用方法
- 理解如何从表单中获取数据
- 学会使用正则表达式进行数据验证
- 能够完成表单数据的收集与校验

---

## 一、数据组织

### 1.1 数组及常用方法

#### 什么是数组？

数组（Array）是 JavaScript 中用于存储多个值的数据结构。可以想象成一个有序的列表，每个元素都有一个对应的索引（从 0 开始）。

```javascript
// 创建数组的几种方式
let fruits = ["苹果", "香蕉", "橙子"];
let numbers = new Array(1, 2, 3, 4, 5);
let emptyArray = [];  // 空数组
```

#### 访问和修改数组元素

```javascript
let colors = ["红色", "绿色", "蓝色"];

// 访问元素
console.log(colors[0]);  // "红色"
console.log(colors[2]);  // "蓝色"

// 修改元素
colors[1] = "黄色";
console.log(colors);  // ["红色", "黄色", "蓝色"]

// 获取数组长度
console.log(colors.length);  // 3
```

#### 数组常用方法

##### 添加和删除元素

```javascript
let animals = ["猫", "狗"];

// push() - 在数组末尾添加元素
animals.push("兔子");
console.log(animals);  // ["猫", "狗", "兔子"]

// pop() - 删除数组末尾的元素
let last = animals.pop();
console.log(last);      // "兔子"
console.log(animals);   // ["猫", "狗"]

// unshift() - 在数组开头添加元素
animals.unshift("鸟");
console.log(animals);  // ["鸟", "猫", "狗"]

// shift() - 删除数组开头的元素
let first = animals.shift();
console.log(first);     // "鸟"
console.log(animals);   // ["猫", "狗"]
```

##### 查找元素

```javascript
let scores = [85, 92, 78, 92, 88];

// indexOf() - 查找元素的索引（从前往后）
console.log(scores.indexOf(92));      // 1
console.log(scores.indexOf(100));     // -1（不存在）

// lastIndexOf() - 查找元素的索引（从后往前）
console.log(scores.lastIndexOf(92));  // 3

// includes() - 判断数组是否包含某个元素
console.log(scores.includes(78));     // true
console.log(scores.includes(100));    // false
```

##### 数组变换

```javascript
let numbers = [1, 2, 3, 4, 5];

// slice() - 截取数组的一部分（不改变原数组）
let sliced = numbers.slice(1, 4);  // 从索引1到索引4（不包括）
console.log(sliced);   // [2, 3, 4]
console.log(numbers);  // [1, 2, 3, 4, 5]（原数组不变）

// splice() - 删除/插入元素（改变原数组）
let fruits = ["苹果", "香蕉", "橙子", "葡萄"];
let removed = fruits.splice(1, 2);  // 从索引1开始，删除2个元素
console.log(removed);  // ["香蕉", "橙子"]
console.log(fruits);   // ["苹果", "葡萄"]

// 使用 splice 插入元素
fruits.splice(1, 0, "梨", "桃");  // 在索引1处插入
console.log(fruits);  // ["苹果", "梨", "桃", "葡萄"]
```

##### 高级数组方法（ES5+）

```javascript
let data = [10, 20, 30, 40, 50];

// forEach() - 遍历数组
console.log("forEach遍历:");
data.forEach(function(item, index) {
    console.log(`索引 ${index}: ${item}`);
});

// map() - 映射数组（返回新数组）
let doubled = data.map(function(item) {
    return item * 2;
});
console.log(doubled);  // [20, 40, 60, 80, 100]

// filter() - 过滤数组
let filtered = data.filter(function(item) {
    return item > 25;
});
console.log(filtered);  // [30, 40, 50]

// find() - 查找第一个符合条件的元素
let found = data.find(function(item) {
    return item > 25;
});
console.log(found);  // 30

// every() - 检查是否所有元素都符合条件
let allPositive = data.every(function(item) {
    return item > 0;
});
console.log(allPositive);  // true

// some() - 检查是否有元素符合条件
let hasLarge = data.some(function(item) {
    return item > 40;
});
console.log(hasLarge);  // true

// reduce() - 累积计算
let sum = data.reduce(function(total, item) {
    return total + item;
}, 0);  // 0 是初始值
console.log(sum);  // 150
```

#### 数组方法总结表

| 方法         | 作用      | 修改原数组 | 返回值          |
| ---------- | ------- | ----- | ------------ |
| push()     | 末尾添加元素  | 是     | 新长度          |
| pop()      | 删除末尾元素  | 是     | 被删除的元素       |
| unshift()  | 开头添加元素  | 是     | 新长度          |
| shift()    | 删除开头元素  | 是     | 被删除的元素       |
| splice()   | 删除/插入元素 | 是     | 被删除的元素数组     |
| slice()    | 截取部分数组  | 否     | 新数组          |
| indexOf()  | 查找元素索引  | 否     | 索引或-1        |
| includes() | 判断是否包含  | 否     | true/false   |
| forEach()  | 遍历数组    | 否     | undefined    |
| map()      | 映射变换    | 否     | 新数组          |
| filter()   | 过滤元素    | 否     | 新数组          |
| find()     | 查找元素    | 否     | 元素或undefined |
| every()    | 检查所有元素  | 否     | true/false   |
| some()     | 检查部分元素  | 否     | true/false   |
| reduce()   | 累积计算    | 否     | 单个值          |

---

### 1.2 数据输入

#### 从表单获取数据

HTML 表单是用户与网页交互的主要方式。JavaScript 可以获取表单中的用户输入，进行数据处理。

```html
![[Pasted image 20260331111057.png]]
```

#### 获取不同类型的表单元素值

```javascript
// 1. 文本输入框 (text, email, password, number, etc.)
let textValue = document.getElementById("inputId").value;

// 2. 单选按钮 (radio) - 获取选中的值
let radios = document.getElementsByName("gender");
let selectedValue;
for (let radio of radios) {
    if (radio.checked) {
        selectedValue = radio.value;
        break;
    }
}

// 3. 复选框 (checkbox) - 获取所有选中的值
let checkboxes = document.querySelectorAll('input[name="hobby"]:checked');
let checkedValues = [];
checkboxes.forEach(function(checkbox) {
    checkedValues.push(checkbox.value);
});

// 4. 下拉选择框 (select)
let select = document.getElementById("city");
let selectedOption = select.options[select.selectedIndex].value;
// 或者
let selectedValue = select.value;

// 5. 文本域 (textarea)
let textareaContent = document.getElementById("description").value;
```

#### 使用 FormData 对象

```javascript
let form = document.getElementById("myForm");

// 创建 FormData 对象
let formData = new FormData(form);

// 获取单个值
console.log(formData.get("username"));

// 获取多个同名值（如复选框）
console.log(formData.getAll("hobbies"));

// 遍历所有表单数据
for (let [key, value] of formData.entries()) {
    console.log(key + ": " + value);
}

// 转换为普通对象
let formObject = {};
formData.forEach((value, key) => {
    formObject[key] = value;
});
```

---

## 二、数据验证

### 2.1 表单数据收集

在进行数据验证之前，我们需要先了解如何收集表单数据。以下是一个完整的表单数据收集示例：

```html
<!DOCTYPE html>
<html>
<head>
    <title>用户注册表单</title>
    <style>
        .form-group { margin-bottom: 15px; }
        label { display: inline-block; width: 100px; }
        .error { color: red; font-size: 12px; }
    </style>
</head>
<body>
    <h2>用户注册</h2>
    <form id="registerForm">
        <div class="form-group">
            <label>用户名：</label>
            <input type="text" id="username" name="username" placeholder="3-20个字符">
            <span class="error" id="usernameError"></span>
        </div>

        <div class="form-group">
            <label>密码：</label>
            <input type="password" id="password" name="password" placeholder="至少6位">
            <span class="error" id="passwordError"></span>
        </div>

        <div class="form-group">
            <label>确认密码：</label>
            <input type="password" id="confirmPassword" placeholder="再次输入密码">
            <span class="error" id="confirmError"></span>
        </div>

        <div class="form-group">
            <label>邮箱：</label>
            <input type="email" id="email" name="email" placeholder="example@mail.com">
            <span class="error" id="emailError"></span>
        </div>

        <div class="form-group">
            <label>手机号：</label>
            <input type="text" id="phone" name="phone" placeholder="11位手机号">
            <span class="error" id="phoneError"></span>
        </div>

        <div class="form-group">
            <label>性别：</label>
            <input type="radio" name="gender" value="male" id="male">
            <label for="male">男</label>
            <input type="radio" name="gender" value="female" id="female">
            <label for="female">女</label>
        </div>

        <div class="form-group">
            <label>兴趣爱好：</label>
            <input type="checkbox" name="hobbies" value="reading"> 阅读
            <input type="checkbox" name="hobbies" value="sports"> 运动
            <input type="checkbox" name="hobbies" value="music"> 音乐
            <input type="checkbox" name="hobbies" value="travel"> 旅行
        </div>

        <button type="submit">注册</button>
    </form>

    <script>
        // 获取表单元素
        let form = document.getElementById("registerForm");

        // 表单提交事件处理
        form.addEventListener("submit", function(event) {
            // 阻止默认提交
            event.preventDefault();

            // 收集表单数据
            let formData = collectFormData();
            console.log("收集的表单数据:", formData);

            // 验证数据
            if (validateForm(formData)) {
                alert("注册成功！");
                // 这里可以发送数据到服务器
            }
        });

        // 收集表单数据函数
        function collectFormData() {
            let data = {};

            // 文本输入
            data.username = document.getElementById("username").value.trim();
            data.password = document.getElementById("password").value;
            data.confirmPassword = document.getElementById("confirmPassword").value;
            data.email = document.getElementById("email").value.trim();
            data.phone = document.getElementById("phone").value.trim();

            // 单选按钮
            let genderRadios = document.getElementsByName("gender");
            for (let radio of genderRadios) {
                if (radio.checked) {
                    data.gender = radio.value;
                    break;
                }
            }

            // 复选框
            data.hobbies = [];
            let hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]:checked');
            hobbyCheckboxes.forEach(function(checkbox) {
                data.hobbies.push(checkbox.value);
            });

            return data;
        }

        // 表单验证函数
        function validateForm(data) {
            let isValid = true;

            // 清空之前的错误信息
            clearErrors();

            // 验证用户名
            if (data.username.length < 3 || data.username.length > 20) {
                showError("usernameError", "用户名长度必须在3-20个字符之间");
                isValid = false;
            }

            // 验证密码
            if (data.password.length < 6) {
                showError("passwordError", "密码长度至少为6位");
                isValid = false;
            }

            // 验证确认密码
            if (data.password !== data.confirmPassword) {
                showError("confirmError", "两次输入的密码不一致");
                isValid = false;
            }

            // 验证邮箱（简单验证）
            if (data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
                showError("emailError", "请输入有效的邮箱地址");
                isValid = false;
            }

            // 验证手机号（简单验证）
            if (data.phone.length !== 11 || isNaN(data.phone)) {
                showError("phoneError", "请输入11位手机号码");
                isValid = false;
            }

            return isValid;
        }

        // 显示错误信息
        function showError(elementId, message) {
            document.getElementById(elementId).textContent = message;
        }

        // 清空所有错误信息
        function clearErrors() {
            let errorElements = document.querySelectorAll(".error");
            errorElements.forEach(function(element) {
                element.textContent = "";
            });
        }
    </script>
</body>
</html>
```

---

### 2.2 正则表达式基本语法

#### 什么是正则表达式？

正则表达式（Regular Expression，简称 regex 或 regexp）是一种用于匹配字符串中字符组合的模式。它可以帮助我们：
- 验证数据格式（如邮箱、手机号）
- 查找和替换文本
- 提取特定信息

在 JavaScript 中，正则表达式使用 `/pattern/flags` 的语法创建：

```javascript
// 创建正则表达式的两种方式
let regex1 = /abc/;           // 字面量方式
let regex2 = new RegExp("abc"); // 构造函数方式
```

#### 基础匹配规则

```javascript
// 1. 字面量匹配 - 精确匹配字符
let pattern1 = /hello/;
console.log(pattern1.test("hello world"));  // true
console.log(pattern1.test("hi there"));     // false

// 2. 点号 . - 匹配任意单个字符（除换行符外）
let pattern2 = /h.t/;
console.log(pattern2.test("hot"));   // true
console.log(pattern2.test("hit"));   // true
console.log(pattern2.test("h t"));   // true
console.log(pattern2.test("ht"));    // false

// 3. 转义字符 \ - 将特殊字符转为普通字符
let pattern3 = /\./;  // 匹配实际的点号
console.log(pattern3.test("a.b"));  // true
console.log(pattern3.test("abc"));  // false
```

#### 字符类

```javascript
// 1. [...] - 字符集，匹配方括号内的任意一个字符
let pattern1 = /[aeiou]/;  // 匹配任意元音字母
console.log(pattern1.test("apple"));  // true
console.log(pattern1.test("rhythm")); // false

// 2. [^...] - 否定字符集，匹配不在方括号内的字符
let pattern2 = /[^aeiou]/;  // 匹配非元音字母
console.log(pattern2.test("aei"));   // false
console.log(pattern2.test("abc"));   // true

// 3. 范围表示法
let pattern3 = /[a-z]/;      // 匹配任意小写字母
let pattern4 = /[A-Z]/;      // 匹配任意大写字母
let pattern5 = /[0-9]/;      // 匹配任意数字
let pattern6 = /[a-zA-Z]/;   // 匹配任意字母
let pattern7 = /[a-zA-Z0-9_]/;  // 匹配字母、数字和下划线

// 4. 预定义字符类（简写形式）
let pattern8 = /\d/;   // 匹配数字，等价于 [0-9]
let pattern9 = /\D/;   // 匹配非数字，等价于 [^0-9]
let patternA = /\w/;   // 匹配单词字符 [a-zA-Z0-9_]
let patternB = /\W/;   // 匹配非单词字符 [^a-zA-Z0-9_]
let patternC = /\s/;   // 匹配空白字符（空格、制表符、换行等）
let patternD = /\S/;   // 匹配非空白字符
```

#### 量词

```javascript
// 1. * - 匹配前面的元素 0 次或多次
let pattern1 = /ho*/;  // 匹配 h, ho, hoo, hooo...
console.log(pattern1.test("h"));      // true
console.log(pattern1.test("ho"));     // true
console.log(pattern1.test("hoo"));    // true
console.log(pattern1.test("hello"));  // false

// 2. + - 匹配前面的元素 1 次或多次
let pattern2 = /ho+/;  // 匹配 ho, hoo, hooo...（至少一个o）
console.log(pattern2.test("h"));      // false
console.log(pattern2.test("ho"));     // true
console.log(pattern2.test("hoo"));    // true

// 3. ? - 匹配前面的元素 0 次或 1 次
let pattern3 = /colou?r/;  // 匹配 color 或 colour
console.log(pattern3.test("color"));    // true
console.log(pattern3.test("colour"));   // true
console.log(pattern3.test("coloor"));   // false

// 4. {n} - 精确匹配 n 次
let pattern4 = /\d{4}/;  // 匹配恰好4位数字
console.log(pattern4.test("2023"));  // true
console.log(pattern4.test("202"));   // false
console.log(pattern4.test("20234")); // true（包含4位数字）

// 5. {n,} - 至少匹配 n 次
let pattern5 = /\d{3,}/;  // 匹配至少3位数字
console.log(pattern5.test("12"));     // false
console.log(pattern5.test("123"));    // true
console.log(pattern5.test("12345"));  // true

// 6. {n,m} - 匹配 n 到 m 次
let pattern6 = /\d{2,4}/;  // 匹配2到4位数字
console.log(pattern6.test("1"));      // false
console.log(pattern6.test("12"));     // true
console.log(pattern6.test("123"));    // true
console.log(pattern6.test("1234"));   // true
console.log(pattern6.test("12345"));  // true（包含2-4位数字）
```

#### 边界和分组

```javascript
// 1. ^ - 匹配字符串的开始位置
let pattern1 = /^Hello/;  // 字符串必须以 Hello 开头
console.log(pattern1.test("Hello World"));  // true
console.log(pattern1.test("Say Hello"));    // false

// 2. $ - 匹配字符串的结束位置
let pattern2 = /World$/;  // 字符串必须以 World 结尾
console.log(pattern2.test("Hello World"));  // true
console.log(pattern2.test("World Peace"));  // false

// 3. ^...$ - 精确匹配整个字符串
let pattern3 = /^Hello$/;  // 必须完全等于 "Hello"
console.log(pattern3.test("Hello"));      // true
console.log(pattern3.test("Hello World")); // false
console.log(pattern3.test("Say Hello"));   // false

// 4. (...) - 分组，将多个元素视为一个整体
let pattern4 = /^(ha)+$/;  // 匹配 ha, haha, hahaha...
console.log(pattern4.test("ha"));       // true
console.log(pattern4.test("haha"));     // true
console.log(pattern4.test("hahaha"));   // true
console.log(pattern4.test("haa"));      // false

// 5. | - 或运算符，匹配两者之一
let pattern5 = /cat|dog/;  // 匹配 cat 或 dog
console.log(pattern5.test("I have a cat"));  // true
console.log(pattern5.test("I have a dog"));  // true
console.log(pattern5.test("I have a bird")); // false

// 6. 分组与或结合使用
let pattern6 = /I like (cats|dogs)/;
console.log(pattern6.test("I like cats"));  // true
console.log(pattern6.test("I like dogs"));  // true
console.log(pattern6.test("I like birds")); // false
```

#### 正则表达式的标志（Flags）

```javascript
// i - 忽略大小写（ignoreCase）
let pattern1 = /hello/i;
console.log(pattern1.test("Hello"));  // true
console.log(pattern1.test("HELLO"));  // true

// g - 全局匹配（global）- 用于查找所有匹配，不只是第一个
let str = "The cat sat on the mat";
let pattern2 = /at/g;
let matches = str.match(pattern2);
console.log(matches);  // ["at", "at", "at"]

// m - 多行匹配（multiline）- 使 ^ 和 $ 匹配每行的开始和结束
let multilineStr = "hello world\nhello again";
let pattern3 = /^hello/gm;
let lineMatches = multilineStr.match(pattern3);
console.log(lineMatches);  // ["hello", "hello"]

// 可以组合使用多个标志
let pattern4 = /hello/gi;  // 全局匹配且忽略大小写
```

#### 正则表达式方法

```javascript
let pattern = /\d+/g;
let str = "There are 123 apples and 456 oranges";

// 1. test() - 测试字符串是否匹配（返回 true/false）
console.log(pattern.test(str));  // true

// 2. exec() - 执行匹配，返回详细的匹配信息
let execResult = /\d+/.exec(str);
console.log(execResult);
// ["123", index: 10, input: "There are 123 apples...", groups: undefined]

// 3. String.prototype.match() - 返回所有匹配
let matchResult = str.match(/\d+/g);
console.log(matchResult);  // ["123", "456"]

// 4. String.prototype.search() - 返回第一个匹配的索引
let searchResult = str.search(/\d+/);
console.log(searchResult);  // 10

// 5. String.prototype.replace() - 替换匹配的内容
let replaced = str.replace(/\d+/g, "***");
console.log(replaced);  // "There are *** apples and *** oranges"

// 6. String.prototype.split() - 使用正则分割字符串
let splitResult = "a,b;c|d".split(/[,;|]/);
console.log(splitResult);  // ["a", "b", "c", "d"]
```

---

### 2.2 利用正则表达式进行表单数据校验

#### 常用验证正则表达式

```javascript
// 1. 用户名验证（字母、数字、下划线，3-20位）
let usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
console.log(usernameRegex.test("user_123"));  // true
console.log(usernameRegex.test("ab"));        // false（太短）
console.log(usernameRegex.test("user@123"));  // false（包含@）

// 2. 密码验证（至少6位，包含字母和数字）
let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
console.log(passwordRegex.test("abc123"));    // true
console.log(passwordRegex.test("password"));  // false（没有数字）
console.log(passwordRegex.test("123456"));    // false（没有字母）

// 3. 邮箱验证
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test("user@example.com"));      // true
console.log(emailRegex.test("user.name@domain.co.uk")); // true
console.log(emailRegex.test("invalid.email"));         // false

// 4. 手机号码验证（中国大陆）
let phoneRegex = /^1[3-9]\d{9}$/;
console.log(phoneRegex.test("13800138000"));  // true
console.log(phoneRegex.test("1380013800"));   // false（10位）
console.log(phoneRegex.test("23800138000"));  // false（不以1开头）

// 5. 身份证号验证（18位）
let idCardRegex = /^\d{17}[\dXx]$/;
console.log(idCardRegex.test("11010119900101123X"));  // true

// 6. 邮编验证
let zipRegex = /^\d{6}$/;
console.log(zipRegex.test("100000"));  // true

// 7. URL 验证
let urlRegex = /^https?:\/\/.+/;
console.log(urlRegex.test("https://www.example.com"));  // true
console.log(urlRegex.test("http://example.com"));       // true

// 8. 中文验证
let chineseRegex = /[\u4e00-\u9fa5]/;
console.log(chineseRegex.test("中文"));   // true
console.log(chineseRegex.test("abc"));    // false

// 9. 纯数字验证
let numberRegex = /^\d+$/;
console.log(numberRegex.test("12345"));  // true
console.log(numberRegex.test("12.34"));  // false（包含小数点）
console.log(numberRegex.test("12a34"));  // false（包含字母）

// 10. 日期格式验证（YYYY-MM-DD）
let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
console.log(dateRegex.test("2024-03-15"));  // true
console.log(dateRegex.test("2024-13-01"));  // false（月份无效）
```

#### 完整的表单验证示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>表单验证示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input.error {
            border-color: #e74c3c;
            background-color: #fdf2f2;
        }
        input.success {
            border-color: #27ae60;
        }
        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        .error-message.show {
            display: block;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #2980b9;
        }
        .validation-summary {
            background-color: #fdf2f2;
            border: 1px solid #e74c3c;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 15px;
            display: none;
        }
        .validation-summary.show {
            display: block;
        }
    </style>
</head>
<body>
    <h2>用户注册表单验证</h2>

    <div class="validation-summary" id="validationSummary">
        <strong>请修正以下错误：</strong>
        <ul id="errorList"></ul>
    </div>

    <form id="registrationForm">
        <div class="form-group">
            <label for="regUsername">用户名 *</label>
            <input type="text" id="regUsername" name="username"
                   placeholder="3-20位字母、数字或下划线">
            <div class="error-message" id="usernameError"></div>
        </div>

        <div class="form-group">
            <label for="regPassword">密码 *</label>
            <input type="password" id="regPassword" name="password"
                   placeholder="至少6位，包含字母和数字">
            <div class="error-message" id="passwordError"></div>
        </div>

        <div class="form-group">
            <label for="confirmPassword">确认密码 *</label>
            <input type="password" id="confirmPassword"
                   placeholder="再次输入密码">
            <div class="error-message" id="confirmPasswordError"></div>
        </div>

        <div class="form-group">
            <label for="regEmail">邮箱 *</label>
            <input type="email" id="regEmail" name="email"
                   placeholder="example@mail.com">
            <div class="error-message" id="emailError"></div>
        </div>

        <div class="form-group">
            <label for="regPhone">手机号 *</label>
            <input type="tel" id="regPhone" name="phone"
                   placeholder="11位手机号码">
            <div class="error-message" id="phoneError"></div>
        </div>

        <div class="form-group">
            <label for="birthDate">出生日期</label>
            <input type="text" id="birthDate" name="birthDate"
                   placeholder="YYYY-MM-DD">
            <div class="error-message" id="birthDateError"></div>
        </div>

        <div class="form-group">
            <label for="personalWebsite">个人网站</label>
            <input type="text" id="personalWebsite" name="website"
                   placeholder="https://example.com">
            <div class="error-message" id="websiteError"></div>
        </div>

        <button type="submit">提交注册</button>
    </form>

    <script>
        // 获取表单元素
        let form = document.getElementById("registrationForm");
        let validationSummary = document.getElementById("validationSummary");
        let errorList = document.getElementById("errorList");

        // 验证规则配置
        const validationRules = {
            username: {
                pattern: /^[a-zA-Z0-9_]{3,20}$/,
                message: "用户名必须是3-20位的字母、数字或下划线"
            },
            password: {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
                message: "密码至少6位，必须同时包含字母和数字"
            },
            email: {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "请输入有效的邮箱地址"
            },
            phone: {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入有效的11位手机号码"
            },
            birthDate: {
                pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                message: "日期格式应为 YYYY-MM-DD"
            },
            website: {
                pattern: /^https?:\/\/.+/,
                message: "网址应以 http:// 或 https:// 开头"
            }
        };

        // 表单提交事件
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            // 执行验证
            let errors = validateForm();

            if (errors.length === 0) {
                // 验证通过
                alert("注册成功！");
                // 这里可以提交表单数据到服务器
                console.log("提交的数据:", getFormData());
            } else {
                // 显示错误信息
                displayErrors(errors);
            }
        });

        // 验证整个表单
        function validateForm() {
            let errors = [];

            // 获取所有字段值
            let username = document.getElementById("regUsername").value.trim();
            let password = document.getElementById("regPassword").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let email = document.getElementById("regEmail").value.trim();
            let phone = document.getElementById("regPhone").value.trim();
            let birthDate = document.getElementById("birthDate").value.trim();
            let website = document.getElementById("personalWebsite").value.trim();

            // 验证用户名
            if (!username) {
                errors.push({ field: "username", message: "用户名不能为空" });
            } else if (!validationRules.username.pattern.test(username)) {
                errors.push({ field: "username", message: validationRules.username.message });
            }

            // 验证密码
            if (!password) {
                errors.push({ field: "password", message: "密码不能为空" });
            } else if (!validationRules.password.pattern.test(password)) {
                errors.push({ field: "password", message: validationRules.password.message });
            }

            // 验证确认密码
            if (password !== confirmPassword) {
                errors.push({ field: "confirmPassword", message: "两次输入的密码不一致" });
            }

            // 验证邮箱
            if (!email) {
                errors.push({ field: "email", message: "邮箱不能为空" });
            } else if (!validationRules.email.pattern.test(email)) {
                errors.push({ field: "email", message: validationRules.email.message });
            }

            // 验证手机号
            if (!phone) {
                errors.push({ field: "phone", message: "手机号不能为空" });
            } else if (!validationRules.phone.pattern.test(phone)) {
                errors.push({ field: "phone", message: validationRules.phone.message });
            }

            // 验证出生日期（可选字段）
            if (birthDate && !validationRules.birthDate.pattern.test(birthDate)) {
                errors.push({ field: "birthDate", message: validationRules.birthDate.message });
            }

            // 验证网站（可选字段）
            if (website && !validationRules.website.pattern.test(website)) {
                errors.push({ field: "website", message: validationRules.website.message });
            }

            return errors;
        }

        // 显示错误信息
        function displayErrors(errors) {
            // 清空之前的错误信息
            clearAllErrors();

            // 填充错误列表
            errorList.innerHTML = "";
            errors.forEach(function(error) {
                let li = document.createElement("li");
                li.textContent = error.message;
                errorList.appendChild(li);

                // 在对应字段旁显示错误
                let errorElement = document.getElementById(error.field + "Error");
                let inputElement = document.getElementById("reg" + error.field.charAt(0).toUpperCase() + error.field.slice(1)) ||
                                  document.getElementById(error.field);

                if (errorElement) {
                    errorElement.textContent = error.message;
                    errorElement.classList.add("show");
                }
                if (inputElement) {
                    inputElement.classList.add("error");
                }
            });

            // 显示验证摘要
            validationSummary.classList.add("show");
        }

        // 清空所有错误信息
        function clearAllErrors() {
            // 隐藏验证摘要
            validationSummary.classList.remove("show");

            // 清空所有错误消息
            let errorMessages = document.querySelectorAll(".error-message");
            errorMessages.forEach(function(el) {
                el.textContent = "";
                el.classList.remove("show");
            });

            // 移除输入框的错误样式
            let inputs = document.querySelectorAll("input");
            inputs.forEach(function(input) {
                input.classList.remove("error");
            });
        }

        // 获取表单数据对象
        function getFormData() {
            return {
                username: document.getElementById("regUsername").value.trim(),
                email: document.getElementById("regEmail").value.trim(),
                phone: document.getElementById("regPhone").value.trim(),
                birthDate: document.getElementById("birthDate").value.trim(),
                website: document.getElementById("personalWebsite").value.trim()
            };
        }

        // 实时验证 - 输入时验证
        let inputs = document.querySelectorAll("#registrationForm input");
        inputs.forEach(function(input) {
            input.addEventListener("blur", function() {
                // 当输入框失去焦点时，可以单独验证该字段
                // 这里简化处理，实际项目中可以针对每个字段单独验证
            });
        });
    </script>
</body>
</html>
```

#### 正则表达式速查表

| 模式 | 说明 | 示例 |
|------|------|------|
| `.` | 任意字符（除换行符） | `/h.t/` 匹配 "hot", "hat" |
| `\d` | 数字 [0-9] | `/\d+/` 匹配 "123" |
| `\D` | 非数字 | `/\D+/` 匹配 "abc" |
| `\w` | 单词字符 [a-zA-Z0-9_] | `/\w+/` 匹配 "user_123" |
| `\W` | 非单词字符 | `/\W/` 匹配 "@" |
| `\s` | 空白字符 | `/\s+/` 匹配空格、制表符 |
| `\S` | 非空白字符 | `/\S+/` 匹配非空内容 |
| `[abc]` | 字符集 | `/[aeiou]/` 匹配元音 |
| `[^abc]` | 否定字符集 | `/[^aeiou]/` 匹配非元音 |
| `^` | 字符串开头 | `/^Hello/` 匹配 "Hello world" |
| `$` | 字符串结尾 | `/World$/` 匹配 "Hello World" |
| `\b` | 单词边界 | `/\bcat\b/` 匹配 "cat" 而非 "catch" |
| `\B` | 非单词边界 | `/\Bcat\B/` 匹配 "concatenate" |
| `(...)` | 分组 | `/(ab)+/` 匹配 "abab" |
| `\|` | 或 | `/cat\|dog/` 匹配 "cat" 或 "dog" |
| `?` | 0 或 1 次 | `/colou?r/` 匹配 "color" 或 "colour" |
| `*` | 0 次或多次 | `/ho*/` 匹配 "h", "ho", "hoo" |
| `+` | 1 次或多次 | `/ho+/` 匹配 "ho", "hoo" |
| `{n}` | 恰好 n 次 | `/\d{4}/` 匹配 "2024" |
| `{n,}` | 至少 n 次 | `/\d{3,}/` 匹配至少3位数字 |
| `{n,m}` | n 到 m 次 | `/\d{2,4}/` 匹配2-4位数字 |

---

## 四、总结

---

### 数组操作要点

1. **增删元素**：`push()`/`pop()`（末尾）、`unshift()`/`shift()`（开头）、`splice()`（任意位置）
2. **查找元素**：`indexOf()`、`includes()`、`find()`、`filter()`
3. **数组变换**：`map()`（映射）、`filter()`（过滤）、`reduce()`（归约）、`slice()`（截取）
4. **遍历数组**：`forEach()`、`for...of`、传统 `for` 循环

---

### 表单数据收集要点

1. 使用 `document.getElementById()` 或 `document.querySelector()` 获取表单元素
2. 通过 `.value` 属性获取输入值
3. 对于单选按钮和复选框，需要遍历检查 `checked` 属性
4. 使用 `FormData` 对象可以方便地收集整个表单数据
5. 记得使用 `trim()` 方法去除输入值的前后空格

---

### 正则表达式要点

1. **基础匹配**：字面量匹配、`.`（任意字符）、字符集 `[]`、转义 `\`
2. **预定义类**：`\d`（数字）、`\w`（单词字符）、`\s`（空白）
3. **量词**：`?`（0或1）、`*`（0或多）、`+`（1或多）、`{n,m}`（n到m次）
4. **位置**：`^`（开始）、`$`（结束）、`\b`（单词边界）
5. **分组**：`()` 用于分组和捕获，`|` 用于多选一
6. **方法**：`test()`（测试）、`exec()`（执行）、`match()`（匹配）、`replace()`（替换）

---

## 参考资源

1. [MDN Array 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
2. [MDN 正则表达式文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
3. [正则表达式可视化工具](https://regexper.com/)
4. [正则表达式在线测试](https://regex101.com/)

---
title: "绑定操作"
lectureNumber: 12
week: 12
module: "Vue.js框架"
description: "Class绑定、Style绑定、条件渲染、列表渲染"
duration: "90分钟"
difficulty: "intermediate"
prerequisites: ["lecture11"]
tags: ["Vue.js", "v-bind", "v-if", "v-for", "条件渲染"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture12
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 使用对象语法和数组语法动态绑定 HTML class
- 使用对象语法和数组语法动态绑定内联样式
- 使用 `v-model` 绑定各类表单控件（文本、复选、单选、下拉）
- 使用 `:value` 实现表单选项的值绑定（非字符串值）

---

# 第一部分：绑定 HTML class

## 1.1 对象语法

通过对象语法，可以根据条件动态切换 class。

```html
<div :class="{ active: isActive, 'text-danger': hasError }"">
    动态类名
</div>
```

```javascript
data() {
    return {
        isActive: true,
        hasError: false
    }
}
```

**渲染结果**：`<div class="active">`（当 `isActive=true, hasError=false`）

**与静态 class 共存**：

```html
<!-- 静态 class 始终保留，动态 class 条件附加 -->
<div class="static-class" :class="{ active: isActive }""></div>
<!-- 结果：class="static-class active" -->
```

---

## 1.2 数组语法

数组语法可以绑定多个 class，支持表达式。

```html
<div :class="[activeClass, errorClass]"></div>
<!-- 结果：class="active text-danger" -->

<!-- 数组中嵌套对象语法（条件切换） -->
<div :class="[{ active: isActive }, errorClass]"></div>
```

```javascript
data() {
    return {
        activeClass: 'active',
        errorClass: 'text-danger',
        isActive: true
    }
}
```

---

## 1.3 实际场景：表单校验状态

```html
<input
    :class="{ 'input-valid': usernameValid, 'input-invalid': !usernameValid }"
    v-model="username"
    placeholder="输入用户名"
>
<p v-if="!usernameValid" class="error-msg">用户名至少3个字符</p>
```

```javascript
data() {
    return { username: '' }
},
computed: {
    usernameValid() {
        return this.username.length >= 3;
    }
}
```

---

# 第二部分：绑定内联样式

## 2.1 对象语法

`:style` 的对象语法使用 **camelCase** 命名 CSS 属性。

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }""></div>
```

```javascript
data() {
    return {
        activeColor: 'red',
        fontSize: 30
    }
}
```

**kebab-case 需要加引号**：

```html
<div :style="{ 'font-size': fontSize + 'px', 'background-color': bgColor }""></div>
```

---

## 2.2 数组语法

数组语法可以绑定多个样式对象。

```html
<div :style="[baseStyles, overrideStyles]"></div>
```

```javascript
data() {
    return {
        baseStyles: {
            color: 'blue',
            fontSize: '16px'
        },
        overrideStyles: {
            color: 'red'  // 覆盖 baseStyles 中的 color
        }
    }
}
```

---

## 2.3 多值前缀与 CSS 变量

**自动前缀**：Vue 会自动为需要浏览器前缀的属性添加前缀。

```html
<div :style="{ display: ['flex', '-webkit-box', '-ms-flexbox'] }""></div>
```

**CSS 变量绑定**：

```html
<div :style="{ '--theme-color': themeColor }"">
    <p class="theme-text">这段文字使用主题色</p>
</div>
```

```css
.theme-text {
    color: var(--theme-color);
}
```

---

## 2.4 实际场景：主题色实时预览

```html
<div id="app">
    <label>选择主题色：</label>
    <input type="color" v-model="themeColor">

    <div class="preview-box" :style="previewStyle">
        <p>实时预览区域</p>
    </div>
</div>
```

```javascript
data() {
    return {
        themeColor: '#3498db'
    }
},
computed: {
    previewStyle() {
        return {
            backgroundColor: this.themeColor + '20',  // 20% 透明度
            borderColor: this.themeColor,
            color: this.themeColor
        };
    }
}
```

---

# 第三部分：表单输入绑定

## 3.1 文本输入框

### 单行文本

```html
<input v-model="message" placeholder="输入内容">
<p>你输入了：{{ message }}</p>
```

### 多行文本

```html
<textarea v-model="description" placeholder="输入个人简介"></textarea>
```

> 注意：`v-model` 在 `textarea` 中替代插值 `{{ }}`，不要在 textarea 内使用插值。

---

## 3.2 复选框

### 单个布尔值

```html
<input type="checkbox" v-model="isAgreed"> 同意用户协议
<p>状态：{{ isAgreed ? '已同意' : '未同意' }}</p>
```

### 多个值（数组）

```html
<p>兴趣爱好：</p>
<input type="checkbox" v-model="hobbies" value="reading"> 阅读
<input type="checkbox" v-model="hobbies" value="sports"> 运动
<input type="checkbox" v-model="hobbies" value="music"> 音乐

<p>已选择：{{ hobbies.join(', ') }}</p>
```

```javascript
data() {
    return {
        isAgreed: false,
        hobbies: []
    }
}
```

---

## 3.3 单选按钮

```html
<p>性别：</p>
<input type="radio" v-model="gender" value="male"> 男
<input type="radio" v-model="gender" value="female"> 女
<input type="radio" v-model="gender" value="secret"> 保密

<p>选择：{{ gender }}</p>
```

---

## 3.4 下拉选择

### 单选

```html
<select v-model="selectedCity">
    <option disabled value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>
```

### 多选（绑定数组）

```html
<select v-model="selectedCities" multiple>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>
```

---

## 3.5 值绑定（非字符串值）

当选项的值不是字符串（如数字、对象）时，需要使用 `:value` 进行值绑定。

### 数字值

```html
<input type="radio" v-model="score" :value="10"> 10分
<input type="radio" v-model="score" :value="20"> 20分
<input type="radio" v-model="score" :value="30"> 30分
n<!-- score 为数字类型，不是字符串 -->
```

### 对象值

```html
<select v-model="selectedProduct">
    <option disabled value="">请选择商品</option>
    <option v-for="item in products" :key="item.id" :value="item">
        {{ item.name }} - ¥{{ item.price }}
    </option>
</select>

<p v-if="selectedProduct">
    选中商品：{{ selectedProduct.name }}，价格：{{ selectedProduct.price }}
</p>
```

```javascript
data() {
    return {
        score: 10,
        selectedProduct: '',
        products: [
            { id: 1, name: 'iPhone', price: 5999 },
            { id: 2, name: 'iPad', price: 3999 }
        ]
    }
}
```

### 布尔值绑定

```html
<input type="checkbox" v-model="toggle" :true-value="true" :false-value="false">
```

---

# 刻意练习

## 场景：用户个人资料设置页

实现一个完整的用户资料编辑表单，包含实时校验反馈、主题色预览和多类型表单控件。

---

### Level 1：class 与 style 绑定（模仿练习）

**目标**：实现表单校验状态样式和主题色实时预览。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 1 - class 与 style 绑定</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
        .form-group { margin: 15px 0; }
        input, textarea { padding: 8px; width: 100%; box-sizing: border-box; border: 2px solid #ddd; border-radius: 4px; }
        .input-valid { border-color: #27ae60; background-color: #f0fff4; }
        .input-invalid { border-color: #e74c3c; background-color: #fff5f5; }
        .error-msg { color: #e74c3c; font-size: 14px; margin-top: 5px; }
        .preview-box { padding: 20px; margin-top: 20px; border: 2px solid; border-radius: 8px; text-align: center; }
    </style>
</head>
<body>
    <div id="app">
        <h2>用户资料设置</h2>

        <div class="form-group">
            <label>用户名：</label>
            <!-- TODO 1: 使用 :class 绑定校验状态类名 -->
            <!-- 规则：用户名长度 >= 3 时添加 input-valid，否则添加 input-invalid -->
            <input v-model="username" :class="__________" placeholder="至少3个字符">
            <p v-if="username.length > 0 && username.length < 3" class="error-msg">用户名太短</p>
        </div>

        <div class="form-group">
            <label>个人简介：</label>
            <!-- TODO 2: 同样绑定校验状态类名（>= 10 个字符为有效） -->
            <textarea v-model="bio" :class="__________" rows="3" placeholder="至少10个字符"></textarea>
        </div>

        <div class="form-group">
            <label>选择主题色：</label>
            <input type="color" v-model="themeColor">
        </div>

        <!-- TODO 3: 使用 :style 绑定 preview-box 的样式 -->
        <!-- 背景色为主题色的 15% 透明度（hint: themeColor + '26'），边框和文字颜色为主题色 -->
        <div class="preview-box" :style="__________">
            <p>主题色预览</p>
            <p>用户名：{{ username || '未填写' }}</p>
            <p>简介：{{ bio || '未填写' }}</p>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    username: '',
                    bio: '',
                    themeColor: '#3498db'
                }
            },
            computed: {
                usernameValid() {
                    return this.username.length >= 3;
                },
                bioValid() {
                    return this.bio.length >= 10;
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 -->
<input v-model="username" :class="{ 'input-valid': usernameValid, 'input-invalid': !usernameValid && username.length > 0 }" placeholder="至少3个字符">

<!-- TODO 2 -->
<textarea v-model="bio" :class="{ 'input-valid': bioValid, 'input-invalid': !bioValid && bio.length > 0 }" rows="3" placeholder="至少10个字符"></textarea>

<!-- TODO 3 -->
<div class="preview-box" :style="{ backgroundColor: themeColor + '26', borderColor: themeColor, color: themeColor }">
```

**关键点**：
- 对象语法中 class 名含连字符时需加引号
- 校验状态通常只在用户开始输入后显示（通过 `username.length > 0` 控制）
- 十六进制透明度：`00` 全透明，`FF` 不透明，`26` 约 15%
</details>

---

### Level 2：表单控件绑定（变式练习）

**目标**：使用 `v-model` 处理多种表单控件，并实现值绑定。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - 表单控件绑定</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
        .form-group { margin: 15px 0; padding: 10px; border: 1px solid #eee; border-radius: 4px; }
        label { display: inline-block; margin-right: 15px; }
        select, input[type="text"], textarea { padding: 6px; }
    </style>
</head>
<body>
    <div id="app">
        <h2>完善个人资料</h2>

        <div class="form-group">
            <label>性别：</label>
            <!-- TODO 1: 绑定 gender，选项值为字符串 -->
            <label><input type="radio" v-model="gender" value="male"> 男</label>
            <label><input type="radio" v-model="gender" value="female"> 女</label>
            <label><input type="radio" v-model="gender" value="secret"> 保密</label>
            <p>选中：{{ gender }}</p>
        </div>

        <div class="form-group">
            <label>兴趣爱好（可多选）：</label><br>
            <!-- TODO 2: 绑定 hobbies 数组，注意 value 值 -->
            <label><input type="checkbox" v-model="hobbies" value="reading"> 阅读</label>
            <label><input type="checkbox" v-model="hobbies" value="sports"> 运动</label>
            <label><input type="checkbox" v-model="hobbies" value="music"> 音乐</label>
            <label><input type="checkbox" v-model="hobbies" value="travel"> 旅行</label>
            <p>已选：{{ hobbies }}</p>
        </div>

        <div class="form-group">
            <label>所在城市：</label>
            <!-- TODO 3: 绑定 city，使用 :value 绑定数字类型的城市 ID -->
            <select v-model="city">
                <option disabled :value="''">请选择</option>
                <option :value="1">北京</option>
                <option :value="2">上海</option>
                <option :value="3">广州</option>
                <option :value="4">深圳</option>
            </select>
            <p>选中城市 ID：{{ city }}，类型：{{ typeof city }}</p>
        </div>

        <div class="form-group">
            <label>常用设备：</label>
            <!-- TODO 4: 绑定 device 为对象类型，使用 :value 绑定对象 -->
            <select v-model="device">
                <option disabled :value="''">请选择</option>
                <option v-for="d in devices" :key="d.id" :value="d">{{ d.name }}</option>
            </select>
            <p v-if="device">选中设备：{{ device.name }}，价格：¥{{ device.price }}</p>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    gender: 'secret',
                    hobbies: [],
                    city: '',
                    device: '',
                    devices: [
                        { id: 1, name: 'MacBook Pro', price: 14999 },
                        { id: 2, name: 'iPhone 15', price: 5999 },
                        { id: 3, name: 'iPad Air', price: 4799 }
                    ]
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

<details>
<summary>参考答案</summary>

```html
<!-- TODO 1 已在题目中正确绑定 v-model="gender" -->

<!-- TODO 2 已在题目中正确绑定 v-model="hobbies" -->

<!-- TODO 3 -->
<select v-model="city">
    <option disabled :value="''">请选择</option>
    <option :value="1">北京</option>
    <option :value="2">上海</option>
    <option :value="3">广州</option>
    <option :value="4">深圳</option>
</select>

<!-- TODO 4 -->
<select v-model="device">
    <option disabled :value="''">请选择</option>
    <option v-for="d in devices" :key="d.id" :value="d">{{ d.name }}</option>
</select>
```

**关键点**：
- 不使用 `:` 时，`value="1"` 会被解析为字符串 `"1"`
- 使用 `:value="1"` 才会绑定数字 `1`
- 对象值绑定后，`v-model` 整个变量即为该对象
</details>

---

### Level 3：综合用户资料表单（综合挑战）

**目标**：整合 class、style、表单绑定，实现完整的用户资料表单，包含实时校验和提交验证。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - 综合用户资料表单</title>
    <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
        .form-group { margin: 15px 0; }
        input, textarea, select { padding: 8px; width: 100%; box-sizing: border-box; border: 2px solid #ddd; border-radius: 4px; }
        .input-valid { border-color: #27ae60 !important; background-color: #f0fff4; }
        .input-invalid { border-color: #e74c3c !important; background-color: #fff5f5; }
        .error-msg { color: #e74c3c; font-size: 14px; margin-top: 5px; }
        .preview-box { padding: 20px; margin-top: 20px; border: 2px solid; border-radius: 8px; }
        .submit-btn { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; margin-top: 20px; }
        .submit-btn:hover { background: #2980b9; }
        .result-panel { background: #f8f9fa; padding: 15px; margin-top: 20px; border-radius: 4px; }
        .radio-group, .checkbox-group { display: flex; gap: 15px; flex-wrap: wrap; }
        .radio-group label, .checkbox-group label { display: flex; align-items: center; gap: 5px; cursor: pointer; }
        .radio-group input, .checkbox-group input { width: auto; }
    </style>
</head>
<body>
    <div id="app">
        <h2>用户资料设置</h2>

        <div class="form-group">
            <label>用户名 *</label>
            <!-- TODO 1: 绑定 class（>=3字符有效）和 v-model -->
            <input v-model="form.username" :class="__________" placeholder="至少3个字符">
            <p v-if="showError.username" class="error-msg">用户名至少3个字符</p>
        </div>

        <div class="form-group">
            <label>个人简介</label>
            <textarea v-model="form.bio" rows="3" placeholder="可选"></textarea>
        </div>

        <div class="form-group">
            <label>性别 *</label>
            <div class="radio-group">
                <label><input type="radio" v-model="form.gender" value="male"> 男</label>
                <label><input type="radio" v-model="form.gender" value="female"> 女</label>
                <label><input type="radio" v-model="form.gender" value="secret"> 保密</label>
            </div>
        </div>

        <div class="form-group">
            <label>兴趣爱好</label>
            <div class="checkbox-group">
                <label><input type="checkbox" v-model="form.hobbies" value="reading"> 阅读</label>
                <label><input type="checkbox" v-model="form.hobbies" value="sports"> 运动</label>
                <label><input type="checkbox" v-model="form.hobbies" value="music"> 音乐</label>
                <label><input type="checkbox" v-model="form.hobbies" value="travel"> 旅行</label>
            </div>
        </div>

        <div class="form-group">
            <label>所在城市 *</label>
            <select v-model="form.city">
                <option disabled :value="''">请选择</option>
                <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label>选择主题色</label>
            <input type="color" v-model="form.themeColor">
        </div>

        <!-- TODO 2: 使用 :style 绑定预览区域样式 -->
        <div class="preview-box" :style="__________">
            <h3>资料预览</h3>
            <p>用户名：{{ form.username || '未填写' }}</p>
            <p>性别：{{ genderLabel }}</p>
            <p>城市：{{ cityName }}</p>
            <p>兴趣爱好：{{ form.hobbies.join(', ') || '无' }}</p>
        </div>

        <button class="submit-btn" @click="submitForm">保存资料</button>

        <div v-if="submitted" class="result-panel">
            <h3>提交结果</h3>
            <pre>{{ JSON.stringify(form, null, 2) }}</pre>
        </div>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    form: {
                        username: '',
                        bio: '',
                        gender: 'secret',
                        hobbies: [],
                        city: '',
                        themeColor: '#3498db'
                    },
                    cities: [
                        { id: 1, name: '北京' },
                        { id: 2, name: '上海' },
                        { id: 3, name: '广州' },
                        { id: 4, name: '深圳' }
                    ],
                    showError: { username: false },
                    submitted: false
                }
            },
            computed: {
                usernameClass() {
                    // TODO 1 补全：已输入且长度 < 3 时返回 input-invalid，>=3 返回 input-valid
                    ____________
                },
                previewStyle() {
                    // TODO 2 补全：背景色为主题色 + '20'，边框和文字颜色为主题色
                    ____________
                },
                genderLabel() {
                    const map = { male: '男', female: '女', secret: '保密' };
                    return map[this.form.gender];
                },
                cityName() {
                    const city = this.cities.find(c => c.id === this.form.city);
                    return city ? city.name : '未选择';
                }
            },
            methods: {
                submitForm() {
                    // 校验
                    this.showError.username = this.form.username.length < 3;

                    if (this.form.username.length < 3 || !this.form.city) {
                        alert('请填写必填项');
                        return;
                    }

                    this.submitted = true;
                    console.log('提交数据：', this.form);
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
    usernameClass() {
        if (this.form.username.length === 0) return '';
        return this.form.username.length >= 3 ? 'input-valid' : 'input-invalid';
    },
    previewStyle() {
        return {
            backgroundColor: this.form.themeColor + '20',
            borderColor: this.form.themeColor,
            color: this.form.themeColor
        };
    }
}
```

**关键点**：
- 表单提交前统一触发表单校验，高亮错误字段
- 使用计算属性将原始值（如 `city: 1`）转换为可读文本（如 `"北京"`）
- 预览区域的样式绑定应响应主题色变化
</details>

---

## 知识检查清单

完成本讲后，你应该能够：

- [ ] 使用对象语法 `:class="{ active: isActive }"` 动态切换 class
- [ ] 使用数组语法 `:class="[classA, classB]"` 绑定多个 class
- [ ] 使用 `:style` 的对象语法绑定内联样式（camelCase）
- [ ] 理解 CSS 属性在 JavaScript 对象中使用 camelCase 命名
- [ ] 使用 `v-model` 绑定文本输入框（单行和多行）
- [ ] 使用 `v-model` 绑定复选框（单个布尔值和多个值的数组）
- [ ] 使用 `v-model` 绑定单选按钮
- [ ] 使用 `v-model` 绑定下拉选择框（单选和多选）
- [ ] 使用 `:value` 绑定非字符串值（数字、对象）到表单选项
- [ ] 在实际表单中整合 class、style 和表单绑定实现交互效果

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| class 名不生效 | 对象语法中使用了连字符但未加引号 | `text-danger` 应写为 `'text-danger'` |
| style 绑定无效 | CSS 属性名使用了 kebab-case 且未加引号 | 使用 camelCase 或加引号 |
| 复选框无法多选 | `v-model` 绑定的不是数组 | 多选复选框必须绑定数组 |
| 下拉框选择后显示空白 | 初始值与 option 的 value 不匹配 | 确保 `v-model` 初始值等于某个 option 的 value |
| 值绑定后类型变成字符串 | 未使用 `:value`，使用了 `value` | 动态值必须使用 `:value` |
| 对象值绑定后无法正确显示 | 初始值设为空字符串 `''` 而非空对象 | 初始值应与选项值的类型一致 |

---
title: "Bootstrap框架"
lectureNumber: 8
week: 8
module: "Bootstrap框架"
description: "Bootstrap价值与使用、响应式布局、组件与工具类、网格系统"
duration: "90分钟"
difficulty: "beginner"
prerequisites: ["lecture06"]
tags: ["Bootstrap", "响应式", "CSS框架", "网格系统"]
hasSlides: true
slidevUrl: https://jame-louis.github.io/slidev/web/lecture08
hasAssignment: false
draft: false
---


## 学习目标

通过本讲学习，你将能够：
- 理解Bootstrap的价值：它**提供了什么**、**解决了什么**、**改变了什么**
- 掌握Bootstrap的下载与引用方式
- 理解Bootstrap样式命名规律
- 运用栅格系统构建响应式布局
- 使用常用组件和工具类快速搭建页面

---

# 第一部分：Bootstrap认识（1学时）

## 1.1 Bootstrap提供了什么

### 🎯 费曼解释

想象你要装修一间房子：
- **不用Bootstrap**：从伐木、制砖开始，一切都自己造（写大量CSS）
- **使用Bootstrap**：宜家家具——标准化组件，按需组装，快速入住

Bootstrap提供了一套**预先做好的UI零件库**：

| 提供内容 | 具体说明 | 类比 |
|----------|----------|------|
| **CSS框架** | 预定义的样式类（布局、颜色、间距等） | 装修用的标准尺寸图纸 |
| **组件库** | 按钮、卡片、导航、表单等UI元素 | 宜家家具组件 |
| **JavaScript插件** | 模态框、轮播、折叠等交互功能 | 电动升降桌的电机 |
| **图标库** | Bootstrap Icons（独立但配套） | 家具的装饰配件 |
| **响应式系统** | 一套代码适配多设备的解决方案 | 可伸缩的家具组合 |

### ✅ 自检问题

> Bootstrap提供的核心资产是什么？（列举3项）

<details>
<summary>参考答案</summary>

1. **CSS框架** - 大量预定义的样式类
2. **组件库** - 现成的UI组件（按钮、卡片、导航等）
3. **JavaScript插件** - 交互式组件功能

</details>

---

## 1.2 Bootstrap解决了什么

### 前端开发的三大痛点

| 痛点 | Bootstrap的解决方案 |
|------|---------------------|
| **浏览器兼容性** | 自动处理不同浏览器的样式差异 |
| **响应式布局复杂** | 12列栅格系统，一套代码多设备适配 |
| **UI开发效率低** | 组件化开发，组合CSS类即可快速构建界面 |
| **设计不统一** | 一致的设计语言和视觉规范 |
| **移动端适配难** | 移动优先的设计理念，断点系统清晰 |

### 对比：不用Bootstrap vs 用Bootstrap

```html
<!-- 不用Bootstrap：写大量CSS -->
<button style="padding: 10px 20px; background: #007bff; color: white;
               border: none; border-radius: 4px; cursor: pointer;
               font-size: 16px;">按钮</button>

<!-- 用Bootstrap：一个类名搞定 -->
<button class="btn btn-primary">按钮</button>
```

---

## 1.3 Bootstrap改变了什么

### 对前端开发的影响

**1. 开发方式的转变**
- 从"写CSS"变成"组合类名"
- 从"像素级调整"变成"基于系统的设计"
- 从"重复造轮子"变成"复用组件"

**2. 团队协作的改善**
- 统一的设计规范减少沟通成本
- 类名语义化，代码可读性提高
- 新人上手快，学习曲线平缓

**3. 项目维护的简化**
- 框架本身维护兼容性
- 组件更新只需升级版本
- 样式一致性有保证

### ✅ 自检问题

> 使用Bootstrap后，你的CSS开发工作主要变成了什么？

<details>
<summary>参考答案</summary>

**组合类名**。不再是写大量自定义CSS，而是根据需求选择合适的Bootstrap类名进行组合。

</details>

---

## 1.4 Bootstrap版本迭代

### 版本演进历程

| 版本 | 发布时间 | 主要特性 |
|------|----------|----------|
| Bootstrap 2 | 2012年 | 响应式设计引入 |
| Bootstrap 3 | 2013年 | 移动优先设计 |
| Bootstrap 4 | 2018年 | Flexbox布局、卡片组件 |
| **Bootstrap 5** | 2021年 | 移除jQuery、原生JS、增强网格 |

### Bootstrap 4 vs Bootstrap 5 对比

| 特性 | Bootstrap 4 | Bootstrap 5 |
|------|-------------|-------------|
| jQuery | 依赖 | **移除** |
| JavaScript | 基于jQuery | **原生JavaScript** |
| 网格系统 | 5种断点 | **6种断点**（新增xxl） |
| 表单控件 | 自定义困难 | **自定义属性支持** |
| 颜色系统 | 基础颜色 | **扩展调色板** |
| 浏览器支持 | IE10+ | **现代浏览器** |

### 为什么学Bootstrap 5？

- **无jQuery依赖**：与现代前端框架（Vue/React）更兼容
- **更轻量**：文件体积更小
- **更好的定制性**：CSS变量支持
- **持续更新**：官方主推版本

---

# 第二部分：Bootstrap快速入门（1学时）

## 2.1 下载与引用

### 方式一：CDN引入（推荐学习使用）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap页面</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- 页面内容 -->

    <!-- Bootstrap JS（包含Popper） -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 方式二：npm安装（推荐项目使用）

```bash
# 安装Bootstrap
npm install bootstrap@5.3.0

# 在main.js中引入
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

### ⚠️ 关键要点

- **viewport meta标签**：必须添加，响应式才能生效
- **CSS放`<head>`**：样式先加载，避免闪烁
- **JS放`</body>`前**：确保DOM加载完成
- **bundle版本**：包含Popper，处理弹出层定位

### 练习2.1：创建第一个Bootstrap页面（5分钟）

**目标**：搭建Bootstrap基础HTML模板

**成功标准**：
- [ ] 正确引入Bootstrap 5.3.0 CSS
- [ ] 正确引入Bootstrap 5.3.0 JS
- [ ] 添加viewport meta标签
- [ ] 页面中有一个蓝色按钮（`btn btn-primary`）

<details>
<summary>参考答案</summary>

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的Bootstrap页面</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <button class="btn btn-primary">我的第一个Bootstrap按钮</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

</details>

---

## 2.2 样式命名规律与应用

### Bootstrap类名设计哲学

Bootstrap的类名遵循**语义化**和**模块化**原则，看到类名就能知道它的作用。

### 命名规律速查表

| 规律 | 示例 | 含义 |
|------|------|------|
| **功能前缀** | `btn-`、`nav-`、`card-` | 表示组件类型 |
| **状态修饰** | `-primary`、`-secondary`、`-success`、`-danger` | 颜色/状态 |
| **尺寸修饰** | `-lg`、`-sm` | 大小 |
| **布局修饰** | `-horizontal`、`-vertical` | 方向 |
| **响应式后缀** | `-sm`、`-md`、`-lg`、`-xl` | 断点 |

### 类名组合示例

```html
<!-- 按钮：组件 + 颜色 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-outline-danger">危险轮廓按钮</button>

<!-- 按钮：组件 + 颜色 + 大小 -->
<button class="btn btn-success btn-lg">大成功按钮</button>
<button class="btn btn-warning btn-sm">小警告按钮</button>

<!-- 间距工具：属性 + 方向 + 大小 -->
<div class="m-3">四周margin 1rem</div>
<div class="mt-2">顶部margin 0.5rem</div>
<div class="px-4">左右padding 1.5rem</div>
```

### 练习2.2：类名规律练习（5分钟）

根据命名规律，预测以下类名的作用：

| 类名 | 你的预测 |
|------|----------|
| `btn-outline-info` | |
| `alert-danger` | |
| `p-3` | |
| `mb-5` | |
| `text-center` | |
| `bg-primary` | |

<details>
<summary>参考答案</summary>

| 类名 | 作用 |
|------|------|
| `btn-outline-info` | 信息色的轮廓按钮（青色边框，透明背景） |
| `alert-danger` | 危险警告框（红色背景） |
| `p-3` | 四周padding 1rem (16px) |
| `mb-5` | 底部margin 3rem (48px) |
| `text-center` | 文字居中对齐 |
| `bg-primary` | 主色背景（蓝色） |

</details>

---

## 2.3 栅格系统理解与应用

### 🧠 核心概念：栅格 = 切蛋糕

想象你有一块蛋糕（整个页面宽度），要分给几个朋友：
- 蛋糕被切成 **12等份**
- 你可以把多份分给一个人（`col-4` = 4份 = 1/3宽度）
- 也可以让系统自动平均分配（`col`）

### 栅格系统的三层结构

```html
<!-- 第1层：容器（Container）-->
<div class="container">
    <!-- 第2层：行（Row）-->
    <div class="row">
        <!-- 第3层：列（Column）-->
        <div class="col">内容</div>
        <div class="col">内容</div>
    </div>
</div>
```

| 层级 | 作用 | 必须类名 |
|------|------|----------|
| **Container** | 包裹内容，控制最大宽度 | `container` 或 `container-fluid` |
| **Row** | 列的容器，启用Flexbox布局 | `row` |
| **Column** | 实际内容区域，分配宽度 | `col` 或 `col-{数字}` |

### 练习2.3：基础栅格布局（5分钟）

**目标**：创建一个三等分列布局

```html
<div class="container">
    <div class="row">
        <div class="col" style="background: #ffc107; padding: 20px;">列1</div>
        <div class="col" style="background: #0dcaf0; padding: 20px;">列2</div>
        <div class="col" style="background: #d63384; padding: 20px;">列3</div>
    </div>
</div>
```

**预期结果**：三列等宽并排显示

### 指定列宽

```html
<div class="row">
    <!-- col-数字：指定占几列（总共12列） -->
    <div class="col-8">占8列（2/3宽度）</div>
    <div class="col-4">占4列（1/3宽度）</div>
</div>
```

### 练习2.4：指定列宽（5分钟）

修改上面的代码，让三列变成 **2:1:1** 的比例

**提示**：`col-6` 占6/12=50%，`col-3` 占3/12=25%

<details>
<summary>参考答案</summary>

```html
<div class="row">
    <div class="col-6" style="background: #ffc107; padding: 20px;">占一半</div>
    <div class="col-3" style="background: #0dcaf0; padding: 20px;">占1/4</div>
    <div class="col-3" style="background: #d63384; padding: 20px;">占1/4</div>
</div>
```

</details>

### 响应式断点

Bootstrap 5 提供6种断点，对应不同屏幕尺寸：

| 断点 | 类前缀 | 尺寸 | 设备类型 |
|------|--------|------|----------|
| xs | 无（默认） | <576px | 手机竖屏 |
| sm | `.col-sm-*` | ≥576px | 手机横屏 |
| md | `.col-md-*` | ≥768px | 平板 |
| lg | `.col-lg-*` | ≥992px | 桌面显示器 |
| xl | `.col-xl-*` | ≥1200px | 大桌面显示器 |
| xxl | `.col-xxl-*` | ≥1400px | 超大屏幕 |

**记忆口诀**：`xs`特小、`sm`小、`md`中、`lg`大、`xl`特大、`xxl`超特大

### 响应式类名工作原理

```html
<div class="col-12 col-md-6 col-lg-4">
    内容
</div>
```

**解读**：
- `col-12`：手机（xs）占12列 = 整行
- `col-md-6`：平板（md）占6列 = 50%宽度
- `col-lg-4`：桌面（lg）占4列 = 33%宽度

### 练习2.5：响应式布局预测（5分钟）

预测以下代码在不同设备下的表现：

```html
<div class="row">
    <div class="col-12 col-md-6 col-lg-3">卡片1</div>
    <div class="col-12 col-md-6 col-lg-3">卡片2</div>
    <div class="col-12 col-md-6 col-lg-3">卡片3</div>
    <div class="col-12 col-md-6 col-lg-3">卡片4</div>
</div>
```

| 设备 | 每行显示几个 | 解释 |
|------|-------------|------|
| 手机（xs） | | |
| 平板（md） | | |
| 桌面（lg） | | |

<details>
<summary>参考答案</summary>

| 设备 | 每行显示 | 解释 |
|------|----------|------|
| 手机（xs） | 1个 | `col-12` = 100%宽度 |
| 平板（md） | 2个 | `col-md-6` = 50%宽度 |
| 桌面（lg） | 4个 | `col-lg-3` = 25%宽度 |

</details>

---

# 第三部分：常用组件与工具类

## 3.1 按钮（Button）

**命名规律**：`btn`（基础）+ `btn-{颜色}` + `btn-{大小}`

```html
<!-- 实心按钮 -->
<button class="btn btn-primary">主要</button>
<button class="btn btn-success">成功</button>
<button class="btn btn-danger">危险</button>

<!-- 轮廓按钮 -->
<button class="btn btn-outline-primary">主要轮廓</button>

<!-- 大小 -->
<button class="btn btn-primary btn-lg">大按钮</button>
<button class="btn btn-primary btn-sm">小按钮</button>
```

## 3.2 卡片（Card）

```html
<div class="card" style="width: 18rem;">
    <img src="image.jpg" class="card-img-top" alt="图片">
    <div class="card-body">
        <h5 class="card-title">卡片标题</h5>
        <p class="card-text">卡片内容描述...</p>
        <a href="#" class="btn btn-primary">查看详情</a>
    </div>
</div>
```

## 3.3 导航栏（Navbar）

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand" href="#">品牌名</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link active" href="#">首页</a></li>
                <li class="nav-item"><a class="nav-link" href="#">产品</a></li>
            </ul>
        </div>
    </div>
</nav>
```

## 3.4 工具类

### 间距工具（最常用）

**命名规则**：`{m/p}{边}-{大小}`

| 前缀 | 含义 |
|------|------|
| m | margin（外边距） |
| p | padding（内边距） |

| 边 | 含义 |
|------|------|
| t | top |
| b | bottom |
| s | start（左） |
| e | end（右） |
| x | 左右 |
| y | 上下 |

| 数字 | 大小 |
|------|------|
| 0 | 0 |
| 1 | 0.25rem (4px) |
| 2 | 0.5rem (8px) |
| 3 | 1rem (16px) |
| 4 | 1.5rem (24px) |
| 5 | 3rem (48px) |

```html
<div class="m-3">四周margin 16px</div>
<div class="mt-2">顶部margin 8px</div>
<div class="px-4">左右padding 24px</div>
<div class="mx-auto">左右margin auto（水平居中）</div>
```

### Flexbox工具

```html
<!-- 水平居中 -->
<div class="d-flex justify-content-center">...</div>

<!-- 两端对齐 -->
<div class="d-flex justify-content-between">...</div>

<!-- 垂直居中 -->
<div class="d-flex align-items-center">...</div>
```

### 颜色工具

```html
<p class="text-primary">蓝色文字</p>
<p class="text-danger">红色文字</p>
<div class="bg-primary text-white">蓝色背景白字</div>
<div class="bg-warning">黄色背景</div>
```

---

# 第四部分：基础应用实践（1学时）

## 实战项目：响应式产品列表页面

### 项目要求

创建一个完整的产品展示页面，包含：
1. 响应式导航栏（Bootstrap 5风格）
2. 产品卡片网格（手机1列，平板2列，桌面4列）
3. 页脚

### 挑战任务（Deliberate Practice）

#### Level 1 - 基础版（15分钟）

完成基础页面结构：
- [ ] 正确引入Bootstrap 5 CSS和JS
- [ ] 创建响应式导航栏
- [ ] 创建4个产品卡片（可先用占位符内容）

#### Level 2 - 完整版（20分钟）

在Level 1基础上完善：
- [ ] 添加产品图片（使用placeholder图片）
- [ ] 添加产品标题、描述、价格
- [ ] 添加购买按钮（价格和按钮两端对齐）
- [ ] 添加页脚

#### Level 3 - 进阶版（10分钟）

添加交互功能：
- [ ] 点击"查看详情"弹出模态框显示产品详情
- [ ] 给卡片添加悬停效果（使用CSS或Bootstrap工具类）

### 参考代码模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数码商城 - Bootstrap实战</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">数码商城</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item"><a class="nav-link active" href="#">首页</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">手机</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">电脑</a></li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="搜索">
                    <button class="btn btn-outline-light" type="submit">搜索</button>
                </form>
            </div>
        </div>
    </nav>

    <!-- 主体内容 -->
    <div class="container my-5">
        <h2 class="mb-4">热门产品</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            <!-- 产品卡片1 -->
            <div class="col">
                <div class="card h-100">
                    <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="产品">
                    <div class="card-body">
                        <h5 class="card-title">iPhone 15</h5>
                        <p class="card-text text-muted">最新款智能手机，A17芯片</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-danger fw-bold fs-5">¥5999</span>
                            <button class="btn btn-primary btn-sm">购买</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 复制更多卡片... -->
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
            <p class="mb-0">&copy; 2024 数码商城. 保留所有权利。</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 知识检查清单

完成本讲后，确认你能：

- [ ] 解释Bootstrap提供了什么、解决了什么、改变了什么
- [ ] 说明Bootstrap 5相对于Bootstrap 4的主要改进
- [ ] 正确引入Bootstrap的CSS和JS文件
- [ ] 理解Bootstrap类名命名规律（组件+修饰符）
- [ ] 解释12列栅格系统的工作原理
- [ ] 写出响应式断点（xs/sm/md/lg/xl/xxl）对应的类名
- [ ] 创建基础卡片组件（图片+标题+描述+按钮）
- [ ] 使用间距工具类（m-3, p-2, mx-auto等）
- [ ] 使用Flex工具类实现两端对齐和垂直居中
- [ ] 搭建一个完整的响应式页面（导航+内容+页脚）

---

## 常见错误与解决

| 错误 | 原因 | 解决 |
|------|------|------|
| 栅格不生效 | 忘记外层`container`或`row` | 确保结构：container > row > col |
| 列宽不生效 | 数字超过12 | 每行总和必须≤12 |
| 导航栏无法折叠 | 未引入Bootstrap JS | 添加bundle.js脚本 |
| 按钮没有样式 | 忘记`btn`基础类 | 必须有`btn` + `btn-{颜色}` |
| 响应式不生效 | 缺少viewport meta标签 | 添加`<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| 组件样式错乱 | CDN链接错误或版本不兼容 | 使用5.3.0版本CDN |

---

## 参考资源

1. **Bootstrap 5 官方文档**：https://getbootstrap.com/docs/5.3/
2. **Bootstrap 中文文档**：https://v5.bootcss.com/
3. **Bootstrap Icons**：https://icons.getbootstrap.com/
4. **Grid可视化工具**：https://getbootstrap.com/docs/5.3/examples/grid/

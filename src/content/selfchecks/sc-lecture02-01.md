---
question: JavaScript中let、const和var有什么区别？
answer: let是块级作用域可重新赋值；const是块级作用域不可重新赋值；var是函数作用域可重复声明（已不推荐使用）。
explanation: |
  **var（旧式，避免使用）**：
  - 函数作用域
  - 可重复声明
  - 存在变量提升

  **let（推荐使用）**：
  - 块级作用域（{}内有效）
  - 可重新赋值
  - 不存在变量提升

  **const（优先使用）**：
  - 块级作用域
  - 不可重新赋值（但对象属性可修改）
  - 声明时必须初始化

  **最佳实践**：优先使用const，需要重新赋值时用let，避免使用var。
module: JavaScript基础
tags: ["JavaScript", "变量", "ES6"]
relatedLectures: ["lecture02"]
draft: false
---

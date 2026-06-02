---
question: 面向对象编程的三大特性是什么？
answer: 封装、继承、多态。封装隐藏内部细节；继承实现代码复用；多态提高代码灵活性。
explanation: |
  **封装（Encapsulation）**：
  - 将数据和方法包装在对象中
  - 隐藏内部实现细节
  - 提高代码安全性和可维护性

  **继承（Inheritance）**：
  - 子类继承父类的属性和方法
  - 实现代码复用
  - ES6使用extends关键字

  **多态（Polymorphism）**：
  - 同一接口不同实现
  - 根据对象类型调用不同方法
  - 提高代码灵活性和可扩展性

  ```javascript
  class Person {
      constructor(name) { this.name = name; }
      login() { console.log(`${this.name}登录`); }
  }

  class Student extends Person {
      login() { console.log(`学生${this.name}登录`); } // 多态重写
  }
  ```
module: JavaScript基础
tags: ["JavaScript", "OOP", "面向对象"]
relatedLectures: ["lecture03"]
draft: false
---

---
question: ES6 Class中extends和super的作用是什么？
answer: extends用于声明类的继承关系；super用于调用父类的构造函数或方法。
explanation: |
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
      introduce() {
          // 调用父类方法并扩展
          return `${super.introduce()}，专业是${this.major}`;
      }
  }

  const s = new Student('张三', 20, '计算机科学');
  console.log(s.introduce()); // 我叫张三，20岁，专业是计算机科学
  ```

  **注意**：子类构造函数中必须先调用super()才能使用this。
module: JavaScript基础
tags: ["JavaScript", "ES6", "Class", "继承"]
relatedLectures: ["lecture03"]
draft: false
---

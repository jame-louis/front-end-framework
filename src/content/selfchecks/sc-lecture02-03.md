---
question: 箭头函数和普通函数有什么区别？
answer: 箭头函数语法更简洁，没有自己的this（继承外层this），不能作为构造函数，没有arguments对象。
explanation: |
  **语法对比**：
  ```javascript
  // 普通函数
  function add(a, b) {
      return a + b;
  }

  // 箭头函数
  const add = (a, b) => a + b;
  const square = x => x * x;
  ```

  **关键区别**：
  1. **this绑定**：箭头函数没有自己的this，继承外层作用域的this
  2. **不能new**：箭头函数不能用作构造函数
  3. **无arguments**：箭头函数没有arguments对象，可用剩余参数代替
  4. **语法简洁**：适合简单的回调函数
module: JavaScript基础
tags: ["JavaScript", "箭头函数", "ES6"]
relatedLectures: ["lecture02"]
draft: false
---

---
question: == 和 === 运算符有什么区别？
answer: ==进行值相等比较（会进行类型转换）；===进行严格相等比较（值和类型都必须相同）。
explanation: |
  ```javascript
  // == 值相等（类型转换）
  console.log(5 == "5");   // true（字符串"5"转为数字5）
  console.log(0 == false); // true
  console.log(null == undefined); // true

  // === 严格相等（值和类型）
  console.log(5 === "5");  // false（类型不同）
  console.log(0 === false); // false
  console.log(null === undefined); // false
  ```

  **最佳实践**：始终使用===进行比较，避免意外的类型转换。
module: JavaScript基础
tags: ["JavaScript", "运算符", "类型转换"]
relatedLectures: ["lecture02"]
draft: false
---

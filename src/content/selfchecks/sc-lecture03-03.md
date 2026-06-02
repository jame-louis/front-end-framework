---
question: JavaScript数组的map()、filter()和reduce()方法有什么区别？
answer: map()映射每个元素返回新数组；filter()过滤符合条件的元素；reduce()累计计算返回单个值。
explanation: |
  ```javascript
  const numbers = [1, 2, 3, 4, 5];

  // map() - 映射：每个元素乘以2
  const doubled = numbers.map(n => n * 2);
  // [2, 4, 6, 8, 10]

  // filter() - 过滤：只保留偶数
  const evens = numbers.filter(n => n % 2 === 0);
  // [2, 4]

  // reduce() - 累计：求和
  const sum = numbers.reduce((total, n) => total + n, 0);
  // 15

  // reduce() - 求最大值
  const max = numbers.reduce((max, n) => n > max ? n : max);
  // 5
  ```

  **共同点**：
  - 都不改变原数组
  - 都接收回调函数作为参数
module: JavaScript基础
tags: ["JavaScript", "数组", "方法"]
relatedLectures: ["lecture03"]
draft: false
---

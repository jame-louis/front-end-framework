---
question: Math.random()如何生成指定范围的随机整数？
answer: 使用Math.floor(Math.random() * (max - min + 1)) + min公式生成[min, max]范围的随机整数。
explanation: |
  ```javascript
  // 生成0-1之间的随机小数（不含1）
  Math.random(); // 0.123456...

  // 生成1-10之间的随机整数
  const randomNum = Math.floor(Math.random() * 10) + 1;

  // 通用公式：[min, max]范围的随机整数
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 生成50-100之间的随机整数
  console.log(getRandomInt(50, 100));
  ```

  **常用Math方法**：
  - Math.round() - 四舍五入
  - Math.floor() - 向下取整
  - Math.ceil() - 向上取整
  - Math.max() - 最大值
  - Math.min() - 最小值
module: JavaScript基础
tags: ["JavaScript", "Math", "随机数"]
relatedLectures: ["lecture03"]
draft: false
---

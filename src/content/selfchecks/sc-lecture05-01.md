---
question: 数组的splice()和slice()方法有什么区别？
answer: splice()会修改原数组，用于删除/插入元素；slice()不修改原数组，用于截取部分数组。
explanation: |
  ```javascript
  // slice() - 截取（不改变原数组）
  let arr = [1, 2, 3, 4, 5];
  let sliced = arr.slice(1, 4);  // 索引1到4（不包括4）
  console.log(sliced);  // [2, 3, 4]
  console.log(arr);     // [1, 2, 3, 4, 5]（原数组不变）

  // splice() - 删除/插入（改变原数组）
  let arr2 = [1, 2, 3, 4, 5];
  let removed = arr2.splice(1, 2);  // 从索引1开始删除2个
  console.log(removed); // [2, 3]
  console.log(arr2);    // [1, 4, 5]（原数组被修改）

  // splice()插入元素
  let arr3 = [1, 4, 5];
  arr3.splice(1, 0, 2, 3);  // 在索引1处插入2和3
  console.log(arr3);    // [1, 2, 3, 4, 5]
  ```

  **语法**：
  - slice(start, end) - 返回新数组
  - splice(start, deleteCount, ...items) - 返回被删除的元素
module: JavaScript基础
tags: ["JavaScript", "数组", "方法"]
relatedLectures: ["lecture05"]
draft: false
---

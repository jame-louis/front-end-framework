---
question: JSON.stringify()和JSON.parse()的作用是什么？
answer: JSON.stringify()将对象转换为JSON字符串用于存储；JSON.parse()将JSON字符串解析为对象。
explanation: |
  ```javascript
  const user = { name: '张三', age: 20 };

  // 序列化：对象 → JSON字符串
  const jsonStr = JSON.stringify(user);
  console.log(jsonStr); // '{"name":"张三","age":20}'

  // 存储到localStorage（只能存字符串）
  localStorage.setItem('user', jsonStr);

  // 读取并反序列化：JSON字符串 → 对象
  const stored = localStorage.getItem('user');
  const userData = JSON.parse(stored);
  console.log(userData.name); // 张三
  ```

  **为什么需要JSON**：
  - localStorage/sessionStorage只能存储字符串
  - 对象直接存储会得到"[object Object]"
  - JSON是数据的通用交换格式

  **注意**：JSON不能存储函数、undefined、循环引用。
module: JavaScript基础
tags: ["JavaScript", "JSON", "本地存储"]
relatedLectures: ["lecture06"]
draft: false
---

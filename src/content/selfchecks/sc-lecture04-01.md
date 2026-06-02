---
question: addEventListener和onclick有什么区别？
answer: addEventListener可以绑定多个事件处理器且不会被覆盖；onclick只能绑定一个，后设置的会覆盖前一个。
explanation: |
  ```javascript
  const btn = document.querySelector('#btn');

  // ❌ onclick：第二次赋值会静默覆盖第一次
  btn.onclick = () => console.log('处理器 A');
  btn.onclick = () => console.log('处理器 B'); // A 消失了

  // ✅ addEventListener：两个都会执行
  btn.addEventListener('click', () => console.log('处理器 A'));
  btn.addEventListener('click', () => console.log('处理器 B')); // A 仍然在
  ```

  **对比**：
  | 特性 | onclick | addEventListener |
  |------|---------|------------------|
  | 绑定数量 | 只能一个 | 可多个 |
  | 覆盖问题 | 后覆盖前 | 不会覆盖 |
  | 移除监听 | btn.onclick = null | removeEventListener |
  | 事件冒泡/捕获 | 只冒泡 | 可指定 |

  **最佳实践**：始终使用addEventListener。
module: JavaScript基础
tags: ["JavaScript", "事件", "DOM"]
relatedLectures: ["lecture04"]
draft: false
---

---
question: Event对象的target和currentTarget有什么区别？
answer: target是实际触发事件的元素；currentTarget是绑定事件监听器的元素。
explanation: |
  ```javascript
  document.querySelector('#list').addEventListener('click', (e) => {
      console.log(e.target);        // 实际被点击的<li>元素
      console.log(e.currentTarget); // 绑定监听器的<ul id="list">元素
  });
  ```

  **HTML结构示例**：
  ```html
  <ul id="list">
      <li>项目1</li>
      <li>项目2</li>
  </ul>
  ```

  **使用场景**：
  - target：用于事件委托，判断实际点击的是哪个子元素
  - currentTarget：在事件冒泡过程中，始终指向绑定监听器的元素

  **常用Event属性**：
  - e.type - 事件类型
  - e.clientX/Y - 鼠标视口坐标
  - e.key - 按下的键值
module: JavaScript基础
tags: ["JavaScript", "事件", "Event对象"]
relatedLectures: ["lecture04"]
draft: false
---

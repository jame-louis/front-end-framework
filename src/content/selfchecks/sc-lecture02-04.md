---
question: 如何通过JavaScript获取和修改DOM元素？
answer: 使用document.querySelector/querySelectorAll获取元素；使用textContent/innerHTML修改内容；使用style或classList修改样式。
explanation: |
  **获取元素**：
  ```javascript
  // 获取单个元素（推荐）
  const element = document.querySelector('#myId');
  const first = document.querySelector('.myClass');

  // 获取所有匹配元素
  const all = document.querySelectorAll('.myClass');
  ```

  **修改内容**：
  ```javascript
  element.textContent = '纯文本';      // 安全，不解析HTML
  element.innerHTML = '<b>HTML</b>';   // 解析HTML（注意XSS风险）
  ```

  **修改样式**：
  ```javascript
  // 直接修改style
  element.style.color = 'red';
  element.style.backgroundColor = '#fff'; // 驼峰命名

  // 使用classList（推荐）
  element.classList.add('active');
  element.classList.remove('hidden');
  element.classList.toggle('visible');
  ```
module: JavaScript基础
tags: ["JavaScript", "DOM", "操作元素"]
relatedLectures: ["lecture02"]
draft: false
---

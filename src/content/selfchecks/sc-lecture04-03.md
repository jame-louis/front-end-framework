---
question: 如何阻止表单提交的默认行为和事件冒泡？
answer: 使用e.preventDefault()阻止默认行为；使用e.stopPropagation()阻止事件冒泡。
explanation: |
  ```javascript
  // 阻止表单默认提交
  form.addEventListener('submit', (e) => {
      e.preventDefault(); // 阻止页面刷新
      console.log('表单提交被拦截');
  });

  // 阻止事件冒泡
  child.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件向上冒泡到父元素
      console.log('子元素点击');
  });

  // Vue中的事件修饰符
  <form @submit.prevent="onSubmit">    <!-- 阻止默认提交 -->
  <div @click.stop="onClick">          <!-- 阻止冒泡 -->
  <input @keyup.enter="onEnter">       <!-- 回车键触发 -->
  ```

  **事件流**：
  1. 捕获阶段（从window到目标元素）
  2. 目标阶段（到达目标元素）
  3. 冒泡阶段（从目标元素回到window）
module: JavaScript基础
tags: ["JavaScript", "事件", "表单"]
relatedLectures: ["lecture04"]
draft: false
---

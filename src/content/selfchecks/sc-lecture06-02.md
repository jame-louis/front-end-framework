---
question: localStorage和sessionStorage有什么区别？
answer: localStorage数据持久保存直到手动删除；sessionStorage数据仅在当前会话期间保存，关闭标签页即清除。
explanation: |
  | 特性 | localStorage | sessionStorage |
  |------|--------------|----------------|
  | 生命周期 | 永久保存（直到手动删除） | 会话期间（关闭标签页清除） |
  | 作用域 | 同源窗口共享 | 同一标签页内 |
  | 存储容量 | 约5-10MB | 约5-10MB |
  | 使用场景 | 长期保存用户偏好 | 临时表单数据恢复 |

  ```javascript
  // localStorage - 永久保存
  localStorage.setItem('username', '张三');
  localStorage.getItem('username'); // '张三'
  localStorage.removeItem('username'); // 删除某项
  localStorage.clear(); // 清空所有

  // sessionStorage - 会话级保存
  sessionStorage.setItem('tempData', '临时数据');
  // 关闭标签页后数据自动清除
  ```

  **注意**：
  - 两者都只能存储字符串，对象需用JSON序列化
  - 超出容量会抛出QuotaExceededError
module: JavaScript基础
tags: ["JavaScript", "localStorage", "sessionStorage"]
relatedLectures: ["lecture06"]
draft: false
---

---
question: 正则表达式中\d、\w、\s分别匹配什么？
answer: \d匹配数字[0-9]；\w匹配单词字符[a-zA-Z0-9_]；\s匹配空白字符。
explanation: |
  **预定义字符类**：
  | 模式 | 匹配内容 | 等价于 |
  |------|----------|--------|
  | \\d | 数字 | [0-9] |
  | \\D | 非数字 | [^0-9] |
  | \\w | 单词字符 | [a-zA-Z0-9_] |
  | \\W | 非单词字符 | [^a-zA-Z0-9_] |
  | \\s | 空白字符 | [空格、制表符、换行等] |
  | \\S | 非空白字符 | |

  ```javascript
  // 验证手机号（11位数字）
  /^1[3-9]\\d{9}$/.test('13800138000'); // true

  // 验证用户名（字母、数字、下划线）
  /^\\w{3,20}$/.test('user_123'); // true

  // 匹配空白分隔的内容
  'hello world'.split(/\\s+/); // ['hello', 'world']
  ```
module: JavaScript基础
tags: ["JavaScript", "正则表达式"]
relatedLectures: ["lecture05"]
draft: false
---

---
question: 前后端分离架构与传统SSR架构有什么区别？
answer: 传统SSR由服务端渲染完整HTML页面；前后端分离由前端独立部署，通过API获取JSON数据并在前端渲染。
explanation: |
  **传统B/S架构（SSR）**：
  - 服务端负责数据查询和页面渲染
  - 浏览器只负责展示HTML
  - 每次交互需刷新页面

  **现代B/S架构（前后端分离）**：
  - 前端独立部署，通过AJAX/Fetch与后端通信
  - 数据交互使用JSON格式
  - 用户体验接近原生应用，无需刷新页面
module: JavaScript基础
tags: ["架构", "前后端分离", "SSR"]
relatedLectures: ["lecture01"]
draft: false
---

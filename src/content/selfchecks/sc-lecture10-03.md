---
question: v-if和v-show有什么区别？
answer: v-if条件为假时不渲染/销毁组件；v-show始终渲染，仅切换CSS display属性。
explanation: |
  | 特性 | v-if | v-show |
  |------|------|--------|
  | 渲染方式 | 条件为假时不渲染/销毁组件 | 始终渲染，仅切换display |
  | 切换开销 | 高（需要创建/销毁） | 低（仅CSS切换） |
  | 初始渲染 | 条件为假时不渲染 | 始终渲染 |
  | 适用场景 | 切换频率低 | 频繁切换显示/隐藏 |

  ```html
  <!-- v-if - 条件渲染（真正创建/销毁） -->
  <p v-if="score >= 90">优秀</p>
  <p v-else-if="score >= 60">及格</p>
  <p v-else>不及格</p>

  <!-- v-show - 仅切换display -->
  <p v-show="isVisible">始终存在，只是隐藏</p>
  ```

  **注意**：v-if有更高的切换开销，v-show有更高的初始渲染开销。
module: Vue.js框架
tags: ["Vue.js", "v-if", "v-show", "条件渲染"]
relatedLectures: ["lecture10"]
draft: false
---

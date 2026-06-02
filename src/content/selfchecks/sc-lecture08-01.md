---
question: Bootstrap的网格系统是如何工作的？
answer: Bootstrap使用12列栅格系统，通过row和col类组合实现响应式布局，可指定不同断点下的列宽。
explanation: |
  **核心概念**：
  - 容器（.container）→ 行（.row）→ 列（.col-*）
  - 总宽度分为12列
  - 列宽类如.col-6表示占据6/12（50%）宽度

  **断点系统**：
  | 断点 | 类前缀 | 尺寸 |
  |------|--------|------|
  | xs | .col-* | <576px |
  | sm | .col-sm-* | ≥576px |
  | md | .col-md-* | ≥768px |
  | lg | .col-lg-* | ≥992px |
  | xl | .col-xl-* | ≥1200px |
  | xxl | .col-xxl-* | ≥1400px |

  ```html
  <div class="container">
      <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
              <!-- 移动端全宽，平板半宽，桌面1/3宽 -->
          </div>
      </div>
  </div>
  ```
module: Bootstrap框架
tags: ["Bootstrap", "网格系统", "响应式"]
relatedLectures: ["lecture08"]
draft: false
---

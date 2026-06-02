---
question: Vue组件的生命周期钩子有哪些？它们的执行时机是什么？
answer: 常用生命周期钩子有created（实例创建后）、mounted（挂载到DOM后）、updated（数据更新后）、unmounted（组件卸载后）。
explanation: |
  **常用生命周期钩子**：
  | 钩子 | 执行时机 | 典型用途 |
  |------|----------|----------|
  | created | 实例创建完成 | 数据初始化、API调用 |
  | mounted | 挂载到DOM后 | 操作DOM、第三方库初始化 |
  | updated | 数据更新后 | 响应数据变化 |
  | unmounted | 组件卸载后 | 清理资源、取消订阅 |

  ```javascript
  createApp({
      data() {
          return { count: 0 }
      },
      created() {
          console.log('实例创建，数据已可用');
          this.fetchData(); // 发起API请求
      },
      mounted() {
          console.log('已挂载到DOM');
          console.log(this.$el); // 可以访问DOM元素
      },
      updated() {
          console.log('数据已更新');
      },
      unmounted() {
          console.log('组件已卸载');
          // 清理定时器、取消网络请求等
      }
  });
  ```

  **注意**：不要在updated中修改数据，可能引发无限循环。
module: Vue.js框架
tags: ["Vue.js", "组件", "生命周期", "钩子"]
relatedLectures: ["lecture13"]
draft: false
---

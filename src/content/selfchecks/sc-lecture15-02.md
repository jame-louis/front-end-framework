---
question: Pinia和组件的data/computed有什么区别？什么时候应该使用Pinia？
answer: 组件data/computed仅当前组件可用；Pinia状态可跨组件共享。多组件共享数据或需要持久化时使用Pinia。
explanation: |
  | 特性 | 组件data/computed | Pinia Store |
  |------|-------------------|-------------|
  | 作用范围 | 当前组件 | 全局共享 |
  | 数据持久 | 组件销毁即丢失 | 可持久化（如配合localStorage） |
  | 适用场景 | 组件私有数据 | 多组件共享数据 |

  **使用Pinia的场景**：
  1. **用户状态** - 登录信息、权限
  2. **购物车** - 多个页面共享的购物车数据
  3. **主题设置** - 全局UI状态
  4. **缓存数据** - API响应缓存

  **使用组件data的场景**：
  1. 表单临时输入值
  2. 局部UI状态（如展开/折叠）
  3. 不需要共享的数据

  ```javascript
  // 组件本地状态
  data() {
      return {
          isOpen: false,  // 仅当前组件使用
          inputValue: ''  // 临时输入
      }
  }

  // Pinia全局状态
  const useUserStore = defineStore('user', {
      state: () => ({
          isLoggedIn: false,  // 多个组件需要
          userInfo: null      // 登录后全局使用
      })
  })
  ```
module: Vue.js框架
tags: ["Vue.js", "Pinia", "状态管理", "架构"]
relatedLectures: ["lecture15"]
draft: false
---

// Search configuration - unified across button and modal
export const searchConfig = {
  buttonLabel: '搜索',
  keyboardShortcut: 'Ctrl K',
  ariaLabel: '搜索',
  mobileMenuLabel: '打开菜单',
  placeholder: '搜索课程内容...',
  escapeKey: 'Esc',
  emptyState: '输入关键词开始搜索...',
  loadingState: '搜索中...',
  noResults: '未找到相关结果',
  errorMessage: '搜索服务暂不可用，请先运行构建命令',
  enterToOpen: '按 Enter 打开结果',
  navigateHint: '导航',
} as const;

// Search result category labels
export const categoryLabels: Record<string, string> = {
  lectures: '讲义',
  assignments: '作业',
  projects: '项目',
  materials: '资料',
  pages: '页面',
};

// Fallback text
export const searchLabels = {
  untitled: '无标题',
} as const;

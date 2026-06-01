// Main navigation items
export const mainNavItems = [
  { label: '首页', href: '/' },
  { label: '课程大纲', href: '/syllabus' },
  { label: '课程表', href: '/schedule' },
  { label: '课程', href: '/lectures' },
  { label: '作业', href: '/assignments' },
  { label: '项目', href: '/projects' },
  { label: '资料', href: '/materials' },
] as const;

// TOC Sidebar
export const tocConfig = {
  title: '本页目录',
} as const;

// Footer configuration
export const footerConfig = {
  text: '课程 - 专业必修/选修课',
  copyright: '课程',
} as const;

// Page titles
export const pageTitles = {
  home: '首页',
  lectures: '课程列表',
  assignments: '作业',
  projects: '项目',
  materials: '学习资料',
  schedule: '课程表',
  syllabus: '课程大纲',
} as const;

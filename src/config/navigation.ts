import type { NavItem } from '../types';

// Main navigation items
export const mainNavItems: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '课程大纲', href: '/syllabus' },
  { label: '课程表', href: '/schedule' },
  { label: '课程', href: '/lectures' },
  { label: '作业', href: '/assignments' },
  { label: '项目', href: '/projects' },
  { label: '资料', href: '/materials' },
];

// Sidebar configuration
export const sidebarConfig = {
  title: '课程导航',
  modules: [
    { name: 'JavaScript基础', range: [1, 6] as const },
    { name: 'Bootstrap框架', range: [8, 9] as const },
    { name: 'Vue.js框架', range: [10, 15] as const },
  ],
} as const;

// TOC Sidebar
export const tocConfig = {
  title: '本页目录',
} as const;

// Footer configuration
export const footerConfig = {
  text: '课程 - 计算机专业选修课',
  copyright: '前端框架课程',
} as const;

// Search configuration
export const searchConfig = {
  buttonLabel: '搜索',
  keyboardShortcut: 'Ctrl K',
  ariaLabel: '搜索',
  mobileMenuLabel: '打开菜单',
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

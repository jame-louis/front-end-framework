// Site-wide configuration
export const site = {
  title: '课程网站',
  description: '基于 Astro 的课程内容管理系统',
  lang: 'zh-CN',
  separator: ' - ',
} as const;

// Course information (static metadata)
export const courseInfo = {
  name: '课程',
  subtitle: '专业必修/选修课',
  description: '在这里填写课程的简要描述，介绍课程目标、适用人群和学习成果。',
  textbook: '《示例教材》(出版社)',
  prerequisites: '计算机基础、程序设计入门',
  assessment: '出勤(10%) + 平时(30%) + 期末(60%)',
} as const;

// Homepage CTA buttons
export const homeActions = {
  primary: { label: '开始学习', href: '/lectures' },
  secondary: { label: '查看大纲', href: '/syllabus' },
} as const;

// Difficulty levels
export const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
} as const;

// Common action labels
export const labels = {
  viewAll: '查看全部 →',
  viewDetails: '查看详情 →',
  viewLecture: '查看 →',
  download: '下载',
  back: '← 返回',
  previous: '上一讲',
  next: '下一讲',
  none: '没有了',
  markComplete: '标记为已完成',
  completed: '已完成',
  slides: '课件',
  assignment: '作业',
} as const;

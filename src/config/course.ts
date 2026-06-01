// Course module definitions - shared across content config and UI
export const courseModules = {
  // Module names for content schema validation
  names: [
    '基础入门',
    '核心概念',
    'JavaScript基础',
    'Bootstrap框架',
    'Vue.js框架',
    '其他',
  ] as const,

  // Module display configuration for homepage
  display: [
    {
      name: '基础入门',
      description: '课程介绍、环境搭建、开发工具',
    },
    {
      name: '核心概念',
      description: '响应式设计、组件化思想、现代前端开发流程',
    },
  ],
} as const;

// Type for module names (derived from the array)
export type ModuleName = (typeof courseModules.names)[number];

// Lecture-related labels
export const lectureLabels = {
  sectionTitle: '课程列表',
  contentSectionTitle: '课程内容',
  hasSlidesBadge: '有课件',
  slidevBanner: '本课程有配套 Slidev 演示文稿',
  countSuffix: '讲课程',
  moduleCountTemplate: '包含 {count} 讲课程',
} as const;

// Syllabus page labels
export const syllabusLabels = {
  objectivesTitle: '课程目标',
  modulesTitle: '模块划分',
  scheduleTitle: '详细安排',
  courseRangeLabel: '课程范围:',
  lectureRangeTemplate: '第{start}-{end}讲',
} as const;

// Course objectives
export const courseObjectives = [
  '掌握现代前端开发的核心概念和技术栈',
  '熟练使用主流前端框架进行项目开发',
  '理解响应式设计和组件化开发思想',
  '具备独立分析和解决前端问题的能力',
];

// Assignment-related labels
export const assignmentLabels = {
  pageTitle: '课程作业',
  submissionFormat: '作业提交格式：学号-HWxx.zip（例如：No20001-HW02.zip）',
  defaultSubmissionFormat: '学号-HWxx.zip',
  deadline: '📅 截止日期:',
  estimatedTime: '⏱️ 预计耗时:',
  points: '📝 分值:',
  submissionFormatLabel: '📤 提交格式:',
  requirementsTitle: '作业要求',
  requirements: [
    '作业文件命名格式：学号-HWxx.zip（例如：No20001-HW02.zip）',
    '提交截止日期前完成，逾期提交将酌情扣分',
    '代码需包含必要的注释和说明文档',
  ],
  downloadButton: '下载作业文件',
} as const;

// Project-related labels
export const projectLabels = {
  pageTitle: '课程项目',
  description: '综合项目练习，应用所学知识完成实际开发任务',
  projectLabel: '项目',
  pointsSuffix: '分',
  milestonesTitle: '项目里程碑',
  deadlineLabel: '截止日期:',
} as const;

// Materials-related labels
export const materialsLabels = {
  pageTitle: '学习资料',
  description: '推荐的学习资源，帮助你更深入地理解课程内容',
  tagPrefix: '#',
} as const;

// Material type labels
export const materialTypeLabels: Record<string, string> = {
  article: '文章',
  video: '视频',
  code: '代码',
  tool: '工具',
  book: '书籍',
};

// Schedule page labels
export const scheduleLabels = {
  pageTitle: '课程表',
  weekSuffix: '周',
  courseBadge: '课程',
  assignmentBadge: '作业',
  slidesTitle: '打开课件',
  downloadTitle: '下载作业文件',
  emptyState: '暂无安排',
  emptyStateHelp: '暂无课程安排，请先为课程和作业添加 week 字段',
} as const;

// Progress labels
export const progressLabels = {
  label: '学习进度',
} as const;

// Default values for content schema
export const contentDefaults = {
  duration: '90分钟',
  submissionFormat: '学号-HWxx.zip',
} as const;

// Info section labels (homepage)
export const infoSectionLabels = {
  courseInfoTitle: '课程信息',
  textbookLabel: '教材',
  prerequisitesLabel: '先修课程',
  assessmentLabel: '考核方式',
} as const;

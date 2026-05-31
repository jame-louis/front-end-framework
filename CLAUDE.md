# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site template for university course websites (前端框架课程). It provides a complete system for managing course lectures, assignments, projects, and materials with features like progress tracking, search, and responsive design.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes Pagefind search index generation)
npm run build

# Preview production build
npm run preview
```

## Content Architecture

Content is managed through Astro's content collections defined in `src/content.config.ts`:

- **lectures**: Course lectures with frontmatter metadata (lectureNumber, module, difficulty, etc.)
- **assignments**: Homework assignments linked to lectures via `lectureRef`
- **projects**: Course projects with milestones
- **materials**: External resources (articles, videos, tools)

Content files are stored in `src/content/{collection}/` as Markdown with YAML frontmatter.

### Lecture Frontmatter Schema

```yaml
---
title: string
lectureNumber: number
module: '基础入门' | '核心概念' | 'JavaScript基础' | 'Bootstrap框架' | 'Vue.js框架' | '其他'
description: string
duration: string
difficulty: 'beginner' | 'intermediate' | 'advanced'
prerequisites: string[]
tags: string[]
hasSlides: boolean
hasAssignment: boolean
slidevUrl: string (optional)
draft: boolean
---
```

## Layout Hierarchy

- `BaseLayout.astro`: Root HTML structure, global styles
- `CourseLayout.astro`: Course-specific chrome (header, navigation)
- `DocLayout.astro`: Content pages with sidebar navigation and TOC

## Key Components

- `src/components/navigation/Sidebar.astro`: Lecture navigation sidebar
- `src/components/content/TOCSidebar.astro`: Table of contents from headings
- `src/components/search/`: Pagefind search modal integration

## Styling System

Uses Tailwind CSS v4 with custom theme defined in `src/styles/global.css`:

```css
@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}
```

Custom prose styles via `.prose-custom` class for content rendering.

## Client-Side Features

### Progress Tracking
`src/lib/progress.ts` provides localStorage-based progress tracking:
- `markComplete(slug)`, `markIncomplete(slug)`, `toggleComplete(slug)`
- `getCompletionPercentage(total)` for progress bar

Used in lecture pages with "Mark Complete" buttons and shown on lecture list page.

### Search
Pagefind is integrated for static search:
- Indexes built during `postbuild` script
- Search modal in `src/components/search/SearchModal.astro`
- Triggered via keyboard shortcut (Ctrl/Cmd+K) or button

## Build Configuration

- Static output (`output: 'static'`)
- Shiki syntax highlighting with GitHub Dark theme
- Rehype plugins: `rehype-slug`, `rehype-autolink-headings` for TOC generation
- Tailwind CSS via Vite plugin

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to main. Also supports Netlify deployment via `netlify.toml`.

## Important Notes

- Update `site` URL in `astro.config.mjs` before deploying
- Draft content (frontmatter: `draft: true`) is filtered out in production
- Pagefind search index is generated after build; requires `npm run build` (not just `astro build`)
- Mobile-first responsive design with touch-friendly targets

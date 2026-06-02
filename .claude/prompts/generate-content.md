# Content Generation Prompt

You are a content generator for an Astro-based course website. Transform source files into properly formatted content files in `src/content/`.

## Source → Output Mapping

| Source Pattern | Output Path | Notes |
|---------------|-------------|-------|
| `sources/lecture-{NN}-*.md` | `src/content/lectures/lecture{NN}.md` | Lecture content |
| `sources/lecture-{NN}-*-assignment.md` | `src/content/assignments/assignment{NN}.md` | Assignment with `lectureRef: "lecture{NN}"` |
| `sources/lecture-{NN}-*-selfcheck.md` | `src/content/selfchecks/*.md` | Multiple self-check items |

## Safety Rules

1. **Check before overwrite**: If target exists and `--force` was not specified, skip with message: "Skipping {file}: already exists. Use --force to overwrite."
2. **Never hallucinate**: Preserve source content as-is. Only expand content where `<!-- expand -->` marker is present.
3. **Frontmatter validation**: Ensure output matches schemas in `src/content.config.ts`.

## Content Processing

### Lecture Files

**Source format:**
```yaml
---
title: string
lectureNumber: number
module: '基础入门' | '核心概念' | ... (must match courseModules in src/config.ts)
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

## Learning Objectives
- objective 1
- objective 2

## Content
<!-- expand -->
- Brief point that becomes full paragraph
<!-- endexpand -->

- Brief point that stays as bullet
```

**Processing rules:**
- Headings pass through unchanged
- `<!-- expand -->` ... `<!-- endexpand -->`: Transform bullet list into full prose paragraphs (1-2 paragraphs per bullet)
- Content outside expand markers: Preserve markdown formatting

### Assignment Files

**Source format:**
```yaml
---
title: string
assignmentNumber: number
week: number (optional)
difficulty: 'easy' | 'medium' | 'hard'
estimatedHours: number (optional)
points: number (optional)
submissionFormat: string
dueDate: date (optional)
draft: boolean
---

## Description
Brief description of the assignment.

## Tasks
- [ ] Task 1
- [ ] Task 2

## Deliverables
What to submit.
```

**Output additions:**
- Add `lectureRef: "lecture{NN}"` based on source filename

### Self-Check Files

**Source format:**
```yaml
---
lectureRef: string (e.g., "lecture01")
module: string (must match courseModules)
tags: string[] (optional)
draft: boolean
---

## Self Check

Q: What is the primary purpose of X?
A: The primary purpose is Y.
Explanation: X is designed to Y because Z.

Q: How do you configure Z?
A: Use the config file at path/to/config.
Explanation: This location is standard because...
```

**Output:** Generate one file per Q&A pair:

**File:** `src/content/selfchecks/{lectureRef}-sc{N}.md`
```yaml
---
question: "What is the primary purpose of X?"
answer: "The primary purpose is Y."
explanation: "X is designed to Y because Z."
module: "基础入门"
tags: []
relatedLectures: ["lecture01"]
draft: false
---
```

## Workflow

1. Read all source files from `sources/` directory
2. Group by lecture number from filename
3. For each lecture:
   - Generate lecture file
   - Generate assignment file (if source exists)
   - Generate self-check files (if source exists, one per Q&A)
4. Report counts: created, skipped, errors

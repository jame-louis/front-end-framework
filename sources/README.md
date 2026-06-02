# Content Source Files

This directory contains source files for generating course content.

## Naming Convention

| Pattern | Generates |
|---------|-----------|
| `lecture-{NN}-{slug}.md` | Lecture content |
| `lecture-{NN}-{slug}-assignment.md` | Assignment linked to lecture {NN} |
| `lecture-{NN}-{slug}-selfcheck.md` | Self-check Q&A items for lecture {NN} |

{NN} is a zero-padded two-digit number (01, 02, 03, etc.)

## Example Workflow

1. Create source files:
   ```bash
   sources/
   ├── lecture-01-intro.md
   ├── lecture-01-intro-assignment.md
   ├── lecture-01-intro-selfcheck.md
   ├── lecture-02-components.md
   └── lecture-02-components-assignment.md
   ```

2. Generate content:
   ```bash
   @content-generate
   ```

3. This creates:
   ```
   src/content/
   ├── lectures/
   │   ├── lecture01.md
   │   └── lecture02.md
   ├── assignments/
   │   ├── assignment01.md
   │   └── assignment02.md
   └── selfchecks/
       ├── lecture01-sc1.md
       ├── lecture01-sc2.md
       └── ...
   ```

## Source File Templates

### Lecture Template

```markdown
---
title: "Lecture Title"
lectureNumber: 1
module: "基础入门"
description: "One-line description"
duration: "45min"
difficulty: "beginner"
prerequisites: []
tags: ["tag1", "tag2"]
hasSlides: false
hasAssignment: true
slidevUrl: ""
draft: false
---

## Learning Objectives
- Objective 1
- Objective 2

## Content

<!-- expand -->
- Key concept that needs full explanation
<!-- endexpand -->

- Supporting point (stays as bullet)
- Another supporting point

## Summary
Brief recap of key points.
```

### Assignment Template

```markdown
---
title: "Assignment Title"
assignmentNumber: 1
week: 1
difficulty: "easy"
estimatedHours: 2
points: 10
submissionFormat: "GitHub repo URL"
dueDate: "2026-09-15"
draft: false
---

## Description
What this assignment covers.

## Tasks
- [ ] Task description
- [ ] Another task

## Deliverables
List what to submit.

## Evaluation Criteria
- Criterion 1
- Criterion 2
```

### Self-Check Template

```markdown
---
lectureRef: "lecture01"
module: "基础入门"
tags: []
draft: false
---

## Self Check

Q: Question text here?
A: Concise answer.
Explanation: Detailed explanation of why this is the answer.

Q: Another question?
A: Another answer.
Explanation: Another detailed explanation.
```

## Expand Markers

Use `<!-- expand -->` and `<!-- endexpand -->` to indicate bullet points that should be transformed into full prose paragraphs in the output.

**Without expand:**
```markdown
- Point A
- Point B
```
Output: Bullet list preserved

**With expand:**
```markdown
<!-- expand -->
- Point A becomes a full paragraph explaining the concept in detail.
- Point B becomes another paragraph with expanded content.
<!-- endexpand -->
```
Output: Each bullet becomes 1-2 paragraphs of prose

import { defineCollection, z } from 'astro:content';
import { courseModules, contentDefaults } from './config/course';

const lectures = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lectureNumber: z.number(),
    week: z.number().optional(),
    module: z.enum(courseModules.names),
    description: z.string(),
    duration: z.string().default(contentDefaults.duration),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    prerequisites: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    hasSlides: z.boolean().default(false),
    hasAssignment: z.boolean().default(false),
    slidevUrl: z.string().optional(),
    draft: z.boolean().default(false),
    publishDate: z.date().optional(),
  }),
});

const assignments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    assignmentNumber: z.number(),
    lectureRef: z.string(),
    week: z.number().optional(),
    dueDate: z.date().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    estimatedHours: z.number().default(2),
    submissionFormat: z.string().default(contentDefaults.submissionFormat),
    points: z.number().default(100),
    downloadFile: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    projectNumber: z.number(),
    description: z.string(),
    milestones: z.array(z.object({
      title: z.string(),
      dueDate: z.date().optional(),
      description: z.string(),
    })).default([]),
    totalPoints: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const materials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'video', 'code', 'tool', 'book']),
    url: z.string().optional(),
    description: z.string(),
    lectureRef: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  lectures,
  assignments,
  projects,
  materials,
};

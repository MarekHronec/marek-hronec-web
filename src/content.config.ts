import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const knowledgeBase = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/knowledge-base' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['azure', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm']),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    readTime: z.number(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    excerpt: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    duration: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    excerpt: z.string(),
  }),
});

export const collections = { knowledgeBase, caseStudies };
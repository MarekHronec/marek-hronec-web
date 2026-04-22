import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const knowledgeBase = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/knowledge-base' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['azure', 'oci', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm']),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    readTime: z.number().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    excerpt: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    context: z.string(),
    industry: z.string(),
    role: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    excerpt: z.string(),
    heroImage: z.string().optional(),
    heroCaption: z.string().optional(),
    heroVersion: z.string().optional(),
    titleHighlight: z.string().optional(),
    platform: z.string().optional(),
    focus: z.string().optional(),
    principles: z.array(z.string()).optional(),
    outcomes: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

export const collections = { knowledgeBase, caseStudies };
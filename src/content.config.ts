import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({
    base: './src/content/cases',
    pattern: '**/*.md',
    generateId: ({ data }) => `${data.locale}/${data.slug}`,
  }),
  schema: z.object({
    locale: z.enum(['en', 'pt-br', 'es']),
    slug: z.string(),
    order: z.number().int().min(1).max(6),
    title: z.string(),
    eyebrow: z.string(),
    description: z.string(),
    role: z.string(),
    year: z.number(),
    dataKind: z.enum(['synthetic', 'public', 'generated']),
    dataLabel: z.string(),
    question: z.string(),
    repoUrl: z.url(),
    demoUrl: z.url().optional(),
    image: z.string().optional(),
    socialImage: z.string().optional(),
    imageAlt: z.string().optional(),
    sourceCommit: z.string(),
    evidence: z.array(z.object({ label: z.string(), value: z.string() })).min(2).max(4),
    scope: z.array(z.string()).min(1),
  }),
});

export const collections = { caseStudies };

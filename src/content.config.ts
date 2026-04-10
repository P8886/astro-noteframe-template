import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parseContentDate } from './utils/dates';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.union([z.string(), z.date()]).transform(parseContentDate),
			updatedDate: z.union([z.string(), z.date()]).transform(parseContentDate).optional(),
			type: z.enum(['note', 'short']).default('note'),
			tags: z.array(z.string()).default([]),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };

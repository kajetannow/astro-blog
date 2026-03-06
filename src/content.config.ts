import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const photojournal = defineCollection({
	loader: glob({ base: './src/content/photojournal', pattern: '**/*.pl.{md,mdx}' }),
// loader: glob({ base: './src/content/photojournal', pattern: '**/*.{yaml,yml}' }),
  	schema: ({ image }) =>
		z.object({
		title: z.string(),
		description: z.string(),
		cover: image(),
		date: z.coerce.date(),
		date_end: z.coerce.date().optional(),
		location: z.string().optional(),
		camera: z.string().optional(),
		lens: z.string().optional(),
		}),
});

export const collections = {
	blog,
	photojournal,
};

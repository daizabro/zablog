import { defineCollection, z } from "astro:content";
import { noteLoader } from "./loaders/note";
import { sizuLoader } from "./loaders/sizu";
import { youtubeLoader } from "./loaders/youtube";
import { zennLoader } from "./loaders/zenn";
import { SECTIONS, SOURCES } from "./lib/types";

const entrySchema = z.object({
	title: z.string(),
	url: z.string().url(),
	publishedAt: z.date(),
	section: z.enum(SECTIONS),
	source: z.enum(SOURCES),
	excerpt: z.string().optional(),
	thumbnail: z.string().optional(),
});

const note = defineCollection({ loader: noteLoader(), schema: entrySchema });
const zenn = defineCollection({ loader: zennLoader(), schema: entrySchema });
const sizu = defineCollection({ loader: sizuLoader(), schema: entrySchema });
const youtube = defineCollection({
	loader: youtubeLoader(),
	schema: entrySchema,
});

export const collections = { note, zenn, sizu, youtube };

import { getCollection } from "astro:content";
import type { Section } from "@/constants/types";

const COLLECTIONS = ["note", "zenn", "sizu", "youtube"] as const;

async function getAllEntries() {
	const collections = await Promise.all(
		COLLECTIONS.map((name) => getCollection(name)),
	);
	return collections.flat();
}

export async function getEntriesBySection(section: Section) {
	const entries = await getAllEntries();
	return entries
		.filter((entry) => entry.data.section === section)
		.sort(
			(a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
		);
}

export async function getLatestEntries(limit: number) {
	const entries = await getAllEntries();
	return entries
		.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
		.slice(0, limit);
}

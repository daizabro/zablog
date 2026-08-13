import type { Loader } from "astro/loaders";
import {
	NOTE_FALLBACK_SECTION,
	NOTE_HASHTAG_RULES,
} from "@/constants/note-hashtags";
import type { Section } from "../lib/types";

const CREATOR = "dai_zabzab";

type NoteApiItem = {
	key: string;
	name: string;
	publishAt: string;
	body: string;
	eyecatch?: string;
	hashtags?: { hashtag: { name: string } }[];
};

type NoteApiResponse = {
	data: {
		contents: NoteApiItem[];
		isLastPage: boolean;
	};
};

function resolveSection(hashtags: string[]): Section {
	for (const rule of NOTE_HASHTAG_RULES) {
		if (hashtags.some((tag) => rule.hashtags.includes(tag))) {
			return rule.section;
		}
	}
	return NOTE_FALLBACK_SECTION;
}

export function noteLoader(): Loader {
	return {
		name: "note-loader",
		load: async ({ store, parseData, logger }) => {
			const items: NoteApiItem[] = [];
			let page = 1;

			while (true) {
				const res = await fetch(
					`https://note.com/api/v2/creators/${CREATOR}/contents?kind=note&page=${page}`,
				);
				if (!res.ok) {
					throw new Error(
						`note API request failed (page ${page}): ${res.status} ${res.statusText}`,
					);
				}
				const json = (await res.json()) as NoteApiResponse;
				items.push(...json.data.contents);
				if (json.data.isLastPage) break;
				page += 1;
			}

			store.clear();

			for (const item of items) {
				const hashtags = (item.hashtags ?? []).map((h) => h.hashtag.name);
				const id = item.key;
				const data = await parseData({
					id,
					data: {
						title: item.name,
						url: `https://note.com/${CREATOR}/n/${item.key}`,
						publishedAt: new Date(item.publishAt),
						section: resolveSection(hashtags),
						source: "note",
						excerpt: item.body.trim().slice(0, 140),
						thumbnail: item.eyecatch || undefined,
					},
				});
				store.set({ id, data });
			}

			logger.info(`Loaded ${items.length} note articles`);
		},
	};
}

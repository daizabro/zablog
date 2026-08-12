import type { Loader } from "astro/loaders";
import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://sizu.me/dai_zabzab/rss";

type SizuRssItem = {
	title: string;
	link: string;
	guid: string;
	pubDate: string;
	description?: string;
};

function toArray<T>(value: T | T[] | undefined): T[] {
	if (value === undefined) return [];
	return Array.isArray(value) ? value : [value];
}

export function sizuLoader(): Loader {
	return {
		name: "sizu-loader",
		load: async ({ store, parseData, logger }) => {
			const res = await fetch(FEED_URL);
			if (!res.ok) {
				throw new Error(
					`sizu.me RSS request failed: ${res.status} ${res.statusText}`,
				);
			}
			const xml = await res.text();
			const parser = new XMLParser({ cdataPropName: "__cdata" });
			const parsed = parser.parse(xml);
			const rawItems = toArray<Record<string, unknown>>(
				parsed?.rss?.channel?.item,
			);

			store.clear();

			for (const raw of rawItems) {
				const item: SizuRssItem = {
					title: extractText(raw.title),
					link: String(raw.link),
					guid: String(raw.guid),
					pubDate: String(raw.pubDate),
					description: raw.description
						? extractText(raw.description)
						: undefined,
				};
				const id = item.guid.split("/").pop() ?? item.guid;
				const data = await parseData({
					id,
					data: {
						title: item.title,
						url: item.link,
						publishedAt: new Date(item.pubDate),
						section: "personality",
						source: "sizu",
						excerpt: item.description?.trim().slice(0, 140),
					},
				});
				store.set({ id, data });
			}

			logger.info(`Loaded ${rawItems.length} しずかなインターネット posts`);
		},
	};
}

function extractText(value: unknown): string {
	if (typeof value === "string") return value;
	if (value && typeof value === "object" && "__cdata" in value) {
		return String((value as { __cdata: unknown }).__cdata);
	}
	return String(value);
}

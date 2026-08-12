import type { Loader } from "astro/loaders";
import { YOUTUBE_VIDEOS } from "../config/youtube-videos";

type OEmbedResponse = {
	title: string;
	thumbnail_url: string;
};

export function youtubeLoader(): Loader {
	return {
		name: "youtube-loader",
		load: async ({ store, parseData, logger }) => {
			store.clear();

			for (const video of YOUTUBE_VIDEOS) {
				const res = await fetch(
					`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`,
				);
				if (!res.ok) {
					throw new Error(
						`YouTube oEmbed request failed for ${video.id}: ${res.status} ${res.statusText}`,
					);
				}
				const oembed = (await res.json()) as OEmbedResponse;
				const data = await parseData({
					id: video.id,
					data: {
						title: oembed.title,
						url: `https://www.youtube.com/watch?v=${video.id}`,
						publishedAt: new Date(video.publishedAt),
						section: video.section,
						source: "youtube",
						thumbnail: oembed.thumbnail_url,
					},
				});
				store.set({ id: video.id, data });
			}

			logger.info(`Loaded ${YOUTUBE_VIDEOS.length} YouTube videos`);
		},
	};
}

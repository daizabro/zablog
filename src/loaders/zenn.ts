import type { Loader } from "astro/loaders";

const USERNAME = "dai_zabzab";

type ZennApiArticle = {
	slug: string;
	title: string;
	published_at: string;
	emoji: string;
};

type ZennApiResponse = {
	articles: ZennApiArticle[];
	next_page: number | null;
};

export function zennLoader(): Loader {
	return {
		name: "zenn-loader",
		load: async ({ store, parseData, logger }) => {
			const articles: ZennApiArticle[] = [];
			let page: number | null = 1;

			while (page !== null) {
				const res = await fetch(
					`https://zenn.dev/api/articles?username=${USERNAME}&order=latest&page=${page}`,
				);
				if (!res.ok) {
					throw new Error(
						`Zenn API request failed (page ${page}): ${res.status} ${res.statusText}`,
					);
				}
				const json = (await res.json()) as ZennApiResponse;
				articles.push(...json.articles);
				page = json.next_page;
			}

			store.clear();

			for (const article of articles) {
				const id = article.slug;
				const data = await parseData({
					id,
					data: {
						title: `${article.emoji} ${article.title}`,
						url: `https://zenn.dev/${USERNAME}/articles/${article.slug}`,
						publishedAt: new Date(article.published_at),
						section: "development",
						source: "zenn",
					},
				});
				store.set({ id, data });
			}

			logger.info(`Loaded ${articles.length} Zenn articles`);
		},
	};
}

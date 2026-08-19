import EntryCard from "./EntryCard.astro";

export default {
	title: "Components/EntryCard",
	component: EntryCard,
	tags: ["autodocs"],
};

export const Default = {
	args: {
		entry: {
			title: "Astroでブログを作り直した話",
			url: "https://example.com/entries/rebuild-blog-with-astro",
			publishedAt: new Date("2026-07-01"),
			section: "development",
			source: "zenn",
			excerpt:
				"既存のブログをAstroで作り直した際に工夫した点や、つまずいたポイントについてまとめました。",
			thumbnail: "https://placehold.co/320x180",
		},
	},
};

export const NoThumbnail = {
	args: {
		entry: {
			...Default.args.entry,
			thumbnail: undefined,
		},
	},
};

export const NoExcerpt = {
	args: {
		entry: {
			...Default.args.entry,
			excerpt: undefined,
		},
	},
};

export const LongTitleAndExcerpt = {
	args: {
		entry: {
			...Default.args.entry,
			title:
				"とても長いタイトルの記事の場合にEntryCardのレイアウトがどのように崩れるかを確認するためのストーリーです",
			excerpt:
				"抜粋文が長い場合には2行で省略表示されることを確認するためのテキストです。3行目以降が表示されずに省略記号で切り詰められていることを確認してください。",
		},
	},
};

export const Note = {
	args: {
		entry: {
			...Default.args.entry,
			source: "note",
		},
	},
};

export const Sizu = {
	args: {
		entry: {
			...Default.args.entry,
			source: "sizu",
		},
	},
};

export const Youtube = {
	args: {
		entry: {
			...Default.args.entry,
			source: "youtube",
		},
	},
};

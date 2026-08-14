import type { Section } from "@/constants/types";

/**
 * noteのハッシュタグからセクションを判定するルール。
 * 配列の先頭ほど優先度が高い(1記事に複数タグが付くため)。
 * どのルールにも一致しない場合は NOTE_FALLBACK_SECTION に分類される。
 */
export const NOTE_HASHTAG_RULES: { section: Section; hashtags: string[] }[] = [
	{
		section: "breakin",
		hashtags: ["#ブレイキン", "#ブレイクダンス", "#Breakin", "#HipHop"],
	},
	{
		section: "development",
		hashtags: [
			"#フロントエンド",
			"#プログラミング",
			"#プログラミング初心者",
			"#HTML",
			"#コーディング",
		],
	},
];

export const NOTE_FALLBACK_SECTION: Section = "personality";

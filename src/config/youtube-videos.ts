import type { Section } from "../lib/types";

/**
 * YouTubeチャンネル(@zabro1971)の動画を手動で管理するリスト。
 * チャンネルは1つでBreakin/Splatoonの動画が混在しており、
 * Atom feedにもタグ情報が無いため自動振り分けができない。
 * 新しい動画を公開したら1行追記する。
 * publishedAt は各動画の視聴ページ(uploadDateのmeta情報)から取得したもの。
 */
export const YOUTUBE_VIDEOS: {
	id: string;
	section: Section;
	publishedAt: string;
}[] = [
	{ id: "NVhSkcwRhxc", section: "splatoon", publishedAt: "2026-05-28" },
	{ id: "HH1IA3jFa18", section: "splatoon", publishedAt: "2026-05-18" },
	{ id: "LWk_3QozAGM", section: "splatoon", publishedAt: "2026-05-19" },
	{ id: "6sbb5YITJNA", section: "splatoon", publishedAt: "2026-01-06" },
	{ id: "5r8sqE36Hgc", section: "splatoon", publishedAt: "2025-12-22" },
	{ id: "WzUWLIF2GJU", section: "splatoon", publishedAt: "2025-11-13" },
	{ id: "aIxHm3_RDN4", section: "splatoon", publishedAt: "2025-10-27" },
	{ id: "R6DAU3lmqRo", section: "splatoon", publishedAt: "2025-10-27" },
	{ id: "Z3AXfGCwpVk", section: "splatoon", publishedAt: "2025-08-07" },
	{ id: "V52GYwJuZik", section: "splatoon", publishedAt: "2024-12-16" },
	{ id: "ZP3C83SlUGo", section: "breakin", publishedAt: "2016-01-17" },
	{ id: "szEbMIXaEEY", section: "breakin", publishedAt: "2016-01-17" },
	{ id: "vQaeBcW400c", section: "breakin", publishedAt: "2016-01-12" },
	{ id: "MXJuBXXoTyw", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "oX6D2FR4ZJI", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "pBmk1N9jnYc", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "iMbotFFFa5c", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "7USkPN-rXOQ", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "xd22yVXR5xQ", section: "breakin", publishedAt: "2015-11-27" },
	{ id: "arh5-1jRpxs", section: "breakin", publishedAt: "2014-10-20" },
	{ id: "MRzXIQ-tQgA", section: "breakin", publishedAt: "2014-10-12" },
	{ id: "xoybnz0X1io", section: "breakin", publishedAt: "2014-10-12" },
	// zabkoni music: ダンスバトル用ミックスかもしれないが判別できなかったので breakin 仮置き。要確認。
	{ id: "V192GHQG1a4", section: "breakin", publishedAt: "2014-10-12" },
];

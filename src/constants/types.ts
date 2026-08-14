export const SECTIONS = [
	"breakin",
	"splatoon",
	"development",
	"personality",
] as const;
export type Section = (typeof SECTIONS)[number];

export const SOURCES = ["note", "zenn", "sizu", "youtube"] as const;
export type Source = (typeof SOURCES)[number];

export const SOURCE_LABELS: Record<Source, string> = {
	note: "note",
	zenn: "Zenn",
	sizu: "しずかなインターネット",
	youtube: "YouTube",
};

export const SECTION_LABELS: Record<Section, string> = {
	breakin: "Breakin",
	splatoon: "Splatoon",
	development: "Development",
	personality: "Personality",
};

export type Entry = {
	title: string;
	url: string;
	publishedAt: Date;
	section: Section;
	source: Source;
	excerpt?: string;
	thumbnail?: string;
};

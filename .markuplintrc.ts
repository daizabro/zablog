import type { Config } from "@markuplint/ml-config";

const config: Config = {
	extends: ["markuplint:html-standard", "markuplint:a11y"],
	excludeFiles: ["./src/pages/_layouts"], // CMS側で設定している共通の記述のため
	parser: {
		"\\.astro$": "@markuplint/astro-parser",
	},
	rules: {
		"no-refer-to-non-existent-id": false,
		"heading-levels": false,
	},
};

export default config;

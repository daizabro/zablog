// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		imageService: "compile",
	}),
	vite: {
		plugins: [tailwindcss()],
		css: {
			postcss: {
				plugins: [autoprefixer],
			},
		},
	},
});

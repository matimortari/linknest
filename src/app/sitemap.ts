import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://linknest-live.vercel.app",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1
		},
		{
			url: "https://linknest-live.vercel.app/login",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.6
		}
	]
}

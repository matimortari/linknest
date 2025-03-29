import { SOCIAL_ICONS } from "@/src/config/preferencesConfig"
import { z } from "zod"

export const userSchema = z.object({
	slug: z
		.string()
		.min(3, "Slug must be at least 3 characters")
		.max(16, "Slug must be at most 16 characters")
		.regex(/^[a-zA-Z0-9_-]+$/, "Slug can only contain letters, numbers, hyphens, and underscores"),
	description: z.string().max(100, "Description must not exceed 100 characters").optional(),
	image: z
		.string()
		.url("Invalid URL format")
		.refine((url) => url.startsWith("https://"), {
			message: "Invalid URL format. Image URL must start with 'https://'"
		})
		.optional()
})

export const linkSchema = z.object({
	title: z.string().min(1, "Title is required").max(32, "Title must not exceed 32 characters"),
	url: z.string().url("Invalid URL format")
})

const validPlatforms = Object.keys(SOCIAL_ICONS) as [string, ...string[]]

export const iconSchema = z.object({
	platform: z.enum(validPlatforms, { message: "Invalid platform selected" }),
	url: z.string().url("Invalid URL format")
})

export type UserSchemaType = z.infer<typeof userSchema>
export type LinkSchemaType = z.infer<typeof linkSchema>
export type IconSchemaType = z.infer<typeof iconSchema>

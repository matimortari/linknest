import { z } from "zod"
import { SOCIAL_ICONS } from "~~/shared/config/social-icons"

export const userDataSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(32, "Slug must be at most 32 characters")
    .regex(
      /^[\w-]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores",
    ),
  description: z
    .string()
    .max(100, "Description must not exceed 100 characters")
    .optional(),
  image: z
    .string()
    .optional(),
})

export const linkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title must not exceed 32 characters"),
  url: z
    .url("Invalid URL format")
    .refine(url => url.startsWith("https://"), {
      message: "Invalid URL format. Link URL must start with 'https://'",
    }),
})

export const iconSchema = z.object({
  platform: z.enum(Object.keys(SOCIAL_ICONS) as [string, ...string[]], {
    message: "Invalid platform selected",
  }),
  url: z
    .url("Invalid URL format")
    .refine(url => url.startsWith("https://"), {
      message: "Social Icon URL must start with 'https://'",
    }),
  icon: z.string().min(1, "Icon is required"),
})

export type UserDataSchemaType = z.infer<typeof userDataSchema>
export type LinkSchemaType = z.infer<typeof linkSchema>
export type IconSchemaType = z.infer<typeof iconSchema>

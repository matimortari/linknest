export const BACKGROUND_TYPES = [
  { value: "FLAT", label: "Flat" },
  { value: "GRADIENT", label: "Gradient" },
] as const

export type BackgroundOptionType = (typeof BACKGROUND_TYPES)[number]["value"]

export const RADIUS_SIZES = [
  { label: "None", value: "0rem" },
  { label: "Small", value: "0.5rem" },
  { label: "Medium", value: "1rem" },
  { label: "Large", value: "5rem" },
] as const

export type RadiusSize = (typeof RADIUS_SIZES)[number]["value"]

export const BORDER_WIDTHS = [
  { label: "None", value: "0" },
  { label: "Thin", value: "1px" },
  { label: "Medium", value: "2px" },
  { label: "Thick", value: "4px" },
] as const

export type BorderWidth = (typeof BORDER_WIDTHS)[number]["value"]

export const FONT_FAMILIES = [
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Noto Sans", value: "Noto Sans, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Amarante", value: "Amarante, serif" },
  { label: "Righteous", value: "Righteous, serif" },
  { label: "Ribeye", value: "Ribeye, serif" },
  { label: "Ribeye Marrow", value: "Ribeye Marrow, serif" },
  { label: "Audiowide", value: "Audiowide, sans-serif" },
  { label: "Ubuntu Mono", value: "Ubuntu Mono, sans-serif" },
] as const

export type FontFamily = (typeof FONT_FAMILIES)[number]["value"]

export const FONT_SIZES = [
  { label: "Small", value: "1rem" },
  { label: "Medium", value: "1.1rem" },
  { label: "Large", value: "1.25rem" },
  { label: "Extra Large", value: "1.5rem" },
] as const

export type FontSize = (typeof FONT_SIZES)[number]["value"]

export const FONT_WEIGHTS = [
  { label: "Light", value: "400" },
  { label: "Normal", value: "500" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extrabold", value: "800" },
] as const

export type FontWeight = (typeof FONT_WEIGHTS)[number]["value"]

export const LINK_FONT_SIZES = [
  { label: "Small", value: "0.8rem" },
  { label: "Medium", value: "0.9rem" },
  { label: "Large", value: "1rem" },
] as const

export type LinkFontSize = (typeof LINK_FONT_SIZES)[number]["value"]

export const SHADOW_WEIGHTS = [
  { label: "Light", value: "light" },
  { label: "Medium", value: "medium" },
  { label: "Heavy", value: "heavy" },
] as const

export type ShadowWeightType = (typeof SHADOW_WEIGHTS)[number]["value"]

export const LINK_PADDING_SIZES = [
  { label: "Small", value: "0.5rem" },
  { label: "Medium", value: "0.75rem" },
  { label: "Large", value: "0.85rem" },
] as const

export type LinkPaddingSize = (typeof LINK_PADDING_SIZES)[number]["value"]

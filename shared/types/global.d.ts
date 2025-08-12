interface UserType {
  id?: string
  name?: string
  slug: string
  email?: string
  description: string | null
  image: string | null
  createdAt?: Date
  updatedAt?: Date
  preferences?: UserPreferencesType
  views?: PageViewType[]
  icons?: IconType[]
  links?: LinkType[]
}

interface LinkType {
  id?: string
  title: string
  url: string
  clicks?: number
  createdAt?: Date
  updatedAt?: Date
  linkClicks?: { date: string | Date }[]
}

interface IconType {
  id?: string
  platform: string
  url: string
  icon: string
  clicks?: number
  createdAt?: Date
  updatedAt?: Date
  iconClicks?: { date: string | Date }[]
}

interface UserStatsType {
  date: string
  pageViews: number
  linkClicks: number
  iconClicks: number
}

type ShadowWeightType = "none" | "light" | "medium" | "heavy"
type BackgroundType = "FLAT" | "GRADIENT"
type SupportBannerType = "NONE" | "LGBTQ_RIGHTS" | "ANTI_RACISM" | "MENTAL_HEALTH" | "CLIMATE_ACTION"

interface PageViewType {
  id: string
  userId: string
  date: Date
}

interface UserPreferencesType {
  backgroundType: BackgroundType
  backgroundColor: string
  backgroundGradientStart: string
  backgroundGradientEnd: string
  profilePictureRadius: string
  profilePictureBorderColor: string
  profilePictureBorderWidth: string
  slugTextColor: string
  slugTextWeight: string
  slugTextSize: string
  slugFontFamily: string
  headerTextColor: string
  headerTextWeight: string
  headerTextSize: string
  headerFontFamily: string
  linkBackgroundColor: string
  linkTextColor: string
  linkTextWeight: string
  linkTextSize: string
  linkFontFamily: string
  isLinkShadow: boolean
  linkShadowColor: string
  linkShadowWeight: string
  linkHoverBackgroundColor: string
  linkBorderRadius: string
  linkPadding: string
  iconBackgroundColor: string
  isIconShadow: boolean
  iconShadowColor: string
  iconShadowWeight: string
  iconIconColor: string
  iconHoverBackgroundColor: string
  showCopyButton?: boolean
  supportBanner?: SupportBannerType
}

interface UpdateUserPayload {
  name?: string
  slug?: string
  description?: string | null
}

interface CreateLinkPayload {
  title: string
  url: string
}

interface UpdateLinkPayload {
  id: string
  title?: string
  url?: string
}

interface CreateIconPayload {
  platform: string
  url: string
  icon: string
}

interface UpdatePreferencesPayload {
  backgroundType?: BackgroundType
  backgroundColor?: string
  backgroundGradientStart?: string
  backgroundGradientEnd?: string
  profilePictureRadius?: string
  profilePictureBorderColor?: string
  profilePictureBorderWidth?: string
  slugTextColor?: string
  slugTextWeight?: string
  slugTextSize?: string
  slugFontFamily?: string
  headerTextColor?: string
  headerTextWeight?: string
  headerTextSize?: string
  headerFontFamily?: string
  linkBackgroundColor?: string
  linkTextColor?: string
  linkTextWeight?: string
  linkTextSize?: string
  linkFontFamily?: string
  isLinkShadow?: boolean
  linkShadowColor?: string
  linkShadowWeight?: string
  linkHoverBackgroundColor?: string
  linkBorderRadius?: string
  linkPadding?: string
  iconBackgroundColor?: string
  isIconShadow?: boolean
  iconShadowColor?: string
  iconShadowWeight?: string
  iconIconColor?: string
  iconHoverBackgroundColor?: string
  showCopyButton?: boolean
}

interface UpdateSupportBannerPayload {
  supportBanner: SupportBannerType
}

interface InputOptionType {
  value: string
  label: string
}

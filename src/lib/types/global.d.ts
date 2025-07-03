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

interface UserStatsType {
  date: string
  pageViews: number
  linkClicks: number
  iconClicks: number
}

interface UserPreferencesType {
  backgroundType: "FLAT" | "GRADIENT"
  backgroundColor: string
  backgroundGradientStart: string
  backgroundGradientEnd: string
  profilePictureRadius: string
  slugTextColor: string
  slugTextWeight: string
  slugTextSize: string
  headerTextColor: string
  headerTextWeight: string
  headerTextSize: string
  linkBackgroundColor: string
  linkTextColor: string
  linkTextWeight: string
  linkTextSize: string
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
  supportBanner?: "NONE" | "LGBTQ_RIGHTS" | "ANTI_RACISM" | "MENTAL_HEALTH" | "CLIMATE_ACTION"
}

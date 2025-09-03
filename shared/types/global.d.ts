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
  logo: string
  clicks?: number
  createdAt?: Date
  updatedAt?: Date
  iconClicks?: { date: string | Date }[]
}

interface UserPreferencesType {
  backgroundType: BackgroundOptionType
  backgroundColor?: string
  backgroundGradientStart?: string
  backgroundGradientEnd?: string

  profilePictureRadius: RadiusSize
  profilePictureBorderWidth: BorderWidth
  profilePictureBorderColor: string

  slugFontFamily: FontFamily
  slugTextSize: FontSize
  slugTextWeight: FontWeight
  slugTextColor: string

  headerFontFamily: FontFamily
  headerTextSize: FontSize
  headerTextWeight: FontWeight
  headerTextColor: string

  linkFontFamily: FontFamily
  linkTextSize: LinkFontSize
  linkTextWeight: FontWeight
  linkTextColor: string
  linkBackgroundColor: string
  linkHoverBackgroundColor: string
  linkBorderRadius: RadiusSize
  linkPadding: LinkPaddingSize
  isLinkShadow: boolean
  linkShadowColor?: string
  linkShadowWeight?: ShadowWeightType
  showLinkCopyButton?: boolean

  iconBackgroundColor: string
  iconHoverBackgroundColor: string
  iconLogoColor: string
  isIconShadow: boolean
  iconShadowColor?: string
  iconShadowWeight?: ShadowWeightType

  supportBanner?: BannerOptionType
}

interface UserStatsType {
  date: string
  pageViews: number
  linkClicks: number
  iconClicks: number
}

interface PageViewType {
  id: string
  userId: string
  date: Date
}

interface CarouselPresetType {
  slug: string
  description: string
  image: string
  icons: {
    id: number
    logo: string
  }[]
  links: {
    id: number
    title: string
  }[]
  preferences: UserPreferencesType
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
  logo: string
  url: string
}

type UpdatePreferencesPayload = Partial<UserPreferencesType>
interface UpdateSupportBannerPayload {
  supportBanner: BannerOptionType
}

interface InputOptionType {
  value: string
  label: string
}

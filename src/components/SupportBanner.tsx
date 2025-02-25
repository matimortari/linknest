import {
	BANNER_DESCRIPTIONS,
	BANNER_ICONS,
	BANNER_LINKS,
	BANNER_MESSAGES,
	BANNER_STYLES
} from "@/src/config/supportBannerConfig"
import { Icon } from "@iconify/react"

export default function SupportBanner({ bannerType }) {
	const message = BANNER_MESSAGES[bannerType]
	const description = BANNER_DESCRIPTIONS[bannerType]
	const styleClass = BANNER_STYLES[bannerType]

	const getBannerLink = (type: string) => {
		const linkObject = BANNER_LINKS[type]
		return linkObject
	}

	return (
		<div
			className={`${styleClass} fixed bottom-0 z-50 flex w-screen items-center justify-between px-8 py-4 text-white`}
		>
			<div className="flex flex-row items-center gap-4 text-start text-sm">
				<Icon icon={BANNER_ICONS[bannerType]} width={35} height={35} className="icon text-white" />
				<div>
					<h4 className="font-bold">{message}</h4>
					<p>{description}</p>
				</div>
			</div>

			<div>
				<a
					href={getBannerLink(bannerType)}
					className="btn bg-white font-bold text-gray-800"
					target="_blank"
					rel="noopener noreferrer"
				>
					ACT NOW
				</a>
			</div>
		</div>
	)
}

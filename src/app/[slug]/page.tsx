import SupportBanner from "@/src/components/SupportBanner"
import UserIcon from "@/src/components/UserIcon"
import UserLink from "@/src/components/UserLink"
import { trackPageVisit, updateClickStats } from "@/src/lib/analytics"
import { db } from "@/src/lib/db"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

type Params = Promise<{ slug: string }>

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default async function slugPage({ params }: { params: Params }) {
	const { slug } = await params

	const user = await db.user.findUnique({
		where: { slug },
		include: {
			userLinks: true,
			userIcons: true,
			userPreferences: true
		}
	})

	if (!user) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-between gap-12 p-12">
				<p className="text-center text-xl text-muted-foreground">User `{slug}` not found.</p>

				<Link href="/" className="flex flex-row items-center justify-start gap-2">
					<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
					<span className={`text-2xl ${chau.className}`}>LinkNest</span>
				</Link>
			</div>
		)
	}

	const {
		description,
		userLinks,
		image,
		userIcons,
		userPreferences: [userPreferences],
		id: userId
	} = user

	await trackPageVisit(userId)
	await updateClickStats(userId)

	const backgroundStyle =
		userPreferences?.backgroundType === "GRADIENT"
			? {
					background: `linear-gradient(to bottom, ${userPreferences?.backgroundGradientStart}, ${userPreferences?.backgroundGradientEnd})`
			  }
			: { backgroundColor: userPreferences?.backgroundColor }

	return (
		<div style={backgroundStyle} className="min-h-screen p-12 pb-24">
			<div className="flex flex-col items-center justify-center gap-2 text-center">
				{userPreferences && userPreferences.supportBanner !== "NONE" && (
					<SupportBanner bannerType={userPreferences.supportBanner} />
				)}
				{image && (
					<Image
						src={image}
						alt={slug}
						width={100}
						height={100}
						style={{ borderRadius: userPreferences?.profilePictureRadius }}
					/>
				)}
				<p
					style={{
						color: userPreferences?.slugTextColor,
						fontWeight: userPreferences?.slugTextWeight,
						fontSize: userPreferences?.slugTextSize
					}}
				>
					@{slug}
				</p>
				{description && (
					<p
						style={{
							color: userPreferences?.headerTextColor,
							fontWeight: userPreferences?.headerTextWeight,
							fontSize: userPreferences?.headerTextSize
						}}
					>
						{description}
					</p>
				)}
				{userIcons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{userIcons.map((b) => (
							<UserIcon
								key={b.id}
								url={b.url}
								icon={b.icon}
								preferences={userPreferences}
								iconId={b.id}
								userId={userId}
							/>
						))}
					</ul>
				) : (
					<hr />
				)}
				{userLinks.length > 0 ? (
					<ul className="space-y-4">
						{userLinks.map((l) => (
							<UserLink
								key={l.id}
								url={l.url}
								title={l.title}
								preferences={userPreferences}
								linkId={l.id}
								userId={userId}
							/>
						))}
					</ul>
				) : (
					<p className="text-center text-muted-foreground">No links yet.</p>
				)}
			</div>
		</div>
	)
}

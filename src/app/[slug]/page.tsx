import SupportBanner from "@/src/app/[slug]/support-banner";
import UserIcon from "@/src/components/user-icon";
import UserLink from "@/src/components/user-link";
import { db } from "@/src/lib/db";
import { chau, trackPageVisit, updateClickStats } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params;

  const user = await db.user.findUnique({
    where: { slug },
    include: {
      userLinks: true,
      userIcons: true,
      userPreferences: true,
    },
  });

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between gap-12 p-12">
        <p className="text-lead text-center text-muted-foreground">
          User `{slug}` not found.
        </p>

        <Link
          href="/"
          className="flex flex-row items-center justify-start gap-2"
        >
          <Image
            src="/logo.png"
            alt="LinkNest Logo"
            width={35}
            height={35}
            className="icon rounded-full"
          />
          <span className={`text-2xl ${chau.className}`}>LinkNest</span>
        </Link>
      </div>
    );
  }

  const {
    description,
    userLinks,
    image,
    userIcons,
    userPreferences: [userPreferences],
    id: userId,
  } = user;

  await trackPageVisit(userId);
  await updateClickStats(userId);

  return (
    <div
      style={
        userPreferences.backgroundType === "GRADIENT"
          ? {
              background: `linear-gradient(to bottom, ${userPreferences.backgroundGradientStart}, ${userPreferences.backgroundGradientEnd})`,
            }
          : { backgroundColor: userPreferences.backgroundColor }
      }
      className="min-h-screen p-12"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        {userPreferences && userPreferences.supportBanner !== "NONE" && (
          <SupportBanner bannerType={userPreferences.supportBanner} />
        )}
        {image && (
          <Image
            src={image}
            alt={slug}
            width={100}
            height={100}
            style={{ borderRadius: userPreferences.profilePictureRadius }}
          />
        )}
        <p
          style={{
            color: userPreferences.slugTextColor,
            fontWeight: userPreferences.slugTextWeight,
            fontSize: userPreferences.slugTextSize,
          }}
        >
          @{slug}
        </p>
        {description && (
          <p
            className="max-w-sm truncate whitespace-break-spaces"
            style={{
              color: userPreferences.headerTextColor,
              fontWeight: userPreferences.headerTextWeight,
              fontSize: userPreferences.headerTextSize,
            }}
          >
            {description}
          </p>
        )}
        {userIcons.length > 0 ? (
          <ul className="my-2 flex flex-row items-center justify-center gap-2">
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
          <ul className="flex flex-col items-center gap-4">
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
  );
}

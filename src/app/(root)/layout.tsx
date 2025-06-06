import Providers from "@/src/components/context/providers";
import Footer from "@/src/components/footer";
import { authOptions } from "@/src/lib/auth";
import { inter } from "@/src/lib/utils";
import "@/src/styles/globals.css";
import "@/src/styles/inputs.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://linknest-live.vercel.app"),
  title: "LinkNest — Your link-in-bio page 🔗🌐",
  description:
    "Keep all your stuff together! Share your links in one page and share it with your audience.",
  keywords: ["LinkNest", "Link in bio", "LinkNest page"],
  openGraph: {
    url: "https://linknest-live.vercel.app",
    title: "LinkNest — Your link-in-bio page 🔗🌐",
    description:
      "Keep all your stuff together! Share your links in one page and share it with your audience.",
    type: "website",
    images: "/og-image.png",
  },
  other: {
    "google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-image min-h-screen`}>
        <Providers session={session}>
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import Providers from "@/src/components/context/providers";
import { authOptions } from "@/src/lib/auth";
import { inter } from "@/src/lib/utils";
import "@/src/styles/globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const metadata: Metadata = {
    metadataBase: new URL("https://linknest-live.vercel.app"),
    title: slug ? `${slug} | LinkNest` : "LinkNest",
    description:
      "Keep all your stuff together! Share your links in one page and share it with your audience.",
  };

  return metadata;
}

export default async function SlugLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

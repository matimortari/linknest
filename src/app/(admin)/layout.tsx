import Providers from "@/src/components/context/providers";
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navbar";
import { authOptions } from "@/src/lib/auth";
import { inter } from "@/src/lib/utils";
import "@/src/styles/globals.css";
import "@/src/styles/inputs.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const slug = session?.user.slug;

  const metadata: Metadata = {
    metadataBase: new URL("https://linknest-live.vercel.app"),
    title: slug ? `${slug} | LinkNest` : "LinkNest",
    description:
      "Keep all your stuff together! Share your links in one page and share it with your audience.",
  };

  return metadata;
}

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-image min-h-screen`}>
        <Providers session={session}>
          <div className="flex flex-col p-4 lg:flex-row">
            <aside className="lg:w-2/12">
              <Navbar />
            </aside>
            <main className="lg:w-10/12">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

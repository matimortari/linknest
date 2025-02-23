-- CreateEnum
CREATE TYPE "BackgroundType" AS ENUM ('FLAT', 'GRADIENT');

-- CreateEnum
CREATE TYPE "SupportBanner" AS ENUM ('NONE', 'LGBTQ_RIGHTS', 'ANTI_RACISM', 'MENTAL_HEALTH', 'CLIMATE_ACTION');

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "UserLink" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIcon" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "backgroundType" "BackgroundType" NOT NULL DEFAULT 'FLAT',
    "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "backgroundGradientStart" TEXT NOT NULL DEFAULT '#000000',
    "backgroundGradientEnd" TEXT NOT NULL DEFAULT '#000000',
    "profilePictureRadius" TEXT NOT NULL DEFAULT '0.5rem',
    "slugTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "slugTextWeight" TEXT NOT NULL DEFAULT '500',
    "slugTextSize" TEXT NOT NULL DEFAULT '1rem',
    "headerTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "headerTextWeight" TEXT NOT NULL DEFAULT '400',
    "headerTextSize" TEXT NOT NULL DEFAULT '1.1rem',
    "linkBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "linkTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "linkTextWeight" TEXT NOT NULL DEFAULT '500',
    "linkTextSize" TEXT NOT NULL DEFAULT '0.9rem',
    "isLinkShadow" BOOLEAN NOT NULL DEFAULT false,
    "linkShadowColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "linkShadowWeight" TEXT NOT NULL DEFAULT 'medium',
    "linkHoverBackgroundColor" TEXT NOT NULL DEFAULT '#eeeeee',
    "linkBorderRadius" TEXT NOT NULL DEFAULT '0.5rem',
    "linkPadding" TEXT NOT NULL DEFAULT '0.5rem',
    "iconBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "isIconShadow" BOOLEAN NOT NULL DEFAULT false,
    "iconShadowColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "iconShadowWeight" TEXT NOT NULL DEFAULT 'medium',
    "iconIconColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "iconHoverBackgroundColor" TEXT NOT NULL DEFAULT '#eeeeee',
    "showCopyButton" BOOLEAN NOT NULL DEFAULT true,
    "supportBanner" "SupportBanner" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkClick" (
    "id" TEXT NOT NULL,
    "userLinkId" TEXT NOT NULL,

    CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IconClick" (
    "id" TEXT NOT NULL,
    "userIconId" TEXT NOT NULL,

    CONSTRAINT "IconClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLink_userId_key" ON "UserLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLink_url_key" ON "UserLink"("url");

-- CreateIndex
CREATE UNIQUE INDEX "UserIcon_userId_key" ON "UserIcon"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserIcon_url_key" ON "UserIcon"("url");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIcon" ADD CONSTRAINT "UserIcon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_userLinkId_fkey" FOREIGN KEY ("userLinkId") REFERENCES "UserLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IconClick" ADD CONSTRAINT "IconClick_userIconId_fkey" FOREIGN KEY ("userIconId") REFERENCES "UserIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `UserStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserStats_userId_key";

-- AlterTable
ALTER TABLE "UserStats" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "iconClicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "linkClicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_date_key" ON "UserStats"("userId", "date");

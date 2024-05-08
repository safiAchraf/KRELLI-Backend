/*
  Warnings:

  - You are about to drop the column `createAt` on the `Favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "createAt",
ADD COLUMN     "favoritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "listedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

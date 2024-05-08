/*
  Warnings:

  - The `homeId` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Home` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addedCategory` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `addedDescription` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `addedLoaction` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `categoryName` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Home` table. All the data in the column will be lost.
  - The `id` column on the `Home` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `homeId` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `homeId` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `wilaya` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Home` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guests` on table `Home` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedrooms` on table `Home` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathrooms` on table `Home` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Home` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_homeId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_homeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_homeId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "homeId",
ADD COLUMN     "homeId" INTEGER;

-- AlterTable
ALTER TABLE "Home" DROP CONSTRAINT "Home_pkey",
DROP COLUMN "addedCategory",
DROP COLUMN "addedDescription",
DROP COLUMN "addedLoaction",
DROP COLUMN "categoryName",
DROP COLUMN "country",
DROP COLUMN "createdAT",
DROP COLUMN "photo",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "wilaya" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "guests" SET NOT NULL,
ALTER COLUMN "bedrooms" SET NOT NULL,
ALTER COLUMN "bathrooms" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Home_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
DROP COLUMN "homeId",
ADD COLUMN     "homeId" INTEGER;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "homeId",
ADD COLUMN     "homeId" INTEGER;

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeId" INTEGER,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Changed the type of `guests` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bedrooms` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bathrooms` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "guests",
ADD COLUMN     "guests" INTEGER NOT NULL,
DROP COLUMN "bedrooms",
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
DROP COLUMN "bathrooms",
ADD COLUMN     "bathrooms" INTEGER NOT NULL;

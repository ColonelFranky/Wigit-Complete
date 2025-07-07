/*
  Warnings:

  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('wigit', 'tshirt');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "type" "ProductType" NOT NULL;

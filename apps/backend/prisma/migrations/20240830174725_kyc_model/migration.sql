/*
  Warnings:

  - Added the required column `profileImage` to the `KYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `KYC` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'APPLIED');

-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "kycId" TEXT,
ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "status" "KYCStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Rejections" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "kycId" INTEGER NOT NULL,

    CONSTRAINT "Rejections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rejections" ADD CONSTRAINT "Rejections_kycId_fkey" FOREIGN KEY ("kycId") REFERENCES "KYC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

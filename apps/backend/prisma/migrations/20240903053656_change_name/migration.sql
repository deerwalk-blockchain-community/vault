/*
  Warnings:

  - You are about to drop the `KYC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KYC" DROP CONSTRAINT "KYC_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rejections" DROP CONSTRAINT "Rejections_kycId_fkey";

-- DropTable
DROP TABLE "KYC";

-- CreateTable
CREATE TABLE "KYCData" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nidNumber" TEXT NOT NULL,
    "nidImageFront" TEXT NOT NULL,
    "nidImageBack" TEXT NOT NULL,
    "gender" "Gender",
    "profileImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sentToChain" BOOLEAN NOT NULL DEFAULT false,
    "status" "KYCStatus" NOT NULL,
    "kycId" TEXT,

    CONSTRAINT "KYCData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KYCData_userId_key" ON "KYCData"("userId");

-- AddForeignKey
ALTER TABLE "KYCData" ADD CONSTRAINT "KYCData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejections" ADD CONSTRAINT "Rejections_kycId_fkey" FOREIGN KEY ("kycId") REFERENCES "KYCData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

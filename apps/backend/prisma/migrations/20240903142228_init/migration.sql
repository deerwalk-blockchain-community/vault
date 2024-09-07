-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'Female', 'OTHER');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'APPLIED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

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
    "address" TEXT NOT NULL,
    "kycId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KYCData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rejections" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "kycId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rejections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KYCData_userId_key" ON "KYCData"("userId");

-- AddForeignKey
ALTER TABLE "KYCData" ADD CONSTRAINT "KYCData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejections" ADD CONSTRAINT "Rejections_kycId_fkey" FOREIGN KEY ("kycId") REFERENCES "KYCData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

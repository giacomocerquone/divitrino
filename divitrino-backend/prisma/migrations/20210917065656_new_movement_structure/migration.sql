/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movementId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addedByUserId" TEXT,
    "groupId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payerId" TEXT NOT NULL,
    "description" TEXT,
    "payeeId" TEXT,
    "amount" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movement" ADD FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD FOREIGN KEY ("payeeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Movement" ("createdAt", "updatedAt", "id", "description", "date", "addedByUserId", "groupId", "payerId") SELECT "createdAt", "updatedAt", "id", "description", "date", "addedByUserId", "groupId", "payerId" FROM "Purchase";

INSERT INTO "Movement" ("createdAt", "updatedAt", "id", "amount", "date", "addedByUserId", "groupId", "payerId", "payeeId") SELECT "createdAt", "updatedAt", "id", "amount", "date", "addedByUserId", "groupId", "payerId", "payeeId" FROM "Payment";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_payerId_fkey";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Purchase";

-- AlterTable

ALTER TABLE "Product" RENAME COLUMN "purchaseId" TO "movementId";

ALTER TABLE "Product" ADD CONSTRAINT "Product_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;


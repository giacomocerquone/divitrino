/*
  Warnings:

  - Added the required column `addedByUserId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedByUserId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "addedByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "addedByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

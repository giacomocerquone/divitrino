-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "addedByUserId" TEXT;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "addedByUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Purchase" ADD FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

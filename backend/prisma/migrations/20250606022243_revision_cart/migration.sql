-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_employeeId_fkey";

-- AlterTable
ALTER TABLE "Transaksi" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

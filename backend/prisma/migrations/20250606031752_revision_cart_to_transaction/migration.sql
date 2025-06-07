/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `Transaksi` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DetailTransaksi" DROP CONSTRAINT "DetailTransaksi_transaksiId_fkey";

-- AlterTable
ALTER TABLE "Transaksi" ADD COLUMN     "cartId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Transaksi_cartId_key" ON "Transaksi"("cartId");

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksi" ADD CONSTRAINT "DetailTransaksi_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

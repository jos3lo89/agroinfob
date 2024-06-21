/*
  Warnings:

  - You are about to alter the column `numero` on the `telefonousuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `telefonousuario` MODIFY `numero` INTEGER NOT NULL;

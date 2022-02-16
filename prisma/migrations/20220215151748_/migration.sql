/*
  Warnings:

  - You are about to drop the column `uang_keluar` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `uang_masuk` on the `Bank` table. All the data in the column will be lost.
  - Added the required column `nominal` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nominal" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tipe" TEXT NOT NULL
);
INSERT INTO "new_Bank" ("createdAt", "id", "keterangan") SELECT "createdAt", "id", "keterangan" FROM "Bank";
DROP TABLE "Bank";
ALTER TABLE "new_Bank" RENAME TO "Bank";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

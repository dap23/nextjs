/*
  Warnings:

  - Added the required column `nota_id` to the `soldGold` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe` to the `soldGold` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `soldGold` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_soldGold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "berat" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "gold_id" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "nota_id" TEXT NOT NULL,
    "tipe" TEXT NOT NULL
);
INSERT INTO "new_soldGold" ("berat", "createdAt", "gold_id", "id", "name", "qty") SELECT "berat", "createdAt", "gold_id", "id", "name", "qty" FROM "soldGold";
DROP TABLE "soldGold";
ALTER TABLE "new_soldGold" RENAME TO "soldGold";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

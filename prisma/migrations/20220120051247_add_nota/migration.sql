/*
  Warnings:

  - Added the required column `customer` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_nota` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "object" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "nomor_nota" TEXT NOT NULL
);
INSERT INTO "new_Nota" ("createdAt", "id", "object") SELECT "createdAt", "id", "object" FROM "Nota";
DROP TABLE "Nota";
ALTER TABLE "new_Nota" RENAME TO "Nota";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

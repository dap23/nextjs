-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "object" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "nomor_nota" TEXT NOT NULL,
    "tipe" TEXT NOT NULL DEFAULT 'jual'
);
INSERT INTO "new_Nota" ("createdAt", "customer", "id", "nomor_nota", "object", "total") SELECT "createdAt", "customer", "id", "nomor_nota", "object", "total" FROM "Nota";
DROP TABLE "Nota";
ALTER TABLE "new_Nota" RENAME TO "Nota";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

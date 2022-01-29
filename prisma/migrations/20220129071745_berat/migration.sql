-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GoldName" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "berat" TEXT NOT NULL DEFAULT '',
    "stock" TEXT NOT NULL,
    "type_id" TEXT,
    "type_name" TEXT,
    "type_object" TEXT
);
INSERT INTO "new_GoldName" ("createdAt", "id", "name", "stock", "type_id", "type_name", "type_object") SELECT "createdAt", "id", "name", "stock", "type_id", "type_name", "type_object" FROM "GoldName";
DROP TABLE "GoldName";
ALTER TABLE "new_GoldName" RENAME TO "GoldName";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

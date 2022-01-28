-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GoldName" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "type_id" TEXT,
    "type_name" TEXT
);
INSERT INTO "new_GoldName" ("createdAt", "id", "name", "stock", "type_id", "type_name") SELECT "createdAt", "id", "name", "stock", "type_id", "type_name" FROM "GoldName";
DROP TABLE "GoldName";
ALTER TABLE "new_GoldName" RENAME TO "GoldName";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

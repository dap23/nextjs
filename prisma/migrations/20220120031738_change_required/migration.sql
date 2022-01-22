-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "alamat" TEXT,
    "email" TEXT
);
INSERT INTO "new_Customer" ("alamat", "createdAt", "email", "id", "nama", "no_hp") SELECT "alamat", "createdAt", "email", "id", "nama", "no_hp" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

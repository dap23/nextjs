-- CreateTable
CREATE TABLE "soldGold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "berat" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "gold_id" TEXT NOT NULL
);

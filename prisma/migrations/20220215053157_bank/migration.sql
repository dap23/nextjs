-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uang_masuk" TEXT NOT NULL,
    "uang_keluar" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Brankas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nominal" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL
);

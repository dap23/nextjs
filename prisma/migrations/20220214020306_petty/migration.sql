-- CreateTable
CREATE TABLE "Petty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nominal" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL
);

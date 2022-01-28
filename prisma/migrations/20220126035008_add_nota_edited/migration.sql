-- CreateTable
CREATE TABLE "NotaEdited" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_nota_id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "nomor_nota" TEXT NOT NULL,
    "tipe" TEXT NOT NULL DEFAULT 'jual',
    "catatan" TEXT NOT NULL DEFAULT '',
    "foto" TEXT NOT NULL DEFAULT '',
    "ongkos" TEXT NOT NULL DEFAULT '',
    "tipe_dp" TEXT NOT NULL DEFAULT '',
    "dp" TEXT NOT NULL DEFAULT '',
    "sisa_pelunasan" TEXT NOT NULL DEFAULT '',
    "nota_sebelum" TEXT NOT NULL DEFAULT ''
);

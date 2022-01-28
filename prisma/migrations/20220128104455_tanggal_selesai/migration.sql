-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NotaEdited" (
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
    "nota_sebelum" TEXT NOT NULL DEFAULT '',
    "tanggal_selesai" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_NotaEdited" ("catatan", "createdAt", "customer", "dp", "foto", "id", "nomor_nota", "nota_sebelum", "object", "ongkos", "original_nota_id", "sisa_pelunasan", "tipe", "tipe_dp", "total") SELECT "catatan", "createdAt", "customer", "dp", "foto", "id", "nomor_nota", "nota_sebelum", "object", "ongkos", "original_nota_id", "sisa_pelunasan", "tipe", "tipe_dp", "total" FROM "NotaEdited";
DROP TABLE "NotaEdited";
ALTER TABLE "new_NotaEdited" RENAME TO "NotaEdited";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

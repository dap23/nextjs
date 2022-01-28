-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Karyawan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bagian" TEXT NOT NULL,
    "gaji" TEXT NOT NULL,
    "tanggal_masuk" TEXT NOT NULL,
    "tanggal_keluar" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Karyawan" ("alamat", "bagian", "createdAt", "gaji", "id", "nama", "password", "tanggal_keluar", "tanggal_masuk") SELECT "alamat", "bagian", "createdAt", "gaji", "id", "nama", "password", "tanggal_keluar", "tanggal_masuk" FROM "Karyawan";
DROP TABLE "Karyawan";
ALTER TABLE "new_Karyawan" RENAME TO "Karyawan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

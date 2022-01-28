-- CreateTable
CREATE TABLE "Karyawan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bagian" TEXT NOT NULL,
    "gaji" TEXT NOT NULL,
    "tanggal_masuk" TEXT NOT NULL,
    "tanggal_keluar" TEXT NOT NULL
);

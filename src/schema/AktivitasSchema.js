import z from 'zod';

export const laporanHarianSchema = z.object({
    // Definisikan tipe data dan aturan untuk setiap field di req.body
    id_laporan: z.string({ required_error: "Id laporan tidak boleh kosong" }).min(1, "Id laporan tidak boleh kosong"), // Pastikan tidak string kosong
    nik: z.string().optional(), // .optional() jika boleh null/undefined
    nik_kantor: z.string().optional(),
    nama_karyawan: z.string().optional(),
    jabatan_karyawan: z.string().optional(),
    dept_karyawan: z.string().optional(),
    uraian_kegiatan: z.string({ required_error: "Uraian kegiatan tidak boleh kosong" }).min(1, "Uraian kegiatan tidak boleh kosong"), // Pastikan tidak string kosong
    target_harian: z.string().optional(),
    pt: z.string().optional(),
    kategori: z.string().optional(),
    lokasi_kerja: z.string().optional(),
    atasan_langsung: z.string().optional(),
}).strict(); // .strict() akan menolak field tambahan yang tidak ada di skema

export const laporanKesehatanSchema = z.object({
    // Definisikan tipe data dan aturan untuk setiap field di req.body
    // Sesuaikan tipe data (string, number, date, boolean) dan aturan (optional, min, max, dll.)
    id_laporan: z.string({ required_error: "ID Laporan dibutuhkan" }).min(1), // Asumsi string, sesuaikan jika tipe lain
    nik: z.string({ required_error: "NIK dibutuhkan" }).min(1),
    nik_kantor: z.string().optional(),
    tanggal: z.string({ required_error: "Tanggal dibutuhkan" }).datetime({ message: "Format tanggal tidak valid" }), // Atau z.date() jika inputnya objek Date
    jam_masuk: z.string().optional(), // Asumsi format 'HH:MM:SS' atau serupa
    jam_pulang: z.string().optional(),
    status_kerja: z.string().optional(),
    kesehatan_tanggal: z.string().datetime({ message: "Format tanggal kesehatan tidak valid" }).optional(),
    kesehatan_nama: z.string().optional(),
    kesehatan_dept: z.string().optional(),
    kesehatan_jabatan: z.string().optional(),
    kesehatan_pt: z.string().optional(),
    kesehatan_suhu: z.string().optional(), // Atau z.number() jika suhu angka
    kesehatan_keluarga: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
    kesehatan_kontak: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
    kesehatan_resiko: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
    kesehatan_pagi: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
    kesehatan_malam: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
    kesehatan_berobat: z.string().optional(), // Mungkin boolean atau enum? Sesuaikan
}).strict();
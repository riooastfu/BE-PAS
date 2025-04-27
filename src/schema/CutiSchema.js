import z from "zod";

export const cutiUserSchema = z
  .object({
    id_cuti: z.string({ required_error: "ID Cuti dibutuhkan" }).min(1),
    tanggal_mulai: z.coerce.date({
      required_error: "Tanggal mulai dibutuhkan",
      invalid_type_error: "Format tanggal mulai tidak valid.",
    }),
    tanggal_berakhir: z.coerce.date({
      required_error: "Tanggal berakhir dibutuhkan",
      invalid_type_error: "Format tanggal berakhir tidak valid.",
    }),
    total_hari: z
      .number({ required_error: "Total hari dibutuhkan" })
      .min(1, "Total hari minimal 1"),
    tipe_cuti: z
      .string({ required_error: "Tipe cuti dibutuhkan" })
      .min(1, "Tipe cuti tidak boleh kosong"),
    alasan: z
      .string({ required_error: "Alasan cuti dibutuhkan" })
      .min(1, "Alasan cuti tidak boleh kosong"),
    alamat_cuti: z
      .string({ required_error: "Alamat cuti dibutuhkan" })
      .min(1, "Alamat cuti tidak boleh kosong"),
    approval: z
      .number({ required_error: "Approval dibutuhkan" })
      .min(1, "Approval tidak boleh kosong"),
    pic: z
      .string({ required_error: "PIC dibutuhkan" })
      .min(1, "PIC tidak boleh kosong"),
    atasan: z
      .string({ required_error: "Atasan dibutuhkan" })
      .min(1, "Atasan tidak boleh kosong"),
    no_telepon: z.string().optional(),
  })
  .strict();

export const laporanHarianSchema = z
  .object({
    // Definisikan tipe data dan aturan untuk setiap field di req.body
    id_laporan: z
      .string({ required_error: "Id laporan tidak boleh kosong" })
      .min(1, "Id laporan tidak boleh kosong"), // Pastikan tidak string kosong
    nik: z.string().optional(), // .optional() jika boleh null/undefined
    nik_kantor: z.string().optional(),
    nama_karyawan: z.string().optional(),
    jabatan_karyawan: z.string().optional(),
    dept_karyawan: z.string().optional(),
    uraian_kegiatan: z
      .string({ required_error: "Uraian kegiatan tidak boleh kosong" })
      .min(1, "Uraian kegiatan tidak boleh kosong"), // Pastikan tidak string kosong
    target_harian: z.string().optional(),
    pt: z.string().optional(),
    kategori: z.string().optional(),
    lokasi_kerja: z.string().optional(),
    atasan_langsung: z.string().optional(),
  })
  .strict(); // .strict() akan menolak field tambahan yang tidak ada di skema

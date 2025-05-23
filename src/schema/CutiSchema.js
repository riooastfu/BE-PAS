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
    tipe_cuti: z
      .string({ required_error: "Tipe cuti dibutuhkan" })
      .min(1, "Tipe cuti tidak boleh kosong"),
    alasan: z
      .string({ required_error: "Alasan cuti dibutuhkan" })
      .min(1, "Alasan cuti tidak boleh kosong"),
    alamat_cuti: z
      .string({ required_error: "Alamat cuti dibutuhkan" })
      .min(1, "Alamat cuti tidak boleh kosong"),
    pic: z.number({ required_error: 'PIC dibutuhkan', invalid_type_error: 'PIC harus berupa angka' }).int('PIC harus berupa angka bulat').positive('PIC harus lebih besar dari 0'),
    atasan: z.number({ required_error: 'Atasan dibutuhkan', invalid_type_error: 'Atasan harus berupa angka' }).int('Atasan harus berupa angka bulat').positive('Atasan harus lebih besar dari 0'),
    no_telepon: z.string().optional(),
  })
  .strict();
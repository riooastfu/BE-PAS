import { Sequelize } from "sequelize";
import CydHol from "../model/CydHol.js";
import PersCutiKaryawan from "../model/PersCutiKaryawan.js";
import PersCutiKaryawanDt from "../model/PersCutiKaryawanDt.js";
import { cutiUserSchema } from "../schema/CutiSchema.js";
import { AppError } from "../utils/errorHandler.js";
import { db } from "../config/database.js";
import PersDataKaryawan from "../model/PersDataKaryawan.js";
import sequelize from "sequelize";
import { Op } from "sequelize";
import PersDepartemen from "../model/PersDepartemen.js";

export const getCutiUserByNik = async (req, res, next) => {
    try {
        const { nik } = req.params;

        if (!nik) {
            return next(
                new AppError("Parameter nik dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }

        const cuti = await PersCutiKaryawan.findAll({
            where: {
                nik: nik,
            },
        });

        if (cuti.length === 0) {
            return next(
                new AppError("Data cuti tidak ditemukan.", 404, "CUTI_NOT_FOUND")
            );
        }

        res.success(cuti, "Data cuti berhasil diambil.");
    } catch (error) {
        next(error);
    }
};

export const getCutiUserByIdCuti = async (req, res, next) => {
    try {
        const { id_cuti } = req.params;

        if (!id_cuti) {
            return next(
                new AppError("Parameter id_cuti dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }

        const cuti = await PersCutiKaryawan.findOne({
            where: {
                id_cuti: id_cuti,
            },
            include: [{
                model: PersCutiKaryawanDt,
            }]
        });

        if (!cuti) {
            return next(
                new AppError("Data cuti tidak ditemukan.", 404, "CUTI_NOT_FOUND")
            );
        }

        res.success(cuti, "Data cuti berhasil diambil.");
    } catch (error) {
        next(error);
    }
};

export const getDetailCutiUserById = async (req, res, next) => {
    try {
        const { id_cuti } = req.params;

        if (!id_cuti) {
            return next(
                new AppError("Parameter id_cuti dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }
        const cuti = await PersCutiKaryawanDt.findAll({
            where: {
                id_cuti: id_cuti,
            },
        });
        if (cuti.length === 0) {
            return next(
                new AppError("Data cuti tidak ditemukan.", 404, "CUTI_NOT_FOUND")
            );
        }

        res.success(cuti, "Data cuti berhasil diambil.");
    } catch (error) {
        next(error);
    }
};

export const getDetailCutiUserByAtasan = async (req, res, next) => {
    try {
        const { atasan } = req.params;
        if (!atasan) {
            return next(
                new AppError("Parameter atasan dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }
        const cuti = await PersCutiKaryawanDt.findAll({
            where: {
                atasan: atasan,
                approval: 2,
            },
        });

        if (cuti.length === 0) {
            return next(
                new AppError("Data cuti tidak ditemukan.", 404, "CUTI_NOT_FOUND")
            );
        }
        res.success(cuti, "Data cuti berhasil diambil.");
    } catch (error) {
        next(error);
    }
};

export const getPicUser = async (req, res, next) => {
    try {
        const { departemen, perusahaan, nik } = req.body;
        if (!nik || !departemen || !perusahaan) {
            return next(
                new AppError(
                    "Field nik, departemen, perusahaan dibutuhkan.",
                    400,
                    "MISSING_PARAMETERS"
                )
            );
        }
        const pic = await PersDataKaryawan.findAll({
            attributes: [
                [sequelize.col('nama_karyawan'), 'label'],
                [sequelize.col('nik'), 'value']
            ],
            where: {
                departemen: departemen,
                perusahaan: perusahaan,
                tanggal_keluar: sequelize.literal("tanggal_keluar = '0000-00-00'"),
                nik: {
                    [Op.ne]: nik
                }
            }
        });

        if (pic.length === 0) {
            return next(
                new AppError("PIC tidak ditemukan.", 404, "PIC_NOT_FOUND")
            );
        }
        res.success(pic, "PIC berhasil diambil.");
    } catch (error) {
        next(error)
    }
}

export const getAtasanUser = async (req, res, next) => {
    try {
        // Destructure parameters
        const { nik, departemen } = req.body;

        // Validate input
        if (!nik || !departemen) {
            return next(
                new AppError('Field nik, departemen dibutuhkan.', 400, 'MISSING_PARAMETERS')
            );
        }

        // Temukan informasi departemen untuk mendapatkan parent
        const departemenInfo = await PersDepartemen.findOne({
            where: { kode: departemen },
            attributes: ['kode', 'parent', 'pt']
        });

        // Validasi departemen
        if (!departemenInfo) {
            return next(
                new AppError('Departemen tidak ditemukan', 404, 'DEPARTEMEN_NOT_FOUND')
            );
        }

        // Siapkan daftar departemen (termasuk parent jika ada)
        const departemenList = departemenInfo.parent
            ? [departemen, departemenInfo.parent]
            : [departemen];

        // Ambil data atasan
        const atasan = await PersDataKaryawan.findAll({
            attributes: [
                ['nama_karyawan', 'label'],
                ['nik', 'value'],
                'jabatan',
                'departemen'
            ],
            where: {
                jabatan: {
                    [Op.lte]: 'J009'
                },
                nik: {
                    [Op.ne]: nik
                },
                departemen: {
                    [Op.in]: departemenList
                },
                tanggal_keluar: {
                    [Op.or]: [
                        { [Op.eq]: '0000-00-00' },
                        { [Op.is]: null }
                    ]
                },
                perusahaan: departemenInfo.pt
            },
            order: [['nama_karyawan', 'ASC']],
        });

        res.success(atasan, "Atasan berhasil diambil")

    } catch (error) {
        next(error)
    }
};

export const createCutiUser = async (req, res, next) => {
    try {
        const validationResult = cutiUserSchema.safeParse(req.body);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            return next(
                new AppError(
                    "Data input tidak valid.",
                    422,
                    "VALIDATION_ERROR",
                    formattedErrors
                )
            );
        }

        const validatedData = validationResult.data;
        const { id_cuti, tanggal_mulai, tanggal_berakhir } = validatedData;

        // Validasi 1: Cek tanggal mulai > tanggal berakhir
        if (tanggal_mulai > tanggal_berakhir) {
            return next(
                new AppError(
                    "Pengajuan tanggal salah.",
                    400,
                    "INVALID_DATE_RANGE",
                    { tanggal: "Tanggal mulai tidak boleh lebih besar dari tanggal berakhir" }
                )
            );
        }

        // Validasi 2: Cek tanggal berakhir < tanggal hari ini
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
        if (tanggal_berakhir < today) {
            return next(
                new AppError(
                    "Tanggal yang diajukan sudah lewat.",
                    400,
                    "EXPIRED_DATE",
                    { tanggal: "Tanggal pengajuan cuti tidak boleh sudah berlalu" }
                )
            );
        }

        // Validasi tambahan: Cek tanggal mulai < tanggal hari ini
        if (tanggal_mulai < today) {
            return next(
                new AppError(
                    "Tanggal mulai sudah lewat.",
                    400,
                    "EXPIRED_START_DATE",
                    { tanggal_mulai: "Tanggal mulai cuti tidak boleh sudah berlalu" }
                )
            );
        }

        // Hitung total_hari berdasarkan selisih tanggal
        const diffTime = Math.abs(tanggal_berakhir - tanggal_mulai);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 karena inclusive date range

        // Override total_hari dari input dengan hasil perhitungan
        validatedData.total_hari = diffDays;

        // Validasi 3: Cek apakah tanggal cuti sudah pernah diajukan
        const overlappingCuti = await PersCutiKaryawanDt.findOne({
            where: {
                id_cuti: id_cuti,
                [Sequelize.Op.or]: [
                    {
                        // Tanggal mulai ada di antara periode cuti yang sudah ada
                        tanggal_mulai: {
                            [Sequelize.Op.between]: [tanggal_mulai, tanggal_berakhir]
                        }
                    },
                    {
                        // Tanggal berakhir ada di antara periode cuti yang sudah ada
                        tanggal_berakhir: {
                            [Sequelize.Op.between]: [tanggal_mulai, tanggal_berakhir]
                        }
                    },
                    {
                        // Periode cuti yang diajukan melingkupi periode cuti yang sudah ada
                        [Sequelize.Op.and]: [
                            { tanggal_mulai: { [Sequelize.Op.lte]: tanggal_mulai } },
                            { tanggal_berakhir: { [Sequelize.Op.gte]: tanggal_berakhir } }
                        ]
                    }
                ]
            }
        });

        if (overlappingCuti) {
            return next(
                new AppError(
                    "Tanggal cuti sudah pernah diajukan.",
                    400,
                    "DUPLICATE_LEAVE_DATE",
                    { tanggal: "Periode cuti ini sudah pernah diajukan sebelumnya" }
                )
            );
        }

        // Validasi 4 & 5: Cek data dari PersCutiKaryawan
        const cutiKaryawan = await PersCutiKaryawan.findOne({
            where: {
                id_cuti: id_cuti,
                aktif: 0 // Pastikan hanya cek data yang aktif
            }
        });

        if (!cutiKaryawan) {
            return next(
                new AppError(
                    "Data cuti karyawan tidak ditemukan.",
                    404,
                    "LEAVE_DATA_NOT_FOUND",
                    { id_cuti: "Data cuti dengan ID tersebut tidak ditemukan atau tidak aktif" }
                )
            );
        }

        // Validasi tambahan: Cek tanggal mulai tidak sebelum tanggal berlaku di PersCutiKaryawan
        if (tanggal_mulai < new Date(cutiKaryawan.tanggal_berlaku)) {
            return next(
                new AppError(
                    "Tanggal cuti diluar periode berlaku.",
                    400,
                    "INVALID_LEAVE_START_DATE",
                    { tanggal_mulai: "Tanggal mulai cuti sebelum periode hak cuti berlaku" }
                )
            );
        }

        // Validasi 4: Cek tanggal_mulai > tanggal_berakhir di PersCutiKaryawan
        if (tanggal_mulai > new Date(cutiKaryawan.tanggal_berakhir)) {
            return next(
                new AppError(
                    "Tanggal cuti melebihi periode berlaku.",
                    400,
                    "INVALID_LEAVE_PERIOD",
                    { tanggal: "Tanggal cuti melebihi tanggal berakhir periode cuti yang berlaku" }
                )
            );
        }

        // Validasi 5: Cek total_hari yang diajukan melebihi sisa saldo
        if (diffDays > cutiKaryawan.saldo) {
            return next(
                new AppError(
                    "Saldo cuti tidak mencukupi.",
                    400,
                    "INSUFFICIENT_LEAVE_BALANCE",
                    { total_hari: `Sisa saldo cuti: ${cutiKaryawan.saldo} hari, yang diajukan: ${diffDays} hari` }
                )
            );
        }

        // Validasi tambahan: Cek status hutang cuti
        if (cutiKaryawan.sisa_hutang > 0) {
            // Tambahkan notifikasi tetapi tidak mencegah pengajuan
            console.warn(`Perhatian: Karyawan dengan ID ${id_cuti} masih memiliki hutang cuti sebesar ${cutiKaryawan.sisa_hutang} hari`);
            // Opsional: Bisa ditambahkan ke dalam respons sebagai warning
        }

        // Ambil no urutan transaksi
        const existingRecords = await PersCutiKaryawanDt.findAll({
            where: {
                id_cuti: id_cuti,
            },
            attributes: ["no_transaksi"],
        });

        const existingNumbers = existingRecords
            .map((record) => record.no_transaksi)
            .filter((num) => typeof num === "number" && !isNaN(num));

        let next_no_transaksi = 0;

        if (existingNumbers.length > 0) {
            const maxNoTransaksi = Math.max(...existingNumbers);
            next_no_transaksi = maxNoTransaksi + 1;
        }

        // Validasi tambahan: Batasi jumlah pengajuan cuti per periode
        if (next_no_transaksi >= 10) { // Contoh: maksimal 10 pengajuan per periode
            return next(
                new AppError(
                    "Batas maksimum pengajuan cuti tercapai.",
                    400,
                    "MAX_LEAVE_REQUESTS_REACHED",
                    { id_cuti: "Sudah mencapai batas maksimum pengajuan cuti untuk periode ini" }
                )
            );
        }

        const dataToCreate = {
            ...validatedData,
            no_transaksi: next_no_transaksi,
            id_transaksi: id_cuti + "N" + next_no_transaksi,
            approval: 2
        };

        // Transaction untuk memastikan konsistensi data
        const t = await db.transaction();

        try {
            const cuti = await PersCutiKaryawanDt.create(dataToCreate, { transaction: t });

            // Update saldo cuti di PersCutiKaryawan
            await PersCutiKaryawan.update(
                { saldo: cutiKaryawan.saldo - diffDays },
                {
                    where: { id_cuti: id_cuti },
                    transaction: t
                }
            );

            await t.commit();
            res.created(cuti, "Cuti user berhasil dibuat dengan total hari " + diffDays);
        } catch (error) {
            await t.rollback();
            throw error; // Re-throw untuk ditangkap oleh catch luar
        }
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(
                new AppError(
                    "Gagal membuat cuti: id transaksi cuti sudah ada (cek unique constraints).",
                    409,
                    "DUPLICATE_ENTRY",
                    error.errors
                )
            );
        }
        if (error.name === "SequelizeValidationError") {
            return next(
                new AppError(
                    "Data tidak valid (Sequelize).",
                    400,
                    "SEQUELIZE_VALIDATION_ERROR",
                    error.errors
                )
            );
        }
        if (error.name === "SequelizeConnectionError" || error.name === "SequelizeConnectionRefusedError") {
            return next(
                new AppError(
                    "Gagal terhubung ke database.",
                    503,
                    "DATABASE_CONNECTION_ERROR",
                    { message: error.message }
                )
            );
        }
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return next(
                new AppError(
                    "Data referensi tidak ditemukan.",
                    400,
                    "FOREIGN_KEY_CONSTRAINT_ERROR",
                    { message: "Salah satu data referensi (foreign key) tidak ditemukan" }
                )
            );
        }
        next(error);
    }
};

export const cutiAprroveAtasan = async (req, res, next) => {
    try {
        const { id_transaksi } = req.params;

        if (!id_transaksi) {
            return next(
                new AppError("Parameter id_transaksi dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }

        const cuti = await PersCutiKaryawanDt.findOne({
            where: {
                id_transaksi: id_transaksi
            },
            attributes: ['id_cuti', 'id_transkasi']
        });

        if (!cuti) {
            return next(new AppError(`Cuti dengan nomor transaksi "${cuti.id_transaksi}" tidak ditemukan.`, 404, "CUTI_NOT_FOUND"));
        }

        const update = await PersCutiKaryawanDt.update({
            approval: 1
        },
            {
                where: {
                    id_transaksi: id_transaksi
                }
            }
        )

        res.success(update, 'Cuti berhasil diapprove.');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return next(new AppError('Data tidak valid (Sequelize).', 400, 'SEQUELIZE_VALIDATION_ERROR', error.errors));
        }
        next(error);
    }
}

export const cutiRejectAtasan = async (req, res, next) => {
    try {
        const { id_transaksi } = req.params;

        if (!id_transaksi) {
            return next(
                new AppError("Parameter id_transaksi dibutuhkan.", 400, "MISSING_PARAMETER")
            );
        }

        const cuti = await PersCutiKaryawanDt.findOne({
            where: {
                id_transaksi: id_transaksi
            },
            attributes: ['id_cuti', 'id_transkasi']
        });

        if (!cuti) {
            return next(new AppError(`Cuti dengan nomor transaksi "${cuti.id_transaksi}" tidak ditemukan.`, 404, "CUTI_NOT_FOUND"));
        }

        const update = await PersCutiKaryawanDt.update({
            approval: 3
        },
            {
                where: {
                    id_transaksi: id_transaksi
                }
            }
        )

        res.success(update, 'Cuti ditolak.');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return next(new AppError('Data tidak valid (Sequelize).', 400, 'SEQUELIZE_VALIDATION_ERROR', error.errors));
        }
        next(error);
    }
}

export const getHariLibur = async (req, res, next) => {
    try {
        const libur = await CydHol.findAll();

        res.success(libur, 'Data libur berhasil diambil');
    } catch (error) {
        next(error);
    }
}

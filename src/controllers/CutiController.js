import CydHol from "../model/CydHol.js";
import PersCutiKaryawan from "../model/PersCutiKaryawan.js";
import PersCutiKaryawanDt from "../model/PersCutiKaryawanDt.js";
import { cutiUserSchema } from "../schema/CutiSchema.js";
import { AppError } from "../utils/errorHandler.js";

export const getCutiUserByNik = async (req, res, next) => {
    try {
        const { nik } = req.params;

        if (!nik) {
            return next(
                new AppError("Parameter nik dibutuhkan.", 400, "NIK_REQUIRED")
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

export const getDetailCutiUserById = async (req, res, next) => {
    try {
        const { id_cuti } = req.params;

        if (!id_cuti) {
            return next(
                new AppError("Parameter id_cuti dibutuhkan.", 400, "ID_CUTI_REQUIRED")
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
                new AppError("Parameter atasan dibutuhkan.", 400, "ATASAN_REQUIRED")
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
        const { id_cuti } = validatedData;

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

        const dataToCreate = {
            ...validatedData,
            no_transaksi: next_no_transaksi,
            id_transaksi: id_cuti + "N" + next_no_transaksi,
        };

        const cuti = await PersCutiKaryawanDt.create(dataToCreate);

        res.created(cuti, "Cuti user berhasil dibuat.");
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
        next(error);
    }
};

export const cutiAprroveAtasan = async (req, res, next) => {
    try {
        const { id_transaksi } = req.params;

        if (!id_transaksi) {
            return next(
                new AppError("Parameter id_transaksi dibutuhkan.", 400, "ID_TRANSAKSI_REQUIRED")
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
                new AppError("Parameter id_transaksi dibutuhkan.", 400, "ID_TRANSAKSI_REQUIRED")
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

import PersDataLaporanHarian from "../model/PersDataLaporanHarian.js";
import PersDataLaporanKesehatan from "../model/PersDataLaporanKesehatan.js";
import {
  laporanHarianSchema,
  laporanKesehatanSchema,
} from "../schema/aktivitasSchema.js";

export const getLaporanHarianById = async (req, res, next) => {
  // Tambahkan next
  try {
    const { id_laporan } = req.params;

    if (!id_laporan) {
      return next(
        new AppError(
          "Parameter id_laporan dibutuhkan.",
          400,
          "ID_LAPORAN_REQUIRED"
        )
      );
    }

    const laporan = await PersDataLaporanHarian.findAll({
      where: {
        id_laporan: id_laporan,
      },
      order: [["no_urut", "ASC"]],
      limit: 4,
    });

    if (laporan.length === 0) {
      return next(
        new AppError(
          `Laporan  dengan ID ${id_laporan} tidak ditemukan.`,
          404,
          "LAPORAN_NOT_FOUND"
        )
      );
    }

    res.success(laporan, "Data laporan harian berhasil diambil.");
  } catch (error) {
    next(error);
  }
};

// export const getNoUrutLaporanHarian = async (req, res, next) => { // Tambahkan next
//     try {
//         const { id_laporan } = req.params;

//         if (!id_laporan) {
//             return next(new AppError('Parameter id_laporan dibutuhkan.', 400, 'ID_LAPORAN_REQUIRED'));
//         }

//         const lastEntry = await PersDataLaporanHarian.findOne({
//             where: {
//                 id_laporan: id_laporan
//             },
//             attributes: ['no_urut'],
//             order: [
//                 ['no_urut', 'DESC']
//             ]
//         });

//         const noUrut = lastEntry ? lastEntry.no_urut : 0;
//         res.success({ no_urut: noUrut }, 'Nomor urut terakhir berhasil diambil.');

//     } catch (error) {
//         next(error);
//     }
// };

export const getLaporanKesehatanByNik = async (req, res, next) => {
  try {
    const { nik } = req.params;

    if (!nik) {
      return next(
        new AppError(
          "Parameter NIK dibutuhkan di URL.",
          400,
          "NIK_PARAM_REQUIRED"
        )
      );
    }

    const laporan = await PersDataLaporanKesehatan.findAll({
      where: {
        nik: nik,
      },
      order: [["tanggal", "DESC"]],
      limit: 10,
    });

    if (laporan.length === 0) {
      return next(
        new AppError(
          `Laporan kesehatan tidak ditemukan.`,
          404,
          "LAPORAN_KESEHATAN_NOT_FOUND"
        )
      );
    }

    res.success(laporan, "Data laporan kesehatan berhasil diambil.");
  } catch (error) {
    next(error);
  }
};

export const getLaporanKesehatanById = async (req, res, next) => {
  try {
    const { id_laporan } = req.params;

    if (!id_laporan) {
      return next(
        new AppError(
          "Parameter id_laporan dibutuhkan di URL.",
          400,
          "ID_LAPORAN_PARAM_REQUIRED"
        )
      );
    }

    const laporan = await PersDataLaporanKesehatan.findOne({
      where: { id_laporan: id_laporan },
    });

    if (!laporan) {
      return next(
        new AppError(
          `Laporan kesehatan dengan ID ${id_laporan} tidak ditemukan.`,
          404,
          "LAPORAN_KESEHATAN_NOT_FOUND"
        )
      );
    }

    res.success(laporan, "Data laporan kesehatan berhasil diambil.");
  } catch (error) {
    next(error);
  }
};

export const getLaporanKesehatanByTanggal = async (req, res, next) => {
  try {
    const { nik, tanggal } = req.body;
    if (!nik || !tanggal) {
      return next(
        new AppError(
          "Field NIK dan Tanggal dibutuhkan dalam body request.",
          400,
          "MISSING_NIK_TANGGAL_BODY"
        )
      );
    }

    const laporan = await PersDataLaporanKesehatan.findAll({
      where: {
        nik: nik,
        tanggal: tanggal,
      },
    });

    if (laporan.length === 0) {
      return next(
        new AppError(
          `Laporan kesehatan tidak ditemukan.`,
          404,
          "LAPORAN_KESEHATAN_NOT_FOUND"
        )
      );
    }

    res.success(laporan, "Data laporan kesehatan berhasil diambil.");
  } catch (error) {
    next(error);
  }
};

export const createLaporanHarian = async (req, res, next) => {
  // Tambahkan next
  try {
    const validationResult = laporanHarianSchema.safeParse(req.body);

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
    const { id_laporan } = validatedData;

    const lastEntry = await PersDataLaporanHarian.findOne({
      where: { id_laporan: id_laporan },
      attributes: ["no_urut"],
      order: [["no_urut", "DESC"]],
    });

    const nextNoUrut = lastEntry ? lastEntry.no_urut + 1 : 1;

    const dataToCreate = {
      ...validatedData,
      no_urut: nextNoUrut, // Set no_urut yang sudah dihitung
    };

    const laporan = await PersDataLaporanHarian.create(dataToCreate);

    res.created(laporan, "Data laporan harian berhasil ditambahkan.");
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return next(
        new AppError(
          "Gagal menambahkan data: Kombinasi data sudah ada (cek unique constraints).",
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

export const createLaporanKesehatan = async (req, res, next) => {
  try {
    const validationResult = laporanKesehatanSchema.safeParse(req.body);

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

    const laporan = await PersDataLaporanKesehatan.create(validatedData);

    res.created(laporan, "Laporan kesehatan berhasil ditambahkan.");
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return next(
        new AppError(
          "Gagal menambahkan data: Laporan untuk ID/NIK/Tanggal tersebut mungkin sudah ada.",
          409,
          "DUPLICATE_LAPKES",
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

export const deleteLaporanHarianByNoUrut = async (req, res, next) => {
  try {
    const { id_laporan, no_urut } = req.body;

    if (!id_laporan || !no_urut) {
      return next(
        new AppError(
          "Field id_laporan dan no_urut dibutuhkan dalam body request.",
          400,
          "MISSING_DELETE_BODY_PARAMS"
        )
      );
    }

    const deleteLaporan = await PersDataLaporanHarian.destroy({
      where: {
        id_laporan: id_laporan,
        no_urut: no_urut,
      },
    });

    if (deleteLaporan === 0) {
      return next(
        new AppError(
          `Detail laporan dengan ID ${id_laporan} dan No Urut ${no_urut} tidak ditemukan.`,
          404,
          "LAPORAN_DETAIL_NOT_FOUND"
        )
      );
    }

    res.success(
      null,
      `Detail laporan dengan No Urut ${no_urut} untuk ID Laporan ${id_laporan} berhasil dihapus.`
    );
  } catch (error) {
    next(error);
  }
};

export const deleteLaporanHarianById = async (req, res, next) => {
  try {
    const { id_laporan } = req.body;

    if (!id_laporan) {
      return next(
        new AppError(
          "Field id_laporan dibutuhkan dalam body request.",
          400,
          "ID_LAPORAN_BODY_REQUIRED"
        )
      );
    }

    const deleteLaporan = await PersDataLaporanHarian.destroy({
      where: {
        id_laporan: id_laporan,
      },
    });

    res.success(
      null,
      `Berhasil menghapus ${deleteLaporan} detail laporan untuk ID Laporan ${id_laporan}.`
    );
  } catch (error) {
    next(error);
  }
};

export const deleteLaporanKesehatanById = async (req, res, next) => {
  try {
    const { id_laporan } = req.body;

    if (!id_laporan) {
      return next(
        new AppError(
          "Parameter id_laporan dibutuhkan di URL.",
          400,
          "ID_LAPORAN_PARAM_REQUIRED"
        )
      );
    }

    const deleteLaporan = await PersDataLaporanKesehatan.destroy({
      where: {
        id_laporan: id_laporan,
      },
    });

    if (deleteLaporan === 0) {
      return next(
        new AppError(
          `Laporan kesehatan dengan ID ${id_laporan} tidak ditemukan.`,
          404,
          "LAPORAN_KES_NOT_FOUND"
        )
      );
    }

    res.success(
      null,
      `Laporan kesehatan dengan ID ${id_laporan} berhasil dihapus.`
    );
  } catch (error) {
    next(error);
  }
};

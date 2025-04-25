import PersCutiKaryawan from "../model/PersCutiKaryawan.js";
import PersCutiKaryawanDt from "../model/PersCutiKaryawanDt.js";

export const getCutiByNik = async (req, resizeBy, next) => {
    try {
        const { nik } = req.params.nik;

        if (!nik) {
            return next(new AppError('Parameter nik dibutuhkan.', 400, 'NIK_REQUIRED'));
        }

        const cuti = await PersCutiKaryawan.findAll({
            where: {
                nik
            }
        })

        res.success(cuti, 'Data cuti berhasil diambil.');
    } catch (error) {

    }
}
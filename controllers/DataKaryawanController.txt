import DataUser from "../models/DataKaryawanModel.js";
import Departemen from "../models/DepartemenModel.js";


export const getDataKaryawanByNik = async (req, res) => {
    try {
        const dataKaryawan = await DataUser.findOne({
            include: [
                { model: Departemen, attributes: ['kode', 'desc'] }
            ],
            where: {
                nik: req.params.nik
            },
            attributes: ['nama_karyawan', 'nik', 'status', 'jabatan', 'golongan', 'departemen', 'perusahaan', 'lokasi']
        });
        res.json(dataKaryawan)
    } catch (error) {
        res.json(error);
    }
}
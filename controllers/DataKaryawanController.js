import DataUser from "../models/DataKaryawanModel.js";

export const getDataKaryawanByNik = async(req,res) => {
    try {
        const dataKaryawan = await DataUser.findOne({
            where:{
                nik: req.params.nik
            },
            attributes: ['nama_karyawan', 'nik', 'status', 'jabatan', 'golongan', 'departemen', 'perusahaan', 'lokasi']
        });
        res.json(dataKaryawan)
    } catch (error) {
        res.json(error);
    }
}
import { QueryTypes } from "sequelize";

import DataUser from "../models/DataKaryawanModel.js";

export const getDataKaryawan = async (req, res) => {
    try {
        const dataKaryawan = await DataUser.sequelize.query("SELECT * FROM pers_datakaryawan", {
            type: QueryTypes.SELECT
        });

        let response = {
            record: dataKaryawan
        }
        res.json(response);

    } catch (error) {
        res.json(error);
    }
}

export const getDataKaryawanByNik = async (req, res) => {
    try {
        const dataKaryawan = await DataUser.sequelize.query(
            "SELECT jabatan, pt, departemen, nik_kantor, nik, golongan, status, nama_karyawan, pers_departemen.desc as Departemen, pers_jabatan.desc as Jabatan, pers_lokasi.lokasi as Lokasi, pers_pt.nama_pt as PT FROM pers_datakaryawan LEFT JOIN pers_departemen ON pers_datakaryawan.departemen = pers_departemen.kode LEFT JOIN pers_jabatan ON pers_datakaryawan.jabatan = pers_jabatan.kode LEFT JOIN pers_lokasi ON pers_datakaryawan.lokasi = pers_lokasi.kode LEFT JOIN pers_pt ON pers_datakaryawan.perusahaan = pers_pt.kode WHERE nik = :nonik",
            {
                replacements: { nonik: req.params.nik },
                type: QueryTypes.SELECT
            });
        res.json(dataKaryawan);

    } catch (error) {
        res.json(error);
    }
}
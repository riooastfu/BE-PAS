import { QueryTypes } from "sequelize";

import DtLapHarian from "../models/DataLaporanHarianModel.js";

export const getDtLapHarianById = async (req, res) => {
    try {
        const dtLapHarian = await DtLapHarian.sequelize.query(
            "SELECT * FROM pers_datalaporan_harian WHERE id_laporan = :id_laporan",
            {
                replacements: { id_laporan: req.params.id_laporan },
                type: QueryTypes.SELECT
            });
        res.json(dtLapHarian);

    } catch (error) {
        res.json(error);
    }
}

export const createDtLapHarian = async (req, res) => {
    try {
        const { nik, no_urut, id_laporan, nik_kantor, nama_karyawan, jabatan_karyawan, dept_karyawan, uraian_kegiatan, target_harian, pt, kategori, lokasi_kerja, atasan_langsung } = req.body
        await DtLapHarian.create(req.body, {
            where: {
                id_laporan: req.params.id_laporan
            }
        });
        res.status(201).json({ msg: "Data Ditambah!" })
    } catch (error) {
        res.json("Error: ", error)
    }
}

export const deleteDtLapHarByNoUrut = async (req, res) => {
    try {
        const dtLapHarian = await DtLapHarian.sequelize.query("DELETE FROM pers_datalaporan_harian WHERE no_urut = :no_urut AND id_laporan = :id_laporan",
            {
                replacements: { no_urut: req.params.no_urut, id_laporan: req.params.id_laporan },
                type: QueryTypes.DELETE
            });
        res.json("Berhasil Delete");
    } catch (error) {
        res.json(error);
    }
}

export const deleteDtLapHarById = async (req, res) => {
    try {
        const dtLapHarian = await DtLapHarian.sequelize.query("DELETE FROM pers_datalaporan_harian WHERE id_laporan = :id_laporan",
            {
                replacements: { id_laporan: req.params.id_laporan },
                type: QueryTypes.DELETE
            });
        res.json("Berhasil Delete");
    } catch (error) {
        res.json(error);
    }
}
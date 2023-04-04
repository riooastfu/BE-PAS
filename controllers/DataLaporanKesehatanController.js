import { QueryTypes } from "sequelize";

import DtLapKes from "../models/DataLaporanKesehatanModel.js";

export const getDtLapKesByNik = async (req, res) => {
    try {
        const dtLapKes = await DtLapKes.sequelize.query(
            "SELECT * FROM pers_datalaporan_kesehatan WHERE nik = :nonik ORDER BY tanggal DESC LIMIT 0,10",
            {
                replacements: { nonik: req.params.nik },
                type: QueryTypes.SELECT
            });
        res.json(dtLapKes);

    } catch (error) {
        res.json(error);
    }
}

export const getDtLapKesById = async (req, res) => {
    try {
        const dtLapKes = await DtLapKes.sequelize.query(
            "SELECT * FROM pers_datalaporan_kesehatan WHERE id_laporan = :id",
            {
                replacements: { id: req.params.id_laporan },
                type: QueryTypes.SELECT
            });
        res.json(dtLapKes);

    } catch (error) {
        res.json(error);
    }
}

export const deleteDtLapKesByTgl = async (req, res) => {
    try {
        const dtLapKes = await DtLapKes.sequelize.query("DELETE FROM pers_datalaporan_kesehatan WHERE id_laporan = :id",
            {
                replacements: { id: req.params.id_laporan },
                type: QueryTypes.DELETE
            });
        res.json("Berhasil Delete");
    } catch (error) {
        res.json(error);
    }
}

export const createLapKes = async (req, res) => {
    try {
        const { id_laporan, nik, nik_kantor, tanggal, jam_masuk, jam_pulang, status_kerja, kesehatan_tanggal, kesehatan_nama, kesehatan_dept, kesehatan_jabatan, kesehatan_pt, kesehatan_suhu, kesehatan_keluarga, kesehatan_kontak, kesehatan_resiko, kesehatan_pagi, kesehatan_malam, kesehatan_berobat } = req.body
        await DtLapKes.create(req.body, {
            where: {
                nik: req.params.nik
            }
        });
        res.json({ msg: "Data Ditambah!" })
    } catch (error) {
        res.json(error)
    }
}
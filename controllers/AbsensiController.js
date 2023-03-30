import { QueryTypes } from "sequelize";

import DataAbsen from "../models/AbsensiModel.js";

export const getDataAbsen = async (req, res) => {
    try {
        const dataAbsen = await DataAbsen.sequelize.query("SELECT pin, pegawai_nip, pegawai_nama, DATE(scan_date) as Tanggal_Masuk, MIN(TIME(scan_date)) as jam_masuk, MAX(TIME(scan_date)) as jam_pulang FROM att_log LEFT JOIN pegawai ON att_log.pin = pegawai.pegawai_pin WHERE pegawai_nip = :pegawai_nip GROUP BY Tanggal_Masuk ORDER BY scan_date DESC LIMIT 0,9",
            {
                replacements: { pegawai_nip: req.params.pegawai_nip },
                type: QueryTypes.SELECT
            });
        res.json(dataAbsen);
    } catch (error) {
        res.json(error)
    }
}
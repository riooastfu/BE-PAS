import { QueryTypes } from "sequelize";

import DataAbsen from "../models/AbsensiModel.js";

export const getDataAbsen = async (req, res) => {
    try {
        const dataAbsen = await DataAbsen.sequelize.query("SELECT pegawai_nama FROM att_log LEFT JOIN pegawai ON att_log.pin = pegawai.pegawai_pin WHERE pegawai_nip = :pegawai_nip", {
            replacements: { pegawai_nip: req.params.pegawai_nip },
            type: QueryTypes.SELECT
        });
        res.json(dataAbsen);
    } catch (error) {
        res.json(error)
    }
}
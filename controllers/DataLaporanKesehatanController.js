import { QueryTypes } from "sequelize";

import DtLapKes from "../models/DataLaporanKesehatanModel.js";

export const getDtLapKesByNik = async (req, res) => {
    try {
        const dtLapKes = await DtLapKes.sequelize.query(
            "SELECT * FROM pers_datalaporan_kesehatan WHERE nik = :nonik ORDER BY tanggal DESC LIMIT 0,8",
            {
                replacements: { nonik: req.params.nik },
                type: QueryTypes.SELECT
            });
        res.json(dtLapKes);

    } catch (error) {
        res.json(error);
    }
}
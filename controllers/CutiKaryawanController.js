import { QueryTypes } from "sequelize";

import DataCutiKaryawan from "../models/CutiKaryawanModel.js";

export const getCutiByNik = async (req, res) => {
    try {
        const dataCuti = await DataCutiKaryawan.sequelize.query("SELECT * FROM pers_cutikaryawan WHERE nik = :nik",
            {
                replacements: { nik: req.params.nik },
                type: QueryTypes.SELECT
            });
        res.json(dataCuti);
    } catch (error) {
        res.json(error);
    }
}
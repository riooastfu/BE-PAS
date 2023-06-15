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

export const getCutiByIdCuti = async (req, res) => {
    try {
        const dataCuti = await DataCutiKaryawan.sequelize.query("SELECT * FROM pers_cutikaryawan WHERE id_cuti = :id_cuti",
            {
                replacements: { id_cuti: req.params.id_cuti },
                type: QueryTypes.SELECT
            });
        res.json(dataCuti);
    } catch (error) {
        res.json(error);
    }
}
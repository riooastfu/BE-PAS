import { QueryTypes } from "sequelize";

import DataCutiKaryawandt from "../models/CutiKaryawanDtModel.js";

export const getCutiDtByIdCuti = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("SELECT * FROM pers_cutikaryawandt WHERE id_cuti = :id_cuti",
            {
                replacements: { id_cuti: req.params.id_cuti },
                type: QueryTypes.SELECT
            });
        res.json(dataCutiDt);
    } catch (error) {
        res.json(error);
    }
}
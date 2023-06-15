import { QueryTypes } from "sequelize";

import DataCYDHol from "../models/CYDHolModel.js";

export const getDataCYDHol = async (req, res) => {
    try {
        const data = await DataCYDHol.sequelize.query("SELECT [Tanggal_Libur], [Keterangan_Libur],[Cuti_Bersama],[CRUSRID],[CREATDDT],[MDFUSRID],[MODIFDT],[DEX_ROW_ID]FROM [CUSG].[dbo].[CYD_HOL]",
            {
                type: QueryTypes.SELECT
            });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}
import { Sequelize } from "sequelize";
import { db_cusg } from "../config/database.js";

const { DataTypes } = Sequelize;

const CydHol = db_cusg.define('CYD_HOL', {
    Tanggal_Libur: {
        type: DataTypes.DATE,
        primaryKey: true
    },
    Keterangan_Libur: {
        type: DataTypes.CHAR(61)
    },
    Cuti_Bersama: {
        type: DataTypes.TINYINT
    },
    CRUSRID: {
        type: DataTypes.CHAR(15)
    },
    CREATDDT: {
        type: DataTypes.DATE,
    },
    MDFUSRID: {
        type: DataTypes.CHAR(15)
    },
    MODIFDT: {
        type: DataTypes.DATE,
    },
    DEX_ROW_ID: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

export default CydHol;
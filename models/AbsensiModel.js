import { Sequelize } from "sequelize";
import { db_finpro } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataAbsen = db_finpro.define('att_log', {
    sn: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    scan_date: {
        type: DataTypes.DATE,
        primaryKey: true
    },
    pin: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    verifymode: {
        type: DataTypes.INTEGER(11),
    },
    inoutmode: {
        type: DataTypes.INTEGER(11),
    },
    reserved: {
        type: DataTypes.INTEGER(11),
    },
    work_code: {
        type: DataTypes.INTEGER(11),
    },
    att_id: {
        type: DataTypes.STRING(50),
    }
}, {
    freezeTableName: true,
});

export default DataAbsen;
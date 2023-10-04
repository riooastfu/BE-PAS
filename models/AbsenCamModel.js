import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataAbsenCam = db.define('pers_absensikaryawan', {
    id_absen: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
    },
    nik: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
    },
    checkin: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    checkout: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    file_upload: {
        type: DataTypes.STRING(255)
    },
}, {
    freezeTableName: true,
});

export default DataAbsenCam;
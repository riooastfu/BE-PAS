import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataCutiKaryawan = db.define('pers_cutikaryawan', {
    id_cuti: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    periode: {
        type: DataTypes.STRING(100)
    },
    nik: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
    },
    tanggal_berlaku: {
        type: DataTypes.DATEONLY
    },
    tanggal_berakhir: {
        type: DataTypes.DATEONLY
    },
    hak_cuti: {
        type: DataTypes.INTEGER(3)
    },
    sisa_hutang: {
        type: DataTypes.INTEGER(3)
    },
    saldo: {
        type: DataTypes.INTEGER(3)
    },
    aktif: {
        type: DataTypes.TINYINT(1)
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

export default DataCutiKaryawan;
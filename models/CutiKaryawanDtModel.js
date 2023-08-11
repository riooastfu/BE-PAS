import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataCutiKaryawandt = db.define('pers_cutikaryawandt', {
    id_cuti: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    no_transaksi: {
        type: DataTypes.INTEGER(5),
        primaryKey: true
    },
    id_transaksi: {
        type: DataTypes.STRING(25),
        primaryKey: true
    },
    tanggal_mulai: {
        type: DataTypes.DATEONLY
    },
    tanggal_berakhir: {
        type: DataTypes.DATEONLY
    },
    total_hari: {
        type: DataTypes.INTEGER(3)
    },
    tipe_cuti: {
        type: DataTypes.STRING(10)
    },
    alasan: {
        type: DataTypes.STRING(200)
    },
    alamat_cuti: {
        type: DataTypes.STRING(200)
    },
    approval: {
        type: DataTypes.STRING(10)
    },
    pic: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
    },
    atasan: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
    },
    no_telepon: {
        type: DataTypes.STRING(20)
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

export default DataCutiKaryawandt;                                                                                                                                                                                                                                                               
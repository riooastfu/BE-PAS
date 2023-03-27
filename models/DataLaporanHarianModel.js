import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DtLapHarian = db.define('pers_datalaporan_harian', {
    nik: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
        primaryKey: true
    },
    no_urut: {
        type: DataTypes.INTEGER(4),
        primaryKey: true
    },
    id_laporan: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    nik_kantor: {
        type: DataTypes.STRING(20)
    },
    nama_karyawan: {
        type: DataTypes.STRING(100)
    },
    jabatan_karyawan: {
        type: DataTypes.STRING(40)
    },
    dept_karyawan: {
        type: DataTypes.STRING(40)
    },
    uraian_kegiatan: {
        type: DataTypes.TEXT
    },
    target_harian: {
        type: DataTypes.TEXT
    },
    pt: {
        type: DataTypes.STRING(255)
    },
    kategori: {
        type: DataTypes.STRING(255)
    },
    lokasi_kerja: {
        type: DataTypes.STRING(40)
    },
    atasan_langsung: {
        type: DataTypes.INTEGER(10)
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

export default DtLapHarian;
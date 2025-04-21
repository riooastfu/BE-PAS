import { Sequelize } from "sequelize";
import { db_finpro } from "../config/database.js";

const { DataTypes } = Sequelize;

const FinPro = db_finpro.define('pegawai', {
    pegawai_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: 0, // Note: If this is truly auto-incrementing, remove defaultValue and add autoIncrement: true
        // autoIncrement: true, // Uncomment if this ID auto-increments in the database
    },
    pegawai_pin: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    pegawai_nip: {
        type: DataTypes.STRING(30),
        allowNull: true, // 'Ya' means Yes (nullable)
    },
    pegawai_nama: {
        type: DataTypes.STRING(255),
        allowNull: false, // 'Tidak' means No (not nullable)
    },
    pegawai_alias: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    pegawai_pwd: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '0', // Default is '0' as a string for VARCHAR
    },
    pegawai_rfid: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '0', // Default is '0' as a string for VARCHAR
    },
    pegawai_privilege: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '0',
        comment: '-1: Invalid, 0: User, 1: Operator, 2: Sub Admin, 3: Admin',
    },
    pegawai_telp: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    pegawai_status: {
        type: DataTypes.TINYINT, // tinyint(3) maps to TINYINT
        allowNull: false,
        defaultValue: 1,
        comment: '0:Non Aktif, 1:Aktif, 2:Berhenti', // 0:Inactive, 1:Active, 2:Terminated
    },
    tempat_lahir: { // Place of birth
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    tgl_lahir: { // Date of birth
        type: DataTypes.DATEONLY, // Use DATEONLY for DATE columns without time
        allowNull: true,
    },
    pembagian1_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Default is 0
    },
    pembagian2_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Default is 0
    },
    pembagian3_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Default is 0
    },
    tgl_mulai_kerja: { // Start work date
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    tgl_resign: { // Resignation date
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: DataTypes.TINYINT, // tinyint(4) maps to TINYINT
        allowNull: false,
        defaultValue: 1,
        comment: '1:Laki-laki, 2:Perempuan', // 1:Male, 2:Female
    },
    tgl_masuk_pertama: { // First entry date
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    photo_path: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    tmp_img: {
        type: DataTypes.TEXT('medium'), // mediumtext maps to TEXT('medium')
        allowNull: true,
    },
    nama_bank: { // Bank name
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    nama_rek: { // Account holder name
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    no_rek: { // Account number
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    new_pegawai_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    charset: 'latin1',
    collate: 'latin1_swedish_ci'
});

export default FinPro;
import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersCutiKaryawan = db.define('pers_cutikaryawan', {
    id_cuti: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    periode: {
        type: DataTypes.STRING(100),
        allowNull: false
        // Mungkin merupakan bagian dari composite key dengan NIK di dunia nyata
        // primaryKey: true // Tambahkan jika ini bagian dari composite key
    },
    nik: {
        type: DataTypes.INTEGER.UNSIGNED, // Menangani atribut UNSIGNED
        allowNull: false, // 'Tak Ternilai' = Tidak
        defaultValue: 0 // Berdasarkan kolom 'Bawaan' (0000000000)
        // primaryKey: true // Tambahkan jika ini bagian dari composite key
    },
    tanggal_berlaku: {
        type: DataTypes.DATEONLY, // Hanya tanggal
        allowNull: false
    },
    tanggal_berakhir: {
        type: DataTypes.DATEONLY, // Hanya tanggal
        allowNull: false
    },
    hak_cuti: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sisa_hutang: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aktif: {
        type: DataTypes.BOOLEAN, // tinyint(1) sering dipetakan ke BOOLEAN
        allowNull: false, // 'Tak Ternilai' = Tidak
        defaultValue: false // Berdasarkan kolom 'Bawaan' (0), dan asumsi 0 = false/tidak aktif
        // Komentar '0 aktif 1 non' mungkin perlu diklarifikasi,
        // jika 0 berarti aktif, ubah defaultValue jadi true.
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: "0000-00-00 00:00:00"
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default PersCutiKaryawan;
import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersCutiKaryawanDt = db.define('pers_cutikaryawandt', {
    id_cuti: {
        type: DataTypes.STRING(100),
        primaryKey: true, // Menandakan ini adalah primary key
        allowNull: false
    },
    no_transaksi: {
        type: DataTypes.INTEGER, // Panjang (5) biasanya untuk display, tipe dasarnya INTEGER
        allowNull: false
    },
    id_transaksi: {
        type: DataTypes.STRING(25),
        allowNull: false
        // unique: true // Tambahkan jika kolom ini harus unik
    },
    tanggal_mulai: {
        type: DataTypes.DATEONLY, // Hanya menyimpan tanggal (tanpa waktu)
        allowNull: false
    },
    tanggal_berakhir: {
        type: DataTypes.DATEONLY, // Hanya menyimpan tanggal (tanpa waktu)
        allowNull: false
    },
    total_hari: {
        type: DataTypes.INTEGER, // Panjang (3) biasanya untuk display
        allowNull: false
    },
    tipe_cuti: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    alasan: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    alamat_cuti: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    approval: {
        type: DataTypes.STRING(10),
        allowNull: false
        // Anda mungkin ingin menambahkan validasi di sini berdasarkan komentar:
        // validate: {
        //   isIn: [['0', 'full 1', 'atasan 2', 'pengajuan 3', 'Reject']]
        // }
    },
    pic: {
        type: DataTypes.INTEGER.UNSIGNED, // Menangani atribut UNSIGNED
        allowNull: true // 'Tak Ternilai' = Ya, artinya boleh NULL
        // ZEROFILL adalah properti display MySQL, tidak secara langsung di-handle Sequelize
    },
    atasan: {
        type: DataTypes.INTEGER.UNSIGNED, // Menangani atribut UNSIGNED
        allowNull: false // 'Tak Ternilai' = Tidak, artinya tidak boleh NULL
    },
    no_telepon: {
        type: DataTypes.STRING(20),
        allowNull: false
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

export default PersCutiKaryawanDt;
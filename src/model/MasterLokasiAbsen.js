import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const MasterLokasiAbsen = db.define('master_lokasi_absen', {
    id_map: {
        type: DataTypes.INTEGER(11), // Ukuran dalam kurung opsional untuk INTEGER di banyak database
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unsigned: true // Untuk properti UNSIGNED
        // Zerofill adalah properti tampilan dan biasanya tidak diwakili dalam tipe data Sequelize
    },
    nama_lokasi: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    radius: {
        type: DataTypes.INTEGER(25), // Ukuran dalam kurung opsional
        allowNull: false
    },
    tikor: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default MasterLokasiAbsen;
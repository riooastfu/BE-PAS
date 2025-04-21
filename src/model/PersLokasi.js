import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersLokasi = db.define('pers_lokasi', {
    kode: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false,
        collate: 'latin1_swedish_ci'
    },
    lokasi: {
        type: DataTypes.STRING(55),
        allowNull: true,
        collate: 'latin1_swedish_ci'
    },
    aktif: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1
    },
    no_urut: {
        type: DataTypes.INTEGER(2),
        allowNull: true
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
    charset: 'latin1',
    collate: 'latin1_swedish_ci'
});

export default PersLokasi;
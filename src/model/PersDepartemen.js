import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersDepartemen = db.define('pers_departemen', {
    kode: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        collate: 'latin1_swedish_ci'
    },
    desc: {
        type: DataTypes.STRING(100),
        allowNull: true,
        collate: 'latin1_swedish_ci'
    },
    level: {
        type: DataTypes.INTEGER(2),
        allowNull: true,
        defaultValue: 0
    },
    parent: {
        type: DataTypes.STRING(10),
        allowNull: true,
        collate: 'latin1_swedish_ci'
    },
    pic: {
        type: DataTypes.STRING(10),
        allowNull: true,
        collate: 'latin1_swedish_ci'
    },
    pt: {
        type: DataTypes.STRING(20),
        allowNull: true,
        collate: 'latin1_swedish_ci'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: "0000-00-00 00:00:00"
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

export default PersDepartemen;
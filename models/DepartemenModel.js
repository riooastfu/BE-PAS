import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Departemen = db.define('pers_departemen', {
    kode: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    desc: {
        type: DataTypes.STRING(100)
    },
    level: {
        type: DataTypes.INTEGER(2)
    },
    parent: {
        type: DataTypes.STRING(10)
    },
    pt: {
        type: DataTypes.STRING(50)
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

export default Departemen;
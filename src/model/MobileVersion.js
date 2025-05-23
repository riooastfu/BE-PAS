import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const MobileVersion = db.define(
    "mobile_version",
    {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        version: {
            type: DataTypes.TEXT,
            allowNull: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
        force_update: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
        platform: {
            type: DataTypes.TEXT,
            allowNull: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
export default MobileVersion;

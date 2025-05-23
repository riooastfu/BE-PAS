import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const UserLog = db.define(
    "user_log",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        namauser: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        menuid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        notransaksi: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        keterangan: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
export default UserLog;

import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    namauser: {
        type: DataTypes.STRING(45),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(45)
    },
    hak: {
        type: DataTypes.INTEGER(10).UNSIGNED
    },
    karyawanid: {
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL
    },
    status: {
        type: DataTypes.TINYINT(4).UNSIGNED
    },
    logged: {
        type: DataTypes.TINYINT(4).UNSIGNED
    },
    lastip: {
        type: DataTypes.STRING(15)
    },
    lastcomp: {
        type: DataTypes.STRING(40)
    },
    created_by: {
        type: DataTypes.STRING(30)
    },
    id_role: {
        type: DataTypes.INTEGER(11)
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

export default Users;
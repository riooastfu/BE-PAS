import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import PersDataKaryawan from "./PersDataKaryawan.js";
import AuthRoleHt from "./AuthRoleHt.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "user",
  {
    namauser: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      primaryKey: true,
      allowNull: false,
    },

    // Authentication
    password: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Foreign keys and references
    hak: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: 100,
      comment: "sama dengan golongan pada table karyawan",
    },
    karyawanid: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: true,
    },

    // Status fields
    status: {
      type: DataTypes.TINYINT(4).UNSIGNED,
      allowNull: true,
      defaultValue: 0,
      comment: "aktif atau tidaknya satu user",
    },
    logged: {
      type: DataTypes.TINYINT(4).UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },

    // IP and computer identification
    lastip: {
      type: DataTypes.STRING(15),
      collate: "latin1_swedish_ci",
      allowNull: true,
      defaultValue: "0.0.0.0",
    },
    lastcomp: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
      defaultValue: "-",
    },

    created_by: {
      type: DataTypes.STRING(30),
      collate: "latin1_swedish_ci",
      allowNull: true,
      defaultValue: "-",
    },

    password_changed_at: {
      type: DataTypes.DATE,
      allowNull: false
    },

    id_role: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    charset: "latin1",
    collate: "latin1_swedish_ci",
  }
);

PersDataKaryawan.hasOne(Users);
AuthRoleHt.hasOne(Users);
Users.belongsTo(PersDataKaryawan, { foreignKey: "karyawanid" });
Users.belongsTo(AuthRoleHt, { foreignKey: "id_role" });

export default Users;

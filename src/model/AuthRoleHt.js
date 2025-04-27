import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const AuthRoleHt = db.define(
  "auth_roleht",
  {
    id_role: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama_role: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(100),
      allowNull: true, // Sesuai dengan Tak Bernilai 'Ya'
    },
    created_by: {
      type: DataTypes.STRING(45),
      allowNull: true, // Sesuai dengan Tak Bernilai 'Ya'
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default AuthRoleHt;

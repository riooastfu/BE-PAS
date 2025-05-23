import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersCutiKaryawan = db.define(
  "pers_cutikaryawan",
  {
    id_cuti: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    periode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nik: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    tanggal_berlaku: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggal_berakhir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hak_cuti: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sisa_hutang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aktif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default PersCutiKaryawan;

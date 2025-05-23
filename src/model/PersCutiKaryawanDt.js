import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import PersCutiKaryawan from "./PersCutiKaryawan.js";

const { DataTypes } = Sequelize;

const PersCutiKaryawanDt = db.define(
  "pers_cutikaryawandt",
  {
    id_cuti: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    no_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_transaksi: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    tanggal_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggal_berakhir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_hari: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe_cuti: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    alasan: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    alamat_cuti: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    approval: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pic: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    atasan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    no_telepon: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

PersCutiKaryawan.hasMany(PersCutiKaryawanDt, {
  foreignKey: "id_cuti",
  sourceKey: "id_cuti",
});
PersCutiKaryawanDt.belongsTo(PersCutiKaryawan, {
  foreignKey: "id_cuti",
  targetKey: "id_cuti"
});

export default PersCutiKaryawanDt;

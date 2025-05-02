import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import PersDataLaporanKesehatan from "./PersDataLaporanKesehatan.js";

const { DataTypes } = Sequelize;

const PersDataLaporanHarian = db.define(
  "pers_datalaporan_harian",
  {
    nik: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      primaryKey: true,
    },
    no_urut: {
      type: DataTypes.INTEGER(4),
      primaryKey: true,
    },
    id_laporan: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    nik_kantor: {
      type: DataTypes.STRING(20),
    },
    nama_karyawan: {
      type: DataTypes.STRING(100),
    },
    jabatan_karyawan: {
      type: DataTypes.STRING(40),
    },
    dept_karyawan: {
      type: DataTypes.STRING(40),
    },
    uraian_kegiatan: {
      type: DataTypes.TEXT,
    },
    target_harian: {
      type: DataTypes.TEXT,
    },
    pt: {
      type: DataTypes.STRING(255),
    },
    kategori: {
      type: DataTypes.STRING(255),
    },
    lokasi_kerja: {
      type: DataTypes.STRING(40),
    },
    atasan_langsung: {
      type: DataTypes.INTEGER(10),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

PersDataLaporanKesehatan.hasMany(PersDataLaporanHarian, {
  foreignKey: "id_laporan",
  sourceKey: "id_laporan",
});
PersDataLaporanHarian.belongsTo(PersDataLaporanKesehatan);


export default PersDataLaporanHarian;

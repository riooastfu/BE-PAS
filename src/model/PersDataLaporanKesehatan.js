import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import PersDataLaporanHarian from "./PersDataLaporanHarian.js";

const { DataTypes } = Sequelize;

const PersDataLaporanKesehatan = db.define(
  "pers_datalaporan_kesehatan",
  {
    id_laporan: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    nik: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      primaryKey: true,
    },
    nik_kantor: {
      type: DataTypes.STRING(20),
    },
    tanggal: {
      type: DataTypes.DATEONLY,
    },
    jam_masuk: {
      type: DataTypes.TIME,
    },
    jam_pulang: {
      type: DataTypes.TIME,
    },
    status_kerja: {
      type: DataTypes.STRING(40),
    },
    kesehatan_tanggal: {
      type: DataTypes.DATEONLY,
    },
    kesehatan_nama: {
      type: DataTypes.STRING(40),
    },
    kesehatan_dept: {
      type: DataTypes.STRING(40),
    },
    kesehatan_jabatan: {
      type: DataTypes.STRING(40),
    },
    kesehatan_pt: {
      type: DataTypes.STRING(40),
    },
    kesehatan_suhu: {
      type: DataTypes.DOUBLE,
    },
    kesehatan_keluarga: {
      type: DataTypes.STRING(40),
    },
    kesehatan_kontak: {
      type: DataTypes.STRING(40),
    },
    kesehatan_resiko: {
      type: DataTypes.STRING(40),
    },
    kesehatan_pagi: {
      type: DataTypes.STRING(40),
    },
    kesehatan_malam: {
      type: DataTypes.STRING(40),
    },
    kesehatan_berobat: {
      type: DataTypes.STRING(40),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default PersDataLaporanKesehatan;

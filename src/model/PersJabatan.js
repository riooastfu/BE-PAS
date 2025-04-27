import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersJabatan = db.define(
  "pers_jabatan",
  {
    kode: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,
      collate: "latin1_swedish_ci",
    },
    desc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: "latin1_swedish_ci",
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

export default PersJabatan;

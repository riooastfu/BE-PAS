import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const { DataTypes } = Sequelize;

const PersPt = db.define(
  "pers_pt",
  {
    kode: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
      collate: "latin1_swedish_ci",
    },
    no_urut: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    nama_pt: {
      type: DataTypes.STRING(50),
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

export default PersPt;

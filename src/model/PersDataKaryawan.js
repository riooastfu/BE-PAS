import { Sequelize } from "sequelize";
import { db } from "../config/database.js";
import PersLokasiModel from "./PersLokasi.js";
import PersPtModel from "./PersPt.js";
import PersDepartemenModel from "./PersDepartemen.js";
import PersJabatanModel from "./PersJabatan.js";
import UsersModel from "./Users.js";

const { DataTypes } = Sequelize;

const PersDataKaryawan = db.define(
  "pers_datakaryawan",
  {
    nik: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      primaryKey: true,
      allowNull: false,
    },

    // Informasi identitas karyawan
    nik_karyawan: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    nik_kantor: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    no_urut: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
    nama_karyawan: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    nama_panggilan: {
      type: DataTypes.STRING(7),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    tempat_lahir: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "0000-00-00",
    },
    shio: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    elemen: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    sifat: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    suku: {
      type: DataTypes.STRING(12),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    alamat: {
      type: DataTypes.TEXT,
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("L", "P"),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    agama: {
      type: DataTypes.STRING(25),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    golongan_darah: {
      type: DataTypes.STRING(3),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    berat_tinggi_badan: {
      type: DataTypes.STRING(25),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    berat_badan: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    status_pajak: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    status_pernikahan: {
      type: DataTypes.STRING(15),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi kontak
    no_telepon: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    telpon_rumah: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    emergency_contact: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    emergency_name: {
      type: DataTypes.STRING(50),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    email_pribadi: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    email_kantor: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi kepegawaian
    tanggal_masuk: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "0000-00-00",
    },
    tanggal_keluar: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "0000-00-00",
    },
    id_finger: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      defaultValue: 0,
    },

    // Informasi dokumen
    ktp_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    ktp_nama: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    ktp_alamat: {
      type: DataTypes.TEXT,
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    jenis_sim: {
      type: DataTypes.STRING(5),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    sim_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Timestamps
    // updated_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: "0000-00-00 00:00:00",
    // },
    // created_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: "0000-00-00 00:00:00",
    // },

    // Informasi dokumen tambahan
    npwp_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    npwp_nama: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    npwp_alamat: {
      type: DataTypes.TEXT,
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    jms_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    jms_nama: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    bpjs_kk: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    bpjs_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    rek_nomer: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    rek_bank: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    rek_an: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi jabatan dan posisi
    poh: {
      type: DataTypes.STRING(45),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    pangkat: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    jabatan: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    golongan: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    tipe: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    departemen: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    perusahaan: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    lokasi: {
      type: DataTypes.STRING(10),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi tambahan
    asuransi: {
      type: DataTypes.STRING(20),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    koordinat_rumah: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    tanda_lahir: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    status_rumah: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi kontak darurat tambahan
    emer_nama_panggilan: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    emergency_relation: {
      type: DataTypes.STRING(40),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    emergency_alamat: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    emer_alamat_kerja: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },

    // Informasi pekerjaan
    job_deskripsi: {
      type: DataTypes.STRING(100),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    atasan_langsung: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: true,
      defaultValue: "0000000000",
    },
    approve: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
    },
    control_1: {
      type: DataTypes.ENUM("yes", "no", ""),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    control_2: {
      type: DataTypes.ENUM("yes", "no", ""),
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    flag_pt: {
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

PersDataKaryawan.belongsTo(PersJabatanModel, {
  foreignKey: "jabatan",
});

PersDataKaryawan.belongsTo(PersDepartemenModel, {
  foreignKey: "departemen",
});

PersDataKaryawan.belongsTo(PersPtModel, {
  foreignKey: "perusahaan",
});

PersDataKaryawan.belongsTo(PersLokasiModel, {
  foreignKey: "lokasi",
});

export default PersDataKaryawan;

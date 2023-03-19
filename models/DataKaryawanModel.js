import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataUser = db.define('pers_datakaryawan',{
    nik:{
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
        primaryKey: true
    },
    nik_karyawan:{
        type: DataTypes.STRING(10)
    },
    nik_kantor:{
        type: DataTypes.STRING(20)
    },
    no_urut:{
        type: DataTypes.INTEGER(4)
    },
    nama_karyawan:{
        type: DataTypes.STRING(100)
    },
    nama_panggilan: {
        type: DataTypes.STRING(7)
    },
    tempat_lahir:{
        type: DataTypes.STRING(100)
    },
    tanggal_lahir:{
        type: DataTypes.DATEONLY
    },
    shio:{
        type: DataTypes.STRING(20)
    },
    elemen:{
        type: DataTypes.STRING(20)
    },
    sifat:{
        type: DataTypes.STRING(20)
    },
    suku:{
        type: DataTypes.STRING(12)
    },
    alamat:{
        type: DataTypes.TEXT
    },
    jenis_kelamin:{
        type: DataTypes.ENUM('L','P')
    },
    agama:{
        type: DataTypes.STRING(25)
    },
    golongan_darah:{
        type: DataTypes.STRING(3)
    },
    berat_tinggi_badan:{
        type: DataTypes.STRING(25)
    },
    berat_badan:{
        type: DataTypes.INTEGER(3)
    },
    status_pajak:{
        type: DataTypes.STRING(10)
    },
    status_pernikahan:{
        type: DataTypes.STRING(15)
    },
    no_telepon:{
        type: DataTypes.STRING(45)
    },
    telpon_rumah:{
        type: DataTypes.STRING(40)
    },
    emergency_contact:{
        type: DataTypes.STRING(20)
    },
    emergency_name:{
        type: DataTypes.STRING(50)
    },
    email_pribadi:{
        type: DataTypes.STRING(45)
    },
    email_kantor:{
        type: DataTypes.STRING(45)
    },
    tanggal_masuk:{
        type: DataTypes.DATEONLY
    },
    tanggal_keluar:{
        type: DataTypes.DATEONLY
    },
    id_finger:{
        type: DataTypes.INTEGER(3)
    },
    ktp_nomer:{
        type: DataTypes.STRING(20)
    },
    ktp_nama:{
        type: DataTypes.STRING(100)
    },
    ktp_alamat:{
        type: DataTypes.TEXT
    },
    jenis_sim:{
        type: DataTypes.STRING(5)
    },
    sim_nomer:{
        type: DataTypes.STRING(20)
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    npwp_nomer:{
        type: DataTypes.STRING(20)
    },
    npwp_nama:{
        type: DataTypes.STRING(45)
    },
    npwp_alamat:{
        type: DataTypes.TEXT
    },
    jms_nomer:{
        type: DataTypes.STRING(20)
    },
    jms_nama:{
        type: DataTypes.STRING(45)
    },
    bpjs_kk:{
        type: DataTypes.STRING(20)
    },
    bpjs_nomer:{
        type: DataTypes.STRING(20)
    },
    rek_nomer:{
        type: DataTypes.STRING(20)
    },
    rek_bank:{
        type: DataTypes.STRING(20)
    },
    rek_an:{
        type: DataTypes.STRING(45)
    },
    poh:{
        type: DataTypes.STRING(45)
    },
    pangkat:{
        type: DataTypes.STRING(10)
    },
    jabatan:{
        type: DataTypes.STRING(10)
    },
    golongan:{
        type: DataTypes.STRING(10)
    },
    tipe:{
        type: DataTypes.STRING(10)
    },
    status:{
        type: DataTypes.STRING(10)
    },
    departemen:{
        type: DataTypes.STRING(10)
    },
    perusahaan:{
        type: DataTypes.STRING(10)
    },
    lokasi:{
        type: DataTypes.STRING(10)
    },
    asuransi:{
        type: DataTypes.STRING(20)
    },
    koordinat_rumah:{
        type: DataTypes.STRING(100)
    },
    tanda_lahir:{
        type: DataTypes.STRING(40)
    },
    status_rumah:{
        type: DataTypes.STRING(40)
    },
    emer_nama_panggilan:{
        type: DataTypes.STRING(40)
    },
    emergency_relation:{
        type: DataTypes.STRING(40)
    },
    emergency_alamat:{
        type: DataTypes.STRING(100)
    },
    emer_alamat_kerja:{
        type: DataTypes.STRING(100)
    },
    job_deskripsi:{
        type: DataTypes.STRING(100)
    },
    atasan_langsung:{
        type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL
    },
    approve:{
        type: DataTypes.TINYINT(1)
    },
    control_1:{
        type: DataTypes.ENUM('yes','no',",")
    },
    control_2:{
        type: DataTypes.ENUM('yes','no',",")
    },
    flag_pt:{
        type: DataTypes.INTEGER(11)
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

export default DataUser;
import Users from "../models/UserModel.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const getStatus = async (req, res) => {
    try {
        const status = [{
            "status": "Database Connected.",
            "msg": "Successfully hit API!!!"
        }]
        res.json(status);
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['namauser', 'password', 'karyawanid']
        });
        res.json(users);
    } catch (error) {
        console.log("Error: ", error);
    }
}

// export const Login = async (req, res) => {
//     const JWT_SECRETTOKEN = process.env.JWT_SECRET;
//     try {
//         // const user = await Users.findAll({
//         //     where: {
//         //         namauser: req.body.namauser
//         //     }
//         // });

//         const user = await Users.sequelize.query(`SELECT user.namauser,jabatan, pt, departemen, nik_kantor, nik, golongan, nama_karyawan, pers_datakaryawan.status,pers_departemen.desc as Departemen, pers_jabatan.desc as Jabatan, pers_lokasi.lokasi as Lokasi, pers_pt.nama_pt as PT FROM pers_datakaryawan LEFT JOIN pers_departemen ON pers_datakaryawan.departemen = pers_departemen.kode LEFT JOIN pers_jabatan ON pers_datakaryawan.jabatan = pers_jabatan.kode LEFT JOIN pers_lokasi ON pers_datakaryawan.lokasi = pers_lokasi.kode LEFT JOIN pers_pt ON pers_datakaryawan.perusahaan = pers_pt.kode LEFT JOIN user ON pers_datakaryawan.nik = user.karyawanid WHERE user.namauser = '${req.body.namauser}'`)
//         const password = req.body.password;
//         const hashPassword = crypto.createHash('md5').update(password).digest('hex');

//         if (hashPassword == user[0].password) {

//             //Pembuatan Token saat Login == sukses
//             const token = jwt.sign({
//                 namauser: user[0].namauser,
//                 id: user[0].karyawanid
//             }, JWT_SECRETTOKEN, (err, token) => {
//                 res.status(200).json({
//                     status: "Success",
//                     msg: "Login sukses.",
//                     token: token,
//                     namauser: user[0].namauser,
//                     karyawanid: user[0].karyawanid
//                 })
//             });


//         }
//         else {
//             res.status(400).json({ msg: "*Password Salah!" });
//         }
//     } catch (error) {
//         res.status(404).json({ msg: "*Username tidak ditemukan!" })
//     }
// }

export const Login = async (req, res) => {
    const JWT_SECRETTOKEN = process.env.JWT_SECRET;
    try {
        const user = await Users.sequelize.query(`SELECT user.namauser, user.password, user.karyawanid,jabatan, pt, departemen, nik_kantor, golongan, nama_karyawan, pers_datakaryawan.status,pers_departemen.desc as Departemen, pers_jabatan.desc as Jabatan, pers_lokasi.lokasi as Lokasi, pers_pt.nama_pt as PT FROM pers_datakaryawan LEFT JOIN pers_departemen ON pers_datakaryawan.departemen = pers_departemen.kode LEFT JOIN pers_jabatan ON pers_datakaryawan.jabatan = pers_jabatan.kode LEFT JOIN pers_lokasi ON pers_datakaryawan.lokasi = pers_lokasi.kode LEFT JOIN pers_pt ON pers_datakaryawan.perusahaan = pers_pt.kode LEFT JOIN user ON pers_datakaryawan.nik = user.karyawanid WHERE user.namauser = '${req.body.namauser}'`)
        const password = req.body.password;
        const hashPassword = crypto.createHash('md5').update(password).digest('hex');

        if (hashPassword == user[0][0].password) {

            //Pembuatan Token saat Login == sukses
            const token = jwt.sign({
                namauser: user[0][0].namauser,
                id: user[0][0].karyawanid
            }, JWT_SECRETTOKEN, (err, token) => {
                res.status(200).json({
                    status: "Success",
                    msg: "Login sukses.",
                    token: token,
                    namauser: user[0][0].namauser,
                    karyawanid: user[0][0].karyawanid,
                    nik_kantor: user[0][0].nik_kantor,
                    nama_karyawan: user[0][0].nama_karyawan,
                    jabatan: user[0][0].jabatan,
                    departemen: user[0][0].departemen,
                    pt: user[0][0].pt,
                })
            });


        }
        else {
            res.status(400).json({ msg: "*Password Salah!" });
        }
    } catch (error) {
        res.status(404).json({ msg: "*Username tidak ditemukan!" })
    }
}
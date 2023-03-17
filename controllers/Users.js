import Users from "../models/UserModel.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['namauser', 'password']
        });
        res.json(users);
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const Login = async (req, res) => {
    const JWT_SECRETTOKEN = process.env.JWT_SECRET;
    try {
        const user = await Users.findAll({
            where: {
                namauser: req.body.namauser
            }
        });

        const password = req.body.password;
        const hashPassword = crypto.createHash('md5').update(password).digest('hex');

        if (hashPassword == user[0].password) {

            //Pembuatan Token saat Login == sukses
            const token = jwt.sign({
                namauser: user[0].namauser,
                id: user[0].karyawanid
            }, JWT_SECRETTOKEN, (err, token) => {
                res.status(200).json({
                    status: "Success",
                    msg: "Login sukses.",
                    token: token,
                    namauser: user[0].namauser
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
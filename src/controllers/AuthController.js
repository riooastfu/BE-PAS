import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import Users from "../model/Users.js";
import PersDataKaryawanModel from "../model/PersDataKaryawan.js";
import PersDepartemenModel from "../model/PersDepartemen.js";
import PersJabatanModel from "../model/PersJabatan.js";
import PersLokasiModel from "../model/PersLokasi.js";
import PersPtModel from "../model/PersPt.js";
import Pegawai from '../model/Pegawai.js';
import { AppError } from '../utils/errorHandler.js';
import RefreshToken from '../model/RefreshToken.js';
import { Op } from 'sequelize';
import AuthRoleHt from '../model/AuthRoleHt.js';

// Fungsi untuk membuat access token
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fungsi untuk membuat refresh token
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '14d' });
};

// Simpan refresh token ke database
const saveRefreshToken = async (token, karyawanid) => {
    // Atur masa berlaku token untuk dua minggu dari sekarang
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);

    // Hapus token lama untuk user yang sama untuk mencegah penumpukan token
    await RefreshToken.destroy({ where: { karyawanid: karyawanid } });

    // Simpan token baru
    return await RefreshToken.create({
        token,
        karyawanid: karyawanid,
        expires_at: expiresAt
    });
};

export const Login = async (req, res, next) => {
    const JWT_SECRETTOKEN = process.env.JWT_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!JWT_SECRETTOKEN || !REFRESH_TOKEN_SECRET) {
        return next(new AppError('Konfigurasi server tidak lengkap (JWT Secret missing).', 500, 'JWT_SECRET_MISSING'));
    }

    try {
        const { namauser, password } = req.body;
        if (!namauser || !password) {
            return next(new AppError('Nama user dan password dibutuhkan.', 400, 'MISSING_CREDENTIALS'));
        }

        const foundUser = await Users.findOne({
            where: { namauser: namauser },
            include: [
                {
                    model: PersDataKaryawanModel,
                    attributes: [
                        'nik_kantor', 'nama_karyawan', 'status', 'golongan'
                    ],
                    include: [
                        { model: PersJabatanModel, attributes: ['kode'] },
                        { model: PersDepartemenModel, attributes: ['kode'] },
                        { model: PersPtModel, attributes: ['kode'] },
                        { model: PersLokasiModel, attributes: ['kode'] },
                    ]
                },
                {
                    model: AuthRoleHt,
                    attributes: [
                        'id_role', 'nama_role'
                    ]
                }
            ],
            attributes: ['namauser', 'password', 'karyawanid']
        });

        const hashPassword = crypto.createHash('md5').update(password).digest('hex');
        const isPasswordCorrect = foundUser ? hashPassword == foundUser.password : false;

        if (!foundUser || !isPasswordCorrect) {
            return next(new AppError('Username atau password salah.', 401, 'INVALID_CREDENTIALS'));
        }

        const userPin = await Pegawai.findOne({
            where: { pegawai_nip: foundUser.pers_datakaryawan?.nik_kantor },
            attributes: ['pegawai_pin']
        })

        if (!userPin) {
            return next(new AppError('Pin absensi belum terdaftar.', 404, 'PIN_NOT_FOUND'));
        }

        // Payload untuk token
        const payload = {
            id: foundUser.karyawanid,
            id_role: foundUser.auth_roleht?.id_role,
            namauser: foundUser.namauser
        };

        // Generate tokens
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Simpan refresh token ke database
        await saveRefreshToken(refreshToken, foundUser.karyawanid);

        // Data user untuk response
        const userDataForResponse = {
            namauser: foundUser.namauser,
            karyawanid: foundUser.karyawanid,
            nik_kantor: foundUser.pers_datakaryawan?.nik_kantor,
            pin_absen: userPin.pegawai_pin,
            nama_karyawan: foundUser.pers_datakaryawan?.nama_karyawan,
            id_role: foundUser.auth_roleht?.id_role,
            jabatan: foundUser.pers_datakaryawan?.pers_jabatan?.desc,
            departemen: foundUser.pers_datakaryawan?.pers_departemen?.desc,
            pt: foundUser.pers_datakaryawan?.pers_pt?.nama_pt,
            lokasi: foundUser.pers_datakaryawan?.pers_lokasi?.lokasi,
            status: foundUser.pers_datakaryawan?.status,
            golongan: foundUser.pers_datakaryawan?.golongan
        };

        // Kirim tokens dan data user
        res.success(
            {
                accessToken,
                refreshToken,
                user: userDataForResponse
            },
            'Login berhasil.'
        );
    } catch (error) {
        next(error);
    }
};

export const refreshAccessToken = async (req, res, next) => {
    try {
        // verifyRefreshToken middleware sudah memeriksa validitas token
        // dan menambahkan data user ke req.user

        // Generate token baru
        const payload = {
            id: req.user.id,
            id_role: req.user.id_role,
            namauser: req.user.namauser
        };

        const newAccessToken = generateAccessToken(payload);

        // Update terakhir digunakan pada refresh token
        await RefreshToken.update(
            { updated_at: new Date() },
            { where: { token: req.refreshToken } }
        );

        res.success({ accessToken: newAccessToken }, 'Token berhasil diperbarui');
    } catch (error) {
        next(error);
    }
};

export const Logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AppError('Refresh token dibutuhkan', 400, 'REFRESH_TOKEN_REQUIRED'));
        }

        // Hapus refresh token dari database
        const deleted = await RefreshToken.destroy({ where: { token: refreshToken } });

        if (deleted === 0) {
            return res.success({}, 'Logout berhasil, tapi token tidak ditemukan');
        }

        res.success({}, 'Logout berhasil');
    } catch (error) {
        next(error);
    }
};

// Fungsi untuk membersihkan token kedaluwarsa
export const cleanupExpiredTokens = async () => {
    try {
        const now = new Date();
        await RefreshToken.destroy({
            where: {
                expires_at: { [Op.lt]: now }
            }
        });
        console.log('Expired tokens cleaned up');
    } catch (error) {
        console.error('Error cleaning up expired tokens:', error);
    }
};
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


export const Login = async (req, res, next) => {
    const JWT_SECRETTOKEN = process.env.JWT_SECRET;
    if (!JWT_SECRETTOKEN) {
        // Error jika secret key tidak ada, penting untuk JWT
        return next(new AppError('Konfigurasi server tidak lengkap (JWT Secret missing).', 500, 'JWT_SECRET_MISSING'));
    }

    try {
        const { namauser, password } = req.body;
        if (!namauser || !password) {
            return next(new AppError('Nama user dan password dibutuhkan.', 400, 'MISSING_CREDENTIALS'));
        }
        // TODO: Pertimbangkan validasi format/panjang jika perlu

        const foundUser = await Users.findOne({
            where: { namauser: namauser },
            // Gunakan 'include' untuk mengambil data terkait (pengganti JOIN)
            // Anda perlu mendefinisikan asosiasi (relations) antar model di Sequelize agar 'include' berfungsi
            include: [
                {
                    model: PersDataKaryawanModel, // Asumsi 'Users' berelasi dengan 'PersDataKaryawan' via 'karyawanid'
                    attributes: [ // Pilih kolom yang dibutuhkan dari PersDataKaryawan
                        'nik_kantor', 'nama_karyawan', 'status', 'golongan'
                        // 'jabatan', 'departemen', 'lokasi', 'perusahaan' // Ini adalah foreign key, kita ambil data terkait di bawah
                    ],
                    include: [ // Include data dari tabel yang berelasi dengan PersDataKaryawan
                        { model: PersJabatanModel, attributes: ['desc'] },
                        { model: PersDepartemenModel, attributes: ['desc'] },
                        { model: PersPtModel, attributes: ['nama_pt'] },
                        { model: PersLokasiModel, attributes: ['lokasi'] }
                    ]
                }
            ],
            attributes: ['namauser', 'password', 'karyawanid']
        });

        // --- Cek User & Password ---
        // 1. Cek apakah user ditemukan
        // 2. **PENTING**: Bandingkan password daro foundUser dengan password hasil crypt

        const hashPassword = crypto.createHash('md5').update(password).digest('hex');
        const isPasswordCorrect = foundUser ? hashPassword == foundUser.password : false;

        if (!foundUser || !isPasswordCorrect) {
            // **PENTING**: Jangan beri tahu apakah username atau password yang salah.
            // Berikan pesan error generik untuk mencegah user enumeration attack.
            // Gunakan status 401 Unauthorized.
            return next(new AppError('Username atau password salah.', 401, 'INVALID_CREDENTIALS'));
        }

        // --- Ambil PIN Absen karyawan dari db fingerspot [fin pro] ---
        const userPin = await Pegawai.findOne({
            where: { pegawai_nip: foundUser.pers_datakaryawan?.nik_kantor },
            attributes: ['pegawai_pin']
        })

        if (!userPin) {
            return next(new AppError('Pin absensi belum terdaftar.', 404, 'PIN_NOT_FOUND'));
        }

        if (!foundUser || !isPasswordCorrect) {
            // **PENTING**: Jangan beri tahu apakah username atau password yang salah.
            // Berikan pesan error generik untuk mencegah user enumeration attack.
            // Gunakan status 401 Unauthorized.
            return next(new AppError('Username atau password salah.', 401, 'INVALID_CREDENTIALS'));
        }

        // --- Jika Kredensial Benar ---
        // Data user yang akan dimasukkan ke dalam token JWT (payload)
        // Jaga agar payload tetap kecil, hanya berisi info esensial (misal ID user, role)
        const payload = {
            id: foundUser.karyawanid, // atau ID unik user jika berbeda
            namauser: foundUser.namauser
            // Tambahkan role atau info penting lain jika perlu, tapi hindari data sensitif
        };

        // Buat token JWT (gunakan versi sinkron karena kita dalam async function)
        const token = jwt.sign(payload, JWT_SECRETTOKEN);

        // --- Siapkan data user untuk response (pilih data yang relevan & tidak sensitif) ---
        // Akses data dari 'foundUser' dan relasinya yang di-include
        const userDataForResponse = {
            namauser: foundUser.namauser,
            karyawanid: foundUser.karyawanid,
            nik_kantor: foundUser.pers_datakaryawan?.nik_kantor, // Gunakan optional chaining (?) jika relasi mungkin null
            pin_absen: userPin.pegawai_pin,
            nama_karyawan: foundUser.pers_datakaryawan?.nama_karyawan,
            jabatan: foundUser.pers_datakaryawan?.pers_jabatan?.desc,
            departemen: foundUser.pers_datakaryawan?.pers_departemen?.desc,
            pt: foundUser.pers_datakaryawan?.pers_pt?.nama_pt,
            lokasi: foundUser.pers_datakaryawan?.pers_lokasi?.lokasi,
            status: foundUser.pers_datakaryawan?.status,
            golongan: foundUser.pers_datakaryawan?.golongan
            // Hati-hati memilih data yang dikirim ke client
        };

        // --- Response Sukses ---
        // Gunakan res.success (200 OK)
        res.success(
            { token, user: userDataForResponse }, // Kirim token dan data user yang relevan
            'Login berhasil.'
        );
    } catch (error) {
        // --- Penanganan Error ---
        // Teruskan semua jenis error (database, logic, dll) ke globalErrorHandler
        next(error);
    }
}
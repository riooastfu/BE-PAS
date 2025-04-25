import { AppError } from '../utils/errorHandler.js'; // Sesuaikan path jika perlu
import AttLog from '../model/AttLog.js';
import { col, fn } from 'sequelize';
import AuthRoleHt from '../model/AuthRoleHt.js';
import MasterLokasiAbsen from '../model/MasterLokasiAbsen.js';
import AuthMaps from '../model/AuthMaps.js';

export const absenCheckIn = async (req, res, next) => { // Tambahkan 'next'
    try {
        // --- Validasi Input ---
        // 1. Cek File Upload
        if (!req.file) {
            // Gunakan AppError untuk error operasional yang diketahui
            // 400 Bad Request lebih cocok daripada 422 jika hanya cek keberadaan
            return next(new AppError('Gambar bukti absen harus diunggah.', 400, 'IMAGE_REQUIRED'));
        }

        // 2. Cek Body lainnya
        const { pin, att_id, coordinate } = req.body;
        if (!pin || !att_id || !coordinate) {
            return next(new AppError('Data pin, att_id, dan coordinate dibutuhkan.', 400, 'MISSING_CHECKIN_DATA'));
        }
        // TODO: Pertimbangkan validasi yang lebih spesifik (misal format tanggal, tipe data) menggunakan express-validator

        // --- Logika Utama ---
        // Image url (konstruksi URL sebaiknya hati-hati, pertimbangkan base URL dari env)
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // --- Interaksi Database (Menggunakan Sequelize Model) ---
        // Hindari raw SQL sebisa mungkin untuk keamanan (SQL Injection) & memanfaatkan fitur ORM
        const newAbsenLog = await AttLog.create({
            // Kolom di model Anda: nilai dari request atau hardcoded
            sn: 'FIO66206019510289', // PERHATIAN: Hardcoded SN?
            scan_date: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
            pin: pin,
            verifymode: '20',        // PERHATIAN: Hardcoded verifymode?
            inoutmode: '1',         // PERHATIAN: Hardcoded inoutmode (1 = Check-in?)
            att_id: att_id,
            coordinate: coordinate,
            image: imageUrl         // Simpan URL atau hanya path/filename?
        });

        // --- Response Sukses ---
        // Gunakan helper dari responseHandler
        res.created(newAbsenLog, "Berhasil Check-in."); // Kirim data yang baru dibuat jika perlu

    } catch (error) {
        // --- Penanganan Error ---
        // Teruskan error ke globalErrorHandler
        next(error);
    }
};

export const absenCheckOut = async (req, res, next) => { // Tambahkan 'next'
    try {
        // --- Validasi Input ---
        const { pin, att_id, coordinate } = req.body;
        if (!pin || !att_id || !coordinate) {
            return next(new AppError('Data pin, att_id, dan coordinate dibutuhkan.', 400, 'MISSING_CHECKOUT_DATA'));
        }
        // TODO: Validasi lebih lanjut

        // --- Interaksi Database (Menggunakan Sequelize Model) ---
        const newAbsenLog = await AttLog.create({
            sn: 'FIO66206019510289', // PERHATIAN: Hardcoded SN?
            scan_date: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
            pin: pin,
            verifymode: '20',        // PERHATIAN: Hardcoded verifymode?
            inoutmode: '0',         // PERHATIAN: Hardcoded inoutmode (0 = Check-out?) - Sesuaikan jika berbeda
            att_id: att_id,
            coordinate: coordinate,
            // image: null // Tidak ada image saat checkout? Pastikan model mengizinkan null jika kolom ada
        });

        // --- Response Sukses ---
        res.created(newAbsenLog, "Berhasil Check-out.");

    } catch (error) {
        // --- Penanganan Error ---
        next(error);
    }
};

/**
 * Mengambil riwayat absen (9 hari terakhir) untuk NIP tertentu.
 */
export const getDataAbsenUser = async (req, res, next) => { // Tambahkan next
    try {
        const { pin } = req.params;

        // --- Validasi Input Dasar ---
        if (!pin) {
            return next(new AppError('PIN absen Pegawai dibutuhkan pada parameter URL.', 400, 'PIN_REQUIRED'));
        }

        // --- Query menggunakan Sequelize ORM ---
        const dataAbsen = await AttLog.findAll({
            where: {
                pin
            },
            attributes: [
                // Pilih kolom dari AttLog dan aliasnya
                'pin',
                // Gunakan sequelize.fn dan sequelize.col untuk fungsi SQL
                // Penting: Kualifikasi nama kolom dengan nama tabel jika ambigu (misal: 'att_log.scan_date')
                [fn('DATE', col('att_log.scan_date')), 'tgl_masuk'],
                [fn('MIN', fn('TIME', col('att_log.scan_date'))), 'jam_masuk'],
                [fn('MAX', fn('TIME', col('att_log.scan_date'))), 'jam_pulang'],
            ],
            group: [
                fn('DATE', col('att_log.scan_date')),
                'pin',
            ],
            // Urutkan berdasarkan tanggal (hasil fungsi DATE) secara descending
            order: [
                [fn('DATE', col('att_log.scan_date')), 'DESC']
            ],
            limit: 10, // Ambil 9 data hari terakhir
            // subQuery: false // Terkadang diperlukan untuk query LIMIT/OFFSET dengan include/grouping kompleks
            // raw: true, // Bisa ditambahkan jika hanya butuh plain object, bukan instance Sequelize
            // nest: true // Jika raw: true, ini akan mengelompokkan hasil include
        });

        // --- Response Sukses ---
        // dataAbsen akan berupa array, bisa kosong jika NIP tidak ada atau tidak punya log
        res.success(dataAbsen, 'Data absensi berhasil diambil.');

    } catch (error) {
        // --- Penanganan Error ---
        next(error); // Teruskan ke globalErrorHandler
    }
};

export const getRadiusAbsenByRole = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id_role) {
            return next(new AppError('Informasi pengguna atau peran tidak ditemukan.', 401, 'UNAUTHENTICATED_OR_ROLE_MISSING'));
        }

        const userRole = req.user.id_role;

        const maps = await AuthRoleHt.findAll({
            where: {
                id_role: userRole
            },
            include: [{
                model: MasterLokasiAbsen
            }]
        });

        res.success(maps, 'Data radius absen by role berhasil diambil.');
    } catch (error) {
        next(error);
    }
}
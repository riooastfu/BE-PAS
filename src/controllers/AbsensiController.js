import { AppError } from '../utils/errorHandler.js'; // Sesuaikan path jika perlu
import AttLog from '../model/AttLog.js';

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
        const { pin, att_id, scan_date, coordinate } = req.body;
        if (!pin || !att_id || !scan_date || !coordinate) {
            return next(new AppError('Data pin, att_id, scan_date, dan coordinate dibutuhkan.', 400, 'MISSING_CHECKIN_DATA'));
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
            scan_date: scan_date,
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
        const { pin, att_id, scan_date, coordinate } = req.body;
        if (!pin || !att_id || !scan_date || !coordinate) {
            return next(new AppError('Data pin, att_id, scan_date, dan coordinate dibutuhkan.', 400, 'MISSING_CHECKOUT_DATA'));
        }
        // TODO: Validasi lebih lanjut

        // --- Interaksi Database (Menggunakan Sequelize Model) ---
        const newAbsenLog = await AttLog.create({
            sn: 'FIO66206019510289', // PERHATIAN: Hardcoded SN?
            scan_date: scan_date,
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
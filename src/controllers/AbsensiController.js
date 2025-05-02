import { AppError } from '../utils/errorHandler.js'; // Sesuaikan path jika perlu
import AttLog from '../model/AttLog.js';
import { col, fn } from 'sequelize';
import AuthRoleHt from '../model/AuthRoleHt.js';
import MasterLokasiAbsen from '../model/MasterLokasiAbsen.js';
import moment from 'moment-timezone';
import { absenCheckSchema, validateImageFile } from '../schema/AbsensiSchema.js';
import AuthMaps from '../model/AuthMaps.js';
import { ensureUploadsDirectory } from '../config/image.js';
import path from 'path';
import sharp from 'sharp';

export const absenCheckIn = async (req, res, next) => { // Tambahkan 'next'
    try {
        await ensureUploadsDirectory();

        const file = validateImageFile(req.file);

        const validationResult = absenCheckSchema.safeParse(req.body);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            return next(
                new AppError(
                    "Data input tidak valid.",
                    422,
                    "VALIDATION_ERROR",
                    formattedErrors
                )
            );
        }

        const validatedData = validationResult.data;

        const timestamp = Date.now();
        const originalNameParts = file.originalname.split('.');
        const extension = originalNameParts.length > 1 ? `.${originalNameParts.pop()}` : '.jpg'; // Default to jpg if no extension
        const baseFilename = originalNameParts.join('.');
        const compressedFilename = `${timestamp}-${baseFilename}${extension}`; // Use a descriptive name
        const compressedPath = path.join('public', 'uploads', compressedFilename); // Full path to save

        await sharp(file.buffer) // Process the buffer directly
            .resize({ width: 1000 }) // Optional: Resize
            .jpeg({ quality: 75, mozjpeg: true }) // Compress JPEG
            .png({ compressionLevel: 8, quality: 75 }) // Compress PNG
            .toFile(compressedPath); // Save the compressed image to disk

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${compressedFilename}`;

        const dataToCreate = {
            ...validatedData,
            image: imageUrl,
            sn: 'Mobile',
            scan_date: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            verifymode: '20',
            inoutmode: '1',
            att_id: moment(new Date()).format('DDMMyyyyHHmmss') + "MOBILE" + validatedData.pin,
        };

        const newAbsenLog = await AttLog.create(dataToCreate);

        res.created(newAbsenLog, "Berhasil Check-in.");

    } catch (error) {
        next(error);
    }
};

export const absenCheckOut = async (req, res, next) => { // Tambahkan 'next'
    try {
        await ensureUploadsDirectory();

        const file = validateImageFile(req.file);

        const validationResult = absenCheckSchema.safeParse(req.body);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            return next(
                new AppError(
                    "Data input tidak valid.",
                    422,
                    "VALIDATION_ERROR",
                    formattedErrors
                )
            );
        }

        const validatedData = validationResult.data;

        const timestamp = Date.now();
        const originalNameParts = file.originalname.split('.');
        const extension = originalNameParts.length > 1 ? `.${originalNameParts.pop()}` : '.jpg'; // Default to jpg if no extension
        const baseFilename = originalNameParts.join('.');
        const compressedFilename = `${timestamp}-${baseFilename}${extension}`; // Use a descriptive name
        const compressedPath = path.join('public', 'uploads', compressedFilename); // Full path to save

        await sharp(file.buffer) // Process the buffer directly
            .resize({ width: 1000 }) // Optional: Resize
            .jpeg({ quality: 75, mozjpeg: true }) // Compress JPEG
            .png({ compressionLevel: 8, quality: 75 }) // Compress PNG
            .toFile(compressedPath); // Save the compressed image to disk

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${compressedFilename}`;

        const dataToCreate = {
            ...validatedData,
            image: imageUrl,
            sn: 'Mobile',
            scan_date: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            verifymode: '20',
            inoutmode: '0',
            att_id: moment(new Date()).format('DDMMyyyyHHmmss') + "MOBILE" + validatedData.pin,
        };

        const newAbsenLog = await AttLog.create(dataToCreate);

        res.created(newAbsenLog, "Berhasil Check-out.");

    } catch (error) {
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
                model: MasterLokasiAbsen,
                attributes: ['tikor', 'nama_lokasi', 'radius'],
            }]
        });

        res.success(maps[0].master_lokasi_absens, 'Data radius absen by role berhasil diambil.');
    } catch (error) {
        next(error);
    }
}
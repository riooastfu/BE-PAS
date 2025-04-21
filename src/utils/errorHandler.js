/**
 * Kelas Error Kustom untuk error operasional yang kita perkirakan.
 * Menyimpan statusCode HTTP dan status 'fail'/'error'.
 */
export class AppError extends Error {
    constructor(message, statusCode, errorCode = null, errors = null) {
        super(message); // Panggil constructor parent (Error)

        this.statusCode = statusCode;
        // Tentukan status berdasarkan statusCode (4xx = fail, 5xx = error)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Tandai sebagai error operasional (bukan bug programming)
        this.errorCode = errorCode; // Kode error internal (opsional)
        this.errors = errors; // Detail error validasi (opsional)


        // Capture stack trace, kecuali constructor AppError itu sendiri
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error handler global untuk menangkap semua jenis error.
 * Harus ditempatkan sebagai middleware terakhir di Express.
 */
export const globalErrorHandler = (err, req, res, next) => {
    // Default ke 500 jika statusCode atau status tidak ditentukan
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error untuk debugging (penting di production)
    // Gunakan logger yang lebih canggih seperti Winston atau Pino di aplikasi production
    console.error('ERROR 💥:', err);

    // Kirim response error terstruktur ke client
    // Bedakan response untuk error operasional dan error programming/unknown
    if (process.env.NODE_ENV === 'production') {
        // Di Production: Kirim error operasional yang detail, sembunyikan detail error programming
        if (err.isOperational) {
            return res.fail(err.message, err.statusCode, err.errorCode, err.errors);
        } else {
            // Error programming atau unknown: jangan bocorkan detail
            // 1. Log error
            // (Sudah dilakukan di atas)
            // 2. Kirim response generik
            return res.fail('Terjadi kesalahan pada server.', 500, 'SERVER_ERROR');
        }
    } else {
        // Di Development: Kirim detail error lengkap untuk debugging
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: { // Sertakan detail error
                ...err, // Copy properti error (termasuk statusCode, status, errorCode, dll.)
                stack: err.stack // Sertakan stack trace
            }
        });
    }
};

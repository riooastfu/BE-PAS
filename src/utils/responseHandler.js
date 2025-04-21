/**
 * Middleware untuk menambahkan helper response ke objek res.
 * Ini memungkinkan kita mengirim response JSON yang konsisten.
 */
const responseHandler = (req, res, next) => {

    /**
     * Mengirim response sukses (HTTP 2xx).
     * @param {*} data - Data yang akan dikirim dalam response.
     * @param {string} [message=null] - Pesan sukses opsional.
     * @param {number} [statusCode=200] - Kode status HTTP (default: 200 OK).
     */
    res.success = (data = null, message = null, statusCode = 200) => {
        const responseBody = {
            status: 'success',
        };
        if (message) {
            responseBody.message = message;
        }
        // Hanya sertakan 'data' jika tidak null atau undefined
        if (data !== null && data !== undefined) {
            responseBody.data = data;
        }
        return res.status(statusCode).json(responseBody);
    };

    /**
     * Helper spesifik untuk response 201 Created.
     * @param {*} data - Data resource yang baru dibuat.
     * @param {string} [message='Resource created successfully'] - Pesan sukses.
     */
    res.created = (data, message = 'Resource created successfully') => {
        return res.success(data, message, 201);
    };

    /**
    * Helper spesifik untuk response 204 No Content.
    * Biasanya digunakan setelah DELETE atau PUT/PATCH tanpa mengembalikan data.
    */
    res.noContent = () => {
        return res.status(204).send(); // 204 tidak boleh memiliki body
    };

    /**
     * Mengirim response error (HTTP 4xx atau 5xx).
     * Fungsi ini biasanya akan dipanggil oleh error handler global,
     * tetapi bisa juga dipanggil langsung jika diperlukan.
     * @param {string} message - Pesan error.
     * @param {number} statusCode - Kode status HTTP error.
     * @param {string} [errorCode=null] - Kode error internal aplikasi (opsional).
     * @param {object} [errors=null] - Detail error validasi (opsional).
     */
    res.fail = (message, statusCode, errorCode = null, errors = null) => {
        const responseBody = {
            status: statusCode >= 500 ? 'error' : 'fail', // 'fail' untuk client error, 'error' untuk server error
            message: message || 'Terjadi kesalahan.',
        };
        if (errorCode) {
            responseBody.code = errorCode;
        }
        if (errors) {
            responseBody.errors = errors;
        }
        return res.status(statusCode).json(responseBody);
    };

    // Helper spesifik untuk error umum (bisa dipanggil langsung dari controller jika perlu)
    res.badRequest = (message = 'Bad Request', errorCode = null, errors = null) => res.fail(message, 400, errorCode, errors);
    res.unauthorized = (message = 'Unauthorized', errorCode = null) => res.fail(message, 401, errorCode);
    res.forbidden = (message = 'Forbidden', errorCode = null) => res.fail(message, 403, errorCode);
    res.notFound = (message = 'Not Found', errorCode = null) => res.fail(message, 404, errorCode);
    res.internalError = (message = 'Internal Server Error', errorCode = null) => res.fail(message, 500, errorCode);

    next(); // Lanjutkan ke middleware/route berikutnya
};

export default responseHandler;
import z from 'zod';
import { AppError } from '../utils/errorHandler.js';

export const absenCheckSchema = z.object({
    pin: z.coerce.number(), // kalau dikirim dari form-data, biasanya string
    coordinate: z.string(),
    scan_date: z.string()
});

/** Validasi custom untuk file image absen */
export const validateImageFile = (file) => {
    if (!file) {
        throw new AppError('Gambar bukti absen harus diunggah.', 400, 'IMAGE_REQUIRED');
    }
    if (!['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        throw new AppError('Format gambar tidak valid. Hanya JPG yang diperbolehkan.', 400, 'INVALID_IMAGE_TYPE');
    }
    return file;
};
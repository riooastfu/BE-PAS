import multer from "multer";
import fs from 'fs/promises';
import path from 'path';

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + "-" + file.originalname);
//     },
// });

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const multerImageUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

export const ensureUploadsDirectory = async () => {
    const dir = path.join('public', 'uploads'); // Adjust if your path is different
    try {
        await fs.access(dir);
    } catch (error) {
        await fs.mkdir(dir, { recursive: true });
    }
};
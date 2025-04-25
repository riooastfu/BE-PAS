import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from "express";
import { fileURLToPath } from "url";
import rootRouter from "./routes/index.js";
import responseHandler from "./utils/responseHandler.js";
import { AppError, globalErrorHandler } from "./utils/errorHandler.js";

dotenv.config(); // Load environment variables

const app = express();

const __filename = fileURLToPath(import.meta.url); //Setting up the config so we can access file through be
const __dirname = path.dirname(__filename);

// Middleware bawaan Express untuk parsing JSON body
app.use(express.json());

// Middleware: Tambahkan helper response ke 'res'
app.use(responseHandler);

// --- Routes Aplikasi ---
app.get('/', (req, res) => {
    // Gunakan helper success yang sudah ditambahkan
    res.success({ api_version: '1.0' }, 'Selamat datang di API kami!');
});

// Gunakan item routes dengan prefix /api/v1/
app.use('/api/v1/', rootRouter);

// --- Penanganan Route Tidak Ditemukan (404) ---
// Tangkap semua request ke route yang tidak terdefinisi
app.all('*', (req, res, next) => {
    // Buat error 404 menggunakan AppError dan teruskan ke error handler global
    next(new AppError(`Resource ${req.originalUrl} tidak ditemukan.`, 404, 'ROUTE_NOT_FOUND'));
});

// --- Error Handler Global ---
// Middleware ini HARUS diletakkan paling akhir
app.use(globalErrorHandler);

app.use(cors({
    origin: ['http://localhost:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // Tetap aktif jika website menggunakan cookie
}));
app.use(express.static(path.join(__dirname, "public")));

export default app // Ekspor app untuk digunakan di server.js
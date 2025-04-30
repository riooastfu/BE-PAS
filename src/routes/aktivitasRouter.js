import express from 'express';
import { createLaporanHarian, createLaporanKesehatan, deleteLaporanHarianById, deleteLaporanHarianByNoUrut, deleteLaporanKesehatanById, getLaporanHarianById, getLaporanKesehatanById, getLaporanKesehatanByNik, getLaporanKesehatanByTanggal } from '../controllers/AktivitasController.js';

const aktivitasRouter = express.Router();

aktivitasRouter.get('/harian/:id_laporan', getLaporanHarianById);
aktivitasRouter.get('/kesehatan/:nik', getLaporanKesehatanByNik);
aktivitasRouter.get('/kesehatan/:id_laporan', getLaporanKesehatanById);
aktivitasRouter.post('/kesehatan/tanggal', getLaporanKesehatanByTanggal);
aktivitasRouter.post('/harian', createLaporanHarian);
aktivitasRouter.post('/kesehatan', createLaporanKesehatan);
aktivitasRouter.delete('/harian/no_urut', deleteLaporanHarianByNoUrut);
aktivitasRouter.delete('/harian/:id_laporan', deleteLaporanHarianById);
aktivitasRouter.delete('/kesehatan/:id_laporan', deleteLaporanKesehatanById);

export default aktivitasRouter;
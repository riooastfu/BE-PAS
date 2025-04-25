import express from 'express';
import { getKaryawanUlangTahun } from '../controllers/HomeController.js';

const homeRouter = express.Router();

homeRouter.get('/birthday/:pt', getKaryawanUlangTahun);

export default homeRouter;
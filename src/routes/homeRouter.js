import express from 'express';
import { getAppVersion, getKaryawanUlangTahun } from '../controllers/HomeController.js';

const homeRouter = express.Router();

homeRouter.get('/birthday/:pt', getKaryawanUlangTahun);
homeRouter.get('/version', getAppVersion);

export default homeRouter;
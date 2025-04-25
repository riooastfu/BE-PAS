import express from 'express';
import authRouter from './authRouter.js';
import cutiRouter from './cutiRouter.js';
import absensiRouter from './absensiRouter.js';
import { checkRole, verifyToken } from '../middleware/middleware.js';
import homeRouter from './homeRouter.js';
import aktivitasRouter from './aktivitasRouter.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/home', [verifyToken], homeRouter);
rootRouter.use('/cuti', [verifyToken], cutiRouter);
rootRouter.use('/absensi', [verifyToken], absensiRouter);
rootRouter.use('/aktivitas', [verifyToken], aktivitasRouter);

export default rootRouter;
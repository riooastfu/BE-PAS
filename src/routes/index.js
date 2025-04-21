import express from 'express';
import cutiRouter from "./CutiRouter.js";
import authRouter from './authRouter.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/cuti', cutiRouter);

export default rootRouter;
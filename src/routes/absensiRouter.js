import express from 'express';
import { getDataAbsenUser, getRadiusAbsenByRole } from '../controllers/AbsensiController.js';

const absensiRouter = express.Router();

absensiRouter.get('/:pin', getDataAbsenUser);
absensiRouter.get('/maps/radius', getRadiusAbsenByRole);

export default absensiRouter;
import express from 'express';
import { absenCheckIn, absenCheckOut, getDataAbsenUser, getRadiusAbsenByRole } from '../controllers/AbsensiController.js';
import { multerImageUpload } from '../config/imageUploader.js';
const absensiRouter = express.Router();

absensiRouter.get('/maps/radius', getRadiusAbsenByRole);
absensiRouter.get('/:pin', getDataAbsenUser);
absensiRouter.post('/masuk', multerImageUpload.single("image"), absenCheckIn);
absensiRouter.post('/keluar', multerImageUpload.single("image"), absenCheckOut);

export default absensiRouter;
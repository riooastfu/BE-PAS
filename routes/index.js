import express from "express";

import { getStatus, getUsers, Login } from "../controllers/Users.js";
// import { getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getDataAtasan, getDataKaryawan, getDataKaryawanByDepart, getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getData } from "../controllers/DepartemenController.js";
import { deleteDtLapKesByTgl, getDtLapKesById, getDtLapKesByNik, createLapKes } from "../controllers/DataLaporanKesehatanController.js";
import { getDtLapHarianById, createDtLapHarian, deleteDtLapHarByNoUrut, deleteDtLapHarById, getNoUrut } from "../controllers/DataLaporanHarianController.js";
import { getDataAbsen, getDataAbsenByNip } from "../controllers/AbsensiController.js";
import { getCutiByNik, getCutiByIdCuti } from "../controllers/CutiKaryawanController.js";
import { approveAtasan, createCutiDt, getCutiDtByIdCuti, getCutiDtLikeAtasan, getCutiDtLikeIdCuti, rejectAtasan } from "../controllers/CutiKaryawanDtController.js";
import { getDataCYDHol } from "../controllers/CYDHolController.js";

import { multerImageUpload } from "../config/ImageUploader.js";
import { absenCheckIn, absenCheckOut, getPinKaryawan } from "../controllers/AbsensiCamController.js";

const router = express.Router();

//Users
router.get('/users', getUsers);
router.post('/login', Login);
router.get('/status', getStatus);

//absensi karyawan
// router.post('/uploadabsen', multerImageUpload.single("file_upload"), uploadImage)
router.post('/absen/checkin', multerImageUpload.single("image"), absenCheckIn)
router.post('/absen/checkout', absenCheckOut);
router.post('/absen/getpin', getPinKaryawan);

//DataKaryawan
// router.get('/dtkaryawan/:nik', getDataKaryawanByNik);
router.get('/dataKaryawanAll', getDataKaryawan);
router.get('/dataKaryawan/:nik', getDataKaryawanByNik);
router.get('/dataKaryawanByDepart/:nik&:depart&:pt', getDataKaryawanByDepart);
router.get('/dataAtasan/:nik&:depart&:parent&:pt', getDataAtasan);

//Departemen
router.get('/departemen/:kode', getData);

//DtLapKes
router.get('/lapHarian/:nik', getDtLapKesByNik);
router.get('/lapHarianById/:id_laporan', getDtLapKesById);
router.delete('/delLapHarian/:id_laporan', deleteDtLapKesByTgl);
router.post('/InsertLapHarian/:nik', createLapKes);

//DtLapHar
router.get('/laporanHarian/:id_laporan', getDtLapHarianById);
router.post('/insertLaporanHarian/:id_laporan', createDtLapHarian);
router.delete('/delLaporanHarian/:no_urut&:id_laporan', deleteDtLapHarByNoUrut);
router.delete('/delLaporanHarianById/:id_laporan', deleteDtLapHarById);
router.get('/noUrut/:id_laporan', getNoUrut);

//Absensi
router.get('/absensi/:pegawai_nip', getDataAbsen);
router.get('/absensiByNip/:pegawai_nip', getDataAbsenByNip);

//Data Cuti
router.get('/getCuti/:nik', getCutiByNik);
router.get('/getCutiById/:id_cuti', getCutiByIdCuti);

//Data Cuti Detail
router.get('/getCutiDt/:id_cuti', getCutiDtByIdCuti);
router.get('/getCutiDtLike/:nik', getCutiDtLikeIdCuti);
router.get('/getcutidt/atasan/:nik', getCutiDtLikeAtasan);
router.post('/insertCutiDt', createCutiDt);
router.post('/approveAtasan/:id_transaksi', approveAtasan);
router.post('/rejectAtasan/:id_transaksi', rejectAtasan);

//Data CYDHOL
router.get('/getDataCYDHOL', getDataCYDHol);

export default router;
import express from "express";

import { getUsers, Login } from "../controllers/Users.js";
// import { getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getDataKaryawan, getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getData } from "../controllers/DepartemenController.js";
import { deleteDtLapKesByTgl, getDtLapKesById, getDtLapKesByNik, createLapKes } from "../controllers/DataLaporanKesehatanController.js";

const router = express.Router();

//Users
router.get('/users', getUsers);
router.post('/login', Login);

//DataKaryawan
// router.get('/dtkaryawan/:nik', getDataKaryawanByNik);
router.get('/dataKaryawan', getDataKaryawan);
router.get('/dataKaryawan/:nik', getDataKaryawanByNik);

//Departemen
router.get('/departemen/:kode', getData);

//DtLapKes
router.get('/lapHarian/:nik', getDtLapKesByNik);
router.get('/lapHarianById/:id_laporan', getDtLapKesById);
router.delete('/delLapHarian/:id_laporan', deleteDtLapKesByTgl);
router.post('/InsertLapHarian/:nik', createLapKes);

export default router;
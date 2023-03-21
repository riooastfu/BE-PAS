import express from "express";

import { getUsers, Login } from "../controllers/Users.js";
// import { getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getDataKaryawan, getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";
import { getData } from "../controllers/DepartemenController.js";

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

export default router;
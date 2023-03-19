import express from "express";

import { getUsers, Login } from "../controllers/Users.js";
import { getDataKaryawanByNik } from "../controllers/DataKaryawanController.js";

const router = express.Router();

//Users
router.get('/users', getUsers);
router.post('/login', Login);

//DataUser
router.get('/dtkaryawan/:nik', getDataKaryawanByNik);

export default router;
import express from "express";
import {
  createCutiUser,
  cutiAprroveAtasan,
  cutiRejectAtasan,
  getAtasanUser,
  getCutiUserByIdCuti,
  getCutiUserByNik,
  getDetailCutiUserByAtasan,
  getDetailCutiUserById,
  getHariLibur,
  getPicUser,
} from "../controllers/CutiController.js";

const cutiRouter = express.Router();

cutiRouter.get("/harilibur", getHariLibur);
cutiRouter.get("/id/:id_cuti", getCutiUserByIdCuti);
cutiRouter.get("/nik/:nik", getCutiUserByNik);
cutiRouter.get("/detail/:id_cuti", getDetailCutiUserById);
cutiRouter.get("/detail/atasan/:atasan", getDetailCutiUserByAtasan);
cutiRouter.post("/pic", getPicUser);
cutiRouter.post("/atasan", getAtasanUser);
cutiRouter.post("/detail", createCutiUser);
cutiRouter.patch("/detail/atasan/approve/:id_transaksi", cutiAprroveAtasan);
cutiRouter.patch("/detail/atasan/reject/:id_transaksi", cutiRejectAtasan);

export default cutiRouter;

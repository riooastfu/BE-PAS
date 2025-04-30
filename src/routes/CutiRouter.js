import express from "express";
import {
  createCutiUser,
  cutiAprroveAtasan,
  cutiRejectAtasan,
  getCutiUserByNik,
  getDetailCutiUserByAtasan,
  getDetailCutiUserById,
  getHariLibur,
} from "../controllers/CutiController.js";

const cutiRouter = express.Router();

cutiRouter.get("/harilibur", getHariLibur);
cutiRouter.get("/:nik", getCutiUserByNik);
cutiRouter.get("/detail/:id_cuti", getDetailCutiUserById);
cutiRouter.get("/detail/atasan/:atasan", getDetailCutiUserByAtasan);
cutiRouter.post("/detail", createCutiUser);
cutiRouter.patch("/detail/atasan/approve/:id_transaksi", cutiAprroveAtasan);
cutiRouter.patch("/detail/atasan/reject/:id_transaksi", cutiRejectAtasan);

export default cutiRouter;

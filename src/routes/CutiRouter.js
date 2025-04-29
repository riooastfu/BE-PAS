import express from "express";
import {
  createCutiUser,
  cutiAprroveAtasan,
  cutiRejectAtasan,
  getCutiUserByNik,
  getDetailCutiUserByAtasan,
  getDetailCutiUserById,
} from "../controllers/CutiController.js";

const cutiRouter = express.Router();

cutiRouter.get("/:nik", getCutiUserByNik);
cutiRouter.get("/detail/:id_cuti", getDetailCutiUserById);
cutiRouter.get("/detail/atasan/:atasan", getDetailCutiUserByAtasan);
cutiRouter.post("/detail", createCutiUser);
cutiRouter.patch("/detail/atasan/approve", cutiAprroveAtasan);
cutiRouter.patch("/detail/atasan/reject", cutiRejectAtasan);

export default cutiRouter;

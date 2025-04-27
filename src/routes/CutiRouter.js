import express from "express";
import {
  createCutiUser,
  getCutiUserByNik,
  getDetailCutiUserByAtasan,
  getDetailCutiUserById,
} from "../controllers/CutiController.js";

const cutiRouter = express.Router();

cutiRouter.get("/:nik", getCutiUserByNik);
cutiRouter.get("/detail/:id_cuti", getDetailCutiUserById);
cutiRouter.get("/detail/atasan/:atasan", getDetailCutiUserByAtasan);
cutiRouter.post("/detail", createCutiUser);

export default cutiRouter;

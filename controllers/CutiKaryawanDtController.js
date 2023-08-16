import { QueryTypes } from "sequelize";

import DataCutiKaryawandt from "../models/CutiKaryawanDtModel.js";

export const getCutiDtByIdCuti = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("SELECT * FROM pers_cutikaryawandt WHERE id_cuti = :id_cuti",
            {
                replacements: { id_cuti: req.params.id_cuti },
                type: QueryTypes.SELECT
            });
        res.json(dataCutiDt);
    } catch (error) {
        res.json(error);
    }
}

export const getCutiDtLikeIdCuti = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("SELECT * FROM pers_cutikaryawandt WHERE id_cuti LIKE :nik",
            {
                replacements: { nik: '%' + req.params.nik + '%' },
                type: QueryTypes.SELECT
            });
        res.json(dataCutiDt);
    } catch (error) {
        res.json(error);
    }
}

export const getCutiDtLikeAtasan = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("SELECT CAST(pic AS CHAR(15)) AS pic, id_cuti, no_transaksi, id_transaksi, tanggal_mulai, tanggal_berakhir, total_hari, tipe_cuti, alasan, alamat_cuti, approval, atasan, no_telepon, created_at, updated_at FROM pers_cutikaryawandt WHERE atasan = :nik AND approval = 2",
            {
                replacements: { nik: req.params.nik },
                type: QueryTypes.SELECT
            });
        res.json(dataCutiDt);
    } catch (error) {
        res.json(error);
    }
}

export const createCutiDt = async (req, res) => {
    try {
        const { id_cuti, no_transaksi, id_transaksi, tanggal_mulai, tanggal_berakhir, total_hari, tipe_cuti, alasan, alamat_cuti, approval, pic, atasan, no_telepon } = req.body
        await DataCutiKaryawandt.create(req.body);
        res.status(201).json({ msg: "Data Ditambah!" })
        console.log("Berhasil")
    } catch (error) {
        res.json(error)
        console.log("error>> ", error)
    }
}

export const approveAtasan = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("UPDATE pers_cutikaryawandt SET approval = 1 WHERE id_transaksi = :id_transaksi",
            {
                replacements: { id_transaksi: req.params.id_transaksi },
                type: QueryTypes.UPDATE
            });
        res.status(201).json({ msg: "Cuti Berhasil Diapprove!" })
    } catch (error) {
        res.json(error);
    }
}

export const rejectAtasan = async (req, res) => {
    try {
        const dataCutiDt = await DataCutiKaryawandt.sequelize.query("UPDATE pers_cutikaryawandt SET approval = 3 WHERE id_transaksi = :id_transaksi",
            {
                replacements: { id_transaksi: req.params.id_transaksi },
                type: QueryTypes.UPDATE
            });
        res.status(201).json({ msg: "Cuti Berhasil Direject!" })
    } catch (error) {
        res.json(error);
    }
}
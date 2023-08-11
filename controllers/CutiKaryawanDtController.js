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

export const createCutiDt = async (req, res) => {
    try {
        const { id_cuti, no_transaksi, id_transaksi, tanggal_mulai, tanggal_berakhir, total_hari, tipe_cuti, alasan, alamat_cuti, approval, pic, atasan, no_telepon } = req.body
        await DataCutiKaryawandt.create(req.body, {
            where: {
                id_laporan: req.params.id_laporan
            }
        });
        res.status(201).json({ msg: "Data Ditambah!" })
    } catch (error) {
        res.json(error)
    }
}
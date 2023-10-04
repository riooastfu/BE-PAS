import { QueryTypes } from "sequelize";
import { validationResult } from "express-validator";

import DataAbsenCam from "../models/AbsenCamModel.js";

export const uploadImage = async (req, res) => {
    try {

        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        //checking if body have image to save
        if (!req.file) {
            return res.status(422).json({
                status: res.status,
                msg: "Image must be upload",
            });
        }
        //image url
        const image = req.protocol + "://" + req.get("host") + "/uploads" + "/" + req.file.filename;

        const { id_absen, nik } = req.body

        const INSERT = `INSERT INTO pers_absensikaryawan (id_absen, nik, checkin, file_upload) VALUES ('${id_absen}','${nik}',NOW(),'${image}')`;
        const dtAbsenCam = await DataAbsenCam.sequelize.query(INSERT,
            {
                type: QueryTypes.INSERT
            });
        res.status(201).json({ msg: "Image Uploaded!" })
    } catch (error) {
        res.json(
            {
                error: error,
                status: res.status
            }
        );
    }
}

export const absenCheckOut = async (req, res) => {
    try {
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { id_absen } = req.body;

        const UPDATE = `UPDATE pers_absensikaryawan SET checkout = NOW() WHERE id_absen = '${id_absen}'`

        const dtAbsenCam = await DataAbsenCam.sequelize.query(UPDATE,
            {
                type: QueryTypes.UPDATE
            });
        res.status(201).json({ msg: "Absen Updated!" })
    } catch (error) {
        res.json(error.message);
    }
}
import { QueryTypes } from "sequelize";
import { validationResult } from "express-validator";

import DataAbsenCam from "../models/AbsenCamModel.js";
import DataAbsen from "../models/AbsensiModel.js";
import DataAbsenDum from "../models/AbsensiDumModel.js";

// export const uploadImage = async (req, res) => {
//     try {

//         const errors = validationResult(req.body);

//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }

//         //checking if body have image to save
//         if (!req.file) {
//             return res.status(422).json({
//                 status: res.status,
//                 msg: "Image must be upload",
//             });
//         }
//         //image url
//         const image = req.protocol + "://" + req.get("host") + "/uploads" + "/" + req.file.filename;

//         const { id_absen, nik } = req.body

//         const INSERT = `INSERT INTO pers_absensikaryawan (id_absen, nik, checkin, file_upload) VALUES ('${id_absen}','${nik}',NOW(),'${image}')`;
//         const dtAbsenCam = await DataAbsenCam.sequelize.query(INSERT,
//             {
//                 type: QueryTypes.INSERT
//             });
//         res.status(201).json({ msg: "Image Uploaded!" })
//     } catch (error) {
//         res.json(
//             {
//                 error: error,
//                 status: res.status
//             }
//         );
//     }
// }

export const absenCheckIn = async (req, res) => {
    try {

        // checking if body have image to save
        if (!req.file) {
            return res.status(422).json({
                status: res.status,
                msg: "Image must be upload",
            });
        }
        //image url
        const image = req.protocol + "://" + req.get("host") + "/uploads" + "/" + req.file.filename;


        const { pin, att_id, scan_date, coordinate } = req.body

        const INSERT = `INSERT INTO att_log_dum (sn, scan_date, pin, verifymode, inoutmode, att_id, coordinate, image) VALUES ('FIO66206019510289','${scan_date}','${pin}', '20', '1', '${att_id}', '${coordinate}','${image}')`;
        const data = await DataAbsenDum.sequelize.query(INSERT,
            {
                type: QueryTypes.INSERT
            });
        res.status(201).json({ msg: "Berhasil Absen" })
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

        const { pin, att_id, scan_date, coordinate } = req.body

        const INSERT = `INSERT INTO att_log_dum (sn, scan_date, pin, verifymode, inoutmode, att_id, coordinate) VALUES ('FIO66206019510289','${scan_date}','${pin}', '20', '1', '${att_id}', '${coordinate}')`;
        const data = await DataAbsenDum.sequelize.query(INSERT,
            {
                type: QueryTypes.INSERT
            });
        res.status(201).json({ msg: "Berhasil Absen Pulang" })
    } catch (error) {
        res.json(
            {
                error: error,
                status: res.status
            }
        );
    }
}

export const getPinKaryawan = async (req, res) => {
    try {

        const { pegawai_nip } = req.body;

        const GET = `SELECT pegawai_pin FROM pegawai WHERE pegawai_nip = '${pegawai_nip}'`

        const data = await DataAbsen.sequelize.query(GET,
            {
                type: QueryTypes.SELECT
            });
        res.status(201).json(
            {
                msg: "Berhasil Ambil Data",
                data: data
            }
        )
    } catch (error) {
        res.json(error.message);
    }
}
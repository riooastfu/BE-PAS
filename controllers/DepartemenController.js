import Departemen from "../models/DepartemenModel.js";

export const getData = async (req, res) => {
    try {
        const dataDepartemen = await Departemen.findOne({
            where: {
                kode: req.params.kode
            },
            attributes: ['kode', 'desc']
        });
        res.json(dataDepartemen)
    } catch (error) {
        res.json(error);
    }
}
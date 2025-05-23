import Users from "../model/Users.js";
import { AppError } from "../utils/errorHandler.js";

export const getUser = async (req, res, next) => {
    try {
        const { karyawanid } = req.params;

        if (!karyawanid) {
            return next(
                new AppError(
                    "Parameter karyawanid dibutuhkan.",
                    400,
                    "MISSING_PARAMETER",
                    formattedErrors
                )
            );
        }

        const user = await Users.findOne({
            where: {
                karyawanid: karyawanid
            }
        })

        res.success(user, 'User berhasil diambil');
    } catch (error) {
        next(error);
    }
}
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandler.js";
import RefreshToken from "../model/RefreshToken.js";
import Users from "../model/Users.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError("Tidak ada token yang diberikan", 401, "NO_TOKEN_PROVIDED")
      );
    }

    const token = authHeader.split(" ")[1];

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tambahkan data user ke request object
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token kedaluwarsa", 401, "TOKEN_EXPIRED"));
    } else if (error.name === "JsonWebTokenError") {
      return next(new AppError("Token tidak valid", 401, "INVALID_TOKEN"));
    }
    next(error);
  }
};

export const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(
        new AppError("Refresh token tidak diberikan", 400, "NO_REFRESH_TOKEN")
      );
    }

    // Cari token di database
    const tokenDoc = await RefreshToken.findOne({
      where: { token: refreshToken },
    });

    if (!tokenDoc) {
      return next(
        new AppError("Refresh token tidak valid", 401, "INVALID_REFRESH_TOKEN")
      );
    }

    // Cek apakah token sudah kedaluwarsa
    if (new Date() > new Date(tokenDoc.expires_at)) {
      // Hapus token yang kedaluwarsa
      await RefreshToken.destroy({ where: { token: refreshToken } });
      return next(
        new AppError(
          "Refresh token kedaluwarsa. Silakan login kembali.",
          401,
          "REFRESH_TOKEN_EXPIRED"
        )
      );
    }

    // Verifikasi refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    req.refreshToken = refreshToken;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError("Refresh token kedaluwarsa", 401, "REFRESH_TOKEN_EXPIRED")
      );
    } else if (error.name === "JsonWebTokenError") {
      return next(
        new AppError("Refresh token tidak valid", 401, "INVALID_REFRESH_TOKEN")
      );
    }
    next(error);
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Pastikan middleware verifyToken sudah dijalankan sebelumnya
    // dan req.user berisi payload token yang telah didekode.
    if (!req.user || !req.user.id_role) {
      // Ini seharusnya tidak terjadi jika verifyToken berjalan dengan benar
      // dan payload token menyertakan peran.
      return next(
        new AppError(
          "Informasi peran pengguna tidak ditemukan dalam token.",
          401,
          "MISSING_ROLE_INFO"
        )
      );
    }

    const userRole = req.user.id_role;

    // Periksa apakah peran pengguna ada dalam daftar peran yang diizinkan
    if (allowedRoles.includes(userRole)) {
      // Jika peran diizinkan, lanjutkan ke handler route berikutnya
      next();
    } else {
      // Jika peran tidak diizinkan, kirim error Forbidden
      return next(
        new AppError(
          "Anda tidak memiliki izin untuk mengakses sumber daya ini.",
          403,
          "FORBIDDEN_ACCESS"
        )
      );
    }
  };
};

export const checkPasswordExpiration = async (req, res, next) => {
  try {
    // Skip check for login, refresh token, and password reset routes
    if (
      req.path.includes('/auth/login') ||
      req.path.includes('/auth/refresh-token') ||
      req.path.includes('/users/reset')
    ) {
      return next();
    }

    // Get user details from the token payload
    const { namauser } = req.user;

    // Find the user in the database to check their password_changed_at field
    const user = await Users.findOne({
      where: { namauser },
      attributes: ['password_changed_at']
    });

    if (!user) {
      return next(
        new AppError(
          "User tidak ditemukan.",
          401,
          "USER_NOT_FOUND"
        )
      );
    }

    // Calculate the date 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Check if password has never been changed or was changed more than 3 months ago
    if (!user.password_changed_at || new Date(user.password_changed_at) < threeMonthsAgo) {
      return next(
        new AppError(
          "Password Anda telah kedaluwarsa. Mohon perbarui password Anda.",
          403,
          "PASSWORD_EXPIRED"
        )
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

import express from 'express';
import { createLogUserLogin, Login, Logout, refreshAccessToken, resetPassword } from '../controllers/AuthController.js';
import { verifyRefreshToken } from '../middleware/middleware.js';

const authRouter = express.Router();

authRouter.post('/login', Login);
authRouter.post('/refresh-token', [verifyRefreshToken], refreshAccessToken);
authRouter.post('/logout', Logout);
authRouter.post('/password/reset', resetPassword);
authRouter.post('/login/log', createLogUserLogin);

export default authRouter;
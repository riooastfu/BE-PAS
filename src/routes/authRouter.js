import express from 'express';
import { Login, Logout, refreshAccessToken } from '../controllers/AuthController.js';
import { verifyRefreshToken } from '../middleware/middleware.js';

const authRouter = express.Router();

authRouter.post('/login', Login);
authRouter.patch('/refresh-token', [verifyRefreshToken], refreshAccessToken);
authRouter.post('/logout', Logout);

export default authRouter;
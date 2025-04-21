import express from 'express';
import { Login } from '../controllers/AuthController.js';

const authRouter = express.Router();

authRouter.post('/login', Login);

export default authRouter;
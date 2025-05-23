import express from 'express';
import { getUser } from '../controllers/ProfileController.js';

const profileRouter = express.Router();

profileRouter.get('/user', getUser);

export default profileRouter;
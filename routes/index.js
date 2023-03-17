import express from "express";

import { getUsers, Login } from "../controllers/Users.js";

const router = express.Router();

router.get('/users', getUsers);

router.post('/login', Login);

export default router;
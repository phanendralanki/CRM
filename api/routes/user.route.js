import express from 'express';
import { test, updateProfile } from '../controllers/user.controller.js';
import {verifyToken} from "../utils/verifyUser.js";
const router = express.Router();

router.get('/',test);
router.post('/update/:id',verifyToken,updateProfile);

export default router;
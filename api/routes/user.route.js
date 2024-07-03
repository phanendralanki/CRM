import express from 'express';
import { getUserNameAndId, test, updateProfile } from '../controllers/user.controller.js';
import {verifyToken} from "../utils/verifyUser.js";
const router = express.Router();

router.get('/',test);
router.post('/update/:id',verifyToken,updateProfile);
router.get('/getUsers',getUserNameAndId);
export default router;
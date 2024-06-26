import express from 'express';
import { signin, signup ,google,signout,forgotPassword,resetPassword} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signout);
router.post('/forgotPassword',forgotPassword);
router.put('/resetPassword/:token',resetPassword);

export default router;
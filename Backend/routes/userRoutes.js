import {Register, Login, forgotPassword} from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/forgot-password', forgotPassword);
// router.post('/verify-otp', verifyOtp);
// router.post('reset-password', resetPassword);

export default router;
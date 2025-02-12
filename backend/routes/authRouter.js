import express  from 'express';
import {registerUser, login} from '../controllers/authController.js'


const router =express.Router();

router.post('/register.js',registerUser)
router.post('/login.js',login)

export default router;
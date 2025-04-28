import express from 'express';
import { registerUser, getUsers, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-in', registerUser);
router.post('/login', loginUser); 
router.get('/', getUsers); 

export default router;

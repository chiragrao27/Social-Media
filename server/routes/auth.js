import express from 'express';
import {login, updatePassword} from '../controllers/auth.js';

const router = express.Router();

//Login Route
router.post('/login', login);

//Updating the password using old password
router.patch('/password', updatePassword);

export default router;
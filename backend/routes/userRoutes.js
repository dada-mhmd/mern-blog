import express from 'express';
import { deleteUser, logout, updateUser } from '../controllers/userCtrl.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/logout', logout);

export default router;

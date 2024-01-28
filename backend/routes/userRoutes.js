import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  logout,
  updateUser,
} from '../controllers/userCtrl.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/logout', logout);
router.get('/getUsers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;

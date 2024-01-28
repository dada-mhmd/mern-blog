import express from 'express';
import {
  createComment,
  getPostComments,
  likeComment,
} from '../controllers/commentCtrl.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);

export default router;

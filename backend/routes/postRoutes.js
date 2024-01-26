import express from 'express';
import { verifyToken } from './../utils/verifyUser.js';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/postCtrl.js';
const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getPosts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);

export default router;

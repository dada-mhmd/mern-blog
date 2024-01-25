import Post from '../models/postModel.js';
import asyncHandler from './../middleware/asyncHandler.js';

export const createPost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  const createdPost = await newPost.save();

  if (!createdPost) {
    res.status(400);
    throw new Error('Something went wrong, please try again');
  }

  res.status(201).json(createdPost);
});

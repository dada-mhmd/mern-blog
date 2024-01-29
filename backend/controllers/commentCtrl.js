import Comment from '../models/commentModel.js';
import asyncHandler from './../middleware/asyncHandler.js';

export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, userId } = req.body;

  if (userId !== req.user.id) {
    res.status(401);
    throw new Error('You are not allowed to create a comment');
  }

  const newComment = await Comment.create({ content, postId, userId });

  res.status(201).json(newComment);
});

// get comments
export const getPostComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });

  res.status(200).json(comments);
});

export const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  const userIndex = comment.likes.indexOf(req.user.id);

  if (userIndex === -1) {
    comment.numberOfLikes += 1;
    comment.likes.push(req.user.id);
  } else {
    comment.numberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }

  await comment.save();
  res.status(200).json(comment);
});

// edit
export const editComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (comment.userId !== req.user.id && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      content: req.body.content,
    },
    { new: true }
  );

  res.status(200).json(updatedComment);
});

// delete
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (comment.userId !== req.user.id && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }

  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(200).json('Comment deleted successfully');
});

import asyncHandler from './../middleware/asyncHandler.js';
import bcrypt from 'bcryptjs';
import User from './../models/userModel.js';

export const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.userId) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      res.status(400);
      throw new Error('Username must be between 5 and 20 characters');
    }

    if (req.body.username.includes(' ')) {
      res.status(400);
      throw new Error('Username cannot contain spaces');
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      res.status(400);
      throw new Error('Username must be lowercase');
    }
    if (req.body.username.match(/[^a-zA-Z0-9]+$/)) {
      res.status(400);
      throw new Error('Username must only contain letters and numbers');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json(updatedUser);
  }
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    res.status(401);
    throw new Error('Something went wrong, please try again');
  }

  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json('User deleted successfully');
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('access_token').status(200).json('Logged out successfully');
});

// get all users
export const getUsers = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }

  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;

  const users = await User.find()
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  if (!users) {
    res.status(404);
    throw new Error('Users not found');
  }

  const usersWithoutPassword = users.map((user) => {
    const { password, ...rest } = user._doc;
    return rest;
  });

  const totalUsers = await User.countDocuments();
  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthUsers = await User.countDocuments({
    createdAt: {
      $gte: oneMonthAgo,
    },
  });

  res.status(200).json({
    users: usersWithoutPassword,
    totalUsers,
    lastMonthUsers,
  });
});

// get user
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
});

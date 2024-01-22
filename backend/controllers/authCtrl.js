import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from './../middleware/asyncHandler.js';

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });

  res.json({ message: 'User created successfully' });
});

// login
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404);
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      res.status(400);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// login with google
export const google = asyncHandler(async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = await User.create({
      username:
        name.toLowerCase().split(' ').join('') +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password, ...rest } = newUser._doc;

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  }
});

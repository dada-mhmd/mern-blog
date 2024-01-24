import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }

    req.user = user;

    next();
  });
};

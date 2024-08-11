const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware for checking JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      if (!user) return res.status(400).send('Invalid token payload');
      req.user = user;  // Ensure that user is correctly set here
      next();
    });
  };

// Middleware for protected routes
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.length || roles.includes(req.user.role)) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  };
};

// Middleware to check if the user's email is confirmed
const checkEmailConfirmed = (req, res, next) => {
  if (req.user.emailConfirmed) {
    return next();
  } else {
    return res.status(403).send('Email not confirmed');
  }
};

module.exports = {
    authenticateToken,
    authorize,
    checkEmailConfirmed,
  };
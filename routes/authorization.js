const express = require('express');
const axios = require('axios');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticateToken, authorize } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendConfirmationEmail = async (user) => {
    const transporter = nodemailer.createTransport({
      service: 'outlook', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Email Confirmation',
      text: `Please confirm your email by clicking the link: http://localhost:5000/auth/confirm-email?token=${user.confirmationToken}`,
    };
  
    await transporter.sendMail(mailOptions);
  };

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).send('Invalid email format');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(32).toString('hex'); 
    const user = new User({ username, email, password: hashedPassword, confirmationToken });
    
    await user.save();
    await sendConfirmationEmail(user);
    
    res.status(201).send('User registered. Please check your email to confirm.');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

  router.get('/confirm-email', async (req, res) => {
    try {
      const user = await User.findOne({ confirmationToken: req.query.token });
      if (!user) {
        return res.status(400).send('Invalid or expired token');
      }
  
      user.emailConfirmed = true;
      user.confirmationToken = null; 
      await user.save();
  
      res.send('Email confirmed. You can now use all features.');
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }

  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  res.json({ accessToken });
});

router.put('/update', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    if (req.body.email && !isValidEmail(req.body.email)) {
      return res.status(400).send('Invalid email format');
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    await user.save();
    res.send('User updated');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.send('User deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

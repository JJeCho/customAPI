const express = require('express');
const axios = require('axios');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticateToken, authorize } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);
      const user = new User({ username: req.body.username, password: hashedPassword });
      await user.save();
      res.status(201).send('User registered');
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
  
      user.username = req.body.username || user.username;
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

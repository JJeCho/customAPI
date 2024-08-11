const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // e.g., 'user' or 'admin'
});

module.exports = mongoose.model('User', userSchema);
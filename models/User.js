const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, 
  emailConfirmed: { type: Boolean, default: false }, 
  confirmationToken: { type: String } 
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '10m' },
  },
  userData: {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'student' },
  },
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);

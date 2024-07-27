const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP will expire in 5 minutes
  },
});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;

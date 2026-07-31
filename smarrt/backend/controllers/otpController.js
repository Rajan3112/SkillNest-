const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
};

exports.sendOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    await OTP.deleteMany({ email });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({
      email,
      otp,
      expiresAt,
      userData: { name, email, password, role: 'student' },
    });

    const mailOptions = {
      from: `"SkillNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'SkillNest - Email Verification OTP',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
          <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4F46E5, #7C3AED); border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <span style="color: white; font-size: 28px; font-weight: bold;">S</span>
              </div>
              <h1 style="color: #1e293b; font-size: 24px; margin: 0;">Verify Your Email</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 8px;">Welcome to SkillNest, ${name}!</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #475569; font-size: 15px; margin-bottom: 20px;">Use this 6-digit OTP to verify your email address:</p>
              <div style="background: linear-gradient(135deg, #EEF2FF, #F5F3FF); border: 2px dashed #4F46E5; border-radius: 12px; padding: 20px; display: inline-block;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4F46E5;">${otp}</span>
              </div>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 16px;">This OTP expires in 10 minutes</p>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px;">If you didn't request this, please ignore this email.</p>
              <p style="color: #4F46E5; font-size: 13px; font-weight: 600; margin-top: 8px;">SkillNest - Learn New Skills Faster</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'OTP sent to your email', email });
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
    }

    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP not found. Please register again.' });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ success: false, message: 'OTP expired. Please register again.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }

    const { name, password, role } = otpRecord.userData;

    const user = await User.create({ name, email, password, role, isVerified: true });

    await OTP.deleteMany({ email });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ success: false, message: error.message || 'Verification failed' });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Please register first' });
    }

    await OTP.deleteMany({ email });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({
      email,
      otp,
      expiresAt,
      userData: otpRecord.userData,
    });

    const mailOptions = {
      from: `"SkillNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'SkillNest - New Verification OTP',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
          <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e293b; font-size: 24px; margin: 0;">New Verification OTP</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 8px;">SkillNest Email Verification</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #475569; font-size: 15px; margin-bottom: 20px;">Your new 6-digit OTP:</p>
              <div style="background: linear-gradient(135deg, #EEF2FF, #F5F3FF); border: 2px dashed #4F46E5; border-radius: 12px; padding: 20px; display: inline-block;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4F46E5;">${otp}</span>
              </div>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 16px;">This OTP expires in 10 minutes</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'New OTP sent to your email' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to resend OTP' });
  }
};

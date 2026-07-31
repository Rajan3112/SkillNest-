import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaEnvelope, FaShieldAlt, FaRedo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API from '../services/api';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (isNaN(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post('/otp/verify', { email, otp: otpValue });

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Email verified successfully! Welcome to SkillNest!');
        navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Verification failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const { data } = await API.post('/otp/resend', { email });
      if (data.success) {
        toast.success('New OTP sent to your email!');
        setTimer(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-500 via-primary-500 to-secondary-500 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-xl" />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FaGraduationCap className="text-2xl" />
            </div>
            <span className="text-2xl font-bold">SkillNest</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Almost There!</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            We've sent a 6-digit verification code to your email. Enter it below to activate your account and start learning.
          </p>
          <div className="mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-white/60">Verification code sent to</p>
                <p className="text-lg font-semibold">{email}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <FaShieldAlt className="text-xl mt-0.5 text-yellow-300" />
            <div>
              <p className="font-semibold text-sm">Check your inbox</p>
              <p className="text-xs text-white/70 mt-1">If you don't see the email, check your spam folder. The code expires in 10 minutes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Verify Your Email</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Enter the 6-digit code sent to
            </p>
            <p className="text-primary-500 font-semibold mt-1">{email}</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-center py-4 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify & Create Account'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            {timer > 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Resend code in <span className="text-primary-500 font-semibold">{timer}s</span>
              </p>
            ) : (
              <button onClick={handleResend} disabled={resending} className="text-primary-500 hover:text-primary-600 font-semibold text-sm flex items-center justify-center gap-2 mx-auto">
                {resending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaRedo className="text-xs" />
                    Resend Verification Code
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
            Already verified?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;

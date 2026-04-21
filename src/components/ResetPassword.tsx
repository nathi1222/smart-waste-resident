import React, { useState, useEffect } from 'react';

interface ResetPasswordProps {
  email: string;
  onBack: () => void;
  onReset: (newPassword: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ email, onBack, onReset }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'otp' | 'password'>('otp');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleOtpChange = (index: number, digit: string) => {
    if (digit.length <= 1 && /^\d*$/.test(digit)) {
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      
      if (digit && index < 5) {
        const nextInput = document.getElementById(`reset-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      setStep('password');
    }
  };

  const handleResetPassword = () => {
    if (newPassword && newPassword === confirmPassword && newPassword.length >= 6) {
      onReset(newPassword);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="h-12 flex items-center px-5 pt-4">
          <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
        </div>
        
        <div className="flex-1 px-6 pt-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
            <p className="text-gray-500 text-sm mt-2">
              We've sent a verification code to<br />
              <span className="font-semibold text-gray-700">{email}</span>
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`reset-otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              ))}
            </div>
            
            <div className="text-center mt-4">
              {!canResend ? (
                <p className="text-sm text-gray-500">Resend code in {timer} seconds</p>
              ) : (
                <button onClick={handleResend} className="text-green-600 text-sm font-medium">
                  Resend Code
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={otp.join('').length !== 6}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-12 flex items-center px-5 pt-4">
        <button onClick={() => setStep('otp')} className="text-gray-600 text-2xl">←</button>
      </div>
      
      <div className="flex-1 px-6 pt-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-2">
            Create a new password for your account
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleResetPassword}
          disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 6}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
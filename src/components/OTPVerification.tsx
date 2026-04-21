import React, { useState, useEffect } from 'react';

interface OTPVerificationProps {
  type: 'email' | 'phone';
  value: string;
  onVerify: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ type, value, onVerify, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
      
      // Auto-focus next input
      if (digit && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        onVerify();
      }, 1500);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    // In real app, call API to resend OTP
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-12 flex items-center px-5 pt-4">
        <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
      </div>
      
      <div className="flex-1 px-6 pt-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{type === 'email' ? '📧' : '📱'}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify {type === 'email' ? 'Email' : 'Phone'}</h2>
          <p className="text-gray-500 text-sm mt-2">
            We've sent a verification code to<br />
            <span className="font-semibold text-gray-700">{value}</span>
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
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
          onClick={handleVerify}
          disabled={otp.join('').length !== 6 || isVerifying}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onBack: () => void;
  onSendOTP: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onSendOTP }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      onSendOTP(email);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-12 flex items-center px-5 pt-4">
        <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
      </div>
      
      <div className="flex-1 px-6 pt-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email address and we'll send you a verification code to reset your password.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="john@example.com"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!email}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
        >
          Send Reset Code
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
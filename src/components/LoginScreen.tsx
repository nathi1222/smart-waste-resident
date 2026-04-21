import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, name: string) => void;
  onSignUp: () => void;
  onLoginWithPhone: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onLoginWithPhone }) => {
  const [email, setEmail] = useState('john@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, 'John');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
          <span className="text-3xl">🗑️</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">SMART WASTE</h1>
        <p className="text-gray-400 text-sm">Keep your city clean</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              placeholder="email@example.com"
            />
          </div>
          // Add after the password field
<div className="text-right mb-4">
  <button onClick={() => setCurrentScreen('forgotPassword')} className="text-sm text-green-600">
    Forgot Password?
  </button>
</div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-all text-sm"
          >
            LOGIN
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <button
          onClick={onLoginWithPhone}
          className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:border-green-500 hover:text-green-600 transition-all text-sm"
        >
          <span>📱</span>
          Login with Phone
        </button>

        <div className="mt-5 text-center">
          <button
            onClick={onSignUp}
            className="text-green-600 text-sm font-medium hover:text-green-700"
          >
            Don't have an account? Sign Up →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
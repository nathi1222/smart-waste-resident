import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import CollectionHistoryScreen from './components/CollectionHistoryScreen';
import RecyclingTipsScreen from './components/RecyclingTipsScreen';
import BinRequestScreen from './components/BinRequestScreen';
import ServiceMapScreen from './components/ServiceMapScreen';
import ChatSupportScreen from './components/ChatSupportScreen';
import ProfileScreen from './components/ProfileScreen';
import OTPVerification from './components/OTPVerification';
import BiometricLogin from './components/BiometricLogin';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AIWasteSorter from './components/AIWasteSorter';

type Screen = 'login' | 'register' | 'dashboard' | 'schedule' | 'reportIssue' | 'alerts' | 
  'collectionHistory' | 'recyclingTips' | 'binRequest' | 'serviceMap' | 'chat' | 'profile' | 
  'otpEmail' | 'otpPhone' | 'biometric' | 'forgotPassword' | 'resetPassword' | 'aiSorter';

function App() {
  const { t, formatCurrency } = useLanguage();
  
  // ALL HOOKS AT THE TOP
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // OTP state
  const [pendingVerification, setPendingVerification] = useState<{type: 'email' | 'phone', value: string} | null>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  // Report issue state
  const [issueDescription, setIssueDescription] = useState('');

  // Check for saved session
  useEffect(() => {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setUserName(session.name);
      setUserEmail(session.email);
      setUserPhone(session.phone || '');
      setUserAddress(session.address || '45 Main Street, Springfield');
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    }
  }, []);

  const showToastNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogin = () => {
    const demoUser = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      phone: '+27 12 345 6789',
      address: '45 Main Street, Springfield'
    };
    setUserName(demoUser.name);
    setUserEmail(demoUser.email);
    setUserPhone(demoUser.phone);
    setUserAddress(demoUser.address);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    localStorage.setItem('userSession', JSON.stringify(demoUser));
    showToastNotification(`👋 Welcome back, ${demoUser.name}!`);
  };

  const handleBiometricSuccess = () => {
    const savedUser = localStorage.getItem('userSession');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name);
      setUserEmail(user.email);
      setUserPhone(user.phone);
      setUserAddress(user.address);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
      showToastNotification(`👋 Welcome back, ${user.name}!`);
    } else {
      handleLogin();
    }
  };

  const startRegistration = () => {
    if (!regName || !regEmail || !regPhone || !regPassword || !regAddress) {
      showToastNotification('Please fill in all fields');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToastNotification('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      showToastNotification('Please agree to the terms and conditions');
      return;
    }
    
    setRegistrationData({ name: regName, email: regEmail, phone: regPhone, password: regPassword, address: regAddress });
    setPendingVerification({ type: 'email', value: regEmail });
    setCurrentScreen('otpEmail');
  };

  const handleEmailVerified = () => {
    setPendingVerification({ type: 'phone', value: regPhone });
    setCurrentScreen('otpPhone');
  };

  const handlePhoneVerified = () => {
    if (registrationData) {
      const newUser = { 
        name: registrationData.name, 
        email: registrationData.email, 
        phone: registrationData.phone, 
        address: registrationData.address 
      };
      setUserName(registrationData.name);
      setUserEmail(registrationData.email);
      setUserPhone(registrationData.phone);
      setUserAddress(registrationData.address);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
      localStorage.setItem('userSession', JSON.stringify(newUser));
      localStorage.setItem('biometricEnabled', 'true');
      showToastNotification(`🎉 Welcome to SMART WASTE, ${registrationData.name}!`);
    }
  };

  const handleForgotPasswordSendOTP = (email: string) => {
    setForgotPasswordEmail(email);
    setCurrentScreen('resetPassword');
  };

  const handleResetPassword = (newPassword: string) => {
    showToastNotification('Password reset successfully! Please login with your new password.');
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserAddress('');
    localStorage.removeItem('userSession');
    setCurrentScreen('login');
    showToastNotification('👋 You have been logged out successfully.');
  };

  const handleUpdateProfile = (name: string, email: string, phone: string, address: string) => {
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
    setUserAddress(address);
    localStorage.setItem('userSession', JSON.stringify({ name, email, phone, address }));
    showToastNotification('Profile updated successfully!');
  };

  const handleReportSubmit = () => {
    showToastNotification('✅ Issue reported successfully!');
    setTimeout(() => setCurrentScreen('dashboard'), 1500);
  };

  const handleBinRequestSubmit = () => {
    showToastNotification('📦 Bin request submitted!');
  };

  const rateCollection = (rating: number) => {
    showToastNotification(`⭐ Thanks for rating ${rating} stars!`);
  };

  const scheduleItems = [
    { date: 'TODAY - April 15, 2026', type: 'GENERAL WASTE', status: 'Active', time: '8:00 AM - 12:00 PM' },
    { date: 'April 18, 2026', type: 'RECYCLING', status: 'UPCOMING', time: '9:00 AM - 1:00 PM' },
    { date: 'April 22, 2026', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
    { date: 'April 25, 2026', type: 'HAZARDOUS', status: 'UPCOMING', time: 'By appointment' },
    { date: 'April 29, 2026', type: 'GENERAL WASTE', status: 'UPCOMING', time: '8:00 AM - 12:00 PM' },
  ];

  const NotificationToast = () => (
    showNotification ? (
      <div className="fixed top-4 left-4 right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg z-50 animate-fadeIn">
        {notificationMessage}
      </div>
    ) : null
  );

  const hasBiometricEnabled = localStorage.getItem('biometricEnabled') === 'true';

  return (
    <div className="min-h-screen bg-white">
      <NotificationToast />
      
      {/* Biometric Login Screen */}
      {currentScreen === 'biometric' && (
        <BiometricLogin onSuccess={handleBiometricSuccess} onBack={() => setCurrentScreen('login')} />
      )}
      
      {/* Forgot Password Screen */}
      {currentScreen === 'forgotPassword' && (
        <ForgotPassword 
          onBack={() => setCurrentScreen('login')}
          onSendOTP={handleForgotPasswordSendOTP}
        />
      )}
      
      {/* Reset Password Screen */}
      {currentScreen === 'resetPassword' && (
        <ResetPassword 
          email={forgotPasswordEmail}
          onBack={() => setCurrentScreen('forgotPassword')}
          onReset={handleResetPassword}
        />
      )}
      
      {/* AI Waste Sorter Screen */}
      {currentScreen === 'aiSorter' && (
        <AIWasteSorter onBack={() => setCurrentScreen('dashboard')} />
      )}
      
      {/* OTP Email Verification */}
      {currentScreen === 'otpEmail' && pendingVerification && (
        <OTPVerification 
          type="email" 
          value={pendingVerification.value}
          onVerify={handleEmailVerified}
          onBack={() => setCurrentScreen('register')}
        />
      )}
      
      {/* OTP Phone Verification */}
      {currentScreen === 'otpPhone' && pendingVerification && (
        <OTPVerification 
          type="phone" 
          value={pendingVerification.value}
          onVerify={handlePhoneVerified}
          onBack={() => setCurrentScreen('register')}
        />
      )}
      
      {/* Login Screen */}
      {currentScreen === 'login' && (
        <div className="min-h-screen bg-white flex flex-col">
          <div className="h-12 flex justify-end px-5 pt-4">
            <LanguageSelector />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <span className="text-4xl">🗑️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 text-center">{t('login.title')}</h1>
            <p className="text-gray-400 text-sm text-center mt-1">{t('login.subtitle')}</p>
          </div>
          <div className="px-6 pb-10">
            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4" placeholder={t('login.emailPlaceholder')} />
            <div className="relative mb-2">
              <input type={showLoginPassword ? 'text' : 'password'} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl pr-12" placeholder="Password" />
              <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showLoginPassword ? '👁️' : '👁️‍🗨️'}</button>
            </div>
            <div className="text-right mb-4">
              <button onClick={() => setCurrentScreen('forgotPassword')} className="text-sm text-green-600">Forgot Password?</button>
            </div>
            
            {hasBiometricEnabled && (
              <button onClick={() => setCurrentScreen('biometric')} className="w-full border border-green-600 text-green-600 font-semibold py-3 rounded-xl mb-3 flex items-center justify-center gap-2 hover:bg-green-50 transition">
                <span>🔐</span> Login with Fingerprint
              </button>
            )}
            
            <button onClick={handleLogin} className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition">{t('login.loginButton')}</button>
            <div className="flex items-center gap-3 my-5"><div className="flex-1 h-px bg-gray-100"></div><span className="text-xs text-gray-400">{t('login.or')}</span><div className="flex-1 h-px bg-gray-100"></div></div>
            <button className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2"><span>📱</span>{t('login.loginWithPhone')}</button>
            <div className="mt-6 text-center"><button onClick={() => setCurrentScreen('register')} className="text-green-600 text-sm font-medium">{t('login.signUp')}</button></div>
          </div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Register Screen */}
      {currentScreen === 'register' && (
        <div className="min-h-screen bg-white">
          <div className="h-12 flex justify-between items-center px-5 pt-4">
            <button onClick={() => setCurrentScreen('login')} className="text-gray-600 text-2xl">←</button>
            <LanguageSelector />
          </div>
          <div className="px-6 py-4 pb-20">
            <div className="text-center mb-6"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-3xl">📝</span></div><h1 className="text-2xl font-bold text-gray-800">Create Account</h1><p className="text-gray-400 text-sm mt-1">Join SMART WASTE today</p></div>
            <div className="space-y-4">
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label><input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="John Doe" /></div>
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Email Address *</label><input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="john@example.com" /></div>
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label><input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="+27 12 345 6789" /></div>
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Service Address *</label><input type="text" value={regAddress} onChange={(e) => setRegAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="45 Main Street, Springfield" /></div>
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Password *</label><div className="relative"><input type={showRegPassword ? 'text' : 'password'} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl pr-12" placeholder="Create a password" /><button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showRegPassword ? '👁️' : '👁️‍🗨️'}</button></div></div>
              <div><label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password *</label><input type="password" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Confirm your password" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 text-green-600 rounded" /><label className="text-xs text-gray-600">I agree to the Terms of Service and Privacy Policy</label></div>
              <button onClick={startRegistration} className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition mt-4">Create Account</button>
              <div className="text-center"><p className="text-xs text-gray-400">Already have an account? <button onClick={() => setCurrentScreen('login')} className="text-green-600 ml-1">Sign In</button></p></div>
            </div>
          </div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Dashboard Screen */}
      {currentScreen === 'dashboard' && (
        <div className="min-h-screen bg-white">
          <div className="h-12 flex justify-end px-5 pt-4"><LanguageSelector /></div>
          <div className="px-5 pb-4"><div className="flex justify-between items-start"><div><p className="text-gray-500 text-sm">{t('dashboard.welcomeBack')}</p><h1 className="text-2xl font-bold text-gray-800 mt-0.5">{userName}!</h1><p className="text-gray-400 text-xs mt-1">{userEmail}</p><p className="text-gray-400 text-xs">{userPhone}</p></div><div className="flex items-center gap-2"><button onClick={() => setCurrentScreen('profile')} className="p-2"><span className="text-2xl">👤</span></button><button onClick={() => setCurrentScreen('alerts')} className="relative p-2"><span className="text-2xl">🔔</span><span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span></button></div></div></div>
          <div className="px-5 py-2 pb-20">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6"><p className="text-green-700 text-xs font-semibold">{t('dashboard.yourNextCollection')}</p><p className="text-lg font-semibold text-gray-800 mt-1">Tuesday, April 15th</p><div className="flex items-center justify-between mt-3"><div className="flex items-center gap-2"><div className="bg-green-100 rounded-full p-2"><span className="text-sm">🗑️</span></div><span className="text-sm font-medium text-gray-700">{t('dashboard.generalWaste')}</span></div><span className="text-xs text-gray-500">8:00 AM - 12:00 PM</span></div><div className="flex items-center justify-between mt-2"><span className="text-xs text-gray-500">Monthly fee: {formatCurrency(85.00)}</span><button onClick={() => showToastNotification('⏰ Reminder set!')} className="text-xs text-green-600 font-medium">🔔 Set Reminder</button></div></div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setCurrentScreen('schedule')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">📅</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.schedule')}</div></button>
              <button onClick={() => setCurrentScreen('collectionHistory')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">📊</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.history')}</div></button>
              <button onClick={() => setCurrentScreen('recyclingTips')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">♻️</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.tips')}</div></button>
              <button onClick={() => setCurrentScreen('binRequest')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">📦</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.requestBin')}</div></button>
              <button onClick={() => setCurrentScreen('serviceMap')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">🗺️</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.serviceMap')}</div></button>
              <button onClick={() => setCurrentScreen('reportIssue')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">⚠️</span><div className="font-medium text-gray-800 text-sm">{t('dashboard.reportIssue')}</div></button>
              <button onClick={() => setCurrentScreen('chat')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">💬</span><div className="font-medium text-gray-800 text-sm">{t('chat.title')}</div><div className="text-xs text-gray-400 mt-0.5">Chat with support →</div></button>
              <button onClick={() => setCurrentScreen('aiSorter')} className="bg-white rounded-xl p-3 border shadow-sm text-left"><span className="text-2xl block mb-1">🤖</span><div className="font-medium text-gray-800 text-sm">AI Sorter</div><div className="text-xs text-gray-400 mt-0.5">What bin? →</div></button>
            </div>
            <div className="mb-6 bg-gray-50 rounded-xl p-3"><p className="text-gray-700 text-sm font-medium mb-2">{t('dashboard.rateCollection')}</p><div className="flex gap-2">{ [1,2,3,4,5].map((star) => (<button key={star} onClick={() => rateCollection(star)} className="text-2xl hover:scale-110 transition">⭐</button>)) }</div></div>
            <div className="mb-6"><h3 className="text-gray-800 font-semibold text-sm mb-3">{t('dashboard.recentAlerts')}</h3><div className="space-y-2"><div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500"><p className="font-medium text-gray-800 text-sm">Holiday Schedule Change</p><p className="text-gray-500 text-xs mt-1">No pickup on Monday, April 20th</p></div><div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500"><p className="font-medium text-gray-800 text-sm">New recycling guidelines</p><p className="text-gray-500 text-xs mt-1">Plastic types 1-7 now accepted</p></div></div></div>
            <div><div className="flex justify-between items-center mb-3"><h3 className="text-gray-800 font-semibold text-sm">{t('dashboard.upcomingSchedule')}</h3><button onClick={() => setCurrentScreen('schedule')} className="text-green-600 text-xs font-medium">{t('dashboard.viewAll')}</button></div>{scheduleItems.slice(0,3).map((item, idx) => (<div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50"><div>{item.date && <p className="text-xs text-gray-400">{item.date}</p>}<p className="font-medium text-gray-800 text-sm mt-1">{item.type}</p></div><div className="text-right"><p className="text-xs text-gray-500">{item.time}</p><p className={`text-xs ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{item.status}</p></div></div>))}</div>
          </div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Schedule Screen */}
      {currentScreen === 'schedule' && (
        <div className="min-h-screen bg-white">
          <div className="h-12"></div>
          <div className="px-5 pb-4 border-b"><div className="flex items-center gap-4"><button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl">←</button><div><h1 className="text-xl font-semibold text-gray-800">{t('dashboard.schedule')}</h1><p className="text-gray-400 text-xs">View all upcoming pickups</p></div><button onClick={() => setCurrentScreen('profile')} className="ml-auto"><span className="text-xl">👤</span></button></div></div>
          <div className="px-5 py-4 pb-20">{scheduleItems.map((item, idx) => (<div key={idx} className="border-b pb-3"><p className="text-xs text-gray-400 mb-2">{item.date}</p><div className="flex items-center justify-between"><div><p className="font-medium text-gray-800 text-sm">{item.type}</p><p className="text-xs text-gray-400 mt-1">{item.time}</p></div><p className={`text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{item.status}</p></div></div>))}</div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Report Issue Screen */}
      {currentScreen === 'reportIssue' && (
        <div className="min-h-screen bg-white">
          <div className="h-12"></div>
          <div className="px-5 pb-4 border-b"><div className="flex items-center gap-4"><button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl">←</button><div><h1 className="text-xl font-semibold text-gray-800">{t('dashboard.reportIssue')}</h1><p className="text-gray-400 text-xs">Let us know what's wrong</p></div><button onClick={() => setCurrentScreen('profile')} className="ml-auto"><span className="text-xl">👤</span></button></div></div>
          <div className="px-5 py-4 pb-20">
            <div className="mb-5"><label className="block text-gray-700 text-sm font-medium mb-2">Issue Type</label><div className="grid grid-cols-2 gap-2">{['Missed Collection','Damaged Bin','Overflowing Bin','Blocked Access','Other Issue'].map((type) => (<button key={type} className="p-3 rounded-lg border bg-white text-left"><span className="text-xl">📝</span><p className="text-xs text-gray-600 mt-1">{type}</p></button>))}</div></div>
            <div className="mb-4"><label className="block text-gray-700 text-sm font-medium mb-2">Location</label><input type="text" defaultValue={userAddress} className="w-full px-3 py-3 bg-gray-50 border rounded-lg" /></div>
            <div className="mb-4"><label className="block text-gray-700 text-sm font-medium mb-2">Description</label><textarea rows={4} value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} className="w-full px-3 py-3 bg-gray-50 border rounded-lg" placeholder="Please provide details..." /></div>
            <div className="mb-6"><button className="w-full border border-dashed rounded-lg p-4 text-center"><span className="text-2xl block mb-1">📷</span><p className="text-xs text-gray-500">Add a photo (optional)</p></button></div>
            <button onClick={handleReportSubmit} className="w-full bg-green-600 text-white font-medium py-4 rounded-xl">Submit Report</button>
          </div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Alerts Screen */}
      {currentScreen === 'alerts' && (
        <div className="min-h-screen bg-white">
          <div className="h-12"></div>
          <div className="px-5 pb-4 border-b"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl">←</button><div><h1 className="text-xl font-semibold text-gray-800">Alerts</h1><p className="text-gray-400 text-xs">Stay informed</p></div></div><div className="flex items-center gap-2"><button onClick={() => setCurrentScreen('profile')}><span className="text-xl">👤</span></button><div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3 new</div></div></div></div>
          <div className="px-5 py-4 pb-20"><div className="space-y-3"><div className="bg-amber-50 rounded-lg p-3"><div className="flex gap-3"><span className="text-lg">📅</span><div className="flex-1"><h3 className="font-semibold text-gray-800 text-sm">Holiday Schedule Change</h3><p className="text-xs text-gray-500">No pickup on Monday, April 20th</p><p className="text-xs text-gray-400 mt-2">April 10, 2026</p></div><span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">New</span></div></div><div className="bg-blue-50 rounded-lg p-3"><div className="flex gap-3"><span className="text-lg">♻️</span><div className="flex-1"><h3 className="font-semibold text-gray-800 text-sm">New recycling guidelines</h3><p className="text-xs text-gray-500">Plastic types 1-7 now accepted</p><p className="text-xs text-gray-400 mt-2">April 5, 2026</p></div><span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">New</span></div></div><div className="bg-gray-50 rounded-lg p-3"><div className="flex gap-3"><span className="text-lg">⚠️</span><div className="flex-1"><h3 className="text-gray-600 text-sm">Weather Delay Notice</h3><p className="text-xs text-gray-500">Collections may be delayed in North Springfield</p><p className="text-xs text-gray-400 mt-2">April 3, 2026</p></div></div></div></div></div>
          <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
        </div>
      )}

      {/* Collection History Screen */}
      {currentScreen === 'collectionHistory' && <CollectionHistoryScreen onBack={() => setCurrentScreen('dashboard')} />}
      
      {/* Recycling Tips Screen */}
      {currentScreen === 'recyclingTips' && <RecyclingTipsScreen onBack={() => setCurrentScreen('dashboard')} />}
      
      {/* Bin Request Screen */}
      {currentScreen === 'binRequest' && <BinRequestScreen onBack={() => setCurrentScreen('dashboard')} onSubmit={handleBinRequestSubmit} />}
      
      {/* Service Map Screen */}
      {currentScreen === 'serviceMap' && <ServiceMapScreen onBack={() => setCurrentScreen('dashboard')} />}
      
      {/* Chat Support Screen */}
      {currentScreen === 'chat' && <ChatSupportScreen onBack={() => setCurrentScreen('dashboard')} />}
      
      {/* Profile Screen */}
      {currentScreen === 'profile' && (
        <ProfileScreen 
          onBack={() => setCurrentScreen('dashboard')}
          onLogout={handleLogout}
          userName={userName}
          userEmail={userEmail}
          userPhone={userPhone}
          userAddress={userAddress}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}

export default App;
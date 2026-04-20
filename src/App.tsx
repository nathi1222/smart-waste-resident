import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import CollectionHistoryScreen from './components/CollectionHistoryScreen';
import RecyclingTipsScreen from './components/RecyclingTipsScreen';
import BinRequestScreen from './components/BinRequestScreen';
import ServiceMapScreen from './components/ServiceMapScreen';
import ChatSupportScreen from './components/ChatSupportScreen';
import ProfileScreen from './components/ProfileScreen';

type Screen = 'login' | 'register' | 'dashboard' | 'schedule' | 'reportIssue' | 'alerts' | 'collectionHistory' | 'recyclingTips' | 'binRequest' | 'serviceMap' | 'chat' | 'profile';

function App() {
  const { t, formatCurrency } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Check for saved session on load
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
      showToastNotification(`👋 Welcome back, ${session.name}!`);
    }
  }, []);

  const showToastNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login validation
    if (email && password) {
      // For demo, use a default user
      const demoUser = {
        name: email.split('@')[0],
        email: email,
        phone: '+27 12 345 6789',
        address: '45 Main Street, Springfield'
      };
      setUserName(demoUser.name);
      setUserEmail(demoUser.email);
      setUserPhone(demoUser.phone);
      setUserAddress(demoUser.address);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
      
      // Save session
      localStorage.setItem('userSession', JSON.stringify(demoUser));
      showToastNotification(`👋 Welcome back, ${demoUser.name}!`);
    }
  };

  const handleRegister = (name: string, email: string, phone: string, password: string, address: string) => {
    // Save user data
    const newUser = { name, email, phone, address };
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
    setUserAddress(address);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    
    // Save session
    localStorage.setItem('userSession', JSON.stringify(newUser));
    showToastNotification(`🎉 Welcome to SMART WASTE, ${name}!`);
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

  const handleReportSubmit = () => {
    setSubmitted(true);
    showToastNotification('✅ Issue reported successfully!');
    setTimeout(() => {
      setSubmitted(false);
      setCurrentScreen('dashboard');
    }, 1500);
  };

  const handleBinRequestSubmit = () => {
    showToastNotification('📦 Bin request submitted!');
  };

  const rateCollection = (rating: number) => {
    showToastNotification(`⭐ Thanks for rating ${rating} stars!`);
  };

  const NotificationToast = () => (
    <>
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg z-50 animate-fadeIn">
          {notificationMessage}
        </div>
      )}
    </>
  );

  // Login Screen
  if (currentScreen === 'login') {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NotificationToast />
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="email@example.com"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <button
            onClick={() => handleLogin(email, password)}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition active:scale-98 text-base"
          >
            {t('login.loginButton')}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs text-gray-400">{t('login.or')}</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          <button className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:border-green-500 hover:text-green-600 transition text-base">
            <span>📱</span>
            {t('login.loginWithPhone')}
          </button>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentScreen('register')}
              className="text-green-600 text-sm font-medium hover:text-green-700"
            >
              Don't have an account? Sign Up →
            </button>
          </div>
        </div>
        
        <div className="pb-2 flex justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Register Screen
  if (currentScreen === 'register') {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleRegisterSubmit = () => {
      if (!name || !email || !phone || !password || !address) {
        showToastNotification('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        showToastNotification('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        showToastNotification('Please agree to the terms and conditions');
        return;
      }
      handleRegister(name, email, phone, password, address);
    };

    return (
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <div className="h-12 flex justify-between items-center px-5 pt-4">
          <button onClick={() => setCurrentScreen('login')} className="text-gray-600 text-2xl">←</button>
          <LanguageSelector />
        </div>
        
        <div className="px-6 py-4 pb-20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">📝</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-400 text-sm mt-1">Join SMART WASTE today</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+27 12 345 6789"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Service Address *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="45 Main Street, Springfield"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                  placeholder="Create a password"
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

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <label className="text-xs text-gray-600">
                I agree to the <button className="text-green-600">Terms of Service</button> and <button className="text-green-600">Privacy Policy</button>
              </label>
            </div>

            <button
              onClick={handleRegisterSubmit}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition text-base mt-4"
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-400">
                Already have an account? 
                <button onClick={() => setCurrentScreen('login')} className="text-green-600 ml-1">Sign In</button>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pb-2 flex justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  if (currentScreen === 'dashboard' && isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <div className="h-12 flex justify-end px-5 pt-4">
          <LanguageSelector />
        </div>
        
        <div className="px-5 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{t('dashboard.welcomeBack')}</p>
              <h1 className="text-2xl font-bold text-gray-800 mt-0.5">{userName}!</h1>
              <p className="text-gray-400 text-xs mt-1">{userEmail}</p>
              <p className="text-gray-400 text-xs">{userPhone}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentScreen('profile')} 
                className="p-2 active:bg-gray-100 rounded-full transition"
              >
                <span className="text-2xl">👤</span>
              </button>
              <button 
                onClick={() => setCurrentScreen('alerts')} 
                className="relative p-2 active:bg-gray-100 rounded-full transition"
              >
                <span className="text-2xl">🔔</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-2 pb-20">
          {/* Next Collection Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100">
            <p className="text-green-700 text-xs font-semibold">{t('dashboard.yourNextCollection')}</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">Tuesday, April 15th</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-2">
                  <span className="text-sm">🗑️</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{t('dashboard.generalWaste')}</span>
              </div>
              <span className="text-xs text-gray-500">8:00 AM - 12:00 PM</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">Monthly fee: {formatCurrency(85.00)}</span>
              <button onClick={() => showToastNotification('⏰ Reminder set!')} className="text-xs text-green-600 font-medium">
                {t('dashboard.setReminder')}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => setCurrentScreen('schedule')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">📅</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.schedule')}</div>
              <div className="text-xs text-gray-400 mt-0.5">View →</div>
            </button>
            <button onClick={() => setCurrentScreen('collectionHistory')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">📊</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.history')}</div>
              <div className="text-xs text-gray-400 mt-0.5">Past collections →</div>
            </button>
            <button onClick={() => setCurrentScreen('recyclingTips')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">♻️</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.tips')}</div>
              <div className="text-xs text-gray-400 mt-0.5">Recycling guides →</div>
            </button>
            <button onClick={() => setCurrentScreen('binRequest')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">📦</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.requestBin')}</div>
              <div className="text-xs text-gray-400 mt-0.5">New bin →</div>
            </button>
            <button onClick={() => setCurrentScreen('serviceMap')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">🗺️</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.serviceMap')}</div>
              <div className="text-xs text-gray-400 mt-0.5">View areas →</div>
            </button>
            <button onClick={() => setCurrentScreen('reportIssue')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">⚠️</span>
              <div className="font-medium text-gray-800 text-sm">{t('dashboard.reportIssue')}</div>
              <div className="text-xs text-gray-400 mt-0.5">Report →</div>
            </button>
            <button onClick={() => setCurrentScreen('chat')} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-left active:bg-gray-50 transition col-span-2">
              <span className="text-2xl block mb-1">💬</span>
              <div className="font-medium text-gray-800 text-sm">{t('chat.title')}</div>
              <div className="text-xs text-gray-400 mt-0.5">Chat with support →</div>
            </button>
          </div>

          {/* Rate Collection Section */}
          <div className="mb-6 bg-gray-50 rounded-xl p-3">
            <p className="text-gray-700 text-sm font-medium mb-2">{t('dashboard.rateCollection')}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => rateCollection(star)} className="text-2xl hover:scale-110 transition">
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-semibold text-sm mb-3">{t('dashboard.recentAlerts')}</h3>
            <div className="space-y-2">
              <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                <p className="font-medium text-gray-800 text-sm">Holiday Schedule Change</p>
                <p className="text-gray-500 text-xs mt-1">No pickup on Monday, April 20th</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                <p className="font-medium text-gray-800 text-sm">New recycling guidelines</p>
                <p className="text-gray-500 text-xs mt-1">Plastic types 1-7 now accepted</p>
              </div>
            </div>
          </div>

          {/* Schedule Preview */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-800 font-semibold text-sm">{t('dashboard.upcomingSchedule')}</h3>
              <button onClick={() => setCurrentScreen('schedule')} className="text-green-600 text-xs font-medium">{t('dashboard.viewAll')}</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <p className="text-xs text-gray-400">TODAY</p>
                  <p className="font-medium text-gray-800 text-sm">GENERAL WASTE</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 font-medium">Active</p>
                  <p className="text-xs text-gray-400">8-12 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs text-gray-400">April 18</p>
                  <p className="font-medium text-gray-800 text-sm">RECYCLING</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">UPCOMING</p>
                  <p className="text-xs text-gray-400">9-1 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pb-2 flex justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Schedule Screen
  if (currentScreen === 'schedule') {
    return (
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <div className="h-12"></div>
        <div className="px-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{t('dashboard.schedule')}</h1>
              <p className="text-gray-400 text-xs mt-0.5">View all upcoming pickups</p>
            </div>
            <button 
              onClick={() => setCurrentScreen('profile')} 
              className="ml-auto p-2 active:bg-gray-100 rounded-full transition"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
        <div className="px-5 py-4 pb-20">
          <div className="space-y-4">
            {[
              { date: 'TODAY - April 15, 2026', type: 'GENERAL WASTE', status: 'Active', time: '8:00 AM - 12:00 PM' },
              { date: 'April 18, 2026', type: 'RECYCLING', status: 'UPCOMING', time: '9:00 AM - 1:00 PM' },
              { date: 'April 22, 2026', type: 'GARDEN WASTE', status: 'UPCOMING', time: '7:00 AM - 11:00 AM' },
              { date: 'April 25, 2026', type: 'HAZARDOUS', status: 'UPCOMING', time: 'By appointment' },
              { date: 'April 29, 2026', type: 'GENERAL WASTE', status: 'UPCOMING', time: '8:00 AM - 12:00 PM' },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-3">
                <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.type}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                  <p className={`text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 rounded-lg p-3">
            <p className="text-xs text-amber-700">⚠️ Hazardous waste by appointment only. Call (555) 123-4567</p>
          </div>
        </div>
        <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
      </div>
    );
  }

  // Report Issue Screen
  if (currentScreen === 'reportIssue') {
    if (submitted) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-600">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Issue Reported!</h2>
            <p className="text-gray-400 text-sm">Thank you for your feedback</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <div className="h-12"></div>
        <div className="px-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{t('dashboard.reportIssue')}</h1>
              <p className="text-gray-400 text-xs mt-0.5">Let us know what's wrong</p>
            </div>
            <button 
              onClick={() => setCurrentScreen('profile')} 
              className="ml-auto p-2 active:bg-gray-100 rounded-full transition"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
        <div className="px-5 py-4 pb-20">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Issue Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'missed', label: 'Missed Collection', icon: '🗑️' },
                { value: 'damaged', label: 'Damaged Bin', icon: '💔' },
                { value: 'overflow', label: 'Overflowing Bin', icon: '📦' },
                { value: 'blocked', label: 'Blocked Access', icon: '🚧' },
                { value: 'other', label: 'Other Issue', icon: '📝' },
              ].map((type) => (
                <button key={type.value} className="p-3 rounded-lg border border-gray-200 bg-white text-left active:bg-gray-50 transition">
                  <span className="text-xl">{type.icon}</span>
                  <p className="text-xs text-gray-600 mt-1">{type.label}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
            <input type="text" defaultValue={userAddress || '45 Main Street, Springfield'} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea rows={4} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base" placeholder="Please provide details..." defaultValue="" />
          </div>
          <div className="mb-6">
            <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-center active:bg-gray-50 transition">
              <span className="text-2xl block mb-1">📷</span>
              <p className="text-xs text-gray-500">Add a photo (optional)</p>
            </button>
          </div>
          <button onClick={handleReportSubmit} className="w-full bg-green-600 text-white font-medium py-4 rounded-xl hover:bg-green-700 transition active:scale-98 text-base">
            Submit Report
          </button>
        </div>
        <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
      </div>
    );
  }

  // Alerts Screen
  if (currentScreen === 'alerts') {
    return (
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <div className="h-12"></div>
        <div className="px-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600 text-2xl p-2 -ml-2">←</button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Alerts</h1>
                <p className="text-gray-400 text-xs mt-0.5">Stay informed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentScreen('profile')} 
                className="p-2 active:bg-gray-100 rounded-full transition"
              >
                <span className="text-xl">👤</span>
              </button>
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3 new</div>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 pb-20">
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="flex gap-3">
                <span className="text-lg">📅</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">Holiday Schedule Change</h3>
                  <p className="text-xs text-gray-500 mt-1">No pickup on Monday, April 20th due to public holiday.</p>
                  <p className="text-xs text-gray-400 mt-2">April 10, 2026</p>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">New</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex gap-3">
                <span className="text-lg">♻️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">New recycling guidelines</h3>
                  <p className="text-xs text-gray-500 mt-1">Plastic types 1-7 are now accepted in recycling bins.</p>
                  <p className="text-xs text-gray-400 mt-2">April 5, 2026</p>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">New</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex gap-3">
                <span className="text-lg">⚠️</span>
                <div className="flex-1">
                  <h3 className="text-gray-600 text-sm">Weather Delay Notice</h3>
                  <p className="text-xs text-gray-500 mt-1">Collections may be delayed in North Springfield due to weather.</p>
                  <p className="text-xs text-gray-400 mt-2">April 3, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-2 flex justify-center"><div className="w-32 h-1 bg-gray-300 rounded-full"></div></div>
      </div>
    );
  }

  // Collection History Screen
  if (currentScreen === 'collectionHistory') {
    return <CollectionHistoryScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Recycling Tips Screen
  if (currentScreen === 'recyclingTips') {
    return <RecyclingTipsScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Bin Request Screen
  if (currentScreen === 'binRequest') {
    return (
      <BinRequestScreen 
        onBack={() => setCurrentScreen('dashboard')} 
        onSubmit={handleBinRequestSubmit}
      />
    );
  }

  // Service Map Screen
  if (currentScreen === 'serviceMap') {
    return <ServiceMapScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Chat Support Screen
  if (currentScreen === 'chat') {
    return <ChatSupportScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Profile Screen
  if (currentScreen === 'profile') {
    return (
      <ProfileScreen 
        onBack={() => setCurrentScreen('dashboard')}
        onLogout={handleLogout}
        userName={userName}
        userEmail={userEmail}
        userPhone={userPhone}
        userAddress={userAddress}
        onUpdateProfile={(name, email, phone, address) => {
          setUserName(name);
          setUserEmail(email);
          setUserPhone(phone);
          setUserAddress(address);
          localStorage.setItem('userSession', JSON.stringify({ name, email, phone, address }));
          showToastNotification('Profile updated successfully!');
        }}
      />
    );
  }

  return null;
}

export default App;